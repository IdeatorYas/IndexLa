import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorAudiencePortfolioSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Your Audience.{" "}
            <span className="gradient-text">Your Portfolio</span>
          </h2>

          <p className={`mt-6 ${crBody} text-balance`}>
            Your audience trusts your edge.
          </p>

          <p className={`mt-4 ${crBodyStrong} text-balance`}>
            Turn it into a portfolio they can follow.
          </p>

          <p className={`mt-6 ${crBody} text-balance`}>
            Build a multi-asset, cross-chain portfolio.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            They customize assets and allocations while{" "}
            <span className="font-semibold text-ink">
              you keep the strategy rules.
            </span>
          </p>

          <p className={`mt-6 ${crBodyStrong} tracking-wide text-electric`}>
            Crypto · Tokenized Stocks · Commodities · RWAs · More
          </p>

          <p className={`mt-6 ${crBodyStrong} text-balance`}>
            You build the strategy. They keep custody.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            Pause. Update. Remove.{" "}
            <span className="font-semibold text-ink">No lock-in.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
