"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  stBody,
  stH1,
  stSurface,
} from "@/components/strategies/strategyRhythm";

const thesisChips = ["Programmable", "Automated", "Executed on-chain"] as const;

const flow = [
  { label: "Strategy", detail: "You define" },
  { label: "AI monitors", detail: "Conditions" },
  { label: "Execution", detail: "On-chain" },
] as const;

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />
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
            Stop Reacting.{" "}
            <span className="gradient-text">Start Following Rules.</span>
          </h1>

          <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-electric sm:text-[0.82rem]">
            AI-Automated Strategies.
          </p>

          <p className={`mx-auto mt-6 max-w-xl ${stBody} text-balance`}>
            Markets move through fear, greed, and euphoria.
          </p>

          <p className="mx-auto mt-5 max-w-2xl display text-[clamp(1.1rem,2.2vw,1.35rem)] leading-snug tracking-[-0.02em] text-ink text-balance">
            Define your strategy. INDEXLA monitors conditions and coordinates
            execution.
          </p>

          <div className="mt-8">
            <p className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
              Your thesis.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {thesisChips.map((chip, i) => (
                <div key={chip} className="flex items-center gap-2">
                  <span className="rounded-full border border-electric/30 bg-electric/[0.08] px-3.5 py-1.5 text-[0.88rem] font-semibold text-ink">
                    {chip}
                  </span>
                  {i < thesisChips.length - 1 && (
                    <span className="text-electric/40" aria-hidden>
                      ·
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`mx-auto mt-9 max-w-xl ${stSurface} px-4 py-4 sm:px-5`}>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {flow.map((step, i) => (
                <div key={step.label} className="relative text-center">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1.5 text-[0.88rem] font-semibold text-ink sm:text-[0.95rem]">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-[0.75rem] text-muted-dim">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
