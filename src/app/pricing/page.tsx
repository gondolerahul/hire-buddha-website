import Link from 'next/link';
import { Check, Gift, Wallet, CalendarClock } from 'lucide-react';
import { PageHero, Section, SectionHead, Card, StatGrid, CTABand } from '@/components/page/kit';
import { Reveal } from '@/components/motion/primitives';
import { ROICalculator } from '@/components/pricing/ROICalculator';
import { SIGNUP_URL } from '@/config/company';
import { buildMetadata } from '@/lib/metadata';
import s from './pricing.module.css';

export const metadata = buildMetadata({
  title: 'Pricing: Pay for Outcomes, Not Salaries',
  description: 'Usage-based pricing for AI employees, tracked to a fraction of a paisa. Start free with ₹500 in daily credits; Starter ₹10,000 and Growth ₹25,000 a month. Prices exclude GST.',
  path: '/pricing',
});

const WALLET = [
  { icon: Gift, title: 'Daily Credits', body: 'A free daily allocation — ₹500 a day — to explore and run real work. Daily credits expire at the end of the day they are given; no card required to start.' },
  { icon: Wallet, title: 'PAYG Wallet', body: 'Top up and spend as you go, billed per task to a fraction of a paisa. Credits you buy are valid for 365 days from purchase.' },
  { icon: CalendarClock, title: 'Subscription Credits', body: 'Monthly plans (Starter ₹10,000, Growth ₹25,000) raise your limits and add bonus credits on top of what you buy — up to 40%. Plan credits follow the plan’s terms.' },
];

const PLANS = [
  { name: 'Free', price: '₹0', per: '', note: '₹500 daily credits. No card required.', feat: false, cta: 'Start Free', href: SIGNUP_URL,
    items: ['2 AI Employees', '1 Sheel arc', '30 voice minutes / mo', 'Basic HITL checkpoints', 'Community support'] },
  { name: 'Starter', price: '₹10,000', per: '/month', note: 'Billed monthly, +10% bonus credits on every top-up. For a founder or a small team.', feat: false, cta: 'Start Free', href: SIGNUP_URL,
    items: ['10 AI Employees', '3 Sheel arcs', '500 voice minutes / mo', 'Full HITL governance', 'Email support'] },
  { name: 'Growth', price: '₹25,000', per: '/month', note: 'Billed monthly, +25% bonus credits on every top-up. For teams running several arcs.', feat: true, cta: 'Start Free', href: SIGNUP_URL,
    items: ['50 AI Employees', 'All 6 Sheel arcs', '2,000 voice minutes / mo', 'Full HITL governance', 'Priority support'] },
  { name: 'Enterprise', price: 'Custom', per: '', note: 'Volume pricing + 40% bonus credits.', feat: false, cta: 'Talk to Sales', href: '/contact',
    items: ['Unlimited AI Employees', 'All 6 arcs + custom', 'Unlimited voice', 'Custom HITL + SSO + residency', 'Dedicated support'] },
];

const CMP = [
  { task: 'Outbound sales call', human: '₹1,300–2,100', hb: '~₹2.5–8.5', save: '99%+' },
  { task: 'Support ticket resolution', human: '₹700–1,300', hb: '~₹1.7–4.3', save: '99%+' },
  { task: 'Invoice reconciliation', human: '₹1,700–3,400', hb: '~₹0.85–2.6', save: '99%+' },
  { task: 'Contract review', human: '₹17,000–42,500', hb: '~₹45–170', save: '95%+' },
  { task: 'Candidate screening call', human: '₹2,550–4,250', hb: '~₹4–13', save: '99%+' },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        scene="ledger"
        eyebrow="Pricing · Economics"
        title="Pay for outcomes. Not salaries."
        lead="SKU-based pricing with sub-paisa cost tracking and no long-term commitments. An Intelligent Router runs each step on the cheapest model that will succeed — so you pay frontier prices only where they’re truly needed."
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
        <SectionHead title="Plans that scale with you." lead="Every plan includes ₹500 in free daily credits and the same per-task prices. Starter and Growth are monthly plans that raise your limits and add bonus credits to every top-up, so choose by the size of the workforce you run." />
        <div className={s.plans}>
          {PLANS.map((p) => (
            <Reveal key={p.name} y={24} className={`${s.plan} ${p.feat ? s.planFeat : ''}`} style={{ display: 'flex' }} data-spot>
              {p.feat && <span className={s.planTag}>Most popular</span>}
              <div className={s.planName}>{p.name}</div>
              <div className={s.planPrice}>{p.price}{p.per && <small>{p.per}</small>}</div>
              <div className={s.planNote}>{p.note}</div>
              <div className={s.planList}>
                {p.items.map((it) => <div key={it} className={s.planItem}><Check size={16} /> {it}</div>)}
              </div>
              <Link href={p.href} className={p.feat ? 'btn btn-gold' : 'btn btn-ghost'} data-cursor>{p.cta}</Link>
            </Reveal>
          ))}
        </div>
        <p className={s.terms}>
          Prices are in Indian rupees and exclude taxes; GST is added where it applies. You are billed through Razorpay in the
          currency shown at checkout. Monthly plans renew until you cancel, and cancelling takes effect at the end of the month you paid for. See our <Link href="/terms">Terms of Service</Link> and{' '}
          <Link href="/refund-policy">cancellation and refund policy</Link>.
        </p>
      </Section>

      <Section>
        <SectionHead title="Start with less than ₹100." lead="Transparent minimum wallet balances per execution type. No runaway spend — every paisa is tracked and gated." />
        <StatGrid stats={[
          { num: '₹50', label: 'to start a Process' },
          { num: '₹5', label: 'to start an Agent' },
          { num: '₹2', label: 'to start a Skill' },
          { num: '₹1', label: 'to start an Action' },
        ]} />
      </Section>

      <CTABand
        title="Start free. Pay only for outcomes."
        sub="₹500 in daily credits, no credit card required. Design your first AI Employee in under 10 minutes."
        primary="Start Free"
      />
    </>
  );
}
