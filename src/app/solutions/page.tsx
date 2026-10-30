import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, Section, SectionHead, CTABand } from '@/components/page/kit';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import { ARCS } from '@/lib/site';
import s from './solutions.module.css';

export const metadata: Metadata = {
  title: 'Sheel — One Unified Business Loop',
  description: 'Seven departments were seven silos with six seams. Sheel collapses them into one self-running loop of six continuous arcs — sharing one brain, one memory, one face. No silos. No seams.',
};

const MAP = [
  { before: 'Market research · BI · Monitoring · Lead intake', arc: ARCS[0] },
  { before: 'Marketing · Sales · Support · Success · Recruiting', arc: ARCS[1] },
  { before: 'Management · Strategy · Planning · PM · Dispatch', arc: ARCS[2] },
  { before: 'Operations · Delivery · Production · Logistics · QA', arc: ARCS[3] },
  { before: 'Finance · Legal · Compliance · HR · IT · Procurement', arc: ARCS[4] },
  { before: 'R&D · BI · Continuous improvement · Reporting', arc: ARCS[5] },
];

const TRIAD = [
  { name: 'Pragya', sans: 'प्रज्ञा · Wisdom', body: 'The all-knowing single point of contact — the inward face. She knows everything and routes the work.' },
  { name: 'Sheel', sans: 'शील · Discipline', body: 'The one unified loop that runs every function with consistency and integrity. The loop that acts.' },
  { name: 'Karuna', sans: 'करुणा · Compassion', body: 'The empathetic, omnichannel interface the business turns to the world — the outward face.' },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        scene="loop6"
        eyebrow="Solutions · Sheel"
        title="From departments to one loop. From silos to Sheel."
        lead="Seven loops were still seven silos with six seams between them. Sheel collapses them into one unified, self-running loop — six continuous arcs sharing one brain, one memory, and one face."
        ctaPrimary="Deploy into Sheel"
        ctaPragya="Talk to Pragya"
        visual="center"
        align="center"
      />

      <Section>
        <SectionHead eyebrow="The redesign" title="Every department becomes an arc." lead="The org chart was an accident of needing humans to specialize. Remove that constraint and the whole company resolves into one loop." />
        <div className={s.map}>
          {MAP.map((m) => (
            <Reveal key={m.arc.slug} y={16} className={s.mapRow}>
              <div className={s.mapBefore}>{m.before}</div>
              <ArrowRight className={s.mapArrow} size={20} />
              <Link href={`/solutions/${m.arc.slug}`} className={s.mapAfter} data-cursor>
                <span className={s.mapAfterIcon}><m.arc.icon size={20} strokeWidth={1.6} /></span>
                <span className={s.mapAfterText}><span>Arc {m.arc.numeral}</span><b>{m.arc.name}</b></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="The philosophy" title="Pragya knows. Sheel acts. Karuna cares." center />
        <div className={s.triad}>
          {TRIAD.map((t) => (
            <Reveal key={t.name} y={24} className={s.triadCard}>
              <div className={s.triadName}>{t.name}</div>
              <div className={s.triadSans}>{t.sans}</div>
              <p className={s.triadBody}>{t.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal y={16}><p className={s.triadLine}>Wise within. <b>Disciplined</b> throughout. Compassionate outward.</p></Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Six arcs" title="One loop runs your whole company." />
        <Stagger className={s.arcs} stagger={0.07}>
          {ARCS.map((a) => (
            <StaggerItem key={a.slug}>
              <Link href={`/solutions/${a.slug}`} className={s.arc} data-cursor>
                <span className={s.arcNum}>{a.numeral}</span>
                <span className={s.arcIcon}><a.icon size={22} strokeWidth={1.6} /></span>
                <div className={s.arcName}>{a.name} {a.sanskrit && <em>{a.sanskrit}</em>}</div>
                <p className={s.arcLine}>{a.oneLiner}</p>
                <div className={s.arcAbsorbs}>Absorbs · {a.absorbs}</div>
                <span className={s.arcGo}>Explore arc <ArrowRight size={15} /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        title="Deploy into Sheel in 10 minutes."
        sub="Start with one arc or run all six. Pragya maps your business to the loop and the Meta Agent builds what’s missing."
        primary="Get Started Free"
      />
    </>
  );
}
