'use client';

import { useEffect } from 'react';

// Site-wide pointer spotlight. One delegated listener writes --mx / --my / --spot-o
// onto whichever [data-spot] element is under the pointer; globals.css turns those
// vars into a cursor-tracked glow + a lit border segment on every card that opts in.
// No React state, no rerenders — style writes only.
export function Spotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let current: HTMLElement | null = null;
    const clear = () => {
      if (current) { current.style.setProperty('--spot-o', '0'); current = null; }
    };
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.('[data-spot]') as HTMLElement | null;
      if (current && current !== t) current.style.setProperty('--spot-o', '0');
      current = t;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', `${e.clientX - r.left}px`);
      t.style.setProperty('--my', `${e.clientY - r.top}px`);
      t.style.setProperty('--spot-o', '1');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', clear);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', clear);
    };
  }, []);
  return null;
}
