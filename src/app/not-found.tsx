import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RecoveryLinks } from '@/components/page/RecoveryLinks';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist on hirebuddha.com. Find your way back to HireBuddha’s product, pricing, use cases or contact page.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="u-section" style={{ paddingTop: 'clamp(140px, 22vh, 220px)', minHeight: '78vh' }}>
      <div className="u-container">
        <div className="u-eyebrow" style={{ marginBottom: 22 }}>Error 404</div>
        <h1 style={{ fontSize: 'var(--text-6xl)', letterSpacing: 'var(--track-tighter)', lineHeight: 0.98, maxWidth: '14ch' }}>
          This page isn’t <span className="u-gold">here</span>.
        </h1>
        <p className="lead" style={{ marginTop: 24, maxWidth: '52ch' }}>
          The link may be old, or the address mistyped. Everything else is where you left it.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
          <Link href="/" className="btn btn-gold btn-lg">Back to home <ArrowRight size={17} /></Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">Contact us</Link>
        </div>
        <RecoveryLinks />
      </div>
    </section>
  );
}
