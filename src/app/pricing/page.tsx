import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Gift, Wallet, CalendarClock } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, CardGrid, StatGrid, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import s from './pricing.module.css';

export const metadata: Metadata = {
  title: 'Pricing — Pay for Outcomes, Not Salaries',
  description: 'SKU-based, pay-per-outcome pricing with micro-cent cost tracking and a router that runs each step on the cheapest model that will succeed. Start free with $5 in daily credits.',
};

const WALLET = [
  { icon: Gift, title: 'Daily Credits', body: 'A free daily allocation — $5.00/day — to explore and run real work. Expires at midnight; no card required to start.' },
  { icon: Wallet, title: 'PAYG Wallet', body: 'Top up funds and spend them as you go, billed at micro-cent precision per task. Valid for 365 days.' },
  { icon: CalendarClock, title: 'Subscription Credits', body: 'Monthly plans add bonus credits — up to 40% — for teams running steady volume across the loop.' },
];

const PLANS = [
  { name: 'Free', price: '$0', note: '$5 daily credits. No card required.', feat: false, cta: 'Get Started', href: '/contact',
    items: ['2 AI Employees', '1 Sheel arc', '30 voice minutes / mo', 'Basic HITL checkpoints', 'Community support'] },
  { name: 'Starter', price: 'PAYG', note: 'Pay as you go + 10% bonus credits.', feat: false, cta: 'Get Started', href: '/contact',
    items: ['10 AI Employees', '3 Sheel arcs', '500 voice minutes / mo', 'Full HITL governance', 'Email support'] },
  { name: 'Growth', price: 'PAYG', note: 'Pay as you go + 25% bonus credits.', feat: true, cta: 'Get Started', href: '/contact',
    items: ['50 AI Employees', 'All 6 Sheel arcs', '2,000 voice minutes / mo', 'Full HITL governance', 'Priority support'] },
  { name: 'Enterprise', price: 'Custom', note: 'Volume pricing + 40% bonus credits.', feat: false, cta: 'Talk to Sales', href: '/contact',
    items: ['Unlimited AI Employees', 'All 6 arcs + custom', 'Unlimited voice', 'Custom HITL + SSO + residency', 'Dedicated support'] },
];

const CMP = [
  { task: 'Outbound sales call', human: '$15–25', hb: '~$0.03–0.10', save: '99%+' },
  { task: 'Support ticket resolution', human: '$8–15', hb: '~$0.02–0.05', save: '99%+' },
  { task: 'Invoice reconciliation', human: '$20–40', hb: '~$0.01–0.03', save: '99%+' },
  { task: 'Contract review', human: '$200–500', hb: '~$0.50–2.00', save: '95%+' },
  { task: 'Candidate screening call', human: '$30–50', hb: '~$0.05–0.15', save: '99%+' },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        scene="ledger"
        eyebrow="Pricing · Economics"
        title="Pay for outcomes. Not salaries."
        lead="SKU-based pricing with micro-cent cost tracking and no fixed commitments. An Intelligent Router runs each step on the cheapest model that will succeed — so you pay frontier prices only where they’re truly needed."
        ctaPrimary="Start Free"
        ctaPragya="Talk to Pragya about pricing"
        visual="ring"
      />

      <Section>
        <SectionHead eyebrow="How billing works" title="Three ways to fund your workforce." />
        <div className={s.wallet}>
          {WALLET.map((w) => <Card key={w.title} icon={<w.icon size={22} strokeWidth={1.6} />} title={w.title} body={w.body} />)}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="ROI calculator" title="Do the math. Move the sliders." lead="See what the work would cost as headcount versus the same work running on HireBuddha." />
        <ROICalculator />
      </Section>

      <Section>
        <SectionHead title="AI vs. human — per task." lead="Illustrative cost ranges. Real bills land lower on routine work, where the router picks lightweight models." />
        <div className={s.cmp}>
          <div className={s.cmpRow}>
            <span className={s.cmpHead}>Task</span><span className={s.cmpHead}>Human cost</span><span className={s.cmpHead}>HireBuddha</span><span className={s.cmpHead}>Savings</span>
          </div>
          {CMP.map((c) => (
            <Reveal key={c.task} y={12} className={s.cmpRow}>
              <span className={s.cmpTask}>{c.task}</span>
              <span className={s.cmpHuman}>{c.human}</span>
              <span className={s.cmpHb}>{c.hb}</span>
              <span className={s.cmpSave}>{c.save}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Plans that scale with you." lead="Every plan includes $5 in free daily credits. Numbers shown are illustrative starting points." />
        <div className={s.plans}>
          {PLANS.map((p) => (
            <Reveal key={p.name} y={24} className={`${s.plan} ${p.feat ? s.planFeat : ''}`} style={{ display: 'flex' }} data-spot>
              {p.feat && <span className={s.planTag}>Most popular</span>}
              <div className={s.planName}>{p.name}</div>
              <div className={s.planPrice}>{p.price}</div>
              <div className={s.planNote}>{p.note}</div>
              <div className={s.planList}>
                {p.items.map((it) => <div key={it} className={s.planItem}><Check size={16} /> {it}</div>)}
              </div>
              <Link href={p.href} className={p.feat ? 'btn btn-gold' : 'btn btn-ghost'} data-cursor>{p.cta}</Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title="Start with less than a dollar." lead="Transparent minimum wallet balances per execution type. No runaway spend — every cent is tracked and gated." />
        <StatGrid stats={[
          { num: '$0.50', label: 'to start a Process' },
          { num: '$0.05', label: 'to start an Agent' },
          { num: '$0.02', label: 'to start a Skill' },
          { num: '$0.01', label: 'to start an Action' },
        ]} />
      </Section>

      <CTABand
        title="Start free. Pay only for outcomes."
        sub="$5 in daily credits, no credit card required. Design your first AI Employee in under 10 minutes."
        primary="Get Started Free"
      />
    </>
  );
}
