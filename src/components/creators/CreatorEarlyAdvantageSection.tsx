import { FadeIn } from "@/components/ui/FadeIn";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  crBody,
  crCta,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorEarlyAdvantageSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            The Early Creator{" "}
            <span className="gradient-text">Advantage</span>
          </h2>

          <p className={`mt-6 ${crBody} text-balance`}>
            Early KOLs who sign up for INDEXLA receive three free portfolio
            publications.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            Build your portfolios, attract investors and start growing your
            creator presence.
          </p>

          <div className="mt-8 flex justify-center">
            <EarlyAccessCta mode="creator" className={crCta}>
              Creator Early Access →
            </EarlyAccessCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
