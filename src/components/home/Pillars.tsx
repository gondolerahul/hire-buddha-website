'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Infinity as Loop, Coins, type LucideIcon } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import s from './home.module.css';

type Pillar = { num: string; title: string; body: string; href: string; cta: string; icon: LucideIcon };

const PILLARS: Pillar[] = [
  {
    num: '01', title: 'Not chatbots. Cognitive workers.', icon: Bot, href: '/product/ai-employees', cta: 'Explore AI Employees',
    body: 'A five-tier hierarchy — Action, Skill, Agent, Process, Loop — that thinks, reasons, and self-corrects through an 8-stage cognitive loop. Need a capability that doesn’t exist? Describe it. The Meta Agent builds the employee for you.',
  },
  {
    num: '02', title: 'Your entire company. One loop.', icon: Loop, href: '/solutions', cta: 'Explore Sheel',
    body: 'Traditional businesses leak money at every handoff between silos. Sheel dissolves them into one continuous, self-running loop — six arcs sharing one brain, one memory, one face. No departments. No seams. No context lost.',
  },
  {
    num: '03', title: 'Rupees per task. Not salaries per head.', icon: Coins, href: '/pricing', cta: 'See Pricing',
    body: 'Every task is billed to a fraction of a paisa. An Intelligent Router sends each step to the cheapest model that will succeed — so you pay frontier prices only on the 10–20% of steps that truly need them.',
  },
];

export function Pillars() {
  return (
    <section className="u-section">
      <div className="u-container">
        <Reveal>
          <h2 className={s.shiftHead} style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
            Three ideas that change how you build a company.
          </h2>
        </Reveal>

        <Stagger className={s.pillars} stagger={0.12}>
          {PILLARS.map((p) => (
            <StaggerItem key={p.num}>
              <div className={s.pillar}>
                <span className={s.pillarNum}>{p.num}</span>
                <h3 className={s.pillarTitle}>{p.title}</h3>
                <p className={s.pillarBody}>{p.body}</p>
                <Link href={p.href} className={s.pillarLink} data-cursor>{p.cta} <ArrowRight size={15} /></Link>
                <p.icon className={s.pillarIcon} size={120} strokeWidth={0.5} aria-hidden />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
