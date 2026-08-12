"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { FearGreedIndexVisual } from "@/components/strategies/FearGreedIndexVisual";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import type { AssetKey } from "@/lib/site";
import {
  crBody,
  crBodyStrong,
  crCta,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

const allocation: {
  key: AssetKey;
  label: string;
  pct: number;
  class: string;
  color: string;
}[] = [
  { key: "btc", label: "BTC", pct: 30, class: "Crypto", color: "#F7931A" },
  { key: "eth", label: "ETH", pct: 20, class: "Crypto", color: "#627EEA" },
  {
    key: "sp500",
    label: "S&P 500",
    pct: 15,
    class: "Tokenized Stocks",
    color: "#3B82F6",
  },
  {
    key: "gold",
    label: "Gold",
    pct: 15,
    class: "Commodities",
    color: "#D4AF37",
  },
  { key: "sol", label: "Solana", pct: 10, class: "Crypto", color: "#9945FF" },
  {
    key: "nvidia",
    label: "NVIDIA",
    pct: 10,
    class: "Tokenized Stocks",
    color: "#76B900",
  },
];

const networks = [
  { name: "Ethereum", src: "/images/networks/ethereum.svg" },
  { name: "Solana", src: "/images/networks/solana.svg" },
  { name: "Base", src: "/images/networks/base.svg" },
  { name: "Arbitrum", src: "/images/networks/arbitrum.svg" },
  { name: "BNB Chain", src: "/images/networks/bnb.svg" },
  { name: "Sui", src: "/images/networks/sui.svg" },
  { name: "Robinhood Chain", src: "/images/networks/robinhood.svg" },
];

const conic = (() => {
  let start = 0;
  return allocation
    .map((row) => {
      const end = start + row.pct * 3.6;
      const segment = `${row.color} ${start}deg ${end}deg`;
      start = end;
      return segment;
    })
    .join(", ");
})();

export function CreatorHybridPortfolioSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            See What A Creator Can{" "}
            <span className="gradient-text">Build.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className={crSurface}>
            {/* Product chrome header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-void/35 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-success" />
                <p className="text-[0.78rem] font-semibold text-ink">
                  Creator portfolio
                </p>
                <span className="text-muted-dim">·</span>
                <p className="text-[0.78rem] text-muted">Hybrid Wealth Strategy</p>
              </div>
              <p className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                Portfolio + Strategy
              </p>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Example
                </p>
                <p className="mt-1 display text-[1.35rem] tracking-[-0.02em] text-ink sm:text-[1.55rem]">
                  Hybrid Wealth Strategy
                </p>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted text-pretty text-balance">
                  A long-term portfolio built around a creator&apos;s conviction
                  across markets.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allocation.map((row) => (
                  <span
                    key={row.key}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel"
                    title={row.label}
                  >
                    <AssetLogo asset={row.key} size={18} />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-0 xl:grid-cols-2">
              {/* Portfolio allocation */}
              <div className="border-b border-white/[0.07] xl:border-b-0 xl:border-r">
                <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    01 — Portfolio
                  </p>
                </div>
                <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="flex flex-col items-center justify-center gap-5 border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                    <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `conic-gradient(${conic})` }}
                        aria-hidden
                      />
                      <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full border border-line bg-void text-center">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                          Hybrid
                        </p>
                        <p className="mt-1 display text-[1.05rem] text-ink">
                          6 assets
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {["Crypto", "Stocks", "Commodities"].map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-line bg-void/50 px-3 py-1 text-[0.75rem] font-semibold text-ink"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 p-4 sm:p-5">
                    {allocation.map((row, i) => (
                      <motion.div
                        key={row.key}
                        className="rounded-xl border border-white/[0.06] bg-void/40 px-3 py-2.5"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel">
                              <AssetLogo asset={row.key} size={14} />
                            </span>
                            <div>
                              <p className="text-[0.88rem] font-semibold text-ink">
                                {row.label}
                              </p>
                              <p className="text-[0.68rem] text-muted-dim">
                                {row.class}
                              </p>
                            </div>
                          </div>
                          <p className="display text-[1.05rem] text-electric">
                            {row.pct}%
                          </p>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${row.color}, ${row.color}cc)`,
                            }}
                            initial={reduce ? false : { width: 0 }}
                            whileInView={{ width: `${row.pct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.7,
                              delay: 0.06 + i * 0.03,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategy panel */}
              <div>
                <div className="border-b border-white/[0.07] px-5 py-3 sm:px-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    02 — Investment strategy
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="display text-[clamp(1.35rem,3vw,1.75rem)] tracking-[-0.02em] text-ink uppercase">
                    Buy Fear{" "}
                    <span className="text-electric">→</span>{" "}
                    <span className="gradient-text">Sell Greed</span>
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted text-pretty">
                    A long-term cycle strategy that accumulates during predefined
                    fear conditions and takes profits as greed increases.
                  </p>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <TriggerAction
                      trigger="Fear conditions"
                      action="Accumulate"
                      tone="buy"
                      className="!rounded-xl !px-3.5 !py-2.5"
                    />
                    <TriggerAction
                      trigger="Greed increases"
                      action="Take profits"
                      tone="sell"
                      className="!rounded-xl !px-3.5 !py-2.5"
                    />
                  </div>

                  <div className="mt-5">
                    <FearGreedIndexVisual />
                  </div>

                  <div className="mt-4 rounded-xl border border-line bg-void/50 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                          Condition
                        </p>
                        <p className="mt-1 text-[0.9rem] font-semibold text-ink">
                          Fear &amp; Greed &lt; 20
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                          Rule
                        </p>
                        <p className="mt-1 display text-[1.05rem] text-ink">
                          DCA IN
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] px-5 py-5 sm:px-6">
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Across networks
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {networks.map((n, i) => (
                  <motion.span
                    key={n.name}
                    className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-void/45 py-1.5 pl-1.5 pr-3"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel/90">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={n.src}
                        alt={n.name}
                        width={15}
                        height={15}
                        className="object-contain"
                        draggable={false}
                      />
                    </span>
                    <span className="text-[0.78rem] font-semibold text-ink">
                      {n.name}
                    </span>
                  </motion.span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-success/30 bg-success/10 px-4 py-3.5 text-center">
                <p className={`${crBodyStrong} text-balance`}>
                  One portfolio. Multiple assets. Multiple networks.
                </p>
                <p className={`mt-2 ${crBody} text-balance`}>
                  Your thesis becomes something your audience can actually
                  allocate to.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-9 text-center">
          <Button href="#early-access" className={crCta}>
            Reserve Early Access
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
