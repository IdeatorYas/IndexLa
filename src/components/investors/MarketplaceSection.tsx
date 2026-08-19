import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invH3,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Find portfolios built around different markets, assets, and strategies.",
  },
  {
    n: "02",
    title: "Follow",
    body: "Choose a portfolio that matches your investment conviction.",
  },
  {
    n: "03",
    title: "Customize",
    body: "Adjust assets and allocations to fit your preferences while keeping full custody.",
  },
  {
    n: "04",
    title: "Build",
    body: "Create your own portfolio, choose your assets, allocations, and strategy rules.",
  },
] as const;

export function MarketplaceSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Build.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] font-semibold tracking-[-0.015em] text-electric sm:text-[1.15rem]">
            Discover → Follow → Customize → Build
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch xl:gap-3">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 xl:min-w-0 xl:flex-1 xl:flex-row xl:items-stretch"
              >
                <article
                  className={`${invPremiumSurface} flex h-full min-h-[14.5rem] flex-1 flex-col items-center px-5 py-7 text-center sm:px-6 sm:py-8`}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    {step.n} · {step.title}
                  </p>
                  <h3 className="mt-4 display text-[1.35rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.45rem]">
                    {step.title}
                  </h3>
                  <p
                    className={`mt-4 flex-1 ${invBody} text-[1.05rem] leading-snug sm:text-[1.08rem]`}
                  >
                    {step.body}
                  </p>
                </article>
                {i < steps.length - 1 ? (
                  <div
                    className="flex shrink-0 items-center justify-center text-electric/70 xl:w-5"
                    aria-hidden
                  >
                    <span className="text-[1.25rem] font-semibold xl:hidden">
                      ↓
                    </span>
                    <span className="hidden text-[1.2rem] font-semibold xl:inline">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-14 max-w-4xl" delay={0.08}>
          <div
            className={`${invPremiumSurface} rounded-2xl px-6 py-8 sm:px-8 sm:py-9 md:px-10`}
          >
            <div>
              <h3 className={`${invH3} uppercase`}>
                Back a Creator. Share the{" "}
                <span className="gradient-text">Rewards.</span>
              </h3>
              <div className={`mt-5 max-w-2xl space-y-3 ${invBody}`}>
                <p>
                  Invest in a creator&apos;s portfolio and tip them with{" "}
                  <span className="font-semibold text-ink">$DEXLA</span>.
                </p>
                <p>
                  If their portfolio ranks in the{" "}
                  <span className="font-semibold text-ink">Top 10</span>, you
                  become eligible for the investor share of the monthly Creator
                  Rewards Pool.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-electric/25 bg-electric/[0.06] px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Investor Eligibility
                </p>
                <p className="mt-3 text-[1.02rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.05rem]">
                  Hold ≥ 7 Days + Tip Creator
                </p>
              </div>

              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Monthly Pool Split
                </p>
                <div className="mt-3 grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex min-h-[4.75rem] items-center justify-center rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-electric sm:text-[1.08rem]">
                      50% → Creator
                    </p>
                  </div>
                  <div className="flex min-h-[4.75rem] items-center justify-center rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-electric sm:text-[1.08rem]">
                      50% → Eligible Investors
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Investor Reward Weight
                </p>
                <div className="mt-3 grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex min-h-[4.75rem] items-center justify-center rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.08rem]">
                      80% → Amount Invested
                    </p>
                  </div>
                  <div className="flex min-h-[4.75rem] items-center justify-center rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.08rem]">
                      20% → Amount Tipped
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
