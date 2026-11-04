import { Compass, Gauge, HeartHandshake, Infinity as Loop } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'About — Buddha Cognitive Lab',
  description: 'Buddha Cognitive Lab is a frontier AI lab building HireBuddha — the platform that lets any business design, deploy, and employ an autonomous AI workforce. Towards digital enlightenment.',
  path: '/about',
});

const BELIEFS = [
  { icon: Compass, title: 'Outcomes over org charts', body: 'The department was a workaround for human specialization. Design for autonomous execution and the company resolves into one loop.' },
  { icon: Gauge, title: 'Premium, calm, precise', body: 'Power doesn’t have to shout. We build software that feels considered — quiet surfaces, exact behavior, no theatrics.' },
  { icon: HeartHandshake, title: 'The demo is the product', body: 'Pragya runs live on the same platform you’ll use. What you experience here is what your business runs on tomorrow.' },
  { icon: Loop, title: 'Better every week', body: 'A workforce that compounds. The slowest, least capable version is the one you run today — and that’s the point.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        scene="dawn"
        eyebrow="Buddha Cognitive Lab"
        title="Towards digital enlightenment."
        lead="We’re a frontier AI lab building HireBuddha — the platform that lets any business design, deploy, and employ an autonomous AI workforce. Not a chatbot. A company that runs itself."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="center"
        align="center"
      />

      <Section>
        <SectionHead title="Why we exist." />
        <Reveal y={16}>
          <div style={{ maxWidth: '70ch' }}>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, fontSize: 'var(--text-md)', marginBottom: 22 }}>
              Every business spends its first decade building departments — hiring, training, managing, and replacing people to run functions that, in principle, could run themselves. We think that era is ending.
            </p>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, fontSize: 'var(--text-md)', marginBottom: 22 }}>
              HireBuddha lets you design an AI Employee, deploy it across every channel, and employ it to run real operations — sales, support, finance, legal, HR, and more — on one unified loop called Sheel. The Meta Agent builds what you can’t, and the Learning System makes your workforce better at your business every week. That learning stays inside each business; we never train shared models on customer data.
            </p>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.8, fontSize: 'var(--text-md)' }}>
              The names we use carry the idea. <b style={{ color: 'var(--fg)' }}>Pragya</b> is wisdom — the single point of contact who knows everything. <b style={{ color: 'var(--fg)' }}>Sheel</b> is disciplined conduct — the loop that acts. <b style={{ color: 'var(--fg)' }}>Karuna</b> is compassion — the face turned to the world. Wise within, disciplined throughout, compassionate outward.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHead title="What we believe." />
        <CardGrid cols={4}>
          {BELIEFS.map((b) => <Card key={b.title} icon={<b.icon size={22} strokeWidth={1.6} />} title={b.title} body={b.body} />)}
        </CardGrid>
      </Section>

      <CTABand title="Build the company that runs itself." sub="Start free, or talk to Pragya about where your business should begin." primary="Start Free" />
    </>
  );
}
