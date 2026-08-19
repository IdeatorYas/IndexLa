"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { DegenCopy } from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenBagholderSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
          </FadeIn>

          <FadeIn className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-danger/25 bg-danger/[0.03] p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-danger/80">
                Bagholder mode
              </p>
              <div className="mt-4 h-20 rounded-lg border border-danger/20 bg-void/50">
                <svg viewBox="0 0 200 60" className="h-full w-full text-danger/60" aria-hidden>
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    points="0,12 50,18 100,32 150,48 200,56"
                  />
                </svg>
              </div>
              <p className="mt-4 text-[0.88rem] text-muted">
                Falling chart · oversized position · no rules · emotional decisions
              </p>
            </div>

            <div className="rounded-2xl border border-success/25 bg-success/[0.03] p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-success/80">
                Rules active
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {["TP ✓", "SL ✓", "ROTATION ✓", "REBALANCE ✓"].map((rule) => (
                  <div
                    key={rule}
                    className="rounded-lg border border-success/30 bg-success/10 px-3 py-3 text-center text-[0.88rem] font-semibold text-ink"
                  >
                    {rule}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.88rem] text-muted">
                Controlled · systematic · rules-based execution
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mx-auto mt-10 max-w-3xl">
            <DegenCopy blocks={section.blocks} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
