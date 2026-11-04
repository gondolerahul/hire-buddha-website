import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Buddha Cognitive Lab collects, uses, keeps and protects personal data across hirebuddha.com, the HireBuddha app, connected accounts and Pragya.',
  path: '/privacy',
});

export default function Page() {
  return <LegalPage name="privacy" excerpt="What HireBuddha collects, why, how long we keep it, who we share it with, and your rights." />;
}
