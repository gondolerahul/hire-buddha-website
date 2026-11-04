import { Gauge, MessageSquare, Database, BrainCircuit, CircuitBoard, SlidersHorizontal, Combine } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, Timeline, CTABand } from '@/components/page/kit';
import { ModelRouter, AgentLoopRing } from '@/components/product/Intelligence';
import { Reveal } from '@/components/motion/primitives';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Intelligence, Memory & the Learning System',
  description: 'A multi-model Intelligence Engine behind a smart router, a 4-tier memory architecture with CORTEX, and a Learning System that makes Week 12 beat Week 1 — automatically.',
  path: '/product/intelligence',
});

const MEMORY = [
  { icon: Gauge, kicker: 'Tier 1', title: 'Working Memory', body: 'Today’s scratchpad — inputs, loop metrics, step calculations for the current task. Your desk, cluttered with today’s work.' },
  { icon: MessageSquare, kicker: 'Tier 2', title: 'Episodic Memory', body: 'The last 10 interactions per contact and agent. Conversational continuity: “We spoke about X last Tuesday.”' },
  { icon: Database, kicker: 'Tier 3', title: 'Semantic Memory', body: 'Vector search over your uploaded documents. RAG-powered retrieval — your filing cabinet, searchable by meaning.' },
  { icon: BrainCircuit, kicker: 'Tier 4', title: 'CORTEX Tree Memory', body: 'Hierarchical cognitive context for long-running work. Auto-checkpoints at 8,000 tokens; viewport slicing keeps it within limits. The reason Week 12 is smarter than Week 1.' },
];

const WEEKS = [
  { num: 'Week 1', title: 'Follows instructions', body: 'Basic execution. Accurate, but generic. It does exactly what you configured — no more, no less.' },
  { num: 'Week 4', title: 'Recognizes patterns', body: 'Episodic memory captures patterns. It recognizes returning contacts and seasonal trends without being told.' },
  { num: 'Week 8', title: 'Anticipates', body: 'CORTEX builds deep domain context. Agents pre-draft, flag anomalies, and prepare work before you ask.' },
  { num: 'Week 12', title: 'Self-optimizes', body: 'The Self-Optimizing Intelligence Engine rewrites agent charters from cross-process KPIs. Measurable improvement, no human intervention.' },
];

const CAPS = [
  { icon: CircuitBoard, title: 'Self-Evolving Code', body: 'When a tool is missing, the Meta Agent writes it. When an integration breaks or a workflow gets expensive, the platform diagnoses and rewrites its own code — sandboxed, test-gated, versioned, rollback-safe.' },
  { icon: SlidersHorizontal, title: 'Generative & Adaptive UI', body: 'The interface is assembled per user, per task, per data shape. Novices get guided simplicity; power users get density. Most people just run everything through Pragya, who materializes exactly the controls they need.' },
  { icon: Combine, title: 'Dynamic Per-Tenant Schema', body: 'Your data model starts minimal and grows as you work — a logistics tenant grows shipment entities, a clinic grows patient entities — automatically, with no migration project.' },
];

export default function IntelligencePage() {
  return (
    <>
      <PageHero
        scene="lattice"
        eyebrow="Product · Intelligence & Memory"
        title="AI that thinks, remembers, and gets better."
        lead="Most AI is one frozen model with no memory. HireBuddha pairs a multi-model Intelligence Engine with a 4-tier memory architecture and a Learning System — so your workforce reasons cheaply, remembers everything, and compounds intelligence over time."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />

      <Section>
        <SectionHead eyebrow="The Intelligence Engine" title="One brain isn’t enough. So we gave it many — and a router to choose." lead="Every reasoning step is scored on complexity, modality, latency, and cost, then routed to the cheapest model that will succeed. Frontier-grade quality only where it counts — which is why real bills land far below a flat “always-premium” price." />
        <ModelRouter />
        <Reveal y={16}>
          <p style={{ marginTop: 28, color: 'var(--fg-subtle)', fontSize: 'var(--text-sm)', lineHeight: 1.7, maxWidth: '78ch' }}>
            <b style={{ color: 'var(--fg-muted)' }}>BabyBuddha</b> — our flagship hybrid LLM, post-trained for agentic execution — is the default brain. Any AI Employee can also call Claude Opus, ChatGPT, Gemini, GLM, Qwen, or Mistral. Tenants can pin a model or restrict the fleet for data-residency; failover is automatic; every choice is logged.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead eyebrow="Four tiers of memory" title="It doesn’t just respond. It remembers." />
        <CardGrid cols={4}>
          {MEMORY.map((m) => <Card key={m.title} icon={<m.icon size={22} strokeWidth={1.6} />} kicker={m.kicker} title={m.title} body={m.body} />)}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead eyebrow="Deliberative reasoning" title="This isn’t if-then automation. It’s cognition." lead="Every AI Employee runs an 8-stage control loop that audits its own decisions before and after execution." center />
        <AgentLoopRing />
      </Section>

      <Section>
        <SectionHead eyebrow="The Learning System — the moat" title="The slowest version of your workforce is the one you run today." lead="Most AI is stateless — it forgets and never improves. HireBuddha does the opposite: every run leaves your workforce better at your business. That learning stays inside your workspace." />
        <Timeline items={WEEKS} />
        <Reveal y={16}>
          <p style={{ marginTop: 36, padding: '26px 30px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-gold)', background: 'var(--accent-quiet)', color: 'var(--fg)', fontSize: 'var(--text-xl)', lineHeight: 1.4, letterSpacing: 'var(--track-tight)', fontFamily: 'var(--font-display)', maxWidth: '40ch' }}>
            Your competitors are still onboarding hires. You’re running a self-optimizing machine. The gap doesn’t close — it widens.
          </p>
        </Reveal>
        <Reveal y={16}>
          <p style={{ marginTop: 18, color: 'var(--fg-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, maxWidth: '78ch' }}>
            <b style={{ color: 'var(--fg)' }}>Your data trains nothing but your own workforce.</b> The Learning System runs per business. It never uses one business’s data to improve another business’s AI employees, and no customer data or connected-account data (your mail, messages, posts or files) is used to train or fine-tune BabyBuddha or any other shared model.
          </p>
        </Reveal>
      </Section>

      <Section>
        <SectionHead title="Intelligence that builds and reshapes itself." />
        <CardGrid cols={3}>
          {CAPS.map((c) => <Card key={c.title} icon={<c.icon size={22} strokeWidth={1.6} />} title={c.title} body={c.body} />)}
        </CardGrid>
      </Section>

      <CTABand
        title="Deploy intelligence that compounds."
        sub="Start with ₹500 in free daily credits. Watch Week 12 beat Week 1 — with no human intervention."
        primary="Start Free"
      />
    </>
  );
}
