"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const flywheel = [
  "Platform Activity",
  "Token Utility",
  "Burns",
  "Scarcity",
] as const;

export function TokenomicsHero() {
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
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-electric">
            Tokenomics
          </p>
          <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.45rem)] uppercase tracking-[-0.03em] text-balance">
            $DEXLA: The Engine Of The{" "}
            <span className="gradient-text">INDEXLA Ecosystem</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            $DEXLA connects the growth of INDEXLA to a token model driven by real
            platform activity.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            As the ecosystem grows, creator publishing and investor activity
            activate mechanisms that reduce supply and strengthen token utility.
          </p>
        </motion.div>

        <FadeIn className="mx-auto mt-10 max-w-4xl">
          <div className="rounded-[1.35rem] border border-line-strong glass-soft p-4 sm:p-6">
            <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              $DEXLA utility flywheel
            </p>
            <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
              {flywheel.map((step, i) => (
                <li
                  key={step}
                  className="flex flex-1 flex-col items-stretch sm:flex-row sm:items-stretch"
                >
                  <div className="flex min-h-[3.75rem] flex-1 items-center justify-center rounded-xl border border-electric/30 bg-electric/10 px-3 py-3 text-center sm:min-h-[4.25rem]">
                    <p className="display text-[0.98rem] tracking-[-0.02em] text-ink sm:text-[1.05rem]">
                      {step}
                    </p>
                  </div>
                  {i < flywheel.length - 1 && (
                    <span
                      className="flex shrink-0 items-center justify-center py-1 text-electric/50 sm:w-8 sm:px-0 sm:py-0"
                      aria-hidden
                    >
                      <span className="sm:hidden">↓</span>
                      <span className="hidden sm:inline">→</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[1.35rem] border border-electric/40 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent px-5 py-6 sm:px-8 sm:py-7">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Why This Model
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">
              $DEXLA is designed around usage, not inflationary incentives or
              speculative points systems.
            </p>
            <p className="display mt-5 text-[clamp(1.15rem,2.4vw,1.45rem)] leading-snug text-balance">
              More platform activity → More token utility →{" "}
              <span className="gradient-text">More supply removed</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
