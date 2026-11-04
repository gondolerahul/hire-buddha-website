'use client';

import { ArrowUpRight } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { KineticWords, Reveal, Magnetic } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import { SIGNUP_URL } from '@/config/company';
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
            Every day you operate the old way is a day your competitors are deploying. Start with ₹500 in
            free daily credits. No credit card required.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={s.finalCtas}>
            <Magnetic strength={0.4}>
              <a href={SIGNUP_URL} className="btn btn-gold btn-lg" data-cursor>Start Free <ArrowUpRight size={17} /></a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => talkToPragya()}>Talk to Pragya</button>
            </Magnetic>
          </div>
          <p className={s.finalTiny}>₹500 daily credits · No card required · First AI Employee in under 10 minutes</p>
        </Reveal>
      </div>
    </section>
  );
}
