'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { LiquidGold } from '@/components/visual/LiquidGold';
import { HeroScene } from '@/components/visual/HeroScene';
import type { SceneName } from '@/components/visual/heroScenes';
import { Reveal, KineticWords, Stagger, StaggerItem, Magnetic, Parallax, CountUp, ScrollCue } from '@/components/motion/primitives';
import { talkToPragya } from '@/lib/pragya';
import { SIGNUP_URL } from '@/config/company';
import s from './kit.module.css';

/* ---------------------------------------------------------------- PageHero -- */
export function PageHero({
  eyebrow, title, lead, ctaPrimary, ctaPrimaryHref = SIGNUP_URL, ctaPragya, align = 'left', visual = 'ring', scene,
}: {
  eyebrow: string; title: string; lead: string;
  ctaPrimary?: string; ctaPrimaryHref?: string; ctaPragya?: string;
  align?: 'left' | 'center'; visual?: 'ring' | 'center' | 'none';
  /** Bespoke hero instrument — replaces the default LiquidGold canvas. */
  scene?: SceneName;
}) {
  const center = align === 'center';
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // As the hero scrolls away the copy drifts up and dissolves while the molten
  // canvas lags behind — a two-plane parallax that gives the page physical depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 110]);

  return (
    <section className={s.hero} ref={ref}>
      {scene ? (
        <motion.div className={s.heroVisualCenter} style={reduce ? undefined : { y: visualY }}>
          <HeroScene scene={scene} focalX={center ? 0.5 : 0.66} focalY={center ? 0.46 : 0.5} />
        </motion.div>
      ) : (
        <>
          {visual === 'ring' && <motion.div className={s.heroVisual} style={reduce ? undefined : { y: visualY }}><LiquidGold radius={0.4} centerY={0.5} density={0.7} /></motion.div>}
          {visual === 'center' && <motion.div className={s.heroVisualCenter} style={reduce ? undefined : { y: visualY }}><LiquidGold radius={0.36} centerY={0.46} density={0.8} /></motion.div>}
        </>
      )}
      {(scene ? !center : visual === 'ring') && <div className={s.heroVeil} aria-hidden />}
      {(scene ? center : visual === 'center') && <div className={s.heroVeilCenter} aria-hidden />}
      <div className="u-container u-container--wide">
        <motion.div className={`${s.heroInner} ${center ? s.heroInnerCenter : ''}`} style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          {/* `immediate`: CSS entrances, visible from the server HTML. */}
          <Reveal immediate y={14}><div className={`u-eyebrow ${s.heroEyebrow}`}>{eyebrow}</div></Reveal>
          <h1 className={s.heroTitle}><KineticWords immediate text={title} stagger={0.05} /></h1>
          <Reveal immediate y={18} delay={0.15}><p className={s.heroLead}>{lead}</p></Reveal>
          {(ctaPrimary || ctaPragya) && (
            <Reveal immediate y={18} delay={0.25}>
              <div className={s.heroCtas}>
                {ctaPrimary && (
                  <Magnetic strength={0.25}>
                    <Link href={ctaPrimaryHref} className="btn btn-gold btn-lg" data-cursor>{ctaPrimary} <ArrowUpRight size={17} /></Link>
                  </Magnetic>
                )}
                {ctaPragya && <button type="button" className="btn btn-ghost btn-lg" onClick={() => talkToPragya(ctaPragya === 'Talk to Pragya' ? undefined : ctaPragya)}>Talk to Pragya</button>}
              </div>
            </Reveal>
          )}
          <div className={s.heroCue}><ScrollCue /></div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- SectionHead -- */
export function SectionHead({ eyebrow, title, lead, center, highlight }: {
  eyebrow?: string; title: string; lead?: string; center?: boolean; highlight?: number[];
}) {
  return (
    <div className={`${s.head} ${center ? s.center : ''}`}>
      {eyebrow && <Reveal y={12}><div className={`u-eyebrow ${s.headEyebrow}`} style={center ? { justifyContent: 'center' } : undefined}>{eyebrow}</div></Reveal>}
      <Reveal y={16}><h2><KineticWords text={title} highlight={highlight} stagger={0.04} /></h2></Reveal>
      {lead && <Reveal y={16} delay={0.08}><p>{lead}</p></Reveal>}
    </div>
  );
}

/* ---------------------------------------------------------------- Section --- */
export function Section({ children, className, id, wide }: { children: React.ReactNode; className?: string; id?: string; wide?: boolean }) {
  return (
    <section id={id} className={`u-section ${className ?? ''}`}>
      <div className={`u-container ${wide ? 'u-container--wide' : ''}`}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------- Card --- */
export function Card({ icon, kicker, title, body, href, cta }: {
  icon?: React.ReactNode; kicker?: string; title: string; body: string; href?: string; cta?: string;
}) {
  const inner = (
    <>
      <div className={s.cardGlow} aria-hidden />
      {icon && <div className={s.cardIcon}>{icon}</div>}
      {kicker && <div className={s.cardKicker}>{kicker}</div>}
      <div className={s.cardTitle}>{title}</div>
      <p className={s.cardBody}>{body}</p>
      {cta && <span className={s.cardLink}>{cta} <ArrowRight size={15} /></span>}
    </>
  );
  return href
    ? <Link href={href} className={s.card} data-cursor data-spot>{inner}</Link>
    : <div className={s.card} data-spot>{inner}</div>;
}

export function CardGrid({ cols = 3, children }: { cols?: 2 | 3 | 4; children: React.ReactNode }) {
  return (
    <Stagger className={`${s.grid} ${cols === 2 ? s.g2 : cols === 4 ? s.g4 : s.g3}`} stagger={0.08}>
      {React.Children.map(children, (c, i) => <StaggerItem key={i}>{c}</StaggerItem>)}
    </Stagger>
  );
}

/* ----------------------------------------------------------------- Split ---- */
export function Split({ reverse, title, body, items, visual }: {
  reverse?: boolean; title: string; body: string; items?: string[]; visual?: React.ReactNode;
}) {
  return (
    <div className={`${s.split} ${reverse ? s.rev : ''}`}>
      <Reveal y={24}>
        <div>
          <h2 className={s.splitTitle}>{title}</h2>
          <p className={s.splitBody}>{body}</p>
          {items && (
            <Stagger className={s.splitList} stagger={0.09} amount={0.4}>
              {items.map((it) => (
                <StaggerItem key={it} y={14} className={s.splitListItem}><Check size={18} /> <span>{it}</span></StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Reveal>
      <Reveal y={30} delay={0.1}>
        <div className={s.splitVisual} data-spot>
          <Parallax distance={34} className={s.splitVisualInner}>
            {visual ?? <LiquidGold radius={0.32} density={0.6} />}
          </Parallax>
        </div>
      </Reveal>
    </div>
  );
}

/* --------------------------------------------------------------- StatGrid --- */
/* Numbers roll up from zero on first view — "₹50" and "99%" style strings
   are parsed into prefix / value / suffix so the odometer works everywhere. */
function StatValue({ num }: { num: string }) {
  const m = num.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return <>{num}</>;
  const value = parseFloat(m[2].replace(/,/g, ''));
  if (!isFinite(value)) return <>{num}</>;
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return <CountUp value={value} decimals={decimals} prefix={m[1]} suffix={m[3]} duration={1.6} />;
}

export function StatGrid({ stats }: { stats: { num: string; label: string; accent?: string }[] }) {
  return (
    <Stagger className={s.stats} stagger={0.06}>
      {stats.map((st) => (
        <StaggerItem key={st.label} className={s.stat} data-spot>
          <div className={s.statNum}>{st.accent ? <><StatValue num={st.num} /> <span>{st.accent}</span></> : <StatValue num={st.num} />}</div>
          <div className={s.statLabel}>{st.label}</div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* --------------------------------------------------------------- Timeline --- */
/* A golden thread pours down the rail as the reader scrolls; each node kindles
   when the thread reaches it, and rows lean in on hover. */
export function Timeline({ items }: { items: { num?: string; title: string; body: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.78', 'end 0.5'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  return (
    <div ref={ref} className={s.tlwrap}>
      <div className={s.tline} aria-hidden>
        <motion.div className={s.tlineFill} style={{ scaleY: reduce ? 1 : scaleY }} />
      </div>
      <Stagger className={s.tlist} stagger={0.08}>
        {items.map((it, i) => (
          <StaggerItem key={it.title} className={s.titem}>
            <div className={s.tnum}>{it.num ?? String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3 className={s.ttitle}>{it.title}</h3>
              <p className={s.tbody}>{it.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ----------------------------------------------------------------- Pills ---- */
export function PillRow({ items, icon }: { items: string[]; icon?: React.ReactNode }) {
  return (
    <Stagger className={s.pillRow} stagger={0.035} amount={0.3}>
      {items.map((p) => <StaggerItem key={p} y={10}><span className={s.pill}>{icon}{p}</span></StaggerItem>)}
    </Stagger>
  );
}

/* --------------------------------------------------------------- CTA Band --- */
export function CTABand({ title, sub, primary = 'Start Free', primaryHref = SIGNUP_URL, highlight }: {
  title: string; sub?: string; primary?: string; primaryHref?: string; highlight?: number[];
}) {
  return (
    <section className={s.cta}>
      <div className={s.ctaCanvas}><LiquidGold radius={0.42} centerY={0.66} density={0.7} /></div>
      <div className={s.ctaVeil} aria-hidden />
      <div className={s.ctaInner}>
        <h2 className={s.ctaTitle}><KineticWords text={title} highlight={highlight} /></h2>
        {sub && <Reveal y={16} delay={0.1}><p className={s.ctaSub}>{sub}</p></Reveal>}
        <Reveal y={16} delay={0.2}>
          <div className={s.ctaRow}>
            {primary === 'Talk to Pragya' ? (
              <>
                <Magnetic strength={0.3}>
                  <button type="button" className="btn btn-gold btn-lg" onClick={() => talkToPragya()}>Talk to Pragya</button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link href={SIGNUP_URL} className="btn btn-ghost btn-lg" data-cursor>Start Free <ArrowUpRight size={17} /></Link>
                </Magnetic>
              </>
            ) : (
              <>
                <Magnetic strength={0.3}>
                  <Link href={primaryHref} className="btn btn-gold btn-lg" data-cursor>{primary} <ArrowUpRight size={17} /></Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <button type="button" className="btn btn-ghost btn-lg" onClick={() => talkToPragya()}>Talk to Pragya</button>
                </Magnetic>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
