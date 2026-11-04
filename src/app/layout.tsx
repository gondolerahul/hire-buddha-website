import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FluidBuddha } from '@/components/FluidBuddha';
import { SmoothScroll } from '@/components/foundation/SmoothScroll';
import { Cursor } from '@/components/foundation/Cursor';
import { Spotlight } from '@/components/foundation/Spotlight';
import { Ambient } from '@/components/foundation/Ambient';
import { company, SITE_URL } from '@/config/company';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display-next', weight: ['400', '500', '600', '700'], display: 'swap' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body-next', weight: ['300', '400', '500', '600', '700', '800'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-next', weight: ['400', '500', '600'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HireBuddha: AI Employees for your business | Stop Hiring. Start Deploying.',
    template: '%s · HireBuddha',
  },
  description:
    'Design AI Employees in minutes and connect them to your mail, WhatsApp, social accounts and tools. A person approves every outbound action. Start free.',
  applicationName: 'HireBuddha',
  publisher: company.legalName,
  keywords: ['AI workforce', 'AI employees', 'autonomous agents', 'AI automation', 'agentic AI', 'HireBuddha', 'Buddha Cognitive Lab', 'Sheel', 'Pragya'],
  // Pages set their own URL, canonical and card through buildMetadata(); this
  // fallback names no URL, so a page without one (the 404) claims none.
  openGraph: {
    type: 'website', siteName: 'HireBuddha', locale: 'en_IN',
    title: 'HireBuddha: Stop Hiring. Start Deploying.',
    description: 'Design AI Employees, connect them to the accounts your business runs on, and run operations on one loop.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireBuddha: Stop Hiring. Start Deploying.',
    description: 'Design AI Employees, connect them to the accounts your business runs on, and run operations on one loop.',
  },
};

// The legal entity behind the product, as on the certificate of incorporation.
const jsonLd = [
  {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': `${company.url}/#organization`,
    name: company.legalName, alternateName: company.shortName, url: company.url,
    logo: `${SITE_URL}/images/logo-buddha-cognitive-lab-gold.svg`,
    email: company.email.contact, telephone: company.phone.tel,
    address: {
      '@type': 'PostalAddress', streetAddress: company.hq.line1, addressLocality: company.hq.city,
      addressRegion: company.hq.state, postalCode: company.hq.pin, addressCountry: 'IN',
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: company.cin },
    sameAs: [company.linkedin, company.x],
  },
  {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`,
    name: 'HireBuddha', url: SITE_URL, publisher: { '@id': `${company.url}/#organization` },
  },
  {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'HireBuddha', url: SITE_URL,
    applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
    description: 'AI employees that work inside your business’s own accounts, with a person approving every outbound action.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free plan with daily credits' },
    publisher: { '@id': `${company.url}/#organization` },
  },
];

export const viewport: Viewport = { themeColor: '#0a0908', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {/* Without JavaScript, scroll reveals never run: show their content. */}
        <noscript dangerouslySetInnerHTML={{ __html: '<style>[data-reveal]{opacity:1!important;transform:none!important}</style>' }} />
      </head>
      <body className="u-grain">
        <a href="#main" className="skip-link">Skip to main content</a>
        <SmoothScroll />
        <Cursor />
        <Spotlight />
        <Ambient />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <FluidBuddha />
      </body>
    </html>
  );
}
