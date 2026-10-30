# HireBuddha — Product Technical Documentation

> **Platform Version:** 3.0.0 (GA)
> **Author:** Buddha Cognitive Lab
> **Last Updated:** June 2026
> **Status:** Architecture & Systems Manual
> **Revision:** Phase 2 — supersedes Phase 1 (2.0.0). Adds the Intelligence Engine & Model Router (BabyBuddha + frontier fleet), multimodal generation services, the Meta Agent build-loop, the Learning System, Generative UI, self-evolving code, the dynamic per-tenant schema, the **Loop** entity tier, and Pragya's account-manager runtime.

---

## 0. Phase 2 Delta (for engineers)

Everything in the Phase 1 technical manual remains valid and is retained below. Phase 2 adds the following subsystems and schema changes:

| Subsystem | Section | Schema/Service touchpoints |
|---|---|---|
| Intelligence Engine & Model Router | §3 | `model_registry`, `routing_decisions`, `ai/intelligence/` |
| Multimodal generation (image/video/audio) | §4 | `generation_jobs`, `ai/media/`, `voice/omnibuddha.py` |
| **Loop** entity tier | §2.1 | `type` enum on `hierarchical_entities`, `loops` config |
| Meta Agent build-loop | §6 | `ai/meta/`, `entity_build_runs` |
| Learning System | §7 | `learning_signals`, `optimization_runs` |
| Generative UI | §8 | `ui_manifests`, `/api/v1/ui/manifest` |
| Self-Evolving Code | §9 | `tool_versions`, sandbox promotion pipeline |
| Dynamic Per-Tenant Schema | §10 | `tenant_entity_defs`, `tenant_records` (EAV/JSONB) |
| Pragya account-manager runtime | §11 | `account_manager_sessions`, omnichannel adapters |

---

## 1. System Architecture & Topology

The HireBuddha platform uses a multi-process, service-oriented architecture. Traffic routing, reverse proxying, and SSL termination are handled by a front-end Apache HTTP Server.

```
                           Internet (Client Requests)
                                       │
                         ┌─────────────▼─────────────┐
                         │   Apache HTTP (80/443)    │ (mod_ssl, VirtualHosts)
                         └─────────────┬─────────────┘
                                       │ (Reverse Proxy via mod_proxy_wstunnel)
   ┌──────────────┬───────────────────┼───────────────────┬──────────────┐
   ▼              ▼                   ▼                   ▼              ▼
┌──────────┐ ┌────────────┐  ┌─────────────────┐  ┌──────────────┐ ┌──────────────┐
│  React   │ │  FastAPI   │  │ Unified Gateway │  │ Intelligence │ │ Media/Gen    │
│ Frontend │ │   App      │  │  (voice/ws)     │  │   Service    │ │  Workers     │
│ :3000    │ │  :8000     │  │   :8001         │  │   :8010      │ │  (async)     │
└──────────┘ └─────┬──────┘  └────────┬────────┘  └──────┬───────┘ └──────┬───────┘
                   │ (SQL/Cache)      │ (WebSockets)     │ (model calls)  │
                   ▼                  ▼                  ▼                ▼
            ┌────────────┐    ┌──────────────┐   ┌─────────────────┐  ┌──────────────┐
            │ PostgreSQL │    │ Voice Server │   │  Model Fleet    │  │ Image/Video  │
            │  :5433     │    │   :8002      │   │ BabyBuddha +    │  │  providers   │
            │ (+pgvector)│    │ (OmniBuddha/ │   │ Claude/GPT/     │  │ (Nano Banana,│
            │            │    │  Gemini Live/│   │ Gemini/GLM/     │  │  Veo, Kling, │
            │            │    │  GPT Realtime)│  │ Qwen/Mistral)   │  │  SeeDance)   │
            └────────────┘    └──────────────┘   └─────────────────┘  └──────────────┘
```

> **Phase 2 additions to the topology:** the **Intelligence Service** (`:8010`) centralizes all reasoning/model calls behind the router; **Media/Gen Workers** handle async image/video jobs; the **Voice Server** now fronts OmniBuddha in addition to Gemini Live and GPT Realtime.

### 1.1 Apache Proxy Configuration
An example virtual host configuration snippet below details how subdomains are proxied to their respective backend services:

```apache
# App Frontend Proxy
<VirtualHost *:443>
    ServerName app.hirebuddha.com
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/hirebuddha.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hirebuddha.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>

# Unified AI Gateway Proxy (supporting HTTP and WebSockets)
<VirtualHost *:443>
    ServerName api.hirebuddha.com
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/hirebuddha.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hirebuddha.com/privkey.pem

    ProxyPreserveHost On

    # WebSockets Handshake Routing
    ProxyPass /stream/audio ws://localhost:8001/stream/audio
    ProxyPassReverse /stream/audio ws://localhost:8001/stream/audio

    # REST Requests Routing
    ProxyPass / http://localhost:8001/
    ProxyPassReverse / http://localhost:8001/
</VirtualHost>
```

### 1.2 Core Directory File Index
*   `backend/src/ai/`: Agent Kernel execution logic.
    *   `core/`: Composes the control loops, state engines, step execution drivers, and scheduling queues.
        *   `agent_loop.py`: The control loop orchestrating perception, strategy, action, reflection, and decisions.
        *   `step_engine.py`: Single-step and parallel DAG execution wrapper.
        *   `agent_state.py`: Typed state envelope and JSON snapshot engine.
        *   `budget.py`: Tracks token caps, USD limits, and run latency.
        *   `feature_flags.py`: Feature flag overrides.
        *   `arq_jobs.py`: Worker tasks definition (`run_execution_recursive`, `resume_parent_run`).
    *   `planning/`: Generates plans and houses the Critic Pipeline and Strategic planners.
        *   `critic_pipeline.py`: Plugs in the pre-critic, post-critic, and supervisor pipelines.
        *   `strategist.py`: Selects next execution frames based on the current state.
        *   `planner_service.py`: Generates the step list for Processes.
    *   `memory/`: CORTEX engine, semantic indexers, and episodic memory.
        *   `cortex_service.py`: Tree memory interface.
        *   `cortex_bridge.py`: Bridges the agent loop to CORTEX node operations.
        *   `assembler.py`: Reconciles memories for prompt injection.
    *   `governance/`: Enforces billing checks, limits, and Human-in-the-loop (HITL) gateways.
        *   `governance_service.py`: Checks credit gates and processes final settlements.
        *   `rate_limiter.py`: Limits API calls using Redis.
    *   **`intelligence/`** *(Phase 2)*: Model fleet abstraction and the Intelligent Router.
        *   `router.py`: Scores each step and selects a model (§3.3).
        *   `model_registry.py`: Registered models, capability profiles, pricing, eligibility.
        *   `providers/`: Adapters — `babybuddha.py`, `claude.py`, `openai.py`, `gemini.py`, `glm.py`, `qwen.py`, `mistral.py`.
        *   `fallback.py`: Provider failover & retry policy.
    *   **`media/`** *(Phase 2)*: Image/video generation brokering.
        *   `image_service.py`: Nano Banana / ChatGPT Image / Kling adapters.
        *   `video_service.py`: Veo / SeeDance adapters.
    *   **`meta/`** *(Phase 2)*: Meta Agent build-loop (`meta_agent.py`, `entity_builder.py`, `tool_synthesizer.py`).
    *   **`learning/`** *(Phase 2)*: Signal capture and self-optimization (`signal_collector.py`, `optimizer.py`).
    *   `orm/`: SQLAlchemy model definitions.
*   `backend/src/gateway/`: Proxy for real-time audio streams, WebRTC, and inbound webhooks.
    *   `dispatcher.py`: Routes inbound webhooks to background tasks.
*   `backend/src/voice/`: Audio processors, session managers, and realtime adapters.
    *   `websocket_handler.py`: Bidirectional audio streaming WebSocket handler.
    *   **`omnibuddha.py`** *(Phase 2)*: Proprietary OmniBuddha realtime speech-to-speech client.
    *   `gemini_live.py`: Real Gemini Live SDK client.
    *   `azure_realtime.py`: Real Azure OpenAI Realtime client.
*   `backend/src/tenant_schema/` *(Phase 2)*: Dynamic per-tenant entity definitions and records (§10).
*   `frontend/src/genui/` *(Phase 2)*: Generative-UI manifest renderer (§8).

---

## 2. Database Schema & Core Models

All database models inherit from `src.common.database.Base` and are defined with SQLAlchemy 2.0's strict async `Mapped[]` type annotations.

### 2.1 The Agent Kernel: `hierarchical_entities`

> **Phase 2 change:** the `type` discriminator now includes **`LOOP`** as the top tier. The hierarchy is `ACTION → SKILL → AGENT → PROCESS → LOOP` (composition rule: Actions wrap Tools; Actions→Skill; Skills→Agent; Agents→Process; Processes→Loop). `parent_id` self-references still model the tree, so a `LOOP` row parents `PROCESS` rows.

```python
class HierarchicalEntity(Base):
    __tablename__ = "hierarchical_entities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    parent_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("hierarchical_entities.id"), nullable=True)
    version: Mapped[str] = mapped_column(String, nullable=False, default="1.0.0")
    type: Mapped[str] = mapped_column(String, nullable=False)  # ACTION, SKILL, AGENT, PROCESS, LOOP
    status: Mapped[str] = mapped_column(String, nullable=False, default="ACTIVE")
    name: Mapped[str] = mapped_column(String, nullable=False)
    display_name: Mapped[str | None] = mapped_column(String, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    goal: Mapped[str | None] = mapped_column(Text, nullable=True)
    tags: Mapped[Any] = mapped_column(JSON, nullable=True)

    # Configuration properties stored as structured JSON
    identity: Mapped[Any] = mapped_column(JSON, nullable=True)         # Tone, Empathy, Humor values
    hierarchy: Mapped[Any] = mapped_column(JSON, nullable=True)        # Linked child entity ids
    logic_gate: Mapped[Any] = mapped_column(JSON, nullable=True)       # Reasoning configuration
    planning: Mapped[Any] = mapped_column(JSON, nullable=True)         # Custom prompts configurations
    capabilities: Mapped[Any] = mapped_column(JSON, nullable=True)     # Bound tools and rate limit limits
    governance: Mapped[Any] = mapped_column(JSON, nullable=True)       # Max cost, timeout, and HITL checkpoints
    io_contract: Mapped[Any] = mapped_column(JSON, nullable=True)      # Input/Output variables schemas
    observability: Mapped[Any] = mapped_column(JSON, nullable=True)    # Trace logs settings

    # Phase 2: per-entity intelligence preferences (consumed by the router, §3.3)
    intelligence: Mapped[Any] = mapped_column(JSON, nullable=True)
    # e.g. {"mode": "auto", "pinned_model": null, "allow_list": ["babybuddha","claude-opus",...],
    #       "max_cost_per_step_usd": 0.02, "latency_class": "standard"}

    # Phase 2: LOOP-tier scheduling/KPI config (null for non-LOOP rows)
    loop_config: Mapped[Any] = mapped_column(JSON, nullable=True)
    # e.g. {"kpis": [...], "schedules": [...cron/triggers...], "process_ids": [...]}
```

### 2.2 Execution Runs & Tracing: `execution_runs`

> **Phase 2 change:** runs now record the **router decision** (`model_used`, `routing_signals`) so cost and quality are attributable per model.

```python
class ExecutionRun(Base):
    __tablename__ = "execution_runs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("hierarchical_entities.id"), nullable=False)
    parent_run_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("execution_runs.id"), nullable=True)
    company_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    status: Mapped[str] = mapped_column(String, default="PENDING")
    input_data: Mapped[Any] = mapped_column(JSON, nullable=True)
    dynamic_plan: Mapped[Any] = mapped_column(JSON, nullable=True)
    result_data: Mapped[Any] = mapped_column(JSON, nullable=True)
    context_state: Mapped[Any] = mapped_column(JSON, nullable=True)     # Serialized AgentState snapshot
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Costs and Tokens accounting
    total_cost_usd: Mapped[Decimal] = mapped_column(Numeric(10, 4), default=0)
    billed_amount: Mapped[Decimal | None] = mapped_column(Numeric(14, 6), nullable=True)
    total_tokens: Mapped[int] = mapped_column(Integer, default=0)
    execution_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Phase 2: intelligence attribution (per-step detail lives in routing_decisions)
    model_used: Mapped[Any] = mapped_column(JSON, nullable=True)        # {"babybuddha-fast": 12, "claude-opus": 2, ...}
    routing_signals: Mapped[Any] = mapped_column(JSON, nullable=True)   # last/aggregated routing inputs
```

### 2.3 Wallets & Subscriptions: `credit_wallets`

```python
class CreditWallet(Base):
    __tablename__ = "credit_wallets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    account_model: Mapped[str] = mapped_column(String, default="pay_as_you_go") # pay_as_you_go, subscription

    # Bucket Credits fields
    daily_credits: Mapped[Decimal] = mapped_column(Numeric(12, 4), default=0)
    daily_expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    wallet_balance: Mapped[Decimal] = mapped_column(Numeric(12, 4), default=0)
    wallet_expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    subscription_credits: Mapped[Decimal] = mapped_column(Numeric(12, 4), default=0)
    subscription_bonus_credits: Mapped[Decimal] = mapped_column(Numeric(12, 4), default=0)
    sub_credits_expire_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
```

### 2.4 Phase 2 New Models (abridged)

```python
class ModelRegistry(Base):
    """The model fleet the router can choose from."""
    __tablename__ = "model_registry"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    key: Mapped[str] = mapped_column(String, unique=True)   # "babybuddha-fast", "babybuddha-reasoning", "claude-opus", "gpt", "gemini", "glm", "qwen", "mistral"
    provider: Mapped[str] = mapped_column(String)           # internal | anthropic | openai | google | zhipu | alibaba | mistral
    modality: Mapped[Any] = mapped_column(JSON)             # ["text","tools","vision","realtime_audio",...]
    capability_profile: Mapped[Any] = mapped_column(JSON)   # reasoning, tool_reliability, max_context, latency_class
    price_per_1k_input: Mapped[Decimal] = mapped_column(Numeric(12, 6))
    price_per_1k_output: Mapped[Decimal] = mapped_column(Numeric(12, 6))
    enabled: Mapped[bool] = mapped_column(default=True)

class RoutingDecision(Base):
    """One row per reasoning call: what the router chose and why."""
    __tablename__ = "routing_decisions"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    run_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("execution_runs.id"))
    step_id: Mapped[str] = mapped_column(String)
    chosen_model: Mapped[str] = mapped_column(String)
    complexity_score: Mapped[float] = mapped_column(Float)
    signals: Mapped[Any] = mapped_column(JSON)             # full router input vector
    fallback_used: Mapped[bool] = mapped_column(default=False)
    cost_usd: Mapped[Decimal] = mapped_column(Numeric(12, 6), default=0)

class LearningSignal(Base):
    """Reflections, outcomes, critic verdicts, human feedback — fed to the optimizer."""
    __tablename__ = "learning_signals"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id"))
    entity_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("hierarchical_entities.id"))
    source: Mapped[str] = mapped_column(String)           # reflection | kpi | critic | router | hitl
    payload: Mapped[Any] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class EntityBuildRun(Base):
    """An iteration log of the Meta Agent constructing an entity/tool."""
    __tablename__ = "entity_build_runs"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id"))
    goal: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String, default="ITERATING")  # ITERATING, TESTING, PUBLISHED, ABORTED
    iterations: Mapped[Any] = mapped_column(JSON)         # per-iteration draft + critique + test results
    produced_entity_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("hierarchical_entities.id"))

class ToolVersion(Base):
    """Versioned, self-evolving tool code with sandbox test gating (§9)."""
    __tablename__ = "tool_versions"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("companies.id"))  # null = global registry tool
    tool_key: Mapped[str] = mapped_column(String)
    version: Mapped[str] = mapped_column(String)
    source_code: Mapped[str] = mapped_column(Text)
    test_report: Mapped[Any] = mapped_column(JSON)
    status: Mapped[str] = mapped_column(String, default="CANDIDATE")  # CANDIDATE, PROMOTED, ROLLED_BACK
    origin: Mapped[str] = mapped_column(String)          # human | meta_agent | self_heal | self_optimize

class TenantEntityDef(Base):
    """Dynamic per-tenant schema: entity types that emerge as the tenant works (§10)."""
    __tablename__ = "tenant_entity_defs"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id"))
    name: Mapped[str] = mapped_column(String)            # e.g. "Shipment", "Patient"
    fields: Mapped[Any] = mapped_column(JSON)            # evolving field defs {name,type,constraints}
    version: Mapped[int] = mapped_column(Integer, default=1)

class UIManifest(Base):
    """Generative-UI render manifests, per user/context (§8)."""
    __tablename__ = "ui_manifests"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id"))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    context_key: Mapped[str] = mapped_column(String)     # e.g. "invoice_review", "build_employee"
    manifest: Mapped[Any] = mapped_column(JSON)          # component tree + bindings
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

---

## 3. The Intelligence Engine & Model Router

> **Phase 2 — new subsystem.** All reasoning calls flow through `ai/intelligence/`. No agent talks to a model SDK directly; it requests a *capability* and the router binds it to a concrete model.

### 3.1 BabyBuddha (flagship hybrid LLM)
BabyBuddha is the in-house default model, post-trained for **agentic execution, tool calling, and reasoning**. It is exposed to the router as two profiles:
*   `babybuddha-fast` — low-latency/low-cost, for routine, well-structured steps.
*   `babybuddha-reasoning` — extended deliberation, for hard planning/critic stages.

The "hybrid" property is that both profiles share the same model family and memory format, so the router can switch modes mid-run without a context handoff penalty.

### 3.2 The Fleet
Registered in `model_registry` and reachable via `providers/`: `babybuddha-*` (internal), `claude-opus` (Anthropic), `gpt` (OpenAI), `gemini` (Google), `glm` (Zhipu), `qwen` (Alibaba), `mistral`. Each row carries a `capability_profile` (reasoning strength, tool reliability, max context, latency class) and per-1k-token pricing.

### 3.3 The Router

```python
# ai/intelligence/router.py  (abridged)
def route(step: PlanStep, ctx: AgentContext) -> ModelBinding:
    signals = {
        "complexity": score_complexity(step),          # planning/critic = high; extract/format = low
        "tier": step.entity_tier,                       # ACTION..LOOP
        "reasoning_mode": step.reasoning_mode,          # react | cot | debate
        "needs_tools": step.has_tool_calls,
        "context_tokens": estimate_context_tokens(ctx),
        "modality": step.modality,                      # text | vision | realtime_audio
        "latency_class": step.latency_class,            # strict (voice) | standard | batch
        "cost_ceiling": ctx.entity.intelligence.get("max_cost_per_step_usd"),
        "wallet_state": ctx.wallet.headroom(),
        "history": learning.model_success_for(step.signature),  # §7 feedback
    }

    candidates = model_registry.eligible(
        modality=signals["modality"],
        allow_list=ctx.entity.intelligence.get("allow_list"),
        min_context=signals["context_tokens"],
    )

    # 1. Pinned model wins if set and eligible
    if (pinned := ctx.entity.intelligence.get("pinned_model")) in {c.key for c in candidates}:
        return ModelBinding(pinned, reason="pinned")

    # 2. Score candidates on capability fit vs. cost vs. latency, biased by wallet/ceiling
    best = max(candidates, key=lambda m: utility(m, signals))

    # 3. Record decision for billing + learning
    record_routing_decision(ctx.run_id, step.step_id, best, signals)
    return ModelBinding(best.key, reason="auto")
```

**Routing heuristics (defaults):**
*   `complexity < 0.3` and no tools → cheapest eligible (`mistral` / `glm` / `babybuddha-fast`).
*   Planning, Pre-/Post-Critic, legal/financial drafting → `babybuddha-reasoning` or `claude-opus`.
*   `modality == vision` → `gemini` (multimodal grounding).
*   `latency_class == strict` (live voice turns) → realtime-capable profile only (§5).
*   Wallet headroom tight or `cost_ceiling` low → downshift to cheaper tiers before failing.

### 3.4 Fallback & Governance
`fallback.py` retries the next-best eligible model on provider error/rate-limit (`fallback_used=True` is recorded). Tenant/partner `allow_list` and data-residency policy filter candidates *before* scoring, so disallowed providers are never selected. Every decision is in `routing_decisions` for audit.

---

## 4. Multimodal Generation Services

> **Phase 2 — new.** Image and video generation are async jobs brokered through provider adapters; realtime audio is handled in the voice path (§5).

### 4.1 Image & Video (`ai/media/`)
```python
# image_service.py — provider selection mirrors the text router's philosophy
IMAGE_PROVIDERS = {
    "nano_banana": GeminiNanoBananaAdapter(),   # Google Gemini image
    "chatgpt_image": OpenAIImageAdapter(),
    "kling": KlingAdapter(),
}
VIDEO_PROVIDERS = {
    "veo": GoogleVeoAdapter(),                   # Google Veo
    "seedance": SeeDanceAdapter(),
}

async def generate_image(req: ImageRequest) -> GenerationJob:
    provider = pick_image_provider(req)   # by style, fidelity, speed, cost; allow_list-aware
    job = await enqueue_generation_job(kind="image", provider=provider, spec=req)
    return job   # polled/streamed; result stored to tenant workspace + cost ledgered
```
Generation runs as a background job (`generation_jobs`) on the Media/Gen Workers, with the same fallback and cost-attribution discipline as text routing. Results are written to the tenant workspace and billed via the standard formula (§13).

---

## 5. Realtime Audio & the Voice WebSocket Handler

Real-time voice calls are processed by `websocket_handler.py`. **Phase 2** adds **OmniBuddha** as the default engine alongside Gemini Live and OpenAI Realtime; the engine is chosen by the router using the call's latency/language/persona/cost signals.

```
[Twilio Inbound Connection]
            │ (SIP / RTP Stream)
            ▼
[Unified Gateway (mod_proxy_wstunnel)]
            │ (ws://streaming.hirebuddha.com/stream/audio)
            ▼
[FastAPI / voice/websocket_handler.py]
            │ (PCM Chunks / WebSockets)
            ▼
[ realtime engine selector ]
     ├── omnibuddha.py    (OmniBuddha — default, proprietary)
     ├── gemini_live.py   (Google Gemini Live)
     └── azure_realtime.py(OpenAI/GPT Realtime)
```

### 5.1 Inbound Audio Processing Loop
```python
async def receive_from_twilio(websocket: WebSocket, session: RealtimeSession):
    async for message in websocket.iter_text():
        data = json.loads(message)
        if data.get("event") == "media":
            # Twilio streams Mu-law or A-law compressed packets
            payload = base64.b64decode(data["media"]["payload"])

            # Decompress Mu-law payload to 16kHz linear PCM
            pcm16_data = audio_processor.ulaw_to_pcm(payload)

            # Stream 20ms audio chunks to the selected realtime engine
            # (OmniBuddha by default; Gemini Live / GPT Realtime as routed)
            await session.send_audio(pcm16_data)
```

### 5.2 Outbound Audio Processing Loop
```python
async def send_to_twilio(websocket: WebSocket, session: RealtimeSession):
    async for response in session.receive():
        if response.audio_chunk:                     # uniform interface across engines
            pcm_chunk = response.audio_chunk

            # Compress 16kHz PCM down to Twilio's Mu-law standard
            ulaw_payload = audio_processor.pcm_to_ulaw(pcm_chunk)

            await websocket.send_text(json.dumps({
                "event": "media",
                "media": {"payload": base64.b64encode(ulaw_payload).decode("utf-8")}
            }))
```

> `RealtimeSession` is a thin uniform wrapper so the handler is engine-agnostic; OmniBuddha, Gemini Live, and GPT Realtime each implement `send_audio()` / `receive()`. Pragya (§11) and any voice Agent share this path.

---

## 6. The Meta Agent (Build-Loop)

> **Phase 2 — new.** `ai/meta/` turns a natural-language goal into a published, versioned entity or tool, iterating until acceptance criteria pass.

```python
# meta_agent.py (abridged)
async def build(goal: str, company_id: UUID) -> EntityBuildRun:
    run = EntityBuildRun(company_id=company_id, goal=goal, status="ITERATING")
    spec = await decompose_goal(goal)               # capabilities, channels, data, constraints, acceptance tests

    for _ in range(MAX_ITERATIONS):
        draft = await assemble_entity(spec)         # choose tier(s), charter, personality, tool bindings, IO contract
        draft = await ensure_tools(draft, spec)     # synthesize missing tools via §9 (sandboxed)
        report = await simulate(draft, spec.tests)  # dry-run against representative + self-generated cases
        if report.passes(spec.acceptance):
            entity = await publish_entity(draft, company_id)   # versioned row in hierarchical_entities
            run.produced_entity_id = entity.id
            run.status = "PUBLISHED"
            break
        spec = await critique_and_revise(spec, draft, report)  # close gaps; loop
        run.iterations.append({"draft": draft.summary, "report": report.summary})

    return run
```

The Meta Agent backs both the conversational path (Pragya → "build me X", §11) and the No-Code Architect's generate actions. Output entities are fully editable afterward and tracked in `entity_build_runs`.

---

## 7. The Learning System

> **Phase 2 — new (and a flagship capability).** `ai/learning/` captures signal and continuously optimizes the workforce. This is the technical backbone of "Week 12 > Week 1."

### 7.1 Signal Capture
`signal_collector.py` writes `learning_signals` rows from five sources:
*   **reflection** — the AgentLoop Reflect stage (§12.7 of Phase 1 / retained §12 below) emits per-step lessons into CORTEX *and* the learning store.
*   **kpi** — Process/Loop outcome metrics (conversion, recovery, clean-reconciliation rate).
*   **critic** — Pre-/Post-Critic block/correct patterns.
*   **router** — realized success/cost per `(model, task_signature)` → feeds `learning.model_success_for()` in §3.3.
*   **hitl** — human approvals, edits, rejections.

### 7.2 The Optimizer
`optimizer.py` runs periodically (Chronos-scheduled) per tenant and per entity:
```python
async def optimize(entity: HierarchicalEntity):
    signals = await fetch_signals(entity.id, window="rolling_14d")
    proposal = await synthesize_improvement(signals)   # may touch any of:
    #   - charter/instruction tuning (Self-Optimizing Intelligence Engine)
    #   - router preferences (pinned/allow_list/cost ceilings)
    #   - tool rewrites (-> §9 self-evolving code, sandbox-gated)
    #   - schema promotion (-> §10)
    if proposal.is_high_impact:
        await raise_hitl_checkpoint(entity, proposal)  # require human sign-off
    else:
        await apply_with_versioning(entity, proposal)  # auto-apply, rollbackable
```
The Self-Optimizing Intelligence Engine is the charter-tuning specialization of this optimizer; it adjusts agent instructions from KPI evidence without human intervention for low-risk changes.

---

## 8. Generative & Adaptive UI

> **Phase 2 — new.** The frontend renders **manifests** produced by the backend rather than fixed screens.

### 8.1 Manifest Flow
```
GET /api/v1/ui/manifest?context=invoice_review
        │
        ▼
[ genui service ]  ── inputs: user role/expertise, task context, tenant dynamic schema (§10),
        │                      data shape, behavioral history (Learning System §7)
        ▼
{ "manifest": { "layout": "...", "components": [ {type, props, bindings}, ... ] } }  ── stored in ui_manifests
        │
        ▼
[ frontend/src/genui/ Renderer ]  ── maps component descriptors to React components & live data bindings
```
The renderer is a registry of primitive components (tables, forms, cards, charts, approval widgets, build-canvas). The backend chooses *which* components, *in what arrangement*, with *what bindings* — so a novice gets guided simplicity and a power user gets density, from the same code. New fields from the dynamic schema (§10) automatically surface as form/table columns.

---

## 9. Self-Evolving Code

> **Phase 2 — new.** Tools and agent logic can be synthesized, healed, and optimized — always sandboxed and test-gated.

### 9.1 Lifecycle
```
[ trigger ] ── meta_agent (new tool) | self_heal (tool error / API drift) | self_optimize (Learning §7)
     │
     ▼
[ generate/patch source ] ──► [ tool_versions row: status=CANDIDATE, origin=... ]
     │
     ▼
[ sandbox execute + self-generated tests ]  (Sandbox/Terminal isolation, §15 of Phase 1 / retained)
     │
     ├── pass + Pre/Post-Critic OK ──► [ HIGH-IMPACT? ] ── yes ─► HITL approval ─► PROMOTED
     │                                                     no ──────────────────► PROMOTED
     └── fail ──► discard / iterate (origin meta_agent loops back to §6)
```
Promotion flips `tool_versions.status` to `PROMOTED` and atomically swaps the active version; any regression is a single-row `ROLLED_BACK`. Self-healing is triggered by repeated tool failures captured as `critic`/`router` signals; self-optimization is triggered by the optimizer (§7.2). Production is never modified in place — only promoted, versioned artifacts go live.

---

## 10. Dynamic Per-Tenant Schema

> **Phase 2 — new.** Each tenant has an evolving data model in `tenant_schema/`, isolated by `company_id`.

### 10.1 Storage Strategy
Tenant entity definitions live in `tenant_entity_defs` (name + evolving JSON `fields`, versioned). Records are stored in a JSONB-backed `tenant_records` table keyed by `(company_id, entity_def_id)`, which keeps physical isolation simple while allowing per-tenant shape:
```python
class TenantRecord(Base):
    __tablename__ = "tenant_records"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("companies.id"), index=True)
    entity_def_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("tenant_entity_defs.id"), index=True)
    data: Mapped[Any] = mapped_column(JSONB)             # validated against the def's current fields
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

### 10.2 Evolution Triggers
*   **Onboarding** — Pragya's KB ingestion and system connections (§11) seed initial `tenant_entity_defs`.
*   **In use** — when agents repeatedly encounter an unmodeled entity/field (new CRM field, recurring document type), a new field/def is proposed and (auto or HITL) applied; `version` increments.
*   **Learning-driven** — the optimizer (§7) promotes frequently-seen patterns into first-class defs.

Schema changes are additive and versioned; `data` is validated against the def's current `fields`. Generative UI (§8) reads these defs to render the right inputs and views; memory retrieval and reporting use them to structure tenant data.

---

## 11. Pragya — Account-Manager Runtime

> **Phase 2 — new.** Pragya is implemented as a high-privilege, tenant-scoped Agent that orchestrates onboarding, integrations, the Meta Agent, work assignment, and reporting across omnichannel surfaces.

### 11.1 Session & Channels
`account_manager_sessions` holds continuous context per tenant across channels; episodic + CORTEX memory make a conversation portable between channels. Adapters:
*   **Meetings (frontend)** — realtime voice/console via the §5 audio path (OmniBuddha default).
*   **Phone** — Twilio/Smartflo/Exotel inbound to the same realtime path.
*   **WhatsApp / Slack / Teams / Email** — via the messaging connectors and the Rich Communication Broker.

### 11.2 Orchestration Responsibilities
*   **Onboarding/ingest** — drives Knowledge Source Connectors (SharePoint, Notion, Drive, DBs, file uploads) into Semantic + CORTEX memory; seeds the dynamic schema (§10).
*   **Integrations** — guides OAuth connection of CRM/ERP/Accounting/HRMS/Invoicing per captured requirements.
*   **Build/assign** — relays goals to the Meta Agent (§6) to create new employees/tools, or assigns work to existing `hierarchical_entities`.
*   **Monitor/report** — subscribes to run traces and KPIs, surfaces HITL checkpoints to the tenant, and proactively reports status.

Pragya runs at the Agent tier with a tenant-scoped governance profile; she cannot cross tenant isolation boundaries (§16, retained).

---

## 12. Core AI Orchestration Engine (The AgentLoop) — retained from Phase 1

The `AgentLoop` coordinates state transitions and execution within the platform. **Phase 2 note:** each reasoning call inside the loop is bound to a concrete model by the router (§3.3).

### 12.1 Control Loop Code Workflow
The execution loop runs inside `AgentLoop._drive` and `AgentLoop._loop` via a state-machine workflow:

```
[BOOTSTRAP RUN]
      │
      ▼
┌──────────────┐
│  Perceive    │ ◄── [Re-read Cancel Status]
└──────┬───────┘
       │ (perception variables)
       ▼
┌──────────────┐
│  Strategize  │ ◄── [Retry Queue Check]
└──────┬───────┘
       │ (chosen_executor, move)
       ▼
┌──────────────┐
│  Pre-Critic  │ ───► [BLOCK] ──► [Consecutive Count >= 3?] ──► [ABORT]
└──────┬───────┘
       │ (PASS / REVISE)
       ▼
┌──────────────┐
│     Act      │ ───► [Awaiting Children?] ──► [SUSPEND STATE] ──► [release worker]
└──────┬───────┘
       │ (ActionResult)
       ▼
┌──────────────┐
│   Observe    │
└──────┬───────┘
       │ (novelty_score, outcome)
       ▼
┌──────────────┐
│ Post-Critics │
└──────┬───────┘
       │ (supervise recommendation)
       ▼
┌──────────────┐
│   Reflect    │ ───► [Write Reflection Node to CORTEX + Learning Signal §7]
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Decide    │ ───► [REPLAN / CONTINUE / DONE / ABORT]
└──────────────┘
```

1.  **Perceive**: `Perceiver.gather` loads local inputs, semantic chunks, and updates the active context block.
2.  **Strategize**: `Strategist.next_move` selects a step or prompts the planner. It also evaluates if there are queued retries.
3.  **Pre-Critic**: `CriticPipeline.pre_action` audits the selected action. Consecutive rejections increment `consecutive_pre_critic_blocks`. If this reaches `_MAX_CONSECUTIVE_PRE_CRITIC_BLOCKS` (3), a circuit-breaker stops the execution.
4.  **Act**: Resolves and calls the step executor.
5.  **Observe**: `Observer.parse` processes step outputs and checks for runtime blocks.
6.  **Post-Critic**: The supervisor checks alignment, logs token usage, and schedules retries.
7.  **Reflect**: `Reflector.produce` writes logical reflections back to CORTEX tree memories **and emits a learning signal (§7)**.
8.  **Decide**: Checks flags and sets `state.done = True` if complete or aborted.

### 12.2 Async Suspend/Resume Child Dispatch Implementation
When a process triggers a child run, the execution is handled asynchronously to prevent blocking the worker thread:

#### 1. Suspend Event (`ChildEntityExecutor._dispatch_async`)
*   Inserts a new `execution_runs` row with `parent_run_id` set to the parent's run ID.
*   Enqueues the child run via Redis/Arq.
*   Returns an `awaiting_children` list to the loop:
    ```json
    [{"run_id": "child-run-uuid-string", "step_id": "parent-step-id", "status": "PENDING"}]
    ```
*   The parent loop captures the result, serializes the complete `AgentState` object using `state.snapshot()`, stores it in `run.context_state["__agent_state_snapshot__"]`, sets the status to `WAITING_ON_CHILDREN`, and releases the execution worker.

#### 2. Resume Event (`resume_parent_run` worker job)
*   Triggered when the child run reaches a terminal state.
*   Resolves the parent run, checking that its status is `WAITING_ON_CHILDREN`.
*   Deserializes the state snapshot using `AgentState.restore(snapshot)`.
*   Calls `_fold_children` to merge the child's outputs and costs:
    ```python
    # Deduct child cost from parent budget
    state.budget.consume(
        usd=Decimal(str(child_run.total_cost_usd or 0)),
        tokens=int(child_run.total_tokens or 0)
    )
    # Store child output in parent context
    state.context_state[step_id] = child_run.result_data.get("output", "")
    state.mark_step_complete(step_id)
    ```
*   Resumes execution via `AgentLoop._drive`.

---

## 13. Memory System & CORTEX Technical Details — retained from Phase 1

### 13.1 Semantic Query matching (pgvector)
HireBuddha uses `pgvector` for similarity matching:

```sql
SELECT content, 1 - (embedding <=> :query_embedding) AS similarity
FROM document_chunks
WHERE document_id IN (:doc_ids)
  AND 1 - (embedding <=> :query_embedding) > 0.70
ORDER BY similarity DESC
LIMIT 5;
```

### 13.2 CORTEX Context Viewport
CORTEX organizes data into hierarchical trees. A viewport parser limits the size of context injected into the prompt, resolving context window limitations:

```python
def get_viewport_context(tree: CortexTree, cursor_node_id: UUID, max_tokens: int = 8000) -> str:
    # 1. Walk up the parent tree from the cursor node
    path = tree.get_path_to_root(cursor_node_id)

    # 2. Add sibling context nodes based on relevance
    nodes = prune_and_rank_by_relevance(path, target_query=None)

    # 3. Serialize nodes until the max_tokens limit is reached
    serialized = []
    accumulated_tokens = 0
    for node in nodes:
        node_text = f"[{node.type.upper()}] {node.title}: {node.content}\n"
        tokens = count_tokens_fn(node_text)
        if accumulated_tokens + tokens > max_tokens:
            break
        serialized.append(node_text)
        accumulated_tokens += tokens

    return "\n".join(serialized)
```

If the node count exceeds the configured limit, the system summarizes historical nodes and records the output in a `checkpoint` node, freeing up context space.

---

## 14. Billing & Credits Engine — retained from Phase 1

### 14.1 TB Billing Calculation
The system calculates usage costs using the **TB Billing Formula**. **Phase 2 note:** `base_cost` is derived from the actual model the router selected (recorded in `routing_decisions`), so frontier-model steps and cheap-model steps are priced accurately.

```python
def calculate_tb(
    base_cost: Decimal,
    multiplier_factor: Decimal,
    platform_fee_pct: Decimal,
    sales_partner_fee_pct: Decimal,
    discount_pct: Decimal
) -> dict:
    """
    Calculate final billed amount from base cost.
    Formula:
      billed = (base_cost * multiplier)
             + (base_cost * multiplier * platform_fee)
             + (base_cost * multiplier * partner_fee)
             - (base_cost * multiplier * discount)
    """
    markup = base_cost * multiplier_factor
    platform_charge = markup * (platform_fee_pct / Decimal("100"))
    partner_charge = markup * (sales_partner_fee_pct / Decimal("100"))
    discount_amount = markup * (discount_pct / Decimal("100"))

    total_billing = markup + platform_charge + partner_charge - discount_amount

    return {
        "markup": markup,
        "platform_charge": platform_charge,
        "partner_charge": partner_charge,
        "discount_amount": discount_amount,
        "total_billing": max(total_billing, Decimal("0"))
    }
```

---

## 15. Security & Encryption — retained from Phase 1

### 15.1 AES-256-GCM Symmetric Cipher Implementation
API keys and social media tokens are encrypted before saving to database columns:

```python
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def encrypt_vault_secret(secret_text: str, key_hex: str) -> str:
    """Encrypt integrations key using the master hex key."""
    key_bytes = bytes.fromhex(key_hex)
    aesgcm = AESGCM(key_bytes)
    nonce = os.urandom(12)  # 12-byte initialization vector

    ciphertext = aesgcm.encrypt(nonce, secret_text.encode("utf-8"), None)

    # Prepend nonce to cipher bytes before saving as hex
    return (nonce + ciphertext).hex()

def decrypt_vault_secret(encrypted_hex: str, key_hex: str) -> str:
    """Decrypt integrations key using the master hex key."""
    key_bytes = bytes.fromhex(key_hex)
    aesgcm = AESGCM(key_bytes)
    raw_data = bytes.fromhex(encrypted_hex)

    nonce = raw_data[:12]
    ciphertext = raw_data[12:]

    decrypted_bytes = aesgcm.decrypt(nonce, ciphertext, None)
    return decrypted_bytes.decode("utf-8")
```

### 15.2 Company Suspension ASGI Middleware
The platform blocks suspended companies using an ASGI middleware layer:

```python
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from src.auth.service import CompanyService

class CompanySuspensionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 1. Bypass check for public paths
        if request.url.path in ("/health", "/api/v1/auth/login", "/api/v1/auth/register"):
            return await call_next(request)

        # 2. Extract company_id from request state (populated by auth)
        company_id = request.state.company_id if hasattr(request.state, "company_id") else None

        if company_id:
            # 3. Check suspension status in database
            is_suspended = await CompanyService.is_company_suspended(company_id)
            if is_suspended:
                return JSONResponse(
                    status_code=403,
                    content={"detail": "Access denied: Account is suspended due to unpaid invoice."}
                )

        return await call_next(request)
```

> **Phase 2 note:** the sandbox/test-gating pipeline for self-evolving code (§9) and the model `allow_list`/data-residency filtering (§3.4) are additional security surfaces; all routing, generation, build, and self-modification events are written to the audit log.

---

## 16. Frontend ReactFlow Node Serialization — retained from Phase 1

In the canvas dashboard (`frontend/src/pages/ai/EntityFlow.tsx`), user interactions serialize flows into the entity database schema. **Phase 2 note:** the same canvas now also renders entities the **Meta Agent** generated (§6), and the generative-UI renderer (§8) can surface this canvas as a component within an adaptive layout.

```typescript
interface ReactFlowEdge {
  id: string;
  source: string; // parent step id
  target: string; // child step id
}

interface ReactFlowNode {
  id: string;
  type: string;
  data: {
    label: string;
    stepConfig: {
      type: string;
      target: {
        prompt_template: string;
        tool_id?: string;
      };
    };
  };
}

// Compiles ReactFlow state into the backend hierarchical json schema
function serializeFlow(nodes: ReactFlowNode[], edges: ReactFlowEdge[]): any {
  return nodes.map(node => {
    // 1. Find dependency links pointing to this node
    const inputDependencies = edges
      .filter(edge => edge.target === node.id)
      .map(edge => edge.source);

    // 2. Format structure matching PlanStep schema
    return {
      step_id: node.id,
      name: node.data.label,
      type: node.data.stepConfig.type,
      target: {
        ...node.data.stepConfig.target,
        input_dependencies: inputDependencies,
      }
    };
  });
}
```
