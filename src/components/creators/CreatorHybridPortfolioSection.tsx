"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const allocation: {
  key: AssetKey;
  label: string;
  pct: number;
  class: string;
  color: string;
}[] = [
  {
    key: "btc",
    label: "BTC",
    pct: 30,
    class: "Crypto",
    color: "#F7931A",
  },
  {
    key: "eth",
    label: "ETH",
    pct: 20,
    class: "Crypto",
    color: "#627EEA",
  },
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
  {
    key: "sol",
    label: "Solana",
    pct: 10,
    class: "Crypto",
    color: "#9945FF",
  },
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
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-deep/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-5 sm:px-6">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Example
                </p>
                <p className="mt-1 display text-[1.35rem] tracking-[-0.02em] text-ink sm:text-[1.55rem]">
                  Hybrid Wealth Strategy
                </p>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted">
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

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col items-center justify-center gap-6 border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: `conic-gradient(${conic})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full border border-line bg-void text-center">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                      Hybrid
                    </p>
                    <p className="mt-1 display text-[1.15rem] text-ink">6 assets</p>
                    <p className="mt-0.5 text-[0.75rem] text-muted">Multi-network</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {["Crypto", "Tokenized Stocks", "Commodities"].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-line bg-void/50 px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 p-5 sm:p-6">
                {allocation.map((row, i) => (
                  <motion.div
                    key={row.key}
                    className="rounded-xl border border-line bg-void/45 p-3.5"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel">
                          <AssetLogo asset={row.key} size={18} />
                        </span>
                        <div>
                          <p className="text-[0.95rem] font-semibold text-ink">
                            {row.label}
                          </p>
                          <p className="text-[0.72rem] text-muted-dim">
                            {row.class}
                          </p>
                        </div>
                      </div>
                      <p className="display text-[1.2rem] text-electric">
                        {row.pct}%
                      </p>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${row.color}, ${row.color}cc)`,
                        }}
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.08 + i * 0.04 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-line px-5 py-5 sm:px-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Across networks
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {networks.map((n) => (
                  <span
                    key={n.name}
                    className="flex items-center gap-2 rounded-full border border-line bg-void/50 py-1.5 pl-1.5 pr-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={n.src}
                      alt={n.name}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                    <span className="text-[0.8rem] font-semibold text-ink">
                      {n.name}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-success/30 bg-success/10 px-4 py-3.5 text-center">
                <p className={crBodyStrong}>
                  One portfolio. Multiple assets. Multiple networks.
                </p>
                <p className={`mt-2 ${crBody}`}>
                  Your thesis becomes something your audience can actually
                  allocate to.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <Button
            href="#become-creator"
            className="min-w-[14rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
          >
            Build Your Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
