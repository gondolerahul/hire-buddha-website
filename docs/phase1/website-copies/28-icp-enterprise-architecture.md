# Large Enterprise — Architecture & Security

> **Route:** `/for/enterprise/architecture`
> **Template:** ICP Technical
> **ICP:** Large Enterprise
> **Priority:** P0
> **SEO Title:** Architecture & Security Deep-Dive | HireBuddha Enterprise
> **SEO Description:** System topology, agent kernel, 8-stage control loop, async child dispatch, 4-tier memory, encryption implementation, billing mechanics. Everything your CTO needs to say yes.

---

## Section 1: Hero

**HEADLINE:**
# Under the hood: architecture, security, and governance.

**SUBHEADLINE:**
Everything your technical team needs to evaluate HireBuddha. No sales pitch. Just engineering.

---

## Section 2: System Topology

### The infrastructure stack.

```
┌─────────────────────────────────────────────────────┐
│  Apache HTTP Reverse Proxy (SSL Termination)        │
├─────────────────────────────────────────────────────┤
│  React Frontend (SPA)                               │
├─────────────────────────────────────────────────────┤
│  FastAPI Application Server                         │
│  ├── REST API (standard operations)                 │
│  └── WebSocket (real-time agent communication)      │
├─────────────────────────────────────────────────────┤
│  Unified AI Gateway                                 │
│  ├── Google Gemini (primary LLM)                    │
│  ├── Azure OpenAI (fallback / specialized)          │
│  └── Model routing & cost tracking                  │
├─────────────────────────────────────────────────────┤
│  Voice Server                                       │
│  ├── Gemini Live (real-time voice)                  │
│  ├── Azure OpenAI Realtime (fallback)               │
│  └── Twilio / Smartflo / Exotel (telephony bridge)  │
├─────────────────────────────────────────────────────┤
│  PostgreSQL (primary database)                      │
│  ├── pgvector extension (semantic memory)           │
│  ├── hierarchical_entities (agent kernel)           │
│  └── All operational tables (company-scoped)        │
├─────────────────────────────────────────────────────┤
│  Redis                                              │
│  ├── Rate limiting                                  │
│  ├── Arq job queue (async execution)                │
│  └── Session cache                                  │
└─────────────────────────────────────────────────────┘
```

Each component is independently scalable. The FastAPI server is stateless and horizontally scalable. PostgreSQL handles persistence with company-scoped queries on every operation.

---

## Section 3: The Agent Kernel

### How AI Employees are stored and configured.

All AI Employees — Processes, Agents, Skills, and Actions — are stored in a single polymorphic table: `hierarchical_entities`.

**Entity types:** Process | Agent | Skill | Action

**Configuration properties (JSON):**

| Property | What It Defines |
|---|---|
| `identity` | Name, title, role description, system prompt charter |
| `hierarchy` | Parent-child relationships, delegation rules |
| `logic_gate` | Reasoning mode (ReAct or Chain-of-Thought), max consecutive reasoning blocks |
| `planning` | Execution plan format, strategy selection |
| `capabilities` | Tool bindings, channel access, knowledge base connections |
| `governance` | Max cost per run, execution timeout, HITL checkpoint definitions |
| `io_contract` | Input/output variable schemas (typed) |
| `observability` | Logging level, cost tracking granularity, audit depth |

This architecture means every AI Employee — from a simple Action that calls an API to a complex Process that orchestrates 10 agents — is defined by the same schema. Configuration changes are instant (no redeployment). Rollback is a single row revert.

---

## Section 4: The AgentLoop — Control Flow

### The 8-stage cognitive loop.

Every execution step runs through a full deliberative cycle:

```
Perceive → Strategize → Pre-Critic → Act → Observe → Post-Critic → Reflect → Decide
```

| Stage | Function | State Impact |
|---|---|---|
| **Perceive** | Load inputs, semantic chunks, CORTEX viewport, and updates | Builds active context |
| **Strategize** | Select next action. Evaluate retry queue. Plan tool invocation. | Selects action candidate |
| **Pre-Critic** | Audit the selected action BEFORE execution. Validate inputs, check governance. | Gate: pass or block |
| **Act** | Execute the step. Call tool. Send message. Run code. | Produces output |
| **Observe** | Process results. Check for errors or unexpected outputs. | Updates working memory |
| **Post-Critic** | Supervisor checks alignment with goal. Logs usage. Schedules retries. | Quality verification |
| **Reflect** | Write logical reflection to CORTEX tree memory. | Compounds intelligence |
| **Decide** | Determine next state: CONTINUE / REPLAN / DONE / ABORT | Controls loop flow |

**Circuit breaker:** If the Pre-Critic blocks 3 consecutive actions, the system halts execution and escalates. This prevents infinite loops and ensures the AI doesn't persist with a failed strategy.

---

## Section 5: Async Child Dispatch

### How parallel execution works.

When a Process dispatches child agents:

1. **Suspend:** Parent Process serializes full state via `AgentState.snapshot()` → stored in `context_state["__agent_state_snapshot__"]`
2. **Dispatch:** Child agent runs are created as independent Arq jobs
3. **Execute:** Children run in parallel, each with own memory and governance
4. **Resume:** Upon child completion, `resume_parent_run` worker job restores parent state
5. **Merge:** Parent receives child results and aggregates costs

**Cost aggregation:** Parent-child cost hierarchy is fully tracked. The total cost of a Process includes all child agent, skill, and action costs — visible in a single audit record.

**State serialization:** Full `AgentState` snapshot includes CORTEX viewport, working memory, execution history, and retry queues. Restoration is deterministic.

---

## Section 6: Memory Architecture — Technical Detail

### 4-tier memory with implementation specifics.

**Tier 1: Working Memory**
- Run-scoped temporary context
- Contains: template inputs, loop metrics, step calculations
- Lifespan: Single execution run

**Tier 2: Episodic Memory**
- Last 10 interactions per contact per agent
- Stored in PostgreSQL with agent_id + contact_id composite key
- Retrieved on every customer interaction

**Tier 3: Semantic Memory (Knowledge Base)**
- Documents chunked into ~500 character segments
- Embedded using Google `text-embedding-004` (768-dimension vectors)
- Stored in PostgreSQL via `pgvector` extension
- Retrieval: Cosine similarity search with threshold ≥ 0.70
- Query pattern: `1 - (embedding <=> query_vector) AS similarity`

**Tier 4: CORTEX Tree Memory**
- Hierarchical node structure: `root → knowledge → finding → task → output → checkpoint`
- Auto-checkpointing when context reaches 8,000 tokens
- Checkpoint generation: Summarize + compress historical path segments
- Viewport slicing: Perceiver selects most relevant path segments for current task
- Lifespan: Permanent and compounding

---

## Section 7: Security Implementation

### Code-level detail for your security team.

**AES-256-GCM Encryption:**
- All API keys, OAuth tokens, and credentials encrypted using AES-256-GCM
- Each ciphertext prefixed with a unique nonce (prevents replay attacks)
- Master key stored in environment variable — never in database, never in code repository
- Decryption occurs in-memory, on-demand. Plaintext never persisted to disk or logs.

**JWT Authentication Flow:**
- Login → Server issues access token (15-min expiry, RS256 signed) + refresh token (7-day expiry, HTTP-only cookie)
- API request → Access token validated. Expired → Refresh endpoint called → New token pair issued → Old refresh token invalidated
- Logout → Refresh cookie deleted client-side. Server-side token revocation optional.

**Company Suspension:**
- ASGI middleware checks `company.is_active` on every request
- Suspended company → HTTP 403 with `COMPANY_SUSPENDED` error code
- All in-flight executions receive cancellation signal
- Reactivation: Set `is_active = true` → Instant restoration. Zero data loss.

**Rate Limiting:**
- Redis-based per-tenant rate limiting on all API endpoints
- Configurable limits per plan tier
- Burst protection with sliding window algorithm

---

## Section 8: Billing & Cost Control

### The billing formula.

```
Step Cost = LLM Cost (input_tokens × rate + output_tokens × rate)
           + Tool Cost (per-invocation charges)
           + Voice Cost (per-minute rate)
           + Platform Margin
```

**3-tier wallet system:**
1. Daily Credits ($5.00/day, resets midnight, non-rollover)
2. PAYG Wallet (top-up, 365-day validity)
3. Subscription Credits ($100/$500/$1,000 plans with 10-20% bonus)

**Deduction priority:** Daily Credits → Subscription Credits → PAYG Wallet

**Minimum balance enforcement per execution type:**
- Process: $0.50 | Agent: $0.05 | Skill: $0.02 | Action: $0.01

---

## Section 9: CTA

**PRIMARY CTA:** Schedule a Technical Deep-Dive with Our Architecture Team
**SECONDARY CTA:** Download the Security Whitepaper (PDF)
