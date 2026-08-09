"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { Button } from "@/components/ui/Button";
import type { AssetKey } from "@/lib/site";

const heroAssets: AssetKey[] = ["btc", "eth", "nvidia", "gold", "sol"];

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-16 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display text-[clamp(2.1rem,5vw,3.75rem)] uppercase tracking-[-0.03em] text-balance">
              You Know What You Should Do.{" "}
              <span className="gradient-text">You Just Don&apos;t Do It.</span>
            </h1>

            <div className="mt-7 space-y-2 text-[1.08rem] leading-relaxed text-muted sm:text-[1.15rem]">
              <p>Buy when fear is high.</p>
              <p>Take profits when markets get euphoric.</p>
              <p>Rebalance when your portfolio drifts.</p>
            </div>

            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
              Then the market moves. You hesitate, FOMO, panic, or simply miss
              the moment.
            </p>

            <div className="mt-8 space-y-3">
              <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] text-ink">
                Stop letting emotions manage your portfolio.
              </p>
              <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] gradient-text">
                Define your strategy. Let INDEXLA execute it.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/creators" className="min-w-[13.5rem]">
                Build Your First Portfolio
              </Button>
              <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
                Explore Marketplace
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-[1.75rem] glass p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                    Portfolio · Rules engine
                  </p>
                  <p className="display mt-2 text-[1.35rem]">Your strategy</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[0.7rem] font-semibold text-success">
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Monitoring
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {heroAssets.map((key) => (
                  <div
                    key={key}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-void/60"
                  >
                    <AssetLogo asset={key} size={20} />
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                {[
                  { rule: "BUY FEAR — DCA IN", state: "Armed" },
                  { rule: "STOP LOSS", state: "Armed" },
                  { rule: "REBALANCE", state: "Watching" },
                ].map((row) => (
                  <div
                    key={row.rule}
                    className="flex items-center justify-between rounded-2xl border border-line bg-void/45 px-4 py-3"
                  >
                    <span className="text-sm font-semibold tracking-[-0.01em]">
                      {row.rule}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-electric">
                      {row.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
