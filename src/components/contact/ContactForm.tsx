'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { company } from '@/config/company';
import { LIMITS } from '@/lib/lead';
import s from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setError('');
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || `Something went wrong. Please write to us at ${company.email.contact}.`);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && err.message !== 'Failed to fetch'
        ? err.message
        : `We couldn’t reach our server. Please write to us at ${company.email.contact}.`);
    }
  }

  if (status === 'done') {
    return (
      <div className={s.done} role="status">
        <span className={s.doneIcon}><Check size={26} aria-hidden /></span>
        <h2 className={s.doneTitle}>Thank you. Your note is with our team.</h2>
        <p className={s.doneBody}>
          We’ll reply to the e-mail address you gave, from {company.email.contact}. In the meantime, you can start free or ask Pragya anything.
        </p>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} aria-describedby="lead-privacy">
      <div className={s.row}>
        <label className={s.field}><span className={s.label}>Name</span><input className={s.input} name="name" required maxLength={LIMITS.name} placeholder="Your name" autoComplete="name" /></label>
        <label className={s.field}><span className={s.label}>Work email</span><input className={s.input} name="email" type="email" required maxLength={LIMITS.email} placeholder="you@company.com" autoComplete="email" /></label>
      </div>
      <div className={s.row}>
        <label className={s.field}><span className={s.label}>Company <span className={s.optional}>(optional)</span></span><input className={s.input} name="company" maxLength={LIMITS.company} placeholder="Company name" autoComplete="organization" /></label>
        <label className={s.field}><span className={s.label}>Team size <span className={s.optional}>(optional)</span></span><input className={s.input} name="teamSize" maxLength={LIMITS.teamSize} placeholder="e.g. 25" inputMode="numeric" /></label>
      </div>
      <label className={s.field}><span className={s.label}>What would you automate first? <span className={s.optional}>(optional)</span></span><textarea className={s.input} name="message" rows={4} maxLength={LIMITS.message} placeholder="Tell us what you’re trying to do…" /></label>
      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div className={s.trap} aria-hidden="true">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p id="lead-privacy" className={s.notice}>
        We use what you send only to reply to you and to talk about HireBuddha with you. It goes to our team’s mailbox and is kept as
        our <Link href="/privacy">Privacy Policy</Link> describes. You can ask us to delete it at any time.
      </p>
      <div aria-live="polite">{status === 'error' && <p className={s.err}>{error}</p>}</div>
      <button className="btn btn-gold btn-lg" type="submit" disabled={status === 'sending'} data-cursor>
        {status === 'sending' ? 'Sending…' : <>Send <ArrowUpRight size={17} aria-hidden /></>}
      </button>
    </form>
  );
}
