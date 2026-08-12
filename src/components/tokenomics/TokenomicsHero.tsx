"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tkBody, tkH1 } from "@/components/tokenomics/tokenomicsRhythm";

export function TokenomicsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-24 pb-10 md:pb-12 md:pt-28">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />

      <div className="section-pad container-max relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-5 h-px w-12 bg-gradient-to-r from-transparent via-electric/80 to-transparent" />

          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-electric">
            $DEXLA
          </p>

          <h1 className={`mt-3 ${tkH1}`}>
            The Economic Engine{" "}
            <span className="gradient-text">Of INDEXLA</span>
          </h1>

          <div className={`mx-auto mt-5 max-w-xl space-y-2 ${tkBody}`}>
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
        </motion.div>

        {/* Self-contained 4×4 signature — never splits across sections */}
        <motion.div
          className="mx-auto mt-8 max-w-xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border border-white/[0.1] bg-deep/70 px-3 py-4 sm:px-5 sm:py-5">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="border border-success/35 bg-success/[0.08] px-2.5 py-3.5 text-center sm:px-4 sm:py-4">
                <p className="display text-[clamp(1.85rem,4.5vw,2.5rem)] leading-none tracking-[-0.04em] text-success">
                  4
                </p>
                <p className="mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-success sm:text-[0.75rem]">
                  Core Utilities
                </p>
              </div>
              <div className="border border-danger/35 bg-danger/[0.08] px-2.5 py-3.5 text-center sm:px-4 sm:py-4">
                <p className="display text-[clamp(1.85rem,4.5vw,2.5rem)] leading-none tracking-[-0.04em] text-danger">
                  4
                </p>
                <p className="mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-danger sm:text-[0.75rem]">
                  Burn Mechanisms
                </p>
              </div>
            </div>

            <p className="mt-3.5 text-center display text-[0.88rem] tracking-[-0.01em] text-ink sm:text-[1rem]">
              <span className="text-success">4 Core Utilities</span>
              <span className="mx-2 text-muted-dim">·</span>
              <span className="text-danger">4 Burn Mechanisms</span>
            </p>

            <p className="mt-2 text-center text-[0.85rem] leading-snug text-muted text-balance">
              More creators. More portfolios. More activity. More reasons to use
              $DEXLA.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
