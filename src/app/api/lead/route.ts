// Minimal lead intake. In production this would forward to a CRM / Pragya's
// onboarding flow; here it validates and acknowledges so the form works end-to-end.
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email } = data ?? {};
    if (!name || !email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ ok: false, error: 'Please provide a name and a valid email.' }, { status: 400 });
    }
    // eslint-disable-next-line no-console
    console.log('[lead]', { name, email, company: data.company, at: new Date().toISOString() });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
}
