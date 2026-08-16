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

      <div className="relative z-40 flex min-h-[100svh] flex-col items-center justify-center px-5 py-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-10 md:py-10">
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
            className="mx-auto h-[4.85rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] md:h-[8.35rem]"
            priority
          />

          <h1 className="display mt-3 w-full text-center text-ink md:mt-5">
            <span className="block text-[1.2rem] font-semibold leading-[1.15] tracking-[0.14em] md:text-[1.85rem] md:tracking-[0.16em]">
              CAPITAL
            </span>
            <span className="mt-1.5 block text-[0.68rem] font-semibold leading-[1.35] tracking-[0.06em] text-ink/90 md:mt-2.5 md:text-[0.95rem] md:tracking-[0.1em]">
              DECENTRALIZED PORTFOLIO MANAGEMENT
            </span>
          </h1>

          <div className="mt-5 w-full rounded-[1.35rem] border border-white/[0.12] bg-void/90 px-3.5 py-3 text-center shadow-[0_28px_72px_rgba(0,0,0,0.65)] backdrop-blur-xl md:mt-7 md:rounded-[1.75rem] md:px-7 md:py-5">
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
