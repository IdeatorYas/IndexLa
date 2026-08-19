"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ChainPills, DegenCopy, TerminalShell } from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenExecutionSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
          </FadeIn>

          <FadeIn className="mt-10">
            <TerminalShell title="Execution Stack">
              <div className="flex flex-col items-center gap-3 py-2">
                {[
                  "Portfolio",
                  "Rules Engine",
                  "Execution",
                  "Multiple Chains",
                ].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-3">
                    <div className="w-full max-w-sm rounded-xl border border-electric/30 bg-electric/10 px-4 py-3 text-center text-[0.9rem] font-semibold text-ink">
                      {step}
                    </div>
                    {i < 3 ? (
                      <span className="text-muted-dim" aria-hidden>
                        ↓
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-line px-3 py-1 text-[0.72rem] font-semibold text-muted">
                  Non-custodial
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-[0.72rem] font-semibold text-muted">
                  MEV-protected
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-[0.72rem] font-semibold text-muted">
                  Private execution
                </span>
              </div>
            </TerminalShell>
          </FadeIn>

          <FadeIn className="mx-auto mt-10 max-w-3xl">
            <DegenCopy blocks={section.blocks} />
            <div className="mt-6">
              <ChainPills compact />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
