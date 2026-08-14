"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import { homeBody, homeCta } from "@/components/home/homeRhythm";
import { LOGO_TRANSPARENT } from "@/lib/site";

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

      <div
        className="pointer-events-none absolute left-1/2 top-[16%] z-[1] hidden -translate-x-1/2 opacity-[0.06] lg:block"
        aria-hidden
      >
        <Image
          src={LOGO_TRANSPARENT}
          alt=""
          width={200}
          height={200}
          className="h-auto w-[min(22vw,200px)] select-none"
          priority={false}
        />
      </div>

      <FloatingAssetUniverse />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-8 pt-[5.75rem] sm:pb-10 lg:pb-12 lg:pt-24">
        <motion.div
          className="mx-auto flex w-full max-w-[42rem] flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display mx-auto w-full max-w-[min(100%,40rem)] px-1 text-[clamp(1.85rem,5.4vw,3.85rem)] font-semibold tracking-[-0.04em]">
            <span className="block leading-[1.05] text-ink sm:whitespace-nowrap">
              One Portfolio
            </span>
            <span className="mt-2 block leading-[1.12] text-electric text-balance sm:mt-2.5 sm:whitespace-nowrap">
              Every Asset. Every Chain
            </span>
          </h1>

          <div
            className={`mx-auto mt-4 max-w-[22rem] space-y-1 sm:mt-5 sm:max-w-[28rem] ${homeBody}`}
          >
            <p className="text-balance sm:whitespace-nowrap">
              Hold real assets in your wallet. Set your rules once
            </p>
            <p className="text-balance sm:whitespace-nowrap">
              Automate every execution. Keep full control
            </p>
          </div>

          <div className="mx-auto mt-5 w-full max-w-[34rem] rounded-2xl border border-electric/40 bg-electric/[0.09] px-4 py-3.5 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14)] sm:mt-6 sm:px-6 sm:py-4">
            <p className="text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.08rem]">
              Buy a multi-chain basket of crypto and tokenized assets in one
              action. Hold them in your wallet. Automate when to buy and sell.
            </p>
          </div>

          <div
            className="mx-auto mt-3.5 w-full max-w-[32rem] rounded-2xl border border-electric/30 bg-white/[0.035] px-4 py-3.5 text-center sm:mt-4 sm:px-6 sm:py-4"
            aria-label="Fee structure highlights"
          >
            <p className="text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.02rem]">
              0% Management · 0% Performance · 0% Exit
            </p>
            <p className="mt-1.5 text-[0.98rem] font-semibold tracking-[-0.01em] text-electric sm:text-[1.05rem]">
              Only 1% when trades execute
            </p>
          </div>

          <div className="mt-6 flex w-full flex-col items-center justify-center sm:mt-7">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[18.5rem] sm:w-auto sm:max-w-none`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>

          <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink/80 text-balance sm:mt-5 sm:text-[0.84rem]">
            Non-Custodial · Revocable Permissions · No Admin Keys
          </p>

          <div className="mx-auto mt-4 w-full max-w-2xl rounded-2xl border border-electric/35 bg-electric/[0.08] px-4 py-4 text-center sm:mt-5 sm:px-6 sm:py-5">
            <p className="text-[1rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.12rem]">
              Your Keys · Your Assets · Your Permissions
            </p>
            <div className="mx-auto mt-2 max-w-xl space-y-1 text-[0.9rem] leading-relaxed text-ink/80 sm:text-[0.98rem]">
              <p>The protocol cannot withdraw your funds.</p>
              <p>You can revoke access at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
