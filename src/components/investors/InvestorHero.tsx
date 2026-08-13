"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH1,
  invLabel,
} from "@/components/investors/investorRhythm";

/** Live-feeling INDEXLA strategy panel for the hero — product UI, not a dashboard. */
function HeroStrategyPanel() {
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setPulse((p) => p + 1), 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const showExec = pulse % 2 === 1;

  return (
    <div className="rounded-[1.35rem] border border-line bg-deep/80 p-5 text-center sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`${invLabel} text-electric`}>Fear & Greed</p>
          <p className="display mt-1 text-[clamp(2.5rem,6vw,3.25rem)] leading-none tracking-[-0.04em] text-ink">
            19
          </p>
          <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-danger">
            Extreme Fear
          </p>
          <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Example market condition
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[0.75rem] font-semibold text-success">
            Strategy Active ✓
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between rounded-xl border border-line bg-void/55 px-4 py-3">
          <span className="text-[0.85rem] text-muted">Condition</span>
          <span className="text-[0.9rem] font-semibold text-ink">
            Fear & Greed &lt; 20
          </span>
        </div>
        <motion.div
          className="rounded-xl border border-electric/35 bg-electric/10 px-4 py-3"
          animate={
            reduce
              ? undefined
              : { borderColor: showExec ? "rgba(56,189,248,0.55)" : "rgba(56,189,248,0.25)" }
          }
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-electric">
                Rule activated
              </p>
              <p className="mt-1 display text-[1.25rem] tracking-[-0.02em] text-ink">
                DCA IN
              </p>
            </div>
            <p className="text-right text-[0.9rem] font-semibold text-ink">
              10%
              <span className="mt-0.5 block text-[0.75rem] font-medium text-muted">
                allocation
              </span>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="overflow-hidden rounded-xl border border-line bg-void/40"
          animate={reduce ? undefined : { opacity: showExec ? 1 : 0.55 }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[0.85rem] text-muted">Execution</span>
            <span
              className={`text-[0.85rem] font-semibold ${
                showExec ? "text-success" : "text-muted"
              }`}
            >
              {showExec ? "Coordinating…" : "Awaiting trigger"}
            </span>
          </div>
          {!reduce && showExec && (
            <motion.div
              className="h-0.5 bg-gradient-to-r from-electric via-success to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-12 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center text-[0.92rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </a>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

            <h1 className={`${invH1} leading-[1.08]`}>
              <span className="block">You Know What You Should Do.</span>
              <span className="mt-[0.18em] block gradient-text">
                You Just Don&apos;t.
              </span>
            </h1>

            <div className="mt-7 space-y-2">
              <p className={invBody}>Buy when fear is high.</p>
              <p className={invBody}>Take profits at euphoria.</p>
              <p className={invBody}>Rebalance when allocations drift.</p>
            </div>

            <p className={`mt-5 ${invBody}`}>
              Then the market moves — and you hesitate, chase, panic, and miss
              it.
            </p>

            <div className="mt-8">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  Stop letting emotions manage your portfolio.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Button
                href="/creators"
                className="min-w-[15rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
              >
                Build Your Automated Portfolio
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroStrategyPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
