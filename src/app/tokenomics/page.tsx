import type { Metadata } from "next";
import { TokenomicsHero } from "@/components/tokenomics/TokenomicsHero";
import { TokenUtilitySection } from "@/components/tokenomics/TokenUtilitySection";
import { UtilityBurnBridgeSection } from "@/components/tokenomics/UtilityBurnBridgeSection";
import { TokenBurnMechanismSection } from "@/components/tokenomics/TokenBurnMechanismSection";
import { WhyDexlaExistsSection } from "@/components/tokenomics/WhyDexlaExistsSection";
import { TokenFlywheelSection } from "@/components/tokenomics/TokenFlywheelSection";
import { TokenDistributionSection } from "@/components/tokenomics/TokenDistributionSection";
import { VestingScheduleSection } from "@/components/tokenomics/VestingScheduleSection";
import { TgeCirculatingSection } from "@/components/tokenomics/TgeCirculatingSection";
import { LaunchTimingSection } from "@/components/tokenomics/LaunchTimingSection";

export const metadata: Metadata = {
  title: "Tokenomics — INDEXLA",
  description:
    "$DEXLA is the economic engine of INDEXLA — four utilities, four burn mechanisms, and a hard-capped 100,000,000 supply.",
};

export default function TokenomicsPage() {
  return (
    <main>
      <TokenomicsHero />
      <TokenUtilitySection />
      <UtilityBurnBridgeSection />
      <TokenBurnMechanismSection />
      <WhyDexlaExistsSection />
      <TokenFlywheelSection />
      <TokenDistributionSection />
      <VestingScheduleSection />
      <TgeCirculatingSection />
      <LaunchTimingSection />
    </main>
  );
}

