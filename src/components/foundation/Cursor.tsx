'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/lib/useMediaQuery';

// A bespoke two-part cursor: a precise gold dot that tracks the pointer 1:1 and
// a softer trailing ring on spring physics that swells over interactive targets.
// Pointer position is held in motion values (never React state) so the page does
// not re-render on every mouse move. Native cursor is hidden via .has-cursor,
// except over text fields, which keep the I-beam.
export function Cursor() {
  const reduce = useReducedMotion();
  const fine = useMediaQuery('(pointer: fine)');
  const enabled = fine && !reduce;
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [label, setLabel] = useState('');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const onMove = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.('a, button, [data-cursor], input, textarea, [role="button"]') as HTMLElement | null;
      if (!t) { setVariant('default'); setLabel(''); return; }
      const c = t.getAttribute('data-cursor');
      if (c === 'view') { setVariant('view'); setLabel(t.getAttribute('data-cursor-label') || 'View'); }
      else { setVariant('hover'); setLabel(''); }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-cursor)' as unknown as number, pointerEvents: 'none' }}>
      {/* Trailing ring */}
      <motion.div
        style={{ position: 'fixed', top: 0, left: 0, x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: variant === 'default' ? 38 : variant === 'view' ? 88 : 60,
          height: variant === 'default' ? 38 : variant === 'view' ? 88 : 60,
          opacity: variant === 'default' ? 0.5 : 1,
          borderColor: variant === 'default' ? 'rgba(237,171,72,0.45)' : 'rgba(237,171,72,0.9)',
          backgroundColor: variant === 'view' ? 'rgba(237,171,72,0.14)' : 'rgba(237,171,72,0)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '1px solid currentColor', boxShadow: '0 0 18px -4px rgba(237,171,72,0.5)',
          display: 'grid', placeItems: 'center',
          color: 'inherit',
        }}>
          {label && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--on-accent)', fontWeight: 600,
            }}>{label}</span>
          )}
        </div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, x, y, translateX: '-50%', translateY: '-50%',
          width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-300)',
          boxShadow: '0 0 10px 1px rgba(253,200,113,0.8)',
        }}
        animate={{ opacity: variant === 'view' ? 0 : 1, scale: variant === 'hover' ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
