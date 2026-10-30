import type { ICPSlug } from '@/context/ICPContext';
import type { SceneName } from '@/components/visual/heroScenes';

/* Bespoke hero instrument per ICP family — motif matches each concept.
   Sub-pages inherit the family scene so the whole journey feels of a piece. */
export const ICP_SCENES: Record<string, SceneName> = {
  solopreneurs: 'legion',            // the army of one: a commander dispatching squads
  startups: 'trajectory',            // launches slingshotting along a rising arc
  'growing-companies': 'flywheel',   // an ops flywheel running on its own momentum
  enterprise: 'citadel',             // a skyline transformed floor by floor
};

/* ---------------------------------------------------------------- blocks --- */
export type Block =
  | { type: 'prose'; eyebrow?: string; heading?: string; paras: string[] }
  | { type: 'callout'; text: string }
  | { type: 'cards'; eyebrow?: string; heading?: string; lead?: string; cols?: 2 | 3 | 4; items: { kicker?: string; title: string; body: string; href?: string; cta?: string }[] }
  | { type: 'timeline'; eyebrow?: string; heading?: string; lead?: string; items: { num?: string; title: string; body: string }[] }
  | { type: 'table'; eyebrow?: string; heading?: string; lead?: string; columns: string[]; rows: string[][]; highlight?: number }
  | { type: 'stats'; eyebrow?: string; heading?: string; items: { num: string; label: string; accent?: string }[] }
  | { type: 'pills'; heading?: string; items: string[] }
  | { type: 'tool'; tool: 'roi' | 'day-schedule'; eyebrow?: string; heading?: string; lead?: string }
  | { type: 'cta'; title: string; sub?: string; primary?: string; primaryHref?: string };

export type SubPage = { slug: string; nav: string; title: string; desc: string; eyebrow: string; lead: string; blocks: Block[] };

export type ICP = {
  slug: string; icpSlug: ICPSlug; nav: string; name: string; concept: string;
  eyebrow: string; headline: string; lead: string;
  ctaPrimary: string; ctaPrimaryHref: string; pragyaCta: string;
  heroVisual: 'ring' | 'center';
  blocks: Block[];
  subPages: SubPage[];
};

const SOLO: ICP = {
  slug: 'solopreneurs', icpSlug: 'solopreneurs', nav: 'For Solopreneurs', name: 'Solopreneurs', concept: 'The Army of One',
  eyebrow: 'For Solopreneurs · The Army of One',
  headline: 'You’re not alone anymore.',
  lead: 'You just don’t need anyone else. Design an AI team that runs your business while you sleep — for less than the cost of your morning coffee.',
  ctaPrimary: 'Meet Your Team — Free', ctaPrimaryHref: '/contact', pragyaCta: 'Tell Pragya about your day',
  heroVisual: 'center',
  blocks: [
    { type: 'prose', eyebrow: 'We see you', paras: [
      'You’re the founder, the salesperson, the accountant, the support team, the marketing department, and the CEO — all before lunch.',
      'You didn’t choose this because you wanted to do everything. You chose it because you believed in something enough to do anything.',
      'But “anything” is starting to feel like “everything, all the time, forever.” You’re not burned out — you’re on fire, and no one’s coming to put it out.',
    ] },
    { type: 'prose', heading: 'The paradox of being one.', paras: [
      'You’re too small to hire, but too busy to grow. You can’t afford a sales team, so you do sales yourself — which means you can’t do the work. You can’t afford a bookkeeper, so you invoice at midnight — which means you can’t do strategy.',
      'Every hour on operations is an hour stolen from the work that actually matters. You’re not failing. You’re fighting the math of being one person.',
    ] },
    { type: 'cards', eyebrow: 'Solo ≠ alone', heading: 'Imagine waking up to this.', lead: 'You did none of this. Your AI workforce did — and it’s ready to do it again tomorrow.', cols: 3, items: [
      { title: '50 emails, sent', body: 'Personalized outreach went to qualified leads — in your voice, from your address.' },
      { title: '3 tickets, resolved', body: 'Inbound support answered with accurate, empathetic replies pulled from your docs.' },
      { title: 'A late invoice, paid', body: 'A polite WhatsApp nudge went out. The client paid.' },
      { title: 'Books, reconciled', body: 'A weekly cash-flow projection was waiting in your inbox.' },
      { title: 'A renewal, flagged', body: 'A regulatory deadline surfaced with a pre-filled form ready for your signature.' },
      { title: 'A briefing, written', body: 'A short note on what happened, what’s working, and what to do next.' },
    ] },
    { type: 'cards', eyebrow: 'Your team', heading: 'They’re not bots. They’re your team.', cols: 3, items: [
      { kicker: 'Outbound Prospector', title: 'Sarah', body: 'Warm, persistent, persuasive. Today she sent 50 personalized emails and booked 2 demo calls.', href: '/for/solopreneurs/team', cta: 'Meet the team' },
      { kicker: 'Treasury Controller', title: 'Raj', body: 'Precise, calm, relentless on deadlines. Today he reconciled your books and collected a late payment.', href: '/for/solopreneurs/team', cta: 'Meet the team' },
      { kicker: 'Care Orchestrator', title: 'Maya', body: 'Empathetic, fast, patient. Today she resolved 3 tickets in under 60 seconds each — and remembers every customer.', href: '/for/solopreneurs/team', cta: 'Meet the team' },
    ] },
    { type: 'cta', title: 'You built this. You deserve this.', sub: 'Let your business run the way it should — with you steering, and your AI workforce rowing. Your team is waiting.', primary: 'Get Started Free' },
  ],
  subPages: [
    { slug: 'team', nav: 'Meet Your Team', title: 'Meet your team.', desc: 'Named AI Employees with personalities, specialties, and character.', eyebrow: 'For Solopreneurs · Meet Your Team',
      lead: 'Each one is a real teammate — a name, a personality, and a job. Not a feature.', blocks: [
        { type: 'cards', cols: 2, items: [
          { kicker: 'Outbound Prospector', title: 'Sarah', body: 'Finds your customers — researches leads, writes personalized pitches, follows up, never takes a day off. By day 30 her emails are better than yours.' },
          { kicker: 'Treasury Controller', title: 'Raj', body: 'Keeps your finances clean — reconciles books, chases late payments, projects cash flow, sends a P&L every Friday. By day 30 he knows your seasonal patterns.' },
          { kicker: 'Care Orchestrator', title: 'Maya', body: 'Handles your customers — answers tickets in under 60 seconds, escalates only what she can’t, remembers every conversation. By day 30 she’s the best support person you never hired.' },
          { kicker: 'Monday Briefing', title: 'The Strategy Analyst', body: 'No name, no personality — just a briefing every Monday at 7am: your KPIs, what improved, what declined, and exactly what to do next.' },
        ] },
        { type: 'pills', heading: 'And as you grow, more join', items: ['Contract Reviewer', 'Talent Scout', 'Fulfillment Manager'] },
        { type: 'callout', text: 'Your team gets smarter every day. Week 1 they follow instructions. Week 12 they anticipate your needs — without you ever training them.' },
        { type: 'cta', title: 'Assemble your team — free.', primary: 'Get Started Free' },
      ] },
    { slug: 'your-day', nav: 'Your Day', title: 'Your day, reimagined.', desc: 'An interactive before/after of your daily schedule.', eyebrow: 'For Solopreneurs · Your Day',
      lead: 'Here’s what changes when an AI team handles everything that isn’t the work.', blocks: [
        { type: 'tool', tool: 'day-schedule' },
        { type: 'stats', items: [
          { num: '~6 hrs', label: 'back in your day, every day' },
          { num: '$2–5', label: 'what your team’s whole day costs', accent: '' },
          { num: '15 min', label: 'the only review you do' },
        ] },
        { type: 'cta', title: 'Get your hours back.', sub: 'You just got six hours back. What will you build?', primary: 'Start Free' },
      ] },
    { slug: 'start', nav: 'Quick Start', title: '15 minutes. 3 AI Employees. Let’s go.', desc: 'The simplest, fastest getting-started guide.', eyebrow: 'For Solopreneurs · Quick Start',
      lead: 'No credit card. No sales call. No hour-long wizard. Just you, Pragya, and 15 minutes.', blocks: [
        { type: 'timeline', items: [
          { num: '01', title: 'Meet Pragya · 2 min', body: 'Open the widget and say “I’m a solopreneur, help me set up my team.” She asks three questions — what you sell, who you sell to, and what’s drowning you.' },
          { num: '02', title: 'Deploy your first AI Employee · 8 min', body: 'Pragya recommends who to start with, then walks you through naming them, setting their tone, uploading your key docs, and connecting your email. Review the first draft, approve, send.' },
          { num: '03', title: 'Add the rest over coffee · 5 min', body: 'Deploy a second AI Employee — usually Care or Treasury. Pragya handles setup. You just approve.' },
        ] },
        { type: 'prose', heading: 'What happens next.', paras: [
          'By tomorrow morning, your first Learning System briefing lands in your inbox.',
          'By next week, CORTEX has learned your patterns and your team starts getting better — without you doing anything.',
          'By next month, you’ll wonder how you ever did this alone.',
        ] },
        { type: 'cta', title: 'Start now — talk to Pragya.', primary: 'Get Started Free' },
      ] },
  ],
};

const STARTUPS: ICP = {
  slug: 'startups', icpSlug: 'startups', nav: 'For Startups', name: 'Startups & SMEs', concept: 'Your Unfair Advantage',
  eyebrow: 'For Startups · Your Unfair Advantage',
  headline: 'They have headcount. You have HireBuddha. You win.',
  lead: 'Your competitor raised $20M and hired 80 people. You have a better weapon — an AI workforce that outperforms their entire org in 10 minutes, for pennies per task.',
  ctaPrimary: 'Deploy Your Unfair Advantage', ctaPrimaryHref: '/contact', pragyaCta: 'Ask Pragya how to 10x',
  heroVisual: 'ring',
  blocks: [
    { type: 'cards', eyebrow: 'Size is not strength', heading: 'Your competitor’s team is their biggest weakness.', cols: 3, items: [
      { title: '80 employees', body: '≈ $400K/month in payroll, a 90-day onboarding cycle for every hire, and a Slack with 200 channels where nothing gets decided.' },
      { title: '15 SDRs → 750 calls', body: 'Your AI Prospector makes 5,000 in the same day — and learns from every one.' },
      { title: 'A Monday backlog of 300', body: 'Their team clears it by Wednesday. Your Care Orchestrator resolved 280 at 3am on Sunday.' },
    ] },
    { type: 'cards', eyebrow: 'Your day, reimagined', heading: 'Here’s what your AI-native company looks like.', lead: 'You did none of this. All of it happened.', cols: 4, items: [
      { kicker: 'Morning', title: 'Before your laptop', body: 'Your Growth arc enriched 500 leads, drafted outreach, and queued 200 calls.', href: '/for/startups/day-in-the-life', cta: 'See the full day' },
      { kicker: 'Midday', title: 'On call 4 of 12', body: 'A billing dispute resolved via WhatsApp in 90 seconds; a late invoice flagged and collected.', href: '/for/startups/day-in-the-life', cta: 'See the full day' },
      { kicker: 'Evening', title: 'A 4-minute briefing', body: 'Open rates dropped 12%; your Prospector’s subject lines were adjusted automatically.', href: '/for/startups/day-in-the-life', cta: 'See the full day' },
      { kicker: 'Night', title: 'While you sleep', body: 'A renewal deadline 14 days out was found and pre-filled. It pinged you for sign-off.', href: '/for/startups/day-in-the-life', cta: 'See the full day' },
    ] },
    { type: 'table', eyebrow: 'The economics of unfair', heading: 'Same customer. Same contract. 99% lower acquisition cost.', lead: 'Illustrative comparison.', columns: ['Metric', 'Traditional (hiring)', 'HireBuddha'], highlight: 2, rows: [
      ['Cost to acquire one customer', '$2,400', '$3.50'],
      ['Decision to execution', '90 days', '10 minutes'],
      ['Scale from 1 to 10 reps', '6 months + $500K', '10 seconds + $0'],
      ['Works 24/7', 'No', 'Yes'],
      ['Remembers every interaction', 'No — lost on attrition', 'Yes — CORTEX, permanent'],
      ['Improves without management', 'No', 'Yes — Learning System'],
    ] },
    { type: 'prose', eyebrow: 'They’ll never catch up', heading: 'Your moat widens every week.', paras: [
      'Every week your AI workforce runs, CORTEX builds deeper context and the Learning System tunes better strategies.',
      'Your competitors are still onboarding their Q2 hires. You’re on loop twelve of a self-optimizing machine that knows your market better than any analyst.',
    ] },
    { type: 'callout', text: 'The gap doesn’t close. It widens.' },
    { type: 'cta', title: 'Your competitor just posted 5 job listings. You’re about to deploy 5 AI Employees. Who wins?', primary: 'Get Started Free' },
  ],
  subPages: [
    { slug: 'day-in-the-life', nav: 'Day in the Life', title: 'A day in an AI-native startup.', desc: 'An hour-by-hour walkthrough.', eyebrow: 'For Startups · Day in the Life',
      lead: 'One day. Hour by hour. You did none of it.', blocks: [
        { type: 'timeline', items: [
          { num: '06:00', title: 'Before you wake', body: 'The Growth arc ran overnight enrichment: 500 companies researched, 480 passed ICP, 1,200 decision-makers found, personalized drafts queued.' },
          { num: '08:00', title: 'Your morning', body: 'The daily digest is in your inbox: 42 qualified leads, 3 deals advanced, 18 tickets resolved, cash-flow positive. One action: approve the Henderson proposal. It takes 8 seconds.' },
          { num: '09:00', title: 'Outbound blitz', body: '200 emails out, 50 LinkedIn requests, 30 live voice calls. By 10am, four callbacks — the Deal Closer qualifies two and books a demo.' },
          { num: '12:00', title: 'Midday operations', body: 'Twelve tickets resolved while you build product. One needed a sandboxed debug session — wrong auth header, fixed in 3 minutes. A $4,200 invoice nudged and paid within the hour.' },
          { num: '15:00', title: 'Afternoon strategy', body: 'A 22-minute call with a warm lead is summarized; a custom proposal with their integration architecture auto-generates and routes to you for approval.' },
          { num: '18:00', title: 'Evening wind-down', body: 'A 4-minute KPI briefing: open rate down to 34%; the subject-line strategy is adjusted automatically. You review over dinner. No action needed.' },
          { num: '23:00', title: 'While you sleep', body: 'A license renewal 14 days out is found and pre-filled. Three applicants for your dev role are screened; one scores 0.92 and a voice interview is booked.' },
          { num: '06:00', title: 'The next day', body: 'Loop two begins. Everything that happened yesterday made today smarter. Your advantage just widened by another 24 hours.' },
        ] },
        { type: 'cta', title: 'This was one day. Imagine twelve months.', primary: 'Start Your First Day' },
      ] },
    { slug: 'vs', nav: 'Battle Cards', title: 'How HireBuddha stacks up.', desc: 'Head-to-head comparisons.', eyebrow: 'For Startups · Battle Cards',
      lead: 'Against hiring, outsourcing, and point tools.', blocks: [
        { type: 'table', heading: 'vs. hiring humans', columns: ['Dimension', 'Hiring a team', 'HireBuddha'], highlight: 2, rows: [
          ['Time to operational', '90–120 days', '10 minutes'],
          ['Monthly cost (5-person equivalent)', '$25K–$50K', '$200–$500'],
          ['Scales instantly', 'No — months per hire', 'Yes — clone in 10 seconds'],
          ['Works 24/7', 'No', 'Yes'],
          ['Context retention', 'Lost on attrition', 'Permanent (CORTEX)'],
          ['Self-optimizes', 'No — needs management', 'Yes — Learning System'],
          ['Risk of a bad hire', '~30% don’t work out', 'Reconfigure in minutes'],
        ] },
        { type: 'table', heading: 'vs. outsourcing / BPOs', columns: ['Dimension', 'BPO / Outsourcing', 'HireBuddha'], highlight: 2, rows: [
          ['Quality control', 'Variable — vendor-dependent', 'Deterministic — configurable guardrails'],
          ['Customization', 'Generic playbooks', 'Your knowledge base, your rules'],
          ['Data security', 'Third-party risk', 'Your tenant, your encryption, your audit trail'],
          ['Scaling', 'Slow — contract negotiation', 'Instant — clone agents'],
          ['Cost transparency', 'Retainers, hidden fees', 'Per-execution, micro-cent tracking'],
        ] },
        { type: 'table', heading: 'vs. point solutions', columns: ['Need', 'Point solution', 'HireBuddha'], highlight: 2, rows: [
          ['Outbound sales', 'Apollo + Outreach + SDR', 'Growth arc'],
          ['Customer support', 'Zendesk + Intercom + team', 'Engage arc'],
          ['Invoicing', 'QuickBooks + manual follow-up', 'Sustain arc'],
          ['Contract review', 'Outside counsel ($300/hr)', 'Sustain arc'],
          ['Recruiting', 'LinkedIn Recruiter + ATS + recruiter', 'Engage arc'],
          ['Total monthly cost', '$5K–$15K tools + $30K+ staff', '$200–$500 all-in'],
        ] },
        { type: 'cta', title: 'Stop paying for 6 tools. Start with 1 platform.', primary: 'Get Started Free' },
      ] },
    { slug: 'launchpad', nav: 'Launchpad', title: 'Your AI workforce in an afternoon.', desc: 'Deploy your first three arcs in one sitting.', eyebrow: 'For Startups · Launchpad',
      lead: 'Three arcs. Three hours. Zero headcount.', blocks: [
        { type: 'timeline', eyebrow: 'The starter pack', heading: 'Three arcs, one afternoon.', items: [
          { num: '01', title: 'Growth & Acquisition · 60 min', body: 'Design your Outbound Prospector, upload a target list, connect email, set HITL to approve the first 10 emails, launch.' },
          { num: '02', title: 'Customer Success & Support · 45 min', body: 'Design your Care Orchestrator, upload product docs, connect a channel, set tone, approve all responses for the first 24 hours, launch.' },
          { num: '03', title: 'Learning System · 30 min', body: 'Connect it to the first two, choose the KPIs to harvest, set a briefing schedule. Your first briefing arrives tomorrow.' },
        ] },
        { type: 'timeline', heading: 'What happens after launch.', items: [
          { num: 'Wk 1', title: 'Monitor & tune', body: 'Watch performance and reduce HITL gates as confidence grows.' },
          { num: 'Wk 2', title: 'Add finance', body: 'Deploy the Fiscal Optimizer for invoicing and reconciliation.' },
          { num: 'Wk 3', title: 'Add compliance', body: 'Deploy contract review and licensing.' },
          { num: 'Wk 4', title: 'Full stack', body: 'Everything operational. The Learning System is generating compound insight.' },
        ] },
        { type: 'cta', title: 'Launch your first arc — free.', primary: 'Get Started Free' },
      ] },
  ],
};

const GROWING: ICP = {
  slug: 'growing-companies', icpSlug: 'medium-enterprise', nav: 'For Growing Companies', name: 'Growing Companies', concept: 'The Ops System That Runs Itself',
  eyebrow: 'For Growing Companies · The Ops System That Runs Itself',
  headline: 'Your business has outgrown your team. It hasn’t outgrown us.',
  lead: 'You’re scaling revenue, but operations scale linearly — more people, more management, thinner margins. Sheel replaces departmental headcount with one autonomous loop. Not next quarter. Today.',
  ctaPrimary: 'Build Your Ops Case', ctaPrimaryHref: '/for/growing-companies/roi', pragyaCta: 'Map my operations with Pragya',
  heroVisual: 'ring',
  blocks: [
    { type: 'prose', eyebrow: 'The scaling paradox', heading: 'Why growth feels like drowning.', paras: [
      'Revenue grew 40% last year. Headcount grew 35%. Productivity? Flat.',
      'Every new client means more tickets, more invoices, more compliance reviews — and more hires to manage the hires. You’re running faster just to stay in place. That’s the mid-market trap.',
    ] },
    { type: 'stats', heading: 'The hidden cost of operational scaling.', items: [
      { num: '1.5×', label: 'salary to replace a mid-level employee' },
      { num: '90 days', label: 'to productivity for a new hire' },
      { num: '18%', label: 'average mid-market attrition per year' },
    ] },
    { type: 'cards', eyebrow: 'The redesign', heading: 'Every department becomes an arc.', lead: 'One autonomous loop handles the work that currently needs six department heads and thirty operational staff.', cols: 3, items: [
      { kicker: 'Arc I', title: 'Perceive', body: 'Market research, BI, monitoring, and lead intake.', href: '/solutions/perceive', cta: 'Explore arc' },
      { kicker: 'Arc II', title: 'Engage', body: 'Marketing, sales, support, success, and recruiting.', href: '/solutions/engage', cta: 'Explore arc' },
      { kicker: 'Arc III', title: 'Orchestrate', body: 'Management, strategy, planning, PM, and dispatch.', href: '/solutions/orchestrate', cta: 'Explore arc' },
      { kicker: 'Arc IV', title: 'Fulfill', body: 'Delivery, production, QA, logistics, and provisioning.', href: '/solutions/fulfill', cta: 'Explore arc' },
      { kicker: 'Arc V', title: 'Sustain', body: 'Finance, legal, compliance, HR, IT, and procurement.', href: '/solutions/sustain', cta: 'Explore arc' },
      { kicker: 'Arc VI', title: 'Evolve', body: 'Strategy, analysts, R&D, and executive reporting.', href: '/solutions/evolve', cta: 'Explore arc' },
    ] },
    { type: 'cards', eyebrow: 'The control you’ve been missing', heading: 'More autonomy. More control. Not less.', cols: 3, items: [
      { title: 'Every action, audited', body: 'Every execution traced — token counts, cost, latency, decision logs. Exportable and queryable.', href: '/for/growing-companies/control', cta: 'See governance' },
      { title: 'High-stakes, gated', body: 'HITL checkpoints pause before contract signatures, large payouts, and sensitive comms.', href: '/for/growing-companies/control', cta: 'See governance' },
      { title: 'Budgets, enforced', body: 'Credit circuit breakers halt execution on a breach. You set the budget; the system enforces it.', href: '/for/growing-companies/control', cta: 'See governance' },
    ] },
    { type: 'timeline', eyebrow: 'Compound intelligence', heading: 'The longer it runs, the smarter it gets.', items: [
      { num: 'Week 1', title: 'Follows instructions', body: 'Basic execution. Accurate but generic. Learning your documents.' },
      { num: 'Week 4', title: 'Recognizes patterns', body: 'Episodic memory captures returning contacts, common issues, and seasonal trends.' },
      { num: 'Week 8', title: 'Anticipates', body: 'CORTEX builds deep domain context. Agents pre-draft and flag anomalies before you ask.' },
      { num: 'Week 12', title: 'Self-optimizes', body: 'The engine tunes agent charters from cross-process KPIs. Your operational IQ climbs while headcount stays flat.' },
    ] },
    { type: 'cta', title: 'Your operations are ready to scale — without the headcount.', primary: 'Get Started Free' },
  ],
  subPages: [
    { slug: 'ops-playbook', nav: 'Ops Playbook', title: 'The AI operations playbook.', desc: 'Which arcs to deploy first, in what order.', eyebrow: 'For Growing Companies · Ops Playbook',
      lead: 'A prescriptive deployment sequence — which arcs to start with, how to configure governance, and how to scale.', blocks: [
        { type: 'timeline', items: [
          { num: 'Phase 1', title: 'Quick win · Customer Success', body: 'Highest volume of repetitive work, immediate measurable impact, lowest risk. Full HITL on outbound. Expect 60–80% of Tier-1 tickets resolved autonomously.' },
          { num: 'Phase 2', title: 'Revenue engine · Growth', body: 'Directly impacts pipeline and is easy to A/B test against your team. HITL on proposals over a threshold; auto-approve low-value outreach.' },
          { num: 'Phase 3', title: 'Financial backbone · Fiscal', body: 'Automates the most time-consuming back-office work. Full HITL on payouts; auto-approve reconciliation and reporting.' },
          { num: 'Phase 4', title: 'Full stack', body: 'Deploy the remaining arcs by priority. The Learning System goes last — it harvests data from everything before it.' },
          { num: 'Phase 5', title: 'Optimization', body: 'The first cross-process executive briefing. Charters auto-tune from KPI analysis. Continuous compound improvement.' },
        ] },
        { type: 'prose', heading: 'Run AI alongside your team.', paras: [
          'Each arc runs in parallel with your existing departments — no rip-and-replace. A/B test AI against humans on the same tasks and let the numbers decide.',
          'Roles evolve from execution to supervision and strategy. The org chart doesn’t shrink so much as move up the value stack.',
        ] },
        { type: 'cta', title: 'Start phase 1 with Pragya.', primary: 'Get Started Free' },
      ] },
    { slug: 'control', nav: 'Control & Governance', title: 'More control. Less overhead.', desc: 'The governance framework for ops leaders.', eyebrow: 'For Growing Companies · Control & Governance',
      lead: 'Every execution is governed, gated, and auditable. You control the budget, the boundaries, and the escalation path.', blocks: [
        { type: 'cards', eyebrow: 'The governance stack', heading: 'Six layers of control.', cols: 3, items: [
          { title: 'Credit circuit breaker', body: 'Automatic execution halt if cost exceeds budget.' },
          { title: 'HITL checkpoints', body: 'Pause before high-stakes actions — configurable per agent and action.' },
          { title: 'Pre-critic audit', body: 'The AI audits its own decision before execution; circuit-breaks after 3 blocks.' },
          { title: 'Post-critic supervision', body: 'A supervisor checks alignment and logs usage after execution.' },
          { title: 'Audit trail', body: 'Every run traced with cost, tokens, latency, and decision logs.' },
          { title: 'Suspension middleware', body: 'Instant API lockout at the infrastructure level.' },
        ] },
        { type: 'cards', heading: 'HITL in practice.', cols: 2, items: [
          { title: 'Before a high-value email', body: 'Pause before sending to any prospect valued over $50K.' },
          { title: 'Before a payout', body: 'Pause before executing any disbursement over $1,000.' },
          { title: 'Before a signature', body: 'Pause before routing any contract for e-signature.' },
          { title: 'On a sentiment drop', body: 'Pause when a customer sentiment score falls below 0.3.' },
        ] },
        { type: 'cta', title: 'Build your governance summary with Pragya.', primary: 'Talk to Pragya' },
      ] },
    { slug: 'roi', nav: 'ROI Builder', title: 'Build your ops case.', desc: 'An interactive ROI analysis for your leadership team.', eyebrow: 'For Growing Companies · ROI',
      lead: 'Move the sliders. See the delta. Take it to leadership.', blocks: [
        { type: 'tool', tool: 'roi' },
        { type: 'prose', heading: 'What your case includes.', paras: [
          'Your current annual operational cost, your projected HireBuddha cost, the annual savings, the ROI percentage, and a payback period that’s typically under a month.',
          'Plus a five-year projection that factors in compound intelligence — because the system you run in year two is better than the one you run today.',
        ] },
        { type: 'cta', title: 'Have Pragya build the full case.', sub: 'Tell her your team size and she’ll generate a board-ready business case.', primary: 'Talk to Pragya' },
      ] },
  ],
};

const ENTERPRISE: ICP = {
  slug: 'enterprise', icpSlug: 'enterprise', nav: 'For Enterprise', name: 'Enterprise', concept: 'The Transformation Layer',
  eyebrow: 'For Enterprise · The Transformation Layer',
  headline: 'Don’t rip and replace. Deploy and transform.',
  lead: 'HireBuddha deploys Sheel alongside your existing infrastructure. Start with a single arc, prove ROI in 90 days, expand at your pace, reverse at any point.',
  ctaPrimary: 'Schedule an Architecture Review', ctaPrimaryHref: '/contact', pragyaCta: 'Ask Pragya a technical question',
  heroVisual: 'center',
  blocks: [
    { type: 'prose', eyebrow: 'You’ve been here before', heading: 'We know you’re skeptical. You should be.', paras: [
      'Your company has spent millions on digital transformation — RPA that automates data entry but not decisions, chatbots that break on anything complex, integrations that took 18 months and still need workarounds.',
      'The problem was never the technology. You were automating the org chart. You should have been replacing it.',
    ] },
    { type: 'table', columns: ['The old transformation', 'HireBuddha'], highlight: 1, rows: [
      ['Year 1 — buy the platform', 'Week 1 — deploy'],
      ['Year 2 — customize', 'Week 4 — measure'],
      ['Year 3 — realize it doesn’t scale', 'Week 12 — expand'],
      ['Year 4 — start over', 'Compounding from here'],
    ] },
    { type: 'cards', eyebrow: 'The third path', heading: 'Not big-bang. Not pilot purgatory.', cols: 3, items: [
      { kicker: 'Path 1', title: 'Go big', body: 'Multi-year, $10M+ project. High risk, organizational disruption. If it fails, careers end.' },
      { kicker: 'Path 2', title: 'Go small', body: 'A pilot that becomes innovation theater. Never reaches production, never moves the bottom line.' },
      { kicker: 'Path 3', title: 'Deploy & expand', body: 'Start with one arc, deploy in a week, run it beside your team, measure the delta — then expand. Reversible at every step.' },
    ] },
    { type: 'table', eyebrow: 'Enterprise-grade by design', heading: 'Security and governance — built in, not bolted on.', columns: ['Capability', 'Detail'], rows: [
      ['Encryption', 'AES-256-GCM. Keys and credentials encrypted at rest; master key stored outside the database.'],
      ['Authentication', 'Stateless JWT. 15-minute access tokens; 7-day HTTP-only refresh cookies.'],
      ['Multi-tenant isolation', '4-level hierarchy. Company-scoped queries on every operation. Full data segregation.'],
      ['HITL governance', 'Configurable checkpoints per agent, action, and loop. Slack/Teams approval workflows.'],
      ['Credit circuit breakers', 'Automatic halt on budget breach. Per-step cost tracking.'],
      ['Audit trail', 'Every run traced: tokens, cost, latency, decisions. Exportable and queryable.'],
      ['Suspension controls', 'Instant API lockout via middleware. Infrastructure-level kill switch.'],
    ] },
    { type: 'pills', items: ['AES-256-GCM Encryption', 'JWT Authentication', 'Multi-Tenant Isolation', 'Human-in-the-Loop Governance', 'Credit Circuit Breakers', 'Full Audit Trail'] },
    { type: 'cards', eyebrow: 'The integration doctrine', heading: 'We don’t replace your stack. We orchestrate it.', lead: 'Your AI workforce doesn’t live beside your infrastructure. It lives inside it.', cols: 4, items: [
      { kicker: 'CRM & Sales', title: 'Salesforce · HubSpot', body: 'API tools and webhooks.', href: '/for/enterprise/integrations', cta: 'See integrations' },
      { kicker: 'Communication', title: 'Slack · Teams', body: 'Rich Communication Broker — also handles HITL approvals.', href: '/for/enterprise/integrations', cta: 'See integrations' },
      { kicker: 'Finance', title: 'Stripe · Plaid · Wise', body: 'Payout rails and bank-feed sync.', href: '/for/enterprise/integrations', cta: 'See integrations' },
      { kicker: 'Legal & HR', title: 'DocuSign · Gusto', body: 'E-signature and HRIS accessors.', href: '/for/enterprise/integrations', cta: 'See integrations' },
    ] },
    { type: 'timeline', eyebrow: '90 days', heading: 'From pilot to platform — without the risk.', items: [
      { num: 'Wk 1–2', title: 'Foundation', body: 'Deploy one arc — Customer Success recommended — under full HITL.' },
      { num: 'Wk 3–6', title: 'Calibration', body: 'Measure the delta, tune, and reduce HITL as confidence grows.' },
      { num: 'Wk 7–10', title: 'Expansion', body: 'Deploy a second arc — Growth — and A/B test against your team.' },
      { num: 'Wk 11–12', title: 'Evolve', body: 'Activate the Learning System and present the first cross-process briefing.' },
      { num: 'Wk 13+', title: 'Full loop', body: 'Expand arc by arc. Each deployment compounds intelligence. Reversible throughout.' },
    ] },
    { type: 'cta', title: 'Ready to evaluate?', sub: 'Schedule an architecture review, or have Pragya answer your technical questions.', primary: 'Schedule a Review', primaryHref: '/contact' },
  ],
  subPages: [
    { slug: 'architecture', nav: 'Architecture & Security', title: 'Under the hood.', desc: 'The deep technical evaluation page.', eyebrow: 'For Enterprise · Architecture & Security',
      lead: 'Everything your technical team needs to evaluate HireBuddha. No sales pitch — just engineering.', blocks: [
        { type: 'cards', eyebrow: 'System architecture', heading: 'The topology.', cols: 3, items: [
          { title: 'Apache · reverse proxy', body: 'SSL termination and request routing at the edge.' },
          { title: 'React frontend', body: 'The generative, adaptive UI assembled per user and task.' },
          { title: 'FastAPI app server', body: 'The orchestration core. Async throughout.' },
          { title: 'Unified AI Gateway', body: 'Capability requests and WebSocket streaming to the engine.' },
          { title: 'Voice server', body: 'Realtime audio for OmniBuddha, Gemini Live, and ChatGPT Realtime.' },
          { title: 'PostgreSQL + pgvector', body: 'Relational state plus 768-dim semantic search.' },
          { title: 'Redis + Arq', body: 'Rate limiting and the async job queue for child dispatch.' },
        ] },
        { type: 'cards', eyebrow: 'The kernel', heading: 'This isn’t a wrapper.', cols: 2, items: [
          { title: 'The agent kernel', body: 'A single hierarchical_entities table holds all five tiers — Loop, Process, Agent, Skill, Action — each with identity, logic gate, planning, capabilities, governance, I/O contract, and per-entity router prefs.' },
          { title: 'The AgentLoop', body: 'An 8-stage control flow — Perceive, Strategize, Pre-Critic, Act, Observe, Post-Critic, Reflect, Decide — with a circuit breaker after 3 consecutive pre-critic blocks and cost tracking per step.' },
          { title: 'Async child dispatch', body: 'Parent state is serialized to a snapshot, children run on the queue, and a resume worker rehydrates the parent. Cost aggregates across the whole hierarchy.' },
          { title: 'Memory architecture', body: 'Working, episodic, semantic (pgvector, cosine > 0.70), and CORTEX tree memory with auto-checkpointing at 8,000 tokens and viewport slicing.' },
        ] },
        { type: 'cards', eyebrow: 'Intelligence & governance', heading: 'The router wins the AI/ML review.', cols: 2, items: [
          { title: 'Multi-model engine', body: 'No agent calls a model SDK directly. It requests a capability and the Intelligent Router binds it — BabyBuddha plus Claude Opus, ChatGPT, Gemini, GLM, Qwen, and Mistral.' },
          { title: 'Model & data governance', body: 'Per-tenant allow-lists and data-residency filters decide which providers are eligible before scoring. Pin a model where required; full attribution and audit of every model that touched data.' },
          { title: 'Meta Agent & self-evolving code', body: 'Tool synthesis and self-healing run sandboxed, test-gated, versioned, and rollback-safe, with optional HITL on promotion. Production is never edited in place.' },
          { title: 'The Learning System', body: 'Harvests reflections, KPIs, critic verdicts, router performance, and HITL feedback, then runs a per-tenant optimizer that tunes charters, routing, tools, and the schema.' },
        ] },
        { type: 'table', eyebrow: 'Security deep-dive', heading: 'Implementation, not adjectives.', columns: ['Control', 'Implementation'], rows: [
          ['Encryption', 'AES-256-GCM with nonce-prepended ciphertext; master key outside the DB.'],
          ['Authentication', 'JWT access tokens (15 min) + HTTP-only refresh cookies (7 days).'],
          ['Suspension', 'ASGI middleware that locks suspended tenants at the API.'],
          ['Key Vault', 'Encrypted storage and retrieval of API keys and OAuth tokens.'],
          ['Rate limiting', 'Redis-based limits across the gateway.'],
        ] },
        { type: 'cta', title: 'Send it to your skeptics.', sub: 'Schedule a technical deep-dive with our architecture team.', primary: 'Schedule a Review', primaryHref: '/contact' },
      ] },
    { slug: 'integrations', nav: 'Integrations', title: 'Connect to everything you already use.', desc: 'The full integration catalog.', eyebrow: 'For Enterprise · Integration Ecosystem',
      lead: 'HireBuddha orchestrates your existing infrastructure through 20+ built-in integrations and a custom tool builder.', blocks: [
        { type: 'cards', heading: 'The integration catalog.', cols: 3, items: [
          { kicker: 'Communication', title: 'Slack · Teams · Email', body: 'IMAP/SMTP, WhatsApp Business, and Twilio.' },
          { kicker: 'CRM & Sales', title: 'Salesforce · HubSpot', body: 'Via API tools and webhooks.' },
          { kicker: 'Engineering', title: 'Jira · Linear · GitHub', body: 'Helpdesk routing and the Terminal tool.' },
          { kicker: 'Finance & Payments', title: 'Stripe · Plaid · Wise', body: 'Plus Yodlee, PayPal, and Razorpay.' },
          { kicker: 'Legal & Compliance', title: 'DocuSign · Persona', body: 'Plus Dropbox Sign and Middesk.' },
          { kicker: 'HR & People', title: 'Gusto · Rippling', body: 'Plus BambooHR via the HRIS accessor.' },
          { kicker: 'Calendar', title: 'Google · Outlook', body: 'Via Microsoft Graph and the Calendar Matrix.' },
          { kicker: 'Sales Intelligence', title: 'Apollo · Clearbit', body: 'Plus ZoomInfo for enrichment.' },
          { kicker: 'Telephony', title: 'Twilio · Exotel', body: 'Plus Smartflo (Tata Tele).' },
          { kicker: 'AI Models', title: 'BabyBuddha + fleet', body: 'Claude, ChatGPT, Gemini, GLM, Qwen, Mistral — allow-list governed.' },
          { kicker: 'Realtime Voice', title: 'OmniBuddha + Live', body: 'Gemini Live and ChatGPT Realtime.' },
          { kicker: 'Generative Media', title: 'Veo · Kling · Imagen', body: 'Image and video generation, router-brokered.' },
        ] },
        { type: 'prose', heading: 'Don’t see your system?', paras: [
          'Tell Pragya the system you want to connect to and the Meta Agent synthesizes a brand-new tool — sandboxed, test-gated, versioned, and rollback-safe.',
          'Custom integrations are first-class. Your stack defines the platform, not the other way around.',
        ] },
        { type: 'cta', title: 'Map your stack with Pragya.', sub: 'She can generate an integration compatibility report for your full environment.', primary: 'Schedule a Review', primaryHref: '/contact' },
      ] },
    { slug: 'deployment', nav: '90-Day Deployment', title: 'From evaluation to production in 90 days.', desc: 'The phase-by-phase transformation roadmap.', eyebrow: 'For Enterprise · 90-Day Deployment',
      lead: 'Measurable milestones, governance recommendations, and rollback procedures at every step.', blocks: [
        { type: 'timeline', items: [
          { num: 'Phase 1', title: 'Foundation · Week 1–2', body: 'Deploy the Customer Success arc under full HITL, running in parallel with your team. Every response reviewed before sending. Rollback: disable the arc; all traffic returns to humans with zero data loss.' },
          { num: 'Phase 2', title: 'Calibration · Week 3–6', body: 'Tune personality, expand the knowledge base, and reduce HITL from “approve all” to “approve escalations.” Gate to Phase 3: resolution accuracy > 85% and CSAT within 5% of baseline.' },
          { num: 'Phase 3', title: 'Expansion · Week 7–10', body: 'Deploy the Growth arc and A/B test against your SDR team. HITL on proposals over a threshold; auto-approve standard outreach.' },
          { num: 'Phase 4', title: 'Evolve · Week 11–12', body: 'Activate the Learning System across both arcs and deliver the first executive briefing — metrics, quantified savings, and a Week-12-vs-Week-1 demonstration.' },
          { num: 'Phase 5', title: 'Full loop · Week 13+', body: 'Expand arc by arc — Sustain, then Fulfill — each following Activate → HITL → Calibrate → Measure → Expand. CORTEX compounds across all arcs.' },
        ] },
        { type: 'table', heading: 'Total program summary.', columns: ['Metric', 'Value'], rows: [
          ['Total elapsed time', '90 days (first two arcs + the Learning System)'],
          ['Total headcount added', 'Zero'],
          ['Reversible commitments', 'All, at every phase'],
          ['Expected cost reduction', '30–60% on automated functions'],
          ['First executive briefing', 'Week 12'],
          ['Full platform deployment', '6–9 months'],
        ] },
        { type: 'cta', title: 'Put it in the board deck.', sub: 'Schedule a deployment planning session with our team.', primary: 'Schedule a Review', primaryHref: '/contact' },
      ] },
    { slug: 'business-case', nav: 'Business Case', title: 'The board presentation, pre-built.', desc: 'A customizable enterprise business case.', eyebrow: 'For Enterprise · The Business Case',
      lead: 'ROI projections, deployment roadmap, security summary, and risk mitigation — ready for your next leadership meeting.', blocks: [
        { type: 'cards', heading: 'What’s in the package.', cols: 4, items: [
          { title: 'Executive summary', body: 'A one-page overview of the value proposition for enterprise.' },
          { title: 'Problem statement', body: 'Transformation fatigue, scaling challenges, and adoption risk.' },
          { title: 'Solution architecture', body: 'The loop-based, incremental deployment model.' },
          { title: 'Deployment roadmap', body: 'The 90-day phase plan with milestones.' },
          { title: 'ROI model', body: 'Customizable inputs, net savings, and a 5-year projection.' },
          { title: 'Security summary', body: 'Encryption, authentication, HITL, and audit trails.' },
          { title: 'Risk matrix', body: 'Every risk with its mitigation and rollback procedure.' },
          { title: 'Competitive comparison', body: 'Versus BPO, RPA platforms, and point solutions.' },
        ] },
        { type: 'tool', tool: 'roi', eyebrow: 'ROI modeler', heading: 'Model the savings.' },
        { type: 'cta', title: 'Have Pragya build your custom case.', sub: 'Tell her about your departments and headcount, and she’ll generate a first-draft business case.', primary: 'Schedule a Review', primaryHref: '/contact' },
      ] },
  ],
};

export const ICPS: ICP[] = [SOLO, STARTUPS, GROWING, ENTERPRISE];
export const ICP_SLUGS = ICPS.map((i) => i.slug);
export function findICP(slug: string) { return ICPS.find((i) => i.slug === slug); }
