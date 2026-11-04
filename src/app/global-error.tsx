'use client';

import { useEffect } from 'react';
import { company } from '@/config/company';

// Replaces the root layout when it fails, so it renders its own document and
// cannot rely on globals.css or next/font: the styles are inline and on-brand.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0908', color: '#f3ede4', fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif', padding: 24 }}>
        <title>Something went wrong · HireBuddha</title>
        <main style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: '#edab48', margin: '0 0 18px' }}>HireBuddha</p>
          <h1 style={{ fontSize: 'clamp(34px, 6vw, 56px)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.02em' }}>Something went wrong.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#b9b0a4', margin: '20px 0 30px' }}>
            Please try again. If it keeps happening, write to{' '}
            <a href={`mailto:${company.email.contact}`} style={{ color: '#edab48' }}>{company.email.contact}</a>.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => retry()} style={{ font: 'inherit', fontWeight: 600, padding: '12px 22px', borderRadius: 999, border: 0, background: '#edab48', color: '#1a1206', cursor: 'pointer' }}>Try again</button>
            {/* A full reload, since the router may be what failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ font: 'inherit', padding: '12px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', color: '#f3ede4', textDecoration: 'none' }}>Back to home</a>
          </div>
        </main>
      </body>
    </html>
  );
}
