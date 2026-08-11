"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  stBody,
  stH1,
  stSurface,
} from "@/components/strategies/strategyRhythm";

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-7 h-px w-12 bg-gradient-to-r from-transparent via-electric/80 to-transparent" />

          <h1 className={stH1}>
            Stop Reacting To Markets.{" "}
            <span className="gradient-text">Start Following Rules.</span>
          </h1>

          <div className={`mx-auto mt-7 max-w-2xl space-y-3 ${stBody}`}>
            <p>Markets move 24/7.</p>
            <p className="text-balance">
              Fear. Greed. Momentum. Oversold conditions. Profit targets.
              Allocation drift.
            </p>
            <p>You don&apos;t need to predict every move.</p>
            <p className="text-balance">
              You need a predefined response when the conditions you care about
              appear.
            </p>
          </div>

          <div className={`mx-auto mt-9 max-w-2xl ${stSurface} px-5 py-5 sm:px-7 sm:py-6`}>
            <p className="display text-[clamp(1.05rem,2vw,1.28rem)] leading-snug tracking-[-0.02em] text-ink text-balance">
              Your assets remain in your wallet. Strategy execution happens
              on-chain across supported networks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
