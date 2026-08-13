import { BuildAutomateSection } from "@/components/home/BuildAutomateSection";
import { CreatorsSection } from "@/components/home/CreatorsSection";
import { DexlaSection } from "@/components/home/DexlaSection";
import { DistributionSection } from "@/components/home/DistributionSection";
import { FeesSection } from "@/components/home/FeesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { ProblemSolutionSection } from "@/components/home/ProblemSolutionSection";
import { SecurityControlSection } from "@/components/home/SecurityControlSection";
import { TokenizationSection } from "@/components/home/TokenizationSection";
import { WhatIsIndexlaSection } from "@/components/home/WhatIsIndexlaSection";
import { WhyIndexlaDifferentSection } from "@/components/home/WhyIndexlaDifferentSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsIndexlaSection />
      <WhyIndexlaDifferentSection />
      <ProblemSolutionSection />
      <DistributionSection />
      <TokenizationSection />
      <BuildAutomateSection />
      <HowItWorksSection />
      <PortfolioExamplesSection />
      <SecurityControlSection />
      <CreatorsSection />
      <FeesSection />
      <DexlaSection />
      <FinalCtaSection />
      <HomeFaqSection />
    </main>
  );
}
