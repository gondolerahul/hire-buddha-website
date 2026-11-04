import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Cancellation and refund policy',
  description: 'How HireBuddha credits, subscriptions, cancellations and refunds work, and how to ask for a refund within 30 days of a charge.',
  path: '/refund-policy',
});

export default function Page() {
  return <LegalPage name="refund-policy" excerpt="How credits, cancellations and refunds work for HireBuddha." />;
}
