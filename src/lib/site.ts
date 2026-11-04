import type { LucideIcon } from 'lucide-react';
import {
  Radar, Heart, Workflow, Boxes, Scale, TrendingUp,
  Bot, BrainCircuit, Wrench, ShieldCheck,
} from 'lucide-react';

export const SITE = {
  name: 'HireBuddha',
  parent: 'Buddha Cognitive Lab',
  url: 'https://hirebuddha.com',
  tagline: 'Towards digital enlightenment.',
  spine: 'Stop Hiring. Start Deploying.',
};

/* ------------------------------------------------------------------ ARCS -- */
export type Arc = {
  slug: string; numeral: string; name: string; sanskrit?: string;
  oneLiner: string; absorbs: string; icon: LucideIcon; karuna?: boolean;
};

export const ARCS: Arc[] = [
  { slug: 'perceive', numeral: 'I', name: 'Perceive', icon: Radar,
    oneLiner: 'Senses the market, your customers, and your numbers — continuously.',
    absorbs: 'Market research · BI · Monitoring · Lead intake' },
  { slug: 'engage', numeral: 'II', name: 'Engage', sanskrit: 'Karuna', karuna: true, icon: Heart,
    oneLiner: 'Every conversation with the world: acquire, sell, support, screen — with compassion.',
    absorbs: 'Marketing · Sales · Support · Success · Recruiting' },
  { slug: 'orchestrate', numeral: 'III', name: 'Orchestrate', icon: Workflow,
    oneLiner: 'Decides what to do and who does it. The Meta Agent builds anything missing.',
    absorbs: 'Management · Strategy · Planning · PM · Dispatch' },
  { slug: 'fulfill', numeral: 'IV', name: 'Fulfill', icon: Boxes,
    oneLiner: 'Delivers the work: operations, QA, logistics, provisioning. Self-healing when integrations break.',
    absorbs: 'Operations · Delivery · Production · Logistics · QA' },
  { slug: 'sustain', numeral: 'V', name: 'Sustain', icon: Scale,
    oneLiner: 'Keeps you funded, legal, staffed, and supplied.',
    absorbs: 'Finance · Legal · Compliance · HR · IT · Procurement' },
  { slug: 'evolve', numeral: 'VI', name: 'Evolve', icon: TrendingUp,
    oneLiner: 'Learns from everything and tunes the whole loop. Week 12 beats Week 1.',
    absorbs: 'R&D · BI · Continuous improvement · Reporting' },
];

/* -------------------------------------------------------------- PRODUCTS -- */
export type Product = { slug: string; title: string; blurb: string; icon: LucideIcon };

export const PRODUCTS: Product[] = [
  { slug: '/product/ai-employees', title: 'AI Employees', blurb: 'The 5-tier hierarchy & the Meta Agent that builds it.', icon: Bot },
  { slug: '/product/intelligence', title: 'Intelligence & Memory', blurb: 'The Engine, CORTEX memory & the Learning System.', icon: BrainCircuit },
  { slug: '/product/tools', title: 'Tools & Capabilities', blurb: '20+ built-in tools and multimodal generation.', icon: Wrench },
  { slug: '/product/security', title: 'Security & Governance', blurb: 'Encryption, isolation, HITL & full audit trails.', icon: ShieldCheck },
];

/* ------------------------------------------------------------------- NAV -- */
export type NavLink = { label: string; href: string };
export type NavGroup = {
  label: string;
  href?: string;
  kind?: 'product' | 'solutions' | 'icp';
};

export const NAV: NavGroup[] = [
  { label: 'Product', kind: 'product' },
  { label: 'Solutions', kind: 'solutions' },
  { label: 'Who it’s for', kind: 'icp' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Stories', href: '/stories' },
  { label: 'Blog', href: '/blog' },
];

// The four ideal-customer families (also surfaced by Pragya's persona switch),
// each with its sub-pages for the "Who it's for" submenu.
export const ICP_NAV: { label: string; href: string; concept: string; subs: NavLink[] }[] = [
  { label: 'Solopreneurs', href: '/for/solopreneurs', concept: 'The Army of One', subs: [
    { label: 'Meet Your Team', href: '/for/solopreneurs/team' },
    { label: 'Your Day', href: '/for/solopreneurs/your-day' },
    { label: 'Quick Start', href: '/for/solopreneurs/start' },
  ] },
  { label: 'Startups & SMEs', href: '/for/startups', concept: 'Your Unfair Advantage', subs: [
    { label: 'Day in the Life', href: '/for/startups/day-in-the-life' },
    { label: 'Battle Cards', href: '/for/startups/vs' },
    { label: 'Launchpad', href: '/for/startups/launchpad' },
  ] },
  { label: 'Growing Companies', href: '/for/growing-companies', concept: 'The Ops System That Runs Itself', subs: [
    { label: 'Ops Playbook', href: '/for/growing-companies/ops-playbook' },
    { label: 'Control & Governance', href: '/for/growing-companies/control' },
    { label: 'ROI Builder', href: '/for/growing-companies/roi' },
  ] },
  { label: 'Enterprise', href: '/for/enterprise', concept: 'The Transformation Layer', subs: [
    { label: 'Architecture & Security', href: '/for/enterprise/architecture' },
    { label: 'Integrations', href: '/for/enterprise/integrations' },
    { label: '90-Day Deployment', href: '/for/enterprise/deployment' },
    { label: 'Business Case', href: '/for/enterprise/business-case' },
  ] },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'AI Employees', href: '/product/ai-employees' },
      { label: 'Intelligence & Memory', href: '/product/intelligence' },
      { label: 'Tools & Capabilities', href: '/product/tools' },
      { label: 'Security & Governance', href: '/product/security' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Sheel',
    links: [
      { label: 'The Unified Loop', href: '/solutions' },
      ...ARCS.map((a) => ({ label: a.name, href: `/solutions/${a.slug}` })),
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Meet Pragya', href: '/pragya' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Impact Stories', href: '/stories' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Who it’s for',
    links: [
      { label: 'Solopreneurs', href: '/for/solopreneurs' },
      { label: 'Startups & SMEs', href: '/for/startups' },
      { label: 'Growing Companies', href: '/for/growing-companies' },
      { label: 'Enterprise', href: '/for/enterprise' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security', href: '/product/security' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

// Shown on every page (footer), as the provider reviews and Razorpay require.
export const LEGAL_NAV: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Data deletion', href: '/data-deletion' },
  { label: 'Sub-processors', href: '/subprocessors' },
  { label: 'Refund policy', href: '/refund-policy' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Grievance Officer', href: '/contact#grievance' },
];

/* ------------------------------------------------------------- PROOF DATA -- */
export const CUSTOMERS = [
  'GoChillao', 'Fortune Series', 'Durwankur AI Labs', 'Eva World Tours',
  'DnR Studios', 'Saraswat Bank', 'Salasar Techno',
];

// The accounts a business can connect today, and what HireBuddha does with
// each. Keep in step with the privacy policy (section 6): name nothing that
// isn't built.
export const CONNECTIONS: { name: string; does: string }[] = [
  { name: 'Gmail', does: 'Reads and answers your Gmail. Replies wait as drafts until you approve them.' },
  { name: 'Outlook', does: 'Reads and answers Outlook and Microsoft 365 mail through Microsoft Graph.' },
  { name: 'Google Drive', does: 'Opens the files you choose and saves the files your AI employees produce.' },
  { name: 'YouTube', does: 'Publishes the videos you approve to your channel and shows its analytics.' },
  { name: 'Google Ads', does: 'Reports on your campaigns, and changes them only after you approve.' },
  { name: 'Facebook Pages', does: 'Publishes posts, replies to comments and answers Messenger messages.' },
  { name: 'Instagram', does: 'Publishes posts and answers the comments and Direct messages you approve.' },
  { name: 'WhatsApp', does: 'Replies to your WhatsApp customers, in their language, at any hour.' },
  { name: 'LinkedIn Pages', does: 'Posts to your LinkedIn Page and shows how each post performs.' },
  { name: 'X', does: 'Drafts and publishes posts to your X account, and replies where you approve.' },
  { name: 'GitHub', does: 'Reads code, pushes branches and opens pull requests in the repos you choose.' },
  { name: 'HubSpot', does: 'Works with your CRM’s contacts and deals through your own HubSpot token.' },
  { name: 'Any mailbox (IMAP)', does: 'Connects any other mailbox with an app password.' },
  { name: 'MCP servers', does: 'Brings your own tools to your AI employees through the Model Context Protocol.' },
];

export const SECURITY_BADGES = [
  'AES-256-GCM Encryption', 'JWT Authentication', 'Multi-Tenant Isolation',
  'Human-in-the-Loop Governance', 'Credit Circuit Breakers', 'Full Audit Trail',
];

export const PRAGYA_PROMPTS = [
  'How would HireBuddha help my sales team?',
  'Map my business to Sheel.',
  'Build me an AI Employee that chases overdue invoices.',
];
