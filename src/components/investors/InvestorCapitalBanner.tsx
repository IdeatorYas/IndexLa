import { FadeIn } from "@/components/ui/FadeIn";
import { invPremiumAccent, invSection } from "@/components/investors/investorRhythm";

const FLOW = [
  "You Choose the Capital",
  "You Define the Risk",
  "You Approve the Execution",
] as const;

export function InvestorCapitalBanner() {
  return (
    <section className={`${invSection} bg-deep !py-10 md:!py-12`}>
      <div className="section-pad container-max">
        <FadeIn>
          <div
            className={`${invPremiumAccent} mx-auto max-w-5xl px-5 py-7 text-center sm:px-8 sm:py-8`}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 md:gap-5">
              {FLOW.map((step, i) => (
                <div
                  key={step}
                  className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:gap-5"
                >
                  <p className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink text-balance sm:text-[1.15rem] md:text-[1.22rem]">
                    {step}
                  </p>
                  {i < FLOW.length - 1 ? (
                    <span
                      className="text-[1.15rem] font-semibold text-electric sm:text-[1.25rem]"
                      aria-hidden
                    >
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
