"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingPortfolio } from "@/components/home/hero/FloatingPortfolio";
import { homeCta } from "@/components/home/homeRhythm";
import { LOGO_TRANSPARENT } from "@/lib/site";

type RevealScreen1Props = {
  onBuild: () => void;
  fading?: boolean;
  reduceMotion?: boolean;
};

export function RevealScreen1({
  onBuild,
  fading = false,
  reduceMotion = false,
}: RevealScreen1Props) {
  return (
    <motion.div
      className={`absolute inset-0 overflow-x-hidden ${fading ? "pointer-events-none" : ""}`}
      animate={{
        opacity: fading ? 0 : 1,
        scale: fading && !reduceMotion ? 0.985 : 1,
        filter: fading && !reduceMotion ? "blur(6px)" : "blur(0px)",
      }}
      transition={{ duration: reduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingPortfolio showBadge={false} variant="reveal" />

      {/*
        Mobile: logo mid-screen; headline directly above CTA at bottom.
        Desktop (md+): unchanged centered stack.
      */}
      <div className="relative z-40 flex min-h-[100svh] flex-col items-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] md:justify-center md:px-10 md:py-10">
        {/* Mobile only — top field for floating assets */}
        <div className="min-h-[3.5rem] flex-1 md:hidden" aria-hidden />

        <motion.div
          className="mx-auto flex w-full max-w-[21rem] flex-col items-center text-center md:max-w-[32rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={LOGO_TRANSPARENT}
            alt="INDEXLA"
            width={520}
            height={208}
            className="mx-auto h-[5.5rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] md:h-[8.75rem]"
            priority
          />

          {/* Desktop: headline under logo. Mobile: headline sits with CTA below. */}
          <h1 className="display mt-5 hidden w-full text-center text-[0.95rem] font-semibold leading-[1.35] tracking-[0.1em] text-ink md:block">
            DECENTRALIZED PORTFOLIO MANAGEMENT
          </h1>
        </motion.div>

        {/* Mobile only — mid field around logo for floating assets */}
        <div className="min-h-[4.5rem] flex-1 md:hidden" aria-hidden />

        <motion.div
          className="mx-auto mb-1 w-full max-w-[21rem] md:mt-7 md:mb-0 md:max-w-[32rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display mb-3.5 w-full text-center text-[0.8rem] font-semibold leading-[1.35] tracking-[0.07em] text-ink md:hidden">
            DECENTRALIZED PORTFOLIO MANAGEMENT
          </h1>

          <div className="w-full rounded-[1.35rem] border border-white/[0.12] bg-void/90 px-3.5 py-3 text-center shadow-[0_28px_72px_rgba(0,0,0,0.65)] backdrop-blur-xl md:rounded-[1.75rem] md:px-7 md:py-5">
            <button
              type="button"
              onClick={onBuild}
              disabled={fading}
              className={`${homeCta} w-full inline-flex items-center justify-center rounded-2xl bg-electric font-semibold text-void transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none`}
            >
              Build Your Portfolio
            </button>
            <p className="mt-2.5 text-[0.9rem] font-semibold tracking-[-0.01em] text-muted md:mt-3.5 md:text-[1.1rem]">
              Click to enter
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
