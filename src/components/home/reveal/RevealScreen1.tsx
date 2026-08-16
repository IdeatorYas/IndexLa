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
      className={`absolute inset-0 ${fading ? "pointer-events-none" : ""}`}
      animate={{
        opacity: fading ? 0 : 1,
        scale: fading && !reduceMotion ? 0.985 : 1,
        filter: fading && !reduceMotion ? "blur(6px)" : "blur(0px)",
      }}
      transition={{ duration: reduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingPortfolio showBadge={false} variant="reveal" />

      <div className="relative z-40 flex min-h-[100svh] flex-col items-center justify-between px-5 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8 sm:pb-10 sm:pt-6">
        <motion.div
          className="flex max-w-[36rem] flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={LOGO_TRANSPARENT}
            alt="INDEXLA"
            width={420}
            height={168}
            className="h-[5.75rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:h-[7.5rem] md:h-[8.75rem]"
            priority
          />
          <h1 className="display mt-4 max-w-[19rem] text-[clamp(1.7rem,5.8vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink text-balance sm:mt-5 sm:max-w-[34rem]">
            Invest in Everything. Own Everything. Control Everything.
          </h1>
        </motion.div>

        <motion.div
          className="mx-auto mb-2 flex w-full max-w-[22rem] flex-col items-center text-center sm:mb-4 sm:max-w-[24rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: reduceMotion ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="w-full rounded-[1.75rem] border border-white/[0.12] bg-void/88 px-6 py-6 shadow-[0_28px_72px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-8 sm:py-7">
            <button
              type="button"
              onClick={onBuild}
              disabled={fading}
              className={`${homeCta} w-full inline-flex items-center justify-center rounded-2xl bg-electric font-semibold text-void transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none`}
            >
              Build Your Portfolio
            </button>
            <p className="mt-4 text-[1.02rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1.12rem]">
              Click to enter
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
