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

      <div className="relative z-40 flex min-h-[100svh] flex-col items-center justify-center px-5 py-5 sm:px-8 sm:py-8">
        <motion.div
          className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-[30rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={LOGO_TRANSPARENT}
            alt="INDEXLA"
            width={520}
            height={208}
            className="h-[5.75rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:h-[8rem] md:h-[9.5rem]"
            priority
          />

          <h1 className="display mt-3 text-[clamp(1.85rem,6.6vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-ink sm:mt-5">
            <span className="block">Invest in Everything</span>
            <span className="block">Own Everything</span>
            <span className="block">Control Everything</span>
          </h1>

          <div className="mt-5 w-full rounded-[1.75rem] border border-white/[0.12] bg-void/90 px-5 py-4 shadow-[0_28px_72px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:mt-7 sm:px-7 sm:py-5">
            <button
              type="button"
              onClick={onBuild}
              disabled={fading}
              className={`${homeCta} w-full inline-flex items-center justify-center rounded-2xl bg-electric font-semibold text-void transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none`}
            >
              Build Your Portfolio
            </button>
            <p className="mt-3.5 text-[1.05rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1.15rem]">
              Click to enter
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
