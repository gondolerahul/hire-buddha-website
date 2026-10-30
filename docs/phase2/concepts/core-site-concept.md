# HireBuddha — Core Website Concept Document

> **Version:** 2.0 (Phase 2)  
> **Date:** June 26, 2026  
> **Status:** Concept — Revised to Phase 2 product reality  
> **Scope:** The universal foundation site shared by all ICPs

> **Phase 2 alignment note.** This concept was originally written against the Phase 1 product (seven separate business loops, a four-tier agent hierarchy, a single Gemini brain). It has been revised to the Phase 2 product, documented in [`../product-docs/`](../product-docs/):
> - **Seven loops → one unified loop, "Sheel"** (Pāli *sīla* = disciplined conduct), read as a wheel of **six continuous arcs**: Perceive · Engage · Orchestrate · Fulfill · Sustain · Evolve. The former seven loops are now *arcs* of the one loop.
> - **Four-tier → five-tier hierarchy:** Action → Skill → Agent → Process → **Loop**.
> - **One model → the Intelligence Engine:** flagship hybrid LLM **BabyBuddha** + the frontier fleet (Claude Opus, ChatGPT, Gemini, GLM, Qwen, Mistral) behind an **Intelligent Router** that picks the cheapest model that will succeed per step.
> - **New flagship capabilities to surface:** the **Meta Agent** (builds AI Employees/tools from a goal), the **Learning System** (continuous self-optimization), **Generative/Adaptive UI**, **self-evolving code**, and a **dynamic per-tenant schema**.
> - **Pragya is the account manager** — the single point of contact (inward face). **Karuna** is the compassionate, world-facing interface (outward face). With Pragya and Sheel they form the Buddhist triad **Pragya · Sheel · Karuna** (wisdom · discipline · compassion).
> - **Multimodal generation is multi-provider:** image (Gemini Nano Banana, ChatGPT Image, Kling), video (Veo, SeeDance), realtime audio (our **OmniBuddha** + Gemini Live + ChatGPT Realtime).

---

## 1. Executive Summary

The core site is the **always-visible, ICP-agnostic foundation** of the HireBuddha web presence. It tells the universal product story, houses the technical and functional depth, presents the economics, and provides the surface on which Pragya operates and ICP-specific experiences are layered.

**Design Philosophy:** The core site must accomplish three things simultaneously:
1. **Hook** a first-time visitor in under 5 seconds with a provocative, clear value proposition.
2. **Educate** a serious evaluator with enough technical, functional, and economic depth to survive due diligence.
3. **Convert** a ready buyer with clear, friction-free CTAs at every decision point.

The site must be **fully self-sufficient without Pragya** — every page navigable, every concept understandable, every CTA reachable through standard navigation.

---

## 2. Core Narrative & Positioning

### The Universal Hook
> **"Stop Hiring. Start Deploying."**

This is the single sentence that unifies every ICP, every page, every CTA. It's the first-principles reframe: the shift from *structure-first* (departments → people → tasks) to *outcome-first* (outcomes → loops → autonomous execution).

### The Three-Act Story Arc

The entire core site follows a three-act structure that mirrors the buyer's psychological journey:

| Act | Buyer's Internal Question | Site's Answer | Primary Section |
|---|---|---|---|
| **Act 1: Desire** | *"What is this? Why should I care?"* | The world has changed. You no longer need to build departments. You deploy AI Employees that run entire business functions autonomously. | **Homepage** |
| **Act 2: Belief** | *"How does this actually work? Is it real?"* | Here's the architecture. Here's the Intelligence Engine (BabyBuddha + a frontier fleet + a smart router). Here's the five-tier hierarchy. Here's Sheel — one unified loop, six arcs. Here's the Meta Agent that builds your workforce and the Learning System that makes it smarter every week. This isn't a chatbot — it's a cognitive workforce. | **Product & Solutions sections** |
| **Act 3: Action** | *"What does it cost? Can I afford it? How do I start?"* | Here are the economics. Here's how it compares. Here's your ROI. Start free. | **Economics section** |

### The Pragya Meta-Narrative

Pragya is **not a support chatbot bolted onto a website**. Pragya IS HireBuddha — the tenant's **account manager and single point of contact**, running live on the actual product, backed by CORTEX memory and powered by the Meta Agent. Inside the product she onboards the business (ingesting its knowledge base from files, SharePoint, Notion, Drive, and databases), connects its software (CRM, ERP, accounting, HRMS, invoicing), builds or assigns the AI Employees needed (via the Meta Agent), and reports status back — exactly as a human chief-of-staff would. The website visitor is interacting with the same intelligence they'd hire to run their business.

This should be stated explicitly on the site:
> *"Pragya is a HireBuddha AI Employee — the same one who'll become your account manager. She runs on the platform you'll use. Everything she does here — understanding your business, mapping it to a plan, generating solutions — is exactly what she'll do for your company every day."*

This transforms Pragya from a feature into a **proof point**. The demo IS the product.

### The Naming: Pragya · Sheel · Karuna

The product's core concepts carry Buddhist names that encode the architecture (the same well as *Buddha* Cognitive Lab, *Hire**Buddha***, *Baby**Buddha***, *Omni**Buddha***). The site should introduce them plainly, then let them recur:

| Name | Meaning | What it is on the site/product |
|---|---|---|
| **Pragya** | *prajñā* — **wisdom** | The all-knowing single point of contact (the inward face; the website companion). |
| **Sheel** | *sīla* — **disciplined conduct** | The one unified business loop that runs every function with consistency and integrity. |
| **Karuna** | *karuṇā* — **compassion** | The empathetic, omnichannel interface the business turns toward the outside world (the outward face). |

*Wisdom within, discipline throughout, compassion outward.* A short "philosophy" strip (on the homepage and the Solutions page) earns enormous brand distinctiveness — no competitor has a story this coherent.

---

## 3. Site Map (Core)

```
hirebuddha.com/
│
├── / (Homepage)
│
├── /product/
│   ├── /product/ai-employees          (5-Tier Agent Hierarchy & Anatomy; the Meta Agent)
│   ├── /product/intelligence           (Intelligence Engine, 4-Tier Memory, CORTEX & the Learning System)
│   ├── /product/tools                  (Built-in Talent Stack — 20+ tools + multimodal generation)
│   └── /product/security               (Security, Governance, Model & Data Governance)
│
├── /solutions/                         (Sheel — The Unified Business Loop · overview)
│   ├── /solutions/perceive             (Arc I — Perceive: market intel, monitoring, demand sensing)
│   ├── /solutions/engage               (Arc II — Engage / Karuna: growth, sales, support, success, recruiting front-end)
│   ├── /solutions/orchestrate          (Arc III — Orchestrate: planning, dispatch, project mgmt, coordination)
│   ├── /solutions/fulfill              (Arc IV — Fulfill: operations, delivery, QA, logistics, provisioning)
│   ├── /solutions/sustain              (Arc V — Sustain: finance, accounting, legal, compliance, HR, IT)
│   └── /solutions/evolve               (Arc VI — Evolve: strategy, BI, self-optimization)
│
│   Migration note: the Phase 1 loop pages map onto the arcs as follows —
│   growth + customer-success → /engage · fulfillment → /fulfill ·
│   finance + compliance + talent → /sustain · intelligence → /evolve.
│   (Implementers may 301-redirect old URLs to the arc that absorbs them, or keep
│    business-area landing pages as facets that roll up into the one Sheel loop.)
│
├── /pricing/                           (Economics, Plans & ROI Calculator)
│
├── /use-cases/                         (Generic Use Cases Gallery)
│
├── /stories/                           (Impact Stories / Case Studies)
│
├── /blog/                              (Blog Index + Articles)
│
├── /about/                             (Company, Team, Mission)
│
├── /contact/                           (Contact & Sales)
│
└── /pragya/                            (Pragya's dedicated "About Me" page)
```

**Navigation Structure (Default — Before ICP Personalization):**

```
[Logo]  Product ▾  Solutions ▾  Pricing  Use Cases  Blog  [Talk to Pragya]  [Get Started]
          │           │
          │           ├── Sheel — Overview (one loop, six arcs)
          │           ├── Perceive
          │           ├── Engage (Karuna)
          │           ├── Orchestrate
          │           ├── Fulfill
          │           ├── Sustain
          │           └── Evolve
          │
          ├── AI Employees & the Meta Agent
          ├── Intelligence, Memory & Learning
          ├── Tools & Capabilities
          └── Security & Governance
```

**Note:** The `[Talk to Pragya]` nav item opens the Pragya companion widget. It is NOT a page link — it's a persistent action button that's always visible.

---

## 4. Page-by-Page Breakdown

### 4.1 HOMEPAGE (`/`)

**Purpose:** Hook the visitor. Establish the paradigm shift. Route them to deeper content or Pragya.

**Visitor's state of mind:** *"I've heard about this / someone sent me this link / I searched for AI automation. What is this?"*

**Time budget:** 5 seconds to decide if they stay. 30 seconds to scroll the hero. 2 minutes to scan the full page.

#### Section 1: Hero
- **Headline:** "Stop Hiring. Start Deploying."
- **Subheadline:** "HireBuddha is an autonomous AI workforce platform. Design AI Employees. Connect them to your phones, email, and tools. Deploy entire business operations — in minutes, not months."
- **Primary CTA:** "Get Started Free"
- **Secondary CTA:** "Talk to Pragya" (opens companion widget)
- **Visual:** An abstract, animated visualization — **one** luminous loop (Sheel) turning through six arcs around a central axle (Pragya), with small agent avatars flowing along it; the outward rim glows warmer where it faces the world (Karuna). Subtle, premium, not cartoonish. *(Supersedes the Phase 1 "seven orbiting loops" motif.)*
- **Pragya prompt (ambient):** After 10 seconds on page, a small Pragya widget gently pulses with: *"Hi, I'm Pragya — I can help you explore. What are you looking for?"* — dismissible, non-blocking.

#### Section 2: The Paradigm Shift (Problem → Solution)
- **Left column (The Old Way):**
  - "Departments. Headcount. Overhead."
  - Quick stat callouts: "90 days to onboard a hire" / "$45K average recruiting cost" / "2.3 years average tenure"
- **Right column (The New Way):**
  - "Loops. Agents. Outcomes."
  - Quick stat callouts: "10 minutes to deploy" / "$0.50 to start" / "24/7/365 — no attrition"
- **Design:** Split-screen, high contrast. Old way = muted, grey. New way = vibrant, alive.

#### Section 3: The Three Pillars (Product Overview)
Three cards, each linking to a product section:

| Card | Headline | One-liner | Link |
|---|---|---|---|
| 🧠 AI Employees | "Not chatbots. Cognitive workers." | A 5-tier hierarchy — Action → Skill → Agent → Process → Loop — that thinks, reasons, and self-corrects. Built for you by the Meta Agent. | `/product/ai-employees` |
| ☸ Sheel — One Loop | "Your entire company. One loop." | One unified, self-running business loop (six arcs) that dissolves your departments — no silos, no seams. | `/solutions/` |
| 💰 Pay-Per-Outcome | "Pennies per task. Not salaries per head." | SKU-based economics with micro-cent tracking — and a router that runs each step on the cheapest model that will succeed. | `/pricing/` |

#### Section 4: The "Design → Deploy → Employ" Lifecycle
- **Visual:** A horizontal 3-step flow diagram with subtle animation as each step activates on scroll.
- **Step 1 — Design:** "Name your AI Employee. Define their role. Tune their personality. Bind their tools. Upload your knowledge base. Done in 5 minutes."
- **Step 2 — Deploy:** "Connect phone lines, email, WhatsApp, social channels. Your AI Employee is now live on every channel."
- **Step 3 — Employ:** "Trigger outbound campaigns. Auto-answer inbound. Run background processes. Monitor costs in real-time."
- **CTA:** "See it in action →" (links to a guided product tour or video)

#### Section 5: Sheel — One Loop, Six Arcs (Solutions Preview)
- **Headline:** "One Loop Runs Your Whole Company."
- **Visual:** A single wheel (Sheel) turning through six labeled arcs around a central axle (Pragya). Each arc is clickable and expands to a brief description + link. *(Supersedes the seven-orbit diagram.)*
- **Brief descriptions (one line each):**
  1. **Perceive** — "Senses the market, your customers, and your numbers — continuously."
  2. **Engage (Karuna)** — "Every conversation with the world: acquire, sell, support, screen — with compassion."
  3. **Orchestrate** — "Decides what to do and who does it; the Meta Agent builds anything missing."
  4. **Fulfill** — "Delivers the work: operations, QA, logistics, provisioning."
  5. **Sustain** — "Keeps you funded, legal, staffed, and supplied: finance, legal, compliance, HR, IT."
  6. **Evolve** — "Learns from everything and tunes the whole loop — Week 12 beats Week 1."
- **Sub-strip (philosophy):** *Pragya knows · Sheel acts · Karuna cares.* — wisdom, discipline, compassion.
- **CTA:** "Explore Sheel →"

#### Section 6: Meet Pragya
- **Headline:** "Meet Pragya. Your AI Account Manager — And Your Single Point of Contact."
- **Copy:** "Pragya is a live HireBuddha AI Employee, running on the same platform you'll use. She's the one relationship you keep: she onboards your business, connects your software, builds your AI workforce with the Meta Agent, assigns the work, and reports back. Talk to her here by text or voice — it's exactly how you'll run your company tomorrow."
- **Visual:** Pragya avatar + a live interactive demo widget embedded in the section. The visitor can type a question right here without opening the sidebar.
- **Suggested prompts:** "How would HireBuddha help my sales team?" / "Show me the pricing" / "Map my business to Sheel."
- **Subtext:** *"Everything Pragya does here — answering questions, understanding your context, generating solutions — is exactly what your AI workforce will do for your customers."*

#### Section 7: Social Proof / Trust Bar
- **Metrics:** "X AI Employees deployed" / "X businesses running on Sheel" / "X minutes of AI voice calls processed"
- **Logo bar:** Integration partners (Twilio, Google, Azure, Stripe, etc.)
- **Security badges:** AES-256-GCM encryption / JWT Auth / Multi-tenant isolation / HITL governance

#### Section 8: Generic Use Cases (Preview)
- 3-4 use case cards with industry-agnostic scenarios:
  - "Automate your outbound sales pipeline"
  - "Deploy 24/7 customer support in 10 minutes"
  - "Run financial reconciliation on autopilot"
  - "Screen candidates with AI voice interviews"
- **CTA:** "See all use cases →"

#### Section 9: Final CTA
- **Headline:** "Your AI workforce is ready. Are you?"
- **Primary CTA:** "Get Started Free"
- **Secondary CTA:** "Talk to Pragya"
- **Tertiary:** "Schedule a Demo"

---

### 4.2 AI EMPLOYEES (`/product/ai-employees`)

**Purpose:** Deep dive into the agent hierarchy and anatomy. Establish technical credibility. Answer: *"What ARE these AI Employees, exactly?"*

#### Section 1: Hero
- **Headline:** "Not Chatbots. Cognitive Workers."
- **Subheadline:** "HireBuddha AI Employees are structured into a 5-tier organizational hierarchy — each tier optimized for a different level of reasoning, autonomy, and tool access."

#### Section 2: The 5-Tier Hierarchy
A visual organizational chart or layered diagram. **Composition rule:** an Action wraps a Tool; Actions combine into a Skill; Skills into an Agent; Agents into a Process; Processes into a Loop.

| Tier | Name | Role Analogy | What It Does |
|---|---|---|---|
| **Loop** | The Standing Function | The Whole Department / Company | The largest unit — a continuously-running business function that never ends. Owns goals, KPIs, and schedules; orchestrates a portfolio of Processes. *(The whole company runs as one Loop: **Sheel**.)* |
| **Process** | C-Suite Orchestrator | CEO / VP | Coordinates multi-department workflows. Runs DAG-based execution plans with parallel branches, conditional routing, and child agent dispatch. |
| **Agent** | Manager / Department Head | Sales Manager / Support Lead | Manages a communication channel. Maintains conversational state, applies domain guidelines, routes complex tasks to specialists. |
| **Skill** | Specialist / Task Executor | Contract Specialist / Data Analyst | Executes a focused technical task — document generation, data analysis, template processing. |
| **Action** | Individual Worker | API Caller / Tool Operator | Atomic, tool-assisted execution — a thin wrapper around a single Tool. The interface between AI and external systems. |

- **Design:** Each tier should be expandable to reveal detailed capabilities, example use cases, and configuration options.
- **Key message:** "This hierarchy prevents monolithic prompt sprawl. Strategy stays at the top (Loop), tool execution stays at the bottom (Action). Each layer does what it's built for."

#### Section 2b: The Meta Agent — The Agent That Builds Agents
- **Headline:** "Describe the outcome. The Meta Agent builds the employee."
- **Copy:** "You don't have to assemble anything by hand. Tell Pragya what you need — *'someone to chase overdue invoices in INR and escalate after 14 days'* — and the **Meta Agent** runs its own build-loop: it picks the right tier(s), writes the charter, sets the personality, binds tools (and **generates new tools** where none exist), simulates the result, critiques it, and iterates until the AI Employee actually satisfies your goal. Everything it produces is fully editable in the No-Code Architect afterward."
- **Key message:** "The platform builds your workforce *for* you — then hands you the controls."

#### Section 3: The Agent Anatomy
A detailed "anatomy diagram" of a single AI Employee showing all configurable layers:

1. **Identity** — Name, title, role description, system prompt charter
2. **Personality Matrix** — Tone, Verbosity, Empathy, Humor, Formality sliders (visual slider UI)
3. **Logic Gate** — Reasoning mode (ReAct vs. Chain-of-Thought), max consecutive blocks
4. **Tool Bindings** — Which tools this agent can access (link to Tools page)
5. **Knowledge Base** — Uploaded documents, semantic vector store
6. **Memory** — 4-tier memory system (link to Intelligence page)
7. **Governance** — Max cost, timeout, HITL checkpoints
8. **I/O Contract** — Input/output variable schemas

- **CTA:** "Design your first AI Employee →"

#### Section 4: Execution Reasoning Modes
- **ReAct (Reason-then-Act):** "The agent decides which tool to call, runs it, observes results, and loops until complete. Best for database operations and linear tasks."
- **Chain-of-Thought:** "The agent writes out step-by-step logic before generating outputs. Best for document drafting, analysis, and legal review."
- **Debate / Multi-Path:** "Multiple candidate reasoning paths are generated and a critic selects or synthesizes the best. Reserved for high-stakes Process- and Loop-tier decisions."
- **And every step is model-routed:** "Whatever the mode, the **Intelligent Router** binds each step to the right brain at runtime — BabyBuddha for most work, a frontier model (e.g., Claude Opus) when the task warrants it. (See Intelligence & Memory.)"
- **Visual:** Side-by-side comparison of the same task solved with ReAct vs. CoT vs. Debate.

#### Section 5: The No-Code AI Architect
- **Headline:** "Build It Without Code. Control It Like Code."
- Screenshots / interactive preview of the visual builder:
  - ReactFlow canvas for designing process DAGs
  - Drag-and-drop step configuration
  - Personality slider controls
  - Tool binding interface
  - Knowledge base upload
- **Key message:** "If you can draw a flowchart, you can build an AI Employee."

#### Section 6: Pragya Integration
- Pragya can answer questions about specific tiers, reasoning modes, or configuration options.
- Suggested prompts for this page: "What's the difference between an Agent and a Skill?" / "Which reasoning mode should I use for sales calls?"

---

### 4.3 INTELLIGENCE & MEMORY (`/product/intelligence`)

**Purpose:** The technical credibility anchor. Prove that HireBuddha's AI is fundamentally different from stateless LLM wrappers.

#### Section 1: Hero
- **Headline:** "AI That Thinks. Remembers. Gets Better."
- **Subheadline:** "Most AI is one frozen model with no memory. HireBuddha pairs a multi-model **Intelligence Engine** with a **4-tier memory architecture** and a **Learning System** — so your workforce reasons cheaply, remembers everything, and compounds intelligence over time."

#### Section 2: The Intelligence Engine (BabyBuddha + the Fleet + the Router)
- **Headline:** "One brain isn't enough. So we gave it many — and a router to choose."
- **BabyBuddha:** "Our flagship hybrid LLM, purpose-built and post-trained for agentic execution, reliable tool calling, and reasoning. It runs in a fast/low-cost mode for routine steps and an extended-reasoning mode for hard ones — the default brain behind most of the platform."
- **The frontier fleet:** "Any AI Employee can also call **Claude Opus, ChatGPT, Gemini, GLM, Qwen, or Mistral** — best-in-class models, no vendor lock-in."
- **The Intelligent Router:** "Every reasoning step is scored on complexity, modality, latency, and cost — and routed to the cheapest model that will succeed. Routine extraction goes to a lightweight model; multi-constraint planning or legal drafting escalates to BabyBuddha-reasoning or Claude Opus. *Frontier-grade quality only where it counts — which is why real-world bills land far below a flat 'always-GPT-4-class' price.*"
- **Visual:** A step entering a router that fans out to BabyBuddha / Claude / GPT / Gemini / GLM / Qwen / Mistral, with a live "chosen model + cost" badge.
- **Governance note:** "Tenants can pin a model or restrict the fleet (data-residency/compliance); failover is automatic; every choice is logged."

#### Section 3: The 4-Tier Memory System
A layered visual diagram, each tier expanding on scroll:

| Tier | Name | Function | Analogy |
|---|---|---|---|
| 1 | **Working Memory** | Temporary scratchpad for the current task. Inputs, loop metrics, step calculations. | Your desk — cluttered with today's work. |
| 2 | **Episodic Memory** | Last 10 interactions per contact/agent. Maintains conversational continuity. | Your conversation history — "We spoke about X last Tuesday." |
| 3 | **Semantic Memory** | Vector search over uploaded company documents. RAG-powered knowledge retrieval. | Your filing cabinet — every document, searchable by meaning. |
| 4 | **CORTEX Tree Memory** | Hierarchical cognitive context for long-running workflows. Auto-checkpointing. Viewport slicing. | Your institutional memory — the deep context that makes Week 12 smarter than Week 1. |

- **Deep dive on CORTEX:**
  - Node hierarchy: root → knowledge → finding → task → output → checkpoint
  - Auto-checkpointing when context reaches 8,000 tokens
  - Viewport slicing — how the perceiver selects relevant context without hitting LLM limits
  - Key message: "CORTEX is why your AI workforce gets better the longer it runs. Every interaction, every decision, every reflection is stored and compounded."

#### Section 4: The AgentLoop — Deliberative Reasoning
The control loop visualized as an animated circular flow:

```
Perceive → Strategize → Pre-Critic → Act → Observe → Post-Critic → Reflect → Decide
```

Each stage explained:
1. **Perceive** — Loads inputs, semantic chunks, updates active context
2. **Strategize** — Selects next action or prompts the planner
3. **Pre-Critic** — Audits the selected action BEFORE execution (circuit-breaker after 3 consecutive blocks)
4. **Act** — Executes the step
5. **Observe** — Processes outputs, checks for runtime blocks
6. **Post-Critic** — Supervisor checks alignment, logs usage, schedules retries
7. **Reflect** — Writes logical reflections back to CORTEX
8. **Decide** — Determines: CONTINUE, REPLAN, DONE, or ABORT

- **Key message:** "This isn't if-then automation. This is deliberative cognition. Your AI workforce audits its own decisions before and after execution."

#### Section 5: The Learning System — Compound Intelligence (the revolutionary part)
- **Headline:** "The slowest, dumbest version of your workforce is the one you run today."
- **The promise:** "Most AI is stateless — it forgets and never improves. HireBuddha does the opposite: every run leaves the system smarter. The **Learning System** harvests signal from across the platform — reflections from the AgentLoop, KPI outcomes, critic verdicts, router performance, and human (HITL) feedback — and folds it back into how the workforce behaves."
- **What it tunes:** "Compounding CORTEX memory · the **Self-Optimizing Intelligence Engine** that rewrites agent charters from KPI evidence · smarter model routing · self-evolving tools · a schema that adapts to your business."
- **The timeline (visual):**
  - **Week 1:** Follows instructions. Basic execution. Accurate but generic.
  - **Week 4:** Episodic memory captures patterns. Recognizes returning contacts and seasonal trends.
  - **Week 8:** CORTEX builds deep domain context. Agents anticipate — pre-drafting, flagging anomalies.
  - **Week 12:** The Self-Optimizing Intelligence Engine tunes instructions from cross-process KPIs. Measurable improvement, **no human intervention**.
- **Key message:** *"Your competitors are still onboarding hires. You're running a self-optimizing machine. The gap doesn't close — it widens."*

#### Section 6: Async Child Dispatch
- How processes suspend and resume when spawning child agent runs
- Parent-child cost aggregation
- State serialization and restoration
- **Key message:** "Complex workflows don't block. They branch, execute in parallel, and merge results — automatically."

#### Section 7: Intelligence That Builds and Reshapes Itself
Three short, high-impact capability blocks (each expandable):
- **Self-Evolving Code:** "When a tool is missing, the Meta Agent writes it. When an integration breaks or a workflow gets expensive, the platform diagnoses and **rewrites its own code** — sandboxed, test-gated, versioned, and rollback-safe. The workforce maintains and upgrades itself."
- **Generative & Adaptive UI:** "The interface isn't fixed — it's **assembled per user, per task, per data shape**. Novices get guided simplicity; power users get density and control; new fields from your evolving schema appear automatically. Most users run everything through Pragya, who materializes exactly the controls they need."
- **Dynamic Per-Tenant Schema:** "Your data model isn't a rigid template. It **starts minimal and grows as you work** — a logistics tenant grows shipment/route entities, a clinic grows patient/appointment entities — automatically, with no migration project. The product fits your business instead of forcing your business to fit the product."

---

### 4.4 TOOLS & CAPABILITIES (`/product/tools`)

**Purpose:** Show the breadth and depth of what AI Employees can actually DO. This is the "arms catalog" page.

#### Section 1: Hero
- **Headline:** "20+ Built-In Tools. Infinite Possibilities."
- **Subheadline:** "Every AI Employee comes equipped with tools for web intelligence, email, document generation, voice, creative production, code execution, and enterprise integrations."

#### Section 2: Tool Category Grid
Organized by suite, each category expandable:

**Web Intelligence Suite:**
- Web Search (DuckDuckGo / Google Custom Search)
- Web Scraper (Beautiful Soup / Firecrawl)
- Headless Browser (Playwright — click, fill, scroll, screenshot)

**Email Operations Suite:**
- Email Ingest (IMAP)
- Email Classify (sentiment, urgency, intent)
- Email Draft (KB-powered, brand-aligned)
- Email Send (SMTP)

**Document & Data Factory:**
- Excel Tool (openpyxl — formulas, charts, formatting)
- PDF Generator (WeasyPrint — HTML/CSS to PDF)
- Word Generator (python-docx)
- PowerPoint Generator (python-pptx / pptxgenjs)
- File Writer (CSV, text, code)

**Creative Studio (multi-provider, router-brokered):**
- Image Generation (Google Gemini **Nano Banana**, **ChatGPT Image**, **Kling**, among others)
- Video Generation (Google **Veo**, **SeeDance**)
- Realtime Audio / Voice (our own **OmniBuddha** + **Gemini Live** + **ChatGPT Realtime** — routed by latency, language, persona, and cost)

**Precision & Dev Tools:**
- Calculator (safe math evaluation)
- Sandbox Code Executor (isolated Python)
- Terminal Tool (sandboxed shell)

**Enterprise Integration Tools:**
- Bank Feed Synchronizer (Plaid, Yodlee)
- Global Payout Rails (Stripe, Wise, PayPal)
- Automated Tax Matrix (Avalara, TaxJar)
- E-Signature Handler (DocuSign, Dropbox Sign)
- Identity Verification Gateway (Middesk, Persona)
- Rich Communication Broker (Slack, Teams)
- Internal Helpdesk Route-and-Lock (Jira, Linear)
- Enrichment & Signal Harvester (Apollo, Clearbit, ZoomInfo)
- Calendar Matrix Orchestrator (Google Calendar, Outlook)
- HRIS Core Accessor (Gusto, Rippling, BambooHR)
- Warehousing & Inventory Oracle (ShipStation, Shopify)
- Chronos Daemon (scheduled callbacks and wake-ups)

#### Section 3: Tool Detail Pattern
For each tool (or at least the top 6-8), a detail card showing:
- **What it does** (one sentence)
- **How it works** (technical backend)
- **Example use** (in context of a business loop)
- **Inputs / Outputs** (schema-level)

#### Section 4: Custom Tools — Built by the Meta Agent
- "Don't see what you need? Describe it to Pragya and the **Meta Agent synthesizes a new tool** (code) on the fly — sandboxed, tested, versioned, and registered to your workspace. This is **self-evolving code**: tools are also auto-repaired when an upstream API drifts and auto-optimized when they get slow or costly."
- Brief explanation of how tool synthesis + registration + versioning works
- **Pragya prompt:** "Tell me what system you need to connect to, and I'll have the Meta Agent build the tool."

---

### 4.5 SECURITY & GOVERNANCE (`/product/security`)

**Purpose:** Neutralize the #1 enterprise objection: "Is this safe?" This page must survive a security review.

#### Section 1: Hero
- **Headline:** "Enterprise-Grade Security. By Design, Not Afterthought."
- **Subheadline:** "AES-256-GCM encryption. Stateless JWT authentication. Multi-tenant isolation. Human-in-the-Loop governance. Credit circuit breakers. Full audit trails."

#### Section 2: Multi-Tenant Isolation
- 4-level hierarchy diagram: App Admin → Partner → Tenant → User
- Full data segregation per tenant
- Company-scoped queries on every database operation

#### Section 3: Encryption & Authentication
- **Key Vault:** AES-256-GCM with nonce-prepended ciphertext. Master key stored outside database.
- **Authentication:** JWT access tokens (15-min expiry) + HTTP-only refresh cookies (7-day expiry)
- **Company Suspension Middleware:** Instant API lockout for suspended tenants

#### Section 4: Human-in-the-Loop (HITL) Governance
- Configurable checkpoints per agent, per action, per process, per loop
- Examples: "Pause before sending emails over $10K in value" / "Require approval before contract e-signature routing" / "Approve before any outbound payout" / "Approve before **self-evolving code is promoted** to production"
- Slack/Teams integration for HITL approvals (Rich Communication Broker) — and surfaced to the owner **through Pragya**
- **Key message:** "Your AI workforce doesn't go rogue. It asks permission at every checkpoint you define."

#### Section 4b: Model & Data Governance
- **Fleet allow-lists & residency:** "Restrict which models in the Intelligence Engine are eligible (e.g., exclude a provider for data-residency or compliance). Pin a specific model where required."
- **Full attribution:** "Every step records the model chosen, tokens, and cost — routing is completely auditable."
- **Sandboxed self-modification:** "All Meta-Agent tool synthesis and self-evolving code runs in isolated sandboxes, must pass tests and critics, and is versioned with one-click rollback. Production is never edited in place."
- **Key message:** "You control which brains touch your data — and you can prove what every one of them did."

#### Section 5: Credit Circuit Breakers
- Minimum wallet balance thresholds per execution type
- Real-time cost tracking per step
- Automatic execution halt on budget breach
- **Key message:** "No runaway spend. No surprise invoices. Every cent is tracked and gated."

#### Section 6: Audit Trail
- Every execution run traced: token counts, cost attribution, latency, decision logs
- Exportable, queryable, compliance-ready
- Context state snapshots for debugging and replay

---

### 4.6 SOLUTIONS OVERVIEW (`/solutions/`)

**Purpose:** Introduce **Sheel** — one unified business loop — as HireBuddha's first-principles process redesign. This is the "paradigm shift" page. *(Supersedes the Phase 1 "7 separate loops" framing; the seven loops are now the six arcs of the one loop.)*

#### Section 1: Hero
- **Headline:** "From Departments to One Loop. From Silos to Sheel."
- **Subheadline:** "Seven loops were still seven silos with six seams between them. **Sheel** collapses them into **one** unified, self-running loop — six continuous arcs sharing one brain, one memory, and one face. No silos. No seams."
- **Visual:** A single wheel (Sheel) turning through six arcs around a central axle (Pragya), with the world-facing rim (Karuna) glowing. *(Replaces the Phase 1 "3 meta-categories → 7 loops" diagram.)*

#### Section 2: The Before/After — Departments → Arcs of Sheel
| Before (Siloed Departments) | After (Arc of the one loop, Sheel) |
|---|---|
| Market Research + BI + Monitoring + Lead Intake | **Arc I — Perceive** |
| Marketing + Sales/BD + Support + Success + Recruiting front-end (the **Karuna** face) | **Arc II — Engage** |
| Management + Strategy + Planning + PM + Dispatch | **Arc III — Orchestrate** |
| Operations + Delivery + Production + Logistics + QA | **Arc IV — Fulfill** |
| Finance + Accounting + AR/AP + Payroll + Legal + Compliance + Risk + HR + IT + Procurement | **Arc V — Sustain** |
| R&D + BI + Continuous Improvement + Executive Reporting | **Arc VI — Evolve** |

#### Section 2b: The Philosophy (short strip)
A compact, brand-defining strip mapping the triad: **Pragya** (wisdom — the all-knowing point of contact) · **Sheel** (discipline — the loop that acts) · **Karuna** (compassion — the face turned to the world). *Wise within, disciplined throughout, compassionate outward.* (Links to a deeper "philosophy" explainer.)

#### Section 3: The Six Arcs (Card Grid)
Each arc gets a card with:
- Arc name and icon
- One-line description (see Homepage §5)
- Key agents that operate in it (from the Agent Template Library)
- Key tools utilized
- Link to dedicated arc page

#### Section 4: The Master Template Registry
A reference table (from the Sheel blueprint) mapping the single **Loop → Processes → Agents → Skills → Tools**, plus the Agent Template Library by arc. For the detailed evaluator who wants the complete architecture.

#### Section 5: CTA
- "Deploy into Sheel in 10 minutes →"
- "Talk to Pragya about where to start →"

---

### 4.7 INDIVIDUAL ARC PAGES (`/solutions/perceive`, `/solutions/engage`, … `/solutions/evolve`)

**Purpose:** Each of the six **arcs** of Sheel gets a dedicated page showing its agents, skills, actions, tools, and example workflows. These pages follow a consistent template. *(Replaces the Phase 1 per-loop pages; the old loop pages map onto arcs per the sitemap migration note.)*

#### Template Structure (repeated for each arc):

**Section 1: Arc Hero**
- Arc name and tagline
- "Absorbs: [list of traditional departments/roles]"
- "Part of one loop, Sheel" badge + how this arc hands off to the next
- Trigger conditions (what activity flows into this arc)

**Section 2: The Flow**
- Visual DAG/flow diagram showing agents → skills → actions
- Step-by-step walkthrough of how the arc executes within Sheel

**Section 3: Meet the Agents**
- Each agent in the arc gets a card:
  - Name and role title
  - Personality description
  - Communication channels it operates on
  - Key skills it delegates to

**Section 4: Skills & Actions Detail**
- Expandable sections for each skill:
  - What it does
  - Which actions (tools) it invokes
  - Example input → output

**Section 5: Example Scenario**
- A concrete, narrative example of the arc in action:
  - "Day 1: A CSV of 500 target companies is uploaded..."
  - "Hour 2: The Market Intel Scout has enriched 480 records..."
  - "Day 3: The Outbound Prospector has sent 1,200 personalized emails..."
  - "Week 2: 40 qualified leads. 12 demos booked. 3 proposals sent."

**Section 6: Configuration Options**
- Governance settings (max cost, HITL checkpoints)
- Personality tuning for each agent
- Tool binding options

**Section 7: CTA**
- "Activate the [Arc Name] arc →"
- "Talk to Pragya about customizing this arc →"

---

### 4.8 PRICING / ECONOMICS (`/pricing/`)

**Purpose:** Answer the money question. Make the economics undeniable. Convert serious evaluators into buyers.

#### Section 1: Hero
- **Headline:** "Pay for Outcomes. Not Salaries."
- **Subheadline:** "SKU-based pricing. Micro-cent cost tracking. No fixed commitments. Scale up or down instantly."

#### Section 2: How Billing Works
- **The 3-Tier Wallet System:**
  1. **Daily Credits:** Free daily allocation (e.g., $5.00/day) — expires at midnight, doesn't roll over.
  2. **PAYG Wallet:** Top-up funds via Razorpay. Valid 365 days.
  3. **Subscription Credits:** Monthly plans (Starter, Growth, Enterprise) with bonus credits up to 40%.

- **The Billing Formula (simplified for visitors):**
  - "Every task has a base cost. We add a small platform fee. You see the total before it runs."
  - "Voice calls: $X per minute. Email sends: $X per message. Document generation: $X per doc."
  - Full transparency — no hidden fees.
  - **The router is the cost story:** "Each step runs on the cheapest model that will succeed — so you pay frontier-model prices only on the ~10–20% of steps that truly need them. That's why HireBuddha undercuts a flat 'always-premium-LLM' bill while keeping premium quality where it counts."

#### Section 3: Plans Comparison Table
| Feature | Free Tier | Starter | Growth | Enterprise |
|---|---|---|---|---|
| Daily Credits | $5.00 | $5.00 | $5.00 | $5.00 |
| Monthly Credits | — | $XX | $XX | Custom |
| Bonus Credits | — | 10% | 25% | 40% |
| AI Employees | 2 | 10 | 50 | Unlimited |
| Sheel Arcs Active | 1 arc | 3 arcs | All 6 arcs | All 6 + Custom |
| Voice Minutes | 30/month | 500/month | 2,000/month | Unlimited |
| HITL Checkpoints | Basic | Full | Full | Full + Custom |
| Support | Community | Email | Priority | Dedicated |

*(Exact numbers to be finalized based on business model)*

#### Section 4: Interactive ROI Calculator
- **Inputs:** Team size, average salary, number of operational tasks/day, industry
- **Outputs:** 
  - "Current annual cost: $XXX,XXX"
  - "HireBuddha annual cost: $X,XXX"
  - "Annual savings: $XXX,XXX"
  - "ROI: XX,XXX%"
- **Visual:** Animated chart showing cost curves diverging over 12 months

#### Section 5: Cost Comparison — AI vs. Human
| Task | Human Cost | HireBuddha Cost | Savings |
|---|---|---|---|
| Outbound sales call | $15–25 (SDR hourly cost per call) | ~$0.03–0.10 | 99%+ |
| Support ticket resolution | $8–15 (agent + tools) | ~$0.02–0.05 | 99%+ |
| Invoice reconciliation | $20–40 (bookkeeper time) | ~$0.01–0.03 | 99%+ |
| Contract review | $200–500 (legal counsel) | ~$0.50–2.00 | 95%+ |
| Candidate screening call | $30–50 (recruiter time) | ~$0.05–0.15 | 99%+ |

*(Numbers are illustrative — to be validated with real usage data)*

#### Section 6: Minimum Thresholds
- Transparent display of minimum wallet balances required:
  - Process: $0.50 | Agent: $0.05 | Skill: $0.02 | Action: $0.01
  - *(Loop-tier runs aggregate their child Processes; the same per-tier gates apply downward.)*
- **Key message:** "You can start with less than a dollar."

#### Section 7: CTA
- "Start Free — $5 Daily Credits, No Card Required"
- "Talk to Pragya about which plan fits your needs"
- "Schedule a pricing consultation"

---

### 4.9 USE CASES (`/use-cases/`)

**Purpose:** Gallery of industry-agnostic scenarios showing HireBuddha in action.

#### Template per Use Case:
- **Problem statement** (2-3 sentences)
- **Which arc(s) of Sheel solve it**
- **Which agents are involved** (from the Agent Template Library)
- **Step-by-step walkthrough**
- **Expected outcomes** (time saved, cost reduced)
- **CTA:** "Deploy this use case →"

> The Sheel blueprint ships a ~55-item use-case catalog (see [`../product-docs/`](../product-docs/)) — the gallery below is the curated starter set; the full catalog and per-industry blueprints can be paginated in.

#### Initial Use Cases (Generic):
1. "Automate Your Outbound Sales Pipeline" (Engage arc)
2. "Deploy 24/7 Omnichannel Customer Support" (Engage arc / Karuna)
3. "Run End-to-End Financial Reconciliation" (Sustain arc)
4. "Screen and Interview Candidates with AI Voice" (Engage + Sustain arcs)
5. "Automate Contract Review and Compliance" (Sustain arc)
6. "Generate Weekly Executive Briefings" (Evolve arc)
7. "Describe a Goal — Watch the Meta Agent Build the Employee" (Orchestrate arc)

---

### 4.10 IMPACT STORIES (`/stories/`)

**Purpose:** Social proof through narrative case studies.

#### Template per Story:
- **Company profile** (industry, size, challenge)
- **Before state** (the pain, the cost, the bottleneck)
- **HireBuddha deployment** (which loops, which agents, timeline)
- **After state** (metrics: cost saved, time saved, quality improved)
- **Quote from the founder/operator**

*(Initially these may be semi-fictional illustrative stories, clearly labeled as "Illustrative Scenario" until real case studies are available.)*

---

### 4.11 BLOG (`/blog/`)

**Purpose:** SEO + thought leadership + top-of-funnel content.

#### Initial Content Strategy:
1. **"The AI-Native Organization: A First-Principles Guide"** — Long-form thought piece on the paradigm shift from departments to one loop (Sheel). Includes the Pragya·Sheel·Karuna philosophy.
2. **"How Much Does an Employee Really Cost?"** — Data-driven breakdown of total employment cost (feeds into the economics narrative).
3. **"CORTEX: Why AI Memory Changes Everything"** — Technical deep-dive on the 4-tier memory system.
4. **"Sheel: Why Your Whole Company Should Be One Loop"** — Solutions/blueprint as a blog post (SEO play; replaces "7 Business Loops").
5. **"Pragya: Meet the AI That Builds AI"** — Pragya as account manager + the Meta Agent that builds your workforce.
6. **"One Router, Seven Brains: How HireBuddha Cuts AI Costs Without Cutting Quality"** — The Intelligence Engine and the cost story.
7. **"The Self-Improving Company: How the Learning System Makes Week 12 Beat Week 1"** — The Learning System as the moat.

---

### 4.12 PRAGYA'S PAGE (`/pragya/`)

**Purpose:** A dedicated page introducing Pragya — not just as a website feature, but as a core product capability.

#### Content:
- **Who is Pragya:** "Pragya is HireBuddha's account manager — your single point of contact and your first AI Employee. She knows every feature, tool, and arc of Sheel, is backed by CORTEX memory, and commands the **Meta Agent** to create new agents, workflows, and tools on demand. (*Pragya* = wisdom; she is the all-knowing inward face of your business.)"
- **What she does on this website:** Routes, explains, summarizes, consults, generates personalized solutions.
- **What she does inside the product (her real job):** Onboards your business (ingests your knowledge base from files, SharePoint, Notion, Drive, DBs), connects your software (CRM, ERP, accounting, HRMS, invoicing), builds or assigns AI Employees via the Meta Agent, monitors their runs, surfaces HITL approvals, and reports status back — by Meetings, phone, WhatsApp, Slack, or Teams.
- **The proof:** "Everything Pragya does here is powered by the same platform you'll use. She is your first AI Employee — and your account manager for all the rest."
- **Interactive demo:** A full-width Pragya interaction area where visitors can have a real conversation.

---

## 5. Pragya Integration Architecture (Core Site)

### 5.1 Presence Model
- **Widget:** Floating button (bottom-right) on every page. Expands to a sidebar conversation panel.
- **Voice mode:** Microphone button within the widget. Falls back gracefully to text-only if mic access is denied.
- **Homepage embed:** A dedicated inline Pragya section on the homepage (Section 6).
- **Pragya page:** Full-width interaction area.

### 5.2 Core Capabilities (Universal)
| Capability | Example | Implementation |
|---|---|---|
| **Route** | "Take me to pricing" | Pragya triggers client-side navigation to `/pricing/` |
| **Explain** | "What does CORTEX do?" | Pragya retrieves from knowledge base and generates an explanation |
| **Summarize** | "Summarize this page" | Pragya reads the current page's content (structured content API) and generates a summary |
| **Consult** | "I run a logistics company with 12 people. How would this help?" | Pragya maps the user's problem to the relevant arcs of Sheel, agents, and tools |
| **Generate** | "Show me how HireBuddha would handle my invoice collection" | Pragya generates a personalized scenario page (design-system-strict) |
| **Build (preview)** | "Build me an agent that chases overdue invoices" | Pragya invokes the **Meta Agent** to sketch the AI Employee live — a true preview of the in-product build flow |
| **ICP Detect** | (During conversation) "What's your team size?" / "What industry?" | Pragya determines ICP and offers to activate ICP-specific pages |

### 5.3 ICP Detection & Page Surfacing
When Pragya determines the visitor's ICP (through conversation or self-selection):
1. Pragya confirms: *"It sounds like you're a [ICP description]. I can show you content tailored specifically for companies like yours. Would you like that?"*
2. If yes: Navigation gets additional items added (ICP-specific landing page + sub-pages). A subtle indicator shows personalized mode is active.
3. The core site remains fully accessible. ICP pages are *additions*, not replacements.
4. A "Reset to default" option is always available.

### 5.4 Dynamic Page Generation (Fallback)
When a user asks a question with no matching static page:
1. Pragya generates a response using the knowledge base.
2. If the response warrants a structured page (not just a chat answer), Pragya generates it using the design system's component library.
3. The page includes a visible indicator: *"This page was generated by Pragya based on your question."*
4. The page is rendered using pre-built layout templates populated with dynamic content — NOT raw LLM-generated HTML.

---

## 6. Design System Direction

### 6.1 Design Principles
1. **Clarity over cleverness** — Every section should be immediately scannable. No mystery meat navigation.
2. **Depth on demand** — Surface layer is simple and compelling. Expandable sections reveal technical depth for evaluators.
3. **Alive, not animated** — Subtle micro-animations that suggest intelligence and activity. No gratuitous motion.
4. **Premium, not corporate** — This should feel like a next-generation platform, not an enterprise software brochure.

### 6.2 Typography
- **Headlines:** Outfit (modern, warm, confident) — or Space Grotesk (geometric, sharp)
- **Body:** Inter (clean, professional, universally readable)
- **Code/Technical:** JetBrains Mono (for any code snippets, technical callouts, or data displays)

### 6.3 Color Palette (Core — Neutral/Universal)
| Role | Color | Hex | Usage |
|---|---|---|---|
| Canvas | Near-white | `#FAFAF9` | Page backgrounds |
| Canvas (dark sections) | Deep charcoal | `#1C1917` | Hero sections, contrast blocks |
| Primary text | Stone black | `#1C1917` | Headlines, body on light |
| Secondary text | Warm grey | `#78716C` | Captions, metadata |
| Primary accent | Deep indigo | `#4F46E5` | CTAs, links, active states |
| Secondary accent | Warm amber | `#D97706` | Highlights, attention callouts |
| Positive/savings | Teal | `#0D9488` | Savings metrics, positive outcomes |
| Negative/cost | Muted red | `#DC2626` | Cost comparisons, "old way" indicators |
| Pragya accent | Soft violet | `#8B5CF6` | Pragya widget, AI-generated indicators |

### 6.4 Component Library (Key Components)
- **Hero sections** — Full-bleed, optional dark/light variants
- **Feature cards** — Icon + headline + description + link
- **Comparison tables** — Styled, responsive, with highlight columns
- **Expandable sections** — Click-to-reveal depth content
- **Flow diagrams** — Animated, interactive process flows
- **Agent cards** — Avatar + name + role + personality traits
- **Tool cards** — Icon + name + category + one-liner
- **Metric counters** — Animated number tickers
- **ROI calculator** — Interactive form with live output
- **Pragya widget** — Floating sidebar with text + voice input
- **Dynamic page template** — Design-system-strict layout for Pragya-generated pages
- **CTA blocks** — Primary, secondary, and tertiary CTA patterns
- **Trust bar** — Security badges, integration logos, metric callouts

---

## 7. Content Requirements Summary

| Page | Content Type | Estimated Word Count | Priority |
|---|---|---|---|
| Homepage | Marketing copy + visuals | 1,500–2,000 | P0 |
| AI Employees | Technical + functional | 2,000–3,000 | P0 |
| Intelligence & Memory | Technical deep-dive | 2,500–3,500 | P0 |
| Tools & Capabilities | Reference/catalog | 2,000–3,000 | P0 |
| Security & Governance | Technical/compliance | 1,500–2,000 | P0 |
| Solutions Overview | Strategic/narrative | 1,500–2,000 | P0 |
| 6 Arc Pages (Sheel) | Functional/scenario (×6) | 1,500–2,000 each | P1 |
| Pricing | Economic/comparison | 1,500–2,000 | P0 |
| Use Cases (×6) | Scenario/narrative | 800–1,200 each | P1 |
| Impact Stories (×3) | Case study | 1,000–1,500 each | P2 |
| Blog (×5) | Thought leadership | 1,500–2,500 each | P2 |
| Pragya page | Product/narrative | 800–1,200 | P1 |
| About | Company/mission | 500–800 | P2 |

**Estimated total core content: ~40,000–55,000 words**

---

## 8. Key Principles for ICP Concept Layers

The 4 ICP-specific concepts (documented separately) extend this core site by:

1. **Adding pages** — ICP-specific landing pages and sub-pages added to the navigation.
2. **Reframing, not rewriting** — ICP pages share ~60–70% of content with the core site. Only the narrative framing, examples, CTAs, and value propositions differ.
3. **Additive navigation** — The core nav structure remains intact. ICP-specific items are added (e.g., "For Growing Companies" appears in the nav).
4. **Pragya-gated or self-select** — ICP pages are surfaced when Pragya detects the ICP or when the visitor self-selects.
5. **Consistent design system** — ICP pages use the same component library with possible color accent variations to subtly signal the different audience.
