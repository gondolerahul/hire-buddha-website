import { notFound } from 'next/navigation';
import { PageHero, Section, SectionHead, Card, CardGrid, CTABand } from '@/components/page/kit';
import { Blocks } from '@/components/persona/Blocks';
import { findICP, ICP_SLUGS, ICP_SCENES } from '@/lib/icp';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return ICP_SLUGS.map((icp) => ({ icp }));
}

export async function generateMetadata({ params }: { params: Promise<{ icp: string }> }){
  const { icp } = await params;
  const data = findICP(icp);
  if (!data) return {};
  return buildMetadata({ title: `${data.nav}: ${data.concept}`, description: data.lead, path: `/for/${data.slug}` });
}

export default async function ICPPage({ params }: { params: Promise<{ icp: string }> }) {
  const { icp } = await params;
  const data = findICP(icp);
  if (!data) notFound();

  const last = data.blocks[data.blocks.length - 1];
  const closing = last?.type === 'cta' ? last : null;
  const narrative = closing ? data.blocks.slice(0, -1) : data.blocks;

  return (
    <>
      <PageHero
        scene={ICP_SCENES[data.slug]}
        eyebrow={data.eyebrow}
        title={data.headline}
        lead={data.lead}
        ctaPrimary={data.ctaPrimary}
        ctaPrimaryHref={data.ctaPrimaryHref}
        ctaPragya={data.pragyaCta}
        visual={data.heroVisual}
        align={data.heroVisual === 'center' ? 'center' : 'left'}
      />

      <Blocks items={narrative} />

      <Section>
        <SectionHead eyebrow="Go deeper" title={`Everything for ${data.name.toLowerCase()}.`} />
        <CardGrid cols={data.subPages.length === 4 ? 4 : 3}>
          {data.subPages.map((sp) => (
            <Card key={sp.slug} href={`/for/${data.slug}/${sp.slug}`} kicker="Deep dive" title={sp.nav} body={sp.desc} cta="Open" />
          ))}
        </CardGrid>
      </Section>

      {closing && <CTABand title={closing.title} sub={closing.sub} primary={closing.primary} primaryHref={closing.primaryHref} />}
    </>
  );
}
