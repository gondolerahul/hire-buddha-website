import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/primitives';
import c from '@/components/page/content.module.css';

export const metadata: Metadata = { title: 'Terms of Service', description: 'The terms governing your use of the HireBuddha platform.' };

const SECTIONS = [
  { h: 'Agreement', body: 'By using HireBuddha you agree to these terms. This page is a plain-language template summary and not the binding contract, which is provided during onboarding.' },
  { h: 'Your workforce, your responsibility', body: 'You configure the AI Employees, the tools they may use, and the Human-in-the-Loop checkpoints that gate high-stakes actions. You are responsible for the outcomes you authorize.' },
  { h: 'Acceptable use', body: 'Don’t use the platform for unlawful activity, to violate others’ rights, or to bypass the governance and safety controls built into the product.' },
  { h: 'Billing', body: 'Usage is billed per outcome at micro-cent precision against your credits and wallet. Circuit breakers halt execution on a budget breach. You can review every charge in the audit trail.' },
  { h: 'Availability & changes', body: 'We work to keep the platform reliable and may update features over time. Material changes to these terms will be communicated in advance.' },
  { h: 'Liability', body: 'The platform is provided as described in your agreement. Limitations of liability and warranties are set out in the binding contract.' },
];

export default function TermsPage() {
  return (
    <article className={c.article}>
      <header className={c.articleHero}>
        <div className={c.articleMeta}><span className="cat">Legal</span><span>·</span><span>Terms of Service</span></div>
        <h1 className={c.articleTitle}>Terms of Service</h1>
        <p className={c.articleExcerpt}>The terms governing your use of the HireBuddha platform.</p>
      </header>
      <div className={c.articleRule} />
      <div className={c.articleBody}>
        {SECTIONS.map((s) => (
          <Reveal key={s.h} y={14}><h3>{s.h}</h3><p>{s.body}</p></Reveal>
        ))}
        <p style={{ color: 'var(--fg-subtle)', fontSize: 'var(--text-sm)' }}>Template content for demonstration. Replace with your reviewed legal terms before launch.</p>
      </div>
    </article>
  );
}
