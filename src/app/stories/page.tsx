import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, Section, CTABand } from '@/components/page/kit';
import { Stagger, StaggerItem } from '@/components/motion/primitives';
import { STORIES } from '@/lib/content';
import k from '@/components/page/kit.module.css';
import c from '@/components/page/content.module.css';

export const metadata: Metadata = {
  title: 'Impact Stories',
  description: 'How companies run on HireBuddha — from a whole AI-native legal firm to multilingual voice agents, governed banking automation, and studios that automate everything but their craft.',
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        scene="embers"
        eyebrow="Impact Stories"
        title="Built by the platform. Run by the loop."
        lead="How real companies put HireBuddha to work across their operations. Illustrative scenarios, grounded in the product."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />
      <Section>
        <Stagger className={`${k.grid} ${k.g2}`} stagger={0.07}>
          {STORIES.map((s) => (
            <StaggerItem key={s.slug}>
              <Link href={`/stories/${s.slug}`} className={k.card} data-cursor>
                <div className={k.cardGlow} aria-hidden />
                <div className={c.idxMeta}><span>{s.industry}</span><span className={c.dot} /><span style={{ color: 'var(--accent)' }}>{s.tag}</span></div>
                <div className={k.cardTitle} style={{ fontSize: 'var(--text-2xl)' }}>{s.company}</div>
                <p className={k.cardBody}>{s.summary}</p>
                <span className={k.cardLink}>Read the story <ArrowRight size={15} /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTABand title="Write your own story." sub="Start free, or talk to Pragya about what your company could run on the loop." primary="Get Started Free" />
    </>
  );
}
