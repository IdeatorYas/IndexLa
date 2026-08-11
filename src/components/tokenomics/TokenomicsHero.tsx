"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  tkBody,
  tkH1,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

export function TokenomicsHero() {
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

          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-electric">
            $DEXLA
          </p>

          <h1 className={`mt-4 ${tkH1}`}>
            The Economic Engine{" "}
            <span className="gradient-text">Of INDEXLA</span>
          </h1>

          <div className={`mx-auto mt-7 max-w-xl space-y-3 ${tkBody}`}>
            <p>Most tokens are built around speculation.</p>
            <p className="font-semibold text-ink">
              $DEXLA is built around INDEXLA usage.
            </p>
            <p className="text-balance">
              The token connects creators, investors, and platform activity
              through four practical utilities and four permanent
              supply-reduction mechanisms.
            </p>
          </div>

          <div className={`mx-auto mt-9 max-w-md ${tkSurface} px-5 py-4`}>
            <p className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
              4 Utilities · 4 Burn Mechanisms
            </p>
            <p className="mt-2 text-[0.95rem] text-muted text-balance">
              More creators. More portfolios. More activity. More reasons to use
              $DEXLA.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
