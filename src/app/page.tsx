import { Hero } from '@/components/home/Hero';
import { ParadigmShift } from '@/components/home/ParadigmShift';
import { Pillars } from '@/components/home/Pillars';
import { Lifecycle } from '@/components/home/Lifecycle';
import { SheelLoop } from '@/components/home/SheelLoop';
import { MeetPragya } from '@/components/home/MeetPragya';
import { Proof } from '@/components/home/Proof';
import { UseCases } from '@/components/home/UseCases';
import { FinalCTA } from '@/components/home/FinalCTA';

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
      <UseCases />
      <FinalCTA />
    </>
  );
}
