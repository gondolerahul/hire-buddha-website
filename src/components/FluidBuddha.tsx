'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import type { FluidBuddhaElement, FluidBuddhaOptions, IntelligenceLevel, DesignLevel } from '@/types/fluid-buddha';
import { company } from '@/config/company';
import s from './FluidBuddha.module.css';

declare global {
  interface Window {
    FluidBuddha?: { init: (opts: FluidBuddhaOptions) => FluidBuddhaElement };
    __fluidBuddha?: FluidBuddhaElement;
  }
}

const INTELLIGENCE: IntelligenceLevel[] = ['basic', 'high', 'advance', 'extreme'];
const DESIGN: DesignLevel[] = ['level1', 'level2', 'level3'];
const pick = <T extends string>(value: string | undefined, allowed: T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

// NEXT_PUBLIC_* values are fixed at build time. A production build without the
// variable has no backend, so Pragya shows as offline rather than dialling a
// developer's localhost.
const BACKEND = process.env.NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS
  || (process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8080');
const API = BACKEND.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:');
const SDK_SRC = '/fluid-buddha.global.js';

type Gate = 'closed' | 'disclosure' | 'checking' | 'offline';

/** True when Pragya's backend answers its liveness probe within 5 seconds. */
async function backendUp(): Promise<boolean> {
  if (!API) return false;
  try {
    const res = await fetch(`${API}/healthz`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

let sdkPromise: Promise<void> | null = null;
function loadSdk(): Promise<void> {
  if (window.FluidBuddha) return Promise.resolve();
  sdkPromise ??= new Promise<void>((resolve, reject) => {
    const el = document.createElement('script');
    el.src = SDK_SRC;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => { sdkPromise = null; reject(new Error('Pragya could not load.')); };
    document.body.appendChild(el);
  });
  return sdkPromise;
}

// Pragya, HireBuddha's AI assistant, is the framework-agnostic <fluid-buddha>
// agent from /fluid-buddha.global.js. Nothing loads until a visitor asks for
// her: any "Talk to Pragya" CTA dispatches a `toggle-pragya` CustomEvent
// (optionally carrying a { prompt }). The first time, the visitor sees an AI
// and voice disclosure; then the backend is health-checked, and only if it
// answers is the 600 KB SDK fetched and the agent opened. Otherwise the
// visitor gets a way to reach the team instead of a dead chat.
export function FluidBuddha() {
  const router = useRouter();
  const [gate, setGate] = useState<Gate>('closed');
  const acknowledged = useRef(false);
  const pending = useRef<string | undefined>(undefined);
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(async (prompt?: string) => {
    if (window.__fluidBuddha) {
      if (prompt) window.__fluidBuddha.ask(prompt); else window.__fluidBuddha.openPanel();
      return;
    }
    setGate('checking');
    if (!(await backendUp())) { setGate('offline'); return; }
    try {
      await loadSdk();
    } catch {
      setGate('offline');
      return;
    }
    if (!window.FluidBuddha) { setGate('offline'); return; }
    window.__fluidBuddha = window.FluidBuddha.init({
      backend: BACKEND,
      site: 'hirebuddha',
      accent: '#edab48',
      intelligence: pick(process.env.NEXT_PUBLIC_FB_INTELLIGENCE, INTELLIGENCE, 'advance'),
      design: pick(process.env.NEXT_PUBLIC_FB_DESIGN, DESIGN, 'level1'),
      autoStart: false,
      hooks: { onNavigate: (path) => router.push(path) },
    });
    setGate('closed');
    if (prompt) window.__fluidBuddha.ask(prompt); else window.__fluidBuddha.openPanel();
  }, [router]);

  useEffect(() => {
    const onToggle = (e: Event) => {
      const prompt = (e as CustomEvent).detail?.prompt as string | undefined;
      opener.current = document.activeElement as HTMLElement | null;
      if (acknowledged.current) { void open(prompt); return; }
      pending.current = prompt;
      setGate('disclosure');
    };
    window.addEventListener('toggle-pragya', onToggle);
    return () => window.removeEventListener('toggle-pragya', onToggle);
  }, [open]);

  const close = useCallback(() => {
    setGate('closed');
    opener.current?.focus?.();
  }, []);

  // Modal behaviour: focus the dialog's first control, keep Tab inside it,
  // and close on Escape.
  useEffect(() => {
    if (gate === 'closed') return;
    const root = dialogRef.current;
    root?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab' || !root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [gate, close]);

  if (gate === 'closed') return null;

  const accept = () => { acknowledged.current = true; void open(pending.current); };

  return (
    <div className={s.backdrop} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} className={s.dialog} role="dialog" aria-modal="true" aria-labelledby="pragya-gate-title" aria-describedby="pragya-gate-body">
        <button type="button" className={s.close} onClick={close} aria-label="Close"><X size={18} /></button>
        <div className={s.eyebrow}>Pragya · AI assistant</div>

        {(gate === 'disclosure' || gate === 'checking') && (
          <>
            <h2 id="pragya-gate-title" className={s.title}>You’re about to talk to an AI.</h2>
            <div id="pragya-gate-body" className={s.body}>
              <p>Pragya is HireBuddha’s AI assistant, not a person. Her answers can be wrong, so check anything important with our team.</p>
              <p>If you use your microphone, your voice is turned into text so Pragya can answer you; the recording is never saved. We keep a text copy of the conversation for 90 days, with personal details masked, as our <Link href="/privacy" onClick={close}>Privacy Policy</Link> describes. Please don’t share passwords, card numbers or other sensitive details.</p>
            </div>
            <div className={s.actions}>
              <button type="button" className="btn btn-gold" onClick={accept} disabled={gate === 'checking'} data-autofocus>
                {gate === 'checking' ? 'Connecting…' : 'Continue'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={close}>Not now</button>
            </div>
          </>
        )}

        {gate === 'offline' && (
          <>
            <h2 id="pragya-gate-title" className={s.title}>Pragya is offline right now.</h2>
            <div id="pragya-gate-body" className={s.body}>
              <p>She can’t take questions at the moment. Our team can: write to <a href={`mailto:${company.email.contact}`}>{company.email.contact}</a>, call {company.phone.display} ({company.hours}), or send us a note through the contact form.</p>
            </div>
            <div className={s.actions}>
              <Link href="/contact" className="btn btn-gold" onClick={close} data-autofocus>Go to the contact form</Link>
              <button type="button" className="btn btn-ghost" onClick={() => void open(pending.current)}>Try again</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
