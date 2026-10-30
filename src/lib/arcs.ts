import { ARCS } from './site';

export type ArcDetail = {
  intro: string;
  capabilities: { title: string; body: string }[];
  flow: { title: string; body: string }[];
  channels?: string[];
  handoff: string;
};

export const ARC_DETAIL: Record<string, ArcDetail> = {
  perceive: {
    intro: 'Perceive is the loop’s senses. It watches the market, your customers, and your own numbers without pause — turning raw signal into structured, scored intelligence the rest of Sheel can act on.',
    capabilities: [
      { title: 'Market & competitor monitoring', body: 'Continuously scans the web, news, and sources you connect for the signals that matter to you.' },
      { title: 'Demand & intent sensing', body: 'Detects buying intent and seasonal shifts from behavior, enquiries, and external triggers.' },
      { title: 'Inbound capture & enrichment', body: 'Catches every inbound lead and enriches it with firmographic and contact data before it moves.' },
      { title: 'KPI & anomaly watch', body: 'Tracks your operating numbers and surfaces anomalies the moment they appear — not at month-end.' },
    ],
    flow: [
      { title: 'Ingest signals', body: 'Pulls from web, inboxes, forms, and connected systems on a continuous cadence.' },
      { title: 'Enrich & structure', body: 'Cleans, dedupes, and enriches every record into the tenant’s evolving schema.' },
      { title: 'Score & prioritize', body: 'Ranks signals by fit and urgency so the most valuable work surfaces first.' },
      { title: 'Hand off', body: 'Routes qualified signals into Engage and Orchestrate to be acted on.' },
    ],
    handoff: 'Feeds qualified signals into Engage and Orchestrate.',
  },
  engage: {
    intro: 'Engage is Karuna — the compassionate face the business turns to the world. Every conversation that acquires, sells, supports, or screens runs here, across every channel, in any language, with memory of every prior exchange.',
    channels: ['Voice', 'Email', 'WhatsApp', 'Chat', 'Social', 'Phone'],
    capabilities: [
      { title: 'Outbound acquisition', body: 'Prospects, personalizes, and runs first-touch campaigns across voice, email, and messaging.' },
      { title: 'Conversational sales', body: 'Qualifies, demos, proposes, negotiates, and closes — booking straight onto your calendar.' },
      { title: 'Omnichannel support', body: 'Resolves issues in seconds, remembers every conversation, and escalates only what it can’t handle.' },
      { title: 'Candidate screening', body: 'Runs structured first-round interviews that score, rank, and shortlist — at any hour.' },
    ],
    flow: [
      { title: 'Greet & understand', body: 'Recognizes the contact, recalls history, and reads intent with empathy.' },
      { title: 'Act on channel', body: 'Answers, sells, supports, or screens — with the right tone and guidelines applied.' },
      { title: 'Resolve or route', body: 'Closes the loop itself, or hands complex work to a specialist or a human.' },
      { title: 'Remember', body: 'Writes the exchange to episodic and CORTEX memory for next time.' },
    ],
    handoff: 'Hands committed work to Orchestrate and Fulfill.',
  },
  orchestrate: {
    intro: 'Orchestrate is the loop’s judgment. It decides what to do and who does it — building dependency graphs, dispatching work, and commissioning the Meta Agent to create any agent or tool that doesn’t yet exist.',
    capabilities: [
      { title: 'Planning & dispatch', body: 'Turns goals into execution plans and assigns each step to the right tier.' },
      { title: 'Multi-agent processes', body: 'Runs DAG-based workflows with parallel branches, conditional routing, and child dispatch.' },
      { title: 'Resource allocation', body: 'Balances priority, cost, and deadlines across everything in flight.' },
      { title: 'Builds what’s missing', body: 'Commissions the Meta Agent to create new agents and tools on demand.' },
    ],
    flow: [
      { title: 'Decompose', body: 'Breaks the objective into capabilities, data, and constraints.' },
      { title: 'Plan', body: 'Builds a dynamic dependency graph and schedules child runs.' },
      { title: 'Dispatch', body: 'Assigns work to agents and skills — or has the Meta Agent build new ones.' },
      { title: 'Summarize', body: 'Aggregates outcomes and reports back up the loop.' },
    ],
    handoff: 'Dispatches to Fulfill and back to Engage.',
  },
  fulfill: {
    intro: 'Fulfill gets the work done. Operations, delivery, QA, logistics, and provisioning all execute here — and when an integration breaks, the platform diagnoses and repairs its own code rather than stalling.',
    capabilities: [
      { title: 'Operations & delivery', body: 'Executes the actual work of the business, end to end, at machine speed.' },
      { title: 'Quality assurance', body: 'Verifies outputs against acceptance criteria before anything ships.' },
      { title: 'Logistics & provisioning', body: 'Coordinates fulfillment, inventory, and account provisioning across systems.' },
      { title: 'Self-healing', body: 'Detects broken integrations and rewrites its own tools — sandboxed and test-gated.' },
    ],
    flow: [
      { title: 'Receive work', body: 'Takes dispatched tasks with their inputs and acceptance criteria.' },
      { title: 'Execute', body: 'Runs the operation across the bound tools and systems.' },
      { title: 'Verify', body: 'Checks the result; retries or self-heals on failure.' },
      { title: 'Deliver', body: 'Completes the outcome and reports to Sustain and Evolve.' },
    ],
    handoff: 'Returns outcomes to Sustain and Evolve.',
  },
  sustain: {
    intro: 'Sustain keeps the business funded, legal, staffed, and supplied. Finance, accounting, legal, compliance, HR, and IT run continuously here — the back office that never falls behind.',
    capabilities: [
      { title: 'Finance & accounting', body: 'Bank-feed sync, ledger matching, AR collections, payouts, and cash-flow forecasting.' },
      { title: 'Legal & compliance', body: 'Contract review, e-signature routing, and continuous compliance checks.' },
      { title: 'HR & payroll', body: 'Onboarding, HRIS upkeep, and payroll runs — handled on schedule.' },
      { title: 'IT & procurement', body: 'Provisioning, vendor management, and procurement across connected systems.' },
    ],
    flow: [
      { title: 'Monitor obligations', body: 'Tracks invoices, filings, contracts, and renewals continuously.' },
      { title: 'Act on schedule', body: 'Reconciles, pays, files, and renews — with HITL gates on high-stakes actions.' },
      { title: 'Govern', body: 'Applies circuit breakers, residency rules, and audit logging to everything.' },
      { title: 'Report', body: 'Keeps every other arc resourced, compliant, and informed.' },
    ],
    handoff: 'Keeps every other arc resourced and compliant.',
  },
  evolve: {
    intro: 'Evolve is the loop turning back on itself. It learns from every run across the whole company and tunes Sheel — so the workforce you operate next quarter is measurably better than the one you operate today.',
    capabilities: [
      { title: 'Cross-process analysis', body: 'Harvests reflections, KPIs, critic verdicts, and human feedback from across the platform.' },
      { title: 'Charter self-optimization', body: 'The Self-Optimizing Intelligence Engine rewrites agent charters from KPI evidence.' },
      { title: 'Routing & tool tuning', body: 'Sharpens model routing and optimizes tools that get slow or costly.' },
      { title: 'Executive reporting', body: 'Generates the weekly briefings that show leadership what changed and why.' },
    ],
    flow: [
      { title: 'Gather', body: 'Collects signal from every arc — outcomes, reflections, and feedback.' },
      { title: 'Diagnose', body: 'Finds what helped, what hurt, and where the loop leaks value.' },
      { title: 'Tune', body: 'Folds improvements back into charters, routing, memory, and tools.' },
      { title: 'Compound', body: 'Repeats every cycle — the gap doesn’t close, it widens.' },
    ],
    handoff: 'Feeds improvements back into every arc — Week 12 beats Week 1.',
  },
};

export const ARC_SLUGS = ARCS.map((a) => a.slug);
export function nextArc(slug: string) {
  const i = ARCS.findIndex((a) => a.slug === slug);
  return ARCS[(i + 1) % ARCS.length];
}
