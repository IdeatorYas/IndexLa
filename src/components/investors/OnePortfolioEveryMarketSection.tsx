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

export function OnePortfolioEveryMarketSection() {
  return (
    <section className="relative border-t border-line bg-void py-16 md:py-24">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
              One Portfolio. Every Market.{" "}
              <span className="gradient-text">Every Chain.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
              <p>
                Managing a multi-asset portfolio can mean moving between wallets,
                networks, bridges, exchanges, and platforms.
              </p>
              <p>
                INDEXLA brings supported markets and assets into one portfolio
                experience with cross-chain execution underneath.
              </p>
            </div>
            <p className="mt-6 text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
              Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid Portfolios
            </p>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              Build across one asset class or combine multiple markets into a
              single strategy.
            </p>
            <p className="mt-8 display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
              One portfolio. Multiple assets. Multiple chains.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.5rem] glass p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Unified portfolio
                </p>
                <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Multi-chain
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {["ETH", "SOL", "BNB"].map((chain) => (
                  <div
                    key={chain}
                    className="rounded-xl border border-line bg-void/50 py-2.5 text-center text-xs font-semibold text-muted"
                  >
                    {chain}
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
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
