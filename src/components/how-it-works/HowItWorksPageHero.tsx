"use client";

import { motion, useReducedMotion } from "framer-motion";
import { homeChip } from "@/components/home/homeRhythm";
import { PRODUCT_FLOW_LABELS } from "@/components/how-it-works/simulator/types";

export function HowItWorksPageHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-20">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20 sm:py-24 lg:py-28">
        <motion.div
          className="mx-auto w-full max-w-4xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display text-[clamp(2.4rem,6vw,4rem)] font-semibold uppercase tracking-[-0.035em] text-ink text-balance">
            How It <span className="gradient-text">Works</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold leading-[1.55] tracking-[-0.015em] text-ink text-pretty">
            <span className="block">
              Create your own portfolio. Set the rules once. Keep full custody.
            </span>
            <span className="mt-1.5 block">
              INDEXLA only executes when your conditions are met.
            </span>
          </p>

          <div className="mx-auto mt-14 max-w-4xl rounded-[1.35rem] border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-5 py-8 sm:px-10 sm:py-9">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Product Flow
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-2.5 sm:gap-y-3.5">
              {PRODUCT_FLOW_LABELS.map((item, i) => (
                <div key={item} className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`${homeChip} !px-3 !py-2 !text-[0.72rem] sm:!px-3.5 sm:!text-[0.78rem]`}
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

          <p className="mx-auto mt-14 max-w-2xl text-[clamp(1.05rem,1.8vw,1.2rem)] leading-relaxed text-muted text-balance">
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
