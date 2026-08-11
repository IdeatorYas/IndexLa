"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  stBody,
  stBodyStrong,
  stGreenBox,
  stGreenText,
  stH2,
  stSection,
  stSurface,
  stSurfaceSoft,
} from "@/components/strategies/strategyRhythm";

const pillars = [
  {
    title: "Long-term investing",
    body: "These strategies are built for long-term investing, not day trading.",
  },
  {
    title: "Market psychology",
    body: "Markets have moved through fear, recovery, greed, and euphoria for generations.",
  },
  {
    title: "Programmable rules",
    body: "INDEXLA turns proven investment concepts into programmable rules aligned with a long-term thesis.",
  },
] as const;

const responses = [
  { label: "Accumulate", detail: "when opportunity appears" },
  { label: "Take profits", detail: "when conditions change" },
  { label: "Rebalance", detail: "when your portfolio drifts" },
] as const;

const cycles = ["Fear", "Recovery", "Greed", "Euphoria"] as const;

export function WhyTheseStrategiesSection() {
  return (
    <section className={`${stSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${stH2} uppercase`}>
            Why These{" "}
            <span className="gradient-text">Strategies?</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-3 md:items-stretch">
            {pillars.map((item) => (
              <article
                key={item.title}
                className={`flex h-full flex-col ${stSurfaceSoft} px-5 py-6 text-center`}
              >
                <h3 className="display text-[1.12rem] tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted text-pretty text-balance">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-5">
          <div className={`mx-auto max-w-5xl ${stSurface} px-5 py-6 sm:px-7`}>
            <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Market cycles
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {cycles.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/[0.08] bg-void/50 px-3.5 py-1.5 text-[0.88rem] font-semibold text-ink">
                    {label}
                  </span>
                  {i < cycles.length - 1 && (
                    <span className="text-electric/40" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className={`mx-auto mt-4 max-w-2xl text-center text-[0.98rem] leading-relaxed text-muted text-balance sm:text-[1.05rem]`}>
              The challenge isn&apos;t recognizing these cycles. It&apos;s
              responding consistently when they happen.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-5">
          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
            {responses.map((item) => (
              <div
                key={item.label}
                className={`${stSurfaceSoft} px-4 py-4 text-center`}
              >
                <p className="display text-[1.15rem] tracking-[-0.02em] text-electric">
                  {item.label}
                </p>
                <p className="mt-1 text-[0.9rem] text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 space-y-3.5 text-center">
          <p className={`${stBodyStrong} text-balance`}>
            The goal isn&apos;t to predict every move.
          </p>
          <div className="inline-flex justify-center">
            <div className={stGreenBox}>
              <p className={`${stGreenText} text-balance`}>
                It&apos;s to have a plan before the market moves.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
