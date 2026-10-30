'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import s from './home.module.css';

const CASES = [
  { n: '01', t: 'Automate your outbound sales pipeline', l: 'From cold lead to closed deal — prospecting, qualifying, calling, proposing, and signing — without a single SDR on payroll.', tags: 'Engage Arc · Voice · Email · WhatsApp' },
  { n: '02', t: 'Deploy 24/7 customer support in 10 minutes', l: 'Omnichannel care that remembers every conversation, resolves in seconds, and escalates only what it can’t handle — with empathy, in any language.', tags: 'Engage Arc · Voice · Chat · Email' },
  { n: '03', t: 'Run financial reconciliation on autopilot', l: 'Bank-feed sync, ledger matching, AR collections, and cash-flow forecasting — continuous, not month-end.', tags: 'Sustain Arc · Finance · Banking' },
  { n: '04', t: 'Screen candidates with AI voice interviews', l: 'Structured first-round phone interviews that score, rank, and shortlist — in any language, at any hour.', tags: 'Engage Arc · Voice · HR' },
];

export function UseCases() {
  return (
    <section className="u-section">
      <div className="u-container">
        <div className={s.head} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', flexWrap: 'wrap', gap: 24 }}>
          <Reveal><h2>Deploy in minutes. Impact in hours.</h2></Reveal>
          <Reveal delay={0.1}><Link href="/use-cases" className="btn-text" data-cursor>See all use cases <ArrowRight size={16} className="arrow" /></Link></Reveal>
        </div>

        <Stagger className={s.ucGrid} stagger={0.1}>
          {CASES.map((c) => (
            <StaggerItem key={c.n}>
              <Link href="/use-cases" className={s.ucCard} data-cursor="view" data-cursor-label="Explore" data-spot>
                <div className={s.ucGlow} aria-hidden />
                <span className={s.ucNum}>{c.n}</span>
                <div>
                  <h3 className={s.ucTitle}>{c.t}</h3>
                  <p className={s.ucLine}>{c.l}</p>
                </div>
                <div className={s.ucTags}>{c.tags}</div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
