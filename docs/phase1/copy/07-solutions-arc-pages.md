# Sheel Arc Pages Copy — `/solutions/{perceive,engage,orchestrate,fulfill,sustain,evolve}`

> **Goal:** Each of Sheel's six arcs gets a dedicated page with hero, flow, agents, scenario, and CTA. Same template, six fills.
> **Word budget:** 1,500–2,000 each · **Priority:** P1
> **Shared principle:** *Self-referential concreteness.* The buyer should read the scenario and see their own work being done while they sleep.

**Reusable template (every arc):**
- Hero (headline + "Absorbs:" line + handoff badge)
- The Flow (agents → skills → actions)
- Meet the Agents
- Example Scenario (narrative, timestamped)
- Configuration & governance
- CTA: "Activate the [Arc] arc →" · "Talk to Pragya about customizing this arc →"

---

## ARC I — PERCEIVE · `/solutions/perceive`

**Principle:** *Vigilance / FOMO.* The promise is that nothing happens in your market without you knowing. The fear it relieves: "what am I missing while I'm busy?"

**Eyebrow:** Arc I of Sheel
# Your business, always watching. So you never miss a signal.

**Absorbs:** market research · business intelligence · monitoring · lead intake · demand sensing
**Hands off to:** Engage (a hot signal becomes a conversation) and Orchestrate (a trend becomes a plan).

**The Flow:** Signal Harvesters enrich raw leads and domains → Market Intel Scouts research competitors, pricing, and news → Demand Sensors flag trends and anomalies → qualified signals flow into Engage and Orchestrate.

**Meet the agents:**
- **Market Intel Scout** – researches companies, competitors, and market shifts, continuously. Tools: Web Search, Web Scraper, Enrichment & Signal Harvester.
- **Lead Enricher** – turns a raw CSV or inbound form into a full, decision-maker-mapped record. Tools: Apollo / Clearbit / ZoomInfo.
- **Demand Sensor** – watches your numbers and the market for anomalies worth acting on.

**Example scenario:**
> **9:00 AM** – A CSV of 500 target companies is uploaded.
> **By 11:00 AM** – 480 are enriched with headcount, tech stack, and decision-maker contacts; 20 are flagged as out-of-ICP.
> **Same day** – 1,200 decision-makers are mapped and queued for the Engage arc.
> **Ongoing** – the Scout flags a competitor's price cut the morning it happens, and Evolve adjusts your outbound messaging by lunch.

**Configuration:** Set research depth, ICP filters, monitoring cadence (via Chronos Daemon), and a HITL gate before any list enters outbound.

**CTA:** Activate the Perceive arc → · Talk to Pragya about Perceive →

---

## ARC II — ENGAGE (Karuna) · `/solutions/engage`

**Principle:** *Empathy + omnipresence.* Karuna is the compassionate face. The promise: every customer reached, on every channel, with warmth, 24/7. Relieves "we're losing people in the queue."

**Eyebrow:** Arc II of Sheel · the Karuna face
# Every conversation with the world. With compassion. 24/7.

**Absorbs:** marketing · sales / BD · customer support · customer success · recruiting front-end
**Hands off to:** Orchestrate (a closed deal becomes a plan) and Fulfill (a promise becomes delivered work).

**The Flow:** Outbound Prospectors run personalized campaigns → Inbound Deal Closers qualify and convert → Care Orchestrators resolve support across phone, email, WhatsApp → Success agents nurture and expand.

**Meet the agents:**
- **Outbound Prospector** – personalized email, LinkedIn, and live voice outreach in your brand's tone. Tools: OmniBuddha voice, Email Suite, Calendar Orchestrator.
- **Inbound Deal Closer** – answers every callback and inbound, qualifies, books demos, drafts proposals.
- **Care Orchestrator** – omnichannel support that resolves, not deflects; escalates with full context.

**Example scenario:**
> **Overnight** – 200 personalized emails and 50 LinkedIn requests go out; 30 voice calls are queued.
> **10:00 AM** – 4 callbacks arrive. The Deal Closer handles all 4 live; 2 qualify, 1 books a demo for Thursday.
> **All day** – the Care Orchestrator resolves 12 support tickets; one complex API issue is debugged in a sandbox and fixed in 3 minutes.
> **Evening** – every conversation summarized to your dashboard. One proposal waits for your one-tap approval.

**Configuration:** Tune the Personality Matrix per agent (empathy, formality, tone), set channels, and gate proposals or discounts behind HITL.

**CTA:** Activate the Engage arc → · Talk to Pragya about Engage →

---

## ARC III — ORCHESTRATE · `/solutions/orchestrate`

**Principle:** *Command + competence.* The promise: the work organizes itself, and what's missing gets built. Relieves "I'm the bottleneck for every decision."

**Eyebrow:** Arc III of Sheel
# Decides what to do, and who does it. Builds what's missing.

**Absorbs:** management · strategy · planning · project management · dispatch
**Hands off to:** Fulfill (a plan becomes execution) and back to Perceive (results become new signals).

**The Flow:** A Process orchestrator receives goals → decomposes them into a DAG → dispatches child agents in parallel → and when no capable employee exists, the **Meta Agent builds one** on the spot.

**Meet the agents:**
- **Process Orchestrator** – the C-suite tier: runs multi-department plans with parallel branches and conditional routing.
- **The Meta Agent** – builds new AI Employees and tools from a goal, iterating until they work. *(See [AI Employees](02-product-ai-employees.md).)*
- **Dispatcher** – assigns work to the right existing employee, balancing cost and capability.

**Example scenario:**
> A goal arrives: "Launch in the Pune market by month-end."
> Orchestrate decomposes it: enrich local leads (Perceive), localize outreach (Engage), prep fulfillment capacity (Fulfill), set up local tax handling (Sustain).
> No "local-tax" employee exists. The Meta Agent builds one, tests it, and publishes it – in minutes.
> The whole plan runs in parallel, with one HITL checkpoint before spend.

**Configuration:** Set planning depth, parallelism limits, cost ceilings per Process, and approval gates before dispatch.

**CTA:** Activate the Orchestrate arc → · Talk to Pragya about Orchestrate →

---

## ARC IV — FULFILL · `/solutions/fulfill`

**Principle:** *Reliability / promise-keeping.* The promise: what you sold gets delivered, consistently, without you chasing it. Relieves "we close deals we struggle to deliver."

**Eyebrow:** Arc IV of Sheel
# The work gets done. Delivered, checked, and shipped.

**Absorbs:** operations · delivery · production · logistics · QA · provisioning
**Hands off to:** Sustain (delivered work becomes an invoice) and Engage (delivery becomes a success touchpoint).

**The Flow:** Operations agents execute the delivery workflow → QA Skills check the output against spec → Logistics agents handle inventory and shipping → provisioning agents stand up accounts and access.

**Meet the agents:**
- **Operations Runner** – executes the core delivery process for your business, step by step.
- **QA Inspector** – checks outputs against acceptance criteria before they ship; flags exceptions.
- **Logistics Coordinator** – stock checks, fulfillment tags, and shipment tracking. Tools: Warehousing & Inventory Oracle.

**Example scenario:**
> An order closes in Engage.
> Fulfill checks inventory (preventing an out-of-stock sale), generates the shipping tag, and provisions the customer's account.
> QA verifies the delivery package against spec; one item fails and is auto-rerouted for correction before the customer ever sees it.
> Sustain is notified to invoice; Engage is notified to send the welcome.

**Configuration:** Define the delivery DAG, QA acceptance criteria, exception routing, and HITL gates on anything customer-facing.

**CTA:** Activate the Fulfill arc → · Talk to Pragya about Fulfill →

---

## ARC V — SUSTAIN · `/solutions/sustain`

**Principle:** *Loss aversion + relief from dread.* Finance, legal, compliance, HR – the work owners hate and fall behind on. The promise: it's handled, on time, correctly. Relieves "we're always behind on the back office."

**Eyebrow:** Arc V of Sheel
# Funded, legal, staffed, and supplied. Without you chasing any of it.

**Absorbs:** finance · accounting · AR/AP · payroll · legal · compliance · risk · HR · IT · procurement
**Hands off to:** Evolve (financials become insight) and Perceive (vendor and cash signals).

**The Flow:** Fiscal agents reconcile and chase cash → tax and compliance Skills keep you correct → contract agents draft and route for signature → HR and IT agents onboard people and provision access.

**Meet the agents:**
- **Fiscal Optimizer** – reconciles accounts, flags overdue invoices, and chases payment politely but persistently. Tools: Bank Feed Synchronizer, Global Payout Rails, Automated Tax Matrix.
- **Compliance Engine** – KYB/AML checks, regulatory gates, and audit-ready records. Tools: Identity Verification Gateway.
- **Contract Specialist** – generates contracts, sets sign anchors, and tracks them to signature. Tools: E-Signature Handler.

**Example scenario:**
> A $4,200 invoice goes 15 days overdue.
> The Fiscal Optimizer sends a polite WhatsApp reminder with a payment link; the client pays within the hour.
> A new B2B customer fails an AML check; the Compliance Engine pauses activation at a HITL checkpoint and routes it to you.
> Month-end: reconciliation is already done, taxes computed per jurisdiction, and the close report is on your desk.

**Configuration:** Set dunning tone and cadence, payout approval gates, compliance thresholds, and audit export schedules.

**CTA:** Activate the Sustain arc → · Talk to Pragya about Sustain →

---

## ARC VI — EVOLVE · `/solutions/evolve`

**Principle:** *The compounding moat (peak motivation).* The promise: the whole loop gets smarter on its own, and you get the strategic view a board would envy. This is where the "widening gap" line lives.

**Eyebrow:** Arc VI of Sheel
# Learns from everything. Tunes the whole loop. Week 12 beats Week 1.

**Absorbs:** R&D · business intelligence · continuous improvement · executive reporting · self-optimization
**Hands off to:** every other arc – Evolve is the feedback that retunes the entire loop.

**The Flow:** The Learning System harvests reflections, KPIs, critic verdicts, and your feedback → the Self-Optimizing Intelligence Engine rewrites charters and routing → BI agents compile the executive view.

**Meet the agents:**
- **Self-Optimizing Intelligence Engine** – tunes agent instructions from real KPI evidence, automatically.
- **BI Analyst** – compiles weekly executive briefings: what moved, why, and what to do next.
- **Strategy Synthesizer** – turns cross-arc patterns into recommended actions.

**Example scenario:**
> The Learning System notices outbound open rates dipped from 38% to 34%.
> It diagnoses the cause (subject-line strategy), updates the Outbound Prospector's parameters, and the next batch recovers.
> Friday, a 4-minute briefing lands in your inbox: pipeline, cash, support health, and one recommended action.
> No human touched the tuning. The loop got better while you ran the business.

**Configuration:** Set briefing cadence and recipients, KPI targets, and HITL gates before any self-optimization is promoted to production.

**CTA:** Activate the Evolve arc → · Talk to Pragya about Evolve →
