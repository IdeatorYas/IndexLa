import { AiExecutionSection } from "@/components/home/AiExecutionSection";
import { CreatorsSection } from "@/components/home/CreatorsSection";
import { DistributionSection } from "@/components/home/DistributionSection";
import { FeesSection } from "@/components/home/FeesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { FlowSection } from "@/components/home/FlowSection";
import { Hero } from "@/components/home/Hero";
import { NonCustodialSection } from "@/components/home/NonCustodialSection";
import { OnePortfolioSection } from "@/components/home/OnePortfolioSection";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { StrategyEngineSection } from "@/components/home/StrategyEngineSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <OnePortfolioSection />
      <PortfolioExamplesSection />
      <StrategyEngineSection />
      <AiExecutionSection />
      <NonCustodialSection />
      <FlowSection />
      <CreatorsSection />
      <DistributionSection />
      <FeesSection />
      <FinalCtaSection />
    </main>
  );
}
