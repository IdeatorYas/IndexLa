"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import { AssetLogo } from "@/components/ui/AssetLogo";
import type { AssetKey } from "@/lib/site";

const diversified: {
  key: AssetKey;
  ticker: string;
  color: string;
}[] = [
  { key: "btc", ticker: "BTC", color: "bg-[#f7931a]" },
  { key: "eth", ticker: "ETH", color: "bg-[#627eea]" },
  { key: "nvidia", ticker: "NVDA", color: "bg-[#76b900]" },
  { key: "sp500", ticker: "SPX", color: "bg-[#38bdf8]" },
  { key: "gold", ticker: "XAU", color: "bg-[#d4af37]" },
];

const flow = [
  "Market moves",
  "Allocation drifts",
  "Defined range exceeded",
  "Rebalance",
] as const;

export function RebalancingSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-18 lg:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-12">
          <FadeIn className="min-w-0">
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

          <FadeIn delay={0.04} className="min-w-0">
            <div className="w-full max-w-[22rem] rounded-[1.1rem] border border-line glass-soft p-3.5 lg:ml-auto">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Allocation comparison
              </p>

              <div className="mt-2.5 rounded-xl border border-electric/25 bg-electric/8 p-3">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Target
                </p>

                <ul className="mt-2 space-y-1">
                  {diversified.map((asset) => (
                    <li
                      key={asset.key}
                      className="grid grid-cols-[1.4rem_2.6rem_1fr] items-center gap-2 rounded-md border border-line/70 bg-void/55 px-2 py-1"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-deep">
                        <AssetLogo asset={asset.key} size={13} />
                      </span>
                      <span className="text-[0.72rem] font-semibold tracking-[-0.01em] text-muted">
                        {asset.ticker}
                      </span>
                      <span className="text-right text-[0.8rem] font-semibold tabular-nums tracking-[-0.02em] text-ink">
                        20%
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
                  {diversified.map((asset) => (
                    <div key={asset.key} className={`w-1/5 ${asset.color}`} />
                  ))}
                </div>
              </div>

              <ol className="mt-2.5 flex flex-wrap items-center gap-1">
                {flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-1">
                    <span className="rounded-md border border-line bg-void/50 px-2 py-1 text-[0.68rem] font-medium text-ink">
                      <span className="mr-1 text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </span>
                    {i < flow.length - 1 && (
                      <span className="text-[0.65rem] text-electric/40" aria-hidden>
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
