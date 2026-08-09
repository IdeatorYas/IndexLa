import { AiExecutionSection } from "@/components/home/AiExecutionSection";
import { CreatorsSection } from "@/components/home/CreatorsSection";
import { FeesSection } from "@/components/home/FeesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FlowSection } from "@/components/home/FlowSection";
import { Hero } from "@/components/home/Hero";
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
      <PortfolioExamplesSection />
      <StrategyEngineSection />
      <AiExecutionSection />
      <FlowSection />
      <CreatorsSection />
      <FeesSection />
      <FinalCtaSection />
    </main>
  );
}
