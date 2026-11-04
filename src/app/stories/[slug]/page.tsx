import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { PageHero, Section, SectionHead, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { STORIES } from '@/lib/content';
import c from '@/components/page/content.module.css';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }){
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  if (!s) return {};
  return buildMetadata({ title: `${s.company}: Impact Story`, description: s.summary, path: `/stories/${s.slug}` });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Impact Story · ${s.industry}`}
        title={s.company}
        lead={s.summary}
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />

      <Section>
        <div className={c.storyBlocks}>
          <Reveal y={20} className={c.storyBlock}>
            <h2>The challenge</h2>
            <p>{s.before}</p>
          </Reveal>
          <Reveal y={20} delay={0.08} className={c.storyBlock}>
            <h2>The deployment</h2>
            <p>{s.deployment}</p>
          </Reveal>
        </div>

        <Reveal y={24}>
          <figure className={c.quote}>
            <blockquote className={c.quoteText}>“{s.quote.text}”</blockquote>
            <figcaption className={c.quoteWho}>{s.quote.who}</figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section>
        <SectionHead title="The outcome." />
        <div className={c.outcomes}>
          {s.after.map((o) => (
            <Reveal key={o} y={16} className={c.outcome}><Check size={20} /> <span>{o}</span></Reveal>
          ))}
        </div>
      </Section>

      <CTABand title="Could this be your company?" sub="Tell Pragya what you do and she’ll map it to the loop." primary="Start Free" />
    </>
  );
}
