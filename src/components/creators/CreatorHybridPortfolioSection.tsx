"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";
import {
  crBody,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const allocation: {
  key: AssetKey;
  label: string;
  pct: number;
  class: string;
  network: string;
}[] = [
  {
    key: "btc",
    label: "BTC",
    pct: 25,
    class: "Crypto",
    network: "Bitcoin / Multi-chain",
  },
  {
    key: "sp500",
    label: "S&P 500",
    pct: 20,
    class: "Tokenized Stocks",
    network: "Tokenized equities",
  },
  {
    key: "gold",
    label: "Gold",
    pct: 20,
    class: "Commodities",
    network: "Tokenized commodities",
  },
  {
    key: "sol",
    label: "Solana",
    pct: 15,
    class: "Crypto",
    network: "Solana",
  },
  {
    key: "nvidia",
    label: "NVIDIA",
    pct: 20,
    class: "Tokenized Stocks",
    network: "Tokenized equities",
  },
];

const networks = [
  { name: "Ethereum", src: "/images/networks/ethereum.svg" },
  { name: "Solana", src: "/images/networks/solana.svg" },
  { name: "Base", src: "/images/networks/base.svg" },
  { name: "Arbitrum", src: "/images/networks/arbitrum.svg" },
  { name: "BNB Chain", src: "/images/networks/bnb.svg" },
];

export function CreatorHybridPortfolioSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${crH2} uppercase`}>
            Build Across Markets.{" "}
            <span className="gradient-text">Not Just One Token.</span>
          </h2>
          <p className={`mt-5 ${crBody}`}>
            Create long-term portfolios combining crypto, stocks, and
            commodities.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-deep/70">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Example
                </p>
                <p className="mt-1 display text-[1.25rem] tracking-[-0.02em] text-ink sm:text-[1.45rem]">
                  Hybrid Wealth Strategy
                </p>
              </div>
              <p className="text-[0.85rem] font-semibold text-muted">
                25% BTC · 20% S&P 500 · 20% Gold · 15% Solana · 20% NVIDIA
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-3 border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
                {allocation.map((row, i) => (
                  <motion.div
                    key={row.key}
                    className="rounded-xl border border-line bg-void/45 p-3.5"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
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
                        className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-5 p-5 sm:p-6">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                    Asset classes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Crypto", "Tokenized Stocks", "Commodities"].map(
                      (label) => (
                        <span
                          key={label}
                          className="rounded-full border border-line bg-void/50 px-3.5 py-1.5 text-[0.85rem] font-semibold text-ink"
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div>
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
                </div>

                <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center">
                  <p className="text-[0.9rem] font-semibold text-ink">
                    One thesis. Multiple asset classes. Multiple networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <div className="inline-flex justify-center">
            <div className={crGreenBox}>
              <p className={crGreenText}>
                Your conviction becomes a programmable portfolio.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
