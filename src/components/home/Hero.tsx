'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LiquidGoldGL } from '@/components/visual/LiquidGoldGL';
import { KineticWords, Magnetic } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import s from './home.module.css';

const FADE = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

export function Hero() {
  return (
    <section className={s.hero} aria-label="HireBuddha — Stop hiring, start deploying">
      <div className={s.heroCanvas}><LiquidGoldGL radius={0.36} centerY={0.46} /></div>
      <div className={s.heroVignette} aria-hidden />

      <div className={`u-container u-container--wide ${s.heroInner}`}>
        <div className={s.heroGrid}>
          <motion.div className={`u-eyebrow ${s.heroEyebrow}`} {...FADE} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            Autonomous AI Workforce
          </motion.div>

          <h1 className={s.heroTitle}>
            <KineticWords as="span" className={s.ln} text="Stop Hiring." stagger={0.07} delay={0.2} />
            <KineticWords as="span" className={s.ln} text="Start Deploying." stagger={0.07} delay={0.42} highlight={[1]} />
          </h1>

          <motion.p className={s.heroSub} {...FADE} transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            Design AI Employees in minutes. Deploy entire business operations across phone,
            email, and chat — before lunch.
          </motion.p>

          <motion.div className={s.heroCtas} {...FADE} transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>
            <Magnetic strength={0.4}>
              <Link href="/contact" className="btn btn-gold btn-lg" data-cursor>Get Started Free <ArrowUpRight size={17} /></Link>
            </Magnetic>
            <button className="btn btn-ghost btn-lg" onClick={() => talkToPragya()}>Talk to Pragya →</button>
          </motion.div>

          <motion.div className={s.scrollCue} {...FADE} transition={{ duration: 1, delay: 1.4 }}>
            <span className={s.scrollLine} aria-hidden /> Scroll to explore
          </motion.div>
        </div>

        <motion.div className={s.heroStatus} {...FADE} transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} aria-hidden>
          <span className={s.statusChip}><span className={s.dot} /> One loop · Six arcs</span>
          <span className={s.statusChip}>24 / 7 / 365 · 0 attrition</span>
          <span className={s.statusChip}>$0.50 to start</span>
        </motion.div>
      </div>
    </section>
  );
}
