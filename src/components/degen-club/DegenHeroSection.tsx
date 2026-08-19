"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AllocationBar,
  DegenCopy,
  DegenCta,
  MEME_COINS,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcBody, dcEyebrow } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

function HeroPortfolioVisual() {
  const reduce = useReducedMotion();

  return (
    <TerminalShell title="DEGEN CLUB · Portfolio Terminal">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative min-h-[220px] rounded-xl border border-line/80 bg-void/50 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            One coin → One shot
          </p>
          <div className="mt-6 flex justify-center">
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={reduce ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 text-[0.75rem] font-bold text-amber-300">
                PEPE
              </div>
              <p className="text-[0.78rem] font-semibold text-muted">Single position</p>
            </motion.div>
          </div>
        </div>

        <div className="relative rounded-xl border border-electric/25 bg-electric/[0.04] p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Portfolio → Multiple shots
          </p>
          <p className="mt-1 display text-[1rem] tracking-[-0.02em] text-ink">
            DEGEN CLUB Index
          </p>
          <div className="relative mt-4 h-28 sm:h-32">
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/20 bg-electric/5" />
            {MEME_COINS.slice(0, 6).map((coin, i) => (
              <motion.div
                key={coin.ticker}
                className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[0.5rem] font-bold"
                style={{
                  borderColor: `${coin.color}55`,
                  background: `${coin.color}18`,
                }}
                animate={
                  reduce
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 18 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div
                  style={{
                    transform: `translateX(${36 + i * 6}px)`,
                  }}
                >
                  {coin.ticker.slice(0, 3)}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <AllocationBar
              items={[
                { ticker: "PEPE", pct: 22 },
                { ticker: "WIF", pct: 18 },
                { ticker: "BONK", pct: 16 },
                { ticker: "FLOKI", pct: 14 },
                { ticker: "DOGE", pct: 30 },
              ]}
            />
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}

export function DegenHeroSection({ section }: { section: DegenSection }) {
  const reduce = useReducedMotion();
  const copyBlocks = section.blocks.filter((b) => b.type !== "cta");
  const cta = section.blocks.find((b) => b.type === "cta");

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,191,36,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-12 pt-[5.75rem] lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={dcEyebrow}>DEGEN CLUB</p>
            <DegenCopy blocks={copyBlocks} className="mt-4 space-y-4" />
            {cta?.type === "cta" ? (
              <div className="mt-8">
                <DegenCta label={cta.text} />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <HeroPortfolioVisual />
            <p className={`mt-4 text-center ${dcBody} text-[0.88rem] text-muted-dim`}>
              Visual representation only. Logos do not imply endorsement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
