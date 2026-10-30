'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Infinity as Loop, Workflow, Bot, Wrench, Zap, Plus, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/motion/primitives';
import s from './TierStack.module.css';

type Tier = { tier: string; name: string; analogy: string; desc: string; example: string; icon: LucideIcon; w: number };

const TIERS: Tier[] = [
  { tier: 'Tier 1', name: 'Loop', analogy: 'The whole company', icon: Loop, w: 100,
    desc: 'A continuously-running business function that never terminates — it owns goals, KPIs, schedules, and a portfolio of Processes. Where a Process ends, a Loop persists. Your entire company runs as one Loop: Sheel.',
    example: 'The Growth & Acquisition Loop owns lead-gen, qualification, nurture, and conversion — on its own cadence. It never sleeps.' },
  { tier: 'Tier 2', name: 'Process', analogy: 'CEO / VP — the orchestrator', icon: Workflow, w: 84,
    desc: 'A complete business workflow. It receives inputs, builds a dynamic dependency graph, schedules child runs, handles parallel branches, and summarizes outcomes. The project plan that executes itself.',
    example: '“Quarterly Lead Nurture” ingests stale leads, fans out qualification calls, routes warm leads to the Deal Closer, and reports conversion.' },
  { tier: 'Tier 3', name: 'Agent', analogy: 'Manager / Department Head', icon: Bot, w: 68,
    desc: 'Manages a communication channel or domain. Maintains conversational state, applies guidelines, searches the knowledge base, routes to specialists. This is where personality lives — tone, empathy, humor, formality.',
    example: '“Sarah — Lead Qualification Rep” answers inbound calls, qualifies against your ICP, books demos, and remembers every prospect.' },
  { tier: 'Tier 4', name: 'Skill', analogy: 'Specialist / Task Executor', icon: Wrench, w: 52,
    desc: 'An optimized block of logic focused on a single technical task. Takes raw inputs, runs computations, generates documents, delivers outputs. No conversation — just precise, reliable execution.',
    example: '“Contract Generation & E-Signature Routing” parses templates, runs ROI math, builds a PDF, and routes via DocuSign.' },
  { tier: 'Tier 5', name: 'Action', analogy: 'API Caller / Tool Operator', icon: Zap, w: 36,
    desc: 'A thin wrapper around a single registered Tool — the interface between the AI Engine and external systems. The smallest unit of work in the platform.',
    example: '“Query Salesforce for Company ID” calls the CRM API, validates the response, handles timeouts, returns the result.' },
];

export function TierStack() {
  const [open, setOpen] = useState(0);
  return (
    <div className={s.wrap}>
      <div className={s.spineNote}><span>Build&nbsp;up</span><div className={s.spineArrow} /></div>
      <div className={s.stack}>
        {TIERS.map((t, i) => {
          const active = open === i;
          return (
            <Reveal key={t.name} y={20} delay={i * 0.05}>
              <button className={s.plate} data-spot data-active={active} style={{ width: `${t.w}%` }} onClick={() => setOpen(active ? -1 : i)} aria-expanded={active}>
                <div className={s.plateHead}>
                  <span className={s.plateIcon}><t.icon size={20} strokeWidth={1.6} /></span>
                  <span className={s.plateMeta}>
                    <span className={s.plateTier}>{t.tier}</span>
                    <span className={s.plateName}>{t.name}</span>
                  </span>
                  <span className={s.plateAnalogy}>{t.analogy}</span>
                  <span className={s.platePlus} data-active={active}><Plus size={18} /></span>
                </div>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div className={s.plateBody}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                      <p className={s.plateDesc}>{t.desc}</p>
                      <p className={s.plateExample}><span>Example</span> {t.example}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
