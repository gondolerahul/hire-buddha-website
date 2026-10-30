// Helper for opening the Pragya (fluid-buddha) voice agent from anywhere.
// The agent listens for a `toggle-pragya` CustomEvent; an optional `prompt`
// detail makes Pragya answer that question immediately instead of just opening.
export function talkToPragya(prompt?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('toggle-pragya', { detail: prompt ? { prompt } : undefined }));
}
