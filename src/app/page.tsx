import { Hero } from '@/components/home/Hero';
import { ParadigmShift } from '@/components/home/ParadigmShift';
import { Pillars } from '@/components/home/Pillars';
import { Lifecycle } from '@/components/home/Lifecycle';
import { SheelLoop } from '@/components/home/SheelLoop';
import { MeetPragya } from '@/components/home/MeetPragya';
import { Proof } from '@/components/home/Proof';
import { Connections } from '@/components/home/Connections';
import { UseCases } from '@/components/home/UseCases';
import { FinalCTA } from '@/components/home/FinalCTA';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'HireBuddha: AI Employees for your business | Stop Hiring. Start Deploying.',
  description: 'Design AI Employees in minutes and connect them to your mail, WhatsApp, social accounts and tools. A person approves every outbound action. Start free.',
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ParadigmShift />
      <Pillars />
      <Lifecycle />
      <SheelLoop />
      <MeetPragya />
      <Proof />
      <Connections />
      <UseCases />
      <FinalCTA />
    </>
  );
}
