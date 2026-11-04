'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LiquidGold } from './LiquidGold';

type Props = {
  radius?: number;
  centerY?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Volumetric molten-gold ring. Domain-warped FBM, rotated around the ring for
// flow, masked to a radial band whose thickness breathes with the noise; baked
// bloom + a jewel core + Karuna warm rim + a pointer glow.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform float uR;
uniform float uCenterY;

float hash(vec2 p){ p = fract(p*vec2(123.34,345.45)); p += dot(p, p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<4;i++){ v += a*noise(p); p = p*2.03 + vec2(11.1,7.3); a *= 0.5; }
  return v;
}

void main(){
  vec2 center = vec2(uRes.x*0.5, uRes.y*(1.0-uCenterY));
  vec2 uv = (gl_FragCoord.xy - center)/uRes.y;
  float rad = length(uv);

  // slow rotation makes the molten texture flow around the ring
  float ra = uTime*0.05;
  mat2 rot = mat2(cos(ra), -sin(ra), sin(ra), cos(ra));
  vec2 ruv = rot*uv;
  float t = uTime*0.13;

  vec2 q = vec2(fbm(ruv*2.7 + vec2(1.2, t)), fbm(ruv*2.7 + vec2(5.7, -t)));
  float flow = fbm(ruv*3.3 + 1.9*q);

  float R = uR;
  float d = rad - R;
  float ang = atan(uv.y, uv.x);

  // molten band — flowing thickness, high-contrast filaments
  float sigma = 0.015 + 0.034*flow;
  float band = exp(-d*d/(2.0*sigma*sigma)) * (0.22 + 1.2*pow(flow, 1.6));
  // crisp bright edge filament
  float line = exp(-d*d/(2.0*0.0045*0.0045)) * (0.35 + 0.75*flow);
  // rotating metallic specular sweep (seamless via cos)
  float ringMask = exp(-d*d/(2.0*0.05*0.05));
  float spec = ringMask * (pow(max(0.0, cos(ang - uTime*0.3)), 6.0)*0.95
             + pow(max(0.0, cos(ang*2.0 + uTime*0.2 + 1.7)), 12.0)*0.6);
  // soft bloom glow + jewel core
  float bloom = exp(-d*d/(2.0*0.12*0.12))*0.16;
  float core = exp(-pow(rad/0.05, 2.0))*(0.9 + 0.1*sin(uTime*1.6));
  float nucleus = exp(-pow(rad/0.016, 2.0))*0.7;
  float halo = exp(-pow((rad - R*0.4)/0.014, 2.0))*0.1;

  float inten = band + line + spec + bloom + core + nucleus + halo;
  inten *= 0.76 + 0.42*smoothstep(-0.55, 0.7, uv.x);   // Karuna warm rim (right)

  if(uPointerOn > 0.5){
    vec2 puv = (uPointer - center)/uRes.y;
    inten += exp(-pow(length(uv-puv)/0.16, 2.0))*0.55;
  }

  vec3 amber = vec3(0.40,0.22,0.06);
  vec3 gold  = vec3(0.93,0.67,0.27);
  vec3 hot   = vec3(1.0,0.97,0.88);
  vec3 col = amber*inten;
  col = mix(col, gold, smoothstep(0.22,0.95,inten));
  col = mix(col, hot,  smoothstep(1.0,1.85,inten));

  col += vec3(0.039,0.035,0.031);                      // warm near-black base
  col *= 1.0 - 0.22*smoothstep(0.55,1.45,rad);         // vignette
  gl_FragColor = vec4(col, 1.0);
}
`;

export function LiquidGoldGL({ radius = 0.36, centerY = 0.46, interactive = true, className, style }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try { gl = (canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'high-performance' }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null; }
    catch { gl = null; }
    if (!gl) { setFallback(true); return; }
    const g = gl;

    const compile = (type: number, src: string) => {
      const s = g.createShader(type)!;
      g.shaderSource(s, src); g.compileShader(s);
      if (!g.getShaderParameter(s, g.COMPILE_STATUS)) { console.warn(g.getShaderInfoLog(s)); g.deleteShader(s); return null; }
      return s;
    };
    const vs = compile(g.VERTEX_SHADER, VERT);
    const fs = compile(g.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { setFallback(true); return; }
    const prog = g.createProgram()!;
    g.attachShader(prog, vs); g.attachShader(prog, fs); g.linkProgram(prog);
    if (!g.getProgramParameter(prog, g.LINK_STATUS)) { setFallback(true); return; }
    g.useProgram(prog);

    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, 'p');
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);

    const uRes = g.getUniformLocation(prog, 'uRes');
    const uTime = g.getUniformLocation(prog, 'uTime');
    const uPointer = g.getUniformLocation(prog, 'uPointer');
    const uPointerOn = g.getUniformLocation(prog, 'uPointerOn');
    g.uniform1f(g.getUniformLocation(prog, 'uR'), radius);
    g.uniform1f(g.getUniformLocation(prog, 'uCenterY'), centerY);

    let raf = 0, running = true, start = performance.now();
    const pointer = { x: 0, y: 0, on: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.3) * 0.82; // soft plasma → render a touch under native
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = w; canvas.height = h;
      g.viewport(0, 0, w, h);
      g.uniform2f(uRes, w, h);
    };
    resize();

    const draw = (now: number) => {
      if (!running) return;
      g.uniform1f(uTime, (now - start) / 1000);
      g.uniform1f(uPointerOn, pointer.on);
      g.uniform2f(uPointer, pointer.x, pointer.y);
      g.drawArrays(g.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; start = performance.now() - 1000; raf = requestAnimationFrame(draw); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0 });
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; raf = requestAnimationFrame(draw); }
    };
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      pointer.y = canvas.height - (e.clientY - rect.top) * (canvas.height / rect.height);
      pointer.on = 1;
    };
    const onLeave = () => { pointer.on = 0; };
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    const onLost = (e: Event) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); setFallback(true); };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      running = false; cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      g.deleteProgram(prog); g.deleteShader(vs); g.deleteShader(fs); g.deleteBuffer(buf);
    };
  }, [reduce, radius, centerY, interactive]);

  if (reduce || fallback) return <LiquidGold radius={radius} centerY={centerY} interactive={interactive} className={className} style={style} />;
  return <canvas ref={ref} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }} aria-hidden />;
}
