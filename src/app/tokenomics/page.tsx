import type { Metadata } from "next";
import { TokenomicsHero } from "@/components/tokenomics/TokenomicsHero";
import {
  TokenUtilitySection,
  TokenBurnMechanismSection,
} from "@/components/tokenomics/TokenArchitectureSections";
import { TokenWhyDexlaSection } from "@/components/tokenomics/TokenWhyDexlaSection";
import { TokenDistributionSection } from "@/components/tokenomics/TokenDistributionSection";
import { FeeFlowSection } from "@/components/tokenomics/FeeFlowSection";
import { VestingScheduleSection } from "@/components/tokenomics/VestingScheduleSection";
import { TgeCirculatingSection } from "@/components/tokenomics/TgeCirculatingSection";
import { LaunchTimingSection } from "@/components/tokenomics/LaunchTimingSection";

export const metadata: Metadata = {
  title: "Tokenomics | INDEXLA",
  description:
    "$DEXLA is the economic engine of INDEXLA. Six utilities, six burn mechanisms, and a hard-capped 100,000,000 supply.",
};

export default function TokenomicsPage() {
  return (
    <main className="overflow-x-hidden">
      <TokenomicsHero />
      <TokenUtilitySection />
      <TokenBurnMechanismSection />
      <FeeFlowSection />
      <TokenWhyDexlaSection />
      <TokenDistributionSection />
      <VestingScheduleSection />
      <TgeCirculatingSection />
      <LaunchTimingSection />
    </main>
  );
}
