"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const classes: { label: string; assets: AssetKey[] }[] = [
  { label: "Crypto", assets: ["btc", "eth", "sol"] },
  { label: "Tokenized Stocks", assets: ["nvidia", "apple", "google"] },
  { label: "Commodities", assets: ["gold", "silver"] },
  { label: "RWAs", assets: ["ondo", "sp500"] },
];

const chains = ["Ethereum", "Base", "Arbitrum", "BNB Chain", "Sui"];

export function OnePortfolioEveryMarketSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
              One Portfolio. Every Market.{" "}
              <span className="gradient-text">Every Chain.</span>
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Managing a multi-asset portfolio can mean moving between wallets,
              networks, bridges, exchanges, and platforms.
            </p>
            <p className="mt-4 text-[1.05rem] font-semibold leading-relaxed text-ink">
              INDEXLA brings supported assets and markets into one portfolio
              experience with cross-chain execution underneath.
            </p>
            <p className="mt-5 text-[0.92rem] font-semibold tracking-[-0.01em] text-ink/90">
              Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid Portfolios
            </p>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              Build across one asset class or combine multiple markets into a
              single strategy.
            </p>
            <p className="mt-6 display text-[clamp(1.1rem,2.2vw,1.4rem)] text-ink">
              One portfolio. Multiple assets. Multiple chains.
            </p>
            <p className="mt-4 text-[0.95rem] font-semibold tracking-[-0.01em] text-electric">
              Ethereum · Base · Arbitrum · BNB Chain · Sui
            </p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
              Access supported tokenized assets across the markets INDEXLA
              connects to.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.35rem] glass p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Supported coverage
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {chains.map((chain) => (
                  <span
                    key={chain}
                    className="rounded-full border border-line bg-void/50 px-3 py-1.5 text-xs font-semibold text-ink"
                  >
                    {chain}
                  </span>
                ))}
              </div>
              <div className="mt-5 space-y-2.5">
                {classes.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/40 px-3 py-2.5"
                  >
                    <span className="text-sm font-semibold text-ink">{row.label}</span>
                    <div className="flex -space-x-2">
                      {row.assets.map((key) => (
                        <span
                          key={key}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-panel"
                        >
                          <AssetLogo asset={key} size={14} />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
