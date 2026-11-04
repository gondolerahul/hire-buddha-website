import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'The terms that govern HireBuddha: accounts, AI employees, connected accounts, acceptable use, credits, payment, refunds and disputes.',
  path: '/terms',
});

export default function Page() {
  return <LegalPage name="terms" excerpt="The agreement between Buddha Cognitive Lab and the businesses that use HireBuddha." />;
}
