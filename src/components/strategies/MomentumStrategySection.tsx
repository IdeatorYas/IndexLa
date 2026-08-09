"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";

export function MomentumStrategySection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn className="order-2 lg:order-1">
            <div className="rounded-[1.5rem] border border-line glass p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Trend direction
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Bullish
                  </p>
                  <svg viewBox="0 0 160 72" className="mt-3 h-16 w-full" aria-hidden>
                    <path
                      d="M8 58 L48 42 L78 48 L118 22 L152 12"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="display mt-2 text-[1.05rem]">Increase exposure</p>
                </div>
                <div className="rounded-2xl border border-danger/30 bg-danger/10 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-danger">
                    Bearish
                  </p>
                  <svg viewBox="0 0 160 72" className="mt-3 h-16 w-full" aria-hidden>
                    <path
                      d="M8 14 L42 28 L72 22 L110 48 L152 58"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="display mt-2 text-[1.05rem]">Reduce exposure</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="order-1 lg:order-2">
            <h2 className="display text-[clamp(2rem,4.5vw,3.1rem)] uppercase tracking-[-0.02em] text-balance">
              Momentum
            </h2>
            <p className="display mt-4 text-[clamp(1.15rem,2.4vw,1.45rem)] text-ink text-balance">
              Follow The Trend. Don&apos;t Chase The Noise.
            </p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Momentum strategies respond when defined market trends change.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TriggerAction
                trigger="Bullish trend"
                action="Increase exposure"
                tone="buy"
              />
              <TriggerAction
                trigger="Bearish trend"
                action="Reduce exposure"
                tone="sell"
              />
            </div>
            <div className="mt-6 space-y-3 text-[1.02rem] leading-relaxed text-muted">
              <p>Choose the timeframe and conditions that fit your strategy.</p>
              <p>
                INDEXLA monitors the defined signals continuously and coordinates
                execution when your rules are triggered.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
