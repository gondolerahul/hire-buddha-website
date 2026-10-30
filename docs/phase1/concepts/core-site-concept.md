# HireBuddha — Core Website Concept Document

> **Version:** 1.0  
> **Date:** June 6, 2026  
> **Status:** Concept — Ready for Review  
> **Scope:** The universal foundation site shared by all ICPs

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
| **Act 2: Belief** | *"How does this actually work? Is it real?"* | Here's the architecture. Here's the intelligence. Here's the hierarchy. Here are the 7 business loops. Here are the tools. This isn't a chatbot — it's a cognitive workforce. | **Product & Solutions sections** |
| **Act 3: Action** | *"What does it cost? Can I afford it? How do I start?"* | Here are the economics. Here's how it compares. Here's your ROI. Start free. | **Economics section** |

### The Pragya Meta-Narrative

Pragya is **not a support chatbot bolted onto a website**. Pragya IS HireBuddha — the platform's built-in meta agent, running live on the actual product, backed by CORTEX memory. The website visitor is interacting with the same intelligence they'd use to build and manage their AI workforce.

This should be stated explicitly on the site:
> *"Pragya is a HireBuddha AI Employee. She runs on the same platform you'll use. Everything she does here — answering your questions, understanding your business, generating solutions — is exactly what your AI workforce will do for your customers."*

This transforms Pragya from a feature into a **proof point**. The demo IS the product.

---

## 3. Site Map (Core)

```
hirebuddha.com/
│
├── / (Homepage)
│
├── /product/
│   ├── /product/ai-employees          (Agent Hierarchy & Anatomy)
│   ├── /product/intelligence           (Memory Architecture & CORTEX)
│   ├── /product/tools                  (Built-in Talent Stack — 20+ tools)
│   └── /product/security               (Security, Governance & Privacy)
│
├── /solutions/
│   ├── /solutions/                     (7 Business Loops Overview)
│   ├── /solutions/growth               (Growth & Customer Acquisition Loop)
│   ├── /solutions/customer-success     (Customer Success & Support Loop)
│   ├── /solutions/fulfillment          (Operational Fulfillment Pipeline)
│   ├── /solutions/finance              (Fiscal & Asset Optimizer)
│   ├── /solutions/compliance           (Regulatory & Compliance Engine)
│   ├── /solutions/talent               (Talent & Resource Alignment Loop)
│   └── /solutions/intelligence         (Self-Optimizing Intelligence Engine)
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
          │           ├── Overview
          │           ├── Growth Loop
          │           ├── Customer Success
          │           ├── Fulfillment
          │           ├── Finance
          │           ├── Compliance
          │           ├── Talent
          │           └── Intelligence Engine
          │
          ├── AI Employees
          ├── Intelligence & Memory
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
- **Visual:** An abstract, animated visualization — 7 glowing loops orbiting a central node (representing the business), with small agent avatars flowing through each loop. Subtle, premium, not cartoonish.
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
| 🧠 AI Employees | "Not chatbots. Cognitive workers." | A 4-tier hierarchy — from strategic Processes to atomic Actions — that thinks, reasons, and self-corrects. | `/product/ai-employees` |
| 🔄 7 Business Loops | "Your entire company. Automated." | 7 cross-functional lifecycles that replace departments with self-running, closed-loop engines. | `/solutions/` |
| 💰 Pay-Per-Outcome | "Pennies per task. Not salaries per head." | SKU-based economics with micro-cent tracking. See your ROI in real-time. | `/pricing/` |

#### Section 4: The "Design → Deploy → Employ" Lifecycle
- **Visual:** A horizontal 3-step flow diagram with subtle animation as each step activates on scroll.
- **Step 1 — Design:** "Name your AI Employee. Define their role. Tune their personality. Bind their tools. Upload your knowledge base. Done in 5 minutes."
- **Step 2 — Deploy:** "Connect phone lines, email, WhatsApp, social channels. Your AI Employee is now live on every channel."
- **Step 3 — Employ:** "Trigger outbound campaigns. Auto-answer inbound. Run background processes. Monitor costs in real-time."
- **CTA:** "See it in action →" (links to a guided product tour or video)

#### Section 5: The 7 Loops (Solutions Preview)
- **Headline:** "7 Autonomous Business Loops. One Platform."
- **Visual:** A circular/orbital diagram with 7 labeled loops. Each loop is clickable and expands to a brief description + link to full page.
- **Brief descriptions (one line each):**
  1. **Growth** — "From cold list to signed contract. Autonomously."
  2. **Customer Success** — "Tickets resolved. Churn prevented. Upsells generated."
  3. **Fulfillment** — "Orders dispatched. Quality verified. SLAs enforced."
  4. **Finance** — "Books reconciled. Invoices chased. Cash flow projected."
  5. **Compliance** — "Contracts reviewed. Risks flagged. Licenses monitored."
  6. **Talent** — "Candidates screened. Interviews conducted. Onboarding automated."
  7. **Intelligence** — "KPIs harvested. Strategies tuned. Executive briefings generated."
- **CTA:** "Explore all 7 loops →"

#### Section 6: Meet Pragya
- **Headline:** "Meet Pragya. Your AI Guide — And Your First AI Employee."
- **Copy:** "Pragya is a live HireBuddha AI Employee, running on the same platform you'll use. She knows every feature, every tool, every business loop. Ask her anything — by text or voice. She's not a chatbot. She's a preview of what your AI workforce will become."
- **Visual:** Pragya avatar + a live interactive demo widget embedded in the section. The visitor can type a question right here without opening the sidebar.
- **Suggested prompts:** "How would HireBuddha help my sales team?" / "Show me the pricing" / "What's the Growth Loop?"
- **Subtext:** *"Everything Pragya does here — answering questions, understanding your context, generating solutions — is exactly what your AI workforce will do for your customers."*

#### Section 7: Social Proof / Trust Bar
- **Metrics:** "X AI Employees deployed" / "X business loops running" / "X minutes of AI voice calls processed"
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
- **Subheadline:** "HireBuddha AI Employees are structured into a 4-tier organizational hierarchy — each tier optimized for a different level of reasoning, autonomy, and tool access."

#### Section 2: The 4-Tier Hierarchy
A visual organizational chart or layered diagram:

| Tier | Name | Role Analogy | What It Does |
|---|---|---|---|
| **Process** | C-Suite Orchestrator | CEO / VP | Coordinates multi-department workflows. Runs DAG-based execution plans with parallel branches, conditional routing, and child agent dispatch. |
| **Agent** | Manager / Department Head | Sales Manager / Support Lead | Manages a communication channel. Maintains conversational state, applies domain guidelines, routes complex tasks to specialists. |
| **Skill** | Specialist / Task Executor | Contract Specialist / Data Analyst | Executes a focused technical task — document generation, data analysis, template processing. |
| **Action** | Individual Worker | API Caller / Tool Operator | Atomic, tool-assisted execution. The interface between AI and external systems. |

- **Design:** Each tier should be expandable to reveal detailed capabilities, example use cases, and configuration options.
- **Key message:** "This hierarchy prevents monolithic prompt sprawl. Strategy stays at the top. Tool execution stays at the bottom. Each layer does what it's built for."

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
- **Visual:** Side-by-side comparison of the same task solved with ReAct vs. CoT.

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
- **Subheadline:** "Most AI forgets everything after each conversation. HireBuddha's 4-tier memory architecture and deliberative reasoning loop mean your AI workforce compounds intelligence over time."

#### Section 2: The 4-Tier Memory System
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

#### Section 3: The AgentLoop — Deliberative Reasoning
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

#### Section 4: Compound Intelligence Over Time
A timeline visualization showing how intelligence compounds:
- **Week 1:** Agent follows instructions. Basic execution.
- **Week 4:** Episodic memory captures patterns. Agent recognizes returning contacts.
- **Week 8:** CORTEX tree builds deep domain context. Agent starts anticipating needs.
- **Week 12:** Self-Optimizing Intelligence Engine tunes agent instructions based on cross-process KPI analysis. Agent performance measurably improves without human intervention.

#### Section 5: Async Child Dispatch
- How processes suspend and resume when spawning child agent runs
- Parent-child cost aggregation
- State serialization and restoration
- **Key message:** "Complex workflows don't block. They branch, execute in parallel, and merge results — automatically."

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

**Creative Studio:**
- Image Generation (Google Gemini Image APIs)
- Video Generation (Google Veo 3.1)

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

#### Section 4: Custom Tools
- "Don't see what you need? Pragya can help you create custom tools."
- Brief explanation of how custom tool registration works
- **Pragya prompt:** "Tell me what system you need to connect to, and I'll help you build a custom tool."

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
- Configurable checkpoints per agent, per action, per process
- Examples: "Pause before sending emails over $10K in value" / "Require approval before contract e-signature routing"
- Slack/Teams integration for HITL approvals (Rich Communication Broker)
- **Key message:** "Your AI workforce doesn't go rogue. It asks permission at every checkpoint you define."

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

**Purpose:** Introduce the 7 Business Loops as HireBuddha's first-principles process redesign. This is the "paradigm shift" page.

#### Section 1: Hero
- **Headline:** "From Departments to Loops. From Silos to Systems."
- **Subheadline:** "Traditional businesses organize into silos. HireBuddha dissolves them into 7 cross-functional, self-optimizing business loops — each one replacing an entire department's workload."
- **Visual:** The "Unified Paradigm" diagram from the Process Redesign document — 3 meta-categories (Growth & Revenue / Ops & Fulfillment / Capital & Safety) feeding into 7 specific loops.

#### Section 2: The Before/After
| Before (Departments) | After (Loops) |
|---|---|
| Marketing + Sales + BDR/SDR + Onboarding | **Growth & Customer Acquisition Loop** |
| Support + CSM + Account Management | **Customer Success & Support Loop** |
| PM + Delivery + QA + Vendor Management | **Operational Fulfillment Pipeline** |
| Bookkeeping + AP/AR + Payroll + Tax | **Continuous Fiscal & Asset Optimizer** |
| Legal + Contract Review + Risk | **Regulatory & Compliance Engine** |
| HR + Recruiting + Onboarding | **Talent Vitality & Resource Alignment** |
| Executive Assistants + Strategy + Analysts | **Self-Optimizing Intelligence Engine** |

#### Section 3: The 7 Loops (Card Grid)
Each loop gets a card with:
- Loop name and icon
- One-line description
- Key agents involved
- Key tools utilized
- Link to dedicated loop page

#### Section 4: The Master Template Registry
A reference table (from the Process Redesign doc) mapping every Process → Agent → Skill → Tool. This is for the detailed evaluator who wants to see the complete architecture.

#### Section 5: CTA
- "Deploy your first loop in 10 minutes →"
- "Talk to Pragya about which loop to start with →"

---

### 4.7 INDIVIDUAL LOOP PAGES (`/solutions/growth`, `/solutions/customer-success`, etc.)

**Purpose:** Each of the 7 loops gets a dedicated page showing its agents, skills, actions, tools, and example workflows. These pages follow a consistent template.

#### Template Structure (repeated for each loop):

**Section 1: Loop Hero**
- Loop name and tagline
- "Replaces: [list of traditional departments/roles]"
- Trigger conditions (what starts this loop)

**Section 2: The Flow**
- Visual DAG/flow diagram showing agents → skills → actions
- Step-by-step walkthrough of how the loop executes

**Section 3: Meet the Agents**
- Each agent in the loop gets a card:
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
- A concrete, narrative example of the loop in action:
  - "Day 1: A CSV of 500 target companies is uploaded..."
  - "Hour 2: The Market Intel Scout has enriched 480 records..."
  - "Day 3: The Outbound Prospector has sent 1,200 personalized emails..."
  - "Week 2: 40 qualified leads. 12 demos booked. 3 proposals sent."

**Section 6: Configuration Options**
- Governance settings (max cost, HITL checkpoints)
- Personality tuning for each agent
- Tool binding options

**Section 7: CTA**
- "Deploy the [Loop Name] →"
- "Talk to Pragya about customizing this loop →"

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

#### Section 3: Plans Comparison Table
| Feature | Free Tier | Starter | Growth | Enterprise |
|---|---|---|---|---|
| Daily Credits | $5.00 | $5.00 | $5.00 | $5.00 |
| Monthly Credits | — | $XX | $XX | Custom |
| Bonus Credits | — | 10% | 25% | 40% |
| AI Employees | 2 | 10 | 50 | Unlimited |
| Business Loops | 1 | 3 | 7 | 7 + Custom |
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
- **Which loop(s) solve it**
- **Which agents are involved**
- **Step-by-step walkthrough**
- **Expected outcomes** (time saved, cost reduced)
- **CTA:** "Deploy this use case →"

#### Initial Use Cases (Generic):
1. "Automate Your Outbound Sales Pipeline" (Growth Loop)
2. "Deploy 24/7 Omnichannel Customer Support" (Customer Success Loop)
3. "Run End-to-End Financial Reconciliation" (Fiscal Optimizer)
4. "Screen and Interview Candidates with AI Voice" (Talent Loop)
5. "Automate Contract Review and Compliance" (Compliance Engine)
6. "Generate Weekly Executive Briefings" (Intelligence Engine)

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
1. **"The AI-Native Organization: A First-Principles Guide"** — Long-form thought piece on the paradigm shift from departments to loops.
2. **"How Much Does an Employee Really Cost?"** — Data-driven breakdown of total employment cost (feeds into the economics narrative).
3. **"CORTEX: Why AI Memory Changes Everything"** — Technical deep-dive on the 4-tier memory system.
4. **"7 Business Loops Every Company Needs"** — Solutions overview as a blog post (SEO play).
5. **"Pragya: Meet the AI That Builds AI"** — Introduction to Pragya as both a product feature and the website companion.

---

### 4.12 PRAGYA'S PAGE (`/pragya/`)

**Purpose:** A dedicated page introducing Pragya — not just as a website feature, but as a core product capability.

#### Content:
- **Who is Pragya:** "Pragya is HireBuddha's built-in meta agent. She knows every feature, every tool, every business loop. She's backed by CORTEX memory and has the ability to create new agents, workflows, and even custom tools."
- **What she does on this website:** Routes, explains, summarizes, consults, generates personalized solutions.
- **What she does inside the product:** Helps you design AI Employees, configure workflows, troubleshoot issues, and optimize performance.
- **The proof:** "Everything Pragya does here is powered by the same platform you'll use. She is your first AI Employee."
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
| **Consult** | "I run a logistics company with 12 people. How would this help?" | Pragya maps the user's problem to relevant loops, agents, and tools |
| **Generate** | "Show me how HireBuddha would handle my invoice collection" | Pragya generates a personalized scenario page (design-system-strict) |
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
| 7 Individual Loop Pages | Functional/scenario (×7) | 1,500–2,000 each | P1 |
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
