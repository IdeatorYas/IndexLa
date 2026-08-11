"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

type StrategyItem = { title: string; body: string };

const archetypes: {
  key: string;
  title: string;
  items: StrategyItem[];
}[] = [
  {
    key: "accumulate",
    title: "Accumulate",
    items: [
      {
        title: "Buy Fear — DCA In",
        body: "Accumulate through DCA when market sentiment reaches predefined fear conditions.",
      },
      {
        title: "RSI Weekly Oversold — DCA In",
        body: "React to predefined oversold or overbought conditions.",
      },
    ],
  },
  {
    key: "protect",
    title: "Protect & Take Profit",
    items: [
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
    ],
  },
  {
    key: "adapt",
    title: "Adapt",
    items: [
      {
        title: "Rebalance",
        body: "Restore target allocations when portfolio weights move outside your defined range.",
      },
      {
        title: "Momentum",
        body: "Increase or reduce exposure according to predefined momentum conditions.",
      },
    ],
  },
];

export function InvestorStrategiesSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2}`}>
            Choose proven rule-based strategies or combine conditions to build{" "}
            <span className="gradient-text">your own.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-start">
          {archetypes.map((group, i) => (
            <FadeIn key={group.key} delay={i * 0.05}>
              <article className="rounded-[1.25rem] border border-line bg-void/45 p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 display text-[1.3rem] tracking-[-0.025em] text-ink uppercase">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-4 border-t border-line pt-5">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <p className="text-[0.95rem] font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-5" delay={0.1}>
          <div className="rounded-[1.25rem] border border-electric/35 bg-gradient-to-r from-electric/[0.1] via-void/40 to-purple/[0.08] px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  Advanced
                </p>
                <h3 className="mt-1.5 display text-[1.25rem] tracking-[-0.025em] text-ink uppercase sm:text-[1.35rem]">
                  Combine Conditions
                </h3>
              </div>
              <p className={`max-w-xl ${invBody}`}>
                Build sophisticated strategies by combining conditions,
                thresholds, and actions.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
