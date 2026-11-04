import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, Section, CTABand } from '@/components/page/kit';
import { Stagger, StaggerItem } from '@/components/motion/primitives';
import { POSTS, readMinutes, postDate } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';
import k from '@/components/page/kit.module.css';
import c from '@/components/page/content.module.css';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes from an AI-native company: the unified loop, the economics of automation, CORTEX memory, model routing and the AI-native organization.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        scene="strokes"
        eyebrow="Blog"
        title="Notes from an AI-native company."
        lead="First-principles writing on the loop, the economics, and the architecture behind a self-improving workforce."
        ctaPragya="Talk to Pragya"
        visual="ring"
      />
      <Section>
        <Stagger className={`${k.grid} ${k.g2}`} stagger={0.07}>
          {POSTS.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/blog/${p.slug}`} className={k.card} data-cursor>
                <div className={k.cardGlow} aria-hidden />
                <div className={c.idxMeta}><span style={{ color: 'var(--accent)' }}>{p.category}</span><span className={c.dot} /><time dateTime={p.published}>{postDate(p)}</time><span className={c.dot} /><span>{readMinutes(p)} min read</span></div>
                <div className={k.cardTitle} style={{ fontSize: 'var(--text-2xl)' }}>{p.title}</div>
                <p className={k.cardBody}>{p.excerpt}</p>
                <span className={k.cardLink}>Read article <ArrowRight size={15} /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTABand title="Stop hiring. Start deploying." sub="Start free with ₹500 in daily credits, or talk to Pragya." primary="Start Free" />
    </>
  );
}
