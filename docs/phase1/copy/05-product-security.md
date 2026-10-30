# Security & Governance Copy — `/product/security`

> **Goal:** Neutralize the #1 enterprise objection – "Is this safe?" This page must survive a security review. Convert fear into confidence and control.
> **Word budget:** 1,500–2,000 · **Priority:** P0
> **Dominant principle:** *Control restoration + authority signaling.* AI anxiety is fundamentally a loss-of-control fear. Every section hands control back to the buyer.

---

## SECTION 1 — Hero

**Principle:** *Pre-emptive framing.* "By design, not afterthought" inoculates against the suspicion that security was bolted on late – the exact worry an enterprise reviewer arrives with.

**Eyebrow:** Security & governance
# Enterprise-grade security. By design, not afterthought.

**Subheadline:**
AES-256-GCM encryption. Stateless JWT authentication. Multi-tenant isolation. Human-in-the-Loop governance. Credit circuit breakers. Model and data governance. A full, exportable audit trail. Autonomy you can prove and bound.

---

## SECTION 2 — Multi-Tenant Isolation

**Principle:** *Containment assurance.* The buyer needs to know their data can never touch anyone else's. A clear isolation hierarchy is the proof.

## Your data is yours. Walled off, at every level.

A 4-level isolation hierarchy governs every operation: **App Admin → Partner → Tenant → User.** Every database query is company-scoped. There is no path by which one tenant's data, schema, or memory reaches another's. Your dynamic per-tenant schema grows in your isolated space alone.

---

## SECTION 3 — Encryption & Authentication

**Principle:** *Specificity as credibility.* Precise standards (AES-256-GCM, 15-minute tokens, master key outside the DB) tell a security team "real engineers built this."

## Encrypted at rest. Authenticated on every call.

- **Key Vault** – every external API key and OAuth token is encrypted with AES-256-GCM, ciphertext nonce-prepended, and the master key is stored *outside* the database.
- **Access handshake** – stateless JWT access tokens expire in 15 minutes; refresh tokens live in HTTP-only cookies for 7 days.
- **Company suspension middleware** – a suspended tenant is locked out instantly, terminating running campaigns and phone lines on the spot.

---

## SECTION 4 — Human-in-the-Loop Governance

**Principle:** *Control restoration (the core conversion).* "It asks permission at every checkpoint you define" is the single most reassuring sentence on the page. It converts "AI goes rogue" dread into "I'm holding the leash."

## Your AI workforce doesn't go rogue. It asks.

You define the checkpoints. Execution pauses and waits for your approval at exactly the moments that matter:
- Pause before sending any email over $10K in value.
- Require sign-off before routing a contract for e-signature.
- Approve before any outbound payout.
- Approve before self-evolved code is promoted to production.

Approvals come to you where you already work – Slack, Teams, WhatsApp – and are surfaced by Pragya. **Key message:** the autonomy is yours to grant, checkpoint by checkpoint.

---

## SECTION 4b — Model & Data Governance

**Principle:** *Provability.* Enterprises don't just need safety; they need to *demonstrate* it to auditors. "You can prove what every model did" is the compliance unlock.

## You control which brains touch your data. And you can prove what each one did.

- **Fleet allow-lists & residency** – restrict which models in the Intelligence Engine are eligible (exclude a provider for data-residency or compliance), or pin a specific model where required.
- **Full attribution** – every step records the model chosen, tokens, and cost. Routing is completely auditable.
- **Sandboxed self-modification** – all Meta-Agent tool synthesis and self-evolving code runs in isolated sandboxes, must pass tests and critics, and is versioned with one-click rollback. Production is never edited in place.

---

## SECTION 5 — Credit Circuit Breakers

**Principle:** *Financial loss aversion.* The fear "AI will rack up a runaway bill" is as real as the data fear. Hard, automatic spend limits remove it.

## No runaway spend. No surprise invoices.

Minimum wallet thresholds gate every execution type before it starts. Cost is tracked per step, in real time. Breach the budget and execution halts automatically with an `InsufficientCreditsError`. Every cent is tracked and gated.

---

## SECTION 6 — Audit Trail

**Principle:** *Compliance readiness.* The closing trust signal for SOC 2 / regulated buyers: everything is logged, exportable, and replayable.

## Every decision, logged. Every run, replayable.

Each execution is fully traced: token counts, cost attribution, latency, model selection, and decision logs. Exportable, queryable, and compliance-ready. Context-state snapshots let you debug or replay any run.

---

## Trust elements (page-wide)

- **Badges:** AES-256-GCM · Stateless JWT · Multi-tenant isolation · HITL governance · Credit circuit breakers · Full audit trail · Model & data governance
- **Reviewer note:** *"Bring your security team. This page is written for them."*
- **Enterprise CTA:** Request the security & architecture brief

---

## Closing CTA

**Headline:** Deploy autonomy you can bound, audit, and reverse.
**Primary CTA:** Talk to Sales  ·  **Secondary:** Ask Pragya about governance  ·  **Tertiary:** Get Started Free
