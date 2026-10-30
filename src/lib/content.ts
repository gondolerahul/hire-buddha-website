/* ------------------------------------------------------------------ USE CASES */
export type UseCase = {
  slug: string; title: string; tag: string; arc: string; summary: string;
  problem: string; steps: { title: string; body: string }[]; outcomes: string[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: 'outbound-sales', title: 'Automate your outbound sales pipeline', tag: 'Engage · Voice · Email · WhatsApp', arc: 'Engage',
    summary: 'From cold lead to closed deal — prospecting, qualifying, calling, proposing, and signing — without a single SDR on payroll.',
    problem: 'Outbound is expensive, inconsistent, and slow to scale. SDRs ramp for months, follow up unevenly, and walk out with the context when they leave.',
    steps: [
      { title: 'Source & enrich', body: 'Perceive captures and enriches target accounts against your ICP, scoring them by fit and intent.' },
      { title: 'Reach out', body: 'Engage personalizes first-touch across voice, email, and WhatsApp — at a cadence no team could sustain.' },
      { title: 'Qualify & book', body: 'Conversational agents qualify, handle objections, and book demos straight onto your calendar.' },
      { title: 'Propose & close', body: 'The Deal Closer generates proposals, negotiates terms, and routes contracts for e-signature.' },
    ],
    outcomes: ['Every lead worked within minutes, 24/7', 'Consistent messaging that never has an off day', 'Pennies per touch instead of dollars per call'],
  },
  {
    slug: 'customer-support', title: 'Deploy 24/7 omnichannel customer support', tag: 'Engage · Voice · Chat · Email', arc: 'Engage',
    summary: 'Omnichannel care that remembers every conversation, resolves issues in seconds, and escalates only what it can’t handle — with empathy, in any language.',
    problem: 'Support is a cost center that scales linearly with volume. Quality drops at 2am, context is lost between channels, and customers repeat themselves.',
    steps: [
      { title: 'Meet them anywhere', body: 'One agent answers across voice, chat, and email, recognizing the customer and recalling history.' },
      { title: 'Resolve in seconds', body: 'It searches your knowledge base, takes action through bound tools, and closes the loop.' },
      { title: 'Escalate the rest', body: 'Only the genuinely complex reaches a human — with a full summary attached.' },
      { title: 'Remember', body: 'Every exchange is written to memory, so next time starts where last time ended.' },
    ],
    outcomes: ['Instant first response, any hour, any language', 'Resolution that improves week over week', 'Humans freed for the hard, high-value cases'],
  },
  {
    slug: 'financial-ops', title: 'Run financial reconciliation on autopilot', tag: 'Sustain · Finance · Banking', arc: 'Sustain',
    summary: 'Bank-feed sync, ledger matching, AR collections, and cash-flow forecasting — continuous, not month-end.',
    problem: 'Finance ops are batchy, manual, and always behind. Reconciliation waits for month-end; collections slip; cash visibility is a guess.',
    steps: [
      { title: 'Sync', body: 'Bank feeds and invoices flow in continuously through the integration suite.' },
      { title: 'Match', body: 'Transactions are reconciled against the ledger automatically, flagging only exceptions.' },
      { title: 'Collect', body: 'Overdue invoices are chased politely and persistently, escalating on your rules.' },
      { title: 'Forecast', body: 'Cash-flow projections update in real time — no spreadsheet archaeology.' },
    ],
    outcomes: ['Books that are always close to closed', 'Faster collections with a human touch', 'Live cash visibility instead of month-end surprises'],
  },
  {
    slug: 'voice-screening', title: 'Screen candidates with AI voice interviews', tag: 'Engage · Voice · HR', arc: 'Engage',
    summary: 'Structured first-round phone interviews that score, rank, and shortlist — in your voice, in any language, at any hour.',
    problem: 'First-round screening eats recruiter time and bottlenecks hiring. Scheduling is painful and scoring is subjective.',
    steps: [
      { title: 'Invite', body: 'Candidates are reached and scheduled automatically across channels.' },
      { title: 'Interview', body: 'A structured voice agent runs a consistent first round, adapting follow-ups to answers.' },
      { title: 'Score', body: 'Each interview is scored against your rubric, with the transcript attached.' },
      { title: 'Shortlist', body: 'Ranked candidates land in your pipeline, ready for a human second round.' },
    ],
    outcomes: ['Every applicant screened within hours', 'Consistent, rubric-based scoring', 'Recruiters focused on the shortlist, not the funnel'],
  },
  {
    slug: 'contract-review', title: 'Automate contract review and compliance', tag: 'Sustain · Legal · Compliance', arc: 'Sustain',
    summary: 'Read every clause, flag every risk, and route for signature — with the reasoning visible at every step.',
    problem: 'Legal review is a bottleneck and a cost. Contracts pile up, risk clauses slip through, and turnaround takes days.',
    steps: [
      { title: 'Read', body: 'A Chain-of-Thought specialist reads the full agreement, clause by clause.' },
      { title: 'Assess', body: 'It evaluates each clause against your legal playbook and flags risks with annotations.' },
      { title: 'Redline', body: 'It generates a redline and a plain-English summary for human review.' },
      { title: 'Route', body: 'Approved contracts are routed for e-signature, with HITL gates where you want them.' },
    ],
    outcomes: ['Hours of review compressed to minutes', 'Consistent risk flagging against your playbook', 'A human in the loop exactly where it matters'],
  },
  {
    slug: 'executive-briefings', title: 'Generate weekly executive briefings', tag: 'Evolve · BI · Reporting', arc: 'Evolve',
    summary: 'A clear, written briefing every week — what changed, what it means, and what to do — assembled from across the loop.',
    problem: 'Leadership reporting is manual, late, and inconsistent. By the time the deck is built, the numbers have moved.',
    steps: [
      { title: 'Gather', body: 'Evolve harvests KPIs, outcomes, and anomalies from every arc of the loop.' },
      { title: 'Analyze', body: 'It identifies what drove the change and where value is leaking.' },
      { title: 'Write', body: 'It composes a readable narrative — not a wall of charts — with clear recommendations.' },
      { title: 'Deliver', body: 'The briefing lands in your inbox or chat every week, on schedule.' },
    ],
    outcomes: ['A reliable weekly pulse on the business', 'Insight, not just dashboards', 'Recommendations grounded in real outcomes'],
  },
  {
    slug: 'meta-agent-build', title: 'Describe a goal — watch the Meta Agent build the employee', tag: 'Orchestrate · Meta Agent', arc: 'Orchestrate',
    summary: 'Tell Pragya the outcome you want and watch the platform design, test, and publish the AI Employee that delivers it.',
    problem: 'Building automation usually means engineers, integrations, and weeks of work. Most teams never get past the backlog.',
    steps: [
      { title: 'Describe', body: '“Someone to chase overdue invoices in INR and escalate after 14 days.” That’s the whole brief.' },
      { title: 'Build', body: 'The Meta Agent decomposes the goal, picks the right tier, writes the charter, and binds tools.' },
      { title: 'Test', body: 'It simulates the candidate against representative inputs and critiques itself until it passes.' },
      { title: 'Publish', body: 'A finished, versioned AI Employee lands in your workspace — fully editable in the Architect.' },
    ],
    outcomes: ['Automation built from a sentence, not a backlog', 'No engineers required to start', 'Everything editable once it’s built'],
  },
];

/* --------------------------------------------------------------------- STORIES */
export type Story = {
  slug: string; company: string; industry: string; tag: string; summary: string;
  before: string; deployment: string; after: string[]; quote: { text: string; who: string };
};

export const STORIES: Story[] = [
  { slug: 'durwankur-ai-labs', company: 'Durwankur AI Labs', industry: 'Legal · AI-native firm', tag: 'Whole-company automation',
    summary: 'India’s first AI-native legal firm runs its entire operation on HireBuddha — and built a SaaS product for lawyers on the same platform.',
    before: 'A new legal venture with the ambition to run lean and the engineering taste to demand more than off-the-shelf tooling.',
    deployment: 'They automated every business function — marketing, sales, support, HR, finance, legal, and operations — and used the Meta Agent to build specialized legal AI Employees that now power their client-facing SaaS.',
    after: ['Entire back office runs autonomously', 'Client-facing product built by the platform, not engineers', 'A genuinely AI-native organization'],
    quote: { text: 'We didn’t automate a department. We automated the company — and built our product on the same agents.', who: 'Durwankur AI Labs · Illustrative scenario' } },
  { slug: 'gochillao', company: 'GoChillao', industry: 'B2B corporate gifting', tag: 'Multilingual voice',
    summary: 'Deployed multilingual voice agents across marketing, sales, and customer success — live in a single afternoon.',
    before: 'A fast-moving gifting platform serving corporate clients across languages, with a team too small to staff every channel.',
    deployment: 'Engage agents took over first-touch marketing, qualification, and post-sale success across voice and messaging, in multiple languages.',
    after: ['Coverage across every channel and language', 'Sales and success automated together', 'Stood up in an afternoon'],
    quote: { text: 'Our customers get answered instantly, in their language, at any hour.', who: 'GoChillao · Illustrative scenario' } },
  { slug: 'dnr-studios', company: 'DnR Studios', industry: 'Game development', tag: 'Everything but the games',
    summary: 'Automated every business function except the one that makes their games — so the team builds, and HireBuddha runs the rest.',
    before: 'A studio that wanted its people focused entirely on craft, not on the operational overhead around it.',
    deployment: 'Marketing, sales, support, HR, finance, legal, and operations all moved onto AI Employees, leaving game development to the humans.',
    after: ['Operations off the team’s plate', 'Creative focus protected', 'A lean studio that runs like a large one'],
    quote: { text: 'We make games. HireBuddha runs the company around them.', who: 'DnR Studios · Illustrative scenario' } },
  { slug: 'salasar-techno', company: 'Salasar Techno Engineering', industry: 'Engineering · Tenders', tag: 'RFPs to tenders',
    summary: 'AI Employees evaluate RFPs, develop proposals, negotiate terms, and process tenders — work that took analysts weeks.',
    before: 'A heavy, document-driven sales motion where every tender meant analyst time and slow turnaround.',
    deployment: 'Agents now read RFPs, draft proposals against the playbook, run ROI math, and process tenders end to end.',
    after: ['Tender turnaround measured in hours', 'Consistent, playbook-driven proposals', 'Analysts freed for strategy'],
    quote: { text: 'Tenders that used to take a team and a week now move in an afternoon.', who: 'Salasar Techno · Illustrative scenario' } },
  { slug: 'eva-world-tours', company: 'Eva World Tours', industry: 'Travel', tag: 'Always-on concierge',
    summary: 'An always-on travel concierge that handles enquiries, builds itineraries, and follows up — across time zones.',
    before: 'A travel business where enquiries arrived around the clock but the team could only answer during the day.',
    deployment: 'Engage agents handle enquiries and itinerary building across channels, with Sustain handling the back-office follow-through.',
    after: ['Enquiries answered at any hour', 'Itineraries drafted in minutes', 'Follow-ups that never slip'],
    quote: { text: 'Our customers plan trips at midnight and get answers at midnight.', who: 'Eva World Tours · Illustrative scenario' } },
  { slug: 'fortune-series', company: 'Fortune Series', industry: 'Media · Events', tag: 'Audience at scale',
    summary: 'Scaled audience engagement and operations without scaling headcount — across campaigns and channels.',
    before: 'A media and events brand running spiky, campaign-driven workloads that were hard to staff.',
    deployment: 'The loop absorbed campaign operations, audience engagement, and the back office, flexing with demand.',
    after: ['Campaigns run without staffing spikes', 'Engagement handled at scale', 'Operations that flex with demand'],
    quote: { text: 'We scale the campaign, not the team.', who: 'Fortune Series · Illustrative scenario' } },
  { slug: 'saraswat-bank', company: 'Saraswat Bank', industry: 'Banking · Financial services', tag: 'Governed automation',
    summary: 'Explored governed automation for customer operations with the controls a regulated institution requires.',
    before: 'A large cooperative bank with strict requirements for security, isolation, and auditability.',
    deployment: 'Customer-operations workflows were modeled with full HITL governance, model allow-lists, and complete audit trails.',
    after: ['Automation inside strict governance', 'Every model choice on the record', 'Full, exportable audit trails'],
    quote: { text: 'Automation we can prove and control — that’s the part that mattered.', who: 'Saraswat Bank · Illustrative scenario' } },
];

/* ----------------------------------------------------------------------- BLOG */
export type Post = {
  slug: string; title: string; category: string; read: number; excerpt: string;
  sections: { h?: string; body: string }[];
};

export const POSTS: Post[] = [
  { slug: 'sheel-one-loop', title: 'Sheel: why your whole company should be one loop', category: 'Architecture', read: 7,
    excerpt: 'Departments were a workaround for the limits of human specialization. Remove that constraint and the company resolves into a single loop.',
    sections: [
      { body: 'The org chart is not a law of nature. It is an adaptation to a constraint — that humans specialize, and specialists must be grouped, managed, and coordinated. Every box on the chart is a place where work stops, gets re-explained, and starts again.' },
      { h: 'Seven silos, six seams', body: 'Even a tidy company of seven functions has six seams between them — and every seam leaks context, time, and money. The handoff from marketing to sales, from sales to delivery, from delivery to finance: each is a tiny mistranslation compounded a thousand times.' },
      { h: 'One brain, one memory, one face', body: 'Sheel collapses the seven into one continuous loop of six arcs — Perceive, Engage, Orchestrate, Fulfill, Sustain, Evolve — sharing one brain, one memory, and one face. Nothing is handed off because nothing is separate. The loop simply turns.' },
      { h: 'Discipline, not chaos', body: 'Sheel means disciplined conduct. The point isn’t to remove structure — it’s to replace org structure with process structure, where the discipline lives in the loop itself rather than in the boxes around it.' },
    ] },
  { slug: 'true-cost-of-employee', title: 'How much does an employee really cost?', category: 'Economics', read: 6,
    excerpt: 'Salary is the number on the offer letter. The real number — recruiting, onboarding, overhead, attrition — is far larger, and it never stops.',
    sections: [
      { body: 'When people compare the cost of automation to the cost of an employee, they reach for salary. But salary is the smallest honest number in the conversation.' },
      { h: 'The iceberg under the salary', body: 'Add recruiting and onboarding, benefits and overhead, management time, tooling, and the months before a new hire is productive. Then add attrition — because the average tenure is short, and when someone leaves, the context leaves with them and the cycle restarts.' },
      { h: 'The number that never sleeps', body: 'An AI Employee has no recruiting cost, no onboarding ramp, no attrition, and no Monday mornings. It is billed per outcome, at micro-cent precision, and it compounds: the version you run in week twelve is better than the one you ran in week one.' },
      { h: 'The honest comparison', body: 'The right comparison isn’t salary versus subscription. It’s the fully-loaded, never-ending cost of headcount versus pennies per task — for work that improves on its own.' },
    ] },
  { slug: 'cortex-memory', title: 'CORTEX: why AI memory changes everything', category: 'Technical', read: 8,
    excerpt: 'Most AI is stateless — it forgets the moment the request ends. CORTEX is the hierarchical memory that makes week twelve smarter than week one.',
    sections: [
      { body: 'A stateless model is a brilliant amnesiac. It can reason about anything and remember nothing. That’s fine for a single answer and useless for running a business, where the value is in continuity.' },
      { h: 'Four tiers of memory', body: 'HireBuddha pairs working memory (today’s scratchpad), episodic memory (the last interactions per contact), and semantic memory (vector search over your documents) with CORTEX — a hierarchical tree of cognitive context for long-running work.' },
      { h: 'How CORTEX compounds', body: 'CORTEX auto-checkpoints as context grows and slices the right viewport into each decision, so the system carries deep history without hitting model limits. Every interaction, decision, and reflection is stored and reused.' },
      { h: 'Why it matters', body: 'Memory is what turns a tool into a colleague. It’s the difference between answering a question and knowing your business — and it’s the reason the gap between you and your competitors widens instead of closing.' },
    ] },
  { slug: 'one-router-many-brains', title: 'One router, many brains: cutting AI cost without cutting quality', category: 'Technical', read: 6,
    excerpt: 'You don’t need a frontier model for every step. The Intelligent Router runs each one on the cheapest brain that will succeed.',
    sections: [
      { body: 'The lazy way to build an AI product is to send everything to the most powerful model and pass the bill to the customer. It works, and it’s ruinously expensive.' },
      { h: 'Most steps are easy', body: 'In real workflows, the large majority of steps are routine — classify this, extract that, summarize the other. They don’t need a frontier model; a lightweight one succeeds at a fraction of the cost.' },
      { h: 'Escalate only when it counts', body: 'The Intelligent Router scores every step on complexity, modality, latency, and cost, then routes it. Routine extraction goes to a small model; multi-constraint planning or legal drafting escalates to BabyBuddha-reasoning or a frontier model.' },
      { h: 'Premium quality, real-world bills', body: 'The result is frontier-grade quality on the ten-to-twenty percent of steps that need it, and real bills that land far below a flat “always-premium” price.' },
    ] },
  { slug: 'self-improving-company', title: 'The self-improving company: how week 12 beats week 1', category: 'Strategy', read: 7,
    excerpt: 'The Learning System harvests signal from every run and folds it back in — so your workforce gets measurably better without anyone touching it.',
    sections: [
      { body: 'Software usually decays. It ships at its best and degrades as the world moves around it. A workforce built on the Learning System does the opposite — it improves with use.' },
      { h: 'Signal from everywhere', body: 'Reflections from the AgentLoop, KPI outcomes, critic verdicts, router performance, and human feedback all feed the Learning System. Every run leaves evidence.' },
      { h: 'What it tunes', body: 'It compounds CORTEX memory, rewrites agent charters from KPI evidence, sharpens model routing, optimizes slow or costly tools, and grows the schema to fit your business.' },
      { h: 'The widening gap', body: 'Your competitors are still onboarding hires. You’re running a machine that tunes itself every week. The gap doesn’t close — it widens.' },
    ] },
  { slug: 'pragya-meta-agent', title: 'Pragya: meet the AI that builds AI', category: 'Product', read: 6,
    excerpt: 'Pragya is your account manager and your first AI Employee — and behind her stands the Meta Agent that builds the rest of your workforce.',
    sections: [
      { body: 'Most AI assistants answer questions. Pragya runs a relationship. She’s the single point of contact for your whole AI workforce — and the same intelligence you talk to on this website.' },
      { h: 'The account manager', body: 'Inside the product, Pragya onboards your business, connects your software, assigns work, surfaces approvals, and reports back by meeting, phone, or chat — exactly like a human chief of staff.' },
      { h: 'The agent that builds agents', body: 'When you need a new capability, Pragya commissions the Meta Agent. It decomposes the goal, picks the right tier, writes the charter, generates any missing tools, simulates, critiques, and publishes a finished AI Employee.' },
      { h: 'The demo is the product', body: 'Everything Pragya does on this site — understanding, mapping, generating — is exactly what she does for your company every day. There is no separate demo. The thing you’re talking to is the thing you hire.' },
    ] },
  { slug: 'ai-native-organization', title: 'The AI-native organization: a first-principles guide', category: 'Strategy', read: 9,
    excerpt: 'What does a company look like when you design it for autonomous execution from the start, instead of bolting AI onto an org built for humans?',
    sections: [
      { body: 'Almost every “AI transformation” is a retrofit — automation bolted onto an organization designed for human labor. The AI-native organization starts from a different question: if outcomes ran themselves, what structure would you even need?' },
      { h: 'Outcomes, not departments', body: 'You start with the outcomes the business must produce and let the loop organize around them. There are no departments to staff, only arcs of one loop to run.' },
      { h: 'Wisdom, discipline, compassion', body: 'The shape is a triad: Pragya holds the wisdom and the relationship, Sheel supplies the discipline of the loop, and Karuna is the compassionate face turned to the world. Wise within, disciplined throughout, compassionate outward.' },
      { h: 'Where the humans go', body: 'People move up the stack — from doing the work to directing it, from execution to judgment and taste. The org chart doesn’t shrink so much as invert: humans set intent, the loop executes, and the gap to everyone else widens every week.' },
    ] },
];
