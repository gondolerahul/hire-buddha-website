import type { Metadata } from 'next';
import { PageHero, Section, Card, CardGrid, CTABand } from '@/components/page/kit';
import { USE_CASES } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Use Cases — What You Can Deploy',
  description: 'Industry-agnostic scenarios you can deploy in minutes: outbound sales, 24/7 support, financial reconciliation, voice screening, contract review, executive briefings, and Meta-Agent builds.',
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        scene="sparks"
        eyebrow="Use Cases"
        title="Deploy in minutes. Impact in hours."
        lead="A starter set of industry-agnostic scenarios. Each maps to the arcs of Sheel and deploys without an engineering project."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="ring"
      />
      <Section>
        <CardGrid cols={2}>
          {USE_CASES.map((u) => (
            <Card key={u.slug} href={`/use-cases/${u.slug}`} kicker={u.tag} title={u.title} body={u.summary} cta="Explore use case" />
          ))}
        </CardGrid>
      </Section>
      <CTABand title="Find your use case in minutes." sub="Tell Pragya what you do and she’ll map it to the loop — then build what’s missing." primary="Get Started Free" />
    </>
  );
}
