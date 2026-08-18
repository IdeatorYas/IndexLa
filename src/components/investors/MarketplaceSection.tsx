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
    label: "Discover",
    flow: "Discover → Follow",
    body: "Find portfolios built around different markets and strategies.",
  },
  {
    n: "02",
    label: "Follow",
    flow: "Follow → Customize",
    body: "Choose a portfolio that matches your conviction.",
  },
  {
    n: "03",
    label: "Customize",
    flow: "Customize → Build",
    body: "Adjust assets, allocations, and rules to fit your strategy.",
    note: "Followers can customize assets and allocations while keeping full custody. They cannot change the creator's core strategy rules.",
  },
  {
    n: "04",
    label: "Build",
    flow: null,
    body: "Create your own portfolio from the ground up.",
  },
] as const;

export function MarketplaceSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Discover. Follow. Customize.{" "}
            <span className="gradient-text">Build.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            You don&apos;t always need to start from scratch.
          </p>
          <p className={`mt-2 ${invBody}`}>
            Explore portfolios built around different investment theses and
            strategies.
          </p>
          <p className={`mt-5 ${invBody}`}>
            New here? Start with{" "}
            <span className="font-semibold text-muted">Discover</span>. Ready to
            build? Go to{" "}
            <span className="font-semibold text-muted">
              Build → Define → Automate.
            </span>
          </p>
        </FadeIn>

        <FadeIn className="mt-12" delay={0.04}>
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3 lg:gap-4">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 md:flex-1 md:flex-row md:items-stretch md:gap-3 lg:gap-4"
              >
                <article className={`${invPremiumSurface} flex h-full flex-1 flex-col p-5 sm:p-6`}>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    {step.n} · {step.label}
                  </p>
                  {step.flow ? (
                    <h3 className="mt-4 display text-[1.12rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.18rem]">
                      {step.flow}
                    </h3>
                  ) : (
                    <h3 className="mt-4 display text-[1.12rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.18rem]">
                      Build
                    </h3>
                  )}
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:text-[0.98rem]">
                    {step.body}
                  </p>
                  {"note" in step && step.note ? (
                    <p className="mt-3 border-t border-white/[0.06] pt-3 text-[0.9rem] leading-relaxed text-muted">
                      {step.note}
                    </p>
                  ) : null}
                </article>
                {i < steps.length - 1 ? (
                  <div
                    className="flex shrink-0 items-center justify-center text-electric/50 md:w-4 lg:w-5"
                    aria-hidden
                  >
                    <span className="text-[1.1rem] font-semibold md:hidden">
                      ↓
                    </span>
                    <span className="hidden text-[1.15rem] font-semibold md:inline">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-14 max-w-4xl" delay={0.08}>
          <div className={`${invPremiumSurface} rounded-2xl px-6 py-8 sm:px-8 sm:py-9 md:px-10`}>
            <div>
              <h3 className={`${invH3} uppercase`}>
                Back a Creator. Share the Rewards.
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
                <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-electric sm:text-[1.08rem]">
                      50% → Creator
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
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
                <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
                    <p className="display text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.08rem]">
                      80% → Amount Invested
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-deep/40 px-4 py-4 text-center sm:px-5 sm:py-5">
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
