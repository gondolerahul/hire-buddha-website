'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion, type MotionValue } from 'framer-motion';

type Props = {
  /** Optional 0..1 scrub. 0 = coiled ring (Sheel), 1 = unrolled river of light. */
  progress?: MotionValue<number>;
  /** Particle density multiplier. */
  density?: number;
  /** Pointer attraction/swirl. */
  interactive?: boolean;
  /** Fraction of the smaller canvas side used as the ring radius. */
  radius?: number;
  /** Vertical center as a fraction of height (lets the ring sit high/low). */
  centerY?: number;
  /** Show the central jewel core (Pragya). */
  core?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

// The signature instrument — a luxurious molten-gold halo.
//   · a dark, clean interior (eclipse aesthetic)
//   · a crisp metallic ring filament with a rotating conic specular sweep
//   · a dense band of fine, sharp gold-dust particles flowing in filaments
//   · a small refined jewel core (Pragya)
// Given a `progress` MotionValue, the ring + core dissolve and the dust
// unrolls into a flowing river of light.
export function LiquidGold({
  progress, density = 1, interactive = true, radius = 0.34, centerY = 0.5, core = true, className, style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const progressRef = useRef(0);

  useEffect(() => {
    if (!progress) return;
    progressRef.current = progress.get();
    const unsub = progress.on('change', (v) => { progressRef.current = v; });
    return () => unsub();
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const supportsConic = typeof (ctx as CanvasRenderingContext2D & { createConicGradient?: unknown }).createConicGradient === 'function';

    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    // --- three crisp pre-rendered sprites: white-hot, gold, deep amber -------
    const makeSprite = (stops: [number, string][]) => {
      const c = document.createElement('canvas');
      const SS = 48; c.width = c.height = SS;
      const g = c.getContext('2d')!;
      const grad = g.createRadialGradient(SS / 2, SS / 2, 0, SS / 2, SS / 2, SS / 2);
      stops.forEach(([o, col]) => grad.addColorStop(o, col));
      g.fillStyle = grad; g.fillRect(0, 0, SS, SS);
      return c;
    };
    const sHot = makeSprite([[0, 'rgba(255,253,248,1)'], [0.16, 'rgba(255,238,205,0.96)'], [0.42, 'rgba(255,206,132,0.34)'], [1, 'rgba(255,206,132,0)']]);
    const sGold = makeSprite([[0, 'rgba(255,241,208,1)'], [0.2, 'rgba(247,196,110,0.9)'], [0.5, 'rgba(237,171,72,0.28)'], [1, 'rgba(237,171,72,0)']]);
    const sAmber = makeSprite([[0, 'rgba(250,206,140,0.95)'], [0.26, 'rgba(206,142,56,0.66)'], [0.56, 'rgba(150,100,38,0.2)'], [1, 'rgba(150,100,38,0)']]);
    const sprites = [sHot, sGold, sAmber];
    const baseTone = [0.95, 0.72, 0.55];

    type P = { p0: number; sp: number; band: number; wob: number; wph: number; wsp: number; size: number; tone: number; tw0: number; tws: number; vx: number; vy: number };
    let parts: P[] = [];

    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

    const build = () => {
      const area = (w * h) / (1280 * 720);
      const count = Math.round(clamp(2600 * area, 850, 4200) * density);
      parts = new Array(count).fill(0).map(() => {
        const spark = Math.random() < 0.1;
        const tone = (() => { const r = Math.random(); return r < 0.16 ? 0 : r < 0.76 ? 1 : 2; })();
        return {
          p0: Math.random(),
          sp: 0.0085 + Math.random() * 0.013,
          band: gauss() * 0.05 + (spark ? (Math.random() - 0.5) * 0.2 : 0),
          wob: 0.004 + Math.random() * 0.012,
          wph: Math.random() * TAU,
          wsp: 0.4 + Math.random() * 1.6,
          size: 1.4 + Math.pow(Math.random(), 1.9) * 6,
          tone,
          tw0: Math.random() * TAU,
          tws: 1.4 + Math.random() * 2.6,
          vx: 0, vy: 0,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      ctx.fillStyle = '#0a0908';
      ctx.fillRect(0, 0, w, h);
    };

    const ease = (t: number) => t * t * (3 - 2 * t);

    // crisp metallic specular ring + glowing accent
    const drawRing = (cx: number, cy: number, R: number, a: number) => {
      if (!supportsConic) {
        ctx.globalAlpha = a * 0.5; ctx.strokeStyle = 'rgba(237,171,72,0.6)';
        ctx.lineWidth = Math.max(1.4, R * 0.018); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
        return;
      }
      const make = (ctx as unknown as { createConicGradient: (s: number, x: number, y: number) => CanvasGradient }).createConicGradient.bind(ctx);
      const t = performance.now() / 1000;
      const cg = make(t * 0.22, cx, cy);
      cg.addColorStop(0.00, 'rgba(138,90,34,0.5)');
      cg.addColorStop(0.10, 'rgba(255,244,210,1)');
      cg.addColorStop(0.19, 'rgba(176,118,48,0.42)');
      cg.addColorStop(0.40, 'rgba(120,78,28,0.3)');
      cg.addColorStop(0.55, 'rgba(255,237,190,0.92)');
      cg.addColorStop(0.66, 'rgba(168,112,44,0.42)');
      cg.addColorStop(0.84, 'rgba(120,78,28,0.32)');
      cg.addColorStop(1.00, 'rgba(138,90,34,0.5)');
      ctx.globalAlpha = a;
      ctx.lineWidth = Math.max(1.5, R * 0.02);
      ctx.strokeStyle = cg;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      // crisp glowing inner accent filament
      ctx.shadowColor = 'rgba(253,200,113,0.85)';
      ctx.shadowBlur = Math.max(4, R * 0.045);
      ctx.globalAlpha = a * 0.85;
      ctx.lineWidth = Math.max(1, R * 0.006);
      ctx.strokeStyle = 'rgba(255,248,228,0.92)';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawCore = (cx: number, cy: number, R: number, a: number, t: number) => {
      let cb = R * 0.5; ctx.globalAlpha = a * 0.24; ctx.drawImage(sHot, cx - cb / 2, cy - cb / 2, cb, cb);
      cb = R * 0.22; ctx.globalAlpha = a * 0.46; ctx.drawImage(sHot, cx - cb / 2, cy - cb / 2, cb, cb);
      const pulse = 1 + Math.sin(t * 1.6) * 0.09;
      cb = R * 0.075 * pulse; ctx.globalAlpha = a * 0.95; ctx.drawImage(sHot, cx - cb / 2, cy - cb / 2, cb, cb);
      // soft-tipped 4-point glint
      const gl = R * 0.36;
      ctx.globalAlpha = a * 0.5; ctx.lineWidth = 1.1;
      const gx = ctx.createLinearGradient(cx - gl, cy, cx + gl, cy);
      gx.addColorStop(0, 'rgba(255,248,228,0)'); gx.addColorStop(0.5, 'rgba(255,248,228,0.9)'); gx.addColorStop(1, 'rgba(255,248,228,0)');
      ctx.strokeStyle = gx; ctx.beginPath(); ctx.moveTo(cx - gl, cy); ctx.lineTo(cx + gl, cy); ctx.stroke();
      const gy = ctx.createLinearGradient(cx, cy - gl, cx, cy + gl);
      gy.addColorStop(0, 'rgba(255,248,228,0)'); gy.addColorStop(0.5, 'rgba(255,248,228,0.9)'); gy.addColorStop(1, 'rgba(255,248,228,0)');
      ctx.strokeStyle = gy; ctx.beginPath(); ctx.moveTo(cx, cy - gl); ctx.lineTo(cx, cy + gl); ctx.stroke();
      // thin inner halo
      ctx.globalAlpha = a * 0.16; ctx.strokeStyle = 'rgba(237,171,72,0.85)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.42, 0, TAU); ctx.stroke();
    };

    const drawStatic = () => {
      ctx.fillStyle = '#0a0908'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h * centerY, R = Math.min(w, h) * radius;
      ctx.globalCompositeOperation = 'lighter';
      // glow band
      const gg = ctx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R * 1.5);
      gg.addColorStop(0, 'rgba(237,171,72,0)'); gg.addColorStop(0.45, 'rgba(237,171,72,0.07)');
      gg.addColorStop(0.62, 'rgba(253,200,113,0.05)'); gg.addColorStop(1, 'rgba(237,171,72,0)');
      ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, TAU); ctx.fill();
      for (let i = 0; i < 520; i++) {
        const a = (i / 520) * TAU;
        const warm = 0.62 + 0.38 * Math.max(0, Math.cos(a));
        ctx.globalAlpha = (0.3 + 0.6 * warm);
        const s = 3 + (i % 7 === 0 ? 5 : 1.5);
        ctx.drawImage(sGold, cx + Math.cos(a) * R - s / 2, cy + Math.sin(a) * R - s / 2, s, s);
      }
      drawRing(cx, cy, R, 0.85);
      if (core) drawCore(cx, cy, R, 0.7, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };

    let start = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const prog = ease(clamp(progressRef.current, 0, 1));
      const cx = w / 2, cy = h * centerY, R = Math.min(w, h) * radius;
      const rot = t * 0.06;

      // trails — crisp in ring state, longer streaks as it flows into the river
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(10,9,8,${0.34 - prog * 0.13})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';

      // outer glow band (ring state)
      const glowA = (1 - prog) * 0.9;
      if (glowA > 0.02) {
        const gg = ctx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R * 1.5);
        gg.addColorStop(0, 'rgba(237,171,72,0)');
        gg.addColorStop(0.45, `rgba(237,171,72,${0.07 * glowA})`);
        gg.addColorStop(0.62, `rgba(253,200,113,${0.05 * glowA})`);
        gg.addColorStop(1, 'rgba(237,171,72,0)');
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, TAU); ctx.fill();
      }

      // particles — the molten gold dust band / river
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const phase = (p.p0 + t * p.sp) % 1;
        const a = phase * TAU + rot;
        const rad = R * (1 + p.band) + Math.sin(t * p.wsp + p.wph) * R * p.wob;

        const rx = cx + Math.cos(a) * rad;
        const ry = cy + Math.sin(a) * rad;

        const flow = (phase + t * 0.05) % 1;
        const vx = flow * (w + 220) - 110;
        const vy = cy + Math.sin(flow * TAU * 2.2 + t * 0.55) * h * 0.17 + p.band * R * 1.4;

        let px = rx + (vx - rx) * prog;
        let py = ry + (vy - ry) * prog;

        if (interactive && pointer.active) {
          const dx = px - pointer.x, dy = py - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 24000) {
            const f = 1 - d2 / 24000;
            const inv = 1 / Math.sqrt(d2 + 1);
            p.vx += dx * inv * f * 0.9 - dy * 0.0007 * f * R;
            p.vy += dy * inv * f * 0.9 + dx * 0.0007 * f * R;
          }
        }
        p.vx *= 0.88; p.vy *= 0.88;
        px += p.vx; py += p.vy;

        // flowing filament density + Karuna warm rim + twinkle
        const lobe = clamp(0.6 + 0.25 * Math.sin(a * 2 - t * 0.45) + 0.15 * Math.sin(a * 5 + t * 0.8 + p.p0 * 6), 0.42, 1.12);
        const warm = 0.62 + 0.38 * Math.max(0, Math.cos(a));
        const tw = 0.8 + 0.2 * Math.sin(t * p.tws + p.tw0);
        ctx.globalAlpha = Math.min(1, baseTone[p.tone] * lobe * warm * tw);
        const s = (1.6 + p.size) * (1 + prog * 0.15);
        ctx.drawImage(sprites[p.tone], px - s / 2, py - s / 2, s, s);
      }

      // crisp metallic ring (ring state)
      const ringA = Math.pow(1 - prog, 1.2);
      if (ringA > 0.02) drawRing(cx, cy, R, ringA);

      // jewel core (ring state)
      if (core) {
        const coreA = Math.pow(1 - prog, 1.5);
        if (coreA > 0.02) drawCore(cx, cy, R, coreA, t);
      }

      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduce) { drawStatic(); }
    else { start = performance.now(); raf = requestAnimationFrame(frame); }

    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting;
      if (vis && !running && !reduce) { running = true; start = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!vis) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0 });
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduce) { running = true; start = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce, density, interactive, radius, centerY, core]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }} aria-hidden />;
}
