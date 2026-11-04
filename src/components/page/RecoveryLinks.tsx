import Link from 'next/link';

const LINKS = [
  { label: 'AI Employees', href: '/product/ai-employees' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Impact Stories', href: '/stories' },
  { label: 'Blog', href: '/blog' },
];

// Where to go next from the 404 and error pages.
export function RecoveryLinks() {
  return (
    <nav aria-label="Popular pages" style={{ marginTop: 56, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
      <div className="u-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--fg-subtle)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 16 }}>
        Popular pages
      </div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', listStyle: 'none', padding: 0, margin: 0 }}>
        {LINKS.map((l) => (
          <li key={l.href}><Link href={l.href} style={{ color: 'var(--fg-muted)', display: 'inline-block', paddingBlock: 6 }}>{l.label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
