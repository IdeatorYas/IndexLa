"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
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
    <div className="rounded-[1.25rem] border border-line bg-deep/80 p-4 text-center sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          Strategy preview
        </p>
        <p className="rounded-full border border-line bg-void/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Example
        </p>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`${invLabel} text-electric`}>Fear & Greed</p>
          <p className="display mt-1 text-[clamp(2.15rem,5vw,2.85rem)] leading-none tracking-[-0.04em] text-ink">
            19
          </p>
          <p className="mt-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-danger">
            Extreme Fear
          </p>
          <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
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

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-xl border border-line bg-void/55 px-3.5 py-2.5">
          <span className="text-[0.85rem] text-muted">Condition</span>
          <span className="text-[0.9rem] font-semibold text-ink">
            Fear & Greed &lt; 20
          </span>
        </div>
        <motion.div
          className="rounded-xl border border-electric/35 bg-electric/10 px-3.5 py-2.5"
          animate={
            reduce
              ? undefined
              : {
                  borderColor: showExec
                    ? "rgba(56,189,248,0.55)"
                    : "rgba(56,189,248,0.25)",
                }
          }
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                Rule activated
              </p>
              <p className="mt-0.5 display text-[1.15rem] tracking-[-0.02em] text-ink">
                DCA IN
              </p>
            </div>
            <p className="text-right text-[0.9rem] font-semibold text-ink">
              10%
              <span className="mt-0.5 block text-[0.72rem] font-medium text-muted">
                allocation
              </span>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="overflow-hidden rounded-xl border border-line bg-void/40"
          animate={reduce ? undefined : { opacity: showExec ? 1 : 0.55 }}
        >
          <div className="flex items-center justify-between px-3.5 py-2.5">
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
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <div className="mb-4 lg:mb-5">
          <Link
            href="/"
            className="inline-flex items-center text-[0.9rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </Link>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${invH1} text-[clamp(2rem,5.2vw,3.65rem)] leading-[1.06]`}>
              <span className="block">You Know What You Should Do.</span>
              <span className="mt-[0.14em] block gradient-text">
                You Just Don&apos;t.
              </span>
            </h1>

            <div className="mt-5 space-y-1.5 lg:mt-6">
              <p className={invBody}>Buy when fear is high.</p>
              <p className={invBody}>Take profits at euphoria.</p>
              <p className={invBody}>Rebalance when allocations drift.</p>
            </div>

            <p className={`mt-4 ${invBody}`}>
              Then the market moves — and you hesitate, chase, panic, and miss
              it.
            </p>

            <div className="mt-5 lg:mt-6">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  Stop letting emotions manage your portfolio.
                </p>
              </div>
            </div>

            <p className={`mt-4 max-w-xl ${invBody} text-pretty`}>
              Your assets stay in your wallet. The protocol cannot withdraw your
              funds.
            </p>

            <div className="mt-6 lg:mt-7">
              <EarlyAccessCta className="min-w-[14.5rem] px-7 py-3.5 text-[1rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]">
                Build Your Automated Portfolio
              </EarlyAccessCta>
            </div>
          </motion.div>

          <motion.div
            className="lg:self-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroStrategyPanel />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 max-w-2xl space-y-3 border-t border-line/70 pt-7 lg:mt-10 lg:pt-8"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={`${invBody} text-pretty`}>
            You want one action to buy crypto and tokenized assets across
            different chains. You want to hold the actual assets in your own
            wallet — not a wrapper. You want to automate Buy Fear / Sell Greed
            rules without giving up control.
          </p>
          <p className="text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink text-pretty sm:text-[1.28rem]">
            One action. Real assets. Your wallet. Your rules.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
