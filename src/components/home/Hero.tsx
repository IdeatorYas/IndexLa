"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import {
  homeBody,
  homeBodyDim,
  homeCta,
  homeMeasure,
} from "@/components/home/homeRhythm";
import { Button } from "@/components/ui/Button";

const feeBoxes = [
  "0% Management",
  "0% Performance",
  "0% Exit",
  "1% Execution Fees",
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent"
        aria-hidden
      />

      <FloatingAssetUniverse />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-14 pt-28">
        <motion.div
          className="mx-auto w-full max-w-[48rem] text-center"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display mx-auto w-full max-w-full px-2 text-[clamp(1.75rem,5.2vw,4.35rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
            <span className="block text-ink">One Portfolio</span>
            <span className="gradient-text mt-[0.18em] block">
              Every Asset. Every Chain
            </span>
          </h1>

          <div className={`mt-7 space-y-4 ${homeMeasure} ${homeBody}`}>
            <p>
              Hold the real assets in your wallet. Set the rules once. Automate
              execution without giving up control.
            </p>
            <p className={homeBodyDim}>
              Build diversified portfolios across crypto and tokenized markets.
            </p>
          </div>

          <div
            className={`mt-8 ${homeMeasure}`}
            aria-label="Fee structure highlights"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {feeBoxes.map((label) => (
                <div
                  key={label}
                  className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-electric/20 bg-white/[0.035] px-3 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
                >
                  <p className="text-center text-[0.78rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.86rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.95rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1.02rem]">
              Only 1% When Trades Execute
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className={homeCta}>
              Reserve Early Access
            </Button>
          </div>

          <p className="mt-7 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted text-balance">
            Non-Custodial · Revocable Permissions · No Admin Keys
          </p>
        </motion.div>
      </div>
    </section>
  );
}
