import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  invBody,
  invEyebrow,
  invH2,
  invPremiumAccent,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorPrivacySection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className={invEyebrow}>TRANSACTION PRIVACY</p>
          <h2 className={`mt-3 ${invH2} uppercase`}>
            Protect Your{" "}
            <span className="gradient-text">Transactions.</span>
          </h2>
          <p className="mt-4 display text-[clamp(1.2rem,2.4vw,1.55rem)] font-semibold tracking-[-0.02em] text-muted text-balance">
            Reduce MEV Exposure.
          </p>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4">
          <FadeIn delay={0.04}>
            <article
              className={`${invPremiumAccent} px-6 py-8 text-center sm:px-10 sm:py-10`}
            >
              <p className={`mx-auto max-w-2xl ${invBody}`}>
                INDEXLA uses{" "}
                <span className="font-semibold text-ink">CoW Protocol</span> to
                help protect transaction privacy through batch-auction
                execution, reducing the need to expose individual trade
                intentions directly to the market.
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.07}>
            <article
              className={`${invPremiumSurface} px-6 py-6 text-center sm:px-8 sm:py-7`}
            >
              <p className={`mx-auto max-w-2xl ${invBody}`}>
                This helps reduce MEV exposure, including front-running and
                sandwich attacks.
              </p>
            </article>
          </FadeIn>
        </div>

        <FadeIn className="mt-8 flex justify-center" delay={0.08}>
          <HomeReadMore
            href="/whitepaper/technical"
            label="Read Technical Paper →"
            external={false}
          />
        </FadeIn>
      </div>
    </section>
  );
}
