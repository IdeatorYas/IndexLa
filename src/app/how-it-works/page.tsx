import type { Metadata } from "next";
import { HowItWorksPageCta } from "@/components/how-it-works/HowItWorksPageCta";
import { MarketplaceSection } from "@/components/how-it-works/simulator/MarketplaceSection";
import { SimulatorProvider } from "@/components/how-it-works/simulator/SimulatorContext";
import { HowItWorksSimulator } from "@/components/how-it-works/simulator/WizardShell";

export const metadata: Metadata = {
  title: "How It Works | INDEXLA",
  description:
    "See how INDEXLA works: create your portfolio, choose your strategy, confirm permissions, and let INDEXLA coordinate execution while you keep custody.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <SimulatorProvider>
        <HowItWorksSimulator />
        <MarketplaceSection />
      </SimulatorProvider>
      <HowItWorksPageCta />
    </main>
  );
}
