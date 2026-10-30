# HireBuddha — Product Functional Documentation

> **Platform Version:** 3.0.0 (GA)
> **Author:** Buddha Cognitive Lab
> **Last Updated:** June 2026
> **Status:** Release-Ready Reference Manual
> **Revision:** Phase 2 — supersedes Phase 1 (2.0.0). Adds the Intelligence Engine (BabyBuddha + frontier models + intelligent router), multimodal generation, the Meta Agent, Pragya (account manager), the Learning System, Generative UI, self-evolving code, dynamic per-tenant schema, and the **Loop** tier of the workforce hierarchy.

---

## 0. What Changed in Phase 2 (Reader's Map)

Phase 1 described HireBuddha as a no-code builder for autonomous AI Employees with a 4-tier hierarchy, a 4-tier memory system, omnichannel presence, and usage-based billing. **All of that remains true and is fully retained in this document.** Phase 2 documents the parts of the live product that the earlier reference manual under-described or omitted:

| # | Capability | Where it lives now |
|---|---|---|
| 1 | **The Intelligence Engine** — flagship hybrid LLM **BabyBuddha** + frontier models (Claude Opus, ChatGPT, Gemini, GLM, Qwen, Mistral) | §3 |
| 2 | **Intelligent Model Router** — complexity- and cost-aware routing | §3.3 |
| 3 | **Image generation** — Gemini Nano Banana, ChatGPT Image, Kling, and others | §3.5 / §6.4 |
| 4 | **Video generation** — Gemini Veo, SeeDance | §3.5 / §6.4 |
| 5 | **Realtime audio** — proprietary **OmniBuddha** + Gemini Live + ChatGPT Realtime | §3.5 / §8.1 |
| 6 | **The Learning System** — continuous, autonomous improvement | §10 |
| 7 | **The Meta Agent** — goal-driven agent that builds AI Employees and tools | §5 |
| 8 | **Generative & Adaptive UI** — interfaces that assemble themselves per user | §11 |
| 9 | **Self-Evolving Code** — agents that rewrite and optimize their own logic | §12 |
| 10 | **Dynamic Per-Tenant Schema** — a data model that grows as the tenant works | §13 |
| 11 | **The Loop tier** — the missing top entity of the workforce hierarchy | §2 |
| 12 | **Pragya** — the account-manager agent and single point of contact | §4 |

---

## 1. Product Paradigm: The Autonomous Digital Workforce

### 1.1 The Business Thesis: "Stop Hiring, Start Deploying"
HireBuddha is built to solve the resource scaling limits of solopreneurs and Small & Medium Enterprises (SMEs). In a traditional organization, expanding operations (e.g., entering new sales territories, scaling customer service, launching multi-channel marketing campaigns) requires a linear increase in human headcount. Human hiring introduces significant frictions:
*   **Recruiting Overhead**: Sourcing, screening, and interviewing candidates.
*   **Training and Onboarding Delay**: A typical employee requires 30 to 90 days to achieve full productivity on company-specific context.
*   **Fixed Salary Commitments**: Payroll, payroll taxes, health insurance, PF contributions, paid leaves, and severance commitments.
*   **Attrition Risk**: Institutional knowledge leaves the company when the employee resigns.
*   **Performance Variance**: Human execution varies based on fatigue, mood, training, and individual capabilities.

HireBuddha replaces the human salary model with the **AI Employee Deployment Model**. Companies do not hire departments; they deploy pre-built, context-trained AI Employees in under 10 minutes — and increasingly, they simply *describe what they need to Pragya* (§4) and the platform builds the workforce for them.

| Dimension | Human Workforce | AI Workforce (HireBuddha) |
|---|---|---|
| **Compensation Model** | Fixed monthly salaries + benefits + overhead. | SKU-based, pay-for-performance cost models (tokens/minutes). |
| **Availability** | 8 hours/day, 5 days/week, excluding holidays. | 24/7/365 continuous operation with zero latency. |
| **Scaling Velocity** | 30 to 90 days of recruitment and onboarding. | Instantaneous duplication (cloning) in <10 seconds. |
| **Operational Consistency** | Subject to human error, cognitive fatigue, and churn. | Deterministic adherence to guidelines and prompt parameters. |
| **Context Retention** | Lost upon resignation or role transition. | Shared, permanent memory (CORTEX) saved in the tenant DB. |
| **Improvement Over Time** | Plateaus; requires retraining and management. | **Compounds autonomously** via the Learning System (§10). |

### 1.2 The Core 3-Step Lifecycle: Design, Deploy, Employ

```mermaid
graph TD
    subgraph 1. DESIGN STAGE
        A[Define Persona Name & Role] --> B[Assign System Prompt Charter]
        B --> C[Configure Personality Sliders]
        C --> D[Bind Built-in/Custom Tools]
        D --> E[Upload Knowledge Base Docs]
    end

    subgraph 2. DEPLOY STAGE
        F[Assign Inbound/Outbound Phone Lines] --> G[Register WhatsApp Business API]
        G --> H[Authenticate SMTP/IMAP Email Accounts]
        H --> I[Link Social Accounts via OAuth 2.0]
    end

    subgraph 3. EMPLOY STAGE
        J[Trigger Outbound Campaigns] --> K[Auto-Answer Inbound Calls/Messages]
        K --> L[Run Background Processes]
        L --> M[Monitor real-time Cost/Run Traces]
    end

    1. DESIGN STAGE --> 2. DEPLOY STAGE
    2. DEPLOY STAGE --> 3. EMPLOY STAGE
```

#### Step 1: Design
Using the **No-Code AI Architect** — or by simply talking to **Pragya** and the **Meta Agent** (§4, §5) — operators design their digital employee:
*   **Name & Title**: Define identities (e.g., "Sarah - Outbound BDR").
*   **System Prompt Charter**: The "job description" defining boundaries, guidelines, logic gates, and explicit behavior parameters.
*   **Personality Matrix**: Precision tuning sliders for Tone, Verbosity, Empathy, Humor, Formality, and Decision Confidence.
*   **Tool Bindings**: Activating tools from the registry (e.g., Web Search, PDF Generator, Sandbox Code Executor).
*   **Knowledge Base Injection**: Uploading business documents to populate semantic vector tables.

> **Phase 2 addition:** Design is no longer strictly manual. A tenant can describe an outcome in natural language ("I need someone to chase overdue invoices in INR and escalate after 14 days"), and the **Meta Agent** iterates an agentic build-loop until it produces a fully-configured AI Employee or tool that satisfies the goal. The No-Code AI Architect remains available for hands-on editing of everything the Meta Agent generates.

#### Step 2: Deploy
Connecting the virtual employee to communication networks:
*   **Voice Integration**: Purchasing Twilio, smartflo (Tata Tele), or Exotel lines.
*   **Messaging**: Authorizing Twilio WhatsApp Business APIs.
*   **Email**: Providing SMTP/IMAP credentials with secure app-specific passwords.
*   **Social & Ad Channels**: Authorizing OAuth connections to LinkedIn, Facebook, Google Ads, and YouTube.

#### Step 3: Employ
Activating the AI:
*   Inbound channels answer automatically and process messages.
*   Outbound engines dial contact campaigns, run lead qualifiers, and draft proposals.
*   The system updates credit wallets and streams real-time execution logs (SSE traces).

---

## 2. The AI Workforce Hierarchy

HireBuddha structures autonomous agents into an organizational hierarchy. This hierarchy avoids monolithic prompt sprawl, separating macro strategy from micro tool invocation.

> **Phase 2 correction:** Phase 1 documented **four** tiers (Action, Skill, Agent, Process). The live platform has **five**. The top entity — **Loop** — was omitted. A Loop is the highest organizational unit: a self-perpetuating department made of Processes. The seven business Loops shipped with the product (Growth, Customer Success, Fulfillment, Finance, Compliance, Talent, Intelligence) are instances of this tier.

```
┌────────────────────────────────────────────────────────┐
│                          LOOP                          │
│  - Scope: An entire self-running business function     │
│  - Example: "Growth & Customer Acquisition Loop"       │
│  - Composed of: multiple Processes                     │
├────────────────────────────────────────────────────────┤
│                        PROCESS                         │
│  - Goal: "Reactivate stale Q1 leads"                   │
│  - Executor: DAG / Parallel Steps / Debate             │
├────────────────────────────────────────────────────────┤
│                         AGENT                          │
│  - Role: Outbound Telephony SDR                        │
│  - Executor: Dialog / SingleStep                       │
├────────────────────────────────────────────────────────┤
│                         SKILL                          │
│  - Objective: Draft customized proposals              │
│  - Executor: ToolBurst / SingleStep                    │
├────────────────────────────────────────────────────────┤
│                         ACTION                         │
│  - Task: "Compute loan ROI case"                       │
│  - Executor: Built-in Tool Call (thin wrapper on a Tool)│
└────────────────────────────────────────────────────────┘
```

**The composition rule, bottom-up:**
> An **Action** is a thin wrapper around a **Tool**. A combination of Actions becomes a **Skill**. A few Skills together form an **Agent**. A few Agents together form a **Process**. A few Processes together form a **Loop**.

### 2.1 The Five Organizational Tiers

#### 1. Loop (The Department / Standing Function)
A **Loop** is a continuously-running business function — the largest unit of work in the platform. Where a Process completes and ends, a Loop *persists*: it owns goals, KPIs, schedules, and a portfolio of Processes that fire on triggers, timers, and events. A Loop is what a human would call "the Sales department" or "the Finance function."
*   *Example*: The **Growth & Customer Acquisition Loop** owns lead generation, qualification, nurture, and conversion Processes, runs them on its own cadence, and reports its pipeline KPIs upward.
*   *Behavior*: Maintains long-horizon objectives and memory across all its Processes, schedules and re-triggers Processes (via the Chronos Daemon), aggregates cost and outcome metrics for the whole function, and is the unit Pragya reasons about when she tells a tenant "your Growth function closed 14 deals this week."
*   *The 7 shipped Loops*: Growth & Customer Acquisition, Customer Success & Support, Operational Fulfillment, Continuous Fiscal & Asset Optimizer (Finance), Regulatory & Compliance Engine, Talent Vitality & Resource Alignment, and the Self-Optimizing Intelligence Engine.

#### 2. Process (C-Suite Orchestrator)
A **Process** represents a macro business workflow. It coordinates multiple departments (Agents) or operations (Skills).
*   *Example*: "Quarterly Lead Nurture and Activation Campaign".
*   *Behavior*: Receives target inputs (e.g., CSV lists), creates a dynamic dependency graph, schedules child runs, handles parallel branches, and summarizes final business outcomes.

#### 3. Agent (Manager / Department Head)
An **Agent** manages a specific communication channel or domain, maintaining conversational state and applying domain guidelines.
*   *Example*: "Sarah - Lead Qualification Phone Rep".
*   *Behavior*: Answers phone calls, maintains a running dialog, reads user intent, searches KB documents, and routes complex requests to specialists.

#### 4. Skill (Specialist / Task Executor)
A **Skill** is an optimized block of logic focused on a single technical task.
*   *Example*: "Contract Generation & E-Signature Routing".
*   *Behavior*: Takes raw customer variables, parses templates, runs math calculations, creates documents, and delivers them via email or API.

#### 5. Action (Individual Worker)
An **Action** is an atomic, tool-assisted execution — a thin wrapper around a single registered **Tool**. It represents the interface between the AI Engine and external systems.
*   *Example*: "Query Salesforce for Company ID".
*   *Behavior*: Calls a registered tool, validates formats, handles timeouts, and reports outputs.

### 2.2 Execution Reasoning Modes
The hierarchy matches reasoning strategies to step complexity:
*   **ReAct (Reason-then-Act)**: The engine decides which tool to call, runs the tool, observes the results, and loops until complete. Best for linear tasks and database operations.
*   **Chain-of-Thought (CoT)**: The model writes out its step-by-step logic explicitly before generating final outputs. Best for document drafting and legal review.
*   **Debate / Multi-Path**: Multiple candidate reasoning paths are generated and a critic selects or synthesizes the best — used at Process and Loop tiers for high-stakes decisions.

Every reasoning step is executed by a model chosen at runtime by the **Intelligent Model Router** (§3.3), not a single hardcoded LLM.

---

## 3. The Intelligence Engine

> **Phase 2 — major addition.** Phase 1 treated "the LLM" as a single, mostly-implicit dependency (Gemini). In the live product, intelligence is a *first-class subsystem*: a fleet of models — led by our own flagship **BabyBuddha** — fronted by an **Intelligent Model Router** that picks the right model for every single step based on task complexity and cost.

### 3.1 BabyBuddha — The Flagship Hybrid LLM
**BabyBuddha** is Buddha Cognitive Lab's proprietary hybrid large language model and the default brain of the platform. It is purpose-built — and post-trained — for the work HireBuddha actually does:
*   **Agentic task execution**: long-horizon, multi-step plans that call tools, wait on results, and adapt.
*   **Tool calling**: reliable, schema-faithful function calling with low malformed-call rates, including parallel tool calls.
*   **Reasoning**: deliberative, step-by-step problem solving tuned for the 8-stage AgentLoop (§7).

"Hybrid" refers to BabyBuddha's dual-mode operation: it runs in a **fast/low-cost mode** for routine, well-structured steps and switches to an **extended-reasoning mode** for hard planning and critic stages — without leaving the model family. BabyBuddha handles the majority of platform volume; frontier models are called in when the router decides the task warrants them.

### 3.2 The Frontier Model Fleet
BabyBuddha is complemented by a curated fleet of best-in-class frontier models, each available to any AI Employee:
*   **Claude Opus** (Anthropic) — deep reasoning, long-context analysis, careful drafting and review.
*   **ChatGPT / GPT** (OpenAI) — broad general capability and strong tool use.
*   **Gemini** (Google) — multimodal grounding, fast inference, native Live voice.
*   **GLM** (Zhipu) — strong cost-performance for high-volume tasks.
*   **Qwen** (Alibaba) — multilingual strength and efficient open-weight options.
*   **Mistral** — lightweight, low-latency models for cheap, high-throughput steps.

Tenants are never locked to one vendor. An Agent can be *pinned* to a preferred model, or — by default — left on **Auto**, where the router decides per step.

### 3.3 The Intelligent Model Router
The **Intelligent Model Router** sits in front of every reasoning call. For each step it scores the task and routes it to the model that best balances **capability, cost, and latency**.

```
            ┌──────────────────────────────────────────────┐
   Step ───►│           INTELLIGENT MODEL ROUTER           │
            │  Signals:                                    │
            │   • Task complexity (planning vs. extraction)│
            │   • Tier (Action…Loop) & reasoning mode      │
            │   • Required context length / multimodality  │
            │   • Tool-calling demands                      │
            │   • Tenant cost ceiling & wallet state        │
            │   • Latency budget (e.g. live voice = strict)│
            │   • Historical model performance on this task│
            └───────────────────┬──────────────────────────┘
                                │ selects
   ┌──────────┬──────────┬──────┴─────┬──────────┬──────────┬──────────┐
   ▼          ▼          ▼            ▼          ▼          ▼          ▼
BabyBuddha  Claude     ChatGPT     Gemini      GLM        Qwen     Mistral
(fast/      Opus        /GPT                                       (cheap,
 extended)                                                          fast)
```

**How routing decisions are made:**
*   **Cheap by default**: routine extraction, classification, formatting, and simple tool calls go to low-cost models (Mistral, GLM, BabyBuddha-fast).
*   **Escalate on complexity**: planning, multi-constraint reasoning, legal/financial drafting, and critic stages escalate to BabyBuddha-extended or a frontier model (often Claude Opus).
*   **Match the modality**: multimodal grounding routes to Gemini; ultra-low-latency conversational turns route to models with realtime profiles.
*   **Respect the wallet**: when a tenant's cost ceiling or remaining balance is tight, the router prefers cheaper models and downshifts gracefully rather than failing.
*   **Learn from outcomes**: the Learning System (§10) feeds back which models actually succeeded on which task shapes, so routing improves over time.

**Why it matters to the tenant:** the same workflow that would cost a flat "always-GPT-4-class" price elsewhere is, on HireBuddha, executed at a fraction of the cost — because 80–90% of steps don't need a frontier model, and the router knows which ones do. Tenants get frontier-grade quality *only where it counts*, billed transparently per the cost formula in §14.

### 3.4 Model Governance & Fallbacks
*   **Pinning & allow-lists**: tenants and partners can restrict which models are eligible (e.g., data-residency or compliance requirements may exclude certain providers).
*   **Automatic fallback**: if a provider is rate-limited or unavailable, the router transparently fails over to the next-best eligible model.
*   **Full attribution**: every step's chosen model, token count, and cost are recorded in the execution ledger and visible in run traces.

### 3.5 Multimodal Generation (Overview)
Beyond text reasoning, the Intelligence Engine brokers **image, video, and realtime-audio** generation through the same router-and-fallback philosophy. These are summarized here and detailed in §6.4 (Creative Studio) and §8.1 (Voice):

*   **Image Generation** — Google **Gemini Nano Banana**, **ChatGPT Image**, **Kling**, among others. Routed by style, fidelity, speed, and cost.
*   **Video Generation** — Google **Veo** and **SeeDance**. Routed by duration, fidelity, and motion complexity.
*   **Realtime Audio** — our proprietary **OmniBuddha** model alongside **Gemini Live** and **ChatGPT Realtime**. Routed by latency budget, language, and voice persona.

---

## 4. Pragya — The Account Manager & Single Point of Contact

> **Phase 2 — major addition.** Phase 1 documented Pragya only as a website demo widget. In the product, **Pragya is the tenant's account manager**: a single, always-on, real-time conversational agent who is the one relationship a tenant has to maintain. The tenant talks to Pragya exactly as they would talk to a remote employee — and Pragya marshals the entire platform on their behalf.

### 4.1 What Pragya Is
Pragya is the **single point of contact** for the tenant. A business owner does not learn the platform's internals, click through builders, or manage a roster of bots. They simply *talk to Pragya* — by voice, text, or phone — and she runs the rest of HireBuddha for them: onboarding, integrations, building employees (via the Meta Agent), assigning work, and reporting back.

She is a real-time conversational AI Employee (Agent tier) with the highest level of platform access among tenant-facing agents, scoped strictly to that tenant.

### 4.2 How the Tenant Reaches Her — Like a Remote Worker
A tenant interacts with Pragya through the same channels they'd use with a human remote employee:
*   **Meetings (our frontend)** — a live, face-to-face style console with voice and screen context (the primary experience).
*   **A normal phone call** — call Pragya's number and talk to her like any colleague.
*   **WhatsApp, Slack, Microsoft Teams**, and email — message her where the tenant already works.

Pragya holds continuous context across all of these channels (episodic + CORTEX memory), so a conversation started on a call can continue on WhatsApp without repeating anything.

### 4.3 What Pragya Does — The Account Manager Lifecycle

```mermaid
graph LR
    A[Onboard: ingest knowledge base] --> B[Connect business software]
    B --> C[Capture requirements]
    C --> D{Need a new capability?}
    D -- Yes --> E[Build new AI Employee/tool via Meta Agent]
    D -- No --> F[Assign work to existing employees]
    E --> G[Monitor execution]
    F --> G
    G --> H[Report status back to tenant]
    H --> C
```

**1. Onboarding — ingest the knowledge base.**
Pragya helps the tenant bring in everything the workforce needs to know: file uploads (PDF, DOCX, spreadsheets), and connected sources such as **SharePoint, Notion, Google Drive, and databases**. She ingests, chunks, and indexes this into Semantic + CORTEX memory (§9), building the tenant's institutional knowledge.

**2. Integration — connect the tenant's software.**
Based on what the business needs, Pragya guides the tenant through connecting their existing systems: **CRM, ERP, Accounting, HRMS, Invoicing**, and more (via OAuth and the tool registry, §6). She only asks for what the requirements actually demand — no blanket setup.

**3. Requirements capture.**
Pragya interviews the tenant about their goals, pains, and priorities — mapping them to the platform's Loops and Processes — exactly as an account manager would scope work with a client.

**4. Build or assign.**
For each requirement, Pragya either:
*   **Creates new AI Employees or tools** by handing the goal to the **Meta Agent** (§5), which iterates until the employee/tool is correct; or
*   **Assigns the work to existing AI Employees** already deployed in the tenant's workspace.

**5. Monitor & report.**
Pragya watches the resulting runs, and **reports back to the tenant with status** — proactively ("Your invoice-chaser recovered ₹2.4L this week; 3 accounts need your sign-off") and on demand ("How's outbound doing?"). She surfaces HITL checkpoints (§15) to the tenant for approval.

### 4.4 Why This Matters
Pragya collapses the entire operating surface of a powerful platform into **one relationship**. The tenant manages their AI workforce the way they'd manage a trusted chief-of-staff: by conversation. Everything in this document — the hierarchy, the Intelligence Engine, the Meta Agent, the tools, the loops — is reachable through Pragya without the tenant ever needing to touch it directly.

---

## 5. The Meta Agent — The Agent That Builds Agents

> **Phase 2 — major addition.** Phase 1 mentioned a "no-code architect" but did not explain the autonomous builder behind it. The **Meta Agent** is the system that understands a tenant's goal and *constructs* the AI Employee or tool to achieve it.

### 5.1 What It Does
The Meta Agent takes a **goal in natural language** (usually relayed by Pragya, §4) and runs its own agentic loop to design, assemble, test, and refine a working AI Employee — or a brand-new tool — until the result actually satisfies the goal.

It does not produce a one-shot guess. It **iterates**:

```
GOAL ──► Draft entity (charter, personality, tools, hierarchy, IO contract)
   ▲                          │
   │                          ▼
   │                   Dry-run / simulate against the goal
   │                          │
   │                          ▼
   └──── Critique & revise ◄── Did the output satisfy the goal?
                              │  (gaps, missing tools, wrong tier,
                              │   bad routing, failed test cases)
                              ▼
                        YES → Publish entity (or tool) to the tenant workspace
```

### 5.2 The Build Loop
1.  **Understand the goal** — decompose the desired outcome into required capabilities, data, channels, and constraints.
2.  **Choose the structure** — decide the right tier(s): a single Skill, a full Agent, a multi-agent Process, or a whole Loop. Apply the composition rule from §2.
3.  **Assemble** — write the system-prompt charter, set the Personality Matrix, bind existing tools, and **generate new tools/code where none exist** (see Self-Evolving Code, §12).
4.  **Wire intelligence** — set reasoning modes and router preferences for each step.
5.  **Simulate & test** — run the candidate against representative inputs and self-generated test cases.
6.  **Critique & iterate** — identify gaps and loop back to step 2/3 until the acceptance criteria are met.
7.  **Publish** — register the finished, versioned entity into the tenant's workspace, ready to employ.

### 5.3 Where It Fits
The Meta Agent is the engine behind both the conversational build path (Pragya → "build me an X") and the No-Code AI Architect's "generate" actions. Whatever it produces is fully editable by hand afterward — the Meta Agent gives tenants a correct, working starting point, not a black box.

---

## 6. The Built-In Talent Stack (Tools)

HireBuddha provides virtual employees with **20+ built-in tools** out of the box, organized by capability. Tools are the substrate that Actions wrap (§2). The registry is extensible — the Meta Agent can add new tools on demand (§12).

### 6.1 Web Intelligence Suite

#### Web Search
*   *Functional Purpose*: Real-time internet search to fetch updated data (e.g., company news, market capitalization, competitor pricing).
*   *Providers*: DuckDuckGo API (default), Google Custom Search API.
*   *Inputs*: Raw text search query.
*   *Outputs*: Markdown-formatted search result snippets with titles and source URLs.

#### Web Scraper
*   *Functional Purpose*: Downloads the text contents of a target webpage.
*   *Backend*: Beautiful Soup and Firecrawl API.
*   *Inputs*: Target URL.
*   *Outputs*: Cleaned, markdown-rendered text of the webpage, filtering out headers, footers, and scripts.

#### Headless Browser
*   *Functional Purpose*: Interacts with dynamic, JavaScript-rendered websites.
*   *Backend*: Playwright.
*   *Capabilities*: Click elements, fill forms, scroll pages, wait for network idle, capture screenshots, and download files.
*   *Inputs*: JSON-structured action block (e.g., `{"actions": [{"type": "navigate", "url": "..."}, {"type": "click", "selector": "#submit-btn"}]}`).
*   *Outputs*: Target text, HTML source, or binary image of the page view.

### 6.2 Email Operations Suite

```
  [ INCOMING EMAIL ] ──► IMAP Ingest ──► Classify ──► KB Lookup ──► Draft ──► SMTP Send
```

*   **Email Ingest**: Connects to the user's Gmail/Outlook via IMAP, fetching unread messages.
*   **Email Classify**: Analyzes incoming subject lines and body copy for:
    *   *Sentiment*: Positive, Neutral, Negative, Angry.
    *   *Urgency*: Low, Medium, High, Immediate.
    *   *Intent Category*: Support, Sales Pitch, Billing Query, Spam, General.
*   **Email Draft**: Generates contextual, brand-aligned email drafts based on semantic KB documentation.
*   **Email Send**: Transmits messages via SMTP.

### 6.3 Document & Data Factory

#### Excel Tool
*   *Functional Purpose*: Modifies, parses, and creates spreadsheet files.
*   *Backend*: `openpyxl`.
*   *Capabilities*: Auto-injects formulas, applies font weights, formats tables, and creates chart tabs.
*   *Inputs*: JSON matrix of rows and cell properties.

#### PDF Generator
*   *Functional Purpose*: Creates formatted corporate PDFs.
*   *Backend*: `WeasyPrint` (HTML-to-PDF rendering engine).
*   *Input*: HTML/CSS templates containing dynamic context variables (e.g., `{{client_name}}`).

#### Word (DOCX) Generator
*   *Functional Purpose*: Generates Microsoft Word document templates.
*   *Backend*: `python-docx`.
*   *Input*: JSON structure describing paragraphs, tables, lists, and formatting.

#### PowerPoint (PPTX) Generator
*   *Functional Purpose*: Compiles presentations.
*   *Backend*: `python-pptx` (Python) and `pptxgenjs` (Frontend export).
*   *Input*: Slide definitions, titles, body lists, and style properties (colors, fonts).

#### File Writer
*   *Functional Purpose*: Writes arbitrary text, CSV data, or code to local tenant workspaces.

### 6.4 Creative Studio

> **Phase 2 update:** Creative generation is multi-provider and router-brokered (§3.5), not single-vendor.

*   **Image Generation**: Generates marketing banners, social cards, product mockups, and creative assets. **Providers: Google Gemini Nano Banana, ChatGPT Image, Kling**, among others. The router selects per request by desired style, fidelity, speed, and cost; providers fail over automatically.
*   **Video Generation**: Generates high-fidelity short marketing videos and animations from prompt briefs. **Providers: Google Veo and SeeDance.** Routed by clip duration, motion complexity, and fidelity target.
*   **(Realtime audio** is documented under Omnichannel Voice, §8.1.)

### 6.5 Precision & Dev Tools
*   **Calculator**: Evaluates complex mathematical formulas safely (e.g., compound interest, ROI splits), avoiding model math errors.
*   **Sandbox Code Executor**: Runs arbitrary Python code inside a secure, isolated container/subprocess sandbox. Ideal for data scrubbing, complex calculations, or regex processing.
*   **Terminal Tool**: Runs shell commands inside a sandbox to run scripts, CLI commands, or interface with external servers.

### 6.6 Other Tools

| Target Domain / Re-Engineered Loop | Other Tool / Action Name | Functional Technical Capability | Primary Industry API / Standard Protocol | Cross-Functional Workflow Dependency |
| :--- | :--- | :--- | :--- | :--- |
| **Finance & Accounting** | **Bank Feed Synchronizer** | Pulls real-time bank statement lines, checks wire settlement status, and reconciles balances against open ledger invoices. | Plaid API, Yodlee API | Reconciles accounts instantly when *Customer Success* flags a payment or *Sales* closes a contract. |
| **Finance & Accounting** | **Global Payout Rails** | Executes programmatic vendor distributions, payouts, and multi-currency contractor clearings. | Stripe Payouts, Wise API, PayPal Developer API | Triggers cash disbursements automatically when *Operations* validates a supplier invoice. |
| **Finance & Accounting** | **Automated Tax Matrix** | Dynamically calculates global localized sales tax, VAT, corporate withholding, and compliance percentages per jurisdiction. | Avalara AvaTax API, TaxJar API | Feeds verified financial variables directly into the **PDF Generator** for real-time invoice creation. |
| **Legal & Compliance** | **Cryptographic E-Signature Handler** | Generates contract templates with dynamic parameters, sets coordinate-based sign anchors, routes bundles, and listens for status updates. | DocuSign REST API, HelloSign (Dropbox Sign) API | Connects to the **Word (DOCX) Generator** to finalize contracts after legal approvals. |
| **Legal & Compliance** | **Entity Identity Verification Gateway** | Autonomously checks business registrations, validates state filings, runs anti-money laundering (AML) lists, and performs deep KYB screens. | Middesk API, Persona API | Pauses B2B client activation loops at a **Human-in-the-Loop (HITL) Checkpoint** if verification parameters fail. |
| **Human Orchestration** | **Rich Communication Broker** | Bypasses simple email queues to post interactive diagnostic cards with buttons directly into corporate communication spaces. | Slack Block Kit API, Microsoft Teams Adaptive Cards | Acts as the primary interactive mechanism for triggering, managing, and clearing **HITL Checkpoints**. |
| **Human Orchestration** | **Internal Helpdesk Route-and-Lock** | Maps system operational exceptions or engineering dependencies discovered during process runs to software engineering tracking systems. | Jira Service Management API, Linear API | Connects *Customer Success* triage agents to technical *Operations* branches automatically. |
| **Sales & Marketing** | **Enrichment & Signal Harvester** | Queries cold domains or raw email inputs to extract company headcount, current engineering tech stacks, and active buyer intent signals. | Apollo.io API, Clearbit Enrichment, ZoomInfo API | Feeds rich demographic data into the **Email Operations Suite** to draft hyper-personalized prospecting sequences. |
| **Sales & Marketing** | **Calendar Matrix Orchestrator** | Coordinates meeting links, scans complex internal availability grids for multiple stakeholders, and locks down calendar events. | Google Calendar API, Microsoft Graph API (Outlook) | Bridges *Sales Qualification Phone Reps* to face-to-face video demos inside outbound voice campaigns. |
| **Operations & HR** | **HRIS Core Accessor** | Syncs internal company directories, maps organizational hierarchies, updates time-off rosters, and manages benefit tracking data. | Gusto API, Rippling API, BambooHR API | Used by *HR* onboarding processes to initialize application accounts or assign hardware assets. |
| **Operations & Supply Chain**| **Warehousing & Inventory Oracle** | Checks physical stock allocations, updates inventory ledgers, and generates fulfillment shipping tags. | ShipStation API, Shopify Inventory API | Syncs directly with *Sales* processing agents to prevent the platform from selling out-of-stock items. |
| **Knowledge & Onboarding** | **Knowledge Source Connectors** | Ingests and continuously syncs tenant knowledge from document stores and databases into Semantic + CORTEX memory. | SharePoint, Notion, Google Drive, SQL/NoSQL DB connectors | Used by **Pragya** (§4) during onboarding to build the tenant's institutional knowledge base. |
| **Business Systems** | **Enterprise System Connectors** | Authenticated read/write bridges into the tenant's operational software of record. | CRM, ERP, Accounting, HRMS, Invoicing APIs | Connected by **Pragya** based on captured requirements; consumed by Loop/Process runs. |
| **Platform Primitives** | **Chronos Daemon** | Schedules future tool callbacks or execution wake-ups without blocking runtime background worker threads. | Arq / Redis Delayed Jobs Engine, Celery Beat | Enables delayed follow-ups (e.g., "Wait 48 hours and check email ingest") and powers Loop scheduling without locking process nodes. |

---

## 7. Deliberative Cognition: The 8-Stage AgentLoop

Every AI Employee runs through an **8-stage cognitive loop** on every execution step. The loop isn't "prompt → response" — it's a full reasoning cycle with built-in quality control. Each stage's reasoning call is routed through the Intelligent Model Router (§3.3).

```
Perceive → Strategize → Pre-Critic → Act → Observe → Post-Critic → Reflect → Decide
```

1.  **Perceive** — load inputs, semantic chunks, and updates; build the active context for this step.
2.  **Strategize** — select the next action; evaluate retry queues; decide which tool to call or which sub-agent to dispatch.
3.  **Pre-Critic** *(Safety Gate)* — audit the selected action *before* execution. If the Pre-Critic blocks 3 consecutive actions, a circuit breaker trips and execution halts.
4.  **Act** — execute the step: call the tool, make the call, send the email, run the code.
5.  **Observe** — process results; check for errors, unexpected outputs, or runtime blocks.
6.  **Post-Critic** *(Quality Check)* — the supervisor verifies alignment with the goal, logs token usage, and schedules retries if needed.
7.  **Reflect** — write a logical reflection back to CORTEX tree memory (what worked, what didn't, what to change). This is a key feed into the Learning System (§10).
8.  **Decide** — set the next state: **CONTINUE**, **REPLAN**, **DONE**, or **ABORT**.

> *Your AI workforce audits its own decisions before AND after execution. The Pre-Critic catches mistakes before they happen; the Post-Critic catches drift before it compounds; CORTEX stores the lessons.*

---

## 8. Omnichannel Presence & Outbound Campaigns

HireBuddha integrates agents into standard communications systems, enabling outbound call routing and messaging.

### 8.1 Real-Time Voice Calls (Speech-to-Speech)
HireBuddha voice agents can communicate via telephone with low latency.

```
 [ Carrier / Twilio ] ◄── SIP / WS ──► [ Unified Gateway ] ◄── PCM Stream ──► [ Realtime Audio Engine ]
                                                                                   │
                                                                                   ▼
                                                                           [ Voice Persona ]
```

*   **Bidirectional PCM Streaming**: Audio streams over secure WebSockets in 20ms chunks, avoiding the delay of text-to-speech.
*   **Supported Realtime Audio Engines** *(Phase 2 update)*:
    1.  **OmniBuddha (Buddha Cognitive Lab)** — our proprietary realtime speech-to-speech model. The default engine: tuned for natural, low-latency conversation, multilingual (including Indian languages and code-switching), and tightly integrated with the AgentLoop and tool calls mid-conversation.
    2.  **Google Gemini Live (Vertex AI)** — low-latency voice calling across 18 unique voices.
    3.  **OpenAI / ChatGPT Realtime** — high-fidelity realtime voice using GPT voice presets (available via Azure OpenAI Realtime).
*   The realtime audio engine for a given call is selected by the router (§3.3) based on **latency budget, language, voice persona, and cost** — and fails over automatically.
*   **Telephony Integrations**: Twilio, Smartflo (Tata Tele), and Exotel.
*   **Voice Personas**: Custom voice profiles allow operators to adjust speaking rates (0.5x to 2.0x) and pitch shifts.
*   **Voice Activity Detection (VAD)**:
    *   *Start of Speech Sensitivity*: Set to `HIGH` for fast barge-in detection when a user interrupts.
    *   *End of Speech Sensitivity*: Set to `LOW` to prevent cutting off the speaker during natural pauses.
    *   *Silence Duration*: 1000ms threshold before the agent starts its response.

> Pragya (§4) uses this same realtime audio stack — which is why a tenant can simply *phone their account manager*.

### 8.2 Outbound Campaigns
The Outbound Campaign Engine automates call outreach.
*   **CSV Import & Validation**: Automatically parses numbers, checks formatting, and matches country codes.
*   **Concurrency Throttling**: Limits concurrent dial channels (e.g., maximum 15 parallel calls) to stay within carrier limits.
*   **Real-time Campaign Dashboard**: Monitors contact list completion, conversion rates, cost-per-minute, and overall sentiment.

---

## 9. The AI Mind: Memory & Personality Design

### 9.1 The 4-Tier Memory System

```
  ┌────────────────────────────────────────────────────────┐
  │ 1. Working Memory (Temporary Run context)             │
  ├────────────────────────────────────────────────────────┤
  │ 2. Episodic Memory (10 latest user-agent conversations) │
  ├────────────────────────────────────────────────────────┤
  │ 3. Semantic Memory (Vector search over company files)  │
  ├────────────────────────────────────────────────────────┤
  │ 4. CORTEX Tree Memory (Hierarchical cognitive context) │
  └────────────────────────────────────────────────────────┘
```

#### 1. Working Memory
Temporary scratchpad context used during a single run iteration. Contains template inputs, loop iteration metrics, and current step calculations.

#### 2. Episodic Memory
Stores conversational history. The memory router pulls the last 10 interactions per contact/agent to maintain conversation continuity.

#### 3. Semantic Memory (Knowledge Base)
Supports PDF, DOCX, TXT, and CSV file uploads — plus connected sources (SharePoint, Notion, Drive, databases) ingested by Pragya.
*   **Chunking & Embedding**: Documents are chunked into 500-character segments with 10% overlap, converted to 768-dimension vectors using Gemini's `text-embedding-004`, and stored in a PostgreSQL database via `pgvector`.
*   **Context Retrieval**: When a query occurs, the system runs a cosine similarity vector search, ranking relevant document chunks.

#### 4. CORTEX Memory (Cognitive Tree)
A hierarchical tree memory structure that manages context windows for long-running workflows.
*   **Nodes Hierarchy**: Organizes information into nodes: `root`, `knowledge`, `finding`, `task`, `output`, and `checkpoint`.
*   **Viewport Slicing**: The perceiver selects relevant path segments from the tree, avoiding LLM context limit issues.
*   **Auto-Checkpointing**: Generates summary nodes when the context reaches the threshold (default: 8,000 tokens), preserving historical progress.

### 9.2 Personality Design Matrix
Every virtual employee is configured via a sliding-scale Personality Matrix:
*   **Tone**: Slider ranges between Professional, Friendly, Empathetic, and Assertive.
*   **Verbosity**: Controls response brevity (Concise, Moderate, or Verbose).
*   **Empathy**: Scales emotional response matching (0.0 to 1.0).
*   **Humor**: Scales wit and playfulness (0.0 to 1.0).
*   **Formality**: Configures casual vs. formal language styles.
*   **Custom Rules**: Specific behavioral parameters (e.g., "Never discuss competitor pricing; always direct to support").

---

## 10. The Learning System — Intelligence That Compounds

> **Phase 2 — major emphasis.** Phase 1's tech doc mentioned learning only in passing. In reality, continuous learning is the platform's signature advantage and is treated here as a flagship capability: **Week 12 is measurably smarter than Week 1 — with no human intervention.**

### 10.1 The Core Promise
Most AI tools are stateless: they forget everything after each conversation and never improve. HireBuddha's workforce does the opposite — it **compounds intelligence over time**. Every run leaves the system smarter than it found it.

### 10.2 What Drives the Learning
The Learning System continuously harvests signal from across the platform and folds it back into how the workforce behaves:
*   **Reflections from the AgentLoop** — the Reflect stage (§7.7) writes "what worked / what didn't" into CORTEX after every step.
*   **Outcome data** — which Processes hit their KPIs, which calls converted, which emails got replies, which reconciliations were clean.
*   **Critic verdicts** — patterns in what the Pre-/Post-Critics block or correct.
*   **Router performance** — which models succeeded or failed on which task shapes (feeds back into §3.3).
*   **Human feedback** — HITL approvals, edits, and rejections become training signal.

### 10.3 How It Improves the Workforce
*   **Compounding memory (CORTEX)** — accumulated domain knowledge, cross-run patterns, and decision reflections make agents *anticipate* rather than merely react.
*   **Self-Optimizing Intelligence Engine** — analyzes cross-process KPIs and **tunes agent instructions/charters** based on real performance data, automatically.
*   **Smarter routing** — the model router gets better at sending each task to the model that will actually succeed cheapest.
*   **Self-evolving code** — under-performing tools and logic are rewritten and optimized (§12).
*   **Schema growth** — the data model adapts to capture the entities the tenant actually works with (§13).

### 10.4 The Compounding Timeline
*   **Week 1** — Follows instructions. Basic execution. Learning your documents. Accurate but generic.
*   **Week 4** — Episodic memory captures patterns; agents recognize returning contacts, common issues, seasonal trends. Responses become contextual.
*   **Week 8** — CORTEX builds deep domain context; agents anticipate needs — pre-drafting responses, flagging anomalies, suggesting actions before being asked.
*   **Week 12** — The Self-Optimizing Intelligence Engine tunes instructions from KPI data; routing, tools, and schema have all adapted to the tenant. Measurable improvement, no human intervention.

> *Your competitors are still onboarding their next hires. You're running a self-optimizing machine that knows your market better than any human analyst. The gap doesn't close — it widens.*

---

## 11. Generative & Adaptive UI

> **Phase 2 — major addition.** The interface a user sees is not statically designed for everyone; it is **generated and adapted per user, per context.**

### 11.1 The Idea
Rather than ship one fixed dashboard, HireBuddha assembles the **right interface for the moment** — the right controls, views, forms, and summaries — based on who the user is, what they're trying to do, the data at hand, and their past behavior. The UI is an output of the intelligence layer, not a fixed asset.

### 11.2 What Adapts
*   **Per role & expertise** — a solopreneur sees a simple, conversational surface; an enterprise admin sees governance, audit, and multi-tenant controls.
*   **Per task** — when reviewing invoices, the UI surfaces an approvals view; when designing an employee, it surfaces the build canvas; when a HITL checkpoint fires, an actionable card appears in context.
*   **Per data** — forms, tables, and charts are generated to fit the actual shape of the tenant's (dynamic) schema (§13) — new fields appear as the schema grows.
*   **Per preference & history** — layouts, defaults, and shortcuts tune to how the individual actually works, informed by the Learning System (§10).

### 11.3 Why It Matters
Users never outgrow or get lost in the product. Novices get guided, generated simplicity; power users get density and control — from the same platform, without anyone configuring screens by hand. Combined with Pragya (§4), most users can run their entire workforce through a conversational surface that materializes the exact controls they need, when they need them.

---

## 12. Self-Evolving Code

> **Phase 2 — major addition.** HireBuddha's tools and agent logic are not frozen at build time. The platform can **rewrite, optimize, and improve its own code.**

### 12.1 What It Means
When the Meta Agent (§5) needs a capability that doesn't exist, it **generates a new tool** (code) and registers it. Beyond creation, the platform continuously **mutates and optimizes** existing tools and agent logic:
*   **Self-healing** — when a tool errors or an integration's API changes, the system diagnoses the failure and patches the code.
*   **Self-optimizing** — slow or costly logic is refactored for speed and lower token/compute cost.
*   **Self-improving** — under-performing Skills/tools (flagged by the Learning System, §10) are rewritten to raise their success rate.

### 12.2 How It Stays Safe
Self-modification runs inside guardrails, not in the wild:
*   **Sandboxed generation & testing** — new and modified code is generated and executed in the isolated Sandbox/Terminal environment (§6.5), never directly against production.
*   **Test-gated promotion** — changes must pass self-generated test cases (and the Pre-/Post-Critics) before they're promoted.
*   **Versioning & rollback** — every entity and tool is versioned; a regression can be rolled back to a known-good version.
*   **HITL for sensitive changes** — high-impact modifications can require human approval (§15) before going live.

### 12.3 Why It Matters
The workforce maintains and upgrades itself. Integrations that break get fixed without a support ticket; expensive workflows get cheaper on their own; capabilities the tenant lacks get built when they're needed — not in the next release cycle.

---

## 13. Dynamic Per-Tenant Schema

> **Phase 2 — major addition.** Each tenant's data model is **not fixed**. It starts minimal and **evolves as the tenant uses the system.**

### 13.1 The Idea
Traditional SaaS forces every customer into the same rigid database schema. HireBuddha gives **each tenant their own evolving schema**: the entities, fields, and relationships that describe *their* business emerge from how they actually work. A logistics tenant grows shipment and route entities; a clinic grows patient and appointment entities — automatically, without a migration project.

### 13.2 How It Grows
*   **Bootstrapped at onboarding** — Pragya's ingestion of the knowledge base and connected systems (§4.3) seeds the initial entities and fields.
*   **Extended in use** — as agents encounter new kinds of data (a new field in a CRM, a new document type, a recurring entity in conversations), the schema extends to capture it.
*   **Learning-driven** — the Learning System (§10) promotes frequently-seen patterns into first-class schema elements.
*   **Tenant-isolated** — one tenant's schema growth never affects another's; isolation guarantees from §16 hold.

### 13.3 Why It Matters
The system models the tenant's real business more faithfully over time, which makes memory retrieval sharper, generated UIs (§11) more relevant, and reporting more precise. The product fits the customer instead of forcing the customer to fit the product.

---

## 14. Economics & Cost Attribution

### 14.1 Wallet Pools
HireBuddha uses a 3-tier wallet priority system:
1.  **Daily Credits**: Every tenant gets $5.00 of free daily credits. These expire at midnight and do not roll over.
2.  **PAYG Wallet Balance**: Pay-as-you-go funds topped up via Razorpay, valid for 365 days.
3.  **Subscription Credits**: Monthly recurring credits issued under active plans (Starter, Growth, Enterprise) with up to 40% bonus credits.

### 14.2 The Billing Cost Formula
Every run, tool call, voice minute, and token consumption — **including which model the router selected** — is recorded in a centralized ledger. The billable amount is computed using:

$$\text{Billed Amount} = (\text{Base Cost} \times \text{Multiplier}) \times (1 + \text{Platform Fee \%} + \text{Partner Fee \%} - \text{Discount \%})$$

This enables:
*   **Partners** to white-label the platform and add their own service markup margins.
*   **Tenants** to track costs down to the micro-cent for every single task execution.
*   **Users** to see direct ROI (e.g., comparing the cost of an AI call to a human call center rep).

> The Intelligent Model Router (§3.3) is the single biggest lever on the **Base Cost**: routing routine steps to cheap models keeps real-world bills far below a flat frontier-model price while preserving quality where it matters.

### 14.3 Minimum Wallet Balance Thresholds
To prevent overspend, the credit service enforces minimum thresholds before execution runs start:

*   **Process Execution**: Requires minimum wallet balance of **$0.50** (covers plan generation and agent spawns).
*   **Agent Run**: Requires minimum wallet balance of **$0.05** (covers initial conversational turns).
*   **Skill Run**: Requires minimum wallet balance of **$0.02** (covers single template rendering).
*   **Action Run**: Requires minimum wallet balance of **$0.01** (covers single tool call).

Runs are blocked with an `InsufficientCreditsError` if the wallet balance falls below the target threshold.

---

## 15. Enterprise Governance & Security

### 15.1 Multi-Tenant Hierarchy
The platform isolation model utilizes a 4-level structure:

*   **App Admins (Buddha Cognitive Lab)**: View platform dashboards, modify integration settings, set baseline SKU costs, manage the global tool registry and **model fleet/router policy**, and handle partner commissions.
*   **Partners**: Manage portfolios of Tenants, configure pricing multipliers, track earnings and commissions.
*   **Tenants**: Manage their specific workspace, users, AI employees, integrations, and wallets.
*   **Users**: Access designated AI features, monitor execution histories, and interact with the workspace.

### 15.2 Security Gates
*   **Key Vault**: External API keys and OAuth tokens are stored in the database encrypted via AES-256-GCM using a master key stored outside the database.
*   **Access Handshake**: Stateless JWT authentication handles API calls, using short-lived tokens (15 minutes) and HTTP-only cookie-refresh tokens (7 days).
*   **Company Suspension Middleware**: Instantly blocks API access for any Tenant marked as suspended in the DB, immediately terminating running campaigns and phone lines.
*   **Human-in-the-Loop (HITL) Checkpoints**: Pauses execution runs at designated checkpoints (e.g., before sending high-value emails, executing sensitive tools, or **promoting self-evolved code, §12**), alerting administrators — often surfaced to the tenant *through Pragya* — for verification before resuming.
*   **Credit Circuit Breaker**: Evaluates accumulated run cost against the tenant's wallet balance after every step execution, raising an `InsufficientCreditsError` if the balance is depleted.
*   **Model & Data Governance**: Tenants/partners can restrict which models in the fleet are eligible (§3.4) for data-residency or compliance reasons; all routing and model usage is fully auditable.
