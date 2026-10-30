'use client';

import { Check, Minus } from 'lucide-react';
import { Reveal, KineticWords, Stagger, StaggerItem } from '@/components/motion/primitives';
import s from './home.module.css';

const OLD = [
  '90 days to onboard a single hire',
  '$45,000 average cost to recruit and train',
  '2.3 years average tenure — then the cycle repeats',
  'Context walks out the door when someone resigns',
  'Performance varies with fatigue, mood, and Monday mornings',
];
const NEW = [
  '10 minutes from design to deployment',
  '$0.50 minimum to start a process',
  '24 / 7 / 365 — no attrition, no sick days',
  'CORTEX memory retains everything, permanently',
  'Week 12 outperforms Week 1 — automatically',
];

export function ParadigmShift() {
  return (
    <section className="u-section">
      <div className="u-container">
        <Reveal>
          <h2 className={s.shiftHead}>
            You don&apos;t have a growth problem.{' '}
            <KineticWords as="span" text="You have a headcount problem." highlight={[2, 3]} />
          </h2>
        </Reveal>

        <div className={s.ledger}>
          <Reveal className={`${s.col} ${s.colOld}`} y={30} data-spot>
            <div className={s.colTag}>The old way</div>
            <div className={s.colTitle}>Departments. Headcount. Overhead.</div>
            <Stagger stagger={0.07}>
              {OLD.map((t) => (
                <StaggerItem key={t}><div className={s.row}><span className={s.rowIcon}><Minus size={16} color="var(--fg-faint)" /></span><span>{t}</span></div></StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal className={`${s.col} ${s.colNew}`} y={30} delay={0.1} data-spot>
            <div className={s.colTag}>The new way</div>
            <div className={s.colTitle} style={{ color: 'var(--fg)' }}>One loop. AI Employees. Outcomes.</div>
            <Stagger stagger={0.07}>
              {NEW.map((t) => (
                <StaggerItem key={t}><div className={s.row}><span className={s.rowIcon}><Check size={16} color="var(--accent)" /></span><span>{t}</span></div></StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        <Reveal y={20}>
          <p className={s.bridge}>
            Every dollar you spend on headcount is a dollar your competitor spends on growth.
            The math isn&apos;t complicated. The decision shouldn&apos;t be either.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
