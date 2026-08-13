"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import {
  homeBody,
  homeBodyDim,
  homeCta,
} from "@/components/home/homeRhythm";
import { Button } from "@/components/ui/Button";
import { LOGO_TRANSPARENT } from "@/lib/site";

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

      {/* Subtle INDEXLA brand mark — premium, non-decorative clutter */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] z-[1] hidden -translate-x-1/2 opacity-[0.07] sm:block"
        aria-hidden
      >
        <Image
          src={LOGO_TRANSPARENT}
          alt=""
          width={220}
          height={220}
          className="h-auto w-[min(28vw,220px)] select-none"
          priority={false}
        />
      </div>

      <FloatingAssetUniverse />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-14 pt-28 sm:pb-16">
        <motion.div
          className="mx-auto flex w-full max-w-[46rem] flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent sm:mb-9" />

          <h1 className="display mx-auto w-full max-w-[min(100%,42rem)] px-1 text-[clamp(1.95rem,6.8vw,4.5rem)] font-semibold tracking-[-0.04em]">
            <span className="block leading-[1.05] text-ink sm:whitespace-nowrap">
              One Portfolio
            </span>
            <span className="mt-3 block leading-[1.15] text-electric text-balance sm:mt-3.5 sm:whitespace-nowrap sm:text-pretty">
              Every Asset. Every Chain
            </span>
          </h1>

          <div
            className={`mx-auto mt-7 max-w-[22.5rem] space-y-3 sm:mt-8 sm:max-w-[26rem] ${homeBody}`}
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
            className="mx-auto mt-8 w-full max-w-[36rem] sm:mt-9"
            aria-label="Fee structure highlights"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {feeBoxes.map((label) => (
                <div
                  key={label}
                  className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-electric/25 bg-white/[0.04] px-2.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:min-h-[4.5rem]"
                >
                  <p className="text-center text-[0.78rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.88rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.92rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1rem]">
              Only 1% When Trades Execute
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col items-center justify-center sm:mt-10">
            <Button
              href="/creators"
              className={`${homeCta} w-full max-w-[20rem] sm:w-auto`}
            >
              Reserve Early Access
            </Button>
          </div>

          <p className="mt-6 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-ink/80 text-balance sm:mt-7 sm:text-[0.88rem]">
            Non-Custodial · Revocable Permissions · No Admin Keys
          </p>

          <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-electric/45 bg-electric/[0.11] px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.18),0_0_40px_rgba(56,189,248,0.08)] sm:mt-10 sm:px-8 sm:py-7">
            <p className="text-[1.08rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.25rem]">
              Your Keys · Your Assets · Your Permissions
            </p>
            <div className="mx-auto mt-3.5 max-w-xl space-y-2 text-[0.98rem] leading-relaxed text-ink/85 sm:mt-4 sm:text-[1.05rem]">
              <p>The protocol cannot withdraw your funds.</p>
              <p>You can revoke access at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
