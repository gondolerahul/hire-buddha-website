// Validation for the contact form's lead, shared by the API route and its
// tests. Every field is a string with a length cap; anything else is refused.

export type Lead = { name: string; email: string; company: string; teamSize: string; message: string };

export const LIMITS = { name: 100, email: 254, company: 120, teamSize: 40, message: 2000 } as const;

// One "@", a dot in the domain, no spaces: strict enough to refuse "x@" and
// "@", loose enough for every real address.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadResult = { ok: true; lead: Lead; spam: boolean } | { ok: false; error: string };

export function parseLead(input: unknown): LeadResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, error: 'Invalid request.' };
  const data = input as Record<string, unknown>;

  // The honeypot: a field people never see. Bots fill it; pretend success.
  const spam = typeof data.website === 'string' && data.website.trim() !== '';

  const lead = {} as Lead;
  for (const key of Object.keys(LIMITS) as (keyof Lead)[]) {
    const v = data[key] ?? '';
    if (typeof v !== 'string') return { ok: false, error: 'Invalid request.' };
    // Single-line fields lose control characters, so none can break an e-mail header.
    const t = (key === 'message' ? v : v.replace(/[\u0000-\u001f\u007f]+/g, ' ')).trim();
    if (t.length > LIMITS[key]) return { ok: false, error: `Please keep the ${key === 'teamSize' ? 'team size' : key} under ${LIMITS[key]} characters.` };
    lead[key] = t;
  }
  if (!lead.name) return { ok: false, error: 'Please tell us your name.' };
  if (!EMAIL.test(lead.email)) return { ok: false, error: 'Please enter a valid work e-mail address.' };
  return { ok: true, lead, spam };
}

/** The e-mail our team receives. Plain text, so nothing the visitor typed can render as HTML. */
export function leadEmailText(lead: Lead, meta: { at: string; ip: string; page: string }): string {
  return [
    'New enquiry from the hirebuddha.com contact form.',
    '',
    `Name:       ${lead.name}`,
    `E-mail:     ${lead.email}`,
    `Company:    ${lead.company || '-'}`,
    `Team size:  ${lead.teamSize || '-'}`,
    '',
    'What they would automate first:',
    lead.message || '-',
    '',
    '---',
    `Received ${meta.at} from ${meta.ip} (${meta.page}).`,
    'Reply to this e-mail to answer the visitor directly.',
  ].join('\n');
}
