"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";

export function OwnershipSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20 lg:py-24">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
            Own The Assets.{" "}
            <span className="gradient-text">Not A Wrapper.</span>
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <FadeIn>
            <div className="flex h-full flex-col rounded-[1.35rem] border border-electric/35 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent p-6 sm:p-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-electric">
                Non-custodial
              </p>
              <p className="display mt-4 text-[clamp(1.45rem,2.8vw,2.1rem)] text-balance text-ink">
                Non-custodial by design. Your assets stay in your wallet.
              </p>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
                INDEXLA provides the infrastructure to coordinate portfolio
                execution according to your strategy. It does not take custody of
                your assets or manage your portfolio for you.
              </p>
              <div className="mt-6 space-y-2 text-[1rem] leading-relaxed text-muted">
                <p>No centralized custody.</p>
                <p>No wrapper token representing your portfolio.</p>
                <p>No surrendering your assets to a manager.</p>
              </div>
              <div className="mt-6 space-y-1.5 text-[1.02rem] font-semibold leading-snug text-ink">
                <p>You choose the assets.</p>
                <p>You choose the allocations.</p>
                <p>You choose the strategy.</p>
              </div>
              <p className="mt-6 display text-[clamp(1.15rem,2.2vw,1.4rem)] text-ink">
                Your assets remain under your control.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col justify-center rounded-[1.35rem] glass p-6 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Your wallet
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["btc", "eth", "nvidia", "gold", "sol"] as const).map((key) => (
                  <span
                    key={key}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void/60"
                  >
                    <AssetLogo asset={key} size={20} />
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-void/45 px-4 py-3 text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Non-custodial by design
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
