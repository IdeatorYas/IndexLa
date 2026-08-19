"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  ChainPills,
  DegenCopy,
  EXAMPLE_ALLOCATIONS,
  MEME_COINS,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

const BUILD_STEPS = [
  "Choose the assets",
  "Set allocations",
  "Define rules",
  "Automate",
] as const;

export function DegenBuildBasketSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
          </FadeIn>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <DegenCopy blocks={section.blocks.filter((b) => b.type !== "cta")} />
              {section.blocks.find((b) => b.type === "cta")?.type === "cta" ? (
                <div className="mt-6">
                  <DegenCopy
                    blocks={[section.blocks.find((b) => b.type === "cta")!]}
                  />
                </div>
              ) : null}
            </FadeIn>

            <FadeIn delay={0.08}>
              <TerminalShell title="Portfolio Builder">
                <div className="flex flex-wrap gap-2">
                  {BUILD_STEPS.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-[0.78rem] font-semibold text-ink">
                        {step}
                      </span>
                      {i < BUILD_STEPS.length - 1 ? (
                        <span className="text-muted-dim" aria-hidden>
                          →
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {MEME_COINS.map((coin) => (
                    <div
                      key={coin.ticker}
                      className="flex items-center gap-2 rounded-lg border border-line bg-void/40 px-2.5 py-2"
                    >
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[0.55rem] font-bold"
                        style={{
                          background: `${coin.color}22`,
                          border: `1px solid ${coin.color}44`,
                        }}
                      >
                        {coin.ticker.slice(0, 3)}
                      </div>
                      <span className="text-[0.78rem] font-semibold text-muted">
                        {coin.ticker}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-electric/20 bg-electric/[0.04] p-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Structured basket
                  </p>
                  <AllocationBar items={EXAMPLE_ALLOCATIONS} />
                </div>
              </TerminalShell>

              <div className="mt-4">
                <ChainPills />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
