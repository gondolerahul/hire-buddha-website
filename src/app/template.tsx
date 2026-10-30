'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Page-enter choreography: a warm-black veil wipes downward off the page with a
// molten-gold leading edge while the content settles in underneath. Remounts on
// every route change (Next template semantics), so each navigation gets the wipe.
// Only opacity animates on the page wrapper — no transform or filter — so
// fixed, sticky, and backdrop-filter descendants are unaffected.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [veilDone, setVeilDone] = useState(false);

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
      >
        {children}
      </motion.div>
      {!veilDone && (
        <motion.div
          aria-hidden
          style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-overlay)' as unknown as number, pointerEvents: 'none', background: 'var(--bg)' }}
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.72, ease: [0.83, 0, 0.17, 1] }}
          onAnimationComplete={() => setVeilDone(true)}
        >
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 2,
            background: 'var(--gradient-gold-metallic)',
            boxShadow: '0 0 26px 3px rgba(237,171,72,.4)',
          }} />
        </motion.div>
      )}
    </>
  );
}
