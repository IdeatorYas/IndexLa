"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH1,
  invLabel,
} from "@/components/investors/investorRhythm";

/** Hero psychology visual — intent vs behavior, not a market-cycle diagram. */
function PsychologyGapVisual() {
  const reduce = useReducedMotion();

  const rows = [
    { intent: "Buy the fear", behavior: "Hesitate" },
    { intent: "Take profits", behavior: "Chase" },
    { intent: "Rebalance", behavior: "Panic" },
  ];

  return (
    <div className="rounded-[1.35rem] border border-line bg-deep/70 p-5 sm:p-7">
      <p className={`${invLabel} text-electric`}>The investor gap</p>
      <p className="mt-2 display text-[1.2rem] tracking-[-0.02em] text-ink sm:text-[1.35rem]">
        You know the move. You miss the moment.
      </p>

      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 px-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          <span>Should do</span>
          <span className="w-8 text-center" aria-hidden />
          <span className="text-right">Actually do</span>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.intent}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
          >
            <span className="rounded-xl border border-success/30 bg-success/10 px-3 py-2.5 text-[0.9rem] font-semibold text-ink sm:text-[0.95rem]">
              {row.intent}
            </span>
            <span className="w-8 text-center text-muted-dim" aria-hidden>
              →
            </span>
            <span className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2.5 text-right text-[0.9rem] font-semibold text-ink sm:text-[0.95rem]">
              {row.behavior}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-electric/30 bg-electric/10 px-4 py-3 text-center">
        <p className="text-[0.9rem] font-semibold leading-snug text-ink sm:text-[0.95rem]">
          Rules close the gap. Automation keeps it closed.
        </p>
      </div>
    </div>
  );
}

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

            <h1 className={invH1}>
              You Know What You Should Do.{" "}
              <span className="gradient-text">You Just Don&apos;t Do It.</span>
            </h1>

            <div className="mt-7 space-y-1.5">
              <p className={invBody}>Buy when fear is high.</p>
              <p className={invBody}>Take profits when markets become euphoric.</p>
              <p className={invBody}>Rebalance when your portfolio drifts.</p>
            </div>

            <p className={`mt-5 ${invBody}`}>Then the market moves.</p>
            <p className={`mt-2 ${invBody}`}>
              You hesitate. You chase. You panic. You miss the moment.
            </p>

            <div className="mt-8">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  Stop letting emotions manage your portfolio.
                </p>
              </div>
              <p className={`mt-4 ${invBody}`}>
                Define your rules when you&apos;re calm. Let INDEXLA coordinate
                execution when the market moves.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/creators" className="min-w-[13.5rem]">
                Build Your First Portfolio
              </Button>
              <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
                Explore Marketplace
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <PsychologyGapVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
