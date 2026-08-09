import type { Metadata } from "next";
import { ConvictionAutomatedSection } from "@/components/investors/ConvictionAutomatedSection";
import { DisciplineSection } from "@/components/investors/DisciplineSection";
import { InvestorDisclaimer } from "@/components/investors/InvestorDisclaimer";
import { InvestorFeesSection } from "@/components/investors/InvestorFeesSection";
import { InvestorFinalCta } from "@/components/investors/InvestorFinalCta";
import { InvestorHero } from "@/components/investors/InvestorHero";
import { InvestorStrategiesSection } from "@/components/investors/InvestorStrategiesSection";
import { MarketplaceSection } from "@/components/investors/MarketplaceSection";
import { MultiAssetSection } from "@/components/investors/MultiAssetSection";
import { MultiChainSection } from "@/components/investors/MultiChainSection";
import { OwnershipSection } from "@/components/investors/OwnershipSection";
import { ThreeStepsSection } from "@/components/investors/ThreeStepsSection";

export const metadata: Metadata = {
  title: "Investors — INDEXLA",
  description:
    "Define your rules. Let INDEXLA execute them. Build or discover rule-based portfolios across crypto, tokenized stocks, commodities, and RWAs.",
};

export default function InvestorsPage() {
  return (
    <main>
      <InvestorHero />
      <ConvictionAutomatedSection />
      <ThreeStepsSection />
      <MultiChainSection />
      <MultiAssetSection />
      <OwnershipSection />
      <InvestorStrategiesSection />
      <MarketplaceSection />
      <InvestorFeesSection />
      <DisciplineSection />
      <InvestorFinalCta />
      <InvestorDisclaimer />
    </main>
  );
}
