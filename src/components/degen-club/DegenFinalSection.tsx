"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  DegenCopy,
  DegenCta,
  MemeCoinLogo,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcEyebrow, dcSection } from "@/components/degen-club/degenRhythm";
import { HERO_PORTFOLIO_COINS } from "@/components/degen-club/memeLogos";
import type { DegenSection } from "@/lib/degen-club";

export function DegenFinalSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();
  const cta = section.blocks.find((b) => b.type === "cta");
  const copy = section.blocks.filter((b) => b.type !== "cta");
  const h2Block = copy.filter((b) => b.type === "h2");
  const bodyBlocks = copy.filter((b) => b.type === "p");

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
            <DegenCopy blocks={h2Block} className="mt-3" />
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="flex justify-center gap-4 sm:gap-5">
                <motion.div
                  className="rounded-2xl border border-success/30 bg-success/10 px-8 py-6 text-center sm:px-10 sm:py-7"
                  animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <p className="display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold text-success">
                    100x
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-2xl border border-danger/35 bg-danger/10 px-8 py-6 text-center sm:px-10 sm:py-7"
                  animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <p className="display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold text-danger">
                    0
                  </p>
                </motion.div>
              </div>

              <TerminalShell title="Portfolio Philosophy">
                <div className="flex flex-wrap justify-center gap-2.5">
                  {HERO_PORTFOLIO_COINS.slice(0, 6).map((ticker) => (
                    <MemeCoinLogo key={ticker} ticker={ticker} size="md" />
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

          <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
            <DegenCopy blocks={bodyBlocks} />
            {cta?.type === "cta" ? (
              <div className="mt-7 flex justify-center">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
