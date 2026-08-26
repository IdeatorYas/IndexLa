import type { Metadata } from "next";
import { InvestorBuildSection } from "@/components/investors/InvestorBuildSection";
import { InvestorCapitalBanner } from "@/components/investors/InvestorCapitalBanner";
import { InvestorDisclaimer } from "@/components/investors/InvestorDisclaimer";
import { InvestorDoesNotDoSection } from "@/components/investors/InvestorDoesNotDoSection";
import { InvestorFeesSection } from "@/components/investors/InvestorFeesSection";
import { InvestorFinalOwnership } from "@/components/investors/InvestorFinalOwnership";
import { InvestorHero } from "@/components/investors/InvestorHero";
import { InvestorPathsSection } from "@/components/investors/InvestorPathsSection";
import { InvestorThesisSection } from "@/components/investors/InvestorThesisSection";
import { MarketplaceSection } from "@/components/investors/MarketplaceSection";
import { OnePortfolioLayerSection } from "@/components/investors/OnePortfolioLayerSection";
import { OwnershipSection } from "@/components/investors/OwnershipSection";

export const metadata: Metadata = {
  title: "Investors | INDEXLA",
  description:
    "Set your rules while you're calm. When conditions are met, INDEXLA triggers only the execution you approved. Choose INDEXLA Core, Stable Club or Degen Club.",
};

export default function InvestorsPage() {
  return (
    <main>
      <InvestorHero />
      <InvestorPathsSection />
      <InvestorFeesSection />
      <InvestorCapitalBanner />
      <InvestorBuildSection />
      <InvestorThesisSection />
      <MarketplaceSection />
      <OnePortfolioLayerSection />
      <OwnershipSection />
      <InvestorDoesNotDoSection />
      <InvestorFinalOwnership />
      <InvestorDisclaimer />
    </main>
  );
}
