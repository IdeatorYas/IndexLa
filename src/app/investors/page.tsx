import type { Metadata } from "next";
import { AiAutomationSection } from "@/components/investors/AiAutomationSection";
import { BuildDefineAutomateSection } from "@/components/investors/BuildDefineAutomateSection";
import { DisciplineSection } from "@/components/investors/DisciplineSection";
import { InvestorDisclaimer } from "@/components/investors/InvestorDisclaimer";
import { InvestorFinalOwnership } from "@/components/investors/InvestorFinalOwnership";
import { InvestorHero } from "@/components/investors/InvestorHero";
import { InvestorStrategiesSection } from "@/components/investors/InvestorStrategiesSection";
import { MarketCyclesSection } from "@/components/investors/MarketCyclesSection";
import { MarketplaceSection } from "@/components/investors/MarketplaceSection";
import { OnePortfolioLayerSection } from "@/components/investors/OnePortfolioLayerSection";
import { OwnershipSection } from "@/components/investors/OwnershipSection";
import { StrategyWorksSection } from "@/components/investors/StrategyWorksSection";

export const metadata: Metadata = {
  title: "Investors — INDEXLA",
  description:
    "Define your rules when you're calm. Let INDEXLA coordinate execution when the market moves. Build rule-based portfolios across crypto, tokenized stocks, commodities, and RWAs.",
};

export default function InvestorsPage() {
  return (
    <main>
      <InvestorHero />
      <MarketCyclesSection />
      <StrategyWorksSection />
      <InvestorStrategiesSection />
      <AiAutomationSection />
      <DisciplineSection />
      <BuildDefineAutomateSection />
      <OnePortfolioLayerSection />
      <OwnershipSection />
      <MarketplaceSection />
      <InvestorFinalOwnership />
      <InvestorDisclaimer />
    </main>
  );
}
