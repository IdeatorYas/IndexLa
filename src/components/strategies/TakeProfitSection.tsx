"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";

export function TakeProfitSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.1rem)] uppercase tracking-[-0.02em] text-balance">
              Take Profit
            </h2>
            <p className="display mt-4 text-[clamp(1.15rem,2.4vw,1.45rem)] text-ink text-balance">
              Decide The Exit Before Emotion Takes Over.
            </p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Set your target before entering a position.
            </p>
            <div className="mt-7">
              <TriggerAction
                trigger="Target reached"
                action="Reduce exposure"
                tone="default"
              />
            </div>
            <div className="mt-6 space-y-2 text-[1.02rem] leading-relaxed text-muted">
              <p>No waiting for the perfect top.</p>
              <p>No turning a profitable position into another round trip.</p>
              <p>Your exit is defined before the market tests your discipline.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="rounded-[1.5rem] border border-electric/25 bg-gradient-to-b from-electric/10 to-transparent p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Price target
              </p>
              <div className="mt-6 space-y-0">
                {[
                  { label: "Entry", detail: "Position open", accent: "border-line bg-void/55" },
                  {
                    label: "Target",
                    detail: "Defined exit",
                    accent: "border-electric/40 bg-electric/15",
                  },
                  {
                    label: "Reduce Exposure",
                    detail: "Rule executes",
                    accent: "border-success/35 bg-success/10",
                  },
                ].map((step, i) => (
                  <div key={step.label}>
                    <div
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 ${step.accent}`}
                    >
                      <span className="display text-[1.1rem]">{step.label}</span>
                      <span className="text-sm text-muted">{step.detail}</span>
                    </div>
                    {i < 2 && (
                      <div className="flex justify-center py-1.5" aria-hidden>
                        <span className="text-electric/60">→</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
