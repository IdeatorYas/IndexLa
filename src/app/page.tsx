import { CreatorsSection } from "@/components/home/CreatorsSection";
import { DistributionSection } from "@/components/home/DistributionSection";
import { BuildAutomateSection } from "@/components/home/BuildAutomateSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FeesSection } from "@/components/home/FeesSection";
import { Hero } from "@/components/home/Hero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { OnePortfolioSection } from "@/components/home/OnePortfolioSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { ProblemSolutionSection } from "@/components/home/ProblemSolutionSection";
import { StrategyExecutedSection } from "@/components/home/StrategyExecutedSection";
import { TokenizationSection } from "@/components/home/TokenizationSection";
import { WhatIsIndexlaSection } from "@/components/home/WhatIsIndexlaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsIndexlaSection />
      <ProblemSolutionSection />
      <TokenizationSection />
      <DistributionSection />
      <OnePortfolioSection />
      <BuildAutomateSection />
      <HowItWorksSection />
      <PortfolioExamplesSection />
      <CreatorsSection />
      <FeesSection />
      <StrategyExecutedSection />
      <FinalCtaSection />
    </main>
  );
}
