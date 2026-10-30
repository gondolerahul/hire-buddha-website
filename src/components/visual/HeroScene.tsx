'use client';

import { useEffect, useRef } from 'react';
import { SCENES, TONES, type SceneName, type Tools } from './heroScenes';

// Scene alphas are authored for compositional hierarchy; the hero veil then
// dims the canvas for copy legibility. This exposure boost compensates —
// tuned against rendered screenshots, not in the abstract.
const BOOST = 2.2;

// React host for the per-page hero instruments defined in heroScenes.ts.
// Handles DPR sizing, the rAF loop (paused off-screen and on hidden tabs),
// smoothed pointer input, and reduced motion (a settled static frame instead
// of animation). Scene state re-initialises on resize.
export function HeroScene({ scene, focalX = 0.5, focalY = 0.5, className, style }: {
  scene: SceneName; focalX?: number; focalY?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const def = SCENES[scene];

    // Pre-rendered glow sprites, one per gold tone (shadowBlur is too slow).
    const sprites = TONES.map(([r, g, b]) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g2 = c.getContext('2d')!;
      const grd = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grd.addColorStop(0.25, `rgba(${r},${g},${b},.55)`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      g2.fillStyle = grd;
      g2.fillRect(0, 0, 64, 64);
      return c;
    });

    let w = 1, h = 1, dpr = 1;
    let raf = 0, running = false, visible = !reduce;
    let last = performance.now();
    let tx = 0, ty = 0;              // target pointer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state: any;

    const tools: Tools = {
      ctx, w: 1, h: 1, t: 0, dt: 0, px: 0, py: 0, fx: 0, fy: 0,
      glow(x, y, r, alpha, tone = 1) {
        if (r <= 0 || alpha <= 0) return;
        ctx.globalAlpha = Math.min(1, alpha * BOOST);
        ctx.drawImage(sprites[tone], x - r, y - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
      },
      line(alpha, tone = 2) {
        const [r, g, b] = TONES[tone];
        return `rgba(${r},${g},${b},${Math.min(1, Math.max(0, alpha * BOOST))})`;
      },
      clear() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
      },
      fade(a) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
      },
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'lighter';
      tools.w = w; tools.h = h;
      tools.fx = w * focalX; tools.fy = h * focalY;
      state = def.init(tools);
      if (reduce) renderStatic();
    };

    const step = (dt: number) => {
      tools.dt = dt;
      tools.t += dt;
      tools.px += (tx - tools.px) * 0.05;
      tools.py += (ty - tools.py) * 0.05;
      def.draw(tools, state);
    };

    // Reduced motion: settle the scene silently, leave one composed frame.
    const renderStatic = () => {
      tools.t = 4;
      for (let i = 0; i < 70; i++) step(1 / 30);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      raf = requestAnimationFrame(frame);
    };
    const setRunning = (on: boolean) => {
      if (on === running) return;
      running = on;
      if (on) { last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!reduce) setRunning(visible && !document.hidden);
    }, { rootMargin: '80px' });
    io.observe(canvas);

    const onVis = () => { if (!reduce) setRunning(visible && !document.hidden); };
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      setRunning(false);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
    };
  }, [scene, focalX, focalY]);

  return <canvas ref={ref} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }} aria-hidden />;
}
