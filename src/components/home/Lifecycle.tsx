'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/motion/primitives';
import s from './home.module.css';

const STEPS = [
  { k: 'Design', t: 'Design your AI Employee.', b: 'Name them. Define their role. Tune personality with precision sliders. Bind tools. Upload your knowledge base — or just describe what you need and the Meta Agent builds the whole employee.' },
  { k: 'Deploy', t: 'Connect them to the world.', b: 'Assign phone lines, WhatsApp, email, and social. Your AI Employee goes live on every channel your business touches — simultaneously.' },
  { k: 'Employ', t: 'Watch them work. Watch them learn.', b: 'Trigger campaigns, auto-answer inbound, run background processes. Every run makes your AI employees better at your business, and that learning stays in your workspace. The workforce you start today is the slowest you’ll ever run.' },
];

export function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 75%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="u-section">
      <div className="u-container">
        <Reveal>
          <h2 className={s.shiftHead} style={{ marginBottom: 0 }}>
            Three steps. Ten minutes.<br />A workforce that never stops.
          </h2>
        </Reveal>

        <div className={s.lifeSteps} ref={ref}>
          <div className={s.lifeTrack}><motion.div className={s.lifeTrackFill} style={{ scaleX: fill }} /></div>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.k} className={s.step} data-active={active >= i}
              onViewportEnter={() => setActive((a) => Math.max(a, i))}
              viewport={{ amount: 0.6 }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={s.stepNode}>0{i + 1}</div>
              <div className={s.stepKicker}>{step.k}</div>
              <h3 className={s.stepTitle}>{step.t}</h3>
              <p className={s.stepBody}>{step.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
