import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, Timeline, PillRow, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { ARCS } from '@/lib/site';
import { ARC_DETAIL, ARC_SLUGS, nextArc } from '@/lib/arcs';
import type { SceneName } from '@/components/visual/heroScenes';
import { buildMetadata } from '@/lib/metadata';

// Each arc gets its own hero instrument — the motif matches the arc's verb.
const ARC_SCENES: Record<string, SceneName> = {
  perceive: 'radar',        // pulses sweeping a field of signals
  engage: 'waveform',       // filaments of voice
  orchestrate: 'braid',     // many strands weaving into one line
  fulfill: 'conveyor',      // packets clearing checkpoints
  sustain: 'breath',        // a breathing mandala
  evolve: 'ascent',         // a rising double helix
};

export function generateStaticParams() {
  return ARC_SLUGS.map((arc) => ({ arc }));
}

export async function generateMetadata({ params }: { params: Promise<{ arc: string }> }){
  const { arc } = await params;
  const a = ARCS.find((x) => x.slug === arc);
  if (!a) return {};
  return buildMetadata({
    title: `${a.name}: Arc ${a.numeral} of Sheel`,
    description: `${a.oneLiner} Absorbs ${a.absorbs}.`,
    path: `/solutions/${a.slug}`,
  });
}

export default async function ArcPage({ params }: { params: Promise<{ arc: string }> }) {
  const { arc } = await params;
  const a = ARCS.find((x) => x.slug === arc);
  const d = ARC_DETAIL[arc];
  if (!a || !d) notFound();
  const next = nextArc(arc);

  return (
    <>
      <PageHero
        scene={ARC_SCENES[arc]}
        eyebrow={`Sheel · Arc ${a.numeral}${a.sanskrit ? ` · ${a.sanskrit}` : ''}`}
        title={a.name}
        lead={a.oneLiner}
        ctaPrimary="Activate this arc"
        ctaPragya={`Talk to Pragya about ${a.name}`}
        visual="ring"
      />

      <Section>
        <div style={{ marginBottom: 28 }}>
          <PillRow items={[`Absorbs · ${a.absorbs}`]} />
        </div>
        <Reveal y={18}>
          <p style={{ fontSize: 'var(--text-xl)', lineHeight: 1.5, color: 'var(--fg)', maxWidth: '62ch', letterSpacing: 'var(--track-tight)', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
            {d.intro}
          </p>
        </Reveal>
        {d.channels && (
          <div style={{ marginTop: 28 }}>
            <PillRow items={d.channels} />
          </div>
        )}
      </Section>

      <Section>
        <SectionHead title="What runs in this arc." />
        <CardGrid cols={2}>
          {d.capabilities.map((c) => <Card key={c.title} title={c.title} body={c.body} />)}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead eyebrow="The flow" title={`How ${a.name} executes inside the loop.`} />
        <Timeline items={d.flow} />
        <Reveal y={16}>
          <Link href={`/solutions/${next.slug}`} className="glass" data-cursor
            style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '22px 26px', borderRadius: 'var(--r-lg)' }}>
            <span>
              <span className="u-mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 6 }}>{d.handoff}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', letterSpacing: 'var(--track-tight)' }}>Continue to Arc {next.numeral} · {next.name}</span>
            </span>
            <ArrowRight size={22} color="var(--accent)" />
          </Link>
        </Reveal>
      </Section>

      <CTABand
        title={`Activate the ${a.name} arc.`}
        sub="Start with one arc or run all six. Pragya maps your business to Sheel and the Meta Agent builds what’s missing."
        primary="Start Free"
      />
    </>
  );
}
