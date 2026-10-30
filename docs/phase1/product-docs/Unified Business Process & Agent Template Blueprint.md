# **HireBuddha — Unified Business Process & Agent Template Blueprint**

This blueprint reconstructs a traditional enterprise into a seamless, unified autonomous organization. Traditional, siloed departments (Marketing, Sales, Customer Success, Operations, Finance, Accounting, Legal, HR) are replaced by **7 Cross-Functional Lifecycles**.

These lifecycles are modeled using HireBuddha's hierarchical tiers:

1. **Processes (C-Suite Orchestrators)**: Goal-driven Directed Acyclic Graphs (DAGs) coordinating execution.  
2. **Agents (Managers / Domain Heads)**: Context-aware channel controllers holding conversational state.  
3. **Skills (Specialists / Task Executors)**: Procedural block engines running templated workflows.  
4. **Actions (Atomic Workers)**: Tool-assisted system integrators executing code, reading databases, or querying APIs.

## **The Unified Paradigm: From Silos to Closed Loops**

      ┌────────────────────────────────────────────────────────┐  
      │             THE BUSINESS ENGINE (UNIFIED LOOPS)        │  
      └──────────────────────────┬─────────────────────────────┘  
                                 │  
     ┌───────────────────────────┼───────────────────────────┐  
     ▼                           ▼                           ▼  
1\. Growth & Revenue         2\. Ops & Fulfillment        3\. Capital & Safety  
(Mktg \+ Sales \+ Care)       (Logistics \+ Delivery)      (Finance \+ Legal \+ Audit)

## **Process 1: The Growth & Customer Acquisition Loop**

*Replaces: Outbound/Inbound Marketing, Business Development (BDR/SDR), Sales, and Early Onboarding.*

\[Trigger: Target Segment Upload\]  
      │  
      ▼  
(Agent: Market Intel Scout) ──► (Skill: ICP Enrichment) ──► \[Web Search / Scraper\]  
      │  
      ▼  
(Agent: Outbound Prospector) ──► (Skill: Hyper-Personalized Outreach) ──► \[SMTP Send\]  
      │  
      ▼ (Interest Detected)  
(Agent: Inbound Deal Closer) ──► (Skill: Qualification & Quoting) ──► \[Sandbox Calc\]  
      │  
      ▼ (Deal Signed)  
(Agent: Client Welcome Agent) ──► (Skill: Tech Setup & Provisioning) ──► \[Webhooks\]

### **1\. Process Definition: Automated Customer Pipeline**

* **Goal**: Drive cold target list to signed contracts and fully provisioned accounts.  
* **Trigger**: Weekly CSV list drop of target company domains or a webhook event from an ad platform form.  
* **Logic Gate**: Parallel branch processing. Dynamic execution routes depend on lead response sentiment.

### **2\. Agents (Managers / Channel Heads)**

* **Market Intel Scout (Agent)**: Curates intent signals, firmographics, and technology stacks.  
* **Outbound Prospector (Agent)**: Orchestrates outbound multi-channel outreach (Email, WhatsApp, LinkedIn).  
* **Inbound Deal Closer (Agent)**: Low-latency voice agent (![][image1] PCM) that qualifies warm callbacks, negotiates pricing, and routes custom proposals.  
* **Client Welcome Agent (Agent)**: Manages handoff, triggers setup guides, and ensures first-week product activation.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: ICP Enrichment & Validation**  
  * *Action: Company Tech Stack Lookup*: Executes Google/DuckDuckGo API search to find active software wrappers on target sites.  
  * *Action: Lead Contact Locator*: Queries internal CRM/Apollo interfaces to extract C-level contact data.  
* **Skill: Hyper-Personalized Copywriter**  
  * *Action: Scratchpad Draft*: Pulls news articles about the target and synthesizes custom value propositions.  
  * *Action: Pitch Personalizer*: Adapts pitch tone to match target executive profile via the Personality Matrix.  
* **Skill: Multi-Channel Communication Router**  
  * *Action: Email Outbound*: Uses SMTP IMAP node to dispatch messages with unique tracking IDs.  
  * *Action: WhatsApp Outbound*: Triggers WhatsApp Business template messages.  
* **Skill: Live Call Qualification**  
  * *Action: Voice Dialer*: Twilio Outbound SIP connection.  
  * *Action: Calendar Book*: Syncs with Google Calendar API to lock in human-in-the-loop (HITL) escalations if requested.  
* **Skill: Smart Proposal & Contract Generation**  
  * *Action: Excel Pricing Calculator*: Runs a secure Python sandbox to compute complex tier-based ROI metrics.  
  * *Action: PDF Proposal Renderer*: Takes dynamic variables and renders an interactive document via WeasyPrint.

## **Process 2: The Continuous Customer Success & Support Loop**

*Replaces: Technical Support, Customer Success (CSM), Accounts Management, and Upsell Marketing.*

\[Trigger: Support Ticket / Usage Anomaly\]  
      │  
      ▼  
(Agent: Omnichannel Care Orchestrator) ◄──► \[CORTEX Tree Memory\]  
      │  
      ├── (Inbound Route) ──► (Skill: Contextual Resolution) ──► \[pgvector Lookup\]  
      │  
      └── (Anomaly Route) ──► (Skill: Account Expansion Generator) ──► \[Sandbox Analysis\]

### **1\. Process Definition: Value Maximization & Retention Engine**

* **Goal**: Monitor real-time product usage data, answer omnichannel incoming tickets, isolate churn risks, and close automatic expansion/renewal contracts.  
* **Trigger**: Inbound message (Email/WhatsApp/Call) or product telemetry alert (e.g., usage drop of ![][image2]).  
* **Logic Gate**: Sequential check. Evaluates ticket tier and account health metrics (![][image3] ratios) before determining if auto-replies or live voice callbacks are needed.

### **2\. Agents (Managers / Channel Heads)**

* **Omnichannel Care Orchestrator (Agent)**: Owns inbound support triage, processes context across Email, Web Chat, and Phone.  
* **Proactive Account Advisor (Agent)**: Monitors health telemetry and initiates check-ins to prevent customer dropoffs.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Semantic Contextual Resolution**  
  * *Action: pgvector Knowledge Search*: Performs a cosine similarity search on the company's uploaded product manuals:  
    ![][image4]  
  * *Action: Tech Sandbox Debugger*: Simulates customer's API error payload in an isolated Python subprocess to draft the fix.  
* **Skill: Account Expansion & Renewal Generator**  
  * *Action: Usage Meter Analysis*: Pulls customer product usage logs using SQL connectors.  
  * *Action: Personalized Renewal Proposal*: Generates a dynamic Word/PDF upgrade agreement presenting current usage ROI and new tier pricing.  
* **Skill: Emergency Voice Escalation**  
  * *Action: Live Voice Support Call*: Dispatched via Twilio WebSocket connection, utilizing highly empathetic tone sliders (![][image5]).

## **Process 3: The Operational Fulfillment & Logistics Pipeline**

*Replaces: Project Management, Service Delivery, Quality Assurance (QA), and Vendor Management.*

\[Trigger: Signed Contract / Confirmed Order\]  
      │  
      ▼  
(Agent: Service Dispatcher) ──► (Skill: Automated Resource Allocation) ──► \[Database Write\]  
      │  
      ▼  
(Agent: Quality Assurance & Audit Agent) ──► (Skill: Proof-of-Work Verification) ──► \[Web Scraper\]

### **1\. Process Definition: Automated Service Delivery Flow**

* **Goal**: Orchestrate third-party vendors, manage project timelines, auto-write system configurations, and run quality control reviews on delivered assets.  
* **Trigger**: Value Conversion Process (Process 1\) completion webhook.  
* **Logic Gate**: Parallel step executions. Runs automated delivery checks while scheduling human review checkpoints if thresholds are breached.

### **2\. Agents (Managers / Channel Heads)**

* **Service Dispatcher (Agent)**: Assigns dev environments, provisions SaaS workspaces, or books third-party courier services via external integrations.  
* **Quality Assurance & Audit Agent (Agent)**: Reviews delivered services/products against original contract statements.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Automated Resource Provisioning**  
  * *Action: Cloud Infrastructure Orchestrator*: Sends API payloads to cloud platforms (AWS, GCP, Vercel) to launch customer projects.  
  * *Action: Workspace Workspace Setup*: Generates dedicated Slack channels, Notion hubs, or custom portal access keys.  
* **Skill: Proof-of-Work Performance Audit**  
  * *Action: Web Scraper & Validator*: Uses a headless browser (Playwright) to inspect the customer's completed setup, taking verification screenshots.  
  * *Action: SLA Compliance Analyst*: Parses delivery timestamps and verifies performance against original contractual agreements.

## **Process 4: The Continuous Fiscal & Asset Optimizer**

*Replaces: Bookkeeping, Invoicing, Accounts Receivable/Payable, Payroll, Cash Flow Planning, and Tax Prep.*

\[Trigger: Daily Ledger Sync / Invoice Event\]  
      │  
      ▼  
(Agent: Treasury & Ledger Controller) ──► (Skill: Reconciliation Engine) ──► \[Sandbox / Python openpyxl\]  
      │  
      ▼  
(Agent: Accounts Receivable Agent) ──► (Skill: Empathetic Debt Collection) ──► \[WhatsApp / Voice\]

### **1\. Process Definition: Zero-Leakage Ledger Lifecycle**

* **Goal**: Automate real-time financial book reconciliation, generate vendor bills, run payroll processing, dynamic credit limit adjustments, and proactive collection runs.  
* **Trigger**: Real-time bank feed webhook, Stripe payment webhook, or daily schedule trigger.  
* **Logic Gate**: Critical budget gate checks (![][image6] default Process credit gate). Enforces sandbox execution loops for calculations to guarantee mathematical precision.

### **2\. Agents (Managers / Channel Heads)**

* **Treasury & Ledger Controller (Agent)**: Manages primary balance sheets, runs bank-feed matches, drafts tax summaries, and projects run rates.  
* **Accounts Receivable Agent (Agent)**: Executes collection campaigns via friendly but firm email, text, and voice channels.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Automated Bookkeeping & Reconciliation**  
  * *Action: Ledger Matcher*: Feeds transaction lists into a secure Python sandbox executing safe panda-cleansing algorithms.  
  * *Action: Dynamic Cashflow Forecaster*: Projects run rates and cash reserve runways (![][image7], ![][image8], and ![][image9] days) as dynamic charts inside Excel templates (openpyxl).  
* **Skill: Empathetic Collection Campaign**  
  * *Action: Late Payment Evaluator*: Reviews payment age and customer historical tier.  
  * *Action: Multi-Channel Nudge Dispatch*: Drafts individualized reminder emails and handles inbound payment negotiations.  
  * *Action: Inbound Settlement Voice Portal*: Answers calls from past-due clients to process discounts or structured payment plans.

## **Process 5: Autonomous Regulatory, Risk, & Compliance Engine**

*Replaces: Corporate Legal counsel, Contract Reviewers, Risk Officers, and Compliance Officers.*

\[Trigger: Incoming Document Draft / Legal Update\]  
      │  
      ▼  
(Agent: Contract Review Specialist) ──► (Skill: Document Risk Audit) ──► \[CORTEX Tree Memory\]  
      │  
      ▼ (Critical Risk Identified)  
\[Human-In-The-Loop Checkpoint\] ──► (Skill: Redline Editor) ──► \[python-docx\]

### **1\. Process Definition: Continuous Guardrails and Legal Hygiene**

* **Goal**: Review inbound agreements, draft customized standard operational legal documents, analyze changes in municipal/federal regulations, and manage intellectual property filings.  
* **Trigger**: File drop in secure shared directory (PDF/DOCX) or schedule check on legislative portals.  
* **Logic Gate**: Strict Human-in-the-Loop (HITL) gates. Any clause flagged with high liability limits halts execution for admin sign-off.

### **2\. Agents (Managers / Channel Heads)**

* **Contract Review Specialist (Agent)**: Inspects agreements for problematic terms, indemnification gaps, or non-compete liabilities.  
* **Regulatory Watchdog (Agent)**: Monitors regulatory databases for compliance updates matching industry parameters.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Document Risk Audit**  
  * *Action: Semantic Clause Matcher*: Compares uploaded text against company standard playbooks via Cosine Similarity in pgvector.  
  * *Action: Redline Editor*: Directly modifies DOCX templates, adding highlighted margin comments and suggested alternative language.  
* **Skill: Dynamic Licensing Monitor**  
  * *Action: State Licensing Crawler*: Leverages a Playwright Headless Browser to scrape renewal deadlines on state/federal registry portals.  
  * *Action: Alert Flag Generator*: Flags expiring certifications and drafts prepopulated renewal forms.

## **Process 6: Talent Vitality & Resource Alignment Loop**

*Replaces: Human Resources (HR), Recruiting, Candidate Screening, Onboarding, and Performance Evaluation.*

\[Trigger: Team Needs Request / Job Application\]  
      │  
      ▼  
(Agent: Talent Scout Coordinator) ──► (Skill: Resume Matchmaker) ──► \[pgvector Engine\]  
      │  
      ▼  
(Agent: Candidate Voice Screener) ──► (Skill: Structured Interviewing) ──► \[Gemini Live Voice\]  
      │  
      ▼ (Passes Technical Score)  
(Agent: Cultural Onboarding Buddy) ──► (Skill: Onboarding Playbook Generator) ──► \[PDF Gen\]

### **1\. Process Definition: Talent Sourcing & Lifecycle Management**

* **Goal**: Draft roles, run initial phone screening interviews, generate onboarding packages, track quarterly OKRs, and handle standardized offboarding tasks.  
* **Trigger**: Application submission or structured organizational growth signals.  
* **Logic Gate**: Multi-stage pipeline. Transitions candidate status from screening to assessment, running automated skills verification tests.

### **2\. Agents (Managers / Channel Heads)**

* **Talent Scout Coordinator (Agent)**: Manages candidate funnels, parses incoming portfolios, and coordinates evaluation pipelines.  
* **Candidate Voice Screener (Agent)**: Conducts low-latency, friendly first-round screening phone interviews.  
* **Cultural Onboarding Buddy (Agent)**: Coordinates administrative setup, processes documentation, and checks in with new hires.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Semantic Resume Matchmaking**  
  * *Action: Skill Vector Evaluator*: Embeds application resumes via text-embedding-004 and queries suitability vectors:  
    ![][image10]  
  * *Action: Disqualification Auto-Draft*: Politely messages unqualified applicants over email using an empathetic brand voice.  
* **Skill: Interactive Voice Screening**  
  * *Action: Twilio Live Audio Interview*: Uses Gemini Live (![][image11] voice options) to check operational knowledge, analyze verbal communication, and log detailed interview summaries.  
* **Skill: Onboarding Playbook Synthesis**  
  * *Action: Playbook PDF Generator*: Generates high-fidelity, customized employee playbooks based on their role and department templates.

## **Process 7: Self-Optimizing Feedback & Intelligence Engine**

*Replaces: Executive Assistants, Corporate Strategy, Business Analysts, and R\&D.*

\[Trigger: Weekly Performance Sync Schedule\]  
      │  
      ▼  
(Agent: Chief Strategy Analyst) ──► (Skill: Cross-Process Data Harvester) ──► \[Database Query\]  
      │  
      ▼  
(Agent: Executive Summary Agent) ──► (Skill: C-Suite Briefing Generator) ──► \[PPTX / PDF Gen\]

### **1\. Process Definition: Whole-Company Executive Dashboard**

* **Goal**: Scrape key performance indicators (KPIs) across all active processes, execute advanced strategic analysis, write executive briefings, and adjust platform agent instructions to address runtime bottlenecks.  
* **Trigger**: Weekly recurring cron schedule.  
* **Logic Gate**: Recursive execution. Walks through the entire running context of all other processes to evaluate performance.

### **2\. Agents (Managers / Channel Heads)**

* **Chief Strategy Analyst (Agent)**: Inspects database logs across sales, finance, support, and delivery processes to spot operational bottlenecks.  
* **Executive Summary Agent (Agent)**: Synthesizes complex operational data into clean, structured briefings for leadership.

### **3\. Skills (Specialists) & Actions (Atomic Workers)**

* **Skill: Cross-Process Data Harvesting**  
  * *Action: Query Run Logs*: Extracts transaction records, customer satisfaction (CSAT) scores, and cost histories from backend tables.  
  * *Action: SQL Performance Evaluator*: Uses sandbox Python scripting to compute run-rate velocity, margins, and operational costs:  
    ![][image12]  
* **Skill: C-Suite Executive Briefing**  
  * *Action: PowerPoint Pitch Synthesizer*: Renders dynamic PowerPoint decks containing high-level charts, performance insights, and cost breakdowns.  
  * *Action: Instruction Optimizer*: Compares agent outputs with performance targets and updates prompt parameters to optimize runtimes.

## **Master Template Entity Registry Matrix**

This reference table maps how these elements fit into the HireBuddha system architecture:

| Process ID | Primary Agent | Key Specialized Skill | Built-In Tools Utilized |
| :---- | :---- | :---- | :---- |
| **PRC-GROWTH-001** | Market Intel Scout | ICP Enrichment | Web Search, Web Scraper, Postgres pgvector |
|  | Outbound Prospector | Personalized Outreach | Email Ingest, Email Draft, SMTP Send, Web Scraper |
|  | Inbound Deal Closer | Qualification & Quoting | Twilio Voice, Sandbox Code Executor, Calculator |
|  | Client Welcome Agent | Technical Provisioning | Headless Browser (Playwright), Terminal Tool, Webhooks |
| **PRC-SUPPORT-002** | Care Orchestrator | Semantic Context Resolution | pgvector Search, Email Classify, WhatsApp API |
|  | Proactive Advisor | Account Expansion | SQL Client, Excel Tool (openpyxl), Word Template Gen |
| **PRC-DELIVERY-003** | Service Dispatcher | Resource Allocation | Terminal Tool, Sandbox Executor, REST Webhooks |
|  | QA Audit Agent | Proof-of-Work Verification | Headless Browser (Playwright), File Writer, PDF Gen |
| **PRC-FISCAL-004** | Treasury Controller | Ledger Reconciliation | SQL Reader, Excel Tool, Sandbox (pandas/openpyxl) |
|  | Accounts Receivable | Collection Campaigns | Email/WhatsApp APIs, Twilio Realtime Voice |
| **PRC-REGCOMP-005** | Contract Reviewer | Legal Risk Audit | docx Reader, pgvector Search, PDF Generator |
|  | Reg Watchdog | Licensing Monitor | Playwright Scraper, File Writer, Email Alerts |
| **PRC-TALENT-006** | Talent Coordinator | Resume Matchmaking | pgvector Search, docx/pdf Reader, Email Ingest |
|  | Voice Screener | Structured Interviewing | Twilio Voice Integration, Voice Activity Detection (VAD) |
|  | Onboarding Buddy | Playbook Synthesis | PDF Generator (WeasyPrint), Slack Webhooks |
| **PRC-STRATEGY-007** | Strategy Analyst | Performance Harvesting | SQL Client, Sandbox Code Executor, PPTX Gen |

## **Blueprint Implementation & Execution Config**

Below is a JSON configuration schema for the **Growth & Customer Acquisition Loop** (Process 1\) designed for direct deployment into the hierarchical\_entities database table:

{  
  "name": "Frictionless Growth & Acquisition Loop",  
  "version": "2.0.0",  
  "type": "PROCESS",  
  "goal": "Identify, qualify, contact, close, and onboard enterprise clients completely autonomously.",  
  "logic\_gate": {  
    "reasoning\_mode": "Chain-of-Thought",  
    "max\_consecutive\_blocks": 3  
  },  
  "hierarchy": {  
    "child\_agent\_ids": \[  
      "agt-market-intel-scout-uuid",  
      "agt-outbound-prospector-uuid",  
      "agt-inbound-closer-uuid",  
      "agt-welcome-agent-uuid"  
    \]  
  },  
  "governance": {  
    "max\_cost\_usd": "25.00",  
    "timeout\_ms": 3600000,  
    "hitl\_checkpoints": \[  
      "before\_high\_value\_email\_dispatch",  
      "before\_contract\_esignature\_routing"  
    \]  
  },  
  "io\_contract": {  
    "input\_schema": {  
      "type": "object",  
      "properties": {  
        "target\_segments": { "type": "array", "items": { "type": "string" } },  
        "outreach\_campaign\_id": { "type": "string" }  
      },  
      "required": \["target\_segments"\]  
    },  
    "output\_schema": {  
      "type": "object",  
      "properties": {  
        "leads\_processed": { "type": "integer" },  
        "signed\_contracts": { "type": "array", "items": { "type": "string" } },  
        "onboarded\_accounts": { "type": "array", "items": { "type": "string" } }  
      }  
    }  
  }  
}  


[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAZCAYAAABkdu2NAAADCUlEQVR4Xu2WT0hUURTGZ7DAqCgok3TGN47V0KLVUFFBKyFaFIFBghCBi6J2SQXlzpUtpCQIQqKIoNq0cFGERNCuNhXVwlaGGLTIjQUaVr9v3r16vd6ZcaRF0vvg4717zrnnnu/+ey+VSpDgv0NdW1vbllwuV+87/gnkYnT6dhetra2FKIquwluwA1Od7LzfgL/FlpaWI163OZD/DDFTNtbwG33aM5nMLvyjnm8W28PGxsa1fq4lgQQ74Vn43CS768cIxWJxNf5e+JpiijDP+7AKtjHZbHY3th+VBFoQd1kCiL3k+2we+KKhoWGd768JEkiRx3juh+PlBJqZ/6QlVpv3wyrQjZdwbN+XIlDCjMBFsTbPXxFoQbKtcCwkkHOVlTg4aG35fH4D7V7i91rbihWIrVPFwC7e6xUbGtgXSOxGk7dE9XViaxVYusDcfJahWhbBBAcFYh9UMbAP3oPn4Bti+3U2bVxAYL/pJ76X34m1Ak+asd2JOBR5Z9D4xpQnii848a3J3W3zloVNEBIom0k0NyA33nbaX2CPjQsIPEH7SXNzc8bGOLElgcQ8cwq2fAx/ueMpN3yqo6E2t/ke/JPwkTvJZREtQSDP09amgVUA/NDU1LRZNmdr9RB7Sv3KXe+1blFjG9C7Of8j5B9FaLSwdxlUEoh9yC/GEagVK209pzCt7DS5XrF6m+YzzaNWgVolM1lp8l7DN8vn5OjCnhVQReB5v5gqAvt4P8BzUsXgSs8lM6hVoAW2DviTmIs00/o5oH3FjQmiisB9cBp2WVulLWqKTqsIFROa6eUI1HbUtsQ+Ys+ictO+MN+7DKxAeD/lzTiztAb7MByiucrYql4yhUJhPe2XobMSVfiTCQnUMxdfSBOMvU021UXsHfduWAQC2uk0Dmc1oOEUnd5p+W1cFP/SfYS3Ybf89L1pbzBsA3DG9C/9P0bxdrI5dUldz8V/RF9dO5xQHWa76TOwoBZ8D6L4d1LtGdqfRflkC+2CZUFiWImDJDzOFtmRCpytBAkSJEiQYIXgD+sFV0cFxroGAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAZCAYAAACPQVaOAAADkUlEQVR4Xu2WT0hUURTG35BBUZH9sSEd580oNbhJQcJNRYukXBSSFZHt2uUuiUDalagRYZaVpYtWSREUFVEKirUQWkRgtWhVFFFhQViLFtnv691b15fTjH8wgvng47577rnnne++8857npdDDv8UiUQiv6ioaAWXkfCaRWVl5fxoNLoobP+fEPF9vxGxNxlPMHZNJigWiy1kvbO4uHhHeG0uECGxKhLogOfi8fjuvyS5D16UmGQymXLX2VeJ/RljiRcIPwbfwAZ8fZ52TLGZP2Y8j0+eu38ukIfQ0yTQrGTAGuZDzEeUoHUqKSlZiq1PAgoKChbjUyFhsM76cH0IPkilUks0R9AG5odhGf57Geux7YE3dC+7Ly3YtEAM26cLJQJHiXlfIoytHo7DDutHgkeYP2Jc5uyV33MOJao5MS4zH7RxzJM+Y/29oILasi5flQgB+rTJNIEZQaVIvHfwiY3H9U4jtltzCZRQiXH3kvR67GM2ea6bXLFm/bj1J041Mdq9KZZvhCTXEegu7IHJsMNUQAL5NkEveNfOwu8SLYP/++lPEGue3BfYrDnrm7l+YUuU64P2IEpLS1cxv5pV+aaDeTLXxHDDmAZUZluJ9RGe1OdBRisqnVhrl78aj8mngetec4jqC+1Zl28mEDwJewg6BKswpf3GTQYS2wJfEeM9+7sKCwtXOmvbsY9nEmugqitXyap7yyCRTvnazn+KcZvmzt6pgSCrYed0RYN5JNpCjE86ABm4rpmC2AlQ2eJz3SntOtivrs941DevyrShRmPK6SGJJMLrmWAay1c4onctnah0dgcTytd8voZhveZUQJQYF5x+kT384KmquQxk+1RNo+vQaG0mzksJkaB48AV4GxZlxcIm124RKl/dqxzfz3otjItKulX3+7UpE/zgfb0Eb5ukM4q0kAA/VKKOiFFYppNnHIR3Es43XmWO7Zstdxfh8hVsXEes7t+adH5e0kGNYMafn3jws/AhETQLa9uvA9Cr4JmnIls8aGD2PvZ3cFjlafca/Cxf/KtdozmA11asDlH3cJthGLabDfhByWZfApPAvEdXYD88ABvhGEn0uiKcz4pekVoj9CnXFW48wZRvm/dnheWxp9uu4bfRD346wn4BWKzhpi2z8ffkQAco1Io0peKwg0GEA1jL/XdRVZvsd9iF8pKgdPnRhZfrcIlxj/HWjH4ycsghhxxyyGH28ANb6wg3I8B04gAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAAAaCAYAAABb9hlrAAAE80lEQVR4Xu2ZW4hVVRiA9zBTGd0ImwbnctY+MwcPTnaRU0RUdKFCH4yQrAd7CIIMHwQFKywKuhDZi0hCONYYUlGkPQlBElIQgZERgb0MmIQSUQ/RiDrU9P1nr8Ws+WetvY+6owPtD37O7P+61trrsveeJKmoqPif02q1LhofH79Y6yu6hDRN1yMrtV7ROzIyMobfQ/V6/YHR0dGrnMEYU280Gpf4zhH6arXaRnLcpA0Ryqg5B0H3IL8is56cRT4bGhparHzvRaZo8PEO5T78n0D+VPn3DwwMXOby4nc7utOe/UdqD/u1faTTxEwyAAPaJgwPD19Kji227hFkG7IV+RrZQOxafvcxiIt0rIbBvhPfM8gabfMps2YQgncjf+fMyh7sb2L/EEnlWpSBuF7+vgvdMTp3iyj6+/sv5/oQMk1DW9ZvHthuQ75h0JvaphFf8rym9QK2ZchR5Ag+475NtkVpv7QX2erbQnjtniXXM9ruKLNmEJJeTfBh5BgzYUjbBZmt2D8aGxu71ulicbZje/1VQCPfRTdDzB1O55BOoH8LuV/bQpDr9VAeJsTNJtsNDvpbi49d1WflV9s01HlKBt1kq/pVbRfKrhnEZDPgN+RjLvu0XZDkNHiTr+Om3UjMHzrO3rgdzWbzCqeTDkpHsa12OofcGHJvTyK1fWSi4D+pB0MmDvl/QKbsCg9CbAvz93lbqEC+EXLtQ1Yh0zLBAj6l1oxCgXV28KLLGNtaBmWpr4vFydmF7snEboMCfptjvuj3swIbvj4GHV2J/3NKLdvvy6H8Ghks/N5P888CyfcGssb6T5uFk7fsmnEI3mEi208eJjt/OorDZ7V0Rmp56h4a/axsJZ4ujz7id7KtLPeV6OrIz8hJ6oz6No1sp3r1aeyATogvv0uQn5BDsnU7n7JrRqnNnSNTsaeiEF5c9NzykZuI7wzyXmJXFrrruN7rdzwPOyi75YnJ13PDHjTZzT9w3rPUIrlp1x5yrZBrM3eDDkufnV+ZNXMxBeePvAzKDND6nKUfxDuv2jPRzs4JOner9o2B/zr812u9bDF2sIIH+blA/kfJ90IyN4ncRJSbtMT5lVkzF+m0LbRZ25Jsn31JbymCi5OGalsI6ZztZHul6oEoQmYpsROh7cQNVlFbbBteiX2B8A59GQ8tMomXOd+yahZics4RObixva23FOjBfzIWF0Ke6PD/EjmZZu9J8x7Zi5BJQszOJLBaTYeTRfxCK9DSPg/J8Zg2pNkrwrx3uJJq5uMt3wXniN2CdkkBXy/kxcWwK+AAcgr5SvZw7ZMHMVtiMazIJvZfaNengcnUhvqp9Cd2WGNbQfyeULy9QbPIKqcro2YhMiNM4Bwx2bLchf04v3UvpE0srgjXUVl9oXMtRtGnnSRb0U+Te4Yaj8u1byTuBmyf8Gt8vcNubZ+T4xFtE9C/aNvtv8NdUM1catmb7QkpauUvkz0yisjfTv9BYm+AvANx/S3yu2cXkW9PR+WmqTILqGX79olO33kcJvsMtC3JP696yb/RZN/05JOLDN4G5CADuL3RaFypA+QdDNsXfn9Sbzuy46T7+53X/nOu2dXIbKJz12t9EXT4+VqHZx0Dswi5G/+H5bfTR/gL4b+o2TUMDg5eww1657z38Yp/lzT8aaeiS4i+h1V0AfJPPVbQpthjbEVFRUVFRUW5/AP0m9S0QUGznAAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAxCAYAAABnGvUlAAAFTklEQVR4Xu3dW4hVVRgHcCWDoCK7mOnMmX3GiUQoCqxAKDDIKCqIhAgSeoguDz3Ug1RGIoRQD13IN0GqJ7v4UBRULyUEFQTRQ1EUQkkoFBSECRU2fd/M2uNuNc6kMyOd+v1gcdb69l77cuZh/9n7nDOLFgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMbGRk5ObR0dErsz88PHxhvXwOTun3+6fVxf+zpmlujPZUXV8I8TeNXTV76joAMGAiUD0ZF/W7om0p7aOsr1q16qwIclvr9WeSc2L+jrVr156a4+iPZxis15tNBI3rYu6bdf1ki2O/Ld6ffl2fiziv98bGxs6v6wul1+tdnX+Xug4ADIhly5adEQFiezuO/rpon2c/Q1dklVuOrj27nBMh5+7oLs5x9NeeSGCLgHFRHMdj7Tj6a/JYu+sspNjfDXHu6+P1lzyHevmJim1eH2F0eV1faHEeX9Q1AGBAxIV8RdN5ZBbh5OzueK5ONLDVYhubTmZga81zYFsc23q+Lp4McR4f1zUAYIDExfxItPFoX46NjfWy1u/3l8Z4V7Rvy/jBss726N8er89F2xgB5KV43Ry1B8q2cs5v0VbkuBvYYp1no78/lq2J/uvtY7oYvxfts2ivRDsS62yI1y9zf2XeZdH/IcNOvO6McT9ed+fyaG+Vu3HZ/yTXn0/NPAa28l7sb8f5WDS2/0E59r3Lly8/vSl/i+MJp7H+j2Ub+3Ic+3gm+ofyb9OuE/2HVq9efebRWQDAQImL+U3lgp8tw9at7bKmBLbSPxzrvp39oaGh4RgfKF9QWBL9vW3IaCY/B/e3wNZMhqyfs9/r9S7OEFE2nct+j3ZNtE9HR0cvLdv/rrN8avud2q/R1mU/Mtwji8pj2K483gxJx2pN57HrdJr5DWw3x/YO1vWmBLbsx3m8mOP6XGeSITvmfB1zt+U439v2fWmVfU/8TQCAAVO+HDAVdDL4ZGBox81fA1uGlzZ8rchw0Vk2FagyiLXhoBvYwilR39hM3j3bU83/thsosl/te7rAlgHwmwwoMVzSXTZfyjlPG9ji+J+I5TuP0W6o1y+haeqcWs0/CGz5ubeoH4nl67v1Vglp4yW8TXwGsSv3nUG4rgMAAyAu7iu64SAu7Kuazl2gbsBo5hjYovZK3tWabX67vNr3xPLh4eFz2lrMvz5DTLRH21ptaGjo3LKtaVtsY2k9p6uZIbAdr7kEtlQC19/uIhZ5l3M85m9ryrd8u9xhA4ABVoLLu+04Luybms4dmm7AiP7hpjwuLWGnG7g+X7ly5XnZnyGw/ZHLSn1DCSd3lGX7ut+eLMfV3feemHN2tKvaWqnfnyGlW5tPec69Xu+Kun4iYltroh2Ypj4e7f3S/ynHEUwvaX8a5Z+KeW9E+2K6b6FGfUvf7+EBwGDKYBQX8ocjCL0Qr3fG+GAElMvLB+I/zPAQy64dmfwgewaLbJujHcp+zPkqW6lnbWJO9nNeM/mZuHyU93J/8vfeMvTtjmVby7L3u/Pzg/fluCa2H+3VrOUxRf+tmPda9/jzUWB5JDqvRia/TNF+mD/b0/U6x6v8hMreuh77eqfs4/tm8ssc2T/uO3slBN9X11Mzj9/8BQCYVflx3l3Zb2Z4HPpvlF/SWIiAOZsMzHUNAGAhLY4Acm+5K3hBvfDfLkLmjmgb6/oCyfdqW75WdQAAjqX83trjdX0h5L/4imB7T10HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgP+BPKG5n9Mb67QMAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAABcUlEQVR4Xu2UrUsEQQDF91BBQTTIBt2PcZctF0wLgmK0XBDkMAhmESyC5ZJJ/AeMIoJBRDGLyWSw3kWTwoHJpkHk1N/s1w3DrR/LFuUe/JiZt2/mzYZdw+jrz2k61qruf6UgCMZc190SQhzADkzqmUg8qMImXEOHomM9kyfP89gimhSts2+YeY3xDn9Wz0ZFPFxmnIf2L4oGyR/ChZynJus9iq9s2x5Rsl3JV4aHnxZxmE/+kbGh+nh1eMEPVT9TgaJF8u96Eesl/A9YU/1MBYqiA/OKdD9TgaJGrwNLLyK73evA0ovyDszzMxUoWiD/ph+YFkFd9TN9V+T7/rjjOFNMK3LNd2KRv4d9Ncf+DbwnqKp+prQITozksFSWZU3gN+EV5hK7wnwXbuUlpBGG4RDrczg1lI84kht/D23oiPiVJc/crMWtZ2TGNM1RvMvk9yLSvbIg8c8Ya3AEN1zM7jaUpwEuG8KKHOVaD/TV1z/WJwIneQIxWkUzAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAZCAYAAAC2JufVAAAClklEQVR4Xu2VO2gUURSGZ1BB8UXUzeK+ZmZ3cUkhCKuIoFYiiihiFIIRrLSw0C5C2mBjmcJAGrEIWNhJRBB8kCYgCBZREEQNETGQzhTaxO/s3GtOjju4Inbzw8+d+99zz/3vc4IgR47/hEqlsimKootwEt5OkqRlY7qBfntrtdqFRqPRTzUsFApbqtXqEXIMm9AwjuOD6OPwDjyFts7ErKJer28n6Akck6R03sf3GzhoYy2IHSJuRROT85JDhYVoI/AF7Um5XN5JOQUn2+32BhW3CoJvEvCSss9r1IfhW1asqGMt6HOauPeOs9RvNJvNbSamTdtXysNKq6N9wvwJHesb+8QQjfe0zhYcQP9GeUbrFmJKJmV1DfLcEgNwt9dardZW6jP0vUs1VOGdDgNwyZpys1uWhFq3+JMp8m4kx7Q1JceE+nNZEL1DHfjBs0xZ3UJMSQzl4yjdwg98XwncIVaDZ5lao3cgSRFX7OB/Y4q4p9zCHVKnbFJfQB+hGsqAbuDeTSGc/BdTsj1CJYkRuVkLMJGLEqUr2LuprMGz9F4gfWSiMuGswbP0Dmrp1fxiB/em4KjWNXjf9tD+GT6Ux9fr3pRsLdX1fD+wgytTM3ITvW4bp/U2kPAY2g8pvSaPLE9EKXBXWBnXpvz2LUu7i5N3cAkO+FylUmkX9Tk47rU1oNMlOE9A4iRJPAZnxYgI7hV+Db/DQ6K5P8EUk4l9LvmO0jP067X2h5+mIR/nfkWLPtdvkM6YmiDgGR3POkNzsfpVuBV9hPaOwxt5neT70V/BUXJcp/xIed9PxgP9XJQ+F1fJcTlKf2PXAvtwGoRyRuh0nkGPZv6TuqBYLG6mz3GZkFu1rgPJass5E8q3bc+RI0eOLvgJgpfXbz/m5JUAAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABr0lEQVR4Xu2TOUsDURSFJ6igKEjQGMg2WQSxE8Z/4NIp4gISe22sXdBCkBRaKjZ2KcRfYKVFSkkaC6OFiE3AQiwtXb4TZ8aXScTKLhcOzD333PPuW8ay2vGvkUgkemzbzoNTUIjH44mgJpPJjFA7dDV59QQ1fiAYBTfpdHpbZqlUaonvci6XGzI0C+AOfiwSifTxvQ8us9lsv+lVDzVSvJUhaSgajfaSX4E3zB1XkyR/ACteH7UweQWs+2ZGcZPCq6Y1uAkW2fK2JzNzETdCcGegpMl9VqNDXmtFtj0guFvu+Omtmx61MLVYuAj/DJ/1SU3nTinjE7ADjkFVZxdo/s20kVciEnyAeZcOIT4gv9eluZdSamq2/jatxmKxQYOfgfukaa3VxXnR0pR3F4V81CTmYRumReV8F5qaLd+0FnzTnZDnoEJD2CPNSZUnk8lZ8nf4SU9DrRvuQtC3x9cD4RSFF2OKhjMVoVcBVwZ7Xh/PbVhTwi17nB+O43RR3AVPGK/a37dfY7pxU6fc1WyARe1Oi6vf1DWE/hpEc5zztC4nWFeIV1066YP1drTjH+ILERyGHUzVvEwAAAAASUVORK5CYII=>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABsElEQVR4Xu2TvUsDQRDFL6CgqIhIOCF32ctFOOyEE0WwFCsVQQtJwEqw0VYbC0EstBJLCYiFf4KVFpE0wfRJYWEjpBBLCwuNv0lu4+WSYJUuDx47++bN7LIfhtFHz2BZ1rBSKgOv4VkikbCiHkEqlfLIXwS+jNRFPXU4jjOVTCafGC+lGfEqBa+MS2Ef2iYs45uNx+OjxKfwwXXd8bBPMEAiByvswtSi7BYWdUE6nbaZv8Cs9rDoBPMS3NdaHQgz8APmZXWtU7CG9sO4HPiy8JO5/1dtxNDuorVS7Is5mgia1hiPZE581aGpHN0tehXdbYr/NYW5UHG3pq26nBliERY8zxvTumqcaU2KgkvJtxUbXZoKVONW3zEsBEaHeUU3NU1zhPixU3HXpp2AeU+1XpTsvK04aPrW9q4xHpAo8KRUIMXQblToSdm2vc78Wy8ioOEQ2r1QYq3rpKz2BRdlTvN54qo00h52MonvGZ5ojd80LbtE29ZaE8EuynAXHouRHe2QikV8c6rx0w7hFnGJhue+7w+GfU3Ib5JnxLgiFxPNa0hOPDTbkF8WzffRRw/wC2R9hAlJbGd9AAAAAElFTkSuQmCC>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAZCAYAAADJ9/UkAAACL0lEQVR4Xu2UPUgcQRzF91AhkoCIHKfcx94HSbAQhMPGImkUYmEQTCFGxFqCTSABsRDExlIEQQSxSIqkSiGYCGoZSCrxI4VNgpBCtNJGOPT33J1zd7w7QRIb78Fj5t7/zf/Nzs2u41Rx75H2MGDrBplM5qnrujNwIZVKDcVisYe2J5FI1FMflEderbE9RWBohaNwHRYIX7Y9ArV++En+eDyeIHyM+Q+au8aTzWYb0NbgVDQafUSvdua7WhvsVYSaYepj7IQHpcIJiBG2qtCAHME/h3/SCHjea0OMjUbj92u4px5GuwYMLfB3qXCa5an94kgfW7rCFv15o4Lt9clksgP9hPFlUA/hhvAstb9wn/pzaTpi5t9MU9f7+47s9f7GT+F0UA+hUjiI0OQd9XOR+RK+L8zfqiaDCbHXl9NDuCFcqNHuzQbgIY27navwXun2+n8Rrsv1RsfM2Ok/tTZQoPmwDMx7/ku4npDadi6XS/qSTkHvsv7Ly5tcLqScHkKlcPRFOGvreF+gHyvAXEp7feDCjQf1ECqFS3NL3Fa99+g/Yas+KoybcAX/A+MhvAvtTGNwbQgmHH5w/EtkoNcJfYem6YAc4ecI+kfmtRIIGIJ/0DLGw3wKfterWVxp4O/sABbcq5t8QuMtPiptvq0m5b1qR3DC9b5an9G+4ms2vfL5fB3aPLWNtPfVVLA23W48twbH3ETzXviKJ3niWCfkI6KaPFzEZ9qQbaiiiiruDBf7N7czusjHYQAAAABJRU5ErkJggg==>

[image10]: <data:image/png;base64,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>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABaklEQVR4Xu2Sr0vEcBjGN85mMBim7NdtoHLBZLtiUbAoggZBEbOIRdBisFwxikkOxKBBk00N/gOaBMFgEQ4Mosk69PPObW4vxw5R2z3wsO8977PPbft+DaOrf1f1Sws6TxUEwYjv+7v4wPO8JcuyenUnFoUaXsXXOAJ6pDsiZnP4VPq2bTtA11nf8Ee+7sZQQLNc67jVDsqNFpALgeVik/4+/Z1cVhSFQfzUDgpwjNmD4zhDKt8ib+azgjpAQ2bP+JH5uGRhGPaxvnJdd0b3M5VBkQl4k/mHmPUhvXPWGzLT5UwdoKIK80YKxi/AJ41fQGVT1uR1udaTpxRwBHhZlzOVQcmbeE/ndKfI32Qj9SxWGVQyZg2dyxEjv8U1PYuVQvGxob6T7DD5PfBqLjb5uUJ+wronl8fHZYJBC0f+9ya8c8Md53I0qVWS3X/F23gRn5Fd0hsoAH8qXrcf0DSe55wOG2U731VXf6NPhONmwA3nndoAAAAASUVORK5CYII=>

[image12]: <data:image/png;base64,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>