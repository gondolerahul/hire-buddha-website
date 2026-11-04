import nodemailer from 'nodemailer';
import { parseLead, leadEmailText } from '@/lib/lead';
import { company, SITE_URL } from '@/config/company';

// The contact form's endpoint. Each lead is e-mailed to contact@ over SMTP,
// with Reply-To set to the visitor, so it lands in the team's inbox. If mail
// can't be sent the visitor is told so, with the address to write to, and
// never shown a false "thank you".

const MAX_BODY = 10_000; // bytes; a full form is well under 3 KB
const RATE = { max: 5, windowMs: 10 * 60_000 };

// Origins allowed to post. Same-origin form posts send one of these.
const ALLOWED_ORIGINS = new Set([
  SITE_URL, 'https://www.hirebuddha.com',
  ...(process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000']),
  ...(process.env.LEAD_ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean),
]);

// Per-IP rate limit, in memory. Good enough for a single `next start`
// process; behind several instances, move it to the proxy or a shared store.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) for (const [k, v] of hits) if (now - v[v.length - 1] > RATE.windowMs) hits.delete(k);
  return recent.length > RATE.max;
}

let transport: nodemailer.Transporter | null = null;
function mailer(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  transport ??= nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465; 587 upgrades with STARTTLS
    requireTLS: process.env.SMTP_SECURE !== 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  return transport;
}

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });
const writeToUs = `Please write to us at ${company.email.contact} instead.`;

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) return fail(403, 'Forbidden.');

  if (!(req.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return fail(415, 'Send the form as JSON.');
  }
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY) return fail(413, 'That message is too long.');

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  if (limited(ip)) return fail(429, `Too many messages in a short time. Wait a few minutes, or write to ${company.email.contact}.`);

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return fail(413, 'That message is too long.');
    body = JSON.parse(text);
  } catch {
    return fail(400, 'Invalid request.');
  }

  const parsed = parseLead(body);
  if (!parsed.ok) return fail(400, parsed.error);
  if (parsed.spam) return Response.json({ ok: true });
  const { lead } = parsed;

  const smtp = mailer();
  if (!smtp) {
    console.error('[lead] SMTP_HOST is not set; lead not delivered');
    return fail(503, `We couldn’t send your message just now. ${writeToUs}`);
  }

  try {
    await smtp.sendMail({
      from: { name: 'HireBuddha website', address: process.env.LEAD_FROM || process.env.SMTP_USER || company.email.contact },
      to: process.env.LEAD_TO || company.email.contact,
      replyTo: { name: lead.name, address: lead.email },
      subject: `Website enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      text: leadEmailText(lead, { at: new Date().toISOString(), ip, page: req.headers.get('referer') ?? '/contact' }),
    });
  } catch (err) {
    console.error('[lead] sending failed:', err instanceof Error ? err.message : err);
    return fail(502, `We couldn’t send your message just now. ${writeToUs}`);
  }
  return Response.json({ ok: true });
}
