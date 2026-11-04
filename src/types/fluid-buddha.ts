// The parts of the fluid-buddha SDK's public API this site uses, copied from
// fluid-buddha-sdk/src/core/config.ts and src/ui/FluidBuddhaElement.ts. The
// runtime comes from the committed /fluid-buddha.global.js (see `npm run
// sync:agent`), so the site needs only these types and never the sibling repo.

export type IntelligenceLevel = 'basic' | 'high' | 'advance' | 'extreme';
export type DesignLevel = 'level1' | 'level2' | 'level3';

export interface FluidBuddhaHooks {
  onNavigate?: (path: string) => void;
  onScrollTo?: (target: { sectionId?: string; direction?: string }) => void;
  onSetPersona?: (persona: string) => void;
}

export interface FluidBuddhaOptions {
  backend?: string;
  api?: string;
  site?: string;
  position?: 'bottom-right' | 'bottom-left';
  accent?: string;
  greeting?: string;
  autoInject?: boolean;
  autoStart?: boolean;
  intelligence?: IntelligenceLevel;
  design?: DesignLevel;
  tour?: boolean;
  hooks?: FluidBuddhaHooks;
}

export interface FluidBuddhaElement extends HTMLElement {
  ask(text: string): void;
  toggle(): void;
  openPanel(): void;
}
