"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  stBody,
  stBodyStrong,
  stH2,
  stSection,
  stSurface,
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
        </FadeIn>

        <FadeIn className="mt-8">
          <ol className="mx-auto flex max-w-5xl flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
            {pipeline.map((step, i) => (
              <li
                key={step}
                className="flex flex-1 flex-col items-center md:flex-row"
              >
                <div className="flex w-full flex-1 items-center justify-center rounded-xl border border-electric/25 bg-electric/[0.07] px-3 py-4 text-center md:min-h-[4.75rem]">
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

        <FadeIn className="mx-auto mt-9 max-w-3xl">
          <div className={`${stSurface} px-5 py-6 text-center sm:px-8 sm:py-7`}>
            <div className="space-y-2">
              <p className={stBodyStrong}>You define the strategy.</p>
              <p className={stBodyStrong}>Your wallet holds the assets.</p>
              <p className={stBodyStrong}>Your rules determine the response.</p>
            </div>
            <p className={`mx-auto mt-5 max-w-xl ${stBody} text-balance`}>
              AI coordinates monitoring and execution. It does not take custody
              of your assets or decide what you should invest in.
            </p>
            <p className={`mt-4 ${stBody}`}>
              Markets don&apos;t stop when you sleep. Your strategy doesn&apos;t
              have to either.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
