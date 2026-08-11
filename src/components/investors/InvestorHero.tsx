"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  HERO_CYCLE_PHASES,
  MarketCycleVisual,
} from "@/components/investors/MarketCycleVisual";
import { invBody, invGreenBox, invGreenText } from "@/components/investors/investorRhythm";

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-18 md:pt-32 lg:min-h-[92vh] lg:pb-20">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

            <h1 className="display text-[clamp(2.15rem,5.5vw,3.85rem)] uppercase tracking-[-0.03em] text-balance leading-[1.05]">
              You Know What You Should Do.{" "}
              <span className="gradient-text">You Just Don&apos;t Do It.</span>
            </h1>

            <div className="mt-7 space-y-1.5">
              <p className={invBody}>Buy when fear is high.</p>
              <p className={invBody}>Take profits when markets become euphoric.</p>
              <p className={invBody}>Rebalance when your portfolio drifts.</p>
            </div>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
              Then the market moves.
            </p>
            <p className="mt-2 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
              You hesitate. You chase. You panic. You miss the moment.
            </p>

            <div className="mt-8">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  Stop letting emotions manage your portfolio.
                </p>
              </div>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
                Define your rules when you&apos;re calm. Let INDEXLA coordinate
                execution when the market moves.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/creators" className="min-w-[13.5rem]">
                Build Your First Portfolio
              </Button>
              <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
                Explore Marketplace
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.5rem] border border-line/80 bg-deep/60 p-6 sm:p-8">
              <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Market Psychology
              </p>
              <MarketCycleVisual
                phases={HERO_CYCLE_PHASES}
                variant="hero"
                className="mt-4"
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em]">
                <span className="rounded-full border border-danger/40 bg-danger/10 px-3 py-1 text-danger/90">
                  Fear
                </span>
                <span className="text-muted-dim" aria-hidden>
                  →
                </span>
                <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 text-electric">
                  Recovery
                </span>
                <span className="text-muted-dim" aria-hidden>
                  →
                </span>
                <span className="rounded-full border border-purple/40 bg-purple/10 px-3 py-1 text-purple-bright">
                  Greed
                </span>
                <span className="text-muted-dim" aria-hidden>
                  →
                </span>
                <span className="rounded-full border border-purple/40 bg-purple/10 px-3 py-1 text-purple">
                  Euphoria
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
