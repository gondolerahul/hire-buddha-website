# Arc I — Perceive — /solutions/perceive

> **Page:** Solutions — Arc I: Perceive
> **Priority:** P1
> **Estimated Word Count:** 1,500–2,000
> **Psychological Principles:** Specificity Bias · Authority · Competitive Urgency
> **Buyer Journey Stage:** Evaluation
> **Goal:** Show what the Perceive arc replaces and how its agents, skills, and tools work.

---

## Section 1 · ARC HERO

**Eyebrow:**
`SHEEL · ARC I · PERCEIVE`

**Headline:**
See everything. Before anyone else does.

**Subheadline:**
The Perceive arc is the intelligence layer of your business. While your competitors check dashboards weekly and commission market reports quarterly, your AI workforce is sensing the market, monitoring your customers, and analyzing your numbers — continuously, automatically, in real-time.

**Absorbs:**
Market Research · Business Intelligence · Monitoring · Lead Intake · Demand Forecasting · Competitive Analysis · Regulatory Tracking

**Part of Sheel:**
Perceive feeds directly into Engage (qualified signals become outreach) and Orchestrate (anomalies become actions). One loop. No handoffs.

---

## Section 2 · THE FLOW

**Eyebrow:**
`HOW IT WORKS`

**Section Headline:**
From raw signal to actionable intelligence.

**Visual Direction:**
A DAG/flow diagram showing agents → skills → actions in the Perceive arc.

**The Perceive Flow:**

1. **Continuous Sensing** — The Market Intel Scout, Social Listener, and Regulatory Watchdog run on scheduled triggers — daily, hourly, or continuously. They scan the web, social platforms, regulatory portals, and connected data sources.

2. **Signal Processing** — Raw data is enriched, classified, and scored. The Demand Sensor applies forecasting models. The Telemetry & Health Monitor detects anomalies in your own operational metrics.

3. **Intelligence Packaging** — Findings are structured into CORTEX memory nodes — tagged, categorized, and linked to relevant Processes and Agents. The intelligence is immediately available to the Engage and Orchestrate arcs.

4. **Threshold Alerts** — When a signal crosses a configured threshold — a competitor price change, a churn risk spike, a regulatory deadline — the arc triggers a notification and, if configured, an autonomous response in the downstream arc.

---

## Section 3 · MEET THE AGENTS

**Eyebrow:**
`YOUR INTELLIGENCE TEAM`

### Market Intel Scout

**Role:** Enrich Ideal Customer Profiles and gather intent signals from the web.

**Personality:** Methodical, thorough, detail-oriented. Low verbosity, high precision.

**Channels:** Internal (no customer-facing communication). Outputs to CORTEX and the Engage arc.

**Tools:** Web Search · Web Scraper · Enrichment APIs (Apollo, Clearbit, ZoomInfo) · pgvector Semantic Store

**Skills:**
- ICP Enrichment — Takes a target account list and enriches with firmographic, technographic, and intent data
- Competitive Monitor — Tracks competitor websites, pricing pages, and product launches
- Signal Scoring — Assigns intent scores to prospects based on behavioral signals

**Reasoning Mode:** ReAct — observe, enrich, score, store.

---

### Telemetry & Health Monitor

**Role:** Detect usage anomalies and churn risk in your own operational data.

**Personality:** Analytical, precise, alert. Zero humor. Maximum clarity.

**Channels:** Internal dashboards, alerts to Pragya, Slack/Teams notifications.

**Tools:** SQL Database · Sandbox Code Executor · pgvector

**Skills:**
- Churn Risk Detection — Monitors customer engagement metrics and flags accounts showing disengagement patterns
- Anomaly Detection — Statistical analysis of operational KPIs with configurable alert thresholds
- Health Scoring — Generates composite health scores for accounts, processes, and systems

**Reasoning Mode:** ReAct — query, analyze, detect, alert.

---

### Social Listener

**Role:** Track brand sentiment, mentions, and emerging trends across social platforms.

**Personality:** Culturally aware, nuanced, concise.

**Channels:** Social platform APIs (Twitter/X, LinkedIn, Reddit, review sites). Outputs to CORTEX and the Engage arc.

**Tools:** Social OAuth APIs · Web Scraper · Sentiment Analysis · pgvector

**Skills:**
- Brand Monitoring — Real-time tracking of brand mentions, sentiment, and share-of-voice
- Trend Detection — Identifies emerging topics, hashtags, and conversations relevant to your industry
- Competitive Sentiment — Compares your brand sentiment against competitors

**Reasoning Mode:** ReAct — scan, classify, store, alert.

---

### Regulatory Watchdog

**Role:** Monitor legal and regulatory changes that affect your business.

**Personality:** Precise, cautious, thorough. High formality.

**Channels:** Government portals, regulatory databases, industry publication feeds. Alerts via email, Slack, Pragya.

**Tools:** Playwright (headless browser for portal navigation) · Email Alerts · Evidence Store (pgvector)

**Skills:**
- Regulatory Crawl — Navigates government portals, licensing boards, and compliance databases on schedule
- Change Detection — Identifies new regulations, amendments, and deadline changes
- Impact Assessment — Cross-references regulatory changes against your active processes and compliance profile

**Reasoning Mode:** ReAct — navigate, detect, assess, alert.

---

### Demand Sensor

**Role:** Forecast demand from market signals, operational data, and historical patterns.

**Personality:** Analytical, forward-looking, probabilistic.

**Channels:** Internal. Outputs forecasts to the Orchestrate and Fulfill arcs.

**Tools:** SQL Database · Sandbox Code Executor (statistical models, time-series analysis)

**Skills:**
- Demand Forecasting — Time-series analysis on sales, inventory, and market signals
- Scenario Modeling — Generates multiple demand scenarios with probability distributions
- Capacity Planning — Translates demand forecasts into resource and capacity recommendations

**Reasoning Mode:** Chain-of-Thought — deliberate, model, validate, recommend.

---

## Section 4 · EXAMPLE SCENARIO

**Eyebrow:**
`IN ACTION`

**Section Headline:**
A week in the Perceive arc.

**Monday, 6:00 AM:**
The Market Intel Scout enriches 200 new leads from your target account list. Firmographic data, technology stack, recent funding announcements, and LinkedIn hiring signals are all captured. 43 accounts score above your qualified threshold.

**Monday, 6:15 AM:**
The 43 qualified accounts are automatically pushed to the Engage arc. The Outbound Prospector in the Engage arc receives them with full context — no manual handoff, no spreadsheet, no Slack message.

**Wednesday, 2:00 PM:**
The Social Listener detects a 40% spike in negative sentiment around a competitor's recent product change. The signal is packaged and sent to the Campaign Orchestrator in the Engage arc — an opportunity to position against competitor weakness.

**Thursday, 9:00 AM:**
The Telemetry & Health Monitor flags two accounts with declining engagement scores. Churn risk alerts are sent to Pragya and the Renewal & Expansion Agent in the Engage arc. Preemptive outreach is triggered before the customer even thinks about leaving.

**Friday, 7:00 AM:**
The Regulatory Watchdog discovers a new compliance requirement in your industry with a 90-day implementation window. The finding is logged to CORTEX, an alert is sent to the Contract Review Specialist in the Sustain arc, and a timeline is created in the Orchestrate arc.

**Result:** Five intelligence actions. Zero human involvement. Zero missed signals. Every downstream arc is already acting on what Perceive discovered.

---

## Section 5 · CONFIGURATION

**Eyebrow:**
`YOUR CONTROLS`

**Section Headline:**
Tune the sensitivity. Set the boundaries.

- **Scan Frequency:** Configure how often each agent runs — continuous, hourly, daily, weekly
- **Alert Thresholds:** Set the trigger points for notifications and autonomous action
- **Source Priority:** Weight certain data sources over others
- **HITL Gates:** Require approval before any intelligence is acted upon in downstream arcs
- **Cost Governance:** Set max_cost_usd per agent per run
- **Personality Tuning:** Adjust verbosity and detail level of intelligence reports

---

## Section 6 · FINAL CTA

**Section Headline:**
Your competitors check their numbers weekly. Your AI workforce checks them every minute.

**Primary CTA:**
Activate the Perceive arc →

**Secondary CTA:**
Talk to Pragya about your intelligence needs →

---

## SEO Metadata

**Title Tag:**
Perceive — Market Intelligence, Monitoring & Demand Sensing | HireBuddha Solutions

**Meta Description:**
The Perceive arc of Sheel senses the market, monitors your customers, and analyzes your numbers — continuously. Market Intel Scout, Demand Sensor, Social Listener, and more. Deploy your intelligence team.

**H1:**
See Everything. Before Anyone Else Does.

**Canonical URL:**
https://hirebuddha.com/solutions/perceive
