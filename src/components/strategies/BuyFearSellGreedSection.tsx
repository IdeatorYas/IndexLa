"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import { FearGreedIndexVisual } from "@/components/strategies/FearGreedIndexVisual";

const sentiment = [
  { label: "Extreme Fear", tone: "buy" as const },
  { label: "DCA In", tone: "buy" as const },
  { label: "Neutral", tone: "neutral" as const },
  { label: "Extreme Greed", tone: "sell" as const },
  { label: "DCA Out", tone: "sell" as const },
];

export function BuyFearSellGreedSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-25" aria-hidden />
      <div className="section-pad container-max relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
              Buy Fear.{" "}
              <span className="gradient-text">Sell Greed.</span>
            </h2>
            <p className="display mt-5 text-[clamp(1.15rem,2.4vw,1.45rem)] text-ink text-balance">
              Accumulate Into Extreme Fear. Reduce Exposure Into Extreme Greed.
            </p>

            <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>You don&apos;t need to call the exact bottom or top.</p>
              <p>
                Define your sentiment thresholds and let the strategy respond
                progressively.
              </p>
            </div>

            <div className="mt-6">
              <FearGreedIndexVisual />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TriggerAction trigger="Extreme Fear" action="DCA In" tone="buy" />
              <TriggerAction
                trigger="Extreme Greed"
                action="DCA Out"
                tone="sell"
              />
            </div>

            <div className="mt-6 space-y-2 text-[1.02rem] leading-relaxed text-muted">
              <p>Fear increases → Gradually accumulate.</p>
              <p>Greed increases → Gradually reduce exposure.</p>
              <p>
                Instead of making one emotional decision at the bottom or top,
                your rules spread execution across the conditions you define.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] border border-electric/30 bg-gradient-to-br from-purple/15 via-void/80 to-electric/10 p-5 sm:p-7 lg:sticky lg:top-28">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Market sentiment
              </p>

              <div className="mt-5 space-y-0">
                {sentiment.map((step, i) => (
                  <div key={`${step.label}-${i}`}>
                    <div
                      className={`rounded-2xl border px-4 py-3.5 text-center ${
                        step.tone === "buy"
                          ? "border-success/35 bg-success/10"
                          : step.tone === "sell"
                            ? "border-danger/35 bg-danger/10"
                            : "border-line bg-void/50"
                      }`}
                    >
                      <span
                        className={`display text-[1.1rem] tracking-[-0.02em] ${
                          step.label === "DCA In"
                            ? "text-success"
                            : step.label === "DCA Out"
                              ? "text-danger"
                              : "text-ink"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < sentiment.length - 1 && (
                      <div className="flex justify-center py-1" aria-hidden>
                        <span className="text-electric/50">↓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="mt-6 h-2 overflow-hidden rounded-full"
                aria-hidden
              >
                <div className="flex h-full w-full">
                  <div className="w-[34%] bg-success/70" />
                  <div className="w-[32%] bg-muted-dim/50" />
                  <div className="w-[34%] bg-danger/70" />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                <span>Fear</span>
                <span>Neutral</span>
                <span>Greed</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10">
          <div className="rounded-2xl border border-line bg-void/40 p-5 sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Historical context
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <p className="text-[0.95rem] leading-relaxed text-muted">
                During the 2018–2021 Bitcoin cycle, BTC entered extreme fear
                around the $3K–$6K range before eventually reaching approximately
                $69K.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-muted">
                During the 2022–2025 cycle, BTC entered another extreme-fear
                period around $15K–$17K before eventually reaching approximately
                $126K.
              </p>
            </div>
            <p className="mt-5 text-[0.85rem] font-semibold tracking-[-0.01em] text-muted-dim">
              Historical market context only. Not INDEXLA strategy performance.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
