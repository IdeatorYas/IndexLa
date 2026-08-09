"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

type TriggerAction = { trigger: string; action: string };

type Strategy = {
  title: string;
  body: string[];
  flows: TriggerAction[];
};

const strategies: Strategy[] = [
  {
    title: "BUY FEAR — DCA IN",
    body: [
      "Accumulate through DCA when market sentiment reaches Extreme Fear.",
    ],
    flows: [{ trigger: "Extreme Fear", action: "DCA IN" }],
  },
  {
    title: "SELL GREED — DCA OUT",
    body: [
      "Reduce exposure through DCA as market sentiment moves into Greed and Extreme Greed.",
    ],
    flows: [
      { trigger: "Greed", action: "DCA OUT" },
      { trigger: "Extreme Greed", action: "DCA OUT" },
    ],
  },
  {
    title: "TAKE PROFIT",
    body: ["Scale out when predefined price or profit targets are reached."],
    flows: [{ trigger: "Profit target", action: "Scale out" }],
  },
  {
    title: "STOP LOSS",
    body: [
      "Reduce or exit a position automatically when a predefined price or percentage threshold is reached.",
    ],
    flows: [{ trigger: "Stop threshold", action: "Reduce / exit" }],
  },
  {
    title: "REBALANCE",
    body: [
      "Restore target allocations when portfolio positions drift beyond your defined range.",
    ],
    flows: [{ trigger: "Allocation drift", action: "Rebalance" }],
  },
  {
    title: "MOMENTUM",
    body: [
      "Follow changing market trends.",
      "When the Momentum Money Line flips bullish, increase exposure through DCA.",
      "When it flips bearish, reduce exposure through DCA.",
    ],
    flows: [
      { trigger: "Bullish Momentum", action: "DCA IN" },
      { trigger: "Bearish Momentum", action: "DCA OUT" },
    ],
  },
  {
    title: "RSI",
    body: [
      "React to longer-term market conditions using weekly RSI.",
      "When weekly RSI enters Oversold territory, accumulate through DCA.",
      "When weekly RSI enters Overbought territory, reduce exposure through DCA.",
    ],
    flows: [
      { trigger: "Weekly RSI Oversold", action: "DCA IN" },
      { trigger: "Weekly RSI Overbought", action: "DCA OUT" },
    ],
  },
];

function FlowChip({ trigger, action }: TriggerAction) {
  return (
    <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-line bg-void/55 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[-0.01em]">
      <span className="text-muted">{trigger}</span>
      <span className="text-electric/70" aria-hidden>
        →
      </span>
      <span className="text-electric">{action}</span>
    </div>
  );
}

export function InvestorStrategiesSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-20" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
            Strategies Built Around{" "}
            <span className="gradient-text">Your Thesis.</span>
          </h2>
          <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted">
            <p>
              Don&apos;t settle for a fixed portfolio. Define how you want it to
              respond.
            </p>
            <p>
              Choose from proven rule-based strategies or combine conditions to
              build your own.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {strategies.map((strategy, i) => (
            <FadeIn key={strategy.title} delay={(i % 3) * 0.04}>
              <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-void/40 p-5 transition-colors hover:border-electric/30">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="display text-[1.15rem] tracking-[-0.02em] sm:text-[1.25rem]">
                    {strategy.title}
                  </h3>
                  <span className="shrink-0 text-[0.65rem] font-semibold text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-muted">
                  {strategy.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                  {strategy.flows.map((flow) => (
                    <FlowChip key={`${flow.trigger}-${flow.action}`} {...flow} />
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 space-y-5">
          <p className="display max-w-3xl text-[clamp(1.1rem,2.2vw,1.4rem)] text-ink">
            Combine conditions. Define thresholds. Build the response that fits
            your thesis.
          </p>
          <Button href="/creators" className="min-w-[13.5rem]">
            Build Your First Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
