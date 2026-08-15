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
            Your audience already trusts your market knowledge.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            INDEXLA turns that conviction into a multi asset, cross chain
            portfolio they can follow, customize, and allocate to while keeping
            full custody.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            Followers can customize assets and allocations while keeping full
            custody. They cannot change the creator&apos;s core strategy rules.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            Combine supported crypto, tokenized stocks, commodities, RWAs, and
            other assets across multiple networks.
          </p>

          <p className={`mt-6 ${crBodyStrong} text-balance`}>
            You build the portfolio. They keep control.
          </p>

          <p className={`mt-3 ${crBody} text-balance`}>
            Pause, update, or remove it anytime. No lock in.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
