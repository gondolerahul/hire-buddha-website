'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import s from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setError('');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'done') {
    return (
      <div className={s.done}>
        <span className={s.doneIcon}><Check size={26} /></span>
        <h3 className={s.doneTitle}>Thank you — we’ll be in touch.</h3>
        <p className={s.doneBody}>Pragya is already reviewing your note. Meanwhile, you can start free or ask her anything.</p>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.row}>
        <label className={s.field}><span className={s.label}>Name</span><input className={s.input} name="name" required placeholder="Your name" autoComplete="name" /></label>
        <label className={s.field}><span className={s.label}>Work email</span><input className={s.input} name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
      </div>
      <div className={s.row}>
        <label className={s.field}><span className={s.label}>Company</span><input className={s.input} name="company" placeholder="Company name" autoComplete="organization" /></label>
        <label className={s.field}><span className={s.label}>Team size</span><input className={s.input} name="teamSize" placeholder="e.g. 25" inputMode="numeric" /></label>
      </div>
      <label className={s.field}><span className={s.label}>What would you automate first?</span><textarea className={s.input} name="message" rows={4} placeholder="Tell us what you’re trying to do…" /></label>
      {status === 'error' && <p className={s.err}>{error}</p>}
      <button className="btn btn-gold btn-lg" type="submit" disabled={status === 'sending'} data-cursor>
        {status === 'sending' ? 'Sending…' : <>Get Started <ArrowUpRight size={17} /></>}
      </button>
    </form>
  );
}
