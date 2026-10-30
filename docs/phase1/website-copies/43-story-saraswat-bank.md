# Impact Story: Saraswat Bank

> **Route:** `/stories/saraswat-bank`
> **Template:** Impact Story
> **ICP:** Universal (strongest for Enterprise)
> **Priority:** P0
> **SEO Title:** Saraswat Bank — AI Voice Agents for Loan Recovery | HireBuddha Customer Story
> **SEO Description:** How one of India's leading cooperative banks deployed AI voice agents for multilingual loan recovery and origination — processing thousands of calls with full audit trails and HITL governance.

---

## The Headline

### One of India's largest cooperative banks automated loan recovery — with AI voice agents that speak Hindi, Marathi, and English.

---

## The Company

**Saraswat Bank** is one of India's leading multistate cooperative banks, with a legacy spanning over a century. They serve millions of customers across multiple states with a comprehensive range of banking services — savings, loans, fixed deposits, insurance, and more.

As a regulated financial institution, Saraswat Bank operates under strict compliance requirements from the Reserve Bank of India (RBI). Every customer interaction must be documented, every collection practice must follow regulatory guidelines, and every payment arrangement must be properly authorized.

---

## The Challenge

**Loan recovery at scale — in multiple languages — with full compliance.**

Loan recovery is one of the most labor-intensive operations in banking:
- **Volume:** Thousands of overdue loan accounts across multiple branches
- **Language:** Borrowers speak Hindi, Marathi, English, and regional dialects
- **Sensitivity:** Recovery calls require empathy, patience, and compliance awareness — not aggressive collection tactics
- **Compliance:** Every call must follow RBI-approved scripts. Every arrangement must be documented. Every payment must be traceable.
- **Cost:** Traditional call centers require hundreds of agents, supervisors, and compliance officers

Previously, this required a large call center team:
- 50–100+ agents across multiple branches
- Supervisors monitoring compliance
- Manual documentation of every call
- Language barriers limiting which agents could handle which borrowers
- Inconsistent quality and compliance adherence

---

## The Deployment

**Focused deployment: Fiscal Optimizer + Voice Agents + HITL Governance.**

### Loan Recovery Process

**Step 1: Account Loading**
Daily batch of overdue loan accounts loaded from the bank's core banking system. Each account includes:
- Borrower name, contact details, preferred language
- Outstanding amount, due date, days overdue
- Previous contact history and any prior arrangements

**Step 2: AI Voice Calls**
HireBuddha voice agents (Gemini Live) call each borrower:
- **Language detection:** Agent speaks in Hindi, Marathi, or English — based on borrower's preference or auto-detected from their initial response
- **Compliance-approved scripts:** Every call follows RBI-approved communication guidelines
- **Natural conversation:** Not robotic IVR. Genuine, empathetic dialogue that explains the outstanding amount, due date, and available payment options
- **Payment facilitation:** For borrowers willing to pay, a payment link is sent via WhatsApp during the call

**Step 3: Negotiation (Within Parameters)**
For borrowers requesting payment arrangements:
- AI agent negotiates within pre-approved parameters (installment plans, deadline extensions)
- Parameters set by the bank: maximum installment count, minimum payment amounts, acceptable timelines
- All arrangements documented with full call transcripts

**Step 4: HITL Escalation**
Arrangements exceeding **₹1 lakh** require human approval:
- AI agent documents the proposed arrangement with full context
- HITL notification sent to the branch manager via the bank's communication platform
- Branch manager reviews the arrangement, borrower history, and AI recommendation
- Approves, rejects, or modifies the arrangement
- Decision logged in the audit trail

**Step 5: Post-Call Processing**
After each call:
- Full call transcript stored with timestamp, duration, and outcome
- Payment links sent via WhatsApp (if payment agreed)
- Payment confirmation tracked
- Unsuccessful calls scheduled for retry based on optimal timing patterns

### Loan Origination Process

Beyond recovery, Saraswat Bank also deployed AI voice agents for loan origination:
- Outbound calls to pre-qualified prospects
- Product explanation: loan types, interest rates, eligibility criteria
- Application initiation: collecting preliminary details
- Document checklist generation and email delivery
- Follow-up scheduling for incomplete applications

---

## The Governance Framework

**This deployment is a masterclass in enterprise AI governance.**

| Control | Implementation |
|---|---|
| **Compliance scripts** | All call scripts pre-approved by the bank's compliance team. AI agents cannot deviate. |
| **HITL threshold** | Payment arrangements > ₹1 lakh require branch manager approval |
| **Audit trail** | Every call: full transcript, duration, outcome, cost, agent reasoning |
| **Language compliance** | Agent must use the borrower's preferred language. Verified per call. |
| **Call recording** | All calls recorded and stored for regulatory review |
| **Payment verification** | Every payment link tracked. Confirmation logged. |
| **Cost control** | Credit circuit breakers per campaign batch. Daily budget caps. |

---

## The Impact

| Metric | Traditional Call Center | HireBuddha Voice Agents |
|---|---|---|
| Daily call capacity | 500–1,000 (depending on team size) | 5,000+ |
| Languages supported | 1–2 per agent | Hindi, Marathi, English (per agent) |
| Cost per call | ₹50–100 (agent salary + overhead) | ₹5–10 |
| Call quality consistency | Variable (depends on agent mood, training, workload) | Consistent (compliance-approved scripts, same tone every call) |
| Audit trail completeness | Partial (manual documentation) | Complete (automatic transcription, cost tracking, decision logging) |
| Compliance adherence | Variable (requires supervisor monitoring) | Deterministic (scripts cannot be deviated from) |
| Borrower experience | Variable | Consistent: empathetic, patient, multilingual |
| Escalation quality | Context often lost between agent and supervisor | Full context attached to every HITL notification |

---

## Why This Story Matters for Enterprise

1. **Regulated industry.** Banking is one of the most heavily regulated industries. If HireBuddha passes banking compliance scrutiny, it can handle yours.
2. **HITL in production.** The ₹1 lakh threshold demonstrates that HITL governance works at scale — not just in theory, but in a live banking deployment.
3. **Multilingual at scale.** Hindi, Marathi, and English in a single agent. No language-specific hiring required.
4. **Full audit trails.** Every call transcribed, every arrangement documented, every payment tracked. Regulatory-ready from Day 1.
5. **Focused deployment.** Saraswat Bank didn't deploy all 7 loops. They deployed exactly what they needed — loan recovery and origination — and proved ROI on that specific use case.

---

## In Their Words

> *"Loan recovery requires empathy, consistency, and compliance — in that order. Our AI agents deliver all three, in three languages, thousands of times per day. And the audit trail gives our compliance team complete visibility into every interaction."*

---

## CTA

### If a century-old bank trusts HireBuddha, your security team can too.

**PRIMARY CTA:** Schedule an Enterprise Architecture Review
**SECONDARY CTA:** Download the Enterprise Security Brief
**TERTIARY CTA:** Talk to Pragya
