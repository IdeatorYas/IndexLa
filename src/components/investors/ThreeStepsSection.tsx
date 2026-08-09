"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";

const steps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets, allocations, and portfolio strategy.",
    visual: (
      <div className="mt-5 flex flex-wrap gap-2">
        {(["btc", "eth", "nvidia", "gold"] as const).map((key) => (
          <span
            key={key}
            className="flex items-center gap-1.5 rounded-full border border-line bg-void/50 py-1 pl-1 pr-2.5"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-panel">
              <AssetLogo asset={key} size={14} />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase text-ink/90">
              {key === "nvidia" ? "NVDA" : key.toUpperCase()}
            </span>
          </span>
        ))}
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="flex h-full w-full">
            <div className="w-[40%] bg-purple" />
            <div className="w-[35%] bg-electric" />
            <div className="w-[25%] bg-blue" />
          </div>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set the rules that determine when INDEXLA should act.",
    visual: (
      <div className="mt-5 space-y-2">
        {["BUY FEAR", "SELL GREED", "REBALANCE"].map((rule) => (
          <div
            key={rule}
            className="flex items-center justify-between rounded-xl border border-line bg-void/45 px-3 py-2"
          >
            <span className="text-[0.72rem] font-semibold tracking-[-0.01em]">
              {rule}
            </span>
            <span className="h-2 w-2 rounded-full bg-electric" />
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your strategy and let INDEXLA monitor conditions and coordinate execution.",
    visual: (
      <div className="mt-5 rounded-xl border border-line bg-void/45 p-3">
        <div className="flex items-center justify-between text-[0.7rem]">
          <span className="text-muted">Status</span>
          <span className="font-semibold text-success">Live</span>
        </div>
        <div className="mt-3 space-y-2">
          {["Condition watch", "Trigger ready", "Execution path"].map(
            (label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="h-1 flex-1 rounded-full bg-white/10"
                  style={{
                    background:
                      i === 2
                        ? "linear-gradient(90deg,#7c3aed,#38bdf8)"
                        : undefined,
                  }}
                />
                <span className="w-24 text-right text-[0.65rem] text-muted-dim">
                  {label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
];

export function ThreeStepsSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            From Conviction To Execution{" "}
            <span className="gradient-text">In Three Steps.</span>
          </h2>
        </FadeIn>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.08}>
              <li className="relative flex h-full flex-col rounded-[1.5rem] glass p-6 sm:p-7">
                {i < steps.length - 1 && (
                  <div
                    className="pointer-events-none absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-electric/50 to-transparent md:block"
                    aria-hidden
                  />
                )}
                <span className="display text-[2rem] gradient-text">{step.n}</span>
                <h3 className="mt-3 display text-[1.45rem] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-4 flex-1 text-[1rem] leading-relaxed text-muted">
                  {step.body}
                </p>
                {step.visual}
              </li>
            </FadeIn>
          ))}
        </ol>

        <FadeIn className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-[clamp(1.2rem,2.4vw,1.6rem)] text-ink">
            Your strategy runs while you live your life.
          </p>
          <Button href="/creators" className="w-fit min-w-[12.5rem]">
            Create Your Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
