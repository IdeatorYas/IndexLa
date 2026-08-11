"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
} from "@/components/tokenomics/tokenomicsRhythm";

const stages = [
  {
    title: "Creators",
    utilities: ["Publish", "Feature"],
  },
  {
    title: "Investors",
    utilities: ["Save", "Tip"],
  },
  {
    title: "INDEXLA Activity",
    utilities: ["Execution", "Treasury"],
  },
  {
    title: "$DEXLA Demand",
    utilities: ["Buybacks", "Burns"],
    accent: true,
  },
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

        <FadeIn className="mt-10">
          <div className="overflow-hidden border border-white/[0.1] bg-void/40">
            <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {stages.map((stage, i) => (
                <div key={stage.title} className="relative p-5 text-center sm:p-6">
                  {i < stages.length - 1 && (
                    <span
                      className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-electric/50 sm:bottom-auto sm:left-auto sm:right-[-0.55rem] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0"
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                  <p
                    className={`display text-[1.05rem] tracking-[-0.02em] sm:text-[1.15rem] ${
                      "accent" in stage && stage.accent
                        ? "gradient-text"
                        : "text-ink"
                    }`}
                  >
                    {stage.title}
                  </p>
                  <div className="mt-4 space-y-1.5">
                    {stage.utilities.map((u) => (
                      <p
                        key={u}
                        className="text-[0.88rem] font-medium text-muted"
                      >
                        {u}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.08] px-5 py-3 text-center">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Creators → Investors → INDEXLA Activity → $DEXLA Demand
              </p>
            </div>
          </div>
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
