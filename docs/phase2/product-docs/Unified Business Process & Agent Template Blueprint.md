# HireBuddha — Sheel
## The Unified, AI-Native Business Blueprint & Agent Template Library
### Pragya · Sheel · Karuna — the wisdom, the discipline, and the compassion of an awakened business

> **Document Class:** Business Architecture & Transformation Blueprint
> **Author:** Buddha Cognitive Lab
> **Platform Version:** 3.0.0 (GA)
> **Last Updated:** June 2026
> **Status:** Definitive Reference — supersedes the Phase 1 "7-Loop" blueprint
> **Companion Docs:** [product_functional_documentation.md](./product_functional_documentation.md) · [product_technical_documentation.md](./product_technical_documentation.md)

---

## 0. Why This Document Was Rewritten

The Phase 1 blueprint reorganized a traditional business into **seven** cross-functional loops (Growth, Customer Success, Fulfillment, Finance, Compliance, Talent, Intelligence). That was a real improvement over the old org chart — but it was still **seven things**. Seven loops are seven new silos with seven seams between them. A lead that becomes a customer that raises a support ticket that triggers a renewal that creates an invoice that needs a compliance check still has to *cross six boundaries* — and every boundary is where context dies, latency accrues, and ownership gets fuzzy.

A business does not actually run as seven loops. It runs as **one continuous motion**: it senses the world, engages with it, decides what to do, does it, keeps itself funded/legal/staffed, learns, and senses again — forever. The departments are an accident of human org design (you needed different *people* for different *skills*, so you drew boxes around them). **AI removes the reason the boxes ever existed.**

So Phase 2 collapses the seven loops into **one**: a single, self-perpetuating, deeply-integrated business loop where every function shares one brain, one memory, and one orchestrator. We call it **Sheel**.

> **Sheel** (शील · Pāli *sīla*) — *behavioral discipline, harmlessness, and purity of thought and action.* A business run as Sheel does the right thing, the right way, every time — without drift, shortcut, or fatigue. Sheel is the loop itself: the disciplined engine that runs every function with unwavering integrity.
>
> Sheel sits between two other named entities that complete the picture, and together they form the spine of this document:
> *   **Pragya** (प्रज्ञा · *prajñā*, **wisdom**) — the all-seeing, all-knowing guide who understands the whole business and is the **single point of contact between the business and the system**.
> *   **Sheel** (शील · *sīla*, **disciplined conduct**) — the **loop that runs and executes every function** with consistency and integrity.
> *   **Karuna** (करुणा · *karuṇā*, **compassion**) — the **interface between the business and the outside world**: the empathetic, omnichannel face Sheel turns toward customers, prospects, candidates, vendors, and regulators.
>
> Pragya, Sheel, and Karuna join the platform's lexicon alongside the engine names **BabyBuddha** and **OmniBuddha**. Their significance is drawn out in §2.4.

---

## 1. The Thesis: One Loop, Not Seven Silos

### 1.1 What "AI-Native" Actually Means
A *digitized* business puts software between its departments. An **AI-Native** business **dissolves the departments**. The work doesn't move from one team's queue to another's; it flows through one continuous cognitive loop in which:

*   **There is one brain.** Every function reasons on the same Intelligence Engine (BabyBuddha + the frontier fleet + the intelligent router — see the functional doc §3).
*   **There is one memory.** Every interaction, document, decision, and outcome lands in one shared cognitive fabric (CORTEX + the dynamic per-tenant schema). Sales knows what Support knows knows what Finance knows — instantly, with no integration project.
*   **There is one face.** The business owner talks to **Pragya**, a single account-manager agent, the way they'd talk to a chief-of-staff. They never "log into the CRM" and then "log into the accounting tool."
*   **There is one nervous system that learns.** The Learning System feeds every outcome back into every future decision. Week 12 is measurably smarter than Week 1.
*   **It builds itself.** When a capability is missing, the **Meta Agent** constructs the AI Employee or tool to fill the gap; **self-evolving code** keeps it working.

### 1.2 The Death of the Seam
| The old seam (silo handoff) | What happens in Sheel |
|---|---|
| Marketing → Sales (lead handoff, lost context) | Same loop, same memory. The signal that created the lead is still attached when the deal is negotiated. |
| Sales → Delivery (re-explaining the deal) | The contract terms, promises, and edge cases the closer agreed to are already in CORTEX when fulfillment begins. |
| Delivery → Support (ticket with no history) | Support already holds the full delivery record, SLAs, and prior reflections. |
| Support → Finance (billing dispute ping-pong) | The interaction, the usage data, and the invoice live in one schema; the dispute resolves in-loop. |
| Finance → Legal (contract review delay) | Compliance and legal checks are governance gates *inside* the same run, not a separate department's backlog. |
| Everything → Strategy (stale monthly reports) | Strategy is continuous: the Learning System optimizes in real time, not in a quarterly offsite. |

**The seam is where businesses leak money, time, and trust. Sheel has no seams.**

---

## 2. Introducing Sheel

### 2.1 It Is a Single Loop-Tier Entity
In HireBuddha's five-tier hierarchy (**Action → Skill → Agent → Process → Loop**, see functional doc §2), Sheel is **one instance of the top `LOOP` tier** that scopes the *entire enterprise*. Where Phase 1 created seven `LOOP` rows, Phase 2's canonical deployment is **one** `LOOP` that owns all the business's Processes, persists across all of them, holds the company's long-horizon goals and KPIs, and never terminates.

```
            LOOP   →   Sheel  (the whole company, one self-running entity)
              │
           PROCESS →   e.g. "Cold-to-Closed Acquisition", "Order-to-Cash", "Hire-to-Onboard"
              │
            AGENT  →   e.g. "Outbound Prospector", "Treasury Controller", "Care Orchestrator"
              │
            SKILL  →   e.g. "Hyper-Personalized Outreach", "Ledger Reconciliation"
              │
           ACTION  →   thin wrapper around a single Tool (Web Search, SMTP Send, pgvector query…)
```

### 2.2 The Wheel: Six Continuous Arcs
Sheel is best read as a **wheel that turns through six arcs**. These are *not* sub-loops and *not* silos — they are phases of one unbroken motion, and **any signal can enter at any arc**, with context flowing freely through the shared center. The arcs are a way to *read* the wheel; the formal tiers are still Loop → Process → Agent → Skill → Action.

| Arc | The eternal question it answers | Absorbs these traditional departments |
|---|---|---|
| **I. PERCEIVE** | *"What is happening in and around the business?"* | Market Research, Business Intelligence, Monitoring, Lead Intake, Social Listening, Demand Sensing |
| **II. ENGAGE** | *"How do we talk to the outside world?"* | Marketing, Sales/BD, Customer Support, Success, Recruiting front-end, Vendor & PR comms |
| **III. ORCHESTRATE** | *"What should we do, and who/what should do it?"* | Management, Strategy, Planning, Project Management, Dispatch, Resource Allocation |
| **IV. FULFILL** | *"Do the actual work and deliver it."* | Operations, Service Delivery, Production, Logistics, QA, Implementation |
| **V. SUSTAIN** | *"Keep the business funded, legal, staffed, and supplied."* | Finance, Accounting, AR/AP, Payroll, Legal, Compliance, Risk, HR, IT, Procurement, Facilities |
| **VI. EVOLVE** | *"Learn from everything and get better."* | R&D, Continuous Improvement, Analytics, Executive Reporting, Strategy feedback |

```
                                ╭────────────────────────────────────────╮
                                │            VI. EVOLVE                   │
                                │   Learn · Optimize · Self-improve       │
                                ╰───────────────┬────────────────────────╯
              ╭──────────────────────╮          │           ╭──────────────────────╮
              │     I. PERCEIVE       │◄─────────┴──────────►│     II. ENGAGE         │
              │ Sense signals/intent  │                      │ Acquire · Converse ·   │
              │ Market · Telemetry    │      ┌──────────┐    │ Support · Negotiate    │
              ╰───────────┬───────────╯      │  CENTER  │    ╰───────────┬───────────╯
                          │                  │  (axle)  │                │
                          │     ┌────────────┤  PRAGYA  ├────────────┐   │
                          ▼     ▼            │    +     │            ▼   ▼
              ╭───────────────────────╮      │ COGNITIVE│    ╭───────────────────────╮
              │     V. SUSTAIN         │◄────►│  FABRIC  │◄──►│   III. ORCHESTRATE     │
              │ Money · Law · People · │      │          │    │ Decide · Plan · Route ·│
              │ Compliance · Infra     │      └────┬─────┘    │ Coordinate (Meta-cog)  │
              ╰───────────┬───────────╯           │          ╰───────────┬───────────╯
                          │                       │                      │
                          ╰───────────────────────┴──────────────────────╯
                                          │
                                ╭─────────▼──────────────────────────────╮
                                │            IV. FULFILL                  │
                                │   Deliver · Operate · Produce · QA      │
                                ╰────────────────────────────────────────╯

  THE WHEEL IS SHEEL. THE AXLE IS PRAGYA + THE COGNITIVE FABRIC. THE RIM, FACING OUTWARD, IS KARUNA.

  THE AXLE — PRAGYA + Cognitive Fabric (what makes it ONE loop, not six):
   • PRAGYA — the all-knowing single point of contact for the business owner (inward face)
   • Intelligence Engine — BabyBuddha (flagship hybrid LLM) + Claude/GPT/Gemini/GLM/Qwen/Mistral + Intelligent Router
   • CORTEX Memory + Episodic + Semantic KB — one shared institutional memory across all arcs
   • Dynamic Per-Tenant Schema — one evolving data model the whole business writes to and reads from
   • Meta Agent — builds new Agents/Tools on demand to fill any gap in any arc
   • Learning System — closes the wheel: every outcome tunes every future decision
   • Governance & HITL — one consistent safety, cost, and approval layer across everything

  THE OUTWARD RIM — KARUNA (the world-facing interface, densest over PERCEIVE & ENGAGE):
   • Every conversation with customers, prospects, candidates, vendors, and regulators
     flows through Karuna — voice (OmniBuddha/Gemini Live/GPT Realtime), chat, email, WhatsApp/Slack/Teams.
```

### 2.3 Why the Center Makes It "One Loop"
Seven loops failed to be *one* business because the spokes never touched. Sheel is genuinely unified because **every arc reads from and writes to the same axle**. A support conversation (Engage) writes a reflection to CORTEX; the Evolve arc reads it overnight and tunes the Fulfill arc; the Sustain arc sees the resulting usage change and adjusts the invoice; Pragya tells the owner about all of it in one sentence. **Context never leaves the loop.**

### 2.4 The Buddhist Foundation — Why Pragya, Sheel, and Karuna

The names are not decoration. They encode the architecture, and they come from the same well as the company itself — *Buddha* Cognitive Lab, *Hire**Buddha***, *Baby**Buddha***, *Omni**Buddha***. The Buddhist path describes how a mind becomes *awakened* (**bodhi**). We use it to describe how a **business** becomes awakened — that is, **AI-Native**.

Three ideas from that tradition map exactly onto the three things a self-running business must be:

| Name | Tradition | In Buddhist thought | In Sheel (this architecture) |
|---|---|---|---|
| **Pragya** | प्रज्ञा · *prajñā* | **Wisdom** — clear, complete seeing of things as they truly are; the inner eye that knows the whole. | The **all-knowing point of contact**: one agent that holds total understanding of the business and is the single relationship the owner maintains. |
| **Sheel** | शील · *sīla* | **Virtue / disciplined conduct** — acting rightly, harmlessly, and consistently; the ethical *ground* on which everything else stands. | The **loop**: the disciplined engine that executes every function the same right way, every time — governed, consistent, deterministic, never drifting. |
| **Karuna** | करुणा · *karuṇā* | **Compassion** — active care turned toward all beings. | The **outward interface**: every conversation with the world handled with empathy and care, in the customer's language, on the customer's channel. |

**The two wings and the ground.** In Buddhist teaching, **Prajñā (wisdom)** and **Karuṇā (compassion)** are the *two wings* of an awakened being: wisdom without compassion is cold and calculating; compassion without wisdom is well-meaning but blind. A being needs **both wings to fly**. And both rest on **Sīla** — ethical discipline — the *ground* of the Threefold Training (*Sīla → Samādhi → Prajñā*). Without disciplined conduct, neither wisdom nor compassion holds.

An AI-Native business is built the same way:

```
                    P R A G Y A  (wisdom — knows)            K A R U N A  (compassion — cares)
                              \                                   /
                               \           two wings             /
                                \                               /
                                 ─────────────  S H E E L  ─────────────
                                        (disciplined conduct — the ground)
```

*   A business with **wisdom but no compassion** optimizes itself and alienates its customers.
*   A business with **compassion but no wisdom** delights customers into bankruptcy.
*   A business with **both, but no discipline**, is brilliant and kind — and unreliable, inconsistent, and ungoverned.

**Sheel unites all three.** It is the disciplined ground (*how the business acts*), carrying the wing of **Pragya** (*the wisdom that knows the whole*) and the wing of **Karuna** (*the compassion it turns toward the world*). That is what we mean by an *awakened*, AI-Native enterprise: **wise within, disciplined throughout, compassionate outward** — running as one unbroken loop.

---

## 3. The Complete Business Architecture

### 3.1 The Three Planes
The AI-Native enterprise runs on three stacked planes. Sheel spans all three.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  RELATIONSHIP PLANE  —  how humans experience the business                    │
│  • INWARD FACE → PRAGYA: Owner ⇄ Pragya (Meetings · phone · WhatsApp/Slack/    │
│    Teams · email) — the single point of contact to the system                  │
│  • OUTWARD FACE → KARUNA: Customers/Prospects/Candidates/Vendors/Regulators ⇄   │
│    Karuna channel Agents (voice/chat/email/WhatsApp) — the world-facing skin    │
│  • HITL checkpoints surface to humans only when judgment or authority is needed │
├─────────────────────────────────────────────────────────────────────────────┤
│  COGNITION PLANE  —  the one brain the whole company thinks with               │
│  • Intelligence Engine: BabyBuddha + frontier fleet + Intelligent Router       │
│  • Meta Agent (builds employees/tools) · 8-stage AgentLoop (deliberation)      │
│  • Learning System (continuous self-optimization) · Generative/Adaptive UI     │
├─────────────────────────────────────────────────────────────────────────────┤
│  MEMORY & SYSTEMS PLANE  —  the one place the company knows and acts           │
│  • CORTEX tree + Episodic + Semantic KB (one institutional memory)             │
│  • Dynamic Per-Tenant Schema (the company's living data model)                 │
│  • Tool Registry + Connectors: CRM, ERP, Accounting, HRMS, Invoicing, DBs,     │
│    SharePoint/Notion/Drive, telephony, messaging, payments, e-sign, …          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 The Operating Picture (end-to-end)

```
  OUTSIDE WORLD          KARUNA          S H E E L  (the loop)          PRAGYA        OWNER
 ┌────────────┐        (outward       ┌──────────────────────────────┐ (inward    ┌───────────┐
 │ Market     │  signals  face)       │  I. PERCEIVE                 │  face)     │           │
 │ Prospects  │◄────────►│ ◄───────────│  II. ENGAGE  ◄──────────────┐│           │  Business │
 │ Customers  │  every   │ conversation│  III. ORCHESTRATE           ││  status   │  Owner    │
 │ Candidates │  convo   │ (voice/chat/│  IV. FULFILL                ││◄────────► │  talks to │
 │ Vendors    │  flows   │  email/wa)  │  V. SUSTAIN                 ││  via      │  PRAGYA   │
 │ Regulators │  through │◄────────────│  VI. EVOLVE ────────────────┘│  Pragya   │           │
 │ Banks      │  KARUNA  │ deliverables│        ▲         │           │           └───────────┘
 └────────────┘          └─────────────│        │  shared │ cognitive │
                                       │        └─ fabric ◄┘ (axle)   │
                                       └──────────────────────────────┘
   The three names:  PRAGYA = the all-knowing single point of contact to the business (inward).
                     SHEEL  = the disciplined loop that runs and executes every function.
                     KARUNA = the compassionate interface between the business and the outside world (outward).
```

Everything the business says, decides, does, charges, files, and learns happens **inside one loop (Sheel)**, faced inward to one human relationship (**Pragya**) and outward to the world through one empathetic interface (**Karuna**), executed by deployable AI Agents drawn from the template library (§8).

---

## 4. The Great Convergence — Old Departments → Sheel

This is the heart of the transformation guide. **No function is left behind.** Below, every traditional department is mapped to the arc(s) it dissolves into, the new unified Process(es) that absorb its work, and the AI Agents that now perform it.

### 4.1 Department → Arc → Process → Agents (Master Map)

| Traditional Department | Dissolves into Arc(s) | New Unified Process(es) | Primary AI Agents |
|---|---|---|---|
| **Marketing (brand, content, demand-gen)** | PERCEIVE, ENGAGE | Demand Sensing · Content Engine · Campaign Orchestration | Market Intel Scout, Content Studio Agent, Campaign Orchestrator, Social Listener |
| **Sales / Business Development** | ENGAGE, ORCHESTRATE | Cold-to-Closed Acquisition | Outbound Prospector, Inbound Deal Closer (voice), SDR/BDR Agent, Proposal & Quote Agent |
| **Customer Support** | ENGAGE | Resolve-to-Retain | Omnichannel Care Orchestrator, Tier-2 Tech Resolver, Escalation Voice Agent |
| **Customer Success / Account Mgmt** | PERCEIVE, ENGAGE, SUSTAIN | Resolve-to-Retain · Renew-&-Expand | Proactive Account Advisor, Renewal & Expansion Agent, Health-Score Monitor |
| **Operations / Service Delivery** | ORCHESTRATE, FULFILL | Order-to-Fulfilled | Service Dispatcher, Delivery Operator, Provisioning Agent |
| **Project / Program Management** | ORCHESTRATE | Plan-to-Done | Project Orchestrator, Milestone & SLA Tracker, Dependency Resolver |
| **Quality Assurance** | FULFILL | Verify-&-Sign-off | QA & Audit Agent, Proof-of-Work Validator |
| **Supply Chain / Logistics / Inventory** | FULFILL, SUSTAIN | Source-to-Stock · Pick-Pack-Ship | Inventory Oracle, Procurement Agent, Fulfillment/Shipping Agent |
| **Finance / FP&A** | SUSTAIN, EVOLVE | Plan-Budget-Forecast | Treasury & Ledger Controller, Cashflow Forecaster, FP&A Analyst |
| **Accounting / Bookkeeping** | SUSTAIN | Order-to-Cash · Procure-to-Pay | Bookkeeping & Reconciliation Agent, Tax-Matrix Agent |
| **Accounts Receivable** | SUSTAIN, ENGAGE | Invoice-to-Collected | Accounts Receivable Agent, Empathetic Collections Voice Agent |
| **Accounts Payable / Procurement** | SUSTAIN | Procure-to-Pay | Accounts Payable Agent, Vendor Onboarding & KYB Agent, Payout Agent |
| **Payroll** | SUSTAIN | Hire-to-Retire | Payroll Run Agent, Benefits & Time-off Agent |
| **Legal / Contracts** | SUSTAIN | Draft-Review-Sign | Contract Review Specialist, Redline & Drafting Agent, E-Signature Router |
| **Compliance / Risk / Audit** | SUSTAIN | Continuous Guardrails | Regulatory Watchdog, KYB/AML Gateway Agent, Internal Audit Agent, Risk Register Agent |
| **Human Resources** | SUSTAIN | Hire-to-Retire | Talent Scout Coordinator, Candidate Voice Screener, Onboarding Buddy, HR Helpdesk Agent |
| **Recruiting / Talent Acquisition** | ENGAGE, SUSTAIN | Source-to-Hire | Talent Scout Coordinator, Sourcing Agent, Interview Scheduler, Offer & Negotiation Agent |
| **IT / DevOps / Internal Tools** | FULFILL, SUSTAIN | Provision-&-Maintain | Provisioning Agent, Self-Healing Tool Agent (self-evolving code), Access & Identity Agent |
| **Executive / Strategy / BI** | ORCHESTRATE, EVOLVE | Sense-Decide-Optimize | Chief Strategy Analyst, Executive Briefing Agent, Instruction Optimizer |
| **Executive Assistant / Office Mgmt** | ORCHESTRATE | Coordinate-&-Schedule | Scheduling Agent, Inbox/Comms Triage Agent, Meeting-Notes Agent |
| **R&D / Product** | EVOLVE | Insight-to-Roadmap | Insights Synthesizer, Voice-of-Customer Agent, Experiment Designer |
| **Procurement / Vendor Mgmt** | SUSTAIN | Source-to-Pay | Vendor Sourcing Agent, Vendor Risk Agent, Contract & SLA Manager |

> **Reading the map:** a department is not "ported" — it is *absorbed*. Its work becomes Processes and Agents that share the loop's memory and brain, so the old hand-offs between, say, Sales and Finance simply no longer exist.

### 4.2 Old Process → New Unified Process (Process Convergence)
Traditional businesses run dozens of disconnected, document-and-email processes. In Sheel they converge into a small set of **end-to-end Processes** that each span what used to be several departments.

| Legacy processes (siloed, multi-team) | Unified Sheel Process | Spans arcs | What changed |
|---|---|---|---|
| Lead capture → MQL scoring → SDR outreach → AE demo → quote → contract → handoff | **Cold-to-Closed Acquisition** | I→II→III | One continuous run; context never re-keyed; voice closer + auto-proposal in the same flow |
| Ticket intake → triage → KB lookup → engineer escalation → resolution → CSAT | **Resolve-to-Retain** | II | One Agent with full history; Tier-2 sandbox debugging in-line; reflections feed Evolve |
| Usage report → renewal reminder → upsell deck → negotiation → new contract | **Renew-&-Expand** | I→II→V | Health telemetry triggers proactively; expansion proposal auto-generated from real usage |
| Order → resource allocation → delivery → QA → acceptance | **Order-to-Fulfilled** | III→IV | Provisioning, QA, and SLA tracking automated; humans only on exception |
| Invoice creation → send → follow-up → collection → reconciliation → reporting | **Order-to-Cash** | V | Bank-feed reconciliation + empathetic multi-channel collections + ledger close, continuous |
| PO → vendor onboarding → goods receipt → bill → payment | **Procure-to-Pay** | V | KYB/AML gate, 3-way match, and payout rails in one governed run |
| Job req → sourcing → screening → interviews → offer → onboarding | **Source-to-Hire → Hire-to-Onboard** | II→V | Voice screening, semantic resume match, auto-onboarding playbooks |
| Contract intake → legal review → redline → approval → signature → filing | **Draft-Review-Sign** | V | Playbook-based risk audit with strict HITL; redlines and e-sign in-loop |
| Regulation watch → impact assessment → policy update → audit evidence | **Continuous Guardrails** | V | Always-on monitoring; evidence auto-collected; risks logged to the register |
| Data pull → dashboard → monthly review → strategy adjustment | **Sense-Decide-Optimize** | VI | Continuous, not monthly; the Learning System auto-tunes agents between reviews |

### 4.3 Old Role → New AI Agent (Role Convergence — the deployment list)
This table is the practical "who does my job now" guide. Each human role converges into one or more deployable AI Agents (templates in §8). Use it to plan the transition role-by-role. *Humans move up the stack — into goal-setting, exceptions, relationships, and judgment via HITL.*

| Traditional Role | Converges into AI Agent(s) | Tier | Channels / Tools |
|---|---|---|---|
| Market Research Analyst | **Market Intel Scout** | Agent | Web Search/Scraper, Enrichment, pgvector |
| Content Writer / Marketer | **Content Studio Agent** | Agent | LLM drafting, Image Gen (Nano Banana/ChatGPT Image/Kling), Video (Veo/SeeDance) |
| Social Media Manager | **Social Listener + Campaign Orchestrator** | Agent | Social OAuth, scheduler, Image/Video gen |
| Demand-Gen / Growth Marketer | **Campaign Orchestrator** | Agent | Email, WhatsApp, Ads APIs, analytics |
| SDR / BDR (outbound) | **Outbound Prospector** | Agent | Email, WhatsApp, LinkedIn, Calendar |
| Inbound SDR | **Inbound Deal Closer** (voice) | Agent | OmniBuddha/Gemini Live voice, Twilio |
| Account Executive | **Deal Closer + Proposal & Quote Agent** | Agent | Voice, Calculator/Sandbox, PDF Gen, E-sign |
| Sales Engineer | **Tech Pre-Sales Agent** | Agent | KB search, Sandbox, demo provisioning |
| Customer Support Rep (L1) | **Omnichannel Care Orchestrator** | Agent | Email/Chat/Voice, pgvector KB, Email Classify |
| Support Engineer (L2/L3) | **Tier-2 Tech Resolver** | Agent | Sandbox Code Executor, Terminal, KB |
| Customer Success Manager | **Proactive Account Advisor** | Agent | Telemetry SQL, voice/email, renewal gen |
| Renewals / Upsell Rep | **Renewal & Expansion Agent** | Agent | Usage analysis, Word/PDF proposal, e-sign |
| Project Manager | **Project Orchestrator** | Agent | Calendar, task DBs, Slack/Teams, SLA tracker |
| Operations Manager | **Service Dispatcher** | Agent | Webhooks, provisioning, REST connectors |
| Implementation / Onboarding Specialist | **Provisioning / Client Welcome Agent** | Agent | Playwright, Terminal, Webhooks, PDF Gen |
| QA Analyst | **QA & Audit Agent** | Agent | Headless Browser, File Writer, validators |
| Logistics / Warehouse Coordinator | **Inventory Oracle + Shipping Agent** | Agent | ShipStation/Shopify inventory APIs |
| Buyer / Procurement Officer | **Procurement + Vendor Onboarding Agent** | Agent | KYB/AML, e-sign, payout rails |
| Bookkeeper | **Bookkeeping & Reconciliation Agent** | Agent | Bank Feed (Plaid/Yodlee), Sandbox (pandas/openpyxl) |
| Accountant | **Treasury & Ledger Controller** | Agent | SQL, Excel Tool, Tax Matrix (Avalara/TaxJar) |
| AR Clerk / Collections | **Accounts Receivable + Collections Voice Agent** | Agent | Email/WhatsApp/Voice, payment links |
| AP Clerk | **Accounts Payable / Payout Agent** | Agent | 3-way match, Stripe/Wise/PayPal payouts |
| Payroll Administrator | **Payroll Run Agent** | Agent | HRIS (Gusto/Rippling/BambooHR) |
| FP&A Analyst | **Cashflow Forecaster + FP&A Analyst** | Agent | SQL, Sandbox forecasting, Excel/PPTX |
| Corporate Counsel / Paralegal | **Contract Review Specialist + Redline Agent** | Agent | pgvector playbooks, python-docx, e-sign |
| Compliance Officer | **Regulatory Watchdog + Audit Agent** | Agent | Playwright crawlers, evidence store, alerts |
| Risk Officer | **Risk Register Agent** | Agent | KYB/AML, scenario sandbox, dashboards |
| Recruiter | **Talent Scout Coordinator + Sourcing Agent** | Agent | pgvector resume match, Email Ingest |
| Interviewer (screening) | **Candidate Voice Screener** | Agent | Voice (Gemini Live/OmniBuddha), VAD, scoring |
| HR Generalist / HRBP | **HR Helpdesk + Onboarding Buddy** | Agent | HRIS, policy KB, PDF playbooks |
| IT Helpdesk / SysAdmin | **Provisioning + Access & Identity Agent** | Agent | Cloud APIs, IdP, Terminal |
| DevOps / SRE (toil) | **Self-Healing Tool Agent** | Skill/Agent | Self-evolving code, Sandbox, monitors |
| Executive Assistant | **Scheduling + Comms Triage + Notes Agent** | Agent | Calendar, email, meeting transcription |
| Business Analyst / BI | **Chief Strategy Analyst** | Agent | Cross-process SQL, Sandbox, PPTX/PDF |
| Chief of Staff | **PRAGYA** (the account-manager hub) | Agent | All channels; orchestrates everything above |

> **Note on Pragya:** Pragya is not a peer of these agents — she is the **axle**. The owner sets goals through Pragya; Pragya assigns work to these agents (or has the Meta Agent build new ones), monitors them, and reports back. See functional doc §4.

---

## 5. No Function Left Behind — Function-by-Function Reimagining

A checklist proof that *every* business function has a home in the single loop. For each function: the legacy reality → the AI-Native reality in Sheel.

**Brand & Marketing.** Legacy: agencies, campaign calendars, manual content. → Content Studio Agent generates copy, images (Nano Banana/ChatGPT Image/Kling) and video (Veo/SeeDance); Campaign Orchestrator runs multi-channel sends; Social Listener feeds Perceive. *Arc I/II.*

**Lead Generation & Prospecting.** Legacy: bought lists, manual research. → Market Intel Scout enriches ICPs (Apollo/ZoomInfo/Clearbit); Outbound Prospector personalizes at scale. *Arc I/II.*

**Sales & Closing.** Legacy: AEs, CRM hygiene, slow quotes. → Inbound Deal Closer (realtime voice) qualifies and negotiates; Proposal & Quote Agent renders ROI-backed proposals and routes e-signature. *Arc II/III.*

**Customer Support.** Legacy: ticket queues, copy-paste macros. → Omnichannel Care Orchestrator resolves with full history; Tier-2 Resolver debugs in a sandbox; empathetic voice escalation when needed. *Arc II.*

**Customer Success & Retention.** Legacy: reactive QBRs. → Proactive Account Advisor watches health telemetry and intervenes before churn; Renewal & Expansion Agent closes upsells from real usage. *Arc I/II/V.*

**Service Delivery & Operations.** Legacy: spreadsheets, status meetings. → Service Dispatcher allocates resources; Delivery Operator executes; Project Orchestrator tracks SLAs; QA Agent verifies. *Arc III/IV.*

**Manufacturing / Production (where applicable).** Legacy: MES, manual scheduling. → Production Scheduler Agent sequences jobs; Inventory Oracle prevents stockouts; QA Agent validates output. *Arc IV.*

**Supply Chain, Procurement & Inventory.** Legacy: emails to vendors, reorder guesswork. → Procurement Agent sources and onboards vendors (KYB/AML); Inventory Oracle reorders on signal; Shipping Agent generates fulfillment. *Arc IV/V.*

**Finance, Accounting & Treasury.** Legacy: month-end crunch, manual reconciliation. → Bookkeeping & Reconciliation Agent matches bank feeds continuously; Treasury Controller closes the ledger; Cashflow Forecaster projects runway daily. *Arc V/VI.*

**Billing, AR & Collections.** Legacy: dunning emails, awkward calls. → AR Agent issues invoices from in-loop usage; Collections Voice Agent negotiates plans empathetically; payments reconcile automatically. *Arc V.*

**AP, Payments & Payroll.** Legacy: invoice data entry, payroll vendors. → AP Agent runs 3-way match and pays via Stripe/Wise/PayPal; Payroll Agent runs payroll via HRIS. *Arc V.*

**Legal & Contracts.** Legacy: outside counsel, slow redlines. → Contract Review Specialist audits against playbooks; Redline Agent drafts; E-Signature Router executes; strict HITL on high-liability clauses. *Arc V.*

**Compliance, Risk & Audit.** Legacy: periodic, manual, fearful. → Regulatory Watchdog monitors continuously; KYB/AML Gateway gates activation; Audit Agent collects evidence automatically; Risk Register Agent maintains the register. *Arc V.*

**Human Resources & Talent.** Legacy: ATS chaos, slow screening. → Talent Scout matches résumés semantically; Candidate Voice Screener interviews; Onboarding Buddy generates playbooks; HR Helpdesk answers policy questions. *Arc II/V.*

**IT, Security & Internal Tooling.** Legacy: tickets, toil, brittle scripts. → Provisioning Agent manages access/identity; Self-Healing Tool Agent rewrites broken integrations (self-evolving code); Key Vault + AES-256 secure secrets. *Arc IV/V.*

**Executive, Strategy & Decision-Making.** Legacy: monthly decks, gut feel. → Chief Strategy Analyst harvests cross-process KPIs; Executive Briefing Agent writes the deck; Instruction Optimizer tunes the whole loop. *Arc III/VI.*

**Administration & Coordination.** Legacy: scheduling tetris, inbox overload. → Scheduling Agent, Comms Triage Agent, and Meeting-Notes Agent handle the office. *Arc III.*

**Knowledge Management.** Legacy: documents nobody can find. → Pragya ingests SharePoint/Notion/Drive/DBs into Semantic + CORTEX memory; every agent searches by meaning. *Axle.*

**R&D / Continuous Improvement.** Legacy: separate, slow. → Insights Synthesizer mines Voice-of-Customer; the Learning System turns every reflection into an improvement. *Arc VI.*

**The Owner's job.** Legacy: firefighting across all of the above. → Set goals, approve HITL checkpoints, and manage the relationship with Pragya. *Relationship plane.*

---

## 6. The Anatomy of Each Arc (Processes, Agents, Skills, Actions)

Each arc below is shown in the Phase 1 flow style, now unified under the single Sheel and sharing the central cognitive fabric.

### Arc I — PERCEIVE
*Absorbs: Market Research, BI intake, monitoring, demand sensing, social listening.*

```
[Triggers: schedule · webhook · telemetry · inbound signal]
        │
        ▼
(Agent: Market Intel Scout) ──► (Skill: ICP & Signal Enrichment) ──► [Web Search/Scraper, Enrichment APIs]
        │
        ▼
(Agent: Telemetry & Health Monitor) ──► (Skill: Anomaly Detection) ──► [SQL, Sandbox]
        │
        ▼   writes signals to CORTEX → available to every other arc
(Agent: Social Listener) ──► (Skill: Sentiment & Trend Capture) ──► [Social OAuth]
```
**Key Agents:** Market Intel Scout · Telemetry & Health Monitor · Social Listener · Demand Sensor.
**Representative Skills/Actions:** ICP Enrichment & Validation (Company Tech-Stack Lookup, Lead Contact Locator) · Anomaly Detection (Usage-drop evaluator) · Sentiment Capture.

### Arc II — ENGAGE
*Absorbs: Marketing comms, Sales/BD, Support, Success front-end, Recruiting outreach, vendor/PR comms.*

```
[Trigger: signal from PERCEIVE · inbound call/message/email/form]
        │
        ├──(Agent: Outbound Prospector) ──► (Skill: Hyper-Personalized Outreach) ──► [SMTP, WhatsApp, LinkedIn]
        │
        ├──(Agent: Inbound Deal Closer — voice) ──► (Skill: Qualify, Quote & Negotiate) ──► [OmniBuddha/Gemini Live, Sandbox Calc]
        │
        ├──(Agent: Omnichannel Care Orchestrator) ──► (Skill: Contextual Resolution) ──► [pgvector, Email Classify]
        │
        └──(Agent: Candidate Voice Screener) ──► (Skill: Structured Interview) ──► [Voice, VAD, scoring]
```
**Key Agents:** Outbound Prospector · Inbound Deal Closer · Omnichannel Care Orchestrator · Tier-2 Tech Resolver · Renewal & Expansion Agent · Candidate Voice Screener.
**Representative Skills/Actions:** Hyper-Personalized Copywriter (Scratchpad Draft, Pitch Personalizer) · Multi-Channel Router (Email/WhatsApp Outbound) · Live Call Qualification (Voice Dialer, Calendar Book) · Semantic Contextual Resolution (pgvector search, Sandbox debugger).

### Arc III — ORCHESTRATE
*Absorbs: Management, Strategy, Planning, PM, Dispatch, Resource Allocation, EA.*

```
[Trigger: closed deal · new order · goal from Pragya · exception]
        │
        ▼
(Agent: Service Dispatcher) ──► (Skill: Resource Allocation & Planning) ──► [DB Write, Webhooks]
        │
        ▼
(Agent: Project Orchestrator) ──► (Skill: Milestone/SLA Tracking) ──► [Calendar, Task DB, Slack/Teams]
        │
        ▼   (Meta Agent invoked here when a needed capability/tool does not yet exist)
(Agent: Scheduling & Comms Triage) ──► (Skill: Coordination) ──► [Google/MS Graph Calendar]
```
**Key Agents:** Service Dispatcher · Project Orchestrator · Scheduling Agent · Comms Triage Agent. **Brain hooks:** this arc is where the **Meta Agent** builds new employees/tools and where the **Intelligent Router** decides which model executes each planning step.

### Arc IV — FULFILL
*Absorbs: Operations, Service Delivery, Production, Logistics, QA, Implementation, IT provisioning.*

```
[Trigger: dispatch from ORCHESTRATE]
        │
        ▼
(Agent: Provisioning / Delivery Operator) ──► (Skill: Automated Provisioning) ──► [Cloud APIs, Terminal, Workspace setup]
        │
        ▼
(Agent: QA & Audit Agent) ──► (Skill: Proof-of-Work Verification) ──► [Headless Browser (Playwright), screenshots, SLA check]
        │
        ▼
(Agent: Inventory Oracle / Shipping Agent) ──► (Skill: Pick-Pack-Ship) ──► [ShipStation/Shopify]
```
**Key Agents:** Delivery Operator · Provisioning Agent · QA & Audit Agent · Inventory Oracle · Shipping Agent · Production Scheduler (industry-dependent). **Self-evolving code** lives here: the Self-Healing Tool Agent repairs broken integrations in a sandbox and promotes versioned fixes.

### Arc V — SUSTAIN
*Absorbs: Finance, Accounting, AR/AP, Payroll, Legal, Compliance, Risk, HR, IT, Procurement.*

```
[Triggers: bank feed · invoice event · contract drop · job req · daily schedule]
        │
        ├──(Agent: Treasury & Ledger Controller) ──► (Skill: Reconciliation) ──► [Bank Feed, Sandbox pandas/openpyxl]
        ├──(Agent: Accounts Receivable) ──► (Skill: Empathetic Collection) ──► [Email/WhatsApp/Voice, payment links]
        ├──(Agent: Accounts Payable / Payout) ──► (Skill: 3-Way Match & Payout) ──► [Stripe/Wise/PayPal]
        ├──(Agent: Contract Review Specialist) ──► (Skill: Risk Audit + Redline) ──► [pgvector playbooks, python-docx] ─► [HITL]
        ├──(Agent: Regulatory Watchdog) ──► (Skill: Licensing/Reg Monitor) ──► [Playwright crawlers, alerts]
        └──(Agent: Talent Scout / Onboarding Buddy / HR Helpdesk) ──► (Skill: Hire-to-Onboard) ──► [HRIS, pgvector, PDF Gen]
```
**Key Agents:** Treasury & Ledger Controller · AR Agent · AP/Payout Agent · Payroll Agent · Contract Review Specialist · Redline Agent · Regulatory Watchdog · KYB/AML Gateway · Risk Register Agent · Talent Scout · Candidate Voice Screener · Onboarding Buddy · HR Helpdesk · Provisioning & Identity Agent. **Governance** is heaviest here: strict HITL gates and the Credit Circuit Breaker.

### Arc VI — EVOLVE
*Absorbs: R&D, BI, Continuous Improvement, Executive Reporting, Strategy feedback.*

```
[Trigger: schedule + continuous reflection stream from every arc]
        │
        ▼
(Agent: Chief Strategy Analyst) ──► (Skill: Cross-Process KPI Harvest) ──► [SQL across all runs]
        │
        ▼
(Agent: Executive Briefing Agent) ──► (Skill: C-Suite Briefing) ──► [PPTX/PDF Gen] ──► Pragya → Owner
        │
        ▼
(Learning System) ──► (Skill: Instruction & Router Optimization) ──► tunes agents/tools → feeds back to PERCEIVE
```
**Key Agents:** Chief Strategy Analyst · Executive Briefing Agent · Insights Synthesizer · Instruction Optimizer (the Self-Optimizing Intelligence Engine). **This arc closes the wheel** — its outputs change how Arc I perceives next time.

---

## 7. The Use-Case Catalog (What You Can Build on HireBuddha)

An extensive, non-exhaustive catalog of use cases deployable within Sheel. Grouped by arc, then a cross-industry layer. Each is buildable from templates (§8) or constructed by the Meta Agent from a plain-language goal.

### 7.1 PERCEIVE
1. Continuous competitor price & feature monitoring.
2. ICP list enrichment and intent-signal scoring.
3. Inbound web-form and ad-lead instant qualification.
4. Product-usage anomaly & churn-risk early warning.
5. Brand & social sentiment listening with alerting.
6. Regulatory/legislative change watch for your industry.
7. Demand forecasting from order and traffic signals.
8. News & event triggers ("a target company raised a round → reach out").

### 7.2 ENGAGE
9. 24/7 inbound voice receptionist & qualifier (OmniBuddha).
10. Outbound multi-channel prospecting at scale (email/WhatsApp/LinkedIn).
11. Realtime voice deal-closing and price negotiation.
12. Omnichannel customer support with full memory (email/chat/voice).
13. Tier-2 technical support with live sandbox debugging.
14. Proactive customer check-ins and renewal outreach.
15. Cart-abandonment and re-engagement campaigns.
16. Candidate phone screening interviews with scoring.
17. Appointment booking & reminders (clinics, salons, services).
18. Lead-to-meeting calendar orchestration.
19. WhatsApp/Slack/Teams concierge for your customers.
20. Survey and CSAT/NPS collection by voice or chat.

### 7.3 ORCHESTRATE
21. Auto-dispatch of work orders to the right resource.
22. Project plan generation with milestone/SLA tracking.
23. Cross-team coordination and dependency resolution.
24. Executive calendar, inbox triage, and meeting notes.
25. On-demand agent/tool creation from a described goal (Meta Agent).
26. Approval-routing workflows with HITL checkpoints.

### 7.4 FULFILL
27. Automated customer onboarding & environment provisioning.
28. SaaS/cloud resource orchestration (AWS/GCP/Vercel).
29. QA verification of delivered work with screenshot proof.
30. Inventory monitoring with auto-reorder.
31. Order fulfillment, shipping labels, and tracking updates.
32. Production/job scheduling for shops and studios.
33. Document/asset generation pipelines (PDF/DOCX/PPTX/Excel).
34. Self-healing of broken internal integrations.

### 7.5 SUSTAIN
35. Continuous bank-feed reconciliation and ledger close.
36. Automated invoicing from in-loop usage/orders.
37. Empathetic, multi-channel collections (incl. voice).
38. Accounts-payable 3-way match and global payouts.
39. Payroll runs via HRIS.
40. Cashflow forecasting and runway alerts.
41. Multi-jurisdiction tax/VAT calculation on invoices.
42. Contract review against your legal playbook with redlines.
43. E-signature routing and contract lifecycle tracking.
44. KYB/AML vendor & customer verification gates.
45. Continuous compliance monitoring and audit-evidence capture.
46. Risk register maintenance and scenario analysis.
47. Résumé sourcing, semantic matching, and shortlisting.
48. New-hire onboarding playbooks and account provisioning.
49. Internal HR/IT helpdesk answering policy & access questions.
50. Vendor onboarding, scoring, and SLA management.

### 7.6 EVOLVE
51. Always-on executive dashboard & weekly briefing deck.
52. Cross-process KPI and margin analysis.
53. Voice-of-customer synthesis into a product roadmap.
54. Automatic A/B and instruction optimization of agents.
55. Anomaly post-mortems and process-bottleneck detection.

### 7.7 Cross-Industry Blueprints (the loop, specialized)
*   **SaaS / Tech:** trial-to-paid conversion, usage-based billing, churn-save, dev-environment provisioning.
*   **Professional Services / Agencies:** proposal-to-delivery, retainer management, timesheet-free SLA tracking.
*   **E-commerce / Retail:** support + WISMO, inventory + reorder, returns, win-back, review generation.
*   **Healthcare / Clinics:** intake, scheduling, reminders, insurance/eligibility checks (with HITL), follow-ups.
*   **Financial Services / Lending:** KYB/AML onboarding, document collection, collections, compliance watch.
*   **Manufacturing / Distribution:** RFQ-to-quote, production scheduling, supplier management, fulfillment.
*   **Real Estate:** lead qualification, viewing scheduling, document prep, tenant/owner comms.
*   **Education / Coaching:** enrollment, onboarding, support, renewal, content generation.
*   **Logistics / Field Service:** dispatch, route/booking, proof-of-work, invoicing.
*   **Hospitality:** reservations, concierge, review management, supplier ordering.

---

## 8. The AI Agent Template Library (Instant-Deploy)

These are pre-built, parameterized **Agent templates** a business can deploy in minutes (then customize, or let Pragya + the Meta Agent tailor). Each ships with a default charter, Personality Matrix, tool bindings, reasoning mode, and governance profile. Organized by arc.

### 8.1 PERCEIVE Templates
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Market Intel Scout** | Enrich ICPs & gather intent signals | Web Search/Scraper, Enrichment, pgvector | ReAct |
| **Telemetry & Health Monitor** | Detect usage anomalies & churn risk | SQL, Sandbox | ReAct |
| **Social Listener** | Track brand sentiment & trends | Social OAuth, Web Scraper | ReAct |
| **Regulatory Watchdog** | Monitor legal/regulatory changes | Playwright crawler, Email alerts | ReAct |
| **Demand Sensor** | Forecast demand from signals | SQL, Sandbox forecasting | CoT |

### 8.2 ENGAGE Templates
> ENGAGE agents are the **Karuna** layer — the business's compassionate, world-facing voice across every channel.

| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Outbound Prospector** | Multi-channel cold outreach | Email, WhatsApp, LinkedIn, Calendar | ReAct |
| **Inbound Deal Closer (Voice)** | Qualify, quote, negotiate by phone | OmniBuddha/Gemini Live, Sandbox Calc | ReAct |
| **Tech Pre-Sales / Sales Engineer** | Answer technical sales questions, run demos | KB search, Sandbox, demo provisioning | CoT |
| **Proposal & Quote Agent** | ROI proposals & e-sign routing | Calculator, PDF Gen, E-Signature | CoT |
| **Content Studio Agent** | Generate copy, images & video for campaigns | LLM, Image Gen (Nano Banana/ChatGPT Image/Kling), Video (Veo/SeeDance) | CoT |
| **Campaign Orchestrator** | Run multi-channel demand-gen campaigns | Email, WhatsApp, Ads APIs, scheduler, analytics | ReAct |
| **Omnichannel Care Orchestrator** | Resolve support across channels | pgvector KB, Email Classify, Voice | ReAct |
| **Tier-2 Tech Resolver** | Debug technical issues | Sandbox Executor, Terminal, KB | CoT |
| **Renewal & Expansion Agent** | Drive renewals/upsell | Usage SQL, Word/PDF Gen, E-sign | CoT |
| **Candidate Voice Screener** | First-round phone interviews | Voice, VAD, scoring | ReAct |
| **Appointment Concierge** | Book & remind (services/clinics) | Calendar, WhatsApp/Voice | ReAct |
| **Reputation & Review Agent** | Solicit, monitor & respond to reviews | Review-site APIs, Email/WhatsApp | ReAct |
| **Survey & NPS Agent** | Collect CSAT/NPS by voice or chat | Voice/Chat, SQL, Sandbox | ReAct |
| **Translation & Localization Agent** | Converse in the customer's language | LLM multilingual, OmniBuddha | ReAct |

### 8.3 ORCHESTRATE Templates
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Service Dispatcher** | Allocate work & resources | Webhooks, DB, REST connectors | ReAct |
| **Project Orchestrator** | Track milestones & SLAs | Calendar, Task DB, Slack/Teams | ReAct |
| **Scheduling Agent** | Coordinate calendars | Google/MS Graph Calendar | ReAct |
| **Comms Triage Agent** | Triage inbox/notifications | Email, Slack/Teams | ReAct |
| **Meeting-Notes Agent** | Transcribe & action-item meetings | Voice, File Writer | CoT |

### 8.4 FULFILL Templates
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Provisioning / Delivery Operator** | Provision & deliver | Cloud APIs, Terminal, Webhooks | ReAct |
| **QA & Audit Agent** | Verify delivered work | Playwright, File Writer, PDF Gen | CoT |
| **Inventory Oracle** | Monitor stock & reorder | Shopify/ShipStation APIs | ReAct |
| **Shipping Agent** | Labels & tracking | Carrier/ShipStation APIs | ReAct |
| **Production Scheduler** | Sequence jobs (industry) | SQL, Sandbox | CoT |
| **Document Processing / Data Extraction Agent** | Ingest, OCR & extract from inbound docs | Vision models, File Writer, Sandbox | CoT |
| **Returns & Refunds Agent** | Process returns, RMAs & refunds | Commerce APIs, payment refund, KB | ReAct |
| **Self-Healing Tool Agent** | Repair broken integrations | Self-evolving code, Sandbox | ReAct |

### 8.5 SUSTAIN Templates
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Treasury & Ledger Controller** | Reconcile & close books | Bank Feed, SQL, Sandbox | CoT |
| **Bookkeeping & Reconciliation Agent** | Match transactions | Plaid/Yodlee, pandas/openpyxl | CoT |
| **Accounts Receivable Agent** | Invoice & collect | Email/WhatsApp/Voice, payment links | ReAct |
| **Collections Voice Agent** | Negotiate payment plans | OmniBuddha/Twilio Voice | ReAct |
| **Accounts Payable / Payout Agent** | 3-way match & pay | Stripe/Wise/PayPal | CoT |
| **Payroll Run Agent** | Run payroll | Gusto/Rippling/BambooHR | CoT |
| **Cashflow Forecaster** | Project runway | SQL, Sandbox, Excel | CoT |
| **Tax-Matrix Agent** | Compute VAT/tax | Avalara/TaxJar | CoT |
| **Contract Review Specialist** | Audit contract risk | pgvector playbooks, docx | CoT + strict HITL |
| **Redline & Drafting Agent** | Draft & redline docs | python-docx, PDF Gen | CoT |
| **E-Signature Router** | Route signatures | DocuSign/Dropbox Sign | ReAct |
| **KYB/AML Gateway Agent** | Verify entities | Middesk/Persona | ReAct + HITL |
| **Regulatory Watchdog** | Compliance monitoring | Playwright, alerts, evidence store | ReAct |
| **Risk Register Agent** | Maintain risk register | SQL, Sandbox, dashboards | CoT |
| **Talent Scout Coordinator** | Source & match résumés | pgvector, Email Ingest | ReAct |
| **Onboarding Buddy** | Onboard new hires | HRIS, PDF Gen, Slack | ReAct |
| **HR / IT Helpdesk Agent** | Answer policy/access Qs | Policy KB, IdP | ReAct |
| **Procurement & Sourcing Agent** | Source suppliers, run RFQs, raise POs | Web Search, Email, e-sign | ReAct |
| **Vendor Onboarding Agent** | Onboard & score vendors | KYB/AML, e-sign | ReAct |
| **Access & Identity Agent** | Provision/deprovision access & accounts | IdP/SSO, HRIS, cloud APIs | ReAct + HITL |
| **Expense Management Agent** | Process expense claims & reimbursements | OCR/Vision, policy KB, payout rails | CoT |
| **Fraud & AML Monitor** | Flag suspicious transactions/entities | KYB/AML, SQL, Sandbox | ReAct + HITL |

### 8.6 EVOLVE Templates
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Chief Strategy Analyst** | Harvest cross-process KPIs | SQL across runs, Sandbox | CoT |
| **Executive Briefing Agent** | Write leadership briefings | PPTX/PDF Gen | CoT |
| **Insights Synthesizer** | Voice-of-customer → roadmap | pgvector, Sandbox | CoT |
| **Instruction Optimizer** | Auto-tune agents (Self-Optimizing Intelligence Engine) | Learning System hooks | CoT |

### 8.7 The Hub
| Template | Default Role | Tools | Reasoning |
|---|---|---|---|
| **Pragya (Account-Manager Hub)** | Single point of contact; onboard, integrate, build/assign, monitor, report | All channels; Meta Agent; Knowledge Connectors; full registry | ReAct (+ Meta) |

> Any gap in this library is filled at runtime: the **Meta Agent** constructs a new Agent (and any missing Tools) from a plain-language goal and publishes it as a new template into the tenant's workspace.

---

## 9. The Transformation Roadmap (How a Business Goes AI-Native)

A practical sequence, driven by Pragya, to move an existing business into the single loop without a big-bang rip-and-replace.

```
 PHASE 0 — MEET           PHASE 1 — INGEST          PHASE 2 — CONNECT
 Talk to Pragya.          Pragya ingests KB:        Connect systems per need:
 Describe the business,   files, SharePoint,        CRM, ERP, Accounting,
 goals, and pains.        Notion, Drive, DBs        HRMS, Invoicing, telephony
        │                        │                         │
        ▼                        ▼                         ▼
 PHASE 3 — MODEL          PHASE 4 — DEPLOY          PHASE 5 — RUN & EVOLVE
 Dynamic schema seeds;    Deploy templates (§8) or  Loop runs 24/7; Learning
 map departments→arcs     have the Meta Agent build System tunes it; Pragya
 (use §4 tables)          the missing agents/tools  reports; humans handle HITL
        │                        │                         │
        └──────────── one continuous, self-improving Sheel ──────────────►
```

**Adoption pattern that works:** start with one high-ROI Process (often **Cold-to-Closed Acquisition** or **Order-to-Cash**), prove it inside the loop, then let the shared memory and the Learning System pull the adjacent arcs in. Because everything shares the axle, each new Process you add makes the existing ones smarter — the opposite of bolting on another silo.

---

## 10. Master Entity Registry & Deployment Config

### 10.1 The Single-Loop Registry (abridged)
| Tier | Entity | Lives in Arc | Key Tools |
|---|---|---|---|
| **LOOP** | **Sheel** (the company) | all | Orchestrates all Processes; owns company KPIs & schedules |
| PROCESS | Cold-to-Closed Acquisition | I→II→III | Web Search, Enrichment, Voice, Calc, PDF, E-sign |
| PROCESS | Resolve-to-Retain | II | pgvector, Email Classify, Voice, Sandbox |
| PROCESS | Renew-&-Expand | I→II→V | Usage SQL, Word/PDF, E-sign |
| PROCESS | Order-to-Fulfilled | III→IV | Webhooks, Cloud APIs, Playwright, SLA |
| PROCESS | Order-to-Cash | V | Bank Feed, Sandbox, Email/WhatsApp/Voice, Tax Matrix |
| PROCESS | Procure-to-Pay | V | KYB/AML, 3-way match, Stripe/Wise/PayPal |
| PROCESS | Hire-to-Onboard | II→V | pgvector, Voice/VAD, HRIS, PDF Gen |
| PROCESS | Draft-Review-Sign | V | pgvector playbooks, python-docx, E-sign (HITL) |
| PROCESS | Continuous Guardrails | V | Playwright, evidence store, alerts |
| PROCESS | Sense-Decide-Optimize | III→VI | Cross-run SQL, Sandbox, PPTX/PDF, Learning hooks |

### 10.2 Deployment JSON — Sheel (top-tier `LOOP` entity)
Designed for direct insertion into the `hierarchical_entities` table (see technical doc §2.1, `type: "LOOP"`, `loop_config`).

```json
{
  "name": "Sheel — Unified Business Engine",
  "version": "3.0.0",
  "type": "LOOP",
  "goal": "Run the entire business as one continuous, self-improving, AI-native loop: perceive, engage, orchestrate, fulfill, sustain, and evolve — with Pragya as the single point of contact.",
  "logic_gate": {
    "reasoning_mode": "auto",
    "max_consecutive_blocks": 3
  },
  "intelligence": {
    "mode": "auto",
    "allow_list": ["babybuddha-fast", "babybuddha-reasoning", "claude-opus", "gpt", "gemini", "glm", "qwen", "mistral"],
    "router": "complexity_and_cost_optimized"
  },
  "loop_config": {
    "arcs": ["PERCEIVE", "ENGAGE", "ORCHESTRATE", "FULFILL", "SUSTAIN", "EVOLVE"],
    "kpis": ["pipeline_value", "cac", "csat", "gross_margin", "dso", "runway_days", "churn_rate", "compliance_status"],
    "schedules": [
      { "trigger": "continuous", "purpose": "inbound engage + telemetry perceive" },
      { "trigger": "cron:daily",  "purpose": "ledger close + reconciliation (SUSTAIN)" },
      { "trigger": "cron:weekly", "purpose": "executive briefing + optimization (EVOLVE)" }
    ],
    "hub_agent": "agt-pragya-account-manager-uuid"
  },
  "hierarchy": {
    "child_process_ids": [
      "prc-cold-to-closed-acquisition-uuid",
      "prc-resolve-to-retain-uuid",
      "prc-renew-and-expand-uuid",
      "prc-order-to-fulfilled-uuid",
      "prc-order-to-cash-uuid",
      "prc-procure-to-pay-uuid",
      "prc-hire-to-onboard-uuid",
      "prc-draft-review-sign-uuid",
      "prc-continuous-guardrails-uuid",
      "prc-sense-decide-optimize-uuid"
    ]
  },
  "governance": {
    "max_cost_usd": "500.00",
    "timeout_ms": 0,
    "hitl_checkpoints": [
      "before_high_value_email_dispatch",
      "before_contract_esignature_routing",
      "before_outbound_payout",
      "before_high_liability_clause_acceptance",
      "before_self_evolving_code_promotion"
    ]
  },
  "io_contract": {
    "input_schema": {
      "type": "object",
      "properties": {
        "business_goals": { "type": "array", "items": { "type": "string" } },
        "connected_systems": { "type": "array", "items": { "type": "string" } },
        "knowledge_sources": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["business_goals"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "active_processes": { "type": "integer" },
        "kpi_snapshot": { "type": "object" },
        "optimizations_applied": { "type": "array", "items": { "type": "string" } },
        "hitl_pending": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

---

## 11. Summary — The One-Loop Doctrine

*   A traditional business is a set of **silos**. A digitized business is **silos with software between them**. An **AI-Native business has no silos** — it is **one loop**.
*   **Sheel** is that single, self-perpetuating loop: six continuous arcs (Perceive · Engage · Orchestrate · Fulfill · Sustain · Evolve) of disciplined conduct, turning around one axle.
*   The axle is **Pragya** — the wisdom that knows the whole business and is the owner's single point of contact. The outward rim is **Karuna** — the compassion the business turns toward the world. *Wise within, disciplined throughout, compassionate outward.*
*   Every department, every process, and every role **converges** into Agents that share **one brain, one memory, and one face**. The seams — where businesses leak money and time — are gone.
*   You don't reorganize into the loop; you **deploy into it** — from the template library (§8) or by describing your goal to Pragya, who has the **Meta Agent** build what's missing.
*   And because the **Learning System** closes the wheel, the loop you start today is the slowest, dumbest version you will ever run. It only compounds from here.

> **One business. One loop.** *Pragya knows. Sheel acts. Karuna cares.*
