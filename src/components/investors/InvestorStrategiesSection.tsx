"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

type StrategyItem = { title: string; body: string };

const archetypes: {
  key: string;
  title: string;
  blurb: string;
  items: StrategyItem[];
}[] = [
  {
    key: "accumulate",
    title: "Accumulate",
    blurb: "Build exposure when fear creates opportunity.",
    items: [
      {
        title: "Buy Fear — DCA In",
        body: "Accumulate through DCA when market sentiment reaches predefined fear conditions.",
      },
    ],
  },
  {
    key: "protect",
    title: "Protect & Take Profit",
    blurb: "Reduce risk and lock gains as conditions shift.",
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
    blurb: "Respond to drift, momentum, and combined conditions.",
    items: [
      {
        title: "Rebalance",
        body: "Restore target allocations when portfolio weights move outside your defined range.",
      },
      {
        title: "RSI",
        body: "React to predefined oversold or overbought conditions.",
      },
      {
        title: "Momentum",
        body: "Increase or reduce exposure according to predefined momentum conditions.",
      },
      {
        title: "Combine Conditions",
        body: "Build sophisticated strategies by combining conditions, thresholds, and actions.",
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {archetypes.map((group, i) => (
            <FadeIn key={group.key} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-void/45 p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 display text-[1.35rem] tracking-[-0.025em] text-ink">
                  {group.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {group.blurb}
                </p>
                <ul className="mt-5 flex-1 space-y-3 border-t border-line pt-5">
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
      </div>
    </section>
  );
}
