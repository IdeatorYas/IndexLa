"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const categories: {
  title: string;
  assets: AssetKey[];
  lines: string[];
}[] = [
  {
    title: "Crypto",
    assets: ["btc", "eth", "sol"],
    lines: [
      "BTC · ETH · Major liquid assets",
      "Fear & Greed · RSI · Momentum · Rebalancing",
    ],
  },
  {
    title: "Tokenized Stocks",
    assets: ["nvidia", "apple", "google"],
    lines: ["Momentum · RSI · Take Profit"],
  },
  {
    title: "Commodities & RWAs",
    assets: ["gold", "silver", "ondo"],
    lines: ["Rebalancing · Momentum · Take Profit"],
  },
  {
    title: "Hybrid Portfolios",
    assets: ["btc", "nvidia", "gold"],
    lines: [
      "Combine supported asset classes and apply different rules across the portfolio.",
    ],
  },
];

export function MatchStrategyAssetSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.1rem)] uppercase tracking-[-0.02em] text-balance">
            Match The Strategy To{" "}
            <span className="gradient-text">The Asset.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Different assets respond differently to the same strategy.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-void/45 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="display text-[1.25rem] tracking-[-0.02em]">
                    {cat.title}
                  </h3>
                  <div className="flex -space-x-2">
                    {cat.assets.map((asset) => (
                      <span
                        key={asset}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-deep"
                      >
                        <AssetLogo asset={asset} size={16} />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-[0.98rem] leading-relaxed text-muted">
                  {cat.lines.map((line) => (
                    <p
                      key={line}
                      className={
                        line.includes("·") && !line.startsWith("Combine")
                          ? "font-semibold text-ink/90"
                          : undefined
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-6 max-w-3xl space-y-2 text-[1.02rem] leading-relaxed text-muted">
          <p>Asset selection still determines the underlying risk.</p>
          <p>
            A strategy does not make an illiquid or speculative asset safe.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
