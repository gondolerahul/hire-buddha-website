# Security & Governance — /product/security

> **Page:** Product — Security, Governance, Model & Data Governance
> **Priority:** P0
> **Estimated Word Count:** 1,500–2,000
> **Psychological Principles:** Risk Aversion Neutralization · Authority Bias · Trust Signal Saturation
> **Buyer Journey Stage:** Evaluation → Objection Handling
> **Goal:** Neutralize the #1 enterprise objection: "Is this safe?" This page must survive a security review.

---

## Section 1 · HERO

**Eyebrow:**
`PRODUCT · SECURITY & GOVERNANCE`

**Headline:**
Enterprise-grade security. By design, not afterthought.

**Subheadline:**
AES-256-GCM encryption. Stateless JWT authentication. Multi-tenant isolation. Human-in-the-Loop governance. Credit circuit breakers. Model residency controls. Full audit trails. Every decision logged. Every cent tracked.

---

## Section 2 · MULTI-TENANT ISOLATION

**Eyebrow:**
`DATA SEGREGATION`

**Section Headline:**
Your data. Only your data. Always.

**Section Copy:**
HireBuddha enforces a four-level organizational hierarchy with full data segregation at every tier:

| Level | Role | Scope |
|---|---|---|
| **App Admin** | Platform operator | Global configuration, partner management |
| **Partner** | Reseller / agency | Manages multiple tenant accounts |
| **Tenant** | Your company | Full data isolation — agents, memory, knowledge, executions |
| **User** | Individual team member | Role-based access within your tenant |

**Technical Details:**
- Every database query is scoped to your company ID. There is no API path, no query, and no execution context that crosses tenant boundaries.
- Knowledge bases, CORTEX memories, agent configurations, and execution logs are fully segregated.
- Partner-level accounts cannot access tenant data — only tenant metadata (billing, status).

**Key Message:**
> Your AI workforce's memory, knowledge, and decisions are invisible to every other tenant on the platform. Period.

---

## Section 3 · ENCRYPTION & AUTHENTICATION

**Eyebrow:**
`CRYPTOGRAPHIC SECURITY`

**Section Headline:**
Encrypted at rest. Authenticated on every request. Locked on breach.

### Key Vault — AES-256-GCM Encryption

All sensitive credentials — API keys, OAuth tokens, database passwords, integration secrets — are encrypted using **AES-256-GCM** with nonce-prepended ciphertext. The master encryption key is stored outside the database in a separate vault. No key is ever stored in plaintext. No key is ever transmitted unencrypted.

### Authentication — Stateless JWT

- **Access Tokens:** 15-minute expiry. Stateless. Validated on every API call.
- **Refresh Tokens:** 7-day expiry. HTTP-only cookies. Secure flag. SameSite strict.
- **Token Rotation:** Refresh tokens are rotated on use. Old tokens are immediately invalidated.

### Company Suspension Middleware

Instant API lockout for any tenant flagged for policy violations, billing suspension, or security incident. One switch — all endpoints locked. No degraded service, no partial access. Full lockout at the infrastructure level.

---

## Section 4 · HUMAN-IN-THE-LOOP (HITL) GOVERNANCE

**Eyebrow:**
`YOUR AI DOESN'T GO ROGUE`

**Section Headline:**
Configurable checkpoints. Your rules. Your approval.

**Section Copy:**
Your AI workforce doesn't make high-stakes decisions without you. HITL checkpoints are configurable per agent, per action, per process, and per loop — letting you define exactly where execution pauses and waits for human approval.

### Checkpoint Examples:

| Checkpoint | When It Fires |
|---|---|
| Before high-value email dispatch | Agent drafts an email exceeding a configurable value threshold |
| Before contract e-signature routing | A contract is ready to be sent for signature |
| Before outbound payout | A payment exceeding a configurable amount is queued |
| Before high-liability clause acceptance | A legal clause is flagged as high-risk by the Contract Review Specialist |
| Before self-evolving code promotion | The Meta Agent has generated or modified code and wants to promote it to production |

### How Approvals Work:

1. Execution pauses at the checkpoint.
2. Pragya surfaces the approval request — via the dashboard, Slack, Microsoft Teams, email, or WhatsApp.
3. You review the pending action: full context, the agent's reasoning, the proposed output.
4. Approve, reject, or edit — then execution resumes.

**Key Message:**
> Your AI workforce asks permission at every checkpoint you define. You're not abdicating control — you're elevating it. You stop managing tasks and start managing outcomes.

---

## Section 5 · MODEL & DATA GOVERNANCE

**Eyebrow:**
`YOU CONTROL WHICH BRAINS TOUCH YOUR DATA`

**Section Headline:**
Choose your models. Restrict your fleet. Audit every decision.

### Fleet Allow-Lists & Data Residency

The Intelligence Engine's frontier fleet is powerful — but you decide which models your data touches. Configure allow-lists to:

- **Restrict providers** — Exclude any model provider for data-residency, compliance, or policy reasons.
- **Pin models** — Force specific agents or tasks to use a designated model (e.g., "All legal review must use Claude Opus").
- **Regional compliance** — Ensure data flows only through providers that meet your jurisdiction's requirements.

### Full Attribution & Auditability

Every reasoning step records:
- **Which model** was selected by the router (and why)
- **Token count** — input and output
- **Cost** — per step, per run, per agent, per process
- **Latency** — wall-clock and compute time
- **Decision rationale** — the router's scoring breakdown

Routing is completely auditable. Export logs for compliance review. Query them for cost optimization.

### Sandboxed Self-Modification

All Meta Agent tool synthesis and self-evolving code runs in isolated sandboxes:
- Code must pass auto-generated test suites before promotion.
- Pre-Critic and Post-Critic audit every modification.
- Every version is stored. One-click rollback.
- Production code is never edited in place.

**Key Message:**
> You control which brains touch your data — and you can prove what every one of them did.

---

## Section 6 · CREDIT CIRCUIT BREAKERS

**Eyebrow:**
`NO RUNAWAY SPEND`

**Section Headline:**
Every cent tracked. Every budget enforced. Automatically.

**Section Copy:**
AI spending surprises are the fear that stops adoption. HireBuddha eliminates them structurally:

### Real-Time Cost Tracking
Every execution step tracks its cost — model tokens, tool invocations, voice minutes, creative generation — in real-time. Costs are visible per step, per run, per agent, per process, per loop.

### Minimum Wallet Balance Thresholds
Before any execution begins, the system checks that your wallet has sufficient balance:

| Tier | Minimum Balance |
|---|---|
| Process | $0.50 |
| Agent | $0.05 |
| Skill | $0.02 |
| Action | $0.01 |

### Automatic Execution Halt
If a run's cumulative cost approaches the agent's max_cost_usd governance limit, execution pauses. You're notified. You decide whether to continue, increase the budget, or abort.

**Key Message:**
> No runaway spend. No surprise invoices. Your AI workforce costs exactly what you authorize it to cost.

---

## Section 7 · AUDIT TRAIL

**Eyebrow:**
`FULL ACCOUNTABILITY`

**Section Headline:**
Every decision. Every token. Every cent. Logged.

**Section Copy:**
Every execution run on HireBuddha produces a complete audit trail:

- **Token Counts** — Input and output tokens per step, per model
- **Cost Attribution** — Precise cost per step, aggregated per agent, process, and loop
- **Latency Metrics** — Wall-clock time, compute time, queue time
- **Decision Logs** — The AgentLoop's reasoning at every stage: what was perceived, what was strategized, what the Pre-Critic approved or blocked, what the Post-Critic corrected
- **Context State Snapshots** — Full context dumps at checkpoint nodes for debugging and replay
- **HITL Decisions** — Who approved what, when, and any edits they made

### Exportable. Queryable. Compliance-Ready.

Audit logs can be:
- Exported as structured JSON or CSV for external compliance tools
- Queried directly via the platform's analytics dashboard
- Filtered by date range, agent, cost threshold, or decision type
- Used for debugging — replay any execution step with the exact context that was active

---

## Section 8 · SOCIAL PROOF

**Section Headline:**
Trusted where trust is non-negotiable.

> **Saraswat Bank** — a multi-state cooperative bank — deployed HireBuddha for loan recovery and loan origination. Banking-grade data governance, full HITL checkpoints on all customer-facing communications, and complete audit trails for regulatory compliance. The platform met their security evaluation criteria without modification.

---

## Section 9 · FINAL CTA

**Section Headline:**
Security that survives scrutiny. Governance that earns trust.

**Copy:**
AES-256-GCM encryption. Stateless JWT auth. Multi-tenant isolation. HITL governance. Credit circuit breakers. Model residency controls. Full audit trails. This isn't a security section bolted onto a product page — it's the architecture the product was built on.

**Primary CTA:**
Get Started Free

**Secondary CTA:**
Schedule an Architecture Review

**Tertiary CTA:**
Download Security Whitepaper

---

## SEO Metadata

**Title Tag:**
Enterprise Security & Governance — Encryption, HITL, Audit Trails | HireBuddha

**Meta Description:**
AES-256-GCM encryption, JWT authentication, multi-tenant isolation, Human-in-the-Loop governance, credit circuit breakers, model residency controls, and full audit trails. Enterprise-grade security by design.

**H1:**
Enterprise-Grade Security. By Design, Not Afterthought.

**Canonical URL:**
https://hirebuddha.com/product/security
