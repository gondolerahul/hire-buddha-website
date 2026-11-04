'use client';

import { ArrowUpRight } from 'lucide-react';
import { LiquidGoldGL } from '@/components/visual/LiquidGoldGL';
import { KineticWords, Magnetic, Reveal } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import { SIGNUP_URL } from '@/config/company';
import s from './home.module.css';

// Every entrance here is CSS-driven (`immediate`), so the headline, lead and
// CTAs are in view from the server HTML, before hydration.

export function Hero() {
  return (
    <section className={s.hero} aria-label="HireBuddha — Stop hiring, start deploying">
      <div className={s.heroCanvas}><LiquidGoldGL radius={0.36} centerY={0.46} /></div>
      <div className={s.heroVignette} aria-hidden />

      <div className={`u-container u-container--wide ${s.heroInner}`}>
        <div className={s.heroGrid}>
          <Reveal immediate y={18} delay={0.15} className={`u-eyebrow ${s.heroEyebrow}`}>
            Autonomous AI Workforce
          </Reveal>

          <h1 className={s.heroTitle}>
            <KineticWords immediate as="span" className={s.ln} text="Stop Hiring." stagger={0.07} delay={0.2} />
            <KineticWords immediate as="span" className={s.ln} text="Start Deploying." stagger={0.07} delay={0.42} highlight={[1]} />
          </h1>

          <Reveal immediate as="p" y={18} delay={0.5} duration={0.8} className={s.heroSub}>
            Design AI Employees in minutes. Deploy entire business operations across phone,
            email, and chat — before lunch.
          </Reveal>

          <Reveal immediate y={18} delay={0.65} duration={0.8} className={s.heroCtas}>
            <Magnetic strength={0.4}>
              <a href={SIGNUP_URL} className="btn btn-gold btn-lg" data-cursor>Start Free <ArrowUpRight size={17} /></a>
            </Magnetic>
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => talkToPragya()}>Talk to Pragya →</button>
          </Reveal>

          <Reveal immediate y={18} delay={1.1} duration={1} className={s.scrollCue}>
            <span className={s.scrollLine} aria-hidden /> Scroll to explore
          </Reveal>
        </div>

        <Reveal immediate y={18} delay={0.9} duration={0.9} className={s.heroStatus} aria-hidden>
          <span className={s.statusChip}><span className={s.dot} /> One loop · Six arcs</span>
          <span className={s.statusChip}>24 / 7 / 365 · 0 attrition</span>
          <span className={s.statusChip}>₹50 to start</span>
        </Reveal>
      </div>
    </section>
  );
}
