"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import { AssetLogo } from "@/components/ui/AssetLogo";

export function RebalancingSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.1rem)] uppercase tracking-[-0.02em] text-balance">
              Rebalancing
            </h2>
            <p className="display mt-4 text-[clamp(1.15rem,2.4vw,1.45rem)] text-ink text-balance">
              Keep Your Portfolio On Target.
            </p>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>Markets move. Allocations drift.</p>
              <p>
                A portfolio targeting{" "}
                <span className="font-semibold text-ink">60% BTC / 40% ETH</span>{" "}
                can quickly become something very different after a major move.
              </p>
              <p>
                Define your target allocations and acceptable ranges.
              </p>
              <p>
                When your conditions are triggered, INDEXLA can rebalance the
                portfolio toward your rules.
              </p>
            </div>
            <div className="mt-7">
              <TriggerAction
                trigger="Portfolio drift exceeds range"
                action="Rebalance"
                tone="default"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] border border-line glass-soft p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Allocation comparison
              </p>

              <div className="mt-5 rounded-2xl border border-electric/30 bg-electric/10 p-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Target
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-void/50 px-3 py-3">
                    <AssetLogo asset="btc" size={20} />
                    <span className="display text-[1.15rem] tabular-nums">60%</span>
                    <span className="text-sm text-muted">BTC</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-void/50 px-3 py-3">
                    <AssetLogo asset="eth" size={20} />
                    <span className="display text-[1.15rem] tabular-nums">40%</span>
                    <span className="text-sm text-muted">ETH</span>
                  </div>
                </div>
                <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
                  <div className="w-[60%] bg-[#f7931a]" />
                  <div className="w-[40%] bg-[#627eea]" />
                </div>
              </div>

              <ol className="mt-5 space-y-2">
                {[
                  "Market moves",
                  "Allocation drifts",
                  "Defined range exceeded",
                  "Rebalance",
                ].map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-line bg-void/45 px-3 py-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-electric/30 text-[0.65rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[1rem] tracking-[-0.02em]">
                      {step}
                    </span>
                    {i < 3 && (
                      <span className="ml-auto text-electric/50" aria-hidden>
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
