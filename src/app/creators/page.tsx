import type { Metadata } from "next";
import { CreatorBuildFlowSection } from "@/components/creators/CreatorBuildFlowSection";
import { CreatorDistributionSection } from "@/components/creators/CreatorDistributionSection";
import { CreatorEconomicsSection } from "@/components/creators/CreatorEconomicsSection";
import { CreatorLeaderboardSection } from "@/components/creators/CreatorLeaderboardSection";
import { CreatorTrackRecordSection } from "@/components/creators/CreatorTrackRecordSection";
import { CreatorsFinalCta } from "@/components/creators/CreatorsFinalCta";
import { CreatorsHero } from "@/components/creators/CreatorsHero";

export const metadata: Metadata = {
  title: "Creators — INDEXLA",
  description:
    "Turn your alpha into an investable product. Publish portfolios, grow AUM, earn from trading activity, and climb the creator leaderboard.",
};

export default function CreatorsPage() {
  return (
    <main>
      <CreatorsHero />
      <CreatorBuildFlowSection />
      <CreatorDistributionSection />
      <CreatorEconomicsSection />
      <CreatorTrackRecordSection />
      <CreatorLeaderboardSection />
      <CreatorsFinalCta />
    </main>
  );
}
