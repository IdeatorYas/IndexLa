"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";

export function RsiStrategySection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.1rem)] uppercase tracking-[-0.02em] text-balance">
              RSI Strategy
            </h2>
            <p className="display mt-4 text-[clamp(1.15rem,2.4vw,1.45rem)] text-ink text-balance">
              Buy Oversold. Reduce Overbought.
            </p>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>RSI identifies when price momentum becomes stretched.</p>
              <p>You define the threshold.</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TriggerAction trigger="Oversold" action="DCA In" tone="buy" />
              <TriggerAction
                trigger="Overbought"
                action="DCA Out"
                tone="sell"
              />
            </div>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
              The strategy responds when your defined RSI conditions are reached
              instead of relying on a manual decision.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] border border-line glass-soft p-5 sm:p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                    RSI band
                  </p>
                  <p className="display mt-2 text-[1.25rem]">Relative strength</p>
                </div>
                <p className="display text-[2rem] text-electric">RSI</p>
              </div>

              <div className="relative mt-8 h-36 overflow-hidden rounded-2xl border border-line bg-void/70 px-3 py-4">
                <div
                  className="absolute inset-x-3 top-[22%] border-t border-dashed border-danger/50"
                  aria-hidden
                />
                <div
                  className="absolute inset-x-3 bottom-[22%] border-t border-dashed border-success/50"
                  aria-hidden
                />
                <svg
                  viewBox="0 0 320 120"
                  className="relative h-full w-full"
                  aria-hidden
                >
                  <path
                    d="M0 70 C40 68, 55 95, 85 92 C115 89, 130 35, 165 32 C200 29, 220 78, 250 74 C280 70, 300 48, 320 45"
                    fill="none"
                    stroke="url(#rsiStroke)"
                    strokeWidth="2.5"
                  />
                  <defs>
                    <linearGradient id="rsiStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="pointer-events-none absolute inset-x-3 top-2 flex justify-between text-[0.65rem] font-semibold uppercase tracking-[0.1em]">
                  <span className="text-danger/80">Overbought</span>
                  <span className="text-success/80">Oversold</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-success/30 bg-success/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Oversold
                  </p>
                  <p className="mt-1 display text-[1rem] text-ink">DCA In</p>
                </div>
                <div className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-danger">
                    Overbought
                  </p>
                  <p className="mt-1 display text-[1rem] text-ink">DCA Out</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-8">
          <div className="rounded-2xl border border-line bg-deep/60 p-5 sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Historical context
            </p>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
              During the March 2020 crash, Bitcoin traded around $5,000 while
              weekly RSI reached deeply oversold levels.
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              BTC later reached approximately $64,800.
            </p>
            <p className="mt-4 text-[0.85rem] font-semibold tracking-[-0.01em] text-muted-dim">
              Historical market context only. Not claimed RSI strategy
              performance.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
