"use client";

import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Statement section immediately below the hero.
 * Exact approved copy — presentation only.
 */
export function RulesThesisSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_80%_40%,rgba(56,189,248,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-24">
          <FadeIn>
            <h2 className="display max-w-xl text-[clamp(2.15rem,5vw,3.75rem)] tracking-[-0.035em] text-ink text-balance">
              Stop Trading Your Emotions.
              <span className="mt-2 block gradient-text">Trade Your Rules.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:pt-2">
            <div className="max-w-md space-y-6 lg:ml-auto lg:max-w-lg">
              <div className="space-y-4 text-[1.05rem] leading-[1.7] text-muted sm:text-[1.1rem]">
                <p>Most investors know what they should do.</p>
                <p>
                  Buy when fear is high. Take profits when markets get euphoric.
                  Rebalance when allocations drift.
                </p>
              </div>

              <p className="display border-l-2 border-electric pl-5 text-[clamp(1.35rem,2.8vw,1.85rem)] leading-[1.25] tracking-[-0.03em] text-ink sm:pl-6">
                The hard part is doing it consistently.
              </p>

              <p className="text-[1.02rem] leading-[1.7] text-muted sm:text-[1.08rem]">
                INDEXLA lets you build or discover portfolios, define the rules
                behind them, and automate execution while your assets remain under
                your control.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
