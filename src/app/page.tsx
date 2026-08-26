import { cookies } from "next/headers";
import { AlignedEconomicsSection } from "@/components/home/AlignedEconomicsSection";
import { BuildAutomateSection } from "@/components/home/BuildAutomateSection";
import { CreatorRevenueSection } from "@/components/home/CreatorRevenueSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HomeDisclaimerSection } from "@/components/home/HomeDisclaimerSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeRevealGate } from "@/components/home/reveal/HomeRevealGate";
import { REVEAL_COOKIE } from "@/components/home/reveal/revealAssets";
import { InvestmentStylesSection } from "@/components/home/InvestmentStylesSection";
import { MissingLayerSection } from "@/components/home/MissingLayerSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { WhyNowSection } from "@/components/home/WhyNowSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ reveal?: string }>;
}) {
  const { reveal } = await searchParams;
  const cookieStore = await cookies();
  const skipReveal =
    cookieStore.get(REVEAL_COOKIE)?.value === "1" && reveal !== "1";

  const page = (
    <main>
      <Hero />
      <MissingLayerSection />
      <WhyNowSection />
      <InvestmentStylesSection />
      <CreatorRevenueSection />
      <BuildAutomateSection />
      <PortfolioExamplesSection />
      <AlignedEconomicsSection />
      <FinalCtaSection />
      <HomeFaqSection />
      <HomeDisclaimerSection />
    </main>
  );

  if (skipReveal) return page;
  return <HomeRevealGate>{page}</HomeRevealGate>;
}
