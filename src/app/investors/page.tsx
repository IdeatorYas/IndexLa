import type { Metadata } from "next";
import { BuildDefineAutomateSection } from "@/components/investors/BuildDefineAutomateSection";
import { ConvictionAutomatedSection } from "@/components/investors/ConvictionAutomatedSection";
import { InvestorDisclaimer } from "@/components/investors/InvestorDisclaimer";
import { InvestorFeesSection } from "@/components/investors/InvestorFeesSection";
import { InvestorFinalCta } from "@/components/investors/InvestorFinalCta";
import { InvestorHero } from "@/components/investors/InvestorHero";
import { InvestorStrategiesSection } from "@/components/investors/InvestorStrategiesSection";
import { MarketplaceSection } from "@/components/investors/MarketplaceSection";
import { OnePortfolioEveryMarketSection } from "@/components/investors/OnePortfolioEveryMarketSection";
import { OwnershipSection } from "@/components/investors/OwnershipSection";

export const metadata: Metadata = {
  title: "Investors — INDEXLA",
  description:
    "Define your strategy. Let INDEXLA execute it. Build rule-based portfolios across crypto, tokenized stocks, commodities, and RWAs.",
};

export default function InvestorsPage() {
  return (
    <main>
      <InvestorHero />
      <ConvictionAutomatedSection />
      <BuildDefineAutomateSection />
      <InvestorStrategiesSection />
      <OnePortfolioEveryMarketSection />
      <OwnershipSection />
      <MarketplaceSection />
      <InvestorFeesSection />
      <InvestorFinalCta />
      <InvestorDisclaimer />
    </main>
  );
}
