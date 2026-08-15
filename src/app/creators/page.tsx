import type { Metadata } from "next";
import { CreatorAudiencePortfolioSection } from "@/components/creators/CreatorAudiencePortfolioSection";
import { CreatorCustodySection } from "@/components/creators/CreatorCustodySection";
import { CreatorDisclaimer } from "@/components/creators/CreatorDisclaimer";
import { CreatorDistributionSection } from "@/components/creators/CreatorDistributionSection";
import { CreatorEarlyAdvantageSection } from "@/components/creators/CreatorEarlyAdvantageSection";
import { CreatorHybridPortfolioSection } from "@/components/creators/CreatorHybridPortfolioSection";
import { CreatorMonetizeSection } from "@/components/creators/CreatorMonetizeSection";
import { CreatorStrategyRulesSection } from "@/components/creators/CreatorStrategyRulesSection";
import { CreatorTypesSection } from "@/components/creators/CreatorTypesSection";
import { CreatorsFinalCta } from "@/components/creators/CreatorsFinalCta";
import { CreatorsHero } from "@/components/creators/CreatorsHero";

export const metadata: Metadata = {
  title: "Creators | INDEXLA",
  description:
    "Turn your market knowledge into an investable product your audience can follow, customize, and allocate to while keeping full custody.",
};

export default function CreatorsPage() {
  return (
    <main>
      <CreatorsHero />
      <CreatorAudiencePortfolioSection />
      <CreatorHybridPortfolioSection />
      <CreatorStrategyRulesSection />
      <CreatorMonetizeSection />
      <CreatorCustodySection />
      <CreatorDistributionSection />
      <CreatorEarlyAdvantageSection />
      <CreatorTypesSection />
      <CreatorsFinalCta />
      <CreatorDisclaimer />
    </main>
  );
}
