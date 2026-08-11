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

const strategies = [
  {
    title: "Buy Fear — DCA In",
    body: "Accumulate through DCA when market sentiment reaches predefined fear conditions.",
  },
  {
    title: "Sell Greed — DCA Out",
    body: "Reduce exposure through DCA as sentiment reaches predefined greed conditions.",
  },
  {
    title: "Take Profit",
    body: "Scale out when predefined price or profit targets are reached.",
  },
  {
    title: "Stop Loss",
    body: "Reduce exposure when a predefined downside threshold is reached.",
  },
  {
    title: "Rebalance",
    body: "Restore target allocations when portfolio weights move outside your defined range.",
  },
  {
    title: "Momentum",
    body: "Increase or reduce exposure according to predefined momentum conditions.",
  },
  {
    title: "Combine Conditions",
    body: "Build sophisticated strategies by combining conditions, thresholds, and actions.",
  },
];

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

        {/* Strategies as compact list + RSI highlight — not a card grid */}
        <FadeIn className="mt-10">
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-deep/55">
            <div className="border-b border-line px-5 py-4 sm:px-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                Strategy library
              </p>
            </div>
            <ul className="divide-y divide-line">
              {strategies.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(12rem,0.4fr)_1fr] sm:items-baseline sm:gap-6 sm:px-6"
                >
                  <p className="text-[0.98rem] font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="text-[0.95rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* RSI — dual mapping */}
            <div className="border-t border-electric/25 bg-electric/[0.06] px-5 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-4 lg:grid-cols-[0.4fr_1fr] lg:items-start lg:gap-6">
                <div>
                  <p className="text-[0.98rem] font-semibold text-ink">RSI</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                    React to predefined oversold or overbought conditions.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-success">
                      Weekly Oversold
                    </p>
                    <p className="mt-1.5 text-[0.95rem] font-semibold text-ink">
                      RSI Weekly Oversold → DCA In
                    </p>
                  </div>
                  <div className="rounded-xl border border-purple/30 bg-purple/10 px-4 py-3">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-purple-bright">
                      Weekly Overbought
                    </p>
                    <p className="mt-1.5 text-[0.95rem] font-semibold text-ink">
                      RSI Weekly Overbought → Take Profit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto max-w-2xl rounded-[1.35rem] border border-electric/30 bg-gradient-to-br from-electric/[0.1] via-void/40 to-purple/[0.08] px-6 py-8 text-center sm:px-8">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                AI monitors the market. Your rules control the strategy.
              </p>
            </div>
            <p className={`mt-5 ${invBody}`}>
              INDEXLA&apos;s AI-assisted automation monitors the conditions you
              define and coordinates authorized execution.
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
