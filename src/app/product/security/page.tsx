import { KeyRound, Lock, Users, Eye, Gauge, ScrollText, ShieldCheck, Server, Bug, ListChecks } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, Split, PillRow, CTABand } from '@/components/page/kit';
import { SECURITY_BADGES } from '@/lib/site';
import { company } from '@/config/company';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Security & Governance',
  description: 'Encryption, tenant isolation, human approvals and audit trails, hosted in Azure Central India. How to report a vulnerability to HireBuddha.',
  path: '/product/security',
});

const TRUST = [
  { icon: Server, title: 'Hosted in India', body: 'HireBuddha’s databases and files are hosted in Microsoft Azure’s Central India region, encrypted, with each business’s data kept apart from every other.', href: '/subprocessors', cta: 'See our sub-processors' },
  { icon: Bug, title: 'Report a vulnerability', body: `Found a security issue? Write to ${company.email.contact} with the details and steps to reproduce. We acknowledge reports within 72 hours. Please don’t test against other customers’ data.`, href: `mailto:${company.email.contact}?subject=Security%20report`, cta: 'Report an issue' },
  { icon: ListChecks, title: 'Your data, your rules', body: 'How we collect, keep and delete data, and how to disconnect an account or close your workspace, is set out in our privacy policy and data deletion page.', href: '/privacy', cta: 'Read the privacy policy' },
];

const CARDS = [
  { icon: KeyRound, title: 'Encryption — Key Vault', body: 'AES-256-GCM with nonce-prepended ciphertext. The master key is stored outside the database. Secrets are never logged or exposed in plaintext.' },
  { icon: Lock, title: 'Stateless Authentication', body: 'JWT access tokens with 15-minute expiry plus HTTP-only refresh cookies (7-day). A suspension middleware instantly locks out suspended tenants at the API.' },
  { icon: Users, title: 'Human-in-the-Loop Governance', body: 'Configurable checkpoints per agent, action, process, and loop. Pause before large payments, contract signatures, or promoting self-evolving code — surfaced to you through Pragya.' },
  { icon: Eye, title: 'Model & Data Governance', body: 'Restrict which models are eligible (residency/compliance) or pin a specific one. Every step records the model, tokens, and cost. Routing is completely auditable.' },
  { icon: Gauge, title: 'Credit Circuit Breakers', body: 'Minimum wallet thresholds per execution type and real-time per-step cost tracking. Execution halts automatically on a budget breach. No runaway spend.' },
  { icon: ScrollText, title: 'Full Audit Trail', body: 'Every run traced: token counts, cost attribution, latency, and decision logs. Exportable, queryable, compliance-ready — with context snapshots for replay.' },
];

const Isolation = (
  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 24 }}>
    {[
      { label: 'App Admin', pad: 0 },
      { label: 'Partner', pad: 1 },
      { label: 'Tenant', pad: 2 },
      { label: 'User', pad: 3 },
    ].reduce<React.ReactNode>((child, lvl) => (
      <div style={{
        width: '100%', height: '100%', borderRadius: 'var(--r-lg)',
        border: `1px solid ${lvl.pad === 3 ? 'var(--border-gold)' : 'var(--border)'}`,
        background: lvl.pad === 3 ? 'var(--accent-quiet)' : 'rgba(255,255,255,.014)',
        display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: lvl.pad === 3 ? 'var(--accent)' : 'var(--fg-subtle)' }}>{lvl.label}</span>
        <div style={{ flex: 1, display: 'grid', placeItems: lvl.pad === 3 ? 'center' : 'stretch', paddingTop: 12 }}>{child}</div>
      </div>
    ), <ShieldCheck size={26} color="var(--accent)" />)}
  </div>
);

export default function SecurityPage() {
  return (
    <>
      <PageHero
        scene="aegis"
        eyebrow="Product · Security & Governance"
        title="Enterprise-grade security. By design, not afterthought."
        lead="Encryption, isolation, authentication, and governance built into the core — so your autonomous workforce is auditable, gated, and yours to control. This page is written to survive a security review."
        ctaPrimary="Talk to Sales"
        ctaPrimaryHref="/contact"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />

      <Section>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <PillRow items={SECURITY_BADGES} icon={<ShieldCheck size={13} />} />
        </div>
      </Section>

      <Section>
        <Split
          title="Multi-tenant isolation, four levels deep."
          body="A strict hierarchy segregates every byte of data: App Admin → Partner → Tenant → User. Every database operation is company-scoped — no query can cross a tenant boundary. Full data segregation is the default, not a configuration."
          items={['Company-scoped queries on every operation', 'No cross-tenant data access — ever', 'Per-tenant encryption and key isolation', 'Instant lockout for suspended tenants']}
          visual={Isolation}
        />
      </Section>

      <Section>
        <SectionHead title="Your AI workforce doesn’t go rogue." lead="It asks permission at every checkpoint you define, runs every model choice on the record, and stops the moment a budget is breached." />
        <CardGrid cols={3}>
          {CARDS.map((c) => <Card key={c.title} icon={<c.icon size={22} strokeWidth={1.6} />} title={c.title} body={c.body} />)}
        </CardGrid>
      </Section>

      <Section>
        <SectionHead title="Where your data lives. Who to tell." lead="Hosting, sub-processors, and a direct line for security researchers." />
        <CardGrid cols={3}>
          {TRUST.map((c) => <Card key={c.title} icon={<c.icon size={22} strokeWidth={1.6} />} title={c.title} body={c.body} href={c.href} cta={c.cta} />)}
        </CardGrid>
      </Section>

      <CTABand
        title="Autonomy you can prove and control."
        sub="You decide which brains touch your data — and you can prove what every one of them did. Talk to us about your security requirements."
        primary="Talk to Sales"
        primaryHref="/contact"
      />
    </>
  );
}
