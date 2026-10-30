import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ICPProvider } from '@/context/ICPContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FluidBuddha } from '@/components/FluidBuddha';
import { SmoothScroll } from '@/components/foundation/SmoothScroll';
import { Cursor } from '@/components/foundation/Cursor';
import { Spotlight } from '@/components/foundation/Spotlight';
import { Ambient } from '@/components/foundation/Ambient';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display-next', weight: ['400', '500', '600', '700'], display: 'swap' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body-next', weight: ['300', '400', '500', '600', '700', '800'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-next', weight: ['400', '500', '600'], display: 'swap' });

const SITE_URL = 'https://hirebuddha.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HireBuddha — Autonomous AI Workforce Platform | Stop Hiring. Start Deploying.',
    template: '%s · HireBuddha',
  },
  description:
    'Design AI Employees in minutes. Connect them to your phones, email, WhatsApp, and tools. Deploy entire business operations autonomously — one unified loop, six arcs, pay per outcome. Start free.',
  keywords: ['AI workforce', 'AI employees', 'autonomous agents', 'AI automation', 'agentic AI', 'HireBuddha', 'Buddha Cognitive Lab', 'Sheel', 'Pragya'],
  openGraph: {
    type: 'website', siteName: 'HireBuddha', url: SITE_URL,
    title: 'HireBuddha — Stop Hiring. Start Deploying.',
    description: 'An autonomous AI workforce platform. Design AI Employees, deploy them across every channel, and run entire business operations on one self-improving loop.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireBuddha — Stop Hiring. Start Deploying.',
    description: 'Design AI Employees. Deploy entire business operations autonomously. Pay per outcome.',
  },
};

export const viewport: Viewport = { themeColor: '#0a0908', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'Organization',
              name: 'HireBuddha', alternateName: 'Buddha Cognitive Lab', url: SITE_URL,
              logo: `${SITE_URL}/images/logo-hire-buddha-gold.svg`,
              description: 'Autonomous AI workforce platform. Design, deploy, and employ AI Employees on one unified business loop.',
              sameAs: ['https://x.com/buddhalab', 'https://linkedin.com/company/buddha-cognitive-lab'],
            }),
          }}
        />
      </head>
      <body className="u-grain">
        <a href="#main" className="skip-link">Skip to main content</a>
        <SmoothScroll />
        <Cursor />
        <Spotlight />
        <Ambient />
        <ICPProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FluidBuddha />
        </ICPProvider>
      </body>
    </html>
  );
}
