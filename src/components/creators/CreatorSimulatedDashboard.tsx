"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBodyStrong,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

const loop = [
  "X Verification",
  "Create Portfolio",
  "Grow AUM",
  "Generate Volume",
  "Receive Tips",
  "Earn Creator Fees",
] as const;

const portfolios = ["Hybrid Portfolio", "Hybrid Index"] as const;

const metrics = [
  { label: "AUM", value: "$10M" },
  { label: "Trading Volume", value: "$20M" },
  { label: "Tips", value: "10,000 $DEXLA" },
  { label: "Performance", value: "+30%" },
  { label: "Creator Fees Earned", value: "$100K" },
] as const;

export function CreatorSimulatedDashboard() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Creator{" "}
            <span className="gradient-text">Product Preview</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className={`mx-auto max-w-5xl ${crSurface}`}>
            <div className="border-b border-electric/35 bg-electric/[0.1] px-5 py-3.5 text-center sm:px-7">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-electric sm:text-[0.85rem]">
                Simulated Creator Profile — Demo Data
              </p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-muted sm:text-[0.95rem]">
                MVP in development — this is a simulated creator experience
                using demo data.
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
              <div className="border-b border-white/[0.07] p-6 sm:p-7 lg:border-b-0 lg:border-r">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Creator Profile
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-success/40 bg-success/10 px-3 py-1 text-[0.75rem] font-semibold text-success">
                    X Verified
                  </span>
                  <span className="rounded-full border border-line bg-void/55 px-3 py-1 text-[0.75rem] font-semibold text-muted">
                    2 active portfolios
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {portfolios.map((name) => (
                    <li
                      key={name}
                      className="rounded-xl border border-line bg-deep/55 px-4 py-3.5"
                    >
                      <p className="text-[0.95rem] font-semibold text-ink">
                        {name}
                      </p>
                      <p className="mt-1 text-[0.8rem] text-muted-dim">
                        Illustrative demo portfolio
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Demo Metrics
                </p>
                <p className="mt-1 text-[0.78rem] text-muted-dim">
                  Illustrative demo figures only
                </p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {metrics.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-line bg-void/45 px-4 py-3.5"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        {item.label}
                      </p>
                      <p className="display mt-1.5 text-[1.35rem] tracking-[-0.02em] text-ink sm:text-[1.45rem]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Creator loop
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {loop.map((step, i, steps) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-electric/25 bg-electric/[0.08] px-3 py-2 text-[0.78rem] font-semibold text-ink sm:text-[0.85rem]">
                      {step}
                    </span>
                    {i < steps.length - 1 ? (
                      <span className="text-electric/50" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <p className={`${crBodyStrong} text-balance`}>
            Your track record is public and transparent. Followers see your full
            history before allocating. No hidden performance.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
