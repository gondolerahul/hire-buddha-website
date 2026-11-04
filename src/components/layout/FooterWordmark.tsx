'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/motion/primitives';
import s from './Footer.module.css';

// Molten gold pours through the outlined wordmark once it enters view.
export function FooterWordmark() {
  const reduce = useReducedMotion();
  return (
    <Reveal y={40} amount={0.4}>
      <div className={s.wordmarkWrap} aria-hidden>
        <div className={s.wordmark}>HireBuddha</div>
        <motion.div
          className={`${s.wordmark} ${s.wordmarkFill}`}
          initial={reduce ? false : { clipPath: 'inset(-10% 100% -10% 0)' }}
          whileInView={{ clipPath: 'inset(-10% 0% -10% 0)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          HireBuddha
        </motion.div>
      </div>
    </Reveal>
  );
}
