"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const diversified: {
  key: AssetKey;
  ticker: string;
  weight: string;
  color: string;
}[] = [
  { key: "btc", ticker: "BTC", weight: "20%", color: "bg-[#f7931a]" },
  { key: "eth", ticker: "ETH", weight: "20%", color: "bg-[#627eea]" },
  { key: "nvidia", ticker: "NVDA", weight: "20%", color: "bg-[#76b900]" },
  { key: "sp500", ticker: "SPX", weight: "20%", color: "bg-[#38bdf8]" },
  { key: "gold", ticker: "XAU", weight: "20%", color: "bg-[#d4af37]" },
];

export function RebalancingSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-18 lg:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 xl:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em] text-balance">
              Rebalancing
            </h2>
            <p className="display mt-4 text-[clamp(1.1rem,2.2vw,1.35rem)] leading-snug text-ink text-balance">
              Keep Your Portfolio On Target.
            </p>
            <div className="mt-5 space-y-2.5 text-[1.02rem] leading-relaxed text-muted">
              <p>Markets move. Allocations drift.</p>
              <p>
                A portfolio targeting{" "}
                <span className="font-semibold text-ink">60% BTC / 40% ETH</span>{" "}
                can quickly become something very different after a major move.
              </p>
              <p>Define your target allocations and acceptable ranges.</p>
              <p>
                When your conditions are triggered, INDEXLA can rebalance the
                portfolio toward your rules.
              </p>
            </div>
            <div className="mt-6">
              <TriggerAction
                trigger="Portfolio drift exceeds range"
                action="Rebalance"
                tone="default"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mx-auto w-full max-w-md rounded-[1.2rem] border border-line glass-soft p-4 sm:p-5 lg:mx-0 lg:max-w-none">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Allocation comparison
              </p>

              <div className="mt-3 rounded-xl border border-electric/25 bg-electric/8 p-3.5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Target
                </p>

                <ul className="mt-2.5 space-y-1.5">
                  {diversified.map((asset) => (
                    <li
                      key={asset.key}
                      className="grid grid-cols-[1.75rem_minmax(0,1fr)_2.75rem] items-center gap-2.5 rounded-lg border border-line/80 bg-void/50 px-2.5 py-1.5"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-deep">
                        <AssetLogo asset={asset.key} size={15} />
                      </span>
                      <span className="text-[0.8rem] font-semibold tracking-[-0.01em] text-muted">
                        {asset.ticker}
                      </span>
                      <span className="text-right text-[0.9rem] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                        {asset.weight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2.5 flex h-2 overflow-hidden rounded-full">
                  {diversified.map((asset) => (
                    <div key={asset.key} className={`w-1/5 ${asset.color}`} />
                  ))}
                </div>
              </div>

              <ol className="mt-3 space-y-1.5">
                {[
                  "Market moves",
                  "Allocation drifts",
                  "Defined range exceeded",
                  "Rebalance",
                ].map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-2.5 rounded-lg border border-line bg-void/40 px-2.5 py-2"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-electric/30 text-[0.6rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[0.92rem] tracking-[-0.02em]">
                      {step}
                    </span>
                    {i < 3 && (
                      <span className="ml-auto text-electric/45" aria-hidden>
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
