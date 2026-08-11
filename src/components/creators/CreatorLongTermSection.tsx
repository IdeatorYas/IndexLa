"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const levers = [
  "Market cycles",
  "Accumulation",
  "Profit taking",
  "Rebalancing",
  "Momentum",
  "Predefined conditions",
] as const;

export function CreatorLongTermSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-[42rem] text-center">
          <h2 className={`${crH2} uppercase`}>
            Built For{" "}
            <span className="gradient-text">Long-Term Conviction.</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-[36rem] ${crBody} text-balance`}>
            INDEXLA is built around investment strategies designed for long-term
            portfolio management,
            <br className="hidden sm:block" />
            not day-trading noise.
          </p>
          <p className={`mx-auto mt-3 max-w-[36rem] ${crBody} text-balance`}>
            Build around market cycles, accumulation, profit taking,
            rebalancing, momentum,
            <br className="hidden md:block" />
            and other predefined conditions.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {levers.map((label) => (
              <span
                key={label}
                className="rounded-full border border-line bg-void/50 px-3.5 py-2 text-[0.88rem] font-semibold text-ink"
              >
                {label}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={crGreenText}>
                Turn conviction into a disciplined, programmable portfolio.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
