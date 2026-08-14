import type { Metadata } from "next";
import { InvestorDisclaimer } from "@/components/investors/InvestorDisclaimer";
import { InvestorFeesSection } from "@/components/investors/InvestorFeesSection";
import { InvestorFinalCta } from "@/components/investors/InvestorFinalCta";
import { InvestorFinalOwnership } from "@/components/investors/InvestorFinalOwnership";
import { InvestorHero } from "@/components/investors/InvestorHero";
import { InvestorStrategiesCta } from "@/components/investors/InvestorStrategiesCta";
import { MarketCyclesSection } from "@/components/investors/MarketCyclesSection";
import { MarketplaceSection } from "@/components/investors/MarketplaceSection";
import { OnePortfolioLayerSection } from "@/components/investors/OnePortfolioLayerSection";
import { OwnershipSection } from "@/components/investors/OwnershipSection";
import { StrategyWorksSection } from "@/components/investors/StrategyWorksSection";

export const metadata: Metadata = {
  title: "Investors | INDEXLA",
  description:
    "Define your rules when you're calm. Let INDEXLA coordinate execution when the market moves. Build rule-based portfolios across crypto, tokenized stocks, commodities, and RWAs.",
};

export default function InvestorsPage() {
  return (
    <main>
      <InvestorHero />
      <InvestorFeesSection />
      <MarketCyclesSection />
      <StrategyWorksSection />
      <InvestorStrategiesCta />
      <OnePortfolioLayerSection />
      <OwnershipSection />
      <MarketplaceSection />
      <InvestorFinalOwnership />
      <InvestorFinalCta />
      <InvestorDisclaimer />
    </main>
  );
}
