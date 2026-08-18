"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DexlaEconomicEngine } from "@/components/tokenomics/TokenFlywheelSection";
import {
  tkBody,
  tkH1,
  tkHeroStatPanelBurn,
  tkHeroStatPanelUtility,
} from "@/components/tokenomics/tokenomicsRhythm";

export function TokenomicsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-35"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 mx-auto grid max-w-6xl items-center gap-10 pb-10 pt-[5.75rem] lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:pb-12 lg:pt-24 xl:gap-12">
        <motion.div
          className="text-center lg:text-left"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-electric">
            Tokenomics
          </p>

          <h1 className={`mt-3 ${tkH1}`}>
            <span className="gradient-text">$DEXLA</span>
          </h1>

          <p className="mt-4 display text-[clamp(1.15rem,2.8vw,1.55rem)] font-semibold tracking-[-0.025em] text-ink uppercase">
            The Economic Engine Of INDEXLA
          </p>

          <div className={`mx-auto mt-5 max-w-xl space-y-1.5 lg:mx-0 ${tkBody}`}>
            <p>Most tokens are built around speculation.</p>
            <p className="font-semibold text-ink">
              $DEXLA is built around INDEXLA usage.
            </p>
            <p className="text-balance">
              The token connects creators, investors, and platform activity
              through practical utilities and permanent supply-reduction
              mechanisms.
            </p>
          </div>

          <motion.div
            className="mx-auto mt-8 grid w-full max-w-2xl gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:mx-0"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={tkHeroStatPanelUtility}>
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,211,153,0.12), transparent 70%)",
                }}
                aria-hidden
              />
              <p className="relative display text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] text-success">
                5
              </p>
              <p className="relative mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-success sm:text-[0.78rem]">
                Token Utilities
              </p>
            </div>

            <div className={tkHeroStatPanelBurn}>
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(248,113,113,0.12), transparent 70%)",
                }}
                aria-hidden
              />
              <p className="relative display text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] text-danger">
                6
              </p>
              <p className="relative mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-danger sm:text-[0.78rem]">
                Burn Mechanisms
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <DexlaEconomicEngine />
        </motion.div>
      </div>
    </section>
  );
}
