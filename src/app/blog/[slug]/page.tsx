import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { POSTS, POST_AUTHOR, POST_NEXT, readMinutes, postDate } from '@/lib/content';
import { company, SITE_URL } from '@/config/company';
import { buildMetadata } from '@/lib/metadata';
import c from '@/components/page/content.module.css';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: 'article' });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const i = POSTS.indexOf(p);
  const more = [POSTS[(i + 1) % POSTS.length], POSTS[(i + 2) % POSTS.length]];
  const next = POST_NEXT[p.category];
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: p.title, description: p.excerpt, articleSection: p.category,
    datePublished: p.published, dateModified: p.published,
    url: `${SITE_URL}/blog/${p.slug}`, mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
    author: { '@type': 'Organization', name: POST_AUTHOR, url: SITE_URL },
    publisher: { '@type': 'Organization', name: company.legalName, url: company.url, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo-hire-buddha-gold.svg` } },
    image: `${SITE_URL}/opengraph-image`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <article className={c.article}>
        <header className={c.articleHero}>
          <Reveal immediate y={12}><div className={c.articleMeta}><span className="cat">{p.category}</span><span>·</span><time dateTime={p.published}>{postDate(p)}</time><span>·</span><span>{readMinutes(p)} min read</span><span>·</span><span>{POST_AUTHOR}</span></div></Reveal>
          <Reveal immediate y={18} delay={0.05}><h1 className={c.articleTitle}>{p.title}</h1></Reveal>
          <Reveal immediate y={18} delay={0.1}><p className={c.articleExcerpt}>{p.excerpt}</p></Reveal>
        </header>
        <div className={c.articleRule} />
        <div className={c.articleBody}>
          {p.sections.map((sec, idx) => (
            <Reveal key={idx} y={16}>
              {sec.h && <h2>{sec.h}</h2>}
              <p>{sec.body}</p>
            </Reveal>
          ))}
        </div>

        <nav className={c.related} aria-label="Keep reading">
          <h2 className={c.relatedHead}>Keep reading</h2>
          <ul>
            {next && <li><Link href={next.href}>{next.label} <ArrowRight size={15} /></Link></li>}
            {more.map((m) => <li key={m.slug}><Link href={`/blog/${m.slug}`}>{m.title} <ArrowRight size={15} /></Link></li>)}
          </ul>
        </nav>
      </article>

      <CTABand title="Stop hiring. Start deploying." sub="Start free with ₹500 in daily credits, or talk to Pragya about your business." primary="Start Free" />
    </>
  );
}
