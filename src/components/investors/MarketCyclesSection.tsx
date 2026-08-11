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
    action: "DCA IN",
    detail: "Accumulate through DCA",
    tone: "border-danger/35 bg-danger/[0.07]",
    actionTone: "text-danger border-danger/30 bg-danger/10",
  },
  {
    market: "Recovery",
    action: "Build Position",
    detail: "Continue building",
    tone: "border-electric/35 bg-electric/[0.07]",
    actionTone: "text-electric border-electric/30 bg-electric/10",
  },
  {
    market: "Bull Market",
    action: "DCA OUT",
    detail: "Begin taking profits",
    tone: "border-purple/35 bg-purple/[0.08]",
    actionTone: "text-purple-bright border-purple/30 bg-purple/10",
  },
  {
    market: "Euphoria",
    action: "Increase Profit Taking",
    detail: "Scale out faster",
    tone: "border-purple-bright/40 bg-purple-bright/[0.08]",
    actionTone: "text-ink border-success/35 bg-success/10",
  },
  {
    market: "Next Cycle",
    action: "Repeat",
    detail: "Rules already defined",
    tone: "border-success/35 bg-success/[0.07]",
    actionTone: "text-success border-success/30 bg-success/10",
  },
];

export function MarketCyclesSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} overflow-hidden bg-deep`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />
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

        {/* Institutional cycle sheet */}
        <FadeIn className="mt-10" delay={0.05}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-void/55">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  INDEXLA Cycle Map
                </p>
                <p className="mt-1 display text-[1.1rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                  Market Phase → Strategy Response
                </p>
              </div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Rule-based · Non-predictive
              </p>
            </div>

            {/* Desktop horizontal flow */}
            <div className="hidden lg:block px-6 py-7">
              <div className="grid grid-cols-5 gap-3">
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
                    <p className="mt-1 text-[0.82rem] text-muted">{phase.detail}</p>
                    <div
                      className={`mt-4 rounded-lg border px-2.5 py-2 text-center text-[0.78rem] font-semibold leading-snug ${phase.actionTone}`}
                    >
                      {phase.action}
                    </div>
                    {i < phases.length - 1 && (
                      <span
                        className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-electric/50 xl:block"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile / tablet stacked */}
            <ul className="lg:hidden divide-y divide-line">
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

            <div className="border-t border-line bg-deep/40 px-5 py-4 sm:px-6">
              <p className="text-center text-[0.9rem] leading-relaxed text-muted">
                Bear Market →{" "}
                <span className="font-semibold text-ink">DCA IN</span>
                {" · "}
                Recovery →{" "}
                <span className="font-semibold text-ink">Build Position</span>
                {" · "}
                Bull Market →{" "}
                <span className="font-semibold text-ink">DCA OUT</span>
                {" · "}
                Euphoria →{" "}
                <span className="font-semibold text-ink">
                  Increase Profit Taking
                </span>
              </p>
            </div>
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
