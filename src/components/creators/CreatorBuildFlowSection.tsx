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
    detail: "Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid",
  },
  {
    n: "02",
    title: "ALLOCATE",
    body: "Choose the assets and set the allocation.",
    detail: null,
  },
  {
    n: "03",
    title: "SELECT STRATEGY",
    body: "Define how the portfolio responds when the market moves.",
    detail: "Fear & Greed · RSI · Momentum · Take Profit · Stop Loss · Rebalancing",
  },
  {
    n: "04",
    title: "FUND",
    body: "Start with a minimum $100 Creator Deposit.",
    detail: "Your deposit is capital in your portfolio, not a platform fee.",
  },
  {
    n: "05",
    title: "PUBLISH",
    body: "Make your portfolio public so investors can discover and allocate to it.",
    detail: null,
  },
];

export function CreatorBuildFlowSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="build-flow"
      className="relative scroll-mt-24 border-t border-line bg-deep py-14 md:py-18"
    >
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.15rem)] uppercase tracking-[-0.02em] text-balance">
            Make Your Conviction{" "}
            <span className="gradient-text">Investable.</span>
          </h2>
          <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-muted">
            <p>No trading infrastructure to build. No execution stack to maintain.</p>
            <p>You decide what to own and how the portfolio should behave.</p>
          </div>
        </FadeIn>

        <FadeIn className="mt-6">
          <div className="rounded-[1.25rem] border border-electric/35 bg-gradient-to-r from-electric/12 via-purple/10 to-transparent px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Early Creator Access
            </p>
            <p className="mt-2 display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
              Your first portfolio is free to publish at launch.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Start with one flagship strategy. Build the track record before
              the marketplace gets crowded.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-2xl border px-4 py-3.5 text-left transition-all ${
                    active === i
                      ? "border-electric/40 bg-white/[0.06]"
                      : "border-line hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="text-[0.65rem] font-semibold text-electric">
                    {step.n}
                  </span>
                  <span className="mt-0.5 block display text-[1.1rem]">
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="min-h-[20rem] rounded-[1.35rem] glass p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[active].n}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    Step {steps[active].n}
                  </p>
                  <h3 className="display mt-2 text-[1.7rem]">
                    {steps[active].title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                    {steps[active].body}
                  </p>
                  {steps[active].detail && (
                    <p className="mt-3 text-sm font-semibold text-ink/90">
                      {steps[active].detail}
                    </p>
                  )}

                  {active === 0 && (
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {(
                        [
                          {
                            name: "Crypto",
                            assets: ["btc", "eth", "sol"] as const,
                          },
                          {
                            name: "Tokenized Stocks",
                            assets: ["nvidia", "apple", "google"] as const,
                          },
                          {
                            name: "Commodities",
                            assets: ["gold", "silver"] as const,
                          },
                          {
                            name: "RWAs",
                            assets: ["ondo", "sp500"] as const,
                          },
                          {
                            name: "Hybrid",
                            assets: ["btc", "nvidia", "gold"] as const,
                          },
                        ] as const
                      ).map((category) => (
                        <button
                          key={category.name}
                          type="button"
                          className="rounded-2xl border border-line bg-void/45 p-3.5 text-left transition-colors hover:border-electric/35 hover:bg-white/[0.04] sm:last:col-span-2"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {category.assets.map((key) => (
                                <span
                                  key={key}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel"
                                >
                                  <AssetLogo asset={key} size={15} />
                                </span>
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-ink">
                              {category.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {active === 1 && (
                    <div className="mt-5 space-y-2.5">
                      {(
                        [
                          { key: "btc" as const, pct: 35 },
                          { key: "nvidia" as const, pct: 30 },
                          { key: "gold" as const, pct: 20 },
                          { key: "eth" as const, pct: 15 },
                        ] as const
                      ).map((row) => (
                        <div key={row.key} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-void/50">
                            <AssetLogo asset={row.key} size={14} />
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                              style={{ width: `${row.pct}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs tabular-nums text-muted">
                            {row.pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {active === 2 && (
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                          className="rounded-xl border border-line bg-void/45 px-3 py-2.5 text-center text-xs font-semibold text-ink"
                        >
                          {rule}
                        </span>
                      ))}
                    </div>
                  )}

                  {active === 3 && (
                    <div className="mt-5 rounded-2xl border border-line bg-void/45 p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted-dim">
                        Creator deposit
                      </p>
                      <p className="display mt-2 text-[2.2rem] gradient-text">$100</p>
                      <p className="mt-2 text-sm text-muted">
                        Capital in your portfolio — not a platform fee.
                      </p>
                    </div>
                  )}

                  {active === 4 && (
                    <div className="mt-5 space-y-3">
                      <div className="rounded-2xl border border-line bg-void/45 p-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                          Public
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          Burn{" "}
                          <span className="font-semibold text-ink">1,000 $DEXLA</span>{" "}
                          to publish additional portfolios once the $DEXLA
                          publishing model is live.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-line bg-void/45 p-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                          Private
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          Keep your portfolio private with no $DEXLA burn
                          required.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-8">
          <Button href="#build-flow" className="min-w-[13rem]">
            Register For Early Access
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
