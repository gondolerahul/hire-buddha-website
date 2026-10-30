'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import s from './DaySchedule.module.css';

type Task = { id: string; label: string; hours: number; ai: boolean };
const TASKS: Task[] = [
  { id: 'prospecting', label: 'Prospecting & outbound', hours: 1.5, ai: true },
  { id: 'followups', label: 'Lead follow-ups', hours: 1, ai: true },
  { id: 'support', label: 'Support tickets', hours: 1.5, ai: true },
  { id: 'invoicing', label: 'Invoicing & bookkeeping', hours: 1, ai: true },
  { id: 'marketing', label: 'Social & marketing', hours: 1, ai: true },
  { id: 'contracts', label: 'Contract review', hours: 0.5, ai: true },
  { id: 'email', label: 'Email management', hours: 1, ai: true },
  { id: 'scheduling', label: 'Meeting scheduling', hours: 0.5, ai: true },
  { id: 'product', label: 'Product / core work', hours: 1.5, ai: false },
  { id: 'planning', label: 'Strategic planning', hours: 0.5, ai: false },
];
const DAY = 10;

export function DaySchedule() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TASKS.map((t) => [t.id, true])));

  const toggle = (id: string) => setOn((p) => ({ ...p, [id]: !p[id] }));

  const { nowSegs, hbSegs, teamTasks, freed } = useMemo(() => {
    const selected = TASKS.filter((t) => on[t.id]);
    const yours = selected.filter((t) => !t.ai);
    const team = selected.filter((t) => t.ai);
    const sumSel = selected.reduce((a, t) => a + t.hours, 0);
    const sumYours = yours.reduce((a, t) => a + t.hours, 0);
    const freed = team.reduce((a, t) => a + t.hours, 0);

    const nowSegs = [
      ...selected.map((t) => ({ label: t.label, hours: t.hours, kind: t.ai ? 'ops' : 'you' as const })),
      { label: 'Deep work', hours: Math.max(0.4, DAY - sumSel), kind: 'thin' as const },
    ];

    const remaining = Math.max(0, DAY - sumYours - 0.3);
    const hbSegs = [
      ...(team.length ? [{ label: '15-min review', hours: 0.3, kind: 'review' as const }] : []),
      ...yours.map((t) => ({ label: t.label, hours: t.hours, kind: 'you' as const })),
      { label: 'Deep work', hours: remaining * 0.5, kind: 'deep' as const },
      { label: 'Strategy', hours: remaining * 0.3, kind: 'strategy' as const },
      { label: 'Your life', hours: remaining * 0.2, kind: 'life' as const },
    ].filter((seg) => seg.hours > 0.05);

    return { nowSegs, hbSegs, teamTasks: team, freed };
  }, [on]);

  return (
    <div className={s.tool}>
      <div className={s.pick}>
        <div className={s.pickLabel}>What fills your day?</div>
        <div className={s.chips}>
          {TASKS.map((t) => (
            <button key={t.id} className={s.chip} data-on={!!on[t.id]} onClick={() => toggle(t.id)}>
              <span className={s.box}>{on[t.id] && <Check size={12} strokeWidth={3} />}</span>{t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.days}>
        <Bar title="Your day, now" caption="Exhausting, right? Deep work is the sliver at the end — if you’re lucky." segs={nowSegs} />
        <Bar title="Your day, with HireBuddha" caption="Notice the difference? You’re doing the work that matters." segs={hbSegs} highlight />
        {teamTasks.length > 0 && (
          <div className={s.team}>
            <span className={s.teamLabel}>Your AI team handles</span>
            <div className={s.teamChips}>
              {teamTasks.map((t) => <span key={t.id} className={s.teamChip}>{t.label}</span>)}
            </div>
            <span className={s.freed}>+{freed.toFixed(1)} hrs back</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Bar({ title, caption, segs, highlight }: { title: string; caption: string; segs: { label: string; hours: number; kind: string }[]; highlight?: boolean }) {
  const total = segs.reduce((a, seg) => a + seg.hours, 0) || 1;
  return (
    <div className={s.barWrap}>
      <div className={s.barTitle} data-hl={!!highlight}>{title}</div>
      <div className={s.bar}>
        {segs.map((seg, i) => (
          <motion.div key={i} className={s.seg} data-kind={seg.kind}
            initial={false} animate={{ flexGrow: seg.hours }} transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            style={{ flexBasis: 0, flexGrow: seg.hours }} title={`${seg.label} · ${seg.hours.toFixed(1)}h`}>
            {seg.hours / total > 0.1 && <span className={s.segLabel}>{seg.label}</span>}
          </motion.div>
        ))}
      </div>
      <div className={s.caption}>{caption}</div>
    </div>
  );
}
