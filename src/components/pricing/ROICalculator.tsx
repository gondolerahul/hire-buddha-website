'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import s from './ROICalculator.module.css';

const COST_PER_TASK = 5; // illustrative blended cost per automated task, in rupees (≈ $0.06)
const WORK_DAYS = 250;

// Only the share of the team's work that HireBuddha takes on is compared:
// the cost of that share of payroll against the cost of running the same
// tasks on HireBuddha (people × tasks a day × share × working days × cost).

// Rupees in the Indian style: ₹4,500 · ₹8.5 lakh · ₹1.25 crore.
function money(n: number) {
  if (n >= 1_00_00_000) return '₹' + (n / 1_00_00_000).toFixed(2) + ' crore';
  if (n >= 1_00_000) return '₹' + (n / 1_00_000).toFixed(1) + ' lakh';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export function ROICalculator() {
  const [heads, setHeads] = useState(10);
  const [salary, setSalary] = useState(8_00_000);
  const [tasks, setTasks] = useState(40);
  const [share, setShare] = useState(30);

  const { current, hb, savings, lower, hbPct } = useMemo(() => {
    const current = heads * salary * (share / 100);
    const hb = heads * tasks * (share / 100) * WORK_DAYS * COST_PER_TASK;
    const savings = Math.max(0, current - hb);
    const lower = current > 0 ? Math.min(99, Math.round((savings / current) * 100)) : 0;
    const hbPct = current > 0 ? Math.max(2, (hb / current) * 100) : 2;
    return { current, hb, savings, lower, hbPct };
  }, [heads, salary, tasks, share]);

  return (
    <div className={s.calc}>
      <div className={s.inputs}>
        <Field label="Operational headcount" value={heads.toString()} >
          <input className={s.range} type="range" min={1} max={200} value={heads} onChange={(e) => setHeads(+e.target.value)} aria-label="Operational headcount" />
        </Field>
        <Field label="Avg. fully-loaded cost / head" value={money(salary) + '/yr'}>
          <input className={s.range} type="range" min={3_00_000} max={50_00_000} step={50_000} value={salary} onChange={(e) => setSalary(+e.target.value)} aria-label="Average cost per head" />
        </Field>
        <Field label="Tasks per person / day" value={tasks.toLocaleString('en-US')}>
          <input className={s.range} type="range" min={5} max={200} step={5} value={tasks} onChange={(e) => setTasks(+e.target.value)} aria-label="Tasks per person per day" />
        </Field>
        <Field label="Share of that work HireBuddha takes on" value={`${share}%`}>
          <input className={s.range} type="range" min={5} max={80} step={5} value={share} onChange={(e) => setShare(+e.target.value)} aria-label="Share of the work HireBuddha takes on" />
        </Field>
      </div>

      <div className={s.output}>
        <div className={s.bars}>
          <div className={s.barRow}>
            <span className={s.barLabel}>That work today</span>
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
            <div className={s.resNum}>{lower}%</div>
            <div className={s.resLabel}>lower cost for that work</div>
          </div>
        </div>
        <p className={s.disclaimer}>Illustrative estimate: it compares only the share of work you choose, over {WORK_DAYS} working days, at a blended ₹{COST_PER_TASK} per task. It does not include the time your team spends reviewing and approving. Real costs depend on the work; the router runs each step on the cheapest model that will succeed.</p>
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
