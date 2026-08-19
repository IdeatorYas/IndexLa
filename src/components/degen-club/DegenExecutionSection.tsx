"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  ChainPills,
  DegenCopy,
  DegenSectionTitle,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcBodyStrong, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenExecutionSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <DegenSectionTitle title={section.title} />
          </FadeIn>

          <FadeIn className="mt-8">
            <TerminalShell title="Execution Stack">
              <div className="flex flex-col items-center gap-3 py-2">
                {[
                  "Portfolio",
                  "Rules Engine",
                  "Execution",
                  "Multiple Chains",
                ].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-3">
                    <div
                      className={`w-full max-w-sm rounded-xl border border-electric/30 bg-electric/10 px-4 py-3.5 text-center ${dcBodyStrong}`}
                    >
                      {step}
                    </div>
                    {i < 3 ? (
                      <span className="text-[1.1rem] text-muted-dim" aria-hidden>
                        ↓
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Non-custodial", "MEV-protected", "Private execution"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[0.88rem] font-semibold text-muted sm:text-[0.92rem]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </TerminalShell>
          </FadeIn>

          <FadeIn className="mx-auto mt-8 max-w-3xl">
            <DegenCopy blocks={section.blocks} />
            <div className="mt-5">
              <ChainPills compact />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
