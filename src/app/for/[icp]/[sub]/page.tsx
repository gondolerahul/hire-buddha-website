import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page/kit';
import { Blocks } from '@/components/persona/Blocks';
import { SetICP } from '@/components/persona/SetICP';
import { findICP, ICPS, ICP_SCENES } from '@/lib/icp';

export function generateStaticParams() {
  return ICPS.flatMap((i) => i.subPages.map((sp) => ({ icp: i.slug, sub: sp.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ icp: string; sub: string }> }): Promise<Metadata> {
  const { icp, sub } = await params;
  const data = findICP(icp);
  const sp = data?.subPages.find((x) => x.slug === sub);
  if (!data || !sp) return {};
  return { title: `${sp.title.replace(/[.]$/, '')} — ${data.nav}`, description: sp.desc };
}

export default async function ICPSubPage({ params }: { params: Promise<{ icp: string; sub: string }> }) {
  const { icp, sub } = await params;
  const data = findICP(icp);
  const sp = data?.subPages.find((x) => x.slug === sub);
  if (!data || !sp) notFound();

  return (
    <>
      <SetICP icp={data.icpSlug} />
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
      <Blocks items={sp.blocks} />
    </>
  );
}
