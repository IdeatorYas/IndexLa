import { AiExecutionSection } from "@/components/home/AiExecutionSection";
import { CreatorsSection } from "@/components/home/CreatorsSection";
import { FeesSection } from "@/components/home/FeesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { OnePortfolioSection } from "@/components/home/OnePortfolioSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { RulesThesisSection } from "@/components/home/RulesThesisSection";
import { StrategyEngineSection } from "@/components/home/StrategyEngineSection";
import { TokenizationSection } from "@/components/home/TokenizationSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <RulesThesisSection />
      <OnePortfolioSection />
      <TokenizationSection />
      <HowItWorksSection />
      <PortfolioExamplesSection />
      <StrategyEngineSection />
      <AiExecutionSection />
      <CreatorsSection />
      <FeesSection />
      <FinalCtaSection />
    </main>
  );
}
