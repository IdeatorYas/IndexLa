"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import { FearGreedIndexVisual } from "@/components/strategies/FearGreedIndexVisual";
import {
  stBody,
  stH2,
  stLede,
  stSection,
  stSurface,
  stSurfaceSoft,
} from "@/components/strategies/strategyRhythm";

const sentiment = [
  { label: "Extreme Fear", tone: "buy" as const },
  { label: "DCA In", tone: "buy" as const },
  { label: "Neutral", tone: "neutral" as const },
  { label: "Extreme Greed", tone: "sell" as const },
  { label: "DCA Out", tone: "sell" as const },
] as const;

export function BuyFearSellGreedSection() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
          <FadeIn className="min-w-0">
            <h2 className={`${stH2} uppercase`}>
              Buy Fear.{" "}
              <span className="gradient-text">Sell Greed.</span>
            </h2>
            <p className={`mt-4 ${stLede}`}>
              Accumulate Into Extreme Fear. Reduce Exposure Into Extreme Greed.
            </p>

            <div className={`mt-5 space-y-2.5 ${stBody}`}>
              <p className="text-balance">
                You don&apos;t need to call the exact bottom or top.
              </p>
              <p className="text-balance">
                Define your sentiment thresholds and let the strategy respond
                progressively.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <TriggerAction trigger="Extreme Fear" action="DCA In" tone="buy" />
              <TriggerAction
                trigger="Extreme Greed"
                action="DCA Out"
                tone="sell"
              />
            </div>

            <div className={`mt-5 space-y-2 ${stBody}`}>
              <p>Fear increases → Gradually accumulate.</p>
              <p>Greed increases → Gradually reduce exposure.</p>
              <p>
                Instead of making one emotional decision at the bottom or top,
                your rules spread execution across the conditions you define.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.04} className="min-w-0">
            <div className={`${stSurface} p-3.5 sm:p-4`}>
              <FearGreedIndexVisual />

              <div className="mt-3 border-t border-white/[0.07] pt-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Market sentiment
                </p>
                <ol className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {sentiment.map((step, i) => (
                    <li
                      key={`${step.label}-${i}`}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className={`rounded-lg border px-2.5 py-1.5 text-[0.78rem] font-semibold tracking-[-0.01em] ${
                          step.tone === "buy"
                            ? "border-success/30 bg-success/10 text-success"
                            : step.tone === "sell"
                              ? "border-danger/30 bg-danger/10 text-danger"
                              : "border-white/[0.08] bg-void/50 text-ink"
                        }`}
                      >
                        {step.label}
                      </span>
                      {i < sentiment.length - 1 && (
                        <span className="text-electric/40" aria-hidden>
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-8">
          <div className={`${stSurfaceSoft} p-4 sm:p-5`}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Historical context
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <p className="text-[0.95rem] leading-relaxed text-muted text-pretty">
                During the 2018–2021 Bitcoin cycle, BTC entered extreme fear
                around the $3K–$6K range before eventually reaching approximately
                $69K.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-muted text-pretty">
                During the 2022–2025 cycle, BTC entered another extreme-fear
                period around $15K–$17K before eventually reaching approximately
                $126K.
              </p>
            </div>
            <p className="mt-4 text-[0.82rem] font-semibold tracking-[-0.01em] text-muted-dim">
              Historical market context only. Not INDEXLA strategy performance.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
