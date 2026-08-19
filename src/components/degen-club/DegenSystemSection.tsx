"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { DegenSectionTitle, MemeCoinLogo } from "@/components/degen-club/DegenShared";
import { dcBody, dcH3, dcLabel, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenBlock, DegenSection } from "@/lib/degen-club";

function SystemBlock({ block }: { block: DegenBlock }) {
  if (block.type === "h3") {
    return (
      <h3 className={`${dcH3} uppercase tracking-[0.06em] text-ink`}>
        {block.text}
      </h3>
    );
  }
  if (block.text === "↓") {
    return (
      <p className="py-1 text-center text-[1.15rem] text-electric/70" aria-hidden>
        ↓
      </p>
    );
  }
  return <p className={dcBody}>{block.text}</p>;
}

export function DegenSystemSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <DegenSectionTitle title={section.title} />
          </FadeIn>

          <FadeIn className="mt-8 space-y-3 rounded-2xl border border-line bg-void/45 p-6 sm:p-8">
            {section.blocks.map((block, i) => (
              <SystemBlock key={`${block.type}-${i}`} block={block} />
            ))}
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="rounded-2xl border border-line bg-void/50 p-5">
              <p className={dcLabel}>Portfolio lifecycle</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { t: "PEPE", s: "↑" },
                  { t: "WIF", s: "→" },
                  { t: "BONK", s: "↓" },
                  { t: "SPX6900", s: "↓" },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="flex flex-col items-center gap-2 rounded-lg border border-line bg-deep/60 px-3 py-3"
                  >
                    <MemeCoinLogo ticker={row.t} size="sm" />
                    <span className={`${dcBody} text-[0.95rem] font-semibold text-ink`}>
                      {row.s}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[0.95rem] font-semibold sm:text-[1rem]">
                <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-amber-300">
                  ROTATION
                </span>
                <span className="text-muted-dim">→</span>
                <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 text-electric">
                  REBALANCE
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
