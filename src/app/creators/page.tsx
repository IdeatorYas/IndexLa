import type { Metadata } from "next";
import { CreatorDisclaimer } from "@/components/creators/CreatorDisclaimer";
import { CreatorEconomicsSection } from "@/components/creators/CreatorEconomicsSection";
import { CreatorHybridPortfolioSection } from "@/components/creators/CreatorHybridPortfolioSection";
import { CreatorLongTermSection } from "@/components/creators/CreatorLongTermSection";
import { CreatorNonCustodialSection } from "@/components/creators/CreatorNonCustodialSection";
import { CreatorStopSellingLinksSection } from "@/components/creators/CreatorStopSellingLinksSection";
import { CreatorThesisFlowSection } from "@/components/creators/CreatorThesisFlowSection";
import { CreatorTrackRecordSection } from "@/components/creators/CreatorTrackRecordSection";
import { CreatorTransparencySection } from "@/components/creators/CreatorTransparencySection";
import { CreatorTypesSection } from "@/components/creators/CreatorTypesSection";
import { CreatorsFinalCta } from "@/components/creators/CreatorsFinalCta";
import { CreatorsHero } from "@/components/creators/CreatorsHero";

export const metadata: Metadata = {
  title: "Creators — INDEXLA",
  description:
    "Turn your thesis into a portfolio your audience can follow. Build it. Publish it. Automate it. Earn from it.",
};

export default function CreatorsPage() {
  return (
    <main>
      <CreatorsHero />
      <CreatorStopSellingLinksSection />
      <CreatorThesisFlowSection />
      <CreatorNonCustodialSection />
      <CreatorHybridPortfolioSection />
      <CreatorEconomicsSection />
      <CreatorLongTermSection />
      <CreatorTypesSection />
      <CreatorTrackRecordSection />
      <CreatorTransparencySection />
      <CreatorsFinalCta />
      <CreatorDisclaimer />
    </main>
  );
}
