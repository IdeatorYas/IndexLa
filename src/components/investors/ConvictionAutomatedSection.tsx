"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const flow = [
  {
    label: "BUILD",
    title: "BUILD YOUR STRATEGY",
    body: "Choose your assets, allocations, and portfolio.",
  },
  {
    label: "DEFINE",
    title: "DEFINE YOUR RULES",
    body: "Set when to buy, sell, take profit, rebalance, or adjust exposure.",
  },
  {
    label: "AUTOMATE",
    title: "AUTOMATE EXECUTION",
    body: "INDEXLA monitors conditions and coordinates execution according to your strategy.",
  },
];

const strategies = [
  {
    title: "BUY FEAR",
    body: "Accumulate when defined fear conditions are reached.",
  },
  {
    title: "SELL GREED",
    body: "Reduce exposure when defined greed conditions are reached.",
  },
  {
    title: "TAKE PROFIT",
    body: "Reduce positions when predefined targets are reached.",
  },
  {
    title: "REBALANCE",
    body: "Return toward target allocations when positions drift.",
  },
  {
    title: "MOMENTUM",
    body: "Adjust exposure as defined trends change.",
  },
  {
    title: "RSI",
    body: "React to defined oversold and overbought conditions.",
  },
];

export function ConvictionAutomatedSection() {
  return (
    <section className="relative border-t border-line bg-deep py-16 md:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.12),transparent_50%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] uppercase tracking-[-0.02em] text-balance">
            Your Conviction.{" "}
            <span className="gradient-text">Define The Response.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
            <p>
              You don&apos;t need to predict the market. You need to decide how
              your portfolio should respond when conditions change.
            </p>
            <p>
              INDEXLA monitors the conditions you define and coordinates
              execution when your strategy is triggered.
            </p>
          </div>
        </FadeIn>

        {/* One product story: define → watch → execute */}
        <FadeIn className="mt-10 md:mt-12">
          <div className="overflow-hidden rounded-[1.5rem] border border-line bg-void/40">
            <ol className="grid md:grid-cols-3">
              {flow.map((step, i) => (
                <li
                  key={step.title}
                  className={`relative p-5 sm:p-6 ${
                    i < flow.length - 1
                      ? "border-b border-line md:border-b-0 md:border-r"
                      : ""
                  }`}
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    {String(i + 1).padStart(2, "0")} · {step.label}
                  </span>
                  <h3 className="display mt-3 text-[1.15rem] tracking-[-0.02em] sm:text-[1.25rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        <FadeIn className="mt-10 md:mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {strategies.map((strategy, i) => (
              <article
                key={strategy.title}
                className="rounded-2xl border border-line bg-void/35 p-4 transition-colors hover:border-electric/30 hover:bg-white/[0.03] sm:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.65rem] font-semibold text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-[1.1rem] tracking-[-0.02em]">
                    {strategy.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                  {strategy.body}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 flex flex-col items-center gap-5 text-center sm:mt-12">
          <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] text-ink">
            Your strategy. Your rules. Automated execution.
          </p>
          <Button href="/creators" className="min-w-[12.5rem]">
            Create Your Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
