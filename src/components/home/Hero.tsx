"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import {
  homeBody,
  homeBodyDim,
  homeCta,
} from "@/components/home/homeRhythm";
import { Button } from "@/components/ui/Button";

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

          <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold tracking-[-0.035em] text-balance text-pretty">
            <span className="gradient-text">One Portfolio. Every Asset. Every Chain.</span>
          </h1>

          <p className={`mx-auto mt-5 max-w-2xl sm:mt-6 ${homeBody}`}>
            Hold the real assets in your wallet. Set the rules once. Automate
            execution without giving up control.
          </p>

          <p
            className={`mx-auto mt-4 max-w-[38rem] text-center text-pretty ${homeBodyDim}`}
          >
            Build diversified portfolios across crypto and tokenized markets.
          </p>

          <div
            className="mx-auto mt-7 max-w-xl rounded-2xl border border-electric/20 bg-white/[0.035] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:px-6 sm:py-5"
            aria-label="Fee structure highlights"
          >
            <p className="text-center text-[0.92rem] font-semibold leading-snug tracking-[-0.01em] text-ink text-balance sm:text-[1.05rem]">
              0% Management · 0% Performance · 0% Exit · Only 1% When Trades
              Execute
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
