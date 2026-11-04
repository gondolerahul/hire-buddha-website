'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import s from './Intelligence.module.css';

/* ----------------------------------------------------------- ModelRouter ---- */
const MODELS = ['BabyBuddha', 'Claude Opus', 'ChatGPT', 'Gemini', 'GLM', 'Qwen', 'Mistral'];
const SCENARIOS = [
  { task: 'Classify an inbound email', model: 'BabyBuddha', mode: 'fast mode', cost: '₹0.03' },
  { task: 'Extract line items from a PDF', model: 'Gemini', mode: 'vision', cost: '₹0.09' },
  { task: 'Plan a 9-step outreach', model: 'BabyBuddha', mode: 'extended reasoning', cost: '₹0.35' },
  { task: 'Redline a vendor contract', model: 'Claude Opus', mode: 'frontier', cost: '₹5.27' },
  { task: 'Summarize a call transcript', model: 'Qwen', mode: 'long-context', cost: '₹0.16' },
];

export function ModelRouter() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % SCENARIOS.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  const sc = SCENARIOS[i];

  return (
    <div className={s.router}>
      <div className={s.routerStep}>
        <span className={s.routerLabel}>Reasoning step</span>
        <AnimatePresence mode="wait">
          <motion.span key={sc.task} className={s.routerTask}
            initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
            {sc.task}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className={s.routerCore}>
        <ArrowRight className={s.routerArrow} size={18} />
        <div className={s.routerHub}>Intelligent Router</div>
        <ArrowRight className={s.routerArrow} size={18} />
      </div>

      <div className={s.routerModels}>
        {MODELS.map((m) => (
          <span key={m} className={s.routerModel} data-active={!reduce && m === sc.model}>{m}</span>
        ))}
        <AnimatePresence mode="wait">
          <motion.div key={sc.model + sc.cost} className={s.routerBadge}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <b>{sc.model}</b> · {sc.mode} · <span className={s.routerCost}>{sc.cost}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- AgentLoopRing ---- */
const STAGES = [
  { n: 'Perceive', d: 'Loads inputs, semantic chunks, and active context.' },
  { n: 'Strategize', d: 'Selects the next action or prompts the planner.' },
  { n: 'Pre-Critic', d: 'Audits the action before execution — circuit-breaker after 3 blocks.' },
  { n: 'Act', d: 'Executes the step against the bound tool.' },
  { n: 'Observe', d: 'Processes outputs and checks for runtime blocks.' },
  { n: 'Post-Critic', d: 'Supervisor checks alignment, logs usage, schedules retries.' },
  { n: 'Reflect', d: 'Writes logical reflections back to CORTEX memory.' },
  { n: 'Decide', d: 'Continue, replan, finish, or abort.' },
];

export function AgentLoopRing() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((p) => (p + 1) % STAGES.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className={s.loop}>
      <div className={s.loopRing}>
        {STAGES.map((st, idx) => {
          const a = (idx / STAGES.length) * 360;
          return (
            <button key={st.n} className={s.loopNode} data-active={active === idx}
              style={{ transform: `rotate(${a}deg) translate(var(--loop-r)) rotate(${-a}deg)` }}
              onMouseEnter={() => setActive(idx)} onFocus={() => setActive(idx)}>
              <span className={s.loopDot} /><span className={s.loopName}>{st.n}</span>
            </button>
          );
        })}
        <div className={s.loopCenter}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <div className={s.loopCenterNum}>0{active + 1} / 08</div>
              <div className={s.loopCenterName}>{STAGES[active].n}</div>
              <div className={s.loopCenterDesc}>{STAGES[active].d}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
