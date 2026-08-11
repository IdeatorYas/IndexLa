"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

type TriggerAction = { trigger: string; action: string };

type Strategy = {
  title: string;
  body: string;
  flows: TriggerAction[];
  accent?: "fear" | "greed" | "neutral" | "combine";
};

const strategies: Strategy[] = [
  {
    title: "BUY FEAR — DCA IN",
    body: "Accumulate through DCA when market sentiment reaches predefined fear conditions.",
    flows: [{ trigger: "Fear < 20", action: "DCA IN" }],
    accent: "fear",
  },
  {
    title: "SELL GREED — DCA OUT",
    body: "Reduce exposure through DCA as sentiment reaches predefined greed conditions.",
    flows: [{ trigger: "Greed > 70", action: "DCA OUT" }],
    accent: "greed",
  },
  {
    title: "TAKE PROFIT",
    body: "Scale out when predefined price or profit targets are reached.",
    flows: [{ trigger: "Profit target", action: "Scale out" }],
  },
  {
    title: "STOP LOSS",
    body: "Reduce exposure when a predefined downside threshold is reached.",
    flows: [{ trigger: "Downside threshold", action: "Reduce" }],
  },
  {
    title: "REBALANCE",
    body: "Restore target allocations when portfolio weights move outside your defined range.",
    flows: [{ trigger: "Allocation drift", action: "Rebalance" }],
  },
  {
    title: "RSI",
    body: "React to predefined oversold or overbought conditions.",
    flows: [
      { trigger: "RSI Oversold", action: "DCA IN" },
      { trigger: "RSI Overbought", action: "DCA OUT" },
    ],
  },
  {
    title: "MOMENTUM",
    body: "Increase or reduce exposure according to predefined momentum conditions.",
    flows: [
      { trigger: "Momentum bullish", action: "Increase" },
      { trigger: "Momentum bearish", action: "Reduce" },
    ],
  },
  {
    title: "COMBINE CONDITIONS",
    body: "Build more sophisticated responses by combining conditions, thresholds, and actions.",
    flows: [
      { trigger: "Multiple conditions", action: "Custom response" },
    ],
    accent: "combine",
  },
];

const accentBorder: Record<NonNullable<Strategy["accent"]>, string> = {
  fear: "border-danger/30 hover:border-danger/50",
  greed: "border-purple/30 hover:border-purple/50",
  neutral: "border-line hover:border-electric/30",
  combine: "border-electric/35 hover:border-electric/55",
};

function FlowDiagram({ trigger, action }: TriggerAction) {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <span className="rounded-lg border border-line bg-void/60 px-3 py-1.5 text-[0.72rem] font-semibold text-muted">
        {trigger}
      </span>
      <span className="text-electric/70" aria-hidden>
        ↓
      </span>
      <span className="rounded-lg border border-electric/35 bg-electric/10 px-3 py-1.5 text-[0.72rem] font-semibold text-electric">
        {action}
      </span>
    </div>
  );
}

export function InvestorStrategiesSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-15" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className={invH2}>
            Strategies Built Around{" "}
            <span className="gradient-text">Your Thesis.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Choose proven rule based strategies or combine conditions to build
            your own.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {strategies.map((strategy, i) => (
            <FadeIn key={strategy.title} delay={(i % 4) * 0.04}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`flex h-full flex-col rounded-[1.25rem] border bg-void/40 p-5 transition-colors ${
                  strategy.accent
                    ? accentBorder[strategy.accent]
                    : "border-line hover:border-electric/30"
                }`}
              >
                <h3 className="display text-[1.05rem] tracking-[-0.02em] sm:text-[1.12rem]">
                  {strategy.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">
                  {strategy.body}
                </p>
                <div className="mt-4 border-t border-line pt-3">
                  {strategy.flows.map((flow) => (
                    <FlowDiagram
                      key={`${flow.trigger}-${flow.action}`}
                      {...flow}
                    />
                  ))}
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
