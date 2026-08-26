import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invPremiumAccent,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorAdvantageSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Different Goals.{" "}
            <span className="gradient-text">The Same Advantage.</span>
          </h2>
          <div className={`mx-auto mt-6 max-w-2xl space-y-4 ${invBody}`}>
            <p>
              Long-term exposure. Stablecoin liquidity. High-risk opportunities.
            </p>
            <p>
              Whatever your investment style, predefined rules help reduce
              hesitation, panic and impulsive decisions.
            </p>
          </div>
          <div className="mt-8 inline-flex justify-center">
            <div className={`${invPremiumAccent} px-6 py-4 sm:px-8`}>
              <p className="text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.08rem]">
                You Choose the Capital · You Define the Risk · You Approve the
                Execution
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
