'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import s from './ROICalculator.module.css';

const COST_PER_TASK = 0.06; // illustrative blended cost per automated task

function money(n: number) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return '$' + (n / 1000).toFixed(n >= 100_000 ? 0 : 1) + 'K';
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function ROICalculator() {
  const [heads, setHeads] = useState(10);
  const [salary, setSalary] = useState(55000);
  const [tasks, setTasks] = useState(800);

  const { current, hb, savings, roi, hbPct } = useMemo(() => {
    const current = heads * salary;
    const hb = Math.max(600, tasks * 365 * COST_PER_TASK);
    const savings = Math.max(0, current - hb);
    const roi = hb > 0 ? (savings / hb) * 100 : 0;
    const hbPct = current > 0 ? Math.max(2, (hb / current) * 100) : 2;
    return { current, hb, savings, roi, hbPct };
  }, [heads, salary, tasks]);

  return (
    <div className={s.calc}>
      <div className={s.inputs}>
        <Field label="Operational headcount" value={heads.toString()} >
          <input className={s.range} type="range" min={1} max={200} value={heads} onChange={(e) => setHeads(+e.target.value)} aria-label="Operational headcount" />
        </Field>
        <Field label="Avg. fully-loaded cost / head" value={money(salary) + '/yr'}>
          <input className={s.range} type="range" min={20000} max={200000} step={5000} value={salary} onChange={(e) => setSalary(+e.target.value)} aria-label="Average cost per head" />
        </Field>
        <Field label="Tasks automated / day" value={tasks.toLocaleString('en-US')}>
          <input className={s.range} type="range" min={50} max={5000} step={50} value={tasks} onChange={(e) => setTasks(+e.target.value)} aria-label="Tasks automated per day" />
        </Field>
      </div>

      <div className={s.output}>
        <div className={s.bars}>
          <div className={s.barRow}>
            <span className={s.barLabel}>The old way</span>
            <div className={s.barTrack}><motion.div className={s.barFillOld} animate={{ width: '100%' }} /></div>
            <span className={s.barVal}>{money(current)}<small>/yr</small></span>
          </div>
          <div className={s.barRow}>
            <span className={s.barLabel}>HireBuddha</span>
            <div className={s.barTrack}><motion.div className={s.barFillNew} animate={{ width: `${hbPct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 22 }} /></div>
            <span className={s.barVal}>{money(hb)}<small>/yr</small></span>
          </div>
        </div>
        <div className={s.result}>
          <div className={s.resBlock}>
            <div className={s.resNum}>{money(savings)}</div>
            <div className={s.resLabel}>estimated annual savings</div>
          </div>
          <div className={s.resBlock}>
            <div className={s.resNum}>{Math.round(roi).toLocaleString('en-US')}%</div>
            <div className={s.resLabel}>return on investment</div>
          </div>
        </div>
        <p className={s.disclaimer}>Illustrative estimate at a blended ${COST_PER_TASK.toFixed(2)} per task. Your real cost is lower on routine work — the router runs each step on the cheapest model that will succeed.</p>
      </div>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className={s.field}>
      <div className={s.fieldTop}><span className={s.fieldLabel}>{label}</span><span className={s.fieldValue}>{value}</span></div>
      {children}
    </div>
  );
}
