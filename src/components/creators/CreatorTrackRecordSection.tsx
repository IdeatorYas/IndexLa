"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";

const metrics = [
  "Allocations",
  "Strategy",
  "PnL",
  "Performance",
  "Activity",
  "AUM",
];

export function CreatorTrackRecordSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] uppercase tracking-[-0.02em] text-balance">
              Your Track Record Becomes{" "}
              <span className="gradient-text">Your Reputation.</span>
            </h2>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>Your best ideas shouldn&apos;t disappear into a Telegram message.</p>
              <p>
                Publish a portfolio investors can discover, evaluate, and allocate
                to.
              </p>
              <p>They can see:</p>
            </div>
            <p className="mt-3 text-[0.95rem] font-semibold text-ink">
              Allocations · Strategy · PnL · Performance · Activity · AUM
            </p>
            <p className="mt-6 display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
              Your PnL is public by design.
            </p>
            <div className="mt-4 space-y-2 text-[1.02rem] leading-relaxed text-muted">
              <p>Strong calls build credibility.</p>
              <p>Consistent execution builds a track record.</p>
              <p>Growing AUM shows that investors believe in your thesis.</p>
            </div>
            <p className="mt-6 display text-[clamp(1.1rem,2.2vw,1.4rem)] gradient-text">
              Your portfolio becomes a living record of your market conviction.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] glass p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                    Public profile · illustrative
                  </p>
                  <p className="display mt-2 text-[1.35rem]">Flagship Thesis</p>
                  <p className="mt-1 text-sm text-muted">
                    Strategy · Buy Fear / Sell Greed
                  </p>
                </div>
                <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Public PnL
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: "Demo PnL", value: "+$772K", tone: "text-success" },
                  { label: "Performance", value: "+18.4%", tone: "text-success" },
                  { label: "Demo AUM", value: "$4.2M", tone: "text-ink" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-line bg-void/45 px-3 py-3"
                  >
                    <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
                      {stat.label}
                    </p>
                    <p className={`mt-1 display text-[1.15rem] ${stat.tone}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(["btc", "eth", "nvidia", "gold", "sol"] as const).map((key) => (
                  <span
                    key={key}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-void/55"
                  >
                    <AssetLogo asset={key} size={16} />
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {metrics.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-void/40 px-3 py-1 text-[0.7rem] font-semibold text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-line bg-void/40 px-4 py-3">
                <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-dim">
                  Activity · illustrative
                </p>
                <p className="mt-2 text-sm text-muted">
                  Rebalanced 2d ago · Fear signal armed · Public track record
                </p>
              </div>

              <p className="mt-4 text-xs text-muted-dim">
                Illustrative portfolio profile — not live creator data.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
