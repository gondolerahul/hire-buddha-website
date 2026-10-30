'use client';

import { ShieldCheck } from 'lucide-react';
import { Reveal, CountUp, Marquee } from '@/components/motion/primitives';
import { CUSTOMERS, INTEGRATIONS, SECURITY_BADGES } from '@/lib/site';
import s from './home.module.css';

export function Proof() {
  return (
    <section className="u-section">
      <div className="u-container">
        <div className={s.metrics}>
          <Reveal className={s.metric}>
            <div className={s.metricNum}><CountUp value={7} suffix="+" /></div>
            <div className={s.metricLabel}>industries automated end-to-end</div>
          </Reveal>
          <Reveal className={s.metric} delay={0.08}>
            <div className={s.metricNum}><CountUp value={6} /> <span>arcs</span></div>
            <div className={s.metricLabel}>one loop — every business function covered</div>
          </Reveal>
          <Reveal className={s.metric} delay={0.16}>
            <div className={s.metricNum}><CountUp value={0} /> <span>attrition</span></div>
            <div className={s.metricLabel}>24 / 7 / 365 — no sick days, no resignations</div>
          </Reveal>
        </div>

        <Reveal>
          <div className={s.marqueeLabel}>Trusted by companies that refuse to scale the old way</div>
          <Marquee speed={42}>
            {CUSTOMERS.map((c) => <span key={c} className={s.logoItem}>{c}</span>)}
          </Marquee>
        </Reveal>

        <Reveal>
          <div className={s.badges}>
            {SECURITY_BADGES.map((b) => (
              <span key={b} className={s.badge}><ShieldCheck size={13} /> {b}</span>
            ))}
          </div>
        </Reveal>

        <Reveal y={30}>
          <figure className={s.featured} data-spot>
            <blockquote className={s.featuredQuote}>
              India’s first AI-native legal firm runs on HireBuddha — marketing, sales, support, HR, finance,
              legal, and operations, all automated.
            </blockquote>
            <figcaption className={s.featuredMeta}>
              Durwankur AI Labs · Illustrative deployment
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className={s.marqueeLabel} style={{ marginTop: 56, marginBottom: 14 }}>
            Works with {INTEGRATIONS.join(' · ')}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
