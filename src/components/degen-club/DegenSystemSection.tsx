"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenBlock, DegenSection } from "@/lib/degen-club";

function SystemBlock({ block }: { block: DegenBlock }) {
  if (block.type === "h3") {
    return (
      <h3 className="display text-[1.05rem] font-semibold uppercase tracking-[0.08em] text-ink">
        {block.text}
      </h3>
    );
  }
  if (block.text === "↓") {
    return (
      <p className="py-1 text-center text-[1rem] text-electric/70" aria-hidden>
        ↓
      </p>
    );
  }
  return (
    <p className="text-[0.98rem] leading-relaxed text-muted">{block.text}</p>
  );
}

export function DegenSystemSection({ section }: { section: DegenSection }) {
  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
          </FadeIn>

          <FadeIn className="mt-10 space-y-3 rounded-2xl border border-line bg-void/45 p-6 sm:p-8">
            {section.blocks.map((block, i) => (
              <SystemBlock key={`${block.type}-${i}`} block={block} />
            ))}
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="rounded-2xl border border-line bg-void/50 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Portfolio lifecycle
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { t: "PEPE", s: "↑" },
                  { t: "WIF", s: "→" },
                  { t: "BONK", s: "↓" },
                  { t: "MOG", s: "↓" },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="rounded-lg border border-line bg-deep/60 px-3 py-2 text-center text-[0.82rem]"
                  >
                    <span className="font-semibold text-ink">{row.t}</span>{" "}
                    <span className="text-electric">{row.s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[0.82rem] font-semibold">
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
