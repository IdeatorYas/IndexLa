"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";
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

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Asset categories
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {categories.map((cat) => (
                  <div
                    key={cat.label}
                    className="rounded-xl border border-line bg-deep/50 px-4 py-3.5"
                  >
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-electric">
                      {cat.label}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cat.assets.map((key) => (
                        <AssetLogo key={key} asset={key} size={28} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
