'use client';

import { MessageSquare, CalendarClock, Building2 } from 'lucide-react';
import { talkToPragya } from '@/lib/pragya';
import { company } from '@/config/company';

const cardStyle: React.CSSProperties = {
  display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', borderRadius: 'var(--r-lg)',
  border: '1px solid var(--border)', background: 'rgba(255,255,255,.014)', textAlign: 'left', width: '100%',
};
const iconStyle: React.CSSProperties = {
  width: 42, height: 42, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center',
  color: 'var(--accent)', background: 'var(--accent-quiet)', border: '1px solid var(--border-gold)', flex: 'none',
};

function Body({ title, body }: { title: string; body: string }) {
  return (
    <span>
      <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--fg)' }}>{title}</span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-subtle)' }}>{body}</span>
    </span>
  );
}

export function ContactAside() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
      <button type="button" onClick={() => talkToPragya()} style={cardStyle} className="promptHover" data-cursor>
        <span style={iconStyle}><MessageSquare size={18} /></span>
        <Body title="Talk to Pragya" body="Ask anything by text or voice, right now." />
      </button>
      <a href={`mailto:${company.email.contact}?subject=Demo%20request`} style={cardStyle} className="promptHover" data-cursor>
        <span style={iconStyle}><CalendarClock size={18} /></span>
        <Body title="Schedule a demo" body={`See the platform with our team. ${company.email.contact}`} />
      </a>
      <a href={`mailto:${company.email.contact}?subject=Enterprise%20enquiry`} style={cardStyle} className="promptHover" data-cursor>
        <span style={iconStyle}><Building2 size={18} /></span>
        <Body title="Enterprise & security" body="SSO, residency, governance, and procurement." />
      </a>
    </div>
  );
}
