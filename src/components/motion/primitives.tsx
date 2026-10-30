'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion, useMotionValue, useSpring, useReducedMotion, useScroll, useTransform,
  useInView, animate, useMotionTemplate, type Variants,
} from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ Reveal --
   Fade + rise on enter. Enhances an already-laid-out element (no visibility
   gating), and renders the final state immediately under reduced motion. */
export function Reveal({
  children, as = 'div', y = 26, delay = 0, duration = 0.7, amount = 0.3, className, style, ...rest
}: {
  children: React.ReactNode; as?: keyof typeof motion; y?: number; delay?: number;
  duration?: number; amount?: number; className?: string; style?: React.CSSProperties;
} & Record<`data-${string}`, unknown>) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      style={style}
      {...rest}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------- KineticWords --
   Splits a string into words, each masked behind an overflow-hidden box and
   rising into place with a stagger — the site's signature headline reveal.
   `highlight` indices render in brand gold (emphasis by color, not gradient). */
export function KineticWords({
  text, as = 'span', className, delay = 0, stagger = 0.055, duration = 0.85, highlight = [], amount = 0.5,
}: {
  text: string; as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'; className?: string;
  delay?: number; stagger?: number; duration?: number; highlight?: number[]; amount?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.span;
  const words = text.split(' ');

  if (reduce) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className}>
        {words.map((w, i) => (
          <span key={i} className={highlight.includes(i) ? 'u-gold' : undefined}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Plain>
    );
  }

  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const child: Variants = { hidden: { y: '115%' }, show: { y: 0, transition: { duration, ease: EASE } } };

  return (
    <Comp className={className} variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
          <motion.span variants={child} style={{ display: 'inline-block', willChange: 'transform' }} className={highlight.includes(i) ? 'u-gold' : undefined}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/* --------------------------------------------------------- Stagger wrappers -- */
export function Stagger({ children, className, stagger = 0.08, amount = 0.25, style }: {
  children: React.ReactNode; className?: string; stagger?: number; amount?: number; style?: React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} initial="hidden" whileInView="show" viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className, y = 22, style, ...rest }: {
  children: React.ReactNode; className?: string; y?: number; style?: React.CSSProperties;
} & Record<`data-${string}`, unknown>) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={style} {...rest}
      variants={reduce ? { hidden: {}, show: {} } : { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ Magnetic --
   Pointer-attracting wrapper for CTAs / the logo. Motion values only. */
export function Magnetic({ children, strength = 0.35, className, style }: {
  children: React.ReactNode; strength?: number; className?: string; style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} className={className} style={{ ...style, x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ Parallax -- */
export function Parallax({ children, distance = 80, className, style }: {
  children: React.ReactNode; distance?: number; className?: string; style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------- CountUp --
   Animates to `value` on first view, writing straight to the DOM (no rerenders). */
export function CountUp({ value, duration = 1.8, decimals = 0, prefix = '', suffix = '', className }: {
  value: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const fmt = (v: number) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (!ref.current) return;
    if (reduce || !inView) { if (inView && ref.current) ref.current.textContent = fmt(value); return; }
    const controls = animate(0, value, {
      duration, ease: EASE,
      onUpdate: (v) => { if (ref.current) ref.current.textContent = fmt(v); },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, prefix, suffix, reduce]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

/* ---------------------------------------------------------------------- Tilt --
   Pointer-tracked 3D tilt with a moving glare highlight. Wrap a card in it for
   a lacquered, physical feel. Springs only — no rerenders per move. */
export function Tilt({ children, max = 6, glare = true, className, style }: {
  children: React.ReactNode; max?: number; glare?: boolean; className?: string; style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const go = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 22, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22, mass: 0.5 });
  const sgo = useSpring(go, { stiffness: 180, damping: 26 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
    gx.set((px + 0.5) * 100);
    gy.set((py + 0.5) * 100);
    go.set(1);
  };
  const reset = () => { rx.set(0); ry.set(0); go.set(0); };

  // The glare is a motion template so it tracks without rerenders.
  const glareBg = useMotionTemplate`radial-gradient(60% 48% at ${gx}% ${gy}%, rgba(255,240,210,.10), rgba(255,240,210,.035) 42%, transparent 68%)`;

  return (
    <div className={className} style={{ ...style, perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', position: 'relative', height: '100%', willChange: 'transform' }}
      >
        {children}
        {glare && !reduce && (
          <motion.div aria-hidden style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: glareBg, opacity: sgo, mixBlendMode: 'plus-lighter', zIndex: 3,
          }} />
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ ScrollCue --
   A quiet "there is more below" affordance for heroes: a hairline with a
   travelling gold pulse and a mono label. Fades out once the user scrolls. */
export function ScrollCue({ label = 'Scroll', className }: { label?: string; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 220], [1, 0]);
  if (reduce) return null;
  return (
    <motion.div className={className} style={{ opacity, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12 }} aria-hidden>
      <span className="u-mono" style={{ fontSize: 10, letterSpacing: '0.22em' }}>{label}</span>
      <span style={{ position: 'relative', width: 1, height: 56, background: 'var(--border-strong)', overflow: 'hidden', display: 'block' }}>
        <motion.span
          style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 18, background: 'linear-gradient(180deg, transparent, var(--gold-300), transparent)', display: 'block' }}
          animate={{ y: [-18, 56] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 0.35 }}
        />
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- Marquee --
   Use at most once per page (craft rule). Pure-CSS translate, pauses on hover. */
export function Marquee({ children, speed = 38, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  return (
    <div className={`marquee ${className ?? ''}`} aria-hidden>
      <div className="marquee__track" style={{ ['--marquee-duration' as string]: `${speed}s` }}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}
