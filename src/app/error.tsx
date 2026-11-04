'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { RecoveryLinks } from '@/components/page/RecoveryLinks';
import { company } from '@/config/company';

// Catches runtime errors in any page below the root layout; the header and
// footer stay in place around it.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  const digest = error instanceof Error && 'digest' in error ? String((error as Error & { digest?: string }).digest ?? '') : '';

  return (
    <section className="u-section" style={{ paddingTop: 'clamp(140px, 22vh, 220px)', minHeight: '78vh' }}>
      <div className="u-container">
        <div className="u-eyebrow" style={{ marginBottom: 22 }}>Something went wrong</div>
        <h1 style={{ fontSize: 'var(--text-6xl)', letterSpacing: 'var(--track-tighter)', lineHeight: 0.98, maxWidth: '16ch' }}>
          This page hit a <span className="u-gold">snag</span>.
        </h1>
        <p className="lead" style={{ marginTop: 24, maxWidth: '56ch' }}>
          Try again. If it keeps happening, write to <a href={`mailto:${company.email.contact}`} style={{ color: 'var(--accent)' }}>{company.email.contact}</a>
          {digest && <> and quote reference <code className="u-mono">{digest}</code></>}.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
          <button type="button" className="btn btn-gold btn-lg" onClick={() => retry()}>Try again <RotateCcw size={17} /></button>
          <Link href="/" className="btn btn-ghost btn-lg">Back to home</Link>
        </div>
        <RecoveryLinks />
      </div>
    </section>
  );
}
