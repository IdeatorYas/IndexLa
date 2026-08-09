"use client";

import { motion, useReducedMotion } from "framer-motion";

const features = [
  "Non-custodial",
  "On-chain execution",
  "Cross-chain execution",
  "Multi-asset",
] as const;

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display text-[clamp(2.15rem,5vw,3.55rem)] uppercase tracking-[-0.03em] text-balance">
            Stop Reacting To Markets.{" "}
            <span className="gradient-text">Start Following Rules.</span>
          </h1>

          <div className="mx-auto mt-6 max-w-xl space-y-2.5 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
            <p>Markets move 24/7.</p>
            <p>
              Fear. Greed. Momentum. Oversold conditions. Profit targets.
              Allocation drift.
            </p>
            <p>You don&apos;t need to predict every move.</p>
            <p>
              You need a predefined response when the conditions you care about
              appear.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-electric/40 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent px-5 py-5 sm:px-7 sm:py-6">
            <p className="display text-[clamp(1.05rem,2vw,1.3rem)] leading-snug text-ink text-balance">
              Your assets remain in your wallet. Strategy execution happens
              on-chain across supported networks.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex min-h-12 items-center justify-center rounded-xl border border-electric/30 bg-void/60 px-2.5 py-2.5 text-center"
                >
                  <span className="text-[0.78rem] font-semibold leading-snug tracking-[-0.01em] text-electric sm:text-[0.8rem]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
