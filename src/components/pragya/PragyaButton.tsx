'use client';

import { talkToPragya } from '@/lib/pragya';

// A "Talk to Pragya" button that server components can render.
export function PragyaButton({ className = 'btn btn-ghost', prompt, children = 'Talk to Pragya' }: {
  className?: string; prompt?: string; children?: React.ReactNode;
}) {
  return <button type="button" className={className} onClick={() => talkToPragya(prompt)}>{children}</button>;
}
