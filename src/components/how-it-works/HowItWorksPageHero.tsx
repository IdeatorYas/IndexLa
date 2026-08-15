"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  homeBody,
  homeBodyStrong,
  homeChip,
  homeH2,
} from "@/components/home/homeRhythm";
import { PRODUCT_FLOW_LABELS } from "@/components/how-it-works/simulator/types";

export function HowItWorksPageHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-20">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-center py-14 sm:py-16 lg:py-20">
        <motion.div
          className="mx-auto w-full max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={`${homeH2} uppercase`}>
            How It <span className="gradient-text">Works</span>
          </h1>

          <p className={`mx-auto mt-7 max-w-2xl ${homeBodyStrong}`}>
            Create your own portfolio or follow one. Set the rules once. Keep
            full custody. INDEXLA only executes when your conditions are met.
          </p>

          <div className="mx-auto mt-12 max-w-4xl rounded-[1.25rem] border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-4 py-7 sm:px-8 sm:py-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Product Flow
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2.5 sm:gap-x-2 sm:gap-y-3">
              {PRODUCT_FLOW_LABELS.map((item, i) => (
                <div key={item} className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`${homeChip} !px-2.5 !py-1.5 !text-[0.68rem] sm:!px-3 sm:!text-[0.72rem]`}
                  >
                    {item}
                  </span>
                  {i < PRODUCT_FLOW_LABELS.length - 1 ? (
                    <span className="text-electric/80" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <p className={`mx-auto mt-12 max-w-2xl ${homeBody} text-balance`}>
            Explore the full experience below. No wallet. No real transactions.
          </p>
        </motion.div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        aria-hidden
      />
    </section>
  );
}
