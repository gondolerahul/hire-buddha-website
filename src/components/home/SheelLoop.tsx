'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { Reveal } from '@/components/motion/primitives';
import { ARCS } from '@/lib/site';
import s from './home.module.css';

const R0 = 0.16, R1 = 0.9;                 // river region within scroll progress
const SEG = (R1 - R0) / ARCS.length;

function ArcLayer({ p, i }: { p: MotionValue<number>; i: number }) {
  const arc = ARCS[i];
  const c = R0 + SEG * (i + 0.5);
  const opacity = useTransform(p, [c - SEG * 0.52, c - SEG * 0.36, c + SEG * 0.36, c + SEG * 0.52], [0, 1, 1, 0]);
  const y = useTransform(p, [c - SEG * 0.55, c + SEG * 0.55], [54, -54]);
  return (
    <motion.div className={s.sheelArc} style={{ opacity }}>
      <motion.div className={s.sheelArcInner} style={{ y }}>
        <div className={s.sheelNumeral}>ARC {arc.numeral}</div>
        <h3 className={s.sheelArcName}>{arc.name}{arc.sanskrit && <em>{arc.sanskrit}</em>}</h3>
        <p className={s.sheelArcLine}>{arc.oneLiner}</p>
        <p className={s.sheelAbsorbs}>Absorbs · {arc.absorbs}</p>
      </motion.div>
    </motion.div>
  );
}

function RailSeg({ p, i }: { p: MotionValue<number>; i: number }) {
  const c = R0 + SEG * (i + 0.5);
  const scaleX = useTransform(p, [c - SEG * 0.5, c + SEG * 0.5], [0, 1]);
  return <span className={s.railSeg}><motion.span className={s.railSegFill} style={{ scaleX }} /></span>;
}

export function SheelLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const gold = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [0, 1, 1, 0.05]);

  if (reduce) {
    return (
      <section className="u-section">
        <div className="u-container">
          <div className={s.head}>
            <div className="u-eyebrow" style={{ marginBottom: 18 }}>शील · Sheel · Disciplined Conduct</div>
            <h2>One loop runs your whole company.</h2>
            <p>Traditional businesses have departments. AI-native businesses have Sheel — one continuous loop that perceives, engages, orchestrates, fulfills, sustains, and evolves.</p>
          </div>
          <div className={s.sheelStatic}>
            {ARCS.map((a) => (
              <Link key={a.slug} href={`/solutions/${a.slug}`} className={s.sheelStaticCard}>
                <div className={s.sheelNumeral}>ARC {a.numeral}</div>
                <h3 style={{ fontSize: 'var(--text-2xl)', margin: '8px 0 10px' }}>{a.name}</h3>
                <p style={{ color: 'var(--fg-muted)' }}>{a.oneLiner}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={s.sheel} style={{ height: '580vh' }} aria-label="Sheel — one loop, six arcs">
      <div className={s.sheelStage}>
        <div className={s.sheelCanvas}><LiquidGold progress={gold} radius={0.34} interactive={false} /></div>
        <div className={s.sheelGrad} aria-hidden />

        <div className={s.sheelTop}>
          <Reveal y={16}><div className="u-eyebrow" style={{ justifyContent: 'center', marginBottom: 14 }}>शील · Sheel · Disciplined Conduct</div></Reveal>
          <Reveal y={16} delay={0.05}><h2 className={s.sheelTitle}>One loop runs your whole company.</h2></Reveal>
        </div>

        {ARCS.map((_, i) => <ArcLayer key={i} p={scrollYProgress} i={i} />)}

        <div className={s.sheelRail} aria-hidden>{ARCS.map((_, i) => <RailSeg key={i} p={scrollYProgress} i={i} />)}</div>
        <div className={s.sheelPhil}><b>Pragya</b> knows · <b>Sheel</b> acts · <b>Karuna</b> cares</div>
      </div>
    </section>
  );
}
