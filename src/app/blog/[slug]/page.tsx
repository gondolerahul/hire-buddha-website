import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero, Section, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { POSTS } from '@/lib/content';
import c from '@/components/page/content.module.css';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <article className={c.article}>
        <header className={c.articleHero}>
          <Reveal y={12}><div className={c.articleMeta}><span className="cat">{p.category}</span><span>·</span><span>{p.read} min read</span></div></Reveal>
          <Reveal y={18} delay={0.05}><h1 className={c.articleTitle}>{p.title}</h1></Reveal>
          <Reveal y={18} delay={0.1}><p className={c.articleExcerpt}>{p.excerpt}</p></Reveal>
        </header>
        <div className={c.articleRule} />
        <div className={c.articleBody}>
          {p.sections.map((sec, i) => (
            <Reveal key={i} y={16}>
              {sec.h && <h3>{sec.h}</h3>}
              <p>{sec.body}</p>
            </Reveal>
          ))}
        </div>
      </article>

      <CTABand title="Stop hiring. Start deploying." sub="Start free with $5 in daily credits, or talk to Pragya about your business." primary="Get Started Free" />
    </>
  );
}
