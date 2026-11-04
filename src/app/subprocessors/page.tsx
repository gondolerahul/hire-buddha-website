import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Sub-processors',
  description: 'The service providers Buddha Cognitive Lab uses to run HireBuddha, what each one does and where it processes data.',
  path: '/subprocessors',
});

export default function Page() {
  return <LegalPage name="subprocessors" excerpt="The service providers that process data for HireBuddha, and where." />;
}
