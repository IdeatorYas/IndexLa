"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import {
  homeBody,
  homeBodyDim,
  homeCta,
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
          className="mx-auto w-full max-w-[46rem] text-center"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-9 h-px w-14 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display mx-auto flex w-full max-w-[min(100%,38rem)] flex-col items-center justify-center gap-3 px-2 text-[clamp(2rem,5.6vw,4.25rem)] font-semibold tracking-[-0.04em]">
            <span className="block leading-none text-ink">One Portfolio</span>
            <span className="gradient-text block leading-[1.12] text-center">
              Every Asset. Every Chain
            </span>
          </h1>

          <div
            className={`mx-auto mt-8 max-w-[24.5rem] space-y-3.5 sm:max-w-[27rem] ${homeBody}`}
          >
            <p>
              Hold the real assets in your wallet. Set the rules once. Automate
              execution without giving up control.
            </p>
            <p className={homeBodyDim}>
              Build diversified portfolios across crypto and tokenized markets.
            </p>
          </div>

          <div
            className="mx-auto mt-9 max-w-[36rem]"
            aria-label="Fee structure highlights"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {feeBoxes.map((label) => (
                <div
                  key={label}
                  className="flex min-h-[4.5rem] items-center justify-center rounded-xl border border-electric/25 bg-white/[0.04] px-2.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
                >
                  <p className="text-center text-[0.8rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.88rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.92rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1rem]">
              Only 1% When Trades Execute
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
