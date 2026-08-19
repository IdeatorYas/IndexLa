"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  DegenCopy,
  DegenCta,
  MEME_COINS,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcEyebrow, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenFinalSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();
  const cta = section.blocks.find((b) => b.type === "cta");
  const copy = section.blocks.filter((b) => b.type !== "cta");

  return (
    <section className={`${dcSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(251,191,36,0.1),transparent_55%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <p className={dcEyebrow}>DEGEN CLUB</p>
            <DegenCopy blocks={copy.filter((b) => b.type === "h2")} className="mt-3" />
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="flex justify-center gap-4">
                <motion.div
                  className="rounded-2xl border border-success/30 bg-success/10 px-8 py-6 text-center"
                  animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <p className="display text-[2.5rem] text-success">100x</p>
                </motion.div>
                <motion.div
                  className="rounded-2xl border border-danger/35 bg-danger/10 px-8 py-6 text-center"
                  animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <p className="display text-[2.5rem] text-danger">0</p>
                </motion.div>
              </div>

              <TerminalShell title="Portfolio Philosophy">
                <div className="flex flex-wrap justify-center gap-2">
                  {MEME_COINS.slice(0, 6).map((c) => (
                    <div
                      key={c.ticker}
                      className="flex h-9 w-9 items-center justify-center rounded-full border text-[0.55rem] font-bold"
                      style={{
                        borderColor: `${c.color}55`,
                        background: `${c.color}15`,
                      }}
                    >
                      {c.ticker.slice(0, 3)}
                    </div>
                  ))}
                </div>
                <AllocationBar
                  items={[
                    { ticker: "PEPE", pct: 20 },
                    { ticker: "WIF", pct: 18 },
                    { ticker: "BONK", pct: 16 },
                    { ticker: "DOGE", pct: 22 },
                    { ticker: "FLOKI", pct: 24 },
                  ]}
                />
              </TerminalShell>
            </div>
          </FadeIn>

          <FadeIn className="mx-auto mt-10 max-w-2xl text-center">
            <DegenCopy
              blocks={copy.filter((b) => b.type === "p")}
            />
            {cta?.type === "cta" ? (
              <div className="mt-8 flex justify-center">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
