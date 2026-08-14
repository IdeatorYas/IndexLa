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
  "Creators monetize strategies through it.",
  "Investors use it to reduce execution costs.",
  "Investors use it to support creators.",
  "Platform activity creates buyback and burn demand.",
] as const;

export function TokenWhyDexlaSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className={`${tkH2} uppercase`}>
            Why <span className="gradient-text">$DEXLA</span> Exists
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl ${tkBody}`}>
            The token is embedded directly into INDEXLA&apos;s platform economy.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="mx-auto grid max-w-xl gap-2.5 sm:grid-cols-2">
            {points.map((line) => (
              <p
                key={line}
                className={`rounded-xl border border-white/[0.08] bg-void/40 px-4 py-3.5 ${tkBodyStrong}`}
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <p className="text-[1.08rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.15rem]">
            That is the INDEXLA token economy.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
