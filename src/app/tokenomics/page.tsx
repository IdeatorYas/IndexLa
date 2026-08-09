import type { Metadata } from "next";
import { TokenomicsHero } from "@/components/tokenomics/TokenomicsHero";
import { TokenUtilitySection } from "@/components/tokenomics/TokenUtilitySection";
import { TokenBurnMechanismSection } from "@/components/tokenomics/TokenBurnMechanismSection";
import { TokenDistributionSection } from "@/components/tokenomics/TokenDistributionSection";
import { VestingScheduleSection } from "@/components/tokenomics/VestingScheduleSection";
import { TgeCirculatingSection } from "@/components/tokenomics/TgeCirculatingSection";
import { LaunchTimingSection } from "@/components/tokenomics/LaunchTimingSection";
import { TokenModelAlignedSection } from "@/components/tokenomics/TokenModelAlignedSection";

export const metadata: Metadata = {
  title: "Tokenomics — INDEXLA",
  description:
    "$DEXLA connects INDEXLA growth to real platform activity through creator burns, fee discounts, protocol buybacks, and treasury buybacks.",
};

export default function TokenomicsPage() {
  return (
    <main>
      <TokenomicsHero />
      <TokenUtilitySection />
      <TokenBurnMechanismSection />
      <TokenDistributionSection />
      <VestingScheduleSection />
      <TgeCirculatingSection />
      <LaunchTimingSection />
      <TokenModelAlignedSection />
    </main>
  );
}
