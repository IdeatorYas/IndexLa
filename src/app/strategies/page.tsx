import type { Metadata } from "next";
import { StrategiesHero } from "@/components/strategies/StrategiesHero";
import { WhyTheseStrategiesSection } from "@/components/strategies/WhyTheseStrategiesSection";
import { BuyFearSellGreedSection } from "@/components/strategies/BuyFearSellGreedSection";
import { RsiStrategySection } from "@/components/strategies/RsiStrategySection";
import { MomentumStrategySection } from "@/components/strategies/MomentumStrategySection";
import { TakeProfitSection } from "@/components/strategies/TakeProfitSection";
import { StopLossSection } from "@/components/strategies/StopLossSection";
import { RebalancingSection } from "@/components/strategies/RebalancingSection";
import { YouDefineAiWatchesSection } from "@/components/strategies/YouDefineAiWatchesSection";
import { StrategiesFinalCta } from "@/components/strategies/StrategiesFinalCta";
import { StrategySuitability } from "@/components/strategies/StrategySuitability";
import { StrategyDisclaimer } from "@/components/strategies/StrategyDisclaimer";

export const metadata: Metadata = {
  title: "Strategies — INDEXLA",
  description:
    "Stop reacting. Start following rules. AI-automated strategies that monitor conditions and coordinate on-chain execution while you define the thesis.",
};

export default function StrategiesPage() {
  return (
    <main>
      <StrategiesHero />
      <WhyTheseStrategiesSection />
      <BuyFearSellGreedSection />
      <RsiStrategySection />
      <MomentumStrategySection />
      <TakeProfitSection />
      <StopLossSection />
      <RebalancingSection />
      <YouDefineAiWatchesSection />
      <StrategiesFinalCta />
      <StrategySuitability />
      <StrategyDisclaimer />
    </main>
  );
}
