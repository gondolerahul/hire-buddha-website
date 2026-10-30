'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useICP, ICPSlug } from '../context/ICPContext';
// Type-only import (erased at build) — runtime comes from the global bundle
// loaded via <Script> below, so there is no bundler dependency on the package.
import type { FluidBuddhaElement, FluidBuddhaOptions } from 'fluid-buddha';

type FBLevels = {
  intelligence?: 'basic' | 'high' | 'advance' | 'extreme';
  design?: 'level1' | 'level2' | 'level3';
};

declare global {
  interface Window {
    FluidBuddha?: { init: (opts: FluidBuddhaOptions & FBLevels) => FluidBuddhaElement };
    __fluidBuddha?: FluidBuddhaElement;
  }
}

// Mounts the framework-agnostic <fluid-buddha> voice agent ("Pragya"), loaded
// from /fluid-buddha.global.js, and wires it to the site: navigation goes
// through the Next router; the agent's silent persona switch drives the ICP
// theme via setICP. Any "Talk to Pragya" CTA dispatches a `toggle-pragya`
// CustomEvent (optionally carrying a { prompt } detail) to open / ask the agent.
export function FluidBuddha() {
  const router = useRouter();
  const { setICP } = useICP();

  // Lazily inject Pragya only when the visitor first asks for her. This keeps
  // the configured level2/extreme experience intact while preventing its
  // always-on immersive surface from cannibalising the hero on every page.
  const ensureAgent = (): FluidBuddhaElement | undefined => {
    if (typeof window === 'undefined' || !window.FluidBuddha) return undefined;
    if (window.__fluidBuddha) return window.__fluidBuddha;
    window.__fluidBuddha = window.FluidBuddha.init({
      backend: process.env.NEXT_PUBLIC_HIREBUDDHA_VOICE_WSS || 'ws://localhost:8080',
      site: 'hirebuddha',
      accent: '#edab48',
      intelligence:
        (process.env.NEXT_PUBLIC_FB_INTELLIGENCE as FBLevels['intelligence']) || 'advance',
      design: (process.env.NEXT_PUBLIC_FB_DESIGN as FBLevels['design']) || 'level1',
      autoStart: false,
      hooks: {
        onNavigate: (path) => router.push(path),
        onSetPersona: (persona) => setICP(persona as ICPSlug),
      },
    });
    return window.__fluidBuddha;
  };

  useEffect(() => {
    const onToggle = (e: Event) => {
      const el = ensureAgent();
      if (!el) return;
      const prompt = (e as CustomEvent).detail?.prompt as string | undefined;
      if (prompt) el.ask(prompt);
      else el.openPanel();
    };
    window.addEventListener('toggle-pragya', onToggle);
    return () => window.removeEventListener('toggle-pragya', onToggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setICP]);

  // Load the SDK so window.FluidBuddha is ready; do NOT init/inject until asked.
  return <Script src="/fluid-buddha.global.js" strategy="afterInteractive" />;
}
