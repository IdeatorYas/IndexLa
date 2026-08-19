"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { DegenCopy } from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

const BASKET_OUTCOMES = [
  { label: "Coin A", move: "↑", tone: "text-success" },
  { label: "Coin B", move: "↓", tone: "text-danger" },
  { label: "Coin C", move: "↑↑", tone: "text-success" },
  { label: "Coin D", move: "→", tone: "text-muted" },
  { label: "Coin E", move: "↓", tone: "text-danger" },
  { label: "Coin F", move: "↑", tone: "text-success" },
] as const;

export function DegenTenShotsSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(248,113,113,0.06),transparent_60%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
            <DegenCopy blocks={section.blocks} className="mx-auto mt-6 max-w-2xl text-center" />
          </FadeIn>

          <FadeIn className="mt-12">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-danger/30 bg-danger/[0.04] p-6 sm:p-8">
                <p className="display text-[clamp(2rem,4vw,3rem)] uppercase tracking-[-0.03em] text-danger/90">
                  1 Shot
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-danger/40 bg-danger/10 text-[0.85rem] font-bold text-ink">
                    MEME
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-success/30 bg-success/10 py-4 text-center">
                    <p className="display text-[1.75rem] text-success">100x</p>
                  </div>
                  <div className="rounded-xl border border-danger/40 bg-danger/10 py-4 text-center">
                    <p className="display text-[1.75rem] text-danger">0</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-electric/30 bg-electric/[0.04] p-6 sm:p-8">
                <p className="display text-[clamp(2rem,4vw,3rem)] uppercase tracking-[-0.03em] text-electric">
                  10 Shots
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {BASKET_OUTCOMES.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-line bg-void/50 px-2 py-3 text-center"
                    >
                      <p className="text-[0.72rem] font-semibold text-muted">{item.label}</p>
                      <p className={`mt-1 text-[1.1rem] font-bold ${item.tone}`}>
                        {item.move}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-[0.9rem] font-semibold text-muted">
                  Multiple opportunities. Managed downside.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
