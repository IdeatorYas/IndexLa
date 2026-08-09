"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const pipeline = [
  "MARKET SIGNAL",
  "STRATEGY RULES",
  "RISK CHECKS",
  "EXECUTION",
  "ON-CHAIN TRANSACTION",
] as const;

const ownership = [
  "Non-custodial",
  "On-chain execution",
  "Supported networks",
  "User-owned assets",
] as const;

export function YouDefineAiWatchesSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-30" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
            You Define. AI Watches.{" "}
            <span className="gradient-text">INDEXLA Executes.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            AI monitors the market conditions your strategy depends on.
          </p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
            The execution process is rule-driven:
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <ol className="mx-auto flex max-w-4xl flex-col items-stretch gap-0 md:flex-row md:items-center md:justify-between">
            {pipeline.map((step, i) => (
              <li key={step} className="flex flex-1 flex-col items-center md:flex-row">
                <div className="w-full rounded-2xl border border-electric/30 bg-electric/8 px-3 py-4 text-center md:min-h-[5.5rem] md:flex md:items-center md:justify-center">
                  <span className="display text-[0.95rem] tracking-[-0.02em] text-ink sm:text-[1.05rem]">
                    {step}
                  </span>
                </div>
                {i < pipeline.length - 1 && (
                  <span
                    className="my-1 text-electric/50 md:mx-1 md:my-0"
                    aria-hidden
                  >
                    <span className="md:hidden">↓</span>
                    <span className="hidden md:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-[1.35rem] border border-line bg-deep/70 p-5 sm:p-6">
              <p className="text-[1.02rem] leading-relaxed text-muted">
                AI coordinates monitoring and execution.
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                It does not take custody of your assets or decide what you should
                invest in.
              </p>
              <div className="mt-5 space-y-2">
                <p className="display text-[1.15rem] text-ink">
                  You define the strategy.
                </p>
                <p className="display text-[1.15rem] text-ink">
                  Your wallet holds the assets.
                </p>
                <p className="display text-[1.15rem] text-ink">
                  Your rules determine the response.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="h-full rounded-[1.35rem] border border-electric/35 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Ownership model
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {ownership.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-line bg-void/50 px-3 py-3 text-center"
                  >
                    <p className="text-[0.78rem] font-semibold leading-snug text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
                Supported strategies can run across supported networks and
                assets.
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                Markets don&apos;t stop when you sleep.
              </p>
              <p className="mt-2 display text-[1.2rem] text-ink">
                Your strategy doesn&apos;t have to either.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
