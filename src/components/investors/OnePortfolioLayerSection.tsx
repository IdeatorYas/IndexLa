"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";
import {
  invBody,
  invBodyStrong,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const networks = [
  { name: "Ethereum", src: "/images/networks/ethereum.svg" },
  { name: "Base", src: "/images/networks/base.svg" },
  { name: "Arbitrum", src: "/images/networks/arbitrum.svg" },
  { name: "BNB Chain", src: "/images/networks/bnb.svg" },
  { name: "Solana", src: "/images/networks/solana.svg" },
  { name: "Sui", src: "/images/networks/sui.svg" },
  { name: "Robinhood", src: "/images/networks/robinhood.svg" },
] as const;

const categories: { label: string; assets: AssetKey[] }[] = [
  { label: "Crypto", assets: ["btc", "eth", "sol"] },
  { label: "Tokenized Stocks", assets: ["nvidia", "apple", "google"] },
  { label: "Commodities", assets: ["gold", "silver"] },
  { label: "RWAs", assets: ["ondo", "sp500"] },
];

export function OnePortfolioLayerSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Manage Your Portfolio From{" "}
            <span className="gradient-text">One Layer.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Stop jumping between wallets, exchanges, DEXs, bridges, and networks
            just to manage one portfolio.
          </p>
          <p className={`mt-4 ${invBodyStrong}`}>
            One portfolio. Multiple assets. Multiple networks.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.35rem] border border-line bg-void/45">
            <div className="border-b border-line px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Supported networks
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {networks.map((network, i) => (
                  <motion.div
                    key={network.name}
                    className="flex items-center gap-2 rounded-full border border-line bg-deep/60 py-1.5 pl-1.5 pr-3"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel/90">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={network.src}
                        alt={network.name}
                        width={16}
                        height={16}
                        className="object-contain"
                        draggable={false}
                      />
                    </span>
                    <span className="text-[0.8rem] font-semibold text-ink">
                      {network.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="space-y-3 border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Asset categories
                </p>
                <div className="space-y-2.5">
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat.label}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-deep/50 px-3 py-2.5"
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <span className="text-[0.88rem] font-semibold text-ink">
                        {cat.label}
                      </span>
                      <div className="flex -space-x-1.5">
                        {cat.assets.map((key) => (
                          <span
                            key={key}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel"
                          >
                            <AssetLogo asset={key} size={14} />
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 border-b border-line px-6 py-8 lg:border-b-0">
                <span className="hidden text-electric/50 lg:block" aria-hidden>
                  →
                </span>
                <span className="text-electric/50 lg:hidden" aria-hidden>
                  ↓
                </span>
                <div className="rounded-[1.25rem] border border-electric/45 bg-gradient-to-br from-electric/15 via-purple/10 to-transparent px-7 py-6 text-center">
                  <p className="display text-[clamp(1.35rem,2.8vw,1.75rem)] gradient-text">
                    INDEXLA
                  </p>
                  <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Portfolio layer
                  </p>
                </div>
                <span className="text-electric/50" aria-hidden>
                  ↓
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-5 sm:p-6 lg:border-l lg:border-line">
                <div className="w-full rounded-[1.25rem] border border-success/35 bg-success/[0.08] px-5 py-6 text-center">
                  <p className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.3rem]">
                    One INDEXLA Portfolio
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    One portfolio. Multiple assets. Multiple networks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
