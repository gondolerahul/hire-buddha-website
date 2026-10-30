# Security & Governance — Product Page

> **Route:** `/product/security`
> **Template:** Product
> **ICP:** Universal
> **Priority:** P0
> **SEO Title:** Enterprise-Grade Security & Governance | HireBuddha
> **SEO Description:** AES-256-GCM encryption, stateless JWT authentication, multi-tenant isolation, Human-in-the-Loop governance, credit circuit breakers, and full audit trails. Security by design, not afterthought.

---

## Section 1: Hero

**Psychological Principle:** *Risk Neutralization + Authority Bias.* The #1 enterprise objection is "Is this safe?" This page must neutralize that objection in the first 10 seconds. Leading with specific encryption standards signals engineering rigor, not marketing fluff.

**HEADLINE:**
# Enterprise-grade security. By design, not afterthought.

**SUBHEADLINE:**
AES-256-GCM encryption. Stateless JWT authentication. Multi-tenant isolation. Human-in-the-Loop governance. Credit circuit breakers. Full audit trails. Everything your security team needs to say yes.

---

## Section 2: Multi-Tenant Isolation

**Psychological Principle:** *Containment Assurance.* The fear: "Will my data leak to other companies?" The answer must be architectural, not promissory.

### Your data. Your tenant. Your rules.

HireBuddha operates on a strict 4-level hierarchy for data isolation:

| Level | Role | Scope |
|---|---|---|
| **App Admin** | Platform operator | Full system access. Creates and manages Partners. |
| **Partner** | Reseller / agency | Manages their own Tenants. Cannot access other Partners' data. |
| **Tenant** | Your company | Full data segregation. Every database query is scoped to your company ID. |
| **User** | Individual team member | Role-based access within the tenant. |

**How isolation is enforced:**
- Every database query includes a company-scope filter. There is no API endpoint that returns data without tenant validation.
- Agent executions are tenant-scoped. An AI Employee in Company A cannot access Company B's knowledge base, memory, or conversation history.
- API keys, OAuth tokens, and credentials are encrypted per-tenant using AES-256-GCM with nonce-prepended ciphertext.

**KEY MESSAGE:** *"Multi-tenant isolation isn't a feature we added. It's how the database was architected from the first schema."*

---

## Section 3: Encryption & Authentication

**Psychological Principle:** *Specificity = Credibility.* Vague security claims ("bank-grade encryption") are meaningless. Specific implementation details (cipher suite, key management, token lifecycle) build real trust.

### Encryption at rest. Encryption in transit. No exceptions.

**Key Vault — AES-256-GCM**
- All API keys, OAuth tokens, and sensitive credentials are encrypted using AES-256-GCM (Galois/Counter Mode)
- Each encrypted value uses a unique nonce, prepended to the ciphertext
- The master encryption key is stored outside the database — never co-located with encrypted data
- Decryption happens in-memory, on-demand. Keys are never written to logs or exposed in API responses.

**Authentication — Stateless JWT**
- Access tokens: 15-minute expiry. Stateless. Signed with RS256.
- Refresh tokens: 7-day expiry. Stored as HTTP-only, secure, SameSite cookies. Cannot be accessed via JavaScript.
- Token rotation: Every refresh cycle issues a new access + refresh pair. Old refresh tokens are invalidated.

**Company Suspension Middleware**
- If a tenant needs to be suspended (non-payment, compliance, or security incident), the ASGI middleware blocks all API requests for that company ID instantly.
- No gradual degradation — full lockout. Active executions are halted. No data is deleted.
- Reactivation restores full access with zero data loss.

---

## Section 4: Human-in-the-Loop (HITL) Governance

**Psychological Principle:** *Illusion of Control (Corrected).* The visitor's current "control" over operations is actually chaos — emails sent by employees they don't monitor, expenses approved by managers they don't audit. HITL provides real, structured control.

### Your AI workforce doesn't go rogue. It asks permission.

Human-in-the-Loop governance lets you define checkpoints where AI execution pauses and waits for human approval. You decide which actions are auto-approved and which require a human sign-off.

**How it works:**
1. You configure HITL rules per agent, per action, per process — at any granularity you need.
2. When the AI Employee reaches a HITL checkpoint, it pauses execution and sends a notification.
3. The notification arrives in Slack, Microsoft Teams, or email — with the pending action, context, and "Approve / Reject / Modify" options.
4. You review, decide, and respond. Execution resumes or aborts based on your decision.

**Real-world examples:**
- "Pause before sending any email to a contact valued over $50,000"
- "Require approval before executing any payout over ₹50,000"
- "Require sign-off before routing a contract for e-signature"
- "Alert me when customer sentiment drops below 0.3 during a call"
- "Auto-approve standard support responses. Require approval for refunds."

**How Saraswat Bank uses HITL:**
Saraswat Bank deployed voice agents for loan recovery. HITL is configured to require human approval before any payment arrangement exceeding ₹1 lakh. Below that threshold, the AI agent negotiates and confirms autonomously. This balance gives the bank scale (thousands of automated calls) and safety (human oversight on high-value decisions).

**KEY MESSAGE:** *"HITL isn't a limiter. It's a trust-building mechanism. Start with full HITL. Reduce oversight as confidence grows. You set the pace."*

---

## Section 5: Credit Circuit Breakers

**Psychological Principle:** *Financial Safety Net.* The fear of "runaway AI costs" is real. Circuit breakers make it architecturally impossible for costs to spiral — and showing the minimum thresholds proves the platform is designed for accessibility, not exploitation.

### No runaway spend. No surprise invoices. Every cent is tracked.

**How credit circuit breakers work:**
1. Every execution type (Process, Agent, Skill, Action) has a minimum wallet balance requirement.
2. Before any step executes, the system verifies sufficient credits are available.
3. If your balance drops below the threshold, execution halts automatically — mid-process if necessary.
4. Real-time cost tracking shows you exactly what each execution costs, as it runs.

**Minimum balance thresholds:**

| Execution Type | Minimum Balance Required |
|---|---|
| Process | $0.50 |
| Agent | $0.05 |
| Skill | $0.02 |
| Action | $0.01 |

**Per-step cost attribution:**
Every step in every execution run is tracked with:
- Token counts (input + output)
- Tool invocation costs
- Voice minutes consumed
- Total cost attributed

**KEY MESSAGE:** *"You can start a Process with $0.50. You can run an Action for a penny. And you'll know exactly what it costs before, during, and after execution."*

---

## Section 6: Full Audit Trail

**Psychological Principle:** *Transparency as Trust.* Companies don't trust "black box" AI. A complete, exportable audit trail transforms AI from "mysterious" to "accountable."

### Every decision logged. Every cent tracked. Every run traceable.

Every execution run produces a complete audit record:

- **Decision logs** — What the AI decided, why, and what alternatives it considered
- **Tool invocations** — Which tools were called, with what inputs, and what they returned
- **Token counts** — Input and output tokens per LLM call
- **Cost attribution** — Exact cost per step, per agent, per run
- **Latency metrics** — How long each step took
- **Context state snapshots** — Full state at each checkpoint, enabling debugging and replay

**Export and compliance:**
- Audit data is filterable by agent, loop, date range, cost range, and status
- Exportable as CSV or JSON for integration with your compliance reporting systems
- Context state snapshots enable full replay of any execution for investigation or debugging

**Real example:** AU Bank uses the audit trail to generate monthly compliance reports for their regulators, documenting every voice agent interaction in their loan recovery campaigns — including call transcripts, decision reasoning, and cost breakdowns.

---

## Section 7: CTA

### Security that earns trust. Not just claims.

AES-256-GCM. JWT with 15-minute rotation. HITL governance. Credit circuit breakers. Full audit trails. Multi-tenant isolation.

This isn't a checklist on a marketing page. It's how the platform was built — from the first line of code.

**PRIMARY CTA:** Get Started Free
**SECONDARY CTA:** Talk to Pragya about your security requirements
**TERTIARY CTA:** Schedule a security review with our architecture team
