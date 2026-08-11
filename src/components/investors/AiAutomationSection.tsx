"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const groups = [
  {
    key: "accumulate",
    title: "Accumulate",
    items: ["Buy Fear — DCA In", "Buy RSI Weekly Oversold — DCA In"],
  },
  {
    key: "distribute",
    title: "Distribute & Lock Profits",
    items: ["Sell Greed — DCA Out", "Sell RSI Weekly Overbought — DCA Out"],
  },
  {
    key: "adapt",
    title: "Adapt",
    items: ["Momentum", "Rebalance"],
  },
] as const;

const combineExamples = [
  "Buy now → Sell on Greed",
  "Buy now → Sell when RSI Weekly is Overbought",
] as const;

export function AiAutomationSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            AI-Powered Automation Built Around{" "}
            <span className="gradient-text">Your Thesis.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Choose proven rule-based strategies or combine conditions to build
            your own.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {groups.map((group, i) => (
            <FadeIn key={group.key} delay={i * 0.04}>
              <article className="h-full rounded-[1.2rem] border border-line bg-deep/50 p-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 display text-[1.2rem] tracking-[-0.02em] text-ink uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.95rem] font-semibold leading-snug text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-4" delay={0.1}>
          <div className="rounded-[1.25rem] border border-electric/35 bg-gradient-to-r from-electric/[0.1] via-void/40 to-purple/[0.08] px-5 py-5 sm:px-7 sm:py-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
              Capability
            </p>
            <h3 className="mt-2 display text-[1.25rem] tracking-[-0.02em] text-ink uppercase sm:text-[1.35rem]">
              Combine Strategies
            </h3>
            <p className={`mt-3 max-w-2xl ${invBody}`}>
              Multiple strategies can be combined into one strategy — so you can
              define a complete response from entry through profit taking.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {combineExamples.map((example) => (
                <span
                  key={example}
                  className="rounded-lg border border-line bg-void/55 px-3.5 py-2 text-[0.9rem] font-semibold text-ink"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="mx-auto max-w-2xl rounded-[1.35rem] border border-electric/30 bg-gradient-to-br from-electric/[0.1] via-void/40 to-purple/[0.08] px-6 py-7 text-center sm:px-8">
            <div className="inline-flex justify-center">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  AI monitors the market. Your rules control the strategy.
                </p>
              </div>
            </div>
            <p className={`mt-5 ${invBody}`}>
              INDEXLA&apos;s AI-assisted automation continuously monitors the
              conditions defined in your strategy and coordinates authorized
              execution when those conditions are met.
            </p>
            <p className={`mt-3 ${invBodyStrong}`}>
              Your thesis becomes a programmable strategy.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
