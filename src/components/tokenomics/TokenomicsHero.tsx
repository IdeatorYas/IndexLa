"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tkBody, tkH1 } from "@/components/tokenomics/tokenomicsRhythm";

export function TokenomicsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-24 pb-10 md:pb-12 md:pt-28">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />

      <div className="section-pad container-max relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-4 h-px w-10 bg-gradient-to-r from-transparent via-electric/80 to-transparent" />

          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-electric">
            $DEXLA
          </p>

          <h1 className={`mt-3 ${tkH1}`}>
            The Economic Engine{" "}
            <span className="gradient-text">Of INDEXLA</span>
          </h1>

          <div className={`mx-auto mt-4 max-w-xl space-y-1.5 ${tkBody}`}>
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

        {/* Compact 4×4 centerpiece — single surface, fully inside hero */}
        <motion.div
          className="mx-auto mt-7 max-w-lg"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden border border-white/[0.1] bg-panel/50 px-4 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:px-5 sm:py-4">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, rgba(52,211,153,0.07) 0%, transparent 42%, transparent 58%, rgba(248,113,113,0.07) 100%)",
              }}
              aria-hidden
            />

            <div className="relative flex items-stretch justify-center gap-0">
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-1 text-center sm:px-3">
                <p className="display text-[clamp(1.75rem,5vw,2.25rem)] leading-none tracking-[-0.04em] text-success">
                  4
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-success sm:text-[0.7rem]">
                  Core Utilities
                </p>
              </div>

              <div
                className="flex w-8 shrink-0 flex-col items-center justify-center sm:w-10"
                aria-hidden
              >
                <span className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />
                <span className="mt-1 display text-[0.85rem] text-muted-dim">·</span>
                <span className="mt-1 h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-1 text-center sm:px-3">
                <p className="display text-[clamp(1.75rem,5vw,2.25rem)] leading-none tracking-[-0.04em] text-danger">
                  4
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-danger sm:text-[0.7rem]">
                  Burn Mechanisms
                </p>
              </div>
            </div>

            <p className="relative mt-3 border-t border-white/[0.07] pt-3 text-center text-[0.8rem] leading-snug text-muted text-balance sm:text-[0.85rem]">
              More creators. More portfolios. More activity. More reasons to use
              $DEXLA.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
