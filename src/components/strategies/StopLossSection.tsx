import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import {
  stBody,
  stH2,
  stLede,
  stSection,
  stSurface,
} from "@/components/strategies/strategyRhythm";

export function StopLossSection() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <FadeIn className="order-2 lg:order-1">
            <div className={`${stSurface} border-danger/20 p-5 sm:p-6`}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Downside protection
              </p>
              <div className="mt-5 space-y-0">
                {[
                  {
                    label: "Entry",
                    detail: "Position open",
                    accent: "border-white/[0.08] bg-void/50",
                  },
                  {
                    label: "Stop Level",
                    detail: "Defined max loss",
                    accent: "border-danger/40 bg-danger/12",
                  },
                  {
                    label: "Reduce / Exit Exposure",
                    detail: "Rule executes",
                    accent: "border-danger/30 bg-danger/10",
                  },
                ].map((step, i) => (
                  <div key={step.label}>
                    <div
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 ${step.accent}`}
                    >
                      <span className="display text-[1.05rem]">{step.label}</span>
                      <span className="text-sm text-muted">{step.detail}</span>
                    </div>
                    {i < 2 && (
                      <div className="flex justify-center py-1.5" aria-hidden>
                        <span className="text-danger/55">→</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn className="order-1 lg:order-2">
            <h2 className={`${stH2} uppercase`}>Stop Loss</h2>
            <p className={`mt-4 ${stLede}`}>
              Protect The Downside Before It Gets Worse.
            </p>
            <p className={`mt-5 ${stBody}`}>
              Set the maximum loss you are willing to accept before entering a
              position.
            </p>
            <div className="mt-6">
              <TriggerAction
                trigger="Price reaches your stop level"
                action="Reduce or exit exposure"
                tone="sell"
              />
            </div>
            <div className={`mt-5 space-y-2 ${stBody}`}>
              <p>No waiting for a recovery that may never come.</p>
              <p>No emotional decision while the market is falling.</p>
              <p>
                Your downside rule is defined before the position is opened.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
