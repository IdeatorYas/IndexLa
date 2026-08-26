"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { HeroRetailVsSmartMoney } from "@/components/investors/HeroRetailVsSmartMoney";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH1,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void lg:h-[100svh] lg:max-h-[100svh]">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex flex-col justify-start pb-5 pt-[4.35rem] lg:h-full lg:pb-4 lg:pt-[4.6rem]">
        <div className="mb-1.5 lg:mb-2">
          <Link
            href="/"
            className="inline-flex items-center text-[0.8rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </Link>
        </div>

        <div className="grid items-center gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[0.95fr_1.05fr] lg:gap-5 xl:gap-6">
          <motion.div
            className="min-w-0"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className={`${invH1} text-[clamp(1.7rem,3.8vw,2.75rem)] leading-[1.04]`}
            >
              <span className="block">You Know What You Should Do.</span>
              <span className="mt-[0.1em] block gradient-text">
                You Just Don&apos;t Do It.
              </span>
            </h1>

            <div className="mt-2.5 space-y-0.5 lg:mt-3">
              <p className={`${invBody} text-[0.92rem] leading-snug sm:text-[0.98rem]`}>
                Buy when fear is high.
              </p>
              <p className={`${invBody} text-[0.92rem] leading-snug sm:text-[0.98rem]`}>
                Take profits when markets become euphoric.
              </p>
              <p className={`${invBody} text-[0.92rem] leading-snug sm:text-[0.98rem]`}>
                Rebalance when allocations drift.
              </p>
            </div>

            <p className={`mt-2 ${invBody} text-[0.92rem] leading-snug sm:text-[0.98rem]`}>
              But when markets move, emotions take control.
            </p>

            <p className={`mt-1.5 ${invBody} text-[0.92rem] leading-snug sm:text-[0.98rem]`}>
              You hesitate. You chase. You panic. You miss the moment.
            </p>

            <div className="mt-2.5 lg:mt-3">
              <div className={`${invGreenBox} !px-4 !py-2.5`}>
                <p className={`${invGreenText} text-[0.88rem] sm:text-[0.95rem]`}>
                  Stop Letting Emotions Manage Your Capital.
                </p>
              </div>
            </div>

            <p
              className={`mt-2.5 max-w-xl ${invBody} text-[0.9rem] leading-snug text-pretty sm:text-[0.96rem]`}
            >
              Set your rules. INDEXLA executes only what you approve.
            </p>

            <div className="mt-3.5 lg:mt-4">
              <EarlyAccessCta
                className={`${homeCta} min-w-[13.5rem] px-6 py-3 text-[0.95rem] shadow-[0_14px_40px_rgba(59,130,246,0.34)]`}
              >
                Reserve Early Access
              </EarlyAccessCta>
            </div>
          </motion.div>

          <motion.div
            className="min-w-0 lg:self-center"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lg:origin-center lg:scale-[0.92] xl:scale-[0.96]">
              <HeroRetailVsSmartMoney />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
