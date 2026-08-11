"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
} from "@/components/tokenomics/tokenomicsRhythm";

const points = [
  "Creators use it to publish.",
  "Creators use it to grow distribution.",
  "Investors use it to reduce execution costs.",
  "Investors use it to support creators.",
  "Platform activity creates buyback and burn demand.",
] as const;

export function WhyDexlaExistsSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Why $DEXLA{" "}
            <span className="gradient-text">Exists</span>
          </h2>
          <p className={`mt-5 ${tkBody} text-balance`}>
            The token isn&apos;t bolted onto INDEXLA after the fact.
          </p>
          <p className={`mt-2 ${tkBodyStrong} text-balance`}>
            Its utility is embedded directly into the platform.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-9 max-w-xl">
          <ul className="space-y-0 border-y border-white/[0.08]">
            {points.map((line) => (
              <li
                key={line}
                className="border-b border-white/[0.06] px-2 py-3.5 text-center last:border-b-0"
              >
                <p className="text-[1.02rem] font-medium text-ink text-balance">
                  {line}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <p className="display text-[1.25rem] tracking-[-0.02em] text-ink">
            That is the INDEXLA token economy.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
