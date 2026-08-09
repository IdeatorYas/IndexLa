"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

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
    body: "Return the portfolio toward target allocations as markets move.",
  },
  {
    title: "MOMENTUM",
    body: "Adjust exposure as defined market trends change.",
  },
  {
    title: "RSI",
    body: "Accumulate during oversold conditions and reduce exposure during overbought conditions.",
  },
];

export function StrategyEngineSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-line bg-deep py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            The Strategy Becomes The System.
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>Markets move fast. Emotions move faster.</p>
            <p>
              INDEXLA turns your investment strategy into executable rules.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
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

          <FadeIn delay={0.1}>
            <div className="relative min-h-[20rem] overflow-hidden rounded-3xl glass p-7 sm:p-10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Strategy engine
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
      </div>
    </section>
  );
}
