import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/primitives';
import c from '@/components/page/content.module.css';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Buddha Cognitive Lab handles your data across the HireBuddha platform.' };

const SECTIONS = [
  { h: 'Overview', body: 'Buddha Cognitive Lab (“we”) operates HireBuddha. This page explains, in plain language, what data we collect and how we use it. It is a template summary and not a substitute for the binding agreement provided during onboarding.' },
  { h: 'What we collect', body: 'Account details you provide (name, email, company), the content you upload as a knowledge base, and operational telemetry needed to run and bill your workforce — token counts, costs, latency, and decision logs.' },
  { h: 'How we use it', body: 'To operate the platform, execute the work you configure, improve reliability through the Learning System, and meet legal and security obligations. We do not sell your data.' },
  { h: 'Tenant isolation', body: 'Every tenant’s data is segregated. Database operations are company-scoped, secrets are encrypted with AES-256-GCM, and no query may cross a tenant boundary.' },
  { h: 'Model & data governance', body: 'You control which models in the Intelligence Engine may process your data, can pin a specific model for residency or compliance, and can audit every model choice after the fact.' },
  { h: 'Your choices', body: 'You can export or delete your data, restrict the model fleet, and configure Human-in-the-Loop checkpoints. Contact privacy@hirebuddha.com for any request.' },
];

export default function PrivacyPage() {
  return (
    <article className={c.article}>
      <header className={c.articleHero}>
        <div className={c.articleMeta}><span className="cat">Legal</span><span>·</span><span>Privacy Policy</span></div>
        <h1 className={c.articleTitle}>Privacy Policy</h1>
        <p className={c.articleExcerpt}>How we handle your data across the HireBuddha platform.</p>
      </header>
      <div className={c.articleRule} />
      <div className={c.articleBody}>
        {SECTIONS.map((s) => (
          <Reveal key={s.h} y={14}><h3>{s.h}</h3><p>{s.body}</p></Reveal>
        ))}
        <p style={{ color: 'var(--fg-subtle)', fontSize: 'var(--text-sm)' }}>Template content for demonstration. Replace with your reviewed legal policy before launch.</p>
      </div>
    </article>
  );
}
