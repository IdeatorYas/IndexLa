import { FadeIn } from "@/components/ui/FadeIn";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  crBody,
  crBodyStrong,
  crCta,
  crH2,
  crH3,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

export function CreatorStrategyRulesSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Your Strategy.{" "}
            <span className="gradient-text">Your Rules</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <FadeIn className={`${crSurfaceSoft} p-6 sm:p-7`} delay={0.04}>
            <h3 className={`${crH3} uppercase`}>Use INDEXLA Strategies</h3>
            <p className={`mt-4 ${crBody} text-balance`}>
              Predefined strategies such as Buy the Fear, Sell the Greed, Buy
              RSI Oversold, Sell RSI Overbought, Momentum, and Rebalancing.
            </p>
          </FadeIn>

          <FadeIn className={`${crSurfaceSoft} p-6 sm:p-7`} delay={0.08}>
            <h3 className={`${crH3} uppercase`}>Bring Your Own Strategy</h3>
            <p className={`mt-4 ${crBody} text-balance`}>
              Build with a Technical Indicator, On Chain Indicator, or Hybrid
              Strategy.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className={`${crBodyStrong} text-balance`}>
            You define the rules. INDEXLA coordinates authorized execution when
            conditions are met.
          </p>
          <div className="mt-8 flex justify-center">
            <EarlyAccessCta mode="creator" className={crCta}>
              Creator Early Access →
            </EarlyAccessCta>
          </div>
          <div className="mt-5 flex justify-center">
            <HomeReadMore
              href="/strategies"
              label="Explore INDEXLA Strategies →"
              external={false}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
