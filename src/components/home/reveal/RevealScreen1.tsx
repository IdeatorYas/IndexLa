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

      <div className="relative z-20 flex min-h-[100svh] flex-col items-center px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
        <motion.div
          className="relative z-40 mt-4 flex max-w-[34rem] flex-col items-center text-center sm:mt-6 lg:mt-8"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={LOGO_TRANSPARENT}
            alt="INDEXLA"
            width={420}
            height={168}
            className="h-[6.5rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:h-[8rem] md:h-[9.25rem]"
            priority
          />
          <h1 className="display mt-5 max-w-[20rem] text-[clamp(1.55rem,5.2vw,2.65rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-ink text-balance sm:mt-6 sm:max-w-[32rem]">
            Invest in Everything. Own Everything. Control Everything.
          </h1>
        </motion.div>

        <div className="relative z-40 flex flex-1 flex-col items-center justify-center py-8 sm:py-10">
          <motion.div
            className="mx-auto flex max-w-[22rem] flex-col items-center text-center sm:max-w-[26rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: reduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="rounded-[1.75rem] border border-white/[0.1] bg-void/80 px-7 py-7 shadow-[0_28px_72px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-10 sm:py-8">
              <button
                type="button"
                onClick={onBuild}
                disabled={fading}
                className={`${homeCta} inline-flex items-center justify-center rounded-2xl bg-electric font-semibold text-void transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none`}
              >
                Build Your Portfolio
              </button>
              <p className="mt-4 text-[0.98rem] font-semibold tracking-[-0.01em] text-muted sm:text-[1.08rem]">
                Click to enter
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
