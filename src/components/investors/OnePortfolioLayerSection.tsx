"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invPremiumAccent,
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

const categories = [
  {
    label: "Crypto",
    detail: "Native digital assets across major networks",
    shell:
      "border-electric/35 bg-gradient-to-br from-electric/[0.16] via-blue/[0.08] to-void/80",
    mark: "₿",
    markClass: "text-electric",
  },
  {
    label: "Tokenized Stocks",
    detail: "Equity exposure through on-chain representations",
    shell:
      "border-cyan/35 bg-gradient-to-br from-cyan/[0.14] via-electric/[0.06] to-void/80",
    mark: "↗",
    markClass: "text-cyan",
  },
  {
    label: "Commodities",
    detail: "Hard assets including metals and related markets",
    shell:
      "border-amber-400/35 bg-gradient-to-br from-amber-400/[0.14] via-orange-500/[0.06] to-void/80",
    mark: "◈",
    markClass: "text-amber-300",
  },
  {
    label: "RWAs",
    detail: "Tokenized real-world asset exposure",
    shell:
      "border-purple-bright/35 bg-gradient-to-br from-purple/[0.18] via-electric/[0.06] to-void/80",
    mark: "◇",
    markClass: "text-purple-bright",
  },
] as const;

export function OnePortfolioLayerSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Manage Everything From{" "}
            <span className="gradient-text">One Layer.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Stop jumping between wallets, exchanges, DEXs, bridges and networks
            to manage one investment plan.
          </p>
          <div className="mt-6 inline-flex justify-center">
            <div className={`${invPremiumAccent} px-5 py-3.5 sm:px-7`}>
              <p className="text-[0.95rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.05rem]">
                Multiple Products · Multiple Assets · Multiple Networks · One
                Control Layer
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.35rem] border border-line bg-void/45">
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

            <div className="px-5 py-6 sm:px-7 sm:py-7">
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Asset Categories
              </p>
              <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat, i) => (
                  <motion.article
                    key={cat.label}
                    className={`flex min-h-[10.5rem] flex-col items-center justify-center rounded-2xl border px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${cat.shell}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <span
                      className={`display text-[1.75rem] leading-none ${cat.markClass}`}
                      aria-hidden
                    >
                      {cat.mark}
                    </span>
                    <h3 className="mt-4 display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.2rem]">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-[0.85rem] font-medium leading-snug text-muted text-balance sm:text-[0.9rem]">
                      {cat.detail}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
