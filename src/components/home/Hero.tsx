"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { homeBody, homeCta } from "@/components/home/homeRhythm";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-purple/18 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void via-void/80 to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-6 pt-[5rem] sm:pb-8 lg:pb-7 lg:pt-20">
        <motion.div
          className="mx-auto flex w-full max-w-[42rem] flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display mx-auto w-full max-w-[min(100%,40rem)] px-1 text-[clamp(1.85rem,5.4vw,3.55rem)] font-semibold tracking-[-0.04em]">
            <span className="block leading-[1.05] text-ink sm:whitespace-nowrap">
              One Portfolio
            </span>
            <span className="mt-1.5 block leading-[1.12] text-electric text-balance sm:mt-2 sm:whitespace-nowrap">
              Every Asset. Every Chain
            </span>
          </h1>

          <div
            className={`mx-auto mt-3 max-w-[22rem] space-y-0.5 sm:mt-3.5 sm:max-w-[28rem] ${homeBody}`}
          >
            <p className="text-balance sm:whitespace-nowrap">
              Hold real assets in your wallet. Set your rules once
            </p>
            <p className="text-balance sm:whitespace-nowrap">
              Automate every execution. Keep full control
            </p>
          </div>

          <div className="mx-auto mt-3.5 w-full max-w-[34rem] rounded-2xl border border-electric/40 bg-electric/[0.09] px-4 py-2.5 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14)] sm:mt-4 sm:px-5 sm:py-3">
            <p className="text-[0.9rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1rem]">
              Buy a multi-chain basket of crypto and tokenized assets in one
              action. Hold them in your wallet. Automate when to buy and sell.
            </p>
          </div>

          <div
            className="mx-auto mt-2.5 w-full max-w-[32rem] rounded-xl border border-electric/30 bg-white/[0.035] px-3 py-2 text-center sm:mt-3 sm:px-4 sm:py-2.5"
            aria-label="Fee structure highlights"
          >
            <p className="text-[0.82rem] font-semibold leading-none tracking-[-0.015em] text-ink whitespace-nowrap sm:text-[0.95rem]">
              0% Management · 0% Performance · 0% Exit
            </p>
            <p className="mt-1 text-[0.88rem] font-semibold leading-none tracking-[-0.01em] text-electric sm:mt-1.5 sm:text-[0.95rem]">
              Only 1% when trades execute
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col items-center justify-center sm:mt-5">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[18.5rem] sm:w-auto sm:max-w-none`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>

          <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink/80 text-balance sm:mt-3.5 sm:text-[0.78rem]">
            Non-Custodial · Revocable Permissions · No Admin Keys
          </p>

          <div className="mx-auto mt-3 w-full max-w-2xl rounded-2xl border border-electric/35 bg-electric/[0.08] px-4 py-3 text-center sm:mt-3.5 sm:px-5 sm:py-3.5">
            <p className="text-[0.92rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.02rem]">
              Your Keys · Your Assets · Your Permissions
            </p>
            <div className="mx-auto mt-1 max-w-xl space-y-0.5 text-[0.84rem] leading-snug text-ink/80 sm:text-[0.9rem]">
              <p>The protocol cannot withdraw your funds.</p>
              <p>You can revoke access at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
