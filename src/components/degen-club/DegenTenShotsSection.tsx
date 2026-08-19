"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  DegenCopy,
  DegenSectionTitle,
  MemeCoinLogo,
} from "@/components/degen-club/DegenShared";
import { dcBodyStrong, dcSection } from "@/components/degen-club/degenRhythm";
import { HERO_SINGLE_COIN } from "@/components/degen-club/memeLogos";
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
            <DegenSectionTitle title={section.title} />
            <DegenCopy blocks={section.blocks} className="mx-auto mt-5 max-w-2xl text-center" />
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-danger/30 bg-danger/[0.04] p-6 sm:p-8">
                <p className="display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[-0.03em] text-danger/90">
                  1 Shot
                </p>
                <div className="mt-6 flex justify-center">
                  <MemeCoinLogo ticker={HERO_SINGLE_COIN} size="xl" />
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-success/30 bg-success/10 py-5 text-center">
                    <p className="display text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold text-success">
                      100x
                    </p>
                  </div>
                  <div className="rounded-xl border border-danger/40 bg-danger/10 py-5 text-center">
                    <p className="display text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold text-danger">
                      0
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-electric/30 bg-electric/[0.04] p-6 sm:p-8">
                <p className="display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase tracking-[-0.03em] text-electric">
                  10 Shots
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {BASKET_OUTCOMES.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-line bg-void/50 px-2 py-3.5 text-center"
                    >
                      <p className="text-[0.82rem] font-semibold text-muted sm:text-[0.88rem]">
                        {item.label}
                      </p>
                      <p className={`mt-1 text-[1.2rem] font-bold sm:text-[1.3rem] ${item.tone}`}>
                        {item.move}
                      </p>
                    </div>
                  ))}
                </div>
                <p className={`mt-6 text-center ${dcBodyStrong}`}>
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
