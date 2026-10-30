'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { KineticWords, Reveal, Magnetic } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import s from './home.module.css';

export function FinalCTA() {
  return (
    <section className={s.final} aria-label="Get started with HireBuddha">
      <div className={s.finalCanvas}><LiquidGold radius={0.42} centerY={0.7} density={0.75} /></div>
      <div className={s.finalGrad} aria-hidden />
      <div className={s.finalInner}>
        <h2 className={s.finalTitle}>
          <KineticWords as="span" text="Your AI workforce is ready." />{' '}
          <KineticWords as="span" text="The question is whether you are." highlight={[5]} delay={0.2} />
        </h2>
        <Reveal delay={0.2}>
          <p className={s.finalSub}>
            Every day you operate the old way is a day your competitors are deploying. Start with $5 in
            free daily credits. No credit card required.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={s.finalCtas}>
            <Magnetic strength={0.4}>
              <Link href="/contact" className="btn btn-gold btn-lg" data-cursor>Get Started Free <ArrowUpRight size={17} /></Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button className="btn btn-ghost btn-lg" onClick={() => talkToPragya()}>Talk to Pragya</button>
            </Magnetic>
          </div>
          <p className={s.finalTiny}>$5 daily credits · No card required · Deploy in under 10 minutes</p>
        </Reveal>
      </div>
    </section>
  );
}
