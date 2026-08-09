"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";

export function OwnershipSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Own The Assets.{" "}
            <span className="gradient-text">Not A Wrapper.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>Traditional indexes often give you exposure through a single product.</p>
            <p>INDEXLA takes a different approach.</p>
            <p>Your portfolio is built from the underlying assets themselves.</p>
          </div>
          <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-muted">
            <p>No wrapper token representing your portfolio.</p>
            <p>No centralized custody.</p>
            <p>No surrendering your assets to a manager.</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-[1.75rem] border border-danger/20 bg-danger/[0.05] p-6 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-danger">
                Traditional
              </p>
              <p className="display mt-4 text-[1.45rem]">Portfolio wrapper</p>
              <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                Exposure packaged into a single product — often with custody and
                manager control in the middle.
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-void/40 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                  You hold
                </p>
                <p className="mt-2 display text-[1.2rem] text-ink/80">INDEX / WRAP token</p>
                <p className="mt-3 text-xs text-muted-dim">
                  Not the underlying assets themselves
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="h-full rounded-[1.75rem] glass p-6 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                INDEXLA
              </p>
              <p className="display mt-4 text-[1.45rem]">Underlying assets</p>
              <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                Strategy defines the portfolio. Assets remain under your control.
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-void/45 p-4">
                <p className="text-center text-xs uppercase tracking-[0.14em] text-muted-dim">
                  Your wallet / control
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {(["btc", "eth", "nvidia", "gold"] as const).map((key) => (
                    <span
                      key={key}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel"
                    >
                      <AssetLogo asset={key} size={18} />
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-electric">
                  Direct ownership · non-custodial architecture
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "You choose the assets.",
              "You choose the allocations.",
              "You choose the strategy.",
              "You stay in control.",
            ].map((line) => (
              <p
                key={line}
                className="rounded-2xl border border-line bg-void/35 px-4 py-4 text-[1rem] font-semibold text-ink"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
