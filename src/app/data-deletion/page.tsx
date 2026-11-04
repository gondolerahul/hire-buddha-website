import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Data deletion',
  description: 'How to disconnect an account, delete data from Facebook, Instagram or WhatsApp, close a HireBuddha account, and what we keep and for how long.',
  path: '/data-deletion',
});

export default function Page() {
  return <LegalPage name="data-deletion" excerpt="How to delete data from HireBuddha, what is deleted, what we must keep, and how long it takes." />;
}
