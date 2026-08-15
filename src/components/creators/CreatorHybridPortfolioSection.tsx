"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";
import {
  crBody,
  crBodyStrong,
  crEyebrow,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

const allocation: {
  key: AssetKey;
  label: string;
  pct: number;
  color: string;
}[] = [
  { key: "btc", label: "BTC", pct: 30, color: "#F7931A" },
  { key: "eth", label: "ETH", pct: 20, color: "#627EEA" },
  { key: "sp500", label: "S&P 500", pct: 15, color: "#3B82F6" },
  { key: "gold", label: "Gold", pct: 15, color: "#D4AF37" },
  { key: "sol", label: "Solana", pct: 10, color: "#9945FF" },
  { key: "nvidia", label: "NVIDIA", pct: 10, color: "#76B900" },
];

const strategies = [
  {
    name: "Buy Fear",
    detail: "Increase allocations when markets enter fear",
    action: "DCA IN",
    tone: "buy" as const,
  },
  {
    name: "Sell Greed",
    detail: "Reduce allocations when markets enter extreme greed",
    action: "DCA OUT",
    tone: "sell" as const,
  },
];

export function CreatorHybridPortfolioSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            See What A Creator Can{" "}
            <span className="gradient-text">Build</span>
          </h2>
          <p className={`mt-3 ${crEyebrow}`}>Creator Product Preview</p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className={crSurface}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-void/40 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <p className="text-[0.78rem] font-semibold text-ink">
                  INDEXLA Portfolio
                </p>
                <span className="hidden text-muted-dim sm:inline">·</span>
                <p className="hidden text-[0.78rem] text-muted sm:block">
                  Live preview
                </p>
              </div>
              <p className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                Example
              </p>
            </div>

            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                Hybrid Wealth Portfolio
              </p>
              <p className="mt-2 display text-[1.35rem] tracking-[-0.02em] text-ink sm:text-[1.55rem]">
                Multi-asset · Cross-chain
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Allocation
                </p>
                <div className="mt-4 space-y-2">
                  {allocation.map((row, i) => (
                    <motion.div
                      key={row.key}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-void/45 px-3 py-2.5"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel">
                        <AssetLogo asset={row.key} size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.92rem] font-semibold text-ink">
                            {row.label}
                          </p>
                          <p className="display text-[1.05rem] text-electric">
                            {row.pct}%
                          </p>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${row.color}, ${row.color}cc)`,
                            }}
                            initial={reduce ? false : { width: 0 }}
                            whileInView={{ width: `${row.pct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.65,
                              delay: 0.05 + i * 0.03,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Strategy Selected
                </p>
                <div className="mt-4 space-y-3">
                  {strategies.map((rule) => (
                    <div
                      key={rule.name}
                      className="rounded-xl border border-white/[0.07] bg-void/40 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="display text-[1.05rem] tracking-[-0.02em] text-ink">
                          {rule.name}
                        </p>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${
                            rule.tone === "buy"
                              ? "border-success/40 bg-success/15 text-success"
                              : "border-electric/40 bg-electric/15 text-electric"
                          }`}
                        >
                          {rule.action}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted text-pretty">
                        {rule.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-success/30 bg-success/[0.08] px-4 py-3.5 text-center">
                  <p className={`${crBodyStrong} text-balance`}>
                    A creator&apos;s conviction becomes a structured investment
                    product.
                  </p>
                  <p className={`mt-2 ${crBody} text-balance`}>
                    Your audience follows the thesis. You build the product
                    around it.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] px-5 py-3.5 text-center sm:px-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Illustrative example only
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
