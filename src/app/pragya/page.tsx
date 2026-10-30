import type { Metadata } from 'next';
import { Route, MessageSquare, Search, Sparkles, Wrench, Combine } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, Timeline, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { PragyaConsole } from '@/components/pragya/PragyaConsole';

export const metadata: Metadata = {
  title: 'Meet Pragya — Your AI Account Manager',
  description: 'Pragya is HireBuddha’s account manager and your first AI Employee — backed by CORTEX memory and the Meta Agent. The same intelligence you talk to here is the one that runs your business tomorrow.',
};

const HERE = [
  { icon: Route, title: 'Route', body: '“Take me to pricing.” Pragya navigates you there instantly — no menu hunting.' },
  { icon: MessageSquare, title: 'Explain', body: '“What does CORTEX do?” She answers from the knowledge base in plain language.' },
  { icon: Search, title: 'Consult', body: '“I run a 12-person logistics firm — how would this help?” She maps your problem to the right arcs, agents, and tools.' },
  { icon: Sparkles, title: 'Generate', body: '“Show me how you’d handle my invoice collection.” She generates a personalized scenario, on brand.' },
  { icon: Wrench, title: 'Build (preview)', body: '“Build me an agent that chases overdue invoices.” She invokes the Meta Agent to sketch the AI Employee live.' },
  { icon: Combine, title: 'Detect your fit', body: 'Through conversation she determines your profile and surfaces content tailored to companies like yours.' },
];

const JOB = [
  { title: 'Onboards your business', body: 'Ingests your knowledge base — files, SharePoint, Notion, Drive, and databases — so she understands how you actually work.' },
  { title: 'Connects your software', body: 'Links your CRM, ERP, accounting, HRMS, and invoicing so the workforce can act inside the systems you already run.' },
  { title: 'Builds your workforce', body: 'Designs or commissions the AI Employees you need via the Meta Agent — then hands you the controls.' },
  { title: 'Assigns and monitors', body: 'Dispatches the work, watches every run, and surfaces Human-in-the-Loop approvals when you’ve asked for them.' },
  { title: 'Reports back', body: 'Keeps you informed by Meetings, phone, WhatsApp, Slack, or Teams — exactly like a human chief of staff.' },
];

export default function PragyaPage() {
  return (
    <>
      <PageHero
        scene="presence"
        eyebrow="Pragya · प्रज्ञा · Wisdom"
        title="Meet Pragya. Your single point of contact."
        lead="Pragya is a live HireBuddha AI Employee — your account manager and your first hire. Backed by CORTEX memory and the Meta Agent, she’s the one relationship you keep. The intelligence you talk to here is the one that runs your business tomorrow."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya"
        visual="center"
        align="center"
      />

      <Section>
        <SectionHead eyebrow="On this website" title="What Pragya does for you, right now." lead="She isn’t a support bot bolted onto a site. She’s the product — running live, doing exactly what she’ll do for your company every day." />
        <CardGrid cols={3}>
          {HERE.map((h) => <Card key={h.title} icon={<h.icon size={22} strokeWidth={1.6} />} title={h.title} body={h.body} />)}
        </CardGrid>
      </Section>

      <Section>
        <PragyaConsole />
      </Section>

      <Section>
        <SectionHead eyebrow="Her real job" title="Inside the product, she runs the relationship." lead="Everything she does here is powered by the same platform you’ll use. The demo is the product." />
        <Timeline items={JOB} />
      </Section>

      <CTABand
        title="The first AI Employee you’ll meet. And the one you’ll keep."
        sub="Talk to Pragya now, or start free and let her onboard your business in minutes."
        primary="Start Free"
      />
    </>
  );
}
