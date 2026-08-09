"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const strategies = [
  {
    title: "BUY FEAR",
    body: "Accumulate when defined fear conditions are reached.",
  },
  {
    title: "SELL GREED",
    body: "Reduce exposure when markets enter defined greed conditions.",
  },
  {
    title: "TAKE PROFIT",
    body: "Automatically reduce positions when predefined profit targets are reached.",
  },
  {
    title: "REBALANCE",
    body: "Bring your portfolio back toward target allocations when positions drift.",
  },
  {
    title: "MOMENTUM",
    body: "Increase or reduce exposure as defined market trends change.",
  },
  {
    title: "RSI",
    body: "Accumulate during oversold conditions and reduce exposure during overbought conditions.",
  },
];

export function InvestorStrategiesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-30" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Don&apos;t Predict The Market.{" "}
            <span className="gradient-text">Define Your Response.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>You don&apos;t need to know exactly what the market will do.</p>
            <p>You need to know what you&apos;ll do when it does.</p>
            <p>Use proven strategy templates or build your own custom rules.</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {strategies.map((strategy, i) => (
                <button
                  key={strategy.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    active === i
                      ? "border-electric/40 bg-white/[0.06] shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                      : "border-line bg-transparent hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block display text-[1.15rem]">
                    {strategy.title}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative min-h-[20rem] overflow-hidden rounded-[1.75rem] glass p-7 sm:p-10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Strategy template
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={strategies[active].title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <h3 className="display text-[2.1rem]">
                    {strategies[active].title}
                  </h3>
                  <p className="mt-4 max-w-md text-[1.1rem] leading-relaxed text-muted">
                    {strategies[active].body}
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {["Condition", "Signal", "Execution"].map((label, i) => (
                      <div
                        key={label}
                        className="rounded-xl border border-line bg-void/40 px-3 py-4"
                      >
                        <div
                          className="mb-3 h-1.5 rounded-full"
                          style={{
                            width: `${45 + i * 18}%`,
                            background:
                              i === 2
                                ? "linear-gradient(90deg,#7c3aed,#38bdf8)"
                                : "rgba(255,255,255,0.18)",
                          }}
                        />
                        <p className="text-xs text-muted">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10 space-y-4">
          <p className="display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
            Choose the rules that fit your conviction.
          </p>
          <p className="display text-[clamp(1.15rem,2.3vw,1.5rem)] gradient-text">
            INDEXLA handles the execution.
          </p>
          <div className="pt-2">
            <Button href="/creators" className="min-w-[12.5rem]">
              Create Your Portfolio
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
