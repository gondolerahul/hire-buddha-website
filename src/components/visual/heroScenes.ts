/* ============================================================================
   HERO SCENES — one molten-gold instrument per key page.
   Same material everywhere (gold light on warm black), never the same form
   twice. Pure canvas logic — the React host lives in HeroScene.tsx.

   Scene map:
     orbits    /product/ai-employees   armillary of five worker shells
     lattice   /product/intelligence   neural constellation with synapse pulses
     rings     /product/tools          astrolabe of counter-rotating tick rings
     aegis     /product/security       wireframe dome swept by a scan wave
     ledger    /pricing                micro-cent rain through a funnel
     loop6     /solutions              six-arc loop ridden by a comet
     radar     /solutions/perceive     expanding pulses igniting signal motes
     waveform  /solutions/engage       travelling voice filaments
     braid     /solutions/orchestrate  many strands weaving into one line
     conveyor  /solutions/fulfill      light packets passing checkpoints
     breath    /solutions/sustain      breathing mandala
     ascent    /solutions/evolve       double helix of rising sparks
     presence  /pragya                 breathing orb with voice ripples
     dawn      /about                  sunrise over a hairline horizon
     beacon    /contact                lighthouse sweep with ripples
     sparks    /use-cases              node grid with cascading ignitions
     embers    /stories                ember river with rising embers
     strokes   /blog                   calligraphic strokes of light
   ============================================================================ */

export type Tools = {
  ctx: CanvasRenderingContext2D;
  w: number; h: number;          // CSS pixels
  t: number; dt: number;         // seconds
  px: number; py: number;        // smoothed pointer, -1..1 from canvas centre
  fx: number; fy: number;        // focal point in px (composition anchor)
  glow: (x: number, y: number, r: number, alpha: number, tone?: number) => void;
  line: (alpha: number, tone?: number) => string;   // rgba stroke/fill colour
  clear: () => void;             // hard clear (scenes without trails)
  fade: (a: number) => void;     // fade previous frame (scenes with trails)
};

/* Gold tones: 0 white-hot · 1 light · 2 core amber · 3 deep bronze */
export const TONES: [number, number, number][] = [
  [255, 243, 220], [253, 200, 113], [237, 171, 72], [168, 114, 42],
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Scene = { init: (tl: Tools) => any; draw: (tl: Tools, s: any) => void };

function defScene<S>(init: (tl: Tools) => S, draw: (tl: Tools, s: S) => void): Scene {
  return { init, draw } as Scene;
}

const TAU = Math.PI * 2;
const R = Math.random;

/* ------------------------------------------------------------------ orbits --
   Five tilted orbital shells (the five-tier hierarchy) beading with workers
   around a bright nucleus. Shells precess; one bead per shell flares in turn. */
type OrbitState = { shells: { r: number; tilt: number; speed: number; beads: number; phase: number; flare: number }[] };
const orbits = defScene<OrbitState>(
  (tl) => {
    const base = Math.min(tl.w, tl.h);
    return {
      shells: Array.from({ length: 5 }, (_, i) => ({
        r: base * (0.16 + 0.075 * i),
        tilt: 1.05 - i * 0.42,
        speed: (i % 2 ? -1 : 1) * (0.16 - i * 0.014),
        beads: 10 + i * 7,
        phase: R() * TAU,
        flare: Math.floor(R() * 8),
      })),
    };
  },
  (tl, s) => {
    tl.clear();
    const { ctx, t, fx, fy } = tl;
    // nucleus
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.4);
    tl.glow(fx, fy, 90 + pulse * 14, 0.20, 2);
    tl.glow(fx, fy, 34, 0.5, 1);
    tl.glow(fx, fy, 10, 0.9, 0);

    for (let i = 0; i < s.shells.length; i++) {
      const sh = s.shells[i];
      const prec = t * sh.speed + sh.phase;
      const wob = Math.sin(t * 0.23 + i) * 0.08;
      const project = (a: number) => {
        // circle in shell plane → tilt around x → precess around y
        let x = Math.cos(a) * sh.r, y = Math.sin(a) * sh.r, z = 0;
        const ct = Math.cos(sh.tilt + wob), st = Math.sin(sh.tilt + wob);
        [y, z] = [y * ct - z * st, y * st + z * ct];
        const cp = Math.cos(prec), sp = Math.sin(prec);
        [x, z] = [x * cp + z * sp, -x * sp + z * cp];
        const k = 700 / (700 + z * 0.9);
        return { x: fx + x * k, y: fy + y * k, k, front: (z + sh.r) / (2 * sh.r) };
      };
      // orbit path
      ctx.beginPath();
      for (let a = 0; a <= 72; a++) {
        const p = project((a / 72) * TAU);
        if (a === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = tl.line(0.055 + i * 0.008, 2);
      ctx.lineWidth = 1;
      ctx.stroke();
      // beads
      const beadSpin = t * sh.speed * 3.1;
      for (let b = 0; b < sh.beads; b++) {
        const p = project((b / sh.beads) * TAU + beadSpin);
        const depth = 1 - p.front;                       // 1 = closest
        const flare = b === sh.flare ? 1.6 + Math.sin(t * 5) * 0.6 : 1;
        tl.glow(p.x, p.y, (2.2 + depth * 2.6) * flare, (0.12 + depth * 0.34) * flare, depth > 0.6 ? 1 : 2);
      }
      if (((t * 0.5 + i) | 0) % 7 === 0) sh.flare = (sh.flare + 1) % sh.beads;
    }
  },
);

/* ----------------------------------------------------------------- lattice --
   A slowly revolving constellation of memory nodes; synapse pulses travel the
   edges and kindle each node they arrive at. */
type LNode = { x: number; y: number; z: number; flare: number };
type LatticeState = { nodes: LNode[]; edges: [number, number][]; pulses: { a: number; b: number; p: number }[] };
const lattice = defScene<LatticeState>(
  (tl) => {
    const rad = Math.min(tl.w, tl.h) * 0.36;
    const nodes: LNode[] = Array.from({ length: 62 }, () => {
      const u = R() * TAU, v = Math.acos(2 * R() - 1), rr = rad * Math.cbrt(R());
      return { x: rr * Math.sin(v) * Math.cos(u), y: rr * Math.sin(v) * Math.sin(u) * 0.8, z: rr * Math.cos(v), flare: 0 };
    });
    const edges: [number, number][] = [];
    nodes.forEach((n, i) => {
      const d = nodes.map((m, j) => ({ j, d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2 + (n.z - m.z) ** 2 }))
        .filter((e) => e.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
      d.forEach((e) => { if (!edges.some(([a, b]) => (a === e.j && b === i))) edges.push([i, e.j]); });
    });
    const pulses = Array.from({ length: 7 }, () => {
      const [a, b] = edges[(R() * edges.length) | 0];
      return { a, b, p: R() };
    });
    return { nodes, edges, pulses };
  },
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const ry = t * 0.11, rx = Math.sin(t * 0.06) * 0.22;
    const proj = (n: LNode) => {
      let { x, y, z } = n;
      const cy = Math.cos(ry), sy = Math.sin(ry);
      [x, z] = [x * cy + z * sy, -x * sy + z * cy];
      const cx = Math.cos(rx), sx = Math.sin(rx);
      [y, z] = [y * cx - z * sx, y * sx + z * cx];
      const k = 640 / (640 + z);
      return { x: fx + x * k, y: fy + y * k, depth: 0.5 + 0.5 * (1 - z / 320) };
    };
    const pts = s.nodes.map(proj);
    ctx.lineWidth = 1;
    for (const [a, b] of s.edges) {
      ctx.strokeStyle = tl.line(0.05 * Math.min(pts[a].depth, pts[b].depth), 2);
      ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke();
    }
    s.nodes.forEach((n, i) => {
      n.flare = Math.max(0, n.flare - dt * 1.4);
      const p = pts[i];
      tl.glow(p.x, p.y, 2 + p.depth * 2 + n.flare * 5, 0.10 + p.depth * 0.16 + n.flare * 0.55, n.flare > 0.3 ? 0 : 1);
    });
    for (const pu of s.pulses) {
      pu.p += dt * 0.55;
      if (pu.p >= 1) {
        s.nodes[pu.b].flare = 1;
        const nexts = s.edges.filter(([a, b]) => a === pu.b || b === pu.b);
        const [a, b] = nexts[(R() * nexts.length) | 0] ?? [pu.b, pu.a];
        pu.a = a === pu.b ? a : b === pu.b ? b : a; // start at arrived node
        const other = a === pu.a ? b : a;
        pu.a = pu.b; pu.b = other; pu.p = 0;
      }
      const A = pts[pu.a], B = pts[pu.b];
      const x = A.x + (B.x - A.x) * pu.p, y = A.y + (B.y - A.y) * pu.p;
      tl.glow(x, y, 3.2, 0.8, 0);
      tl.glow(x, y, 9, 0.25, 1);
    }
  },
);

/* ------------------------------------------------------------------- rings --
   An astrolabe: counter-rotating rings of tick marks, each swept by a bright
   glint window; jewelled beads mark the escapement. Precision as ornament. */
type RingsState = { rings: { r: number; ticks: number; speed: number; jewel: number }[] };
const rings = defScene<RingsState>(
  (tl) => {
    const base = Math.min(tl.w, tl.h);
    return {
      rings: Array.from({ length: 5 }, (_, i) => ({
        r: base * (0.14 + 0.075 * i),
        ticks: 24 + i * 18,
        speed: (i % 2 ? -1 : 1) * (0.05 + 0.02 * (4 - i)),
        jewel: (R() * TAU),
      })),
    };
  },
  (tl, s) => {
    tl.clear();
    const { ctx, t, fx, fy } = tl;
    tl.glow(fx, fy, 60, 0.16, 2);
    tl.glow(fx, fy, 8, 0.7, 0);
    // crosshair
    ctx.strokeStyle = tl.line(0.07, 2); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(fx - 16, fy); ctx.lineTo(fx + 16, fy); ctx.moveTo(fx, fy - 16); ctx.lineTo(fx, fy + 16); ctx.stroke();

    s.rings.forEach((rg, i) => {
      const rot = t * rg.speed;
      const breath = 1 + Math.sin(t * 0.7 + i * 1.1) * 0.008;
      const rr = rg.r * breath;
      const glintA = -t * rg.speed * 2.2 + i * 1.3;       // glint sweeps against rotation
      ctx.beginPath(); ctx.arc(fx, fy, rr, 0, TAU);
      ctx.strokeStyle = tl.line(0.05, 2); ctx.stroke();
      for (let k = 0; k < rg.ticks; k++) {
        const a = rot + (k / rg.ticks) * TAU;
        const major = k % 8 === 0;
        const len = major ? 10 : 4.5;
        const dGlint = Math.abs((((a - glintA) % TAU) + TAU) % TAU - Math.PI); // π = aligned
        const glint = Math.max(0, 1 - Math.abs(Math.PI - dGlint - Math.PI) / 0.55);
        const alpha = (major ? 0.16 : 0.09) + glint * 0.5;
        const ca = Math.cos(a), sa = Math.sin(a);
        ctx.strokeStyle = tl.line(alpha, glint > 0.4 ? 1 : 2);
        ctx.beginPath();
        ctx.moveTo(fx + ca * (rr - len / 2), fy + sa * (rr - len / 2));
        ctx.lineTo(fx + ca * (rr + len / 2), fy + sa * (rr + len / 2));
        ctx.stroke();
      }
      const ja = rot * 1.6 + rg.jewel;
      tl.glow(fx + Math.cos(ja) * rr, fy + Math.sin(ja) * rr, 3.4, 0.75, 0);
      tl.glow(fx + Math.cos(ja) * rr, fy + Math.sin(ja) * rr, 10, 0.22, 1);
    });
  },
);

/* ------------------------------------------------------------------- aegis --
   A wireframe dome over the base line; a scan wave sweeps across it and every
   node it touches shimmers. Protection you can watch working. */
type AegisState = { rot: number };
const aegis = defScene<AegisState>(
  () => ({ rot: 0 }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, h } = tl;
    s.rot += dt * 0.06;
    const cy = h * 0.92, rad = Math.min(tl.w, h) * 0.52;
    const sweep = ((t * 0.55) % (Math.PI + 1.6)) - 0.8;   // sweeps past both edges
    const project = (lat: number, lon: number) => {
      const y0 = Math.sin(lat), r0 = Math.cos(lat);
      const x = Math.cos(lon + s.rot) * r0, z = Math.sin(lon + s.rot) * r0;
      const k = 900 / (900 + z * rad);
      return { x: fx + x * rad * k, y: cy - y0 * rad * 0.86 * k, z, ang: Math.atan2(y0, x) };
    };
    ctx.lineWidth = 1;
    const shimmer = (p: { z: number; ang: number }) => {
      const d = Math.abs(p.ang - sweep);
      return Math.max(0, 1 - d / 0.38) * (p.z < 0 ? 1 : 0.35);
    };
    // latitude arcs + meridians as point strings
    for (let li = 0; li < 5; li++) {
      const lat = (li / 5) * (Math.PI / 2) * 0.92 + 0.06;
      let prev: { x: number; y: number } | null = null;
      for (let m = 0; m <= 60; m++) {
        const p = project(lat, (m / 60) * Math.PI * 2);
        const front = p.z < 0;
        if (prev && front) {
          ctx.strokeStyle = tl.line(0.05 + shimmer(p) * 0.30, 2);
          ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
        prev = p;
      }
    }
    for (let mi = 0; mi < 10; mi++) {
      const lon = (mi / 10) * Math.PI * 2;
      let prev: { x: number; y: number } | null = null;
      for (let li = 0; li <= 24; li++) {
        const p = project((li / 24) * (Math.PI / 2) * 0.95, lon);
        if (prev && p.z < 0.15) {
          ctx.strokeStyle = tl.line(0.045 + shimmer(p) * 0.3, 2);
          ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
        prev = p;
      }
    }
    // node shimmer beads at intersections
    for (let li = 1; li < 5; li++) for (let mi = 0; mi < 10; mi++) {
      const p = project((li / 5) * (Math.PI / 2) * 0.92, (mi / 10) * Math.PI * 2);
      if (p.z < 0) {
        const sh = shimmer(p);
        if (sh > 0.05) tl.glow(p.x, p.y, 2.4 + sh * 3.4, sh * 0.7, sh > 0.6 ? 0 : 1);
      }
    }
    // base line glow
    const grd = ctx.createLinearGradient(fx - rad, 0, fx + rad, 0);
    grd.addColorStop(0, tl.line(0, 2)); grd.addColorStop(0.5, tl.line(0.35, 2)); grd.addColorStop(1, tl.line(0, 2));
    ctx.strokeStyle = grd; ctx.beginPath(); ctx.moveTo(fx - rad, cy); ctx.lineTo(fx + rad, cy); ctx.stroke();
    tl.glow(fx, cy, 70, 0.12, 2);
  },
);

/* ------------------------------------------------------------------ ledger --
   Micro-cent rain: fine gold falls through a funnel pinch and settles into a
   breathing basin of light. Every so often a brighter coin drops. */
type Grain = { x: number; y: number; vx: number; vy: number; bright: boolean };
type LedgerState = { grains: Grain[]; energy: number; coinT: number };
const ledger = defScene<LedgerState>(
  (tl) => ({
    grains: Array.from({ length: 120 }, () => ({
      x: tl.fx + (R() - 0.5) * tl.w * 0.3, y: R() * tl.h, vx: 0, vy: 40 + R() * 120, bright: false,
    })),
    energy: 0.4, coinT: 0,
  }),
  (tl, s) => {
    tl.fade(0.16);
    const { ctx, dt, t, fx, h, w } = tl;
    const neckY = h * 0.55, floorY = h * 0.8;
    // funnel hairlines
    ctx.lineWidth = 1; ctx.strokeStyle = tl.line(0.07, 3);
    ctx.beginPath();
    ctx.moveTo(fx - w * 0.16, h * 0.16); ctx.lineTo(fx - 14, neckY);
    ctx.moveTo(fx + w * 0.16, h * 0.16); ctx.lineTo(fx + 14, neckY);
    ctx.stroke();
    s.coinT -= dt;
    for (const g of s.grains) {
      const aboveNeck = g.y < neckY;
      if (aboveNeck) {
        g.vx += (fx - g.x) * dt * (1.8 * (g.y / neckY));   // funnel pull
        g.vy += 150 * dt;
      } else {
        g.vx *= 0.92; g.vy += 60 * dt; g.vy *= 0.985;
      }
      g.x += g.vx * dt; g.y += g.vy * dt;
      if (g.y > floorY + (R() - 0.5) * 12) {
        s.energy = Math.min(0.8, s.energy + (g.bright ? 0.08 : 0.015));
        g.x = fx + (R() - 0.5) * w * 0.3; g.y = -10 - R() * 60;
        g.vx = 0; g.vy = 30 + R() * 90;
        g.bright = s.coinT <= 0; if (g.bright) s.coinT = 0.5;
      }
      const near = 1 - Math.min(1, Math.abs(g.y - neckY) / 160);
      tl.glow(g.x, g.y, g.bright ? 3.4 : 1.6 + near, g.bright ? 0.9 : 0.22 + near * 0.25, g.bright ? 0 : 2);
    }
    // basin — kept small and amber; additive blow-out reads as a washed blob
    s.energy = Math.min(0.8, Math.max(0.3, s.energy - dt * 0.12));
    const breathe = 1 + Math.sin(t * 1.1) * 0.05;
    tl.glow(fx, floorY + 14, (40 + s.energy * 26) * breathe, 0.10, 2);
    tl.glow(fx, floorY + 10, 18 * breathe, 0.18, 1);
    const grd = ctx.createLinearGradient(fx - 180, 0, fx + 180, 0);
    grd.addColorStop(0, tl.line(0, 2)); grd.addColorStop(0.5, tl.line(0.4, 1)); grd.addColorStop(1, tl.line(0, 2));
    ctx.strokeStyle = grd; ctx.beginPath(); ctx.moveTo(fx - 180, floorY + 14); ctx.lineTo(fx + 180, floorY + 14); ctx.stroke();
  },
);

/* ------------------------------------------------------------------- loop6 --
   The Sheel loop: six luminous arcs around a quiet axle; a comet rides the
   loop and each arc kindles as it passes through. */
type Loop6State = { arcFlare: number[] };
const loop6 = defScene<Loop6State>(
  () => ({ arcFlare: [0, 0, 0, 0, 0, 0] }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const rad = Math.min(tl.w, tl.h) * 0.44;
    const rot = t * 0.05;
    const comet = t * 0.42;
    // axle
    tl.glow(fx, fy, 46 + Math.sin(t * 1.2) * 6, 0.22, 2);
    tl.glow(fx, fy, 9, 0.8, 0);
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 6; i++) {
      const a0 = rot + (i / 6) * TAU + 0.09, a1 = rot + ((i + 1) / 6) * TAU - 0.09;
      const mid = (a0 + a1) / 2;
      const d = Math.abs((((comet - mid) % TAU) + TAU) % TAU);
      const near = Math.min(d, TAU - d) < 0.55;
      s.arcFlare[i] = near ? Math.min(1, s.arcFlare[i] + dt * 3) : Math.max(0, s.arcFlare[i] - dt * 0.8);
      const f = s.arcFlare[i];
      ctx.strokeStyle = tl.line(0.15 + f * 0.45, f > 0.5 ? 1 : 2);
      ctx.beginPath(); ctx.arc(fx, fy, rad, a0, a1); ctx.stroke();
      // arc endpoint beads
      for (const a of [a0, a1]) tl.glow(fx + Math.cos(a) * rad, fy + Math.sin(a) * rad, 2 + f * 2, 0.25 + f * 0.4, 1);
      // spoke
      ctx.strokeStyle = tl.line(0.03 + f * 0.06, 2);
      ctx.beginPath(); ctx.moveTo(fx, fy);
      ctx.lineTo(fx + Math.cos(mid) * (rad - 8), fy + Math.sin(mid) * (rad - 8)); ctx.stroke();
      ctx.lineWidth = 1.4;
    }
    // comet + trail
    for (let k = 0; k < 30; k++) {
      const a = comet - k * 0.02;
      const decay = 1 - k / 30;
      tl.glow(fx + Math.cos(a) * rad, fy + Math.sin(a) * rad, 2 + decay * 4.5, decay * 0.8, k < 4 ? 0 : 1);
    }
  },
);

/* ------------------------------------------------------------------- radar --
   Perceive: pulse rings expand from the focal point; drifting signal motes
   flare the moment a ring passes over them. */
type RadarState = { pulses: number[]; motes: { x: number; y: number; sx: number; sy: number; flare: number }[]; nextP: number };
const radar = defScene<RadarState>(
  (tl) => ({
    pulses: [Math.min(tl.w, tl.h) * 0.2],
    nextP: 1.6,
    motes: Array.from({ length: 44 }, () => ({
      x: R() * tl.w, y: R() * tl.h, sx: R() * TAU, sy: R() * TAU, flare: 0,
    })),
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const maxR = Math.max(tl.w, tl.h) * 0.75;
    tl.glow(fx, fy, 40, 0.3, 2); tl.glow(fx, fy, 8, 0.85, 0);
    s.nextP -= dt;
    if (s.nextP <= 0) { s.pulses.push(1); s.nextP = 1.7; }
    ctx.lineWidth = 1.2;
    s.pulses = s.pulses.filter((r) => r < maxR);
    for (let i = 0; i < s.pulses.length; i++) {
      s.pulses[i] += dt * 130;
      const r = s.pulses[i], k = 1 - r / maxR;
      for (const off of [0, 8]) {
        ctx.strokeStyle = tl.line(0.24 * k * (off ? 0.5 : 1), off ? 2 : 1);
        ctx.beginPath(); ctx.arc(fx, fy, r + off, 0, TAU); ctx.stroke();
      }
    }
    // faint guide rings + rotating sweep hand
    for (const gr of [0.24, 0.44, 0.64]) {
      ctx.strokeStyle = tl.line(0.05, 3); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(fx, fy, maxR * gr, 0, TAU); ctx.stroke();
    }
    const sw = t * 0.4;
    const sg = ctx.createLinearGradient(fx, fy, fx + Math.cos(sw) * maxR * 0.7, fy + Math.sin(sw) * maxR * 0.7);
    sg.addColorStop(0, tl.line(0.3, 1)); sg.addColorStop(1, tl.line(0, 1));
    ctx.strokeStyle = sg; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(sw) * maxR * 0.7, fy + Math.sin(sw) * maxR * 0.7); ctx.stroke();
    for (const m of s.motes) {
      m.x += Math.sin(t * 0.24 + m.sx) * 0.22; m.y += Math.cos(t * 0.2 + m.sy) * 0.2;
      const d = Math.hypot(m.x - fx, m.y - fy);
      for (const r of s.pulses) if (Math.abs(d - r) < 13) m.flare = 1;
      m.flare = Math.max(0, m.flare - dt * 1.1);
      tl.glow(m.x, m.y, 2.3 + m.flare * 4, 0.16 + m.flare * 0.65, m.flare > 0.4 ? 0 : 2);
    }
  },
);

/* ---------------------------------------------------------------- waveform --
   Engage: filaments of voice. A travelling energy envelope makes the lines
   speak; crests sparkle. */
type WaveState = { crestT: number };
const waveform = defScene<WaveState>(
  () => ({ crestT: 0 }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, w, fy, dt } = tl;
    const cx = w * (0.5 + 0.34 * Math.sin(t * 0.21));      // envelope centre wanders
    const env = (x: number) => Math.exp(-(((x - cx) / (w * 0.24)) ** 2));
    const voice = (x: number) =>
      Math.sin(x * 0.021 - t * 2.6) * 0.62 + Math.sin(x * 0.043 + t * 1.7) * 0.31 + Math.sin(x * 0.009 - t * 0.9) * 0.4;
    ctx.lineWidth = 1.1;
    for (let f = -2; f <= 2; f++) {
      const amp = 44 * (1 - Math.abs(f) * 0.16);
      ctx.strokeStyle = tl.line(f === 0 ? 0.4 : 0.13 / Math.abs(f), f === 0 ? 1 : 2);
      ctx.beginPath();
      for (let x = 0; x <= w; x += 7) {
        const e = env(x);
        const y = fy + f * 14 * (1 + e * 1.6) + voice(x + f * 40) * amp * e;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // crest sparkles on the master filament
    s.crestT -= dt;
    for (let x = 0; x <= w; x += 7) {
      const e = env(x), v = voice(x);
      if (e > 0.72 && Math.abs(v) > 0.9) tl.glow(x, fy + v * 44 * e, 2.6, 0.5 * e, 0);
    }
    tl.glow(cx, fy, 90, 0.10, 2);
  },
);

/* ------------------------------------------------------------------- braid --
   Orchestrate: six strands weave and converge into a single bright line —
   many functions, one loop. */
const braid = defScene<{ phases: number[] }>(
  () => ({ phases: Array.from({ length: 6 }, (_, i) => (i / 6) * TAU) }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, w, fy } = tl;
    ctx.lineWidth = 1.2;
    for (let i = 0; i < s.phases.length; i++) {
      const ph = s.phases[i];
      ctx.beginPath();
      let front = 1;
      for (let x = 0; x <= w; x += 6) {
        const conv = 1 - Math.pow(x / w, 1.6) * 0.96;     // converge to one line at right
        const y = fy + Math.sin(x * 0.011 + t * 1.05 + ph) * 46 * conv + Math.sin(x * 0.004 - t * 0.4 + ph * 2) * 18 * conv;
        front = 0.5 + 0.5 * Math.cos(x * 0.011 + t * 1.05 + ph);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = tl.line(0.10 + front * 0.1, i % 2 ? 2 : 1);
      ctx.stroke();
    }
    // unified line + terminal bead
    const grd = ctx.createLinearGradient(w * 0.55, 0, w, 0);
    grd.addColorStop(0, tl.line(0, 1)); grd.addColorStop(1, tl.line(0.5, 1));
    ctx.strokeStyle = grd; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(w * 0.55, fy); ctx.lineTo(w, fy); ctx.stroke();
    tl.glow(w - 6, fy, 26, 0.4, 1); tl.glow(w - 6, fy, 6, 0.9, 0);
    // travelling spark toward unity
    const sp = (t * 0.23) % 1;
    const sx = sp * w;
    const conv = 1 - Math.pow(sp, 1.6) * 0.96;
    tl.glow(sx, fy + Math.sin(sx * 0.011 + t * 1.05) * 46 * conv, 3, 0.8, 0);
  },
);

/* ---------------------------------------------------------------- conveyor --
   Fulfill: packets of light glide along gently rising lanes and flash each
   checkpoint they clear. */
type Packet = { lane: number; p: number; v: number };
type ConvState = { packets: Packet[]; flares: number[][] };
const conveyor = defScene<ConvState>(
  () => ({
    packets: Array.from({ length: 10 }, (_, i) => ({ lane: i % 4, p: R(), v: 0.06 + R() * 0.05 })),
    flares: Array.from({ length: 4 }, () => [0, 0, 0]),
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, dt, w, h } = tl;
    const laneY = (l: number, x: number) => h * (0.32 + l * 0.14) - (x / w) * h * 0.13;
    ctx.lineWidth = 1;
    for (let l = 0; l < 4; l++) {
      ctx.strokeStyle = tl.line(0.09, 3);
      ctx.beginPath(); ctx.moveTo(-20, laneY(l, -20)); ctx.lineTo(w + 20, laneY(l, w + 20)); ctx.stroke();
      for (let c = 0; c < 3; c++) {
        const cx = w * (0.25 + c * 0.25), cy = laneY(l, cx);
        s.flares[l][c] = Math.max(0, s.flares[l][c] - dt * 1.6);
        const f = s.flares[l][c];
        // checkpoint diamond
        ctx.strokeStyle = tl.line(0.14 + f * 0.5, f > 0.3 ? 1 : 2);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 5); ctx.lineTo(cx + 5, cy); ctx.lineTo(cx, cy + 5); ctx.lineTo(cx - 5, cy); ctx.closePath();
        ctx.stroke();
        if (f > 0.05) tl.glow(cx, cy, 4 + f * 9, f * 0.5, 1);
      }
    }
    for (const pk of s.packets) {
      pk.p += pk.v * dt * (1 + 0.4 * Math.sin(pk.p * 19)); // subtle cadence
      if (pk.p > 1.05) { pk.p = -0.05; pk.v = 0.06 + R() * 0.05; }
      const x = pk.p * w, y = laneY(pk.lane, x);
      for (let c = 0; c < 3; c++) if (Math.abs(pk.p - (0.25 + c * 0.25)) < 0.008) s.flares[pk.lane][c] = 1;
      const dx = Math.cos(Math.atan2(-h * 0.13, w));
      const dy = Math.sin(Math.atan2(-h * 0.13, w));
      for (let seg = 0; seg < 5; seg++) {
        const decay = 1 - seg / 5;
        tl.glow(x - seg * 10 * dx, y - seg * 10 * dy, 3 * decay + 1.2, 0.6 * decay, seg === 0 ? 0 : 1);
      }
    }
  },
);

/* ------------------------------------------------------------------ breath --
   Sustain: a mandala that breathes. Rings expand and brighten in phased waves;
   motes spiral gently inward — care that never sleeps. */
type BreathState = { motes: { a: number; r: number; sp: number }[] };
const breath = defScene<BreathState>(
  () => ({
    motes: Array.from({ length: 22 }, () => ({ a: R() * TAU, r: 0.3 + R() * 0.75, sp: 0.2 + R() * 0.25 })),
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const base = Math.min(tl.w, tl.h) * 0.4;
    const bt = t * 0.8;
    ctx.lineWidth = 1;
    for (let j = 0; j < 7; j++) {
      const phase = Math.sin(bt - j * 0.85);
      const rr = base * (0.14 + 0.115 * j) * (1 + phase * 0.05);
      ctx.strokeStyle = tl.line(0.07 + (0.5 + 0.5 * phase) * 0.13, j % 3 === 0 ? 1 : 2);
      ctx.beginPath(); ctx.arc(fx, fy, rr, 0, TAU); ctx.stroke();
      if (j === 3) for (let b = 0; b < 30; b++) {
        const a = (b / 30) * TAU + t * 0.05;
        tl.glow(fx + Math.cos(a) * rr, fy + Math.sin(a) * rr, 1.6, 0.14 + (0.5 + 0.5 * phase) * 0.2, 1);
      }
    }
    tl.glow(fx, fy, 60 * (1 + Math.sin(bt) * 0.1), 0.22, 2);
    tl.glow(fx, fy, 12, 0.6, 1);
    for (const m of s.motes) {
      m.a += dt * m.sp; m.r -= dt * 0.045;
      if (m.r < 0.08) { m.r = 1.05; m.a = R() * TAU; }
      const rr = m.r * base;
      tl.glow(fx + Math.cos(m.a) * rr, fy + Math.sin(m.a) * rr, 1.8, 0.22 * (1 - m.r * 0.5), 1);
    }
  },
);

/* ------------------------------------------------------------------ ascent --
   Evolve: a double helix of sparks rising and tightening as it climbs —
   every run leaves the system smarter. */
type AscState = { parts: { y: number; ph: number; v: number; strand: number }[] };
const ascent = defScene<AscState>(
  (tl) => ({
    parts: Array.from({ length: 58 }, (_, i) => ({
      y: R() * tl.h, ph: R() * TAU, v: 26 + R() * 30, strand: i % 2,
    })),
  }),
  (tl, s) => {
    tl.fade(0.2);
    const { ctx, t, dt, fx, h } = tl;
    // faint axis
    const grd = ctx.createLinearGradient(0, h, 0, 0);
    grd.addColorStop(0, tl.line(0, 2)); grd.addColorStop(0.6, tl.line(0.08, 2)); grd.addColorStop(1, tl.line(0, 2));
    ctx.strokeStyle = grd; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(fx, 0); ctx.lineTo(fx, h); ctx.stroke();
    for (const p of s.parts) {
      p.y -= p.v * dt;
      if (p.y < -14) { p.y = h + 14; p.ph = R() * TAU; }
      const climb = 1 - p.y / h;                            // 1 at top
      const radius = (26 + 96 * (1 - climb)) * 1;           // tightens upward
      const a = p.ph + p.strand * Math.PI + (h - p.y) * 0.014 + t * 0.7;
      const x = fx + Math.cos(a) * radius;
      const depth = 0.5 + 0.5 * Math.sin(a);
      tl.glow(x, p.y, 1.6 + depth * 2.2 + climb * 1.6, (0.14 + depth * 0.34) * (0.3 + climb * 0.7), climb > 0.75 ? 0 : depth > 0.6 ? 1 : 2);
    }
    tl.glow(fx, 12, 60, 0.14, 1);                           // summit glow
  },
);

/* ---------------------------------------------------------------- presence --
   Pragya: a breathing orb wrapped in slow aurora ribbons; every few seconds it
   speaks a ripple. Leans toward the pointer, listening. */
type PresState = { ripples: number[]; nextR: number };
const presence = defScene<PresState>(
  () => ({ ripples: [60], nextR: 2.4 }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, px, py } = tl;
    const fx = tl.fx + px * 12, fy = tl.fy + py * 10;       // listens to the pointer
    const rad = Math.min(tl.w, tl.h) * 0.15;
    const brt = 1 + Math.sin(t * 0.62) * 0.16;
    tl.glow(fx, fy, rad * 2.9 * brt, 0.12, 2);
    tl.glow(fx, fy, rad * 1.5 * brt, 0.24, 2);
    tl.glow(fx, fy, rad * 0.8 * brt, 0.5, 1);
    tl.glow(fx, fy, rad * 0.24, 0.95, 0);
    // aurora ribbons — three tilted ellipses orbiting
    ctx.lineWidth = 1.1;
    for (let rb = 0; rb < 3; rb++) {
      const tilt = 0.5 + rb * 0.55, spin = t * (0.22 + rb * 0.07) + rb * 2;
      ctx.beginPath();
      for (let a = 0; a <= 64; a++) {
        const th = (a / 64) * TAU;
        let x = Math.cos(th) * rad * 1.9, y = Math.sin(th) * rad * 0.62, z = 0;
        [y, z] = [y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)];
        [x, z] = [x * Math.cos(spin) + z * Math.sin(spin), -x * Math.sin(spin) + z * Math.cos(spin)];
        const k = 520 / (520 + z);
        const X = fx + x * k, Y = fy + y * k;
        if (a === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.strokeStyle = tl.line(0.2, rb === 0 ? 1 : 2);
      ctx.stroke();
    }
    // voice ripples
    s.nextR -= dt;
    if (s.nextR <= 0) { s.ripples.push(rad); s.nextR = 3.2; }
    const maxR = Math.min(tl.w, tl.h) * 0.55;
    s.ripples = s.ripples.filter((r) => r < maxR);
    for (let i = 0; i < s.ripples.length; i++) {
      s.ripples[i] += dt * 60;
      const r = s.ripples[i], k = 1 - r / maxR;
      ctx.strokeStyle = tl.line(0.22 * k, 1);
      ctx.beginPath(); ctx.arc(fx, fy, r, 0, TAU); ctx.stroke();
    }
  },
);

/* -------------------------------------------------------------------- dawn --
   About: a sun of gold breathing on a hairline horizon, a shimmering causeway
   of light beneath it, motes ascending — towards digital enlightenment. */
type DawnState = { motes: { x: number; y: number; v: number; ph: number }[] };
const dawn = defScene<DawnState>(
  (tl) => ({
    motes: Array.from({ length: 26 }, () => ({
      x: tl.fx + (R() - 0.5) * tl.w * 0.5, y: tl.h * (0.2 + R() * 0.42), v: 6 + R() * 12, ph: R() * TAU,
    })),
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, w, h } = tl;
    const hy = h * 0.68;
    const brt = 1 + Math.sin(t * 0.5) * 0.08;
    // sun above horizon (clipped)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, hy); ctx.clip();
    tl.glow(fx, hy + 10, 250 * brt, 0.15, 2);
    tl.glow(fx, hy + 4, 120 * brt, 0.3, 1);
    tl.glow(fx, hy, 48 * brt, 0.7, 0);
    // sky arcs
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.strokeStyle = tl.line(0.05 / i + Math.max(0, Math.sin(t * 0.3 + i)) * 0.02, 2);
      ctx.beginPath(); ctx.arc(fx, hy + 10, 120 + i * 85, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
    }
    ctx.restore();
    // horizon hairline
    const grd = ctx.createLinearGradient(0, 0, w, 0);
    grd.addColorStop(0, tl.line(0, 2)); grd.addColorStop(0.5, tl.line(0.5, 1)); grd.addColorStop(1, tl.line(0, 2));
    ctx.strokeStyle = grd; ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(w, hy); ctx.stroke();
    // causeway shimmer below horizon
    for (let i = 0; i < 22; i++) {
      const y = hy + 8 + i * 9;
      const flick = 0.5 + 0.5 * Math.sin(t * 2.1 + i * 2.7);
      const wdt = (60 - i * 2.2) * (0.7 + flick * 0.5);
      const a = (0.2 - i * 0.008) * flick;
      if (a <= 0) continue;
      const jx = Math.sin(t * 0.9 + i * 5.1) * 8;
      ctx.strokeStyle = tl.line(a, 2);
      ctx.beginPath(); ctx.moveTo(fx - wdt / 2 + jx, y); ctx.lineTo(fx + wdt / 2 + jx, y); ctx.stroke();
    }
    // ascending motes
    for (const m of s.motes) {
      m.y -= m.v * dt; m.x += Math.sin(t * 0.5 + m.ph) * 0.2;
      if (m.y < h * 0.1) { m.y = hy - 6; m.x = fx + (R() - 0.5) * w * 0.5; }
      const k = (hy - m.y) / (hy - h * 0.1);
      tl.glow(m.x, m.y, 1.6, 0.3 * (1 - Math.abs(k - 0.4)), 1);
    }
  },
);

/* ------------------------------------------------------------------ beacon --
   Contact: a lighthouse. A soft beam sweeps, ripples carry the signal out and
   drifting motes light up as the beam finds them. */
type BeaconState = { ripples: number[]; nextR: number; motes: { x: number; y: number; flare: number }[] };
const beacon = defScene<BeaconState>(
  (tl) => ({
    ripples: [40], nextR: 2.2,
    motes: Array.from({ length: 30 }, () => ({ x: R() * tl.w, y: R() * tl.h, flare: 0 })),
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy, w, h } = tl;
    const beamA = t * 0.5;
    // beam fan
    for (let i = 0; i < 6; i++) {
      const a = beamA - i * 0.035;
      const decay = 1 - i / 6;
      const ex = fx + Math.cos(a) * w, ey = fy + Math.sin(a) * w;
      const grd = ctx.createLinearGradient(fx, fy, ex, ey);
      grd.addColorStop(0, tl.line(0.42 * decay, 1)); grd.addColorStop(1, tl.line(0, 1));
      ctx.strokeStyle = grd; ctx.lineWidth = i === 0 ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(ex, ey); ctx.stroke();
    }
    // core
    tl.glow(fx, fy, 60 + Math.sin(t * 1.3) * 8, 0.25, 2);
    tl.glow(fx, fy, 10, 0.95, 0);
    // ripples
    s.nextR -= dt;
    if (s.nextR <= 0) { s.ripples.push(24); s.nextR = 2.0; }
    const maxR = Math.max(w, h) * 0.7;
    s.ripples = s.ripples.filter((r) => r < maxR);
    ctx.lineWidth = 1.2;
    for (let i = 0; i < s.ripples.length; i++) {
      s.ripples[i] += dt * 85;
      const r = s.ripples[i];
      ctx.strokeStyle = tl.line(0.3 * (1 - r / maxR), 2);
      ctx.beginPath(); ctx.arc(fx, fy, r, 0, TAU); ctx.stroke();
    }
    // motes flare in the beam
    for (const m of s.motes) {
      const ma = Math.atan2(m.y - fy, m.x - fx);
      const d = Math.abs((((ma - beamA) % TAU) + TAU) % TAU);
      if (Math.min(d, TAU - d) < 0.06) m.flare = 1;
      m.flare = Math.max(0, m.flare - dt * 0.9);
      tl.glow(m.x, m.y, 1.7 + m.flare * 3.4, 0.1 + m.flare * 0.6, m.flare > 0.4 ? 0 : 2);
    }
  },
);

/* ------------------------------------------------------------------ sparks --
   Use cases: a quiet grid of possibilities; ignitions cascade through
   neighbouring nodes — deployments lighting up one after another. */
type SparkNode = { x: number; y: number; flareAt: number };
type SparksState = { nodes: SparkNode[]; cols: number; rows: number; nextIg: number };
const sparks = defScene<SparksState>(
  (tl) => {
    const cols = 13, rows = 7;
    const nodes: SparkNode[] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      nodes.push({
        x: ((c + 0.5) / cols) * tl.w + (R() - 0.5) * 16,
        y: ((r + 0.5) / rows) * tl.h + (R() - 0.5) * 16,
        flareAt: -10,
      });
    }
    return { nodes, cols, rows, nextIg: 0.6 };
  },
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt } = tl;
    s.nextIg -= dt;
    if (s.nextIg <= 0) {
      s.nextIg = 1.1;
      const oc = (R() * s.cols) | 0, or = (R() * s.rows) | 0;
      for (let r = 0; r < s.rows; r++) for (let c = 0; c < s.cols; c++) {
        const d = Math.abs(c - oc) + Math.abs(r - or);
        if (d <= 3) s.nodes[r * s.cols + c].flareAt = t + d * 0.11;
      }
    }
    ctx.lineWidth = 1;
    for (let r = 0; r < s.rows; r++) for (let c = 0; c < s.cols; c++) {
      const n = s.nodes[r * s.cols + c];
      const age = t - n.flareAt;
      const f = age >= 0 ? Math.exp(-age * 1.7) : 0;
      const tw = 0.75 + 0.25 * Math.sin(t * 1.3 + n.x * 0.05 + n.y * 0.07);   // idle twinkle
      tl.glow(n.x, n.y, 2.3 + f * 4.5, (0.15 + f * 0.6) * tw, f > 0.4 ? 0 : 2);
      // brief links to freshly ignited neighbours
      if (f > 0.12) {
        for (const [nc, nr] of [[c + 1, r], [c, r + 1]] as const) {
          if (nc >= s.cols || nr >= s.rows) continue;
          const m = s.nodes[nr * s.cols + nc];
          const mf = t - m.flareAt >= 0 ? Math.exp(-(t - m.flareAt) * 2.4) : 0;
          const link = Math.min(f, mf);
          if (link > 0.12) {
            ctx.strokeStyle = tl.line(link * 0.3, 1);
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
      }
    }
  },
);

/* ------------------------------------------------------------------ embers --
   Stories: a slow river of embers drifting through the dark; now and then one
   rises out of the current and burns brighter — a story worth telling. */
type Ember = { x: number; y0: number; v: number; size: number; ph: number; rise: number };
type EmbersState = { embers: Ember[]; nextRise: number };
const embers = defScene<EmbersState>(
  (tl) => ({
    embers: Array.from({ length: 100 }, () => ({
      x: R() * tl.w, y0: (R() - 0.5) * 70, v: 18 + R() * 52, size: 0.8 + R() * 1.8, ph: R() * TAU, rise: 0,
    })),
    nextRise: 1,
  }),
  (tl, s) => {
    // NOTE: no band fill here — a per-frame additive fill saturates into a
    // solid bar under fade(); the embers' own trails describe the river.
    tl.fade(0.16);
    const { dt, w, fy } = tl;
    tl.glow(w * 0.5, fy, 120, 0.035, 3);
    s.nextRise -= dt;
    for (const e of s.embers) {
      e.x += e.v * dt;
      if (e.x > w + 12) { e.x = -12; e.rise = 0; e.y0 = (R() - 0.5) * 70; }
      if (s.nextRise <= 0 && e.rise === 0 && e.x > w * 0.25 && e.x < w * 0.75) { e.rise = 0.001; s.nextRise = 1.4; }
      if (e.rise > 0) e.rise += dt * 30;
      const y = fy + e.y0 + Math.sin(e.x * 0.005 + e.ph) * 26 - e.rise;
      const riseK = Math.min(1, e.rise / 90);
      const a = (0.08 + e.size * 0.1) * (1 - riseK) + riseK * (0.7 * (1 - Math.min(1, e.rise / 220)));
      if (a > 0.01) tl.glow(e.x, y, e.size + riseK * 2.4, a, riseK > 0.2 ? 0 : e.size > 1.8 ? 1 : 2);
    }
  },
);

/* ----------------------------------------------------------------- strokes --
   Blog: luminous calligraphy. Strokes draw themselves across the dark, hold a
   breath, and dissolve — thinking in ink of light. */
type Stroke = { pts: [number, number, number, number, number, number, number, number]; p: number; speed: number };
type StrokesState = { strokes: Stroke[] };
function newStroke(w: number, h: number): Stroke {
  const x0 = w * (0.1 + R() * 0.65), y0 = h * (0.2 + R() * 0.55);
  const dx = w * (0.12 + R() * 0.22) * (R() > 0.3 ? 1 : -1);
  return {
    pts: [
      x0, y0,
      x0 + dx * 0.4, y0 + (R() - 0.5) * h * 0.4,
      x0 + dx * 0.75, y0 + (R() - 0.5) * h * 0.4,
      x0 + dx, y0 + (R() - 0.7) * h * 0.3,
    ],
    p: 0, speed: 0.34 + R() * 0.2,
  };
}
const strokes = defScene<StrokesState>(
  (tl) => ({ strokes: Array.from({ length: 3 }, (_, i) => ({ ...newStroke(tl.w, tl.h), p: -i * 0.5 })) }),
  (tl, s) => {
    tl.fade(0.055);
    const { dt, w, h } = tl;
    for (let i = 0; i < s.strokes.length; i++) {
      const st = s.strokes[i];
      st.p += dt * st.speed;
      if (st.p > 1.7) { s.strokes[i] = newStroke(w, h); continue; }
      if (st.p < 0 || st.p > 1) continue;
      const u = st.p;
      const [x0, y0, x1, y1, x2, y2, x3, y3] = st.pts;
      const iu = 1 - u;
      const x = iu ** 3 * x0 + 3 * iu * iu * u * x1 + 3 * iu * u * u * x2 + u ** 3 * x3;
      const y = iu ** 3 * y0 + 3 * iu * iu * u * y1 + 3 * iu * u * u * y2 + u ** 3 * y3;
      // pen pressure: thick mid-stroke, fine at ends
      const press = Math.sin(u * Math.PI);
      tl.glow(x, y, 1.6 + press * 2.6, 0.5 + press * 0.4, 0);
      tl.glow(x, y, 5 + press * 6, 0.10, 1);
      if (R() > 0.86) tl.glow(x + (R() - 0.5) * 22, y + (R() - 0.5) * 22, 1.1, 0.4, 1); // ink dust
    }
  },
);

/* ------------------------------------------------------------------ legion --
   Solopreneurs — the army of one. A single commander holds the centre while
   squads of worker motes detach, fly out on a task, flare as they work, and
   return to formation — delegation threads tying every mission home. */
type Trooper = {
  ring: number; ang: number; spd: number;
  state: 0 | 1 | 2 | 3;                    // orbit · outbound · working · return
  x: number; y: number; tx: number; ty: number; wt: number;
};
type LegionState = { troops: Trooper[]; nextSquad: number; squadTarget: [number, number] };
const legion = defScene<LegionState>(
  () => ({
    troops: Array.from({ length: 42 }, (_, i) => ({
      ring: i % 3, ang: R() * TAU, spd: (0.14 + R() * 0.1) * ((i % 2) ? 1 : -1),
      state: 0 as const, x: 0, y: 0, tx: 0, ty: 0, wt: 0,
    })),
    nextSquad: 1.2,
    squadTarget: [0, 0],
  }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const base = Math.min(tl.w, tl.h);
    const ringR = (r: number) => base * (0.14 + r * 0.075);
    // commander
    tl.glow(fx, fy, 46 + Math.sin(t * 1.3) * 6, 0.24, 2);
    tl.glow(fx, fy, 16, 0.55, 1);
    tl.glow(fx, fy, 5.5, 1, 0);
    // formation rings
    ctx.lineWidth = 1;
    for (let r = 0; r < 3; r++) {
      ctx.strokeStyle = tl.line(0.06, 3);
      ctx.beginPath(); ctx.arc(fx, fy, ringR(r), 0, TAU); ctx.stroke();
    }
    // dispatch a squad
    s.nextSquad -= dt;
    if (s.nextSquad <= 0) {
      s.nextSquad = 2.6;
      const a = R() * TAU, d = base * (0.34 + R() * 0.14);
      s.squadTarget = [fx + Math.cos(a) * d, fy + Math.sin(a) * d * 0.8];
      const idle = s.troops.filter((tr) => tr.state === 0);
      for (const tr of idle.slice(0, 5)) {
        tr.state = 1;
        tr.tx = s.squadTarget[0] + (R() - 0.5) * 44;
        tr.ty = s.squadTarget[1] + (R() - 0.5) * 44;
      }
    }
    let working = 0;
    for (const tr of s.troops) {
      if (tr.state === 0) {
        tr.ang += tr.spd * dt;
        tr.x = fx + Math.cos(tr.ang) * ringR(tr.ring);
        tr.y = fy + Math.sin(tr.ang) * ringR(tr.ring);
        tl.glow(tr.x, tr.y, 2.2, 0.28, 1);
      } else if (tr.state === 1) {
        tr.x += (tr.tx - tr.x) * dt * 2.4; tr.y += (tr.ty - tr.y) * dt * 2.4;
        if (Math.hypot(tr.tx - tr.x, tr.ty - tr.y) < 5) { tr.state = 2; tr.wt = 1.4 + R() * 0.6; }
        tl.glow(tr.x, tr.y, 2.6, 0.45, 1);
      } else if (tr.state === 2) {
        tr.wt -= dt; working++;
        const flick = 0.6 + 0.4 * Math.sin(t * 9 + tr.ang * 7);
        tl.glow(tr.x, tr.y, 3.2, 0.6 * flick, 0);
        if (tr.wt <= 0) tr.state = 3;
      } else {
        const hx = fx + Math.cos(tr.ang) * ringR(tr.ring);
        const hy = fy + Math.sin(tr.ang) * ringR(tr.ring);
        tr.x += (hx - tr.x) * dt * 2.2; tr.y += (hy - tr.y) * dt * 2.2;
        if (Math.hypot(hx - tr.x, hy - tr.y) < 4) tr.state = 0;
        tl.glow(tr.x, tr.y, 2.2, 0.34, 2);
      }
    }
    // delegation thread to an active worksite
    if (working > 0) {
      const [sx, sy] = s.squadTarget;
      const grd = ctx.createLinearGradient(fx, fy, sx, sy);
      grd.addColorStop(0, tl.line(0.22, 1)); grd.addColorStop(1, tl.line(0.05, 2));
      ctx.strokeStyle = grd;
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(sx, sy); ctx.stroke();
      tl.glow(sx, sy, 20, 0.14, 2);
    }
  },
);

/* -------------------------------------------------------------- trajectory --
   Startups — the unfair advantage. Launches slingshot along a rising arc,
   each one faster-feeling than gravity should allow, bursting at apogee. */
type Launch = { p: number; burst: number };
type TrajState = { launches: Launch[]; nextL: number; pad: number };
const trajectory = defScene<TrajState>(
  () => ({ launches: [{ p: 0.4, burst: 0 }], nextL: 1.2, pad: 0 }),
  (tl, s) => {
    tl.fade(0.14);
    const { ctx, dt, w, h } = tl;
    const x0 = w * 0.42, y0 = h * 0.88;                    // launch pad
    const cxp = w * 0.66, cyp = h * 0.8;                   // control point (low, fast start)
    const x1 = w * 0.97, y1 = h * 0.1;                     // apogee exit
    const path = (u: number) => {
      const iu = 1 - u;
      return {
        x: iu * iu * x0 + 2 * iu * u * cxp + u * u * x1,
        y: iu * iu * y0 + 2 * iu * u * cyp + u * u * y1,
      };
    };
    // faint course markers
    ctx.lineWidth = 1;
    for (let u = 0.06; u < 1; u += 0.06) {
      const p = path(u);
      tl.glow(p.x, p.y, 1.1, 0.12, 3);
    }
    // pad
    s.pad = Math.max(0, s.pad - dt * 1.6);
    tl.glow(x0, y0, 26 + s.pad * 26, 0.2 + s.pad * 0.3, 2);
    ctx.strokeStyle = tl.line(0.16 + s.pad * 0.3, 2);
    ctx.beginPath(); ctx.moveTo(x0 - 26, y0 + 8); ctx.lineTo(x0 + 26, y0 + 8); ctx.stroke();
    // launches
    s.nextL -= dt;
    if (s.nextL <= 0) { s.launches.push({ p: 0, burst: 0 }); s.nextL = 1.9; s.pad = 1; }
    s.launches = s.launches.filter((l) => l.burst < 1);
    for (const l of s.launches) {
      if (l.p < 1) {
        l.p = Math.min(1, l.p + dt * (0.24 + l.p * 0.5));   // accelerates as it climbs
        const p = path(l.p);
        tl.glow(p.x, p.y, 3.6, 0.9, 0);
        tl.glow(p.x, p.y, 11, 0.3, 1);
        if (l.p >= 1) l.burst = 0.001;
      } else {
        l.burst = Math.min(1, l.burst + dt * 1.4);
        const p = path(1);
        for (let k = 0; k < 7; k++) {
          const a = (k / 7) * TAU + 0.4;
          const d = l.burst * 44;
          tl.glow(p.x + Math.cos(a) * d, p.y + Math.sin(a) * d, 2, (1 - l.burst) * 0.7, k % 2 ? 1 : 0);
        }
      }
    }
  },
);

/* ---------------------------------------------------------------- flywheel --
   Growing companies — the ops system that runs itself. A heavy flywheel turns
   on its own momentum; input sparks land on the rim and every strike keeps
   the highlight burning around it. */
type FlyState = { sparks: { a: number; d: number }[]; nextS: number; hit: number };
const flywheel = defScene<FlyState>(
  () => ({ sparks: [], nextS: 0.8, hit: 0 }),
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, fy } = tl;
    const rad = Math.min(tl.w, tl.h) * 0.3;
    const rot = t * 0.5;                                    // constant momentum
    ctx.lineWidth = 1.4;
    // rim + rotating highlight
    ctx.strokeStyle = tl.line(0.16, 2);
    ctx.beginPath(); ctx.arc(fx, fy, rad, 0, TAU); ctx.stroke();
    s.hit = Math.max(0, s.hit - dt * 0.7);
    ctx.strokeStyle = tl.line(0.3 + s.hit * 0.3, 1);
    ctx.beginPath(); ctx.arc(fx, fy, rad, rot, rot + 1.1); ctx.stroke();
    // ratchet ticks outside the rim
    ctx.lineWidth = 1;
    for (let k = 0; k < 48; k++) {
      const a = (k / 48) * TAU;
      const ca = Math.cos(a), sa = Math.sin(a);
      ctx.strokeStyle = tl.line(0.08, 3);
      ctx.beginPath();
      ctx.moveTo(fx + ca * (rad + 8), fy + sa * (rad + 8));
      ctx.lineTo(fx + ca * (rad + 13), fy + sa * (rad + 13));
      ctx.stroke();
    }
    // spokes + rim masses
    for (let k = 0; k < 8; k++) {
      const a = rot + (k / 8) * TAU;
      const ex = fx + Math.cos(a) * rad, ey = fy + Math.sin(a) * rad;
      ctx.strokeStyle = tl.line(0.1, 2);
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(ex, ey); ctx.stroke();
      tl.glow(ex, ey, 3.4, 0.5, 1);
    }
    // hub
    tl.glow(fx, fy, 30, 0.3, 2);
    tl.glow(fx, fy, 7, 0.9, 0);
    // momentum sparks fly in tangentially and land on the rim
    s.nextS -= dt;
    if (s.nextS <= 0) { s.sparks.push({ a: R() * TAU, d: 1 }); s.nextS = 2.1; }
    s.sparks = s.sparks.filter((sp) => sp.d > 0);
    for (const sp of s.sparks) {
      sp.d -= dt * 0.9;
      const dist = rad + sp.d * rad * 1.4;
      const a = sp.a - sp.d * 0.9;                          // curls in with the spin
      const x = fx + Math.cos(a) * dist, y = fy + Math.sin(a) * dist;
      tl.glow(x, y, 3, 0.8 * (1 - sp.d * 0.4), 0);
      tl.glow(x, y, 9, 0.2, 1);
      if (sp.d <= 0) s.hit = 1;
    }
  },
);

/* ----------------------------------------------------------------- citadel --
   Enterprise — the transformation layer. A skyline of towers; a wave of
   illumination rolls through and lights the organisation floor by floor. */
type CitState = { towers: { x: number; wdt: number; floors: number; lit: number[] }[]; wave: number };
const citadel = defScene<CitState>(
  (tl) => {
    const n = 9;
    const span = tl.w * 0.62, left = tl.fx - span / 2;
    return {
      towers: Array.from({ length: n }, (_, i) => {
        const floors = 4 + ((i * 7 + 3) % 9);
        return {
          x: left + (i + 0.5) * (span / n),
          wdt: 14 + ((i * 5) % 3) * 6,
          floors,
          lit: Array.from({ length: floors }, () => -10),
        };
      }),
      wave: -0.2,
    };
  },
  (tl, s) => {
    tl.clear();
    const { ctx, t, dt, fx, w, h } = tl;
    const baseY = h * 0.88, floorH = h * 0.055;
    // rolling wave of transformation: left → right, then rests
    s.wave += dt * 0.22;
    if (s.wave > 1.65) s.wave = -0.25;
    const waveX = fx - w * 0.31 + s.wave * w * 0.62;
    ctx.lineWidth = 1;
    for (const tw of s.towers) {
      // frame
      const topY = baseY - tw.floors * floorH;
      ctx.strokeStyle = tl.line(0.1, 3);
      ctx.strokeRect(tw.x - tw.wdt / 2, topY, tw.wdt, tw.floors * floorH);
      // floors light as the wave passes, bottom-up
      for (let f = 0; f < tw.floors; f++) {
        const fy2 = baseY - (f + 0.5) * floorH;
        if (Math.abs(tw.x - waveX) < 14 && s.wave >= 0) {
          if (t - tw.lit[f] > 2) tw.lit[f] = t + f * 0.09;  // stagger up the tower
        }
        const age = t - tw.lit[f];
        const lit = age >= 0 ? Math.exp(-age * 0.55) : 0;
        const idle = 0.07 + 0.03 * Math.sin(t * 0.8 + tw.x * 0.05 + f);
        tl.glow(tw.x, fy2, 2 + lit * 2.6, idle + lit * 0.55, lit > 0.4 ? 1 : 2);
      }
      // beacon on the tallest moments
      const crown = Math.max(...tw.lit.map((l) => (t - l >= 0 ? Math.exp(-(t - l) * 0.55) : 0)));
      if (crown > 0.25) tl.glow(tw.x, topY - 6, 2.6, crown * 0.7, 0);
    }
    // wavefront shimmer
    if (s.wave >= 0 && s.wave <= 1.1) {
      const grd = ctx.createLinearGradient(waveX, baseY - h * 0.5, waveX, baseY);
      grd.addColorStop(0, tl.line(0, 1)); grd.addColorStop(1, tl.line(0.28, 1));
      ctx.strokeStyle = grd;
      ctx.beginPath(); ctx.moveTo(waveX, baseY - h * 0.5); ctx.lineTo(waveX, baseY); ctx.stroke();
      tl.glow(waveX, baseY, 20, 0.3, 1);
    }
    // ground line
    const gg = ctx.createLinearGradient(fx - w * 0.36, 0, fx + w * 0.36, 0);
    gg.addColorStop(0, tl.line(0, 2)); gg.addColorStop(0.5, tl.line(0.35, 2)); gg.addColorStop(1, tl.line(0, 2));
    ctx.strokeStyle = gg;
    ctx.beginPath(); ctx.moveTo(fx - w * 0.36, baseY); ctx.lineTo(fx + w * 0.36, baseY); ctx.stroke();
  },
);

export const SCENES = {
  orbits, lattice, rings, aegis, ledger, loop6,
  radar, waveform, braid, conveyor, breath, ascent,
  presence, dawn, beacon, sparks, embers, strokes,
  legion, trajectory, flywheel, citadel,
} as const;

export type SceneName = keyof typeof SCENES;
