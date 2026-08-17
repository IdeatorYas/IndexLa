import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HowItWorksPageCta } from "@/components/how-it-works/HowItWorksPageCta";
import { HowItWorksPageHero } from "@/components/how-it-works/HowItWorksPageHero";
import { SimulatorProvider } from "@/components/how-it-works/simulator/SimulatorContext";

const HowItWorksSimulator = dynamic(
  () =>
    import("@/components/how-it-works/simulator/WizardShell").then(
      (mod) => mod.HowItWorksSimulator,
    ),
);

const MarketplaceSection = dynamic(
  () =>
    import("@/components/how-it-works/simulator/MarketplaceSection").then(
      (mod) => mod.MarketplaceSection,
    ),
);

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
          className="border-t border-white/[0.06] bg-void sm:border-t"
        >
          <div className="section-pad container-max hidden pb-5 pt-12 sm:block">
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
        <div className="hidden sm:block">
          <MarketplaceSection />
        </div>
      </SimulatorProvider>
      <div className="hidden sm:block">
        <HowItWorksPageCta />
      </div>
    </main>
  );
}
