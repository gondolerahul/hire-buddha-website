import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Shipping and delivery',
  description: 'HireBuddha is an online service delivered on sign-up. Nothing is shipped. How accounts, credits and invoices are delivered.',
  path: '/delivery',
});

export default function Page() {
  return <LegalPage name="delivery" excerpt="HireBuddha is an online service. Nothing is shipped." />;
}
