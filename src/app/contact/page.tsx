import { Reveal } from '@/components/motion/primitives';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactAside } from '@/components/contact/ContactAside';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { buildMetadata } from '@/lib/metadata';
import { HeroScene } from '@/components/visual/HeroScene';

export const metadata = buildMetadata({
  title: 'Contact & Get Started',
  description: 'Talk to Pragya, request a demo or write to the HireBuddha team in Nagpur. Our office, phone, hours and Grievance Officer are all on this page.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section style={{ position: 'relative', overflow: 'clip', paddingTop: 'clamp(120px, 18vh, 180px)', paddingBottom: 'clamp(72px, 12vh, 140px)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroScene scene="beacon" focalX={0.88} focalY={0.14} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, var(--bg) 30%, transparent 80%)' }} aria-hidden />
      <div className="u-container u-container--wide" style={{ position: 'relative', zIndex: 2 }}>
        <div className="contactGrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(36px, 6vw, 88px)', alignItems: 'start' }}>
          <div>
            <Reveal immediate y={14}><div className="u-eyebrow" style={{ marginBottom: 22 }}>Contact · Get Started</div></Reveal>
            <Reveal immediate y={16} delay={0.05}><h1 style={{ fontSize: 'var(--text-6xl)', letterSpacing: 'var(--track-tighter)', lineHeight: 0.98 }}>Let’s deploy<br />your workforce.</h1></Reveal>
            <Reveal immediate y={16} delay={0.1}><p className="lead" style={{ marginTop: 24, marginBottom: 32 }}>Start free in minutes, or tell us what you’re trying to do and we’ll map it to the loop with you.</p></Reveal>
            <ContactAside />
          </div>
          <Reveal immediate y={24} delay={0.1}>
            <div className="glass" style={{ padding: 'clamp(24px, 3vw, 38px)', borderRadius: 'var(--r-2xl)' }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
        <ContactDetails />
      </div>
    </section>
  );
}
