import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page/kit';
import { Blocks } from '@/components/persona/Blocks';
import { findICP, ICPS, ICP_SCENES } from '@/lib/icp';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return ICPS.flatMap((i) => i.subPages.map((sp) => ({ icp: i.slug, sub: sp.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ icp: string; sub: string }> }){
  const { icp, sub } = await params;
  const data = findICP(icp);
  const sp = data?.subPages.find((x) => x.slug === sub);
  if (!data || !sp) return {};
  // The short `desc` is written for cards; the lead makes a fuller description.
  return buildMetadata({ title: `${sp.title.replace(/[.]$/, '')} · ${data.nav}`, description: `${sp.desc} ${sp.lead}`, path: `/for/${data.slug}/${sp.slug}` });
}

export default async function ICPSubPage({ params }: { params: Promise<{ icp: string; sub: string }> }) {
  const { icp, sub } = await params;
  const data = findICP(icp);
  const sp = data?.subPages.find((x) => x.slug === sub);
  if (!data || !sp) notFound();

  return (
    <>
      <PageHero
        scene={ICP_SCENES[data.slug]}
        eyebrow={sp.eyebrow}
        title={sp.title}
        lead={sp.lead}
        ctaPrimary={data.ctaPrimary}
        ctaPrimaryHref={data.ctaPrimaryHref}
        ctaPragya={data.pragyaCta}
        visual="ring"
      />
      <Blocks items={sp.blocks} outline={sp.nav} />
    </>
  );
}
