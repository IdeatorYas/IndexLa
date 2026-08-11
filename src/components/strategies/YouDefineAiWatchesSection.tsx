"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  stBody,
  stBodyStrong,
  stH2,
  stSection,
  stSurface,
  stSurfaceSoft,
} from "@/components/strategies/strategyRhythm";

const pipeline = [
  "Market Signal",
  "Strategy Rules",
  "Risk Checks",
  "Execution",
  "On-Chain Transaction",
] as const;

export function YouDefineAiWatchesSection() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-25" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${stH2} uppercase`}>
            You Define. AI Watches.{" "}
            <span className="gradient-text">INDEXLA Executes.</span>
          </h2>
          <p className={`mt-5 ${stBody}`}>
            AI monitors the market conditions your strategy depends on.
          </p>
          <p className={`mt-3 ${stBody}`}>The execution process is rule-driven:</p>
        </FadeIn>

        <FadeIn className="mt-8">
          <ol className="mx-auto flex max-w-5xl flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
            {pipeline.map((step, i) => (
              <li
                key={step}
                className="flex flex-1 flex-col items-center md:flex-row"
              >
                <div className="flex w-full flex-1 items-center justify-center rounded-2xl border border-electric/25 bg-electric/[0.07] px-3 py-4 text-center md:min-h-[5rem]">
                  <span className="display text-[0.92rem] tracking-[-0.02em] text-ink sm:text-[1rem]">
                    {step}
                  </span>
                </div>
                {i < pipeline.length - 1 && (
                  <span
                    className="my-1 text-electric/45 md:mx-1.5 md:my-0"
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

        <div className="mx-auto mt-9 grid max-w-4xl gap-3 lg:grid-cols-2">
          <FadeIn>
            <div className={`h-full ${stSurfaceSoft} p-5 sm:p-6`}>
              <p className={stBody}>
                AI coordinates monitoring and execution.
              </p>
              <p className={`mt-3 ${stBody}`}>
                It does not take custody of your assets or decide what you should
                invest in.
              </p>
              <div className="mt-5 space-y-2">
                <p className={stBodyStrong}>You define the strategy.</p>
                <p className={stBodyStrong}>Your wallet holds the assets.</p>
                <p className={stBodyStrong}>
                  Your rules determine the response.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className={`h-full ${stSurface} p-5 sm:p-6`}>
              <p className={stBody}>
                Supported strategies can run across supported networks and
                assets.
              </p>
              <p className={`mt-5 ${stBody}`}>
                Markets don&apos;t stop when you sleep.
              </p>
              <p className="mt-3 display text-[1.25rem] tracking-[-0.02em] text-ink">
                Your strategy doesn&apos;t have to either.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
