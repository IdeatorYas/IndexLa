"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  stBody,
  stH1,
  stSurface,
} from "@/components/strategies/strategyRhythm";

const executionSteps = [
  "Programmable",
  "Automated",
  "Executed on-chain",
] as const;

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={`${stH1} text-[clamp(2rem,5vw,3.55rem)]`}>
            <span className="block">Stop Reacting.</span>
            <span className="mt-[0.14em] block gradient-text">
              Start Following Rules.
            </span>
          </h1>

          <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-electric sm:text-[0.82rem]">
            AI-Automated Strategies.
          </p>

          <p className={`mx-auto mt-5 max-w-xl ${stBody} text-balance`}>
            Markets move through fear, greed, and euphoria.
          </p>

          <p className="mx-auto mt-4 max-w-2xl display text-[clamp(1.05rem,2vw,1.28rem)] leading-snug tracking-[-0.02em] text-ink text-balance">
            Define your strategy. INDEXLA monitors conditions and coordinates
            execution.
          </p>

          <div className={`mx-auto mt-8 max-w-lg ${stSurface}`}>
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Your Thesis
              </p>

              <div className="my-4 flex flex-col items-center" aria-hidden>
                <span className="h-6 w-px bg-gradient-to-b from-electric/70 to-electric/20" />
                <span className="mt-0.5 text-electric/70">↓</span>
              </div>

              <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-0">
                {executionSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 sm:gap-3">
                    <span className="rounded-xl border border-white/[0.1] bg-void/55 px-3.5 py-2.5 text-[0.9rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.95rem]">
                      {step}
                    </span>
                    {i < executionSteps.length - 1 && (
                      <span
                        className="hidden text-electric/45 sm:inline"
                        aria-hidden
                      >
                        ·
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
