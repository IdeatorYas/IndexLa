import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  stBody,
  stCta,
  stGreenBox,
  stGreenText,
  stH2,
  stLede,
  stSection,
  stSurface,
} from "@/components/strategies/strategyRhythm";

export function CreatorStrategyMarketplaceSection() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div
            className={`${stSurface} px-6 py-8 text-center sm:px-10 sm:py-9`}
          >
            <h2 className={`${stH2} uppercase`}>
              Creator Strategy{" "}
              <span className="gradient-text">Marketplace</span>
            </h2>
            <p className={`mt-4 ${stLede}`}>
              Go Beyond INDEXLA Strategies.
            </p>
            <p className={`mx-auto mt-4 max-w-xl ${stBody}`}>
              Creators can list proprietary strategies, set access prices, and
              earn when other creators use them.
            </p>
            <div className="mt-6 flex justify-center">
              <div className={stGreenBox}>
                <p className={`${stGreenText} text-balance`}>
                  Investors Use Them Free → Creators Earn
                </p>
              </div>
            </div>
            <div className="mt-7 flex justify-center">
              <Button
                href="/whitepaper/12-strategies#creator-strategy-marketplace"
                className={stCta}
              >
                Explore Creator Strategies →
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
