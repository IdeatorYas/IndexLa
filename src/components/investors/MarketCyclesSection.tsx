"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const phases = [
  {
    market: "Bear Market",
    action: "Accumulate",
    detail: "Accumulate through DCA",
    tone: "border-danger/35 bg-danger/[0.07]",
    actionTone: "text-danger border-danger/30 bg-danger/10",
  },
  {
    market: "Recovery",
    action: "Build Position",
    detail: "Continue building your position",
    tone: "border-electric/35 bg-electric/[0.07]",
    actionTone: "text-electric border-electric/30 bg-electric/10",
  },
  {
    market: "Bull Market",
    action: "DCA Out",
    detail: "Begin taking profits through DCA out",
    tone: "border-purple/35 bg-purple/[0.08]",
    actionTone: "text-purple-bright border-purple/30 bg-purple/10",
  },
  {
    market: "Euphoria",
    action: "Increase Profit Taking",
    detail: "Increase profit taking",
    tone: "border-success/35 bg-success/[0.07]",
    actionTone: "text-success border-success/30 bg-success/10",
  },
];

export function MarketCyclesSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} overflow-hidden bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-30" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Markets Move In Cycles.{" "}
            <span className="gradient-text">
              You Don&apos;t Need To Time The Top Or The Bottom.
            </span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Markets move through bear markets, recovery, bull markets, and
            euphoria.
          </p>
          <p className={`mt-3 ${invBody}`}>
            You don&apos;t need to predict every turning point. You need a
            strategy that responds as the cycle changes.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.05}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-deep/70">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  Market Cycle Sheet
                </p>
                <p className="mt-1 display text-[1.1rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                  Phase → INDEXLA Response
                </p>
              </div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Rule-based · Non-predictive
              </p>
            </div>

            <div className="hidden gap-3 p-6 md:grid md:grid-cols-4">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.market}
                  className={`relative rounded-2xl border p-4 ${phase.tone}`}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 display text-[1.05rem] tracking-[-0.02em] text-ink">
                    {phase.market}
                  </p>
                  <p className="mt-1 text-[0.82rem] leading-snug text-muted">
                    {phase.detail}
                  </p>
                  <div
                    className={`mt-4 rounded-lg border px-2.5 py-2 text-center text-[0.78rem] font-semibold leading-snug ${phase.actionTone}`}
                  >
                    {phase.action}
                  </div>
                  {i < phases.length - 1 && (
                    <span
                      className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-electric/50 lg:block"
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <ul className="divide-y divide-line md:hidden">
              {phases.map((phase, i) => (
                <li key={phase.market} className="flex items-center gap-4 px-5 py-4">
                  <span className="display shrink-0 text-[1.1rem] gradient-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{phase.market}</p>
                    <p className="text-[0.85rem] text-muted">{phase.detail}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[0.72rem] font-semibold ${phase.actionTone}`}
                  >
                    {phase.action}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl space-y-3 text-center">
          <p className={invBodyStrong}>
            Build your strategy when you&apos;re calm.
          </p>
          <p className={invBodyStrong}>
            Let INDEXLA execute before emotions take over.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                You don&apos;t need to predict the cycle.
              </p>
            </div>
            <div className={invGreenBox}>
              <p className={invGreenText}>You need to be prepared for it.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
