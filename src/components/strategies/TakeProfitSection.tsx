import { FadeIn } from "@/components/ui/FadeIn";
import { TriggerAction } from "@/components/strategies/TriggerAction";
import {
  stBody,
  stH2,
  stLede,
  stSection,
  stSurface,
} from "@/components/strategies/strategyRhythm";

export function TakeProfitSection() {
  return (
    <section className={`${stSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <FadeIn>
            <h2 className={`${stH2} uppercase`}>Take Profit</h2>
            <p className={`mt-4 ${stLede}`}>
              Decide The Exit Before Emotion Takes Over.
            </p>
            <p className={`mt-5 ${stBody}`}>
              Set your target before entering a position.
            </p>
            <div className="mt-6">
              <TriggerAction
                trigger="Target reached"
                action="Reduce exposure"
                tone="default"
              />
            </div>
            <div className={`mt-5 space-y-2 ${stBody}`}>
              <p>No waiting for the perfect top.</p>
              <p>No turning a profitable position into another round trip.</p>
              <p>Your exit is defined before the market tests your discipline.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className={`${stSurface} p-5 sm:p-6`}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Price target
              </p>
              <div className="mt-5 space-y-0">
                {[
                  {
                    label: "Entry",
                    detail: "Position open",
                    accent: "border-white/[0.08] bg-void/50",
                  },
                  {
                    label: "Target",
                    detail: "Defined exit",
                    accent: "border-electric/35 bg-electric/10",
                  },
                  {
                    label: "Reduce Exposure",
                    detail: "Rule executes",
                    accent: "border-success/30 bg-success/10",
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
                        <span className="text-electric/55">→</span>
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
