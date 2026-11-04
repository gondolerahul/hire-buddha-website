import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { PageHero, Section, SectionHead, Timeline, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { USE_CASES } from '@/lib/content';
import c from '@/components/page/content.module.css';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }){
  const { slug } = await params;
  const u = USE_CASES.find((x) => x.slug === slug);
  if (!u) return {};
  return buildMetadata({ title: u.title, description: u.summary, path: `/use-cases/${u.slug}` });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = USE_CASES.find((x) => x.slug === slug);
  if (!u) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Use Case · ${u.arc} arc`}
        title={u.title}
        lead={u.summary}
        ctaPrimary="Deploy this use case"
        ctaPragya={`Talk to Pragya about ${u.title}`}
        visual="ring"
      />

      <Section>
        <SectionHead title="The problem." />
        <Reveal y={16}>
          <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.55, color: 'var(--fg)', maxWidth: '60ch', fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: 'var(--track-tight)' }}>{u.problem}</p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="How it works" title="From trigger to outcome." />
        <Timeline items={u.steps} />
      </Section>

      <Section>
        <SectionHead title="What you get." />
        <div className={c.outcomes}>
          {u.outcomes.map((o) => (
            <Reveal key={o} y={16} className={c.outcome}><Check size={20} /> <span>{o}</span></Reveal>
          ))}
        </div>
      </Section>

      <CTABand title="Deploy this in under 10 minutes." sub="Start with ₹500 in free daily credits, or have Pragya set it up with you." primary="Start Free" />
    </>
  );
}
