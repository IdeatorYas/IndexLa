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

              {/* Chart: RSI 0–100, zones <20 and >80 highlighted */}
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-void/70">
                <div className="grid grid-cols-[2.25rem_1fr]">
                  <div className="relative border-r border-line py-3 text-[0.6rem] font-semibold text-muted-dim">
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

                  <div className="relative h-48 sm:h-52">
                    {/* Overbought / overvalued zone >80 */}
                    <div
                      className="absolute inset-x-0 top-0 h-[20%] bg-danger/20"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 top-[20%] border-t border-dashed border-danger/70"
                      aria-hidden
                    />
                    {/* Oversold / undervalued zone <20 */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[20%] bg-success/20"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 bottom-[20%] border-t border-dashed border-success/70"
                      aria-hidden
                    />

                    <svg
                      viewBox="0 0 320 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden
                    >
                      {/* RSI path mapped roughly: y=0 is RSI 100, y=100 is RSI 0 */}
                      <path
                        d="M0 55 C30 52, 45 88, 70 90 C95 92, 110 22, 145 18 C180 14, 205 70, 235 68 C265 66, 290 28, 320 25"
                        fill="none"
                        stroke="url(#rsiStroke2)"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      />
                      <defs>
                        <linearGradient id="rsiStroke2" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#f87171" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="pointer-events-none absolute left-2 top-1.5 max-w-[9.5rem]">
                      <p className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.06em] text-danger">
                        Overbought / Overvalued
                      </p>
                      <p className="mt-0.5 text-[0.7rem] font-semibold text-danger">
                        above 80
                      </p>
                    </div>
                    <div className="pointer-events-none absolute bottom-1.5 left-2 max-w-[9.5rem]">
                      <p className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.06em] text-success">
                        Oversold / Undervalued
                      </p>
                      <p className="mt-0.5 text-[0.7rem] font-semibold text-success">
                        below 20
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-success/30 bg-success/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Oversold
                  </p>
                  <p className="mt-1 text-[0.78rem] font-semibold text-success/90">
                    &lt; 20
                  </p>
                  <p className="mt-1 display text-[1rem] text-ink">DCA In</p>
                </div>
                <div className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-danger">
                    Overbought
                  </p>
                  <p className="mt-1 text-[0.78rem] font-semibold text-danger/90">
                    &gt; 80
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
