"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const behaviors = [
  {
    title: "Accumulate through DCA",
    hint: "Build exposure through the cycle",
  },
  {
    title: "Rebalance as allocations drift",
    hint: "Keep the thesis intact",
  },
  {
    title: "Take profits as markets become overheated",
    hint: "Respond to conditions — not noise",
  },
];

export function CreatorLongTermSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Built For{" "}
            <span className="gradient-text">Long-Term Investors.</span>
          </h2>
          <p className={`mt-5 ${crBody}`}>
            INDEXLA isn&apos;t built around day trading or chasing every market
            move.
          </p>
          <p className={`mt-3 ${crBody}`}>
            Create strategies designed to respond to broader market conditions
            over time.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-3">
            {behaviors.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.2rem] border border-line bg-deep/50 px-5 py-6 text-center"
              >
                <p className="display text-[1.1rem] tracking-[-0.02em] text-ink">
                  {item.title}
                </p>
                <p className="mt-2 text-[0.9rem] text-muted">{item.hint}</p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-xl space-y-3 text-center">
          <p className={crBodyStrong}>
            The goal isn&apos;t to win every trade.
          </p>
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={crGreenText}>
                It&apos;s to build a strategy designed for the cycle.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
