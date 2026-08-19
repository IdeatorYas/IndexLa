"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FaqHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 pb-6 pt-[5.75rem] lg:pb-8 lg:pt-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)] uppercase tracking-[-0.03em]">
            FAQ
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.02rem]">
            Search or browse by category to find answers about INDEXLA, fees,
            $DEXLA, creators, security, and cross-chain execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
