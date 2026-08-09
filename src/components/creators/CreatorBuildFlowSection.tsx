"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";

const steps = [
  {
    n: "01",
    title: "SELECT ASSETS",
    body: "Choose what you want to build around.",
    detail: "Crypto · Tokenized Stocks · Commodities · RWAs · or Hybrid",
  },
  {
    n: "02",
    title: "ALLOCATE",
    body: "Choose the assets and decide how capital is allocated across your portfolio.",
    detail: null,
  },
  {
    n: "03",
    title: "SELECT STRATEGY",
    body: "Choose how your portfolio should respond to the market.",
    detail: "Fear & Greed · RSI · Momentum · Take Profit · Stop Loss · Rebalancing",
  },
  {
    n: "04",
    title: "PUBLISH",
    body: "Fund your portfolio with the minimum $100 Creator Deposit.",
    detail: "Your deposit is capital in your portfolio, not a platform fee.",
    note: "Your deposit remains your capital",
  },
];

export function CreatorBuildFlowSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="build-flow"
      className="relative scroll-mt-24 border-t border-line bg-deep py-14 md:py-20"
    >
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] uppercase tracking-[-0.02em] text-balance">
            Turn Your Thesis Into A Portfolio{" "}
            <span className="gradient-text">Investors Can Back</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            INDEXLA gives you the infrastructure to turn your market thesis into
            a live portfolio.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    active === i
                      ? "border-electric/40 bg-white/[0.06] shadow-[0_0_28px_rgba(56,189,248,0.1)]"
                      : "border-line bg-transparent hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="text-[0.68rem] font-semibold text-electric">
                    {step.n}
                  </span>
                  <span className="mt-1 block display text-[1.15rem]">
                    {step.title}
                  </span>
                </button>
              ))}
              <div className="mt-2 rounded-2xl border border-line bg-void/40 px-4 py-4">
                <span className="text-[0.68rem] font-semibold text-muted-dim">
                  05
                </span>
                <p className="mt-1 display text-[1.1rem]">BURN $DEXLA</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Once the $DEXLA publishing model is live, burn{" "}
                  <span className="font-semibold text-ink">1,000 $DEXLA</span> to
                  publish additional portfolios on the marketplace.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] glass p-6 sm:p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Product flow · step {steps[active].n}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[active].n}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="mt-5"
                >
                  <h3 className="display text-[1.8rem]">{steps[active].title}</h3>
                  <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-muted">
                    {steps[active].body}
                  </p>
                  {steps[active].detail && (
                    <p className="mt-4 text-sm font-semibold text-ink/90">
                      {steps[active].detail}
                    </p>
                  )}
                  {steps[active].note && (
                    <p className="mt-3 text-sm font-semibold text-electric">
                      {steps[active].note}
                    </p>
                  )}

                  {active === 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(
                        [
                          "Crypto",
                          "Tokenized Stocks",
                          "Commodities",
                          "RWAs",
                          "Hybrid",
                        ] as const
                      ).map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-line bg-void/50 px-3 py-1.5 text-xs font-semibold text-muted"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {active === 1 && (
                    <div className="mt-6 space-y-3">
                      {(
                        [
                          { key: "btc" as const, pct: 35 },
                          { key: "nvidia" as const, pct: 30 },
                          { key: "gold" as const, pct: 20 },
                          { key: "eth" as const, pct: 15 },
                        ] as const
                      ).map((row) => (
                        <div key={row.key} className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-void/50">
                            <AssetLogo asset={row.key} size={16} />
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                              style={{ width: `${row.pct}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-xs text-muted">
                            {row.pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {active === 2 && (
                    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {[
                        "Fear & Greed",
                        "RSI",
                        "Momentum",
                        "Take Profit",
                        "Stop Loss",
                        "Rebalancing",
                      ].map((rule) => (
                        <span
                          key={rule}
                          className="rounded-xl border border-line bg-void/45 px-3 py-3 text-center text-xs font-semibold text-ink"
                        >
                          {rule}
                        </span>
                      ))}
                    </div>
                  )}

                  {active === 3 && (
                    <div className="mt-6 rounded-2xl border border-line bg-void/45 p-5">
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-dim">
                        Creator deposit
                      </p>
                      <p className="display mt-2 text-[2rem] gradient-text">
                        $100
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        Minimum capital in your portfolio — not a platform fee.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10 space-y-5">
          <p className="display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
            Start with one. Build your track record.
          </p>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            At launch, early-access creators can publish their first portfolio
            for free. Focus on one flagship strategy, grow its AUM, and build a
            track record investors can follow.
          </p>
          <Button href="#build-flow" className="min-w-[13.5rem]">
            Create Your first Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
