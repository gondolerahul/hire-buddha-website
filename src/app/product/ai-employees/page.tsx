import type { Metadata } from 'next';
import { Fingerprint, SlidersHorizontal, GitBranch, Plug, Database, BrainCircuit, ShieldCheck, Braces, Repeat, ListOrdered, GitFork } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, Split, Timeline, CTABand } from '@/components/page/kit';
import { TierStack } from '@/components/product/TierStack';
import { Reveal } from '@/components/motion/primitives';

export const metadata: Metadata = {
  title: 'AI Employees — 5-Tier Hierarchy & the Meta Agent',
  description: 'Not chatbots — cognitive workers. A five-tier hierarchy from atomic tool calls to a self-running company. Design AI Employees in minutes, or let the Meta Agent build them from a goal.',
};

const META_STEPS = [
  { title: 'Understand', body: 'Decomposes your goal into required capabilities, data, channels, and constraints.' },
  { title: 'Structure', body: 'Decides the right tier — a single Skill, a full Agent, a multi-agent Process, or a whole Loop.' },
  { title: 'Assemble', body: 'Writes the system-prompt charter, sets the Personality Matrix, binds existing tools.' },
  { title: 'Generate', body: 'Creates new tools where none exist — self-evolving code, sandboxed and test-gated.' },
  { title: 'Simulate', body: 'Runs the candidate against representative inputs and self-generated test cases.' },
  { title: 'Critique', body: 'Identifies gaps and loops back until the acceptance criteria are met.' },
  { title: 'Publish', body: 'Registers the finished, versioned AI Employee into your workspace. Ready to employ.' },
];

const ANATOMY = [
  { icon: Fingerprint, title: 'Identity', body: 'Name, title, role, and the system-prompt charter that defines boundaries, guidelines, and behavior. The job description.' },
  { icon: SlidersHorizontal, title: 'Personality Matrix', body: 'Precision sliders for tone, verbosity, empathy, humor, and formality — plus custom rules the employee must always follow.' },
  { icon: GitBranch, title: 'Logic Gate', body: 'Reasoning mode: ReAct for linear tasks, Chain-of-Thought for analysis, Debate for high-stakes decisions.' },
  { icon: Plug, title: 'Tool Bindings', body: 'Which of the 20+ built-in tools this employee can reach — web, email, voice, documents, banking, e-signature, and more.' },
  { icon: Database, title: 'Knowledge Base', body: 'Your documents and connected sources, chunked and vectorized into 768-dimension embeddings, searchable by meaning.' },
  { icon: BrainCircuit, title: 'Memory', body: 'The 4-tier system — working, episodic, semantic, and CORTEX tree memory — that makes the employee smarter over time.' },
  { icon: ShieldCheck, title: 'Governance', body: 'Max cost, timeouts, and Human-in-the-Loop checkpoints that pause before high-stakes actions and require your approval.' },
  { icon: Braces, title: 'I/O Contract', body: 'Typed input and output schemas. What goes in, what comes out — structured, validated, predictable.' },
];

const MODES = [
  { icon: Repeat, title: 'ReAct', body: 'Decide a tool, run it, observe, loop until complete. Best for linear tasks — database ops, API calls, retrieval. Four tools, four observations, one resolution.' },
  { icon: ListOrdered, title: 'Chain-of-Thought', body: 'Write the step-by-step logic explicitly before generating outputs. Best for document drafting, financial analysis, and legal review — the reasoning trail is visible at every step.' },
  { icon: GitFork, title: 'Debate / Multi-Path', body: 'Generate several candidate paths simultaneously; a critic evaluates, selects, or synthesizes the best. Reserved for high-stakes Process- and Loop-tier decisions.' },
];

const PROOF = [
  { kicker: 'GoChillao', title: 'Live in an afternoon', body: 'Deployed multilingual voice agents for their B2B corporate-gifting platform — automating marketing, sales, and customer success in a single afternoon.' },
  { kicker: 'DnR Studios', title: 'Everything but the games', body: 'Automated every business function except game development. Marketing, sales, support, HR, finance, legal, and operations all run on AI Employees.' },
  { kicker: 'Salasar Techno', title: 'RFPs to tenders', body: 'AI Employees evaluate RFPs, develop proposals, negotiate terms, and process tenders — work that took a team of analysts and weeks of turnaround.' },
];

export default function AIEmployeesPage() {
  return (
    <>
      <PageHero
        scene="orbits"
        eyebrow="Product · AI Employees"
        title="Not chatbots. Cognitive workers."
        lead="HireBuddha AI Employees are structured into a five-tier hierarchy — each tier tuned for a different level of reasoning, autonomy, and tool access. They don’t follow scripts. They think, reason, and self-correct. And when you need a capability that doesn’t exist, the Meta Agent builds it."
        ctaPrimary="Design your first AI Employee"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />

      <Section>
        <SectionHead eyebrow="The organizational blueprint" title="One hierarchy. Five tiers." lead="The hierarchy prevents monolithic prompt sprawl. Strategy stays at the top, tool execution at the bottom — and the composition rule is simple: build up." />
        <Reveal y={16}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', letterSpacing: '.02em', color: 'var(--fg-muted)', lineHeight: 1.9, marginBottom: 44 }}>
            An <b style={{ color: 'var(--accent)' }}>Action</b> wraps a Tool · Actions combine into a <b style={{ color: 'var(--accent)' }}>Skill</b> · Skills compose into an <b style={{ color: 'var(--accent)' }}>Agent</b> · Agents orchestrate into a <b style={{ color: 'var(--accent)' }}>Process</b> · Processes sustain a <b style={{ color: 'var(--accent)' }}>Loop</b>. → That’s your company.
          </p>
        </Reveal>
        <TierStack />
      </Section>

      <Section>
        <SectionHead eyebrow="The agent that builds agents" title="Describe the outcome. The Meta Agent builds the employee." lead="Tell Pragya what you need — “someone to chase overdue invoices in INR and escalate after 14 days” — and the Meta Agent runs its own build-loop. It iterates: drafting, testing, critiquing, and refining until the result actually works." />
        <Timeline items={META_STEPS} />
      </Section>

      <Section>
        <SectionHead eyebrow="Inside an AI Employee" title="Every layer. Configurable." lead="An AI Employee is not a black box. It is eight configurable layers — each visible, tunable, and governed, by you or by Pragya." />
        <CardGrid cols={4}>
          {ANATOMY.map((a) => <Card key={a.title} icon={<a.icon size={22} strokeWidth={1.6} />} title={a.title} body={a.body} />)}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead eyebrow="How they think" title="Three reasoning modes. Each chosen for the work at hand." />
        <CardGrid cols={3}>
          {MODES.map((m) => <Card key={m.title} icon={<m.icon size={22} strokeWidth={1.6} />} title={m.title} body={m.body} />)}
        </CardGrid>
        <Reveal y={16}>
          <p style={{ marginTop: 36, padding: '24px 28px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-gold)', background: 'var(--accent-quiet)', color: 'var(--fg)', fontSize: 'var(--text-md)', lineHeight: 1.6, maxWidth: '74ch' }}>
            Whatever the reasoning mode, every step is model-routed. The <b>Intelligent Router</b> binds each step to the right brain at runtime — BabyBuddha for most work, a frontier model when the task demands it. You never overpay for intelligence you don’t need.
          </p>
        </Reveal>
      </Section>

      <Section>
        <Split
          title="Build it without code. Control it like code."
          body="The No-Code AI Architect is a visual canvas for designing your workforce: drag-and-drop steps, ReactFlow process DAGs, personality sliders, tool binding, knowledge-base upload. If you can draw a flowchart, you can build an AI Employee. And if you’d rather not — Pragya and the Meta Agent build it for you, then hand you the controls."
          items={['ReactFlow process DAG canvas', 'Drag-and-drop step configuration', 'Personality slider controls', 'Tool binding + knowledge-base upload']}
        />
      </Section>

      <Section>
        <SectionHead title="They’re already employed." />
        <CardGrid cols={3}>
          {PROOF.map((p) => <Card key={p.kicker} kicker={p.kicker} title={p.title} body={p.body} />)}
        </CardGrid>
      </Section>

      <CTABand
        title="Your first employee takes 10 minutes. Your last one took 90 days."
        sub="Design one in the No-Code Architect, or describe what you need to Pragya and let the Meta Agent build it. Either way, it’s working and learning before your coffee gets cold."
        primary="Design Your First AI Employee"
      />
    </>
  );
}
