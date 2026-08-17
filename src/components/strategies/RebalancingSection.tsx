import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  stBody,
  stH2,
  stLede,
  stSection,
  stSurface,
} from "@/components/strategies/strategyRhythm";

export function RebalancingSection() {
  return (
    <section className={`${stSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <FadeIn className="min-w-0">
            <h2 className={`${stH2} uppercase`}>Rebalancing</h2>
            <p className={`mt-4 ${stLede}`}>Keep Your Portfolio On Target.</p>
            <div className={`mt-5 space-y-2.5 ${stBody}`}>
              <p>Markets move. Allocations drift.</p>
              <p>
                A portfolio targeting{" "}
                <span className="font-semibold">60% BTC / 40% ETH</span>{" "}
                can quickly become something very different after a major move.
              </p>
              <p>Define your target allocations and acceptable ranges.</p>
              <p>
                When your conditions are triggered, INDEXLA can rebalance the
                portfolio toward your rules.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.04} className="min-w-0">
            <div className={`${stSurface} p-5 text-center sm:p-6`}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Allocation drift
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-electric/30 bg-electric/[0.08] p-4 text-center">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Target
                  </p>
                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                        <AssetLogo asset="btc" size={16} />
                        BTC
                      </span>
                      <span className="tabular-nums text-ink">60%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[60%] rounded-full bg-[#f7931a]" />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                        <AssetLogo asset="eth" size={16} />
                        ETH
                      </span>
                      <span className="tabular-nums text-ink">40%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[40%] rounded-full bg-[#627eea]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-void/45 p-4 text-center">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    After a major move
                  </p>
                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                        <AssetLogo asset="btc" size={16} />
                        BTC
                      </span>
                      <span className="text-[0.75rem] font-semibold text-muted">
                        Drifted higher
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[78%] rounded-full bg-[#f7931a]/70" />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                        <AssetLogo asset="eth" size={16} />
                        ETH
                      </span>
                      <span className="text-[0.75rem] font-semibold text-muted">
                        Drifted lower
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[22%] rounded-full bg-[#627eea]/70" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center">
                <p className="text-[0.9rem] font-semibold text-ink">
                  Conditions triggered → Rebalance toward your rules
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
