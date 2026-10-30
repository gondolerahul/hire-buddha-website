'use client';

import { useEffect, useRef } from 'react';

// Ambient depth layer — a fixed canvas at z-index -1, between the warm-black
// page background and the content. Three planes live here, painted back to
// front each frame, each scrolling at its own rate (content above moves at
// 1×, so the whole page reads as staged depth):
//
//   · The seal (bottom-most, slowest plane) — one monumental ghosted HireBuddha
//     mark, right of centre, rendered like unpolished bronze: a band of light
//     travels across it as the reader scrolls, and the whole seal rides a
//     bounded parallax drift. The light pools pass over it.
//   · Light pools — vast, candle-dim gold glows that drift in slow orbits as
//     the reader scrolls, like lamplight from another room moving with you.
//   · Gold dust (up to ~0.16×) — sparse motes on three depth planes that
//     parallax against scroll, twinkle on long periods, and stretch faintly
//     when the page is in motion, settling the instant it rests.
//
// Everything is driven by smoothed scroll position + velocity, so the layer
// answers the reader's hand rather than looping on its own. Reduced motion
// renders one settled static frame. Content with its own background (cards,
// glass, footer) occludes the layer naturally.
const GOLD: [number, number, number][] = [[255, 243, 220], [253, 200, 113], [237, 171, 72]];

type Mote = { x: number; y0: number; d: number; ph: number; size: number; tone: number };
type Pool = { bx: number; by: number; r: number; ph: number; par: number; alpha: number; tone: number };

export function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sprites = GOLD.map(([r, g, b]) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g2 = c.getContext('2d')!;
      const grd = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grd.addColorStop(0.3, `rgba(${r},${g},${b},.4)`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      g2.fillStyle = grd;
      g2.fillRect(0, 0, 64, 64);
      return c;
    });
    const glow = (x: number, y: number, r: number, alpha: number, tone: number) => {
      if (alpha <= 0) return;
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.drawImage(sprites[tone], x - r, y - r, r * 2, r * 2);
      ctx.globalAlpha = 1;
    };

    let w = 1, h = 1;
    let raf = 0, running = false;
    let t = 0, last = performance.now();
    let smoothY = window.scrollY, vel = 0;

    // The seal — pre-rastered once; each frame a travelling sheen gradient is
    // composited into its alpha (source-in) so light moves across the metal.
    const LOGO_AR = 215.37 / 541.8;
    let markBase: HTMLCanvasElement | null = null;
    let markSheen: HTMLCanvasElement | null = null;
    const logo = new Image();
    logo.onload = () => {
      const mh = 1200, mw = Math.ceil(mh * LOGO_AR);
      markBase = document.createElement('canvas');
      markBase.width = mw; markBase.height = mh;
      markBase.getContext('2d')!.drawImage(logo, 0, 0, mw, mh);
      markSheen = document.createElement('canvas');
      markSheen.width = mw; markSheen.height = mh;
      if (reduce) draw();
    };
    logo.src = '/images/logo-mark-gold.svg';

    let motes: Mote[] = [];
    let pools: Pool[] = [];
    const seed = () => {
      motes = Array.from({ length: 42 }, (_, i) => ({
        x: Math.random(),
        y0: Math.random() * (h + 60),
        d: 0.3 + (i % 3) * 0.35,                       // three depth planes
        ph: Math.random() * Math.PI * 2,
        size: 0.9 + Math.random() * 1.5,
        tone: i % 5 === 0 ? 1 : 2,
      }));
      pools = [
        { bx: 0.16, by: 0.24, r: 0.52, ph: 0.7, par: 1.0, alpha: 0.045, tone: 2 },
        { bx: 0.85, by: 0.6, r: 0.44, ph: 2.9, par: 1.7, alpha: 0.03, tone: 1 },
        { bx: 0.55, by: 0.95, r: 0.6, ph: 5.1, par: 0.6, alpha: 0.03, tone: 2 },
      ];
    };

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter';
      seed();
      if (reduce) { t = 4; draw(); }
    };

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const sy = smoothY;

      // the seal — bottom-most plane, bounded parallax, travelling sheen
      if (markBase && markSheen) {
        const mh = h * 0.92, mw = mh * LOGO_AR;
        // bounded drift with ~0.15× local scroll rate (A·k ≈ 0.15 at h=900)
        const drift = Math.sin(sy * 0.00105 + 1.1) * h * 0.16 + Math.sin(t * 0.03) * 6;
        const mx = w * 0.76 - mw / 2;
        const my = h * 0.52 - mh / 2 + drift;
        // recolour the mark through its own alpha: bronze body, bright band
        const W = markSheen.width, H = markSheen.height;
        const g = markSheen.getContext('2d')!;
        g.globalCompositeOperation = 'source-over';
        g.clearRect(0, 0, W, H);
        g.drawImage(markBase, 0, 0);
        g.globalCompositeOperation = 'source-in';
        const band = (((sy * 0.00055 + t * 0.009) % 1.6) + 1.6) % 1.6 - 0.3;
        const gr = g.createLinearGradient(0, H * (band - 0.34), 0, H * (band + 0.34));
        gr.addColorStop(0, 'rgba(168,114,42,0.5)');
        gr.addColorStop(0.5, 'rgba(255,240,214,1)');
        gr.addColorStop(1, 'rgba(168,114,42,0.5)');
        g.fillStyle = gr;
        g.fillRect(0, 0, W, H);
        ctx.globalAlpha = 0.1;
        ctx.drawImage(markSheen, mx, my, mw, mh);
        ctx.globalAlpha = 1;
      }

      // light pools orbit slowly with scroll; time alone barely moves them
      for (const p of pools) {
        const x = p.bx * w + Math.cos(sy * 0.0013 * p.par + p.ph + t * 0.016) * w * 0.07;
        const y = p.by * h + Math.sin(sy * 0.0018 * p.par + p.ph * 1.6 + t * 0.02) * h * 0.12;
        glow(x, y, p.r * Math.max(w, h), p.alpha, p.tone);
      }

      // gold dust — parallax by depth, stirred by velocity
      const stir = Math.min(14, Math.abs(vel) * 0.010);          // px of streak
      const lift = 1 + Math.min(0.45, Math.abs(vel) * 0.00035);  // brightness while moving
      const dir = vel >= 0 ? 1 : -1;
      const wrap = h + 60;
      for (const m of motes) {
        const y = ((((m.y0 - sy * 0.5 * m.d - t * 2.2 * m.d) % wrap) + wrap) % wrap) - 30;
        const x = m.x * w + Math.sin(t * 0.1 + m.ph) * 14 * m.d;
        const tw = 0.55 + 0.45 * Math.sin(t * (0.3 + m.d * 0.22) + m.ph * 3);
        const a = (0.028 + m.d * 0.075) * tw * lift;
        glow(x, y, m.size + m.d * 1.1, a, m.tone);
        if (stir > 0.5) glow(x, y + stir * m.d * dir, m.size * 0.8, a * 0.4, m.tone);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      const target = window.scrollY;
      const v = (target - smoothY) / Math.max(dt, 0.001);
      vel += (v - vel) * 0.08;
      smoothY += (target - smoothY) * 0.12;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const setRunning = (on: boolean) => {
      if (on === running) return;
      running = on;
      if (on) { last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    window.addEventListener('resize', resize);
    resize();
    const onVis = () => { if (!reduce) setRunning(!document.hidden); };
    document.addEventListener('visibilitychange', onVis);
    if (!reduce) setRunning(true);

    return () => {
      setRunning(false);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="ambientLayer"
      style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }}
    />
  );
}
