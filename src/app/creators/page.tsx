import type { Metadata } from "next";
import { CreatorBecomeSection } from "@/components/creators/CreatorBecomeSection";
import { CreatorDisclaimer } from "@/components/creators/CreatorDisclaimer";
import { CreatorEconomicsSection } from "@/components/creators/CreatorEconomicsSection";
import { CreatorHybridPortfolioSection } from "@/components/creators/CreatorHybridPortfolioSection";
import { CreatorLongTermSection } from "@/components/creators/CreatorLongTermSection";
import { CreatorParticipantsSection } from "@/components/creators/CreatorParticipantsSection";
import { CreatorThesisFlowSection } from "@/components/creators/CreatorThesisFlowSection";
import { CreatorTransparencySection } from "@/components/creators/CreatorTransparencySection";
import { CreatorTypesSection } from "@/components/creators/CreatorTypesSection";
import { CreatorsFinalCta } from "@/components/creators/CreatorsFinalCta";
import { CreatorsHero } from "@/components/creators/CreatorsHero";

export const metadata: Metadata = {
  title: "Creators — INDEXLA",
  description:
    "Turn your investment conviction into a portfolio your audience can follow, customize, and automate.",
};

export default function CreatorsPage() {
  return (
    <main>
      <CreatorsHero />
      <CreatorBecomeSection />
      <CreatorHybridPortfolioSection />
      <CreatorLongTermSection />
      <CreatorThesisFlowSection />
      <CreatorParticipantsSection />
      <CreatorEconomicsSection />
      <CreatorTransparencySection />
      <CreatorTypesSection />
      <CreatorsFinalCta />
      <CreatorDisclaimer />
    </main>
  );
}
