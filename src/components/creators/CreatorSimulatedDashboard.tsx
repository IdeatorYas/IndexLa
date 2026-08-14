"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { XLogo } from "@/components/creators/SocialBrandLogos";
import {
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const loop = [
  "X Verification",
  "Create Portfolio",
  "Community Participation",
  "AUM / Volume",
  "Tips",
  "Creator Fees",
] as const;

const portfolios = ["Hybrid Portfolio", "Hybrid Index"] as const;

const metrics = [
  { label: "AUM", value: "$10M", accent: true },
  { label: "Volume", value: "$20M", accent: false },
  { label: "Tips", value: "10,000 $DEXLA", accent: false },
  { label: "Performance", value: "+30%", accent: true },
  { label: "Creator Fees Earned", value: "$100K", accent: true },
] as const;

function XVerifiedCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" className={className} aria-hidden>
      <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
      <path
        fill="#fff"
        d="M9.66 14.74 6.4 11.48l1.13-1.13 2.13 2.12 4.8-4.8 1.13 1.13z"
      />
    </svg>
  );
}

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

        <FadeIn className="mt-10">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.06] via-deep/80 to-void shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="border-b border-electric/40 bg-electric/[0.14] px-5 py-4 text-center sm:px-8 sm:py-5">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-electric sm:text-[0.88rem]">
                Simulated Creator Profile: Demo Data
              </p>
              <p className="mx-auto mt-2.5 max-w-xl text-[0.9rem] font-medium leading-relaxed text-ink sm:text-[0.98rem]">
                MVP in development: this is a simulated creator experience
                using demo data.
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-0 border-b border-white/[0.07] lg:border-b-0 lg:border-r">
                <div className="border-b border-white/[0.07] p-6 sm:p-7">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-void/70 text-ink">
                      <XLogo className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                          INDEXLA Creator
                        </p>
                        <XVerifiedCheck className="h-[1.05rem] w-[1.05rem]" />
                      </div>
                      <p className="mt-0.5 text-[0.88rem] text-muted-dim">
                        @creator
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#1D9BF0]/35 bg-[#1D9BF0]/10 px-3 py-1.5">
                        <XVerifiedCheck className="h-3.5 w-3.5" />
                        <span className="text-[0.76rem] font-semibold tracking-[0.02em] text-ink">
                          Verified Creator
                        </span>
                      </div>
                      <p className="mt-2.5 text-[0.8rem] leading-snug text-muted">
                        Verified through X. Same verification system creators
                        already use.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    Portfolios
                  </p>
                  <p className="mt-1 text-[0.82rem] text-muted-dim">
                    2 active portfolios
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {portfolios.map((name) => (
                      <li
                        key={name}
                        className="rounded-xl border border-line bg-void/50 px-4 py-3.5"
                      >
                        <p className="text-[0.98rem] font-semibold text-ink">
                          {name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    Creator Metrics
                  </p>
                  <p className="text-[0.72rem] font-medium text-muted-dim">
                    Illustrative demo data only
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {metrics.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl border px-4 py-4 ${
                        item.accent
                          ? "border-electric/30 bg-electric/[0.07]"
                          : "border-line bg-void/45"
                      }`}
                    >
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        {item.label}
                      </p>
                      <p
                        className={`display mt-2 tracking-[-0.02em] ${
                          item.accent
                            ? "text-[1.5rem] gradient-text sm:text-[1.65rem]"
                            : "text-[1.4rem] text-ink sm:text-[1.5rem]"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] bg-void/40 px-5 py-5 sm:px-8 sm:py-6">
              <p className="text-center text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Creator loop
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
                {loop.map((step, i, steps) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="rounded-lg border border-electric/30 bg-electric/[0.1] px-3 py-2 text-[0.76rem] font-semibold text-ink sm:text-[0.84rem]">
                      {step}
                    </span>
                    {i < steps.length - 1 ? (
                      <span className="text-electric/45" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl text-center">
          <p className={`${crBodyStrong} text-balance`}>
            Your track record is public and transparent. Followers see your full
            history before allocating. No hidden performance.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
