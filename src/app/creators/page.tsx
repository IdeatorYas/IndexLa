import type { Metadata } from "next";
import { CreatorBecomeSection } from "@/components/creators/CreatorBecomeSection";
import { CreatorDisclaimer } from "@/components/creators/CreatorDisclaimer";
import { CreatorEconomicsSection } from "@/components/creators/CreatorEconomicsSection";
import { CreatorHybridPortfolioSection } from "@/components/creators/CreatorHybridPortfolioSection";
import { CreatorMonthlyRewardsSection } from "@/components/creators/CreatorMonthlyRewardsSection";
import { CreatorLongTermSection } from "@/components/creators/CreatorLongTermSection";
import { CreatorParticipantsSection } from "@/components/creators/CreatorParticipantsSection";
import { CreatorSimulatedDashboard } from "@/components/creators/CreatorSimulatedDashboard";
import { CreatorTransparencySection } from "@/components/creators/CreatorTransparencySection";
import { CreatorTypesSection } from "@/components/creators/CreatorTypesSection";
import { CreatorWhySection } from "@/components/creators/CreatorWhySection";
import { CreatorsFinalCta } from "@/components/creators/CreatorsFinalCta";
import { CreatorsHero } from "@/components/creators/CreatorsHero";

export const metadata: Metadata = {
  title: "Creators — INDEXLA",
  description:
    "Turn your investment thesis into a portfolio your community can follow, invest in, and grow with.",
};

export default function CreatorsPage() {
  return (
    <main>
      <CreatorsHero />
      <CreatorWhySection />
      <CreatorSimulatedDashboard />
      <CreatorBecomeSection />
      <CreatorHybridPortfolioSection />
      <CreatorLongTermSection />
      <CreatorParticipantsSection />
      <CreatorEconomicsSection />
      <CreatorMonthlyRewardsSection />
      <CreatorTransparencySection />
      <CreatorTypesSection />
      <CreatorsFinalCta />
      <CreatorDisclaimer />
    </main>
  );
}
