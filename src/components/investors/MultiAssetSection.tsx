"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const classes: {
  label: string;
  assets: AssetKey[];
  width: string;
}[] = [
  { label: "Crypto", assets: ["btc", "eth", "sol"], width: "w-[34%]" },
  { label: "Tokenized Stocks", assets: ["nvidia", "apple", "google"], width: "w-[28%]" },
  { label: "Commodities", assets: ["gold", "silver"], width: "w-[18%]" },
  { label: "RWAs", assets: ["ondo", "sp500"], width: "w-[20%]" },
];

export function MultiAssetSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
              One Portfolio.{" "}
              <span className="gradient-text">Every Market You Want To Access.</span>
            </h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
              Bring different asset classes into one portfolio instead of
              managing them across disconnected platforms.
            </p>
            <p className="mt-5 text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
              Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid Portfolios
            </p>
            <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>Build crypto-only portfolios.</p>
              <p>Build tokenized-asset portfolios.</p>
              <p>Or combine multiple asset classes into one strategy.</p>
            </div>
            <p className="mt-8 display text-[clamp(1.15rem,2.3vw,1.55rem)] text-ink">
              One portfolio. Multiple assets. Cross-chain execution.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[1.75rem] glass p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Multi-asset portfolio
                </p>
                <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Hybrid
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {classes.map((row) => (
                  <div key={row.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-ink">{row.label}</span>
                      <div className="flex -space-x-2">
                        {row.assets.map((key) => (
                          <span
                            key={key}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-void"
                          >
                            <AssetLogo asset={key} size={14} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-purple to-electric ${row.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-void/45 px-4 py-3 text-center text-sm text-muted">
                One allocation view across supported markets
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
