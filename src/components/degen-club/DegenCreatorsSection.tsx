"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  DegenCopy,
  DegenCta,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenCreatorsSection({ section }: { section: DegenSection }) {
  const cta = section.blocks.find((b) => b.type === "cta");
  const copy = section.blocks.filter((b) => b.type !== "cta");

  return (
    <section className={`${dcSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className={`${dcH2} max-w-3xl text-ink`}>{section.title}</h2>
          </FadeIn>

          <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_1.05fr]">
            <FadeIn>
              <DegenCopy blocks={copy} />
              {cta?.type === "cta" ? (
                <div className="mt-8">
                  <DegenCta label={cta.text} />
                </div>
              ) : null}
            </FadeIn>

            <FadeIn delay={0.1}>
              <TerminalShell title="Creator Distribution Engine">
                <div className="flex flex-wrap justify-center gap-2">
                  {["CREATE", "PUBLISH", "COMMUNITY", "EARN"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-amber-300">
                        {step}
                      </span>
                      {i < 3 ? <span className="text-muted-dim">→</span> : null}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-amber-400/80">
                    Creator Index
                  </p>
                  <p className="mt-2 display text-[1.35rem] tracking-[-0.02em] text-ink">
                    DEGEN META INDEX
                  </p>
                  <AllocationBar
                    items={[
                      { ticker: "PEPE", pct: 20 },
                      { ticker: "WIF", pct: 15 },
                      { ticker: "BONK", pct: 15 },
                      { ticker: "FLOKI", pct: 10 },
                      { ticker: "DOGE", pct: 18 },
                      { ticker: "MOG", pct: 12 },
                    ]}
                  />
                </div>

                <div className="mt-4 space-y-2 text-center text-[0.82rem] font-semibold text-muted">
                  <p>Creator → Portfolio → Community wallets → Creator revenue</p>
                </div>

                <div className="mt-5 rounded-xl border border-success/35 bg-success/[0.08] px-4 py-4 text-center">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Creator revenue share
                  </p>
                  <p className="mt-1 display text-[2rem] tabular-nums tracking-[-0.03em] text-ink">
                    50%
                  </p>
                </div>
              </TerminalShell>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
