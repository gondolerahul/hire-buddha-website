'use client';

import { ArrowUpRight, Mic } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { Reveal } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';

const PROMPTS = [
  'How would HireBuddha help my sales team?',
  'Map my business to Sheel.',
  'Build me an AI Employee that chases overdue invoices.',
  'Show me the pricing for a 20-person company.',
  'What’s the difference between an Agent and a Skill?',
];

export function PragyaConsole() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,420px) 1fr', gap: 'clamp(32px,6vw,72px)', alignItems: 'center' }} className="pragyaConsole">
      <Reveal y={28}>
        <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', boxShadow: 'var(--shadow-gold)', maxWidth: 420, marginInline: 'auto', width: '100%' }}>
          <LiquidGold radius={0.3} density={0.8} />
          <button onClick={() => talkToPragya()} aria-label="Talk to Pragya"
            style={{ position: 'absolute', inset: 0, margin: 'auto', width: 92, height: 92, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--on-accent)', background: 'var(--gradient-gold-metallic)', boxShadow: 'var(--shadow-gold)' }}>
            <Mic size={30} />
          </button>
        </div>
      </Reveal>
      <div>
        <Reveal><h2 style={{ fontSize: 'var(--text-3xl)', letterSpacing: 'var(--track-tight)', marginBottom: 14 }}>Ask her anything. Right here.</h2></Reveal>
        <Reveal delay={0.05}><p className="lead" style={{ marginBottom: 24 }}>This is the same intelligence that becomes your account manager. Try a prompt by text or voice.</p></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROMPTS.map((p, i) => (
            <Reveal key={p} delay={0.08 + i * 0.05}>
              <button onClick={() => talkToPragya(p)} data-cursor
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, width: '100%', textAlign: 'left', padding: '15px 18px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'rgba(255,255,255,.018)', color: 'var(--fg-muted)', fontSize: 'var(--text-sm)' }}
                className="promptHover">
                {p} <ArrowUpRight size={16} color="var(--accent)" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
