"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import {
  stBody,
  stH2,
  stLede,
  stSection,
  stSurface,
  stSurfaceSoft,
} from "@/components/strategies/strategyRhythm";

export function RsiStrategySection() {
  return (
    <section className={`${stSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <FadeIn>
            <h2 className={`${stH2} uppercase`}>RSI Strategy</h2>
            <p className={`mt-4 ${stLede}`}>Buy Oversold. Reduce Overbought.</p>
            <div className={`mt-5 space-y-2.5 ${stBody}`}>
              <p>RSI identifies when price momentum becomes stretched.</p>
              <p>You define the threshold.</p>
            </div>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <TriggerAction trigger="Oversold" action="DCA In" tone="buy" />
              <TriggerAction
                trigger="Overbought"
                action="DCA Out"
                tone="sell"
              />
            </div>
            <p className={`mt-5 ${stBody}`}>
              The strategy responds when your defined RSI conditions are reached
              instead of relying on a manual decision.
            </p>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className={`${stSurface} p-5 sm:p-6`}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                    RSI band
                  </p>
                  <p className="display mt-2 text-[1.2rem]">Relative strength</p>
                </div>
                <p className="display text-[1.85rem] text-electric">RSI</p>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-void/60">
                <div className="grid grid-cols-[2.25rem_1fr]">
                  <div className="relative border-r border-white/[0.07] py-3 text-[0.6rem] font-semibold text-muted-dim">
                    <span className="absolute right-1.5 top-[8%]">100</span>
                    <span className="absolute right-1.5 top-[28%] text-danger">
                      80
                    </span>
                    <span className="absolute right-1.5 top-[48%]">50</span>
                    <span className="absolute right-1.5 top-[68%] text-success">
                      20
                    </span>
                    <span className="absolute right-1.5 bottom-[8%]">0</span>
                  </div>

                  <div className="relative h-44 sm:h-48">
                    <div
                      className="absolute inset-x-0 top-0 h-[20%] bg-danger/15"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 top-[20%] border-t border-dashed border-danger/60"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[20%] bg-success/15"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 bottom-[20%] border-t border-dashed border-success/60"
                      aria-hidden
                    />

                    <svg
                      viewBox="0 0 320 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden
                    >
                      <path
                        d="M0 55 C30 52, 45 88, 70 90 C95 92, 110 22, 145 18 C180 14, 205 70, 235 68 C265 66, 290 28, 320 25"
                        fill="none"
                        stroke="url(#rsiStrokeSt)"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      />
                      <defs>
                        <linearGradient id="rsiStrokeSt" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#f87171" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
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
          <div className={`${stSurfaceSoft} p-5 sm:p-6`}>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Historical context
            </p>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted text-pretty">
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
