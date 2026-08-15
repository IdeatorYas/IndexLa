import { FadeIn } from "@/components/ui/FadeIn";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  crBody,
  crCta,
  crGreenBox,
  crGreenText,
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
            The category is still being built.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            The first 100 creators with 3,000+ followers to publish a portfolio
            on INDEXLA will receive additional founding creator rewards at
            launch.
          </p>

          <div className="mt-6 flex justify-center">
            <div className={crGreenBox}>
              <p className={`${crGreenText} text-balance`}>
                100 spots. Once they&apos;re gone, they&apos;re gone.
              </p>
            </div>
          </div>

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
