"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";

export function OwnershipSection() {
  return (
    <section className="relative border-t border-line bg-deep py-16 md:py-24 lg:py-28">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Own The Assets.{" "}
            <span className="gradient-text">Not A Wrapper.</span>
          </h2>
          <p className="mt-6 text-[1.08rem] leading-relaxed text-muted">
            INDEXLA is built around the underlying assets themselves.
          </p>
          <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-muted">
            <p>No wrapper token representing your portfolio.</p>
            <p>No centralized custody.</p>
            <p>No surrendering your assets to a manager.</p>
          </div>
          <div className="mt-7 space-y-2 text-[1.05rem] font-semibold leading-snug text-ink">
            <p>You choose the assets.</p>
            <p>You choose the allocations.</p>
            <p>You choose the strategy.</p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <FadeIn>
            <div className="flex h-full flex-col justify-center rounded-[1.5rem] border border-electric/35 bg-gradient-to-br from-electric/10 via-purple/10 to-transparent p-7 sm:p-9">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-electric">
                Non-custodial
              </p>
              <p className="display mt-4 text-[clamp(1.55rem,3vw,2.25rem)] text-balance text-ink">
                Non-custodial by design. Your assets remain in your wallet and
                under your control.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="h-full rounded-[1.5rem] glass p-6 sm:p-7">
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
              <ul className="mt-6 space-y-2.5 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-electric">•</span>
                  No centralized custody
                </li>
                <li className="flex gap-2">
                  <span className="text-electric">•</span>
                  No wrapper token representing your portfolio
                </li>
                <li className="flex gap-2">
                  <span className="text-electric">•</span>
                  No surrendering your assets to a manager
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
