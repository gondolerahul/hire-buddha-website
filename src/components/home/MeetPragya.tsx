'use client';

import { ArrowUpRight, Mic } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { Reveal } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import { PRAGYA_PROMPTS } from '@/lib/site';
import s from './home.module.css';

export function MeetPragya() {
  return (
    <section className={`u-section ${s.pragya}`}>
      <div className="u-container">
        <div className={s.pragyaGrid}>
          <Reveal y={30}>
            <div className={s.pragyaOrb} style={{ borderRadius: '50%', overflow: 'hidden', boxShadow: 'var(--shadow-gold)' }}>
              <LiquidGold radius={0.3} interactive density={0.7} />
              <button
                onClick={() => talkToPragya()}
                aria-label="Talk to Pragya"
                style={{
                  position: 'absolute', inset: 0, margin: 'auto', width: 84, height: 84, borderRadius: '50%',
                  display: 'grid', placeItems: 'center', color: 'var(--on-accent)',
                  background: 'var(--gradient-gold-metallic)', boxShadow: 'var(--shadow-gold)',
                }}
              >
                <Mic size={28} />
              </button>
            </div>
          </Reveal>

          <div>
            <Reveal><div className="u-eyebrow" style={{ marginBottom: 18 }}>Your AI Account Manager</div></Reveal>
            <Reveal delay={0.05}><h2 style={{ fontSize: 'var(--text-5xl)', letterSpacing: 'var(--track-tight)' }}>Meet Pragya. Your single point of contact.</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="lead" style={{ marginTop: 22 }}>
                Not a chatbot — a live HireBuddha AI Employee, running on the same platform you’ll use.
                She onboards your business, connects your systems, builds your workforce with the Meta Agent,
                assigns the work, and reports back. Talk to her here, by text or voice.
              </p>
            </Reveal>

            <div className={s.pragyaPrompts}>
              {PRAGYA_PROMPTS.map((p, i) => (
                <Reveal key={p} delay={0.12 + i * 0.06}>
                  <button className={s.promptChip} onClick={() => talkToPragya(p)}>
                    {p} <ArrowUpRight size={16} />
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <p className={s.pragyaNote}>
                Everything Pragya does here — understanding your business, mapping it to a plan, generating
                solutions — is exactly what she’ll do for your company every day. The demo is the product.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
