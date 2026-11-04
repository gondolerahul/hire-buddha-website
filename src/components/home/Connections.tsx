import { ShieldCheck, Wand2 } from 'lucide-react';
import { CONNECTIONS } from '@/lib/site';
import { Reveal } from '@/components/motion/primitives';
import s from './Connections.module.css';

// The accounts a business can connect, and exactly what HireBuddha does with
// each one. A server component: every name and sentence is in the page HTML,
// which is what the providers' brand and app reviewers read.
export function Connections() {
  return (
    <section className="u-section" id="connections" aria-labelledby="connections-title">
      <div className="u-container">
        <Reveal y={12}><div className="u-eyebrow" style={{ marginBottom: 18 }}>Connections</div></Reveal>
        <h2 id="connections-title" className={s.title}>Your AI employees work inside the accounts you already use.</h2>
        <p className={s.lead}>
          Connect an account by signing in with its provider and approving the access HireBuddha asks for.
          You can disconnect any of them at any time.
        </p>

        <ul className={s.grid}>
          {CONNECTIONS.map((c) => (
            <li key={c.name} className={s.item}>
              <span className={s.name}>{c.name}</span>
              <span className={s.does}>{c.does}</span>
            </li>
          ))}
        </ul>

        <div className={s.notes}>
          <p className={s.note}>
            <ShieldCheck size={18} aria-hidden />
            <span><b>A person approves every outbound action.</b> Every e-mail, post, comment reply, video upload and ad change an AI employee wants to make waits for someone on your team to approve it, and goes out exactly as approved.</span>
          </p>
          <p className={s.note}>
            <Wand2 size={18} aria-hidden />
            <span><b>Use something else?</b> The Meta Agent can build a tool for the systems you use, through their API or your own MCP server.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
