# Intelligence & Memory — Product Page

> **Route:** `/product/intelligence`
> **Template:** Product
> **ICP:** Universal
> **Priority:** P0
> **SEO Title:** Intelligence & Memory — CORTEX, 4-Tier Memory, Deliberative AI | HireBuddha
> **SEO Description:** HireBuddha's 4-tier memory architecture and 8-stage deliberative reasoning loop create AI that thinks, remembers, and gets better over time. Not stateless chatbots — compound intelligence.

---

## Section 1: Hero

**Psychological Principle:** *Gap Theory of Curiosity.* The headline creates an information gap — "AI that thinks AND remembers AND improves?" — that the visitor must scroll to resolve. Each word adds a promise that stateless AI competitors can't match.

**HEADLINE:**
# AI that thinks. Remembers. Gets better.

**SUBHEADLINE:**
Most AI forgets everything after each conversation. HireBuddha's 4-tier memory architecture and deliberative reasoning loop mean your AI workforce compounds intelligence over time. Week 12 is measurably smarter than Week 1 — without any human intervention.

**PRAGYA SUGGESTED PROMPTS:**
- "How is CORTEX different from regular AI memory?"
- "What happens to context in a long-running process?"
- "How does the Intelligence Engine self-optimize?"

---

## Section 2: The 4-Tier Memory System

**Psychological Principle:** *Layered Revelation + Depth Anchoring.* Each tier adds increasing sophistication — moving from "obvious" (working memory) to "remarkable" (CORTEX). The visitor's perception of product depth compounds with each layer.

### Memory that runs deeper than conversation.

Most AI tools operate with a single layer of context: the current conversation. When the session ends, the intelligence disappears. HireBuddha's AI Employees have four layers of memory — each one building on the last.

---

#### Tier 1: Working Memory
**The desk — cluttered with today's work.**

Temporary scratchpad context used during a single execution run. Contains template inputs, loop iteration metrics, and current step calculations. Created when a task starts, discarded when it ends.

**What it holds:** Current task variables, step calculations, active tool results
**Lifespan:** Single run

---

#### Tier 2: Episodic Memory
**Your conversation history — "We spoke about this last Tuesday."**

Stores the last 10 interactions per contact per agent. When a customer calls back, your AI Employee remembers the previous conversation — what was discussed, what was promised, what was resolved.

**What it holds:** Conversation history, contact context, prior commitments
**Lifespan:** Persistent across sessions (last 10 interactions per contact)

**Real example:** A customer calls your Care Orchestrator about a billing issue. Three days later, they call again. Maya (your Care Orchestrator) says: *"Hi Priya — last time we spoke, I adjusted your invoice and sent a corrected copy. Did that resolve the issue, or is there something else?"*

That's not scripted. That's episodic memory.

---

#### Tier 3: Semantic Memory — Knowledge Base
**Your filing cabinet — every document, searchable by meaning.**

Your uploaded business documents — product manuals, pricing sheets, HR policies, legal playbooks — chunked into 500-character segments, embedded as 768-dimension vectors using Google's text-embedding-004, and stored in PostgreSQL via pgvector.

When your AI Employee needs information, it doesn't keyword-search — it meaning-searches. Cosine similarity finds the most relevant content, even if the words don't match exactly.

**What it holds:** Company documents (PDF, DOCX, TXT, CSV), chunked and vectorized
**Lifespan:** Permanent (updated on document upload)
**Search method:** Semantic vector similarity (cosine similarity > 0.70)

**Real example:** A prospect asks your Outbound Prospector: "Do you offer volume discounts for orders over 500 units?" Your agent searches your pricing document by meaning — not by the word "discount" — and finds the relevant clause, even if it's titled "Quantity-based pricing tiers."

---

#### Tier 4: CORTEX Tree Memory
**Your institutional memory — the deep context that makes Week 12 smarter than Week 1.**

CORTEX is HireBuddha's proprietary hierarchical tree memory structure. It's what separates a fragile AI demo from a production-grade autonomous workforce.

**How it works:**
- Information is organized into a hierarchy of nodes: `root` → `knowledge` → `finding` → `task` → `output` → `checkpoint`
- As your AI Employee works, it writes reflections, findings, and decisions back into the CORTEX tree
- When context reaches 8,000 tokens, CORTEX auto-generates a summary checkpoint — preserving historical progress without hitting LLM context limits
- The Viewport Slicer selects only the most relevant path segments for each task — giving the AI deep context without overwhelming it

**What it holds:** Accumulated domain knowledge, cross-run patterns, decision reflections, workflow checkpoints
**Lifespan:** Permanent and compounding
**Why it matters:** CORTEX is why your AI workforce gets better the longer it runs. Every interaction, every decision, every reflection is stored and compounded.

**Real example:** In Week 1, your Treasury Controller (Raj) follows your reconciliation rules precisely. By Week 8, CORTEX has accumulated patterns: he knows which vendors always pay late, which invoice formats cause errors, and which expense categories spike seasonally. He doesn't just reconcile — he anticipates.

---

## Section 3: The AgentLoop — Deliberative Reasoning

**Psychological Principle:** *Technical Authority + Objection Pre-emption.* This section answers the sophisticated buyer's unspoken question: "Is this just an API wrapper around GPT?" The 8-stage loop proves it isn't — and the pre-critic/post-critic system shows built-in safety.

### This isn't if-then automation. This is deliberative cognition.

Every AI Employee runs through an 8-stage cognitive loop on every execution step. The loop isn't just "prompt → response" — it's a full reasoning cycle with built-in quality control.

```
Perceive → Strategize → Pre-Critic → Act → Observe → Post-Critic → Reflect → Decide
```

**1. Perceive**
Load inputs, semantic chunks, and updates. Build the active context for this step.

**2. Strategize**
Select the next action. Evaluate retry queues. Decide which tool to call or which sub-agent to dispatch.

**3. Pre-Critic** *(Safety Gate)*
Audit the selected action BEFORE execution. Is this the right tool? Is the input valid? Is this within governance bounds? If the Pre-Critic blocks 3 consecutive actions, the circuit breaker trips — execution halts, and the system escalates.

**4. Act**
Execute the step. Call the tool. Make the call. Send the email. Run the code.

**5. Observe**
Process the results. Check for errors, unexpected outputs, or runtime blocks.

**6. Post-Critic** *(Quality Check)*
The supervisor verifies alignment with the original goal. Logs token usage. Schedules retries if needed.

**7. Reflect**
Write a logical reflection back to CORTEX tree memory. What worked. What didn't. What to do differently next time.

**8. Decide**
Determine the next state: **CONTINUE** (keep going), **REPLAN** (change strategy), **DONE** (task complete), or **ABORT** (something went wrong).

**KEY MESSAGE:**
> *"Your AI workforce audits its own decisions before AND after execution. The Pre-Critic catches mistakes before they happen. The Post-Critic catches drift before it compounds. CORTEX stores the lessons. The result: AI that gets more reliable, not less, over time."*

---

## Section 4: Compound Intelligence Over Time

**Psychological Principle:** *Compounding Effect + Loss Aversion.* Showing a timeline of increasing intelligence triggers two responses: desire for the compound benefit, and fear of missing out on the time-value of starting now.

### The longer it runs, the smarter it gets.

**Week 1**
Your AI workforce follows instructions. Basic execution. Learning your documents. Accurate, but generic.

**Week 4**
Episodic memory captures patterns. Your agents recognize returning contacts, common issues, and seasonal trends. Responses become contextual.

**Week 8**
CORTEX tree builds deep domain context. Your agents start anticipating needs — pre-drafting responses, flagging anomalies, suggesting actions before you ask.

**Week 12**
The Self-Optimizing Intelligence Engine analyzes cross-process KPIs and tunes agent instructions based on performance data. Measurable improvement without human intervention.

**VISUAL DIRECTION:** A diverging chart showing "Stateless AI" (flat line) vs. "HireBuddha AI" (accelerating upward curve). The gap widens at every milestone.

**KEY MESSAGE:**
> *"Your competitors are still onboarding their Q2 hires. You're on Loop 12 of a self-optimizing machine that knows your market better than any human analyst. The gap doesn't close. It widens."*

---

## Section 5: Async Child Dispatch — Parallel Intelligence

**Psychological Principle:** *Sophistication Signaling.* This section is for the technical evaluator who needs to see that complex, multi-step workflows actually work. It signals engineering rigor.

### Complex workflows don't block. They branch.

When a Process needs multiple agents to work simultaneously — researching leads while drafting emails while checking inventory — it doesn't wait. It branches.

**How it works:**
1. **Suspend:** The parent Process dispatches child agent runs, serializes its full state (via AgentState snapshot), and releases the worker thread.
2. **Execute:** Child agents run independently and in parallel. Each with their own memory, tools, and governance.
3. **Resume:** When child agents complete, the parent Process wakes up, merges the results, aggregates costs, and continues execution.

**Why this matters:**
- No blocked threads. No wasted compute. No sequential bottlenecks.
- A single Process can orchestrate 10 agents across 5 departments — all executing simultaneously.
- Parent-child cost aggregation means you see the total cost of the entire workflow, not just individual pieces.

**Real example:** Durwankur AI Labs runs a single Process that coordinates their Growth Loop (lead generation), Customer Success Loop (client support), and Fiscal Optimizer (invoicing) — all simultaneously. The Process dispatches agents, they execute in parallel, and results merge into a unified executive briefing.

---

## Section 6: CTA

### Intelligence that compounds. Starting today.

Every day your AI workforce runs is a day it gets smarter. The question isn't whether to start — it's how much intelligence you're leaving on the table by waiting.

**PRIMARY CTA:** Get Started Free
**SECONDARY CTA:** Talk to Pragya about how CORTEX works for your use case
