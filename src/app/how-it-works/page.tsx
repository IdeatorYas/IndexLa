import type { Metadata } from "next";
import { HowItWorksPageCta } from "@/components/how-it-works/HowItWorksPageCta";
import { HowItWorksPageHero } from "@/components/how-it-works/HowItWorksPageHero";
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
      <HowItWorksPageHero />
      <SimulatorProvider>
        <section
          aria-labelledby="indexla-demo-heading"
          className="border-t border-white/[0.06] bg-void"
        >
          <div className="section-pad container-max pb-4 pt-10 sm:pb-5 sm:pt-12">
            <h2
              id="indexla-demo-heading"
              className="display text-center text-[clamp(1.55rem,3.2vw,2.15rem)] font-semibold tracking-[-0.03em] text-ink"
            >
              Explore the INDEXLA{" "}
              <span className="gradient-text">Demo</span>
            </h2>
          </div>
          <HowItWorksSimulator />
        </section>
        <MarketplaceSection />
      </SimulatorProvider>
      <HowItWorksPageCta />
    </main>
  );
}
