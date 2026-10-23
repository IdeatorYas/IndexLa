import { AlignedEconomicsSection } from "@/components/home/AlignedEconomicsSection";
import { BuildAutomateSection } from "@/components/home/BuildAutomateSection";
import { CreatorRevenueSection } from "@/components/home/CreatorRevenueSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HomeDisclaimerSection } from "@/components/home/HomeDisclaimerSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeRevealGate } from "@/components/home/reveal/HomeRevealGate";
import { InvestmentStylesSection } from "@/components/home/InvestmentStylesSection";
import { MissingLayerSection } from "@/components/home/MissingLayerSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { WhyNowSection } from "@/components/home/WhyNowSection";

export default function Home() {
  return (
    <HomeRevealGate>
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
    </HomeRevealGate>
  );
}
