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
      transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingPortfolio showBadge={false} />

      <div className="relative z-20 flex min-h-[100svh] flex-col items-center px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
        <motion.div
          className="mt-6 flex flex-col items-center sm:mt-8 lg:mt-10"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={LOGO_TRANSPARENT}
            alt="INDEXLA"
            width={72}
            height={72}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            priority
          />
          <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink/90">
            INDEXLA
          </p>
        </motion.div>

        {/* Spacer keeps CTA clear of floating bubbles */}
        <div className="flex flex-1 flex-col items-center justify-center py-8 sm:py-10">
          <motion.div
            className="relative z-30 mx-auto flex max-w-[22rem] flex-col items-center text-center sm:max-w-[28rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: reduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-void/55 px-6 py-7 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-10 sm:py-9">
              <h1 className="display text-[clamp(1.85rem,5.5vw,3.1rem)] font-semibold tracking-[-0.04em] text-ink text-balance">
                Build Your Portfolio
              </h1>
              <button
                type="button"
                onClick={onBuild}
                disabled={fading}
                className={`${homeCta} mt-7 inline-flex items-center justify-center rounded-2xl bg-electric font-semibold text-void transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:pointer-events-none sm:mt-8`}
              >
                Build Your Portfolio →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
