import { PageHero, Section, SectionHead, Split, CTABand } from '@/components/page/kit';
import { ToolSuites } from '@/components/product/ToolSuites';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Tools & Capabilities — 20+ Built-In Tools',
  description: 'Built-in tools for web research, e-mail, documents, voice, creative work and code, plus connections to your accounts and custom tools the Meta Agent builds.',
  path: '/product/tools',
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        scene="rings"
        eyebrow="Product · Tools & Capabilities"
        title="20+ built-in tools. Infinite possibilities."
        lead="Every AI Employee comes equipped for real work — web intelligence, email, document generation, voice, creative production, code execution, and enterprise integrations. And when a tool doesn’t exist, the Meta Agent writes one."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />

      <Section>
        <SectionHead eyebrow="The talent stack" title="A full kit, in every employee." lead="Tools are grouped into six suites. Bind exactly what each AI Employee needs — nothing more." />
        <ToolSuites />
      </Section>

      <Section>
        <Split
          reverse
          title="Don’t see what you need? Describe it."
          body="Tell Pragya the system you want to connect to, and the Meta Agent synthesizes a brand-new tool — code, sandboxed, tested, versioned, and registered to your workspace. This is self-evolving code: tools are also auto-repaired when an upstream API drifts, and auto-optimized when they get slow or costly."
          items={['Synthesized from a plain-English goal', 'Sandboxed, test-gated, and versioned', 'Auto-repaired on API drift', 'Auto-optimized for latency and cost']}
        />
      </Section>

      <CTABand
        title="Give your workforce the right tools for the job."
        sub="Bind built-in tools in seconds, or have the Meta Agent build new ones on demand. Start free."
        primary="Start Free"
      />
    </>
  );
}
