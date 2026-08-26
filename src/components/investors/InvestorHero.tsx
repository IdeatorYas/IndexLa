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
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-start pb-6 pt-[4.75rem] lg:justify-start lg:pb-8 lg:pt-[5.25rem]">
        <div className="mb-2.5 lg:mb-3">
          <Link
            href="/"
            className="inline-flex items-center text-[0.85rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </Link>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-7 xl:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className={`${invH1} text-[clamp(1.85rem,4.4vw,3.15rem)] leading-[1.05]`}
            >
              <span className="block">You Know What You Should Do.</span>
              <span className="mt-[0.12em] block gradient-text">
                You Just Don&apos;t Do It.
              </span>
            </h1>

            <div className="mt-3.5 space-y-1 lg:mt-4">
              <p className={`${invBody} text-[0.98rem] sm:text-[1.05rem]`}>
                Buy when fear is high.
              </p>
              <p className={`${invBody} text-[0.98rem] sm:text-[1.05rem]`}>
                Take profits when markets become euphoric.
              </p>
              <p className={`${invBody} text-[0.98rem] sm:text-[1.05rem]`}>
                Rebalance when allocations drift.
              </p>
            </div>

            <p className={`mt-3 ${invBody} text-[0.98rem] sm:text-[1.05rem]`}>
              But when markets move, emotions take control.
            </p>

            <p className={`mt-2 ${invBody} text-[0.98rem] sm:text-[1.05rem]`}>
              You hesitate. You chase. You panic. You miss the moment.
            </p>

            <div className="mt-3.5 lg:mt-4">
              <div className={invGreenBox}>
                <p className={`${invGreenText} text-[0.95rem] sm:text-[1.02rem]`}>
                  Stop Letting Emotions Manage Your Capital.
                </p>
              </div>
            </div>

            <p
              className={`mt-3 max-w-xl ${invBody} text-[0.95rem] text-pretty sm:text-[1.02rem]`}
            >
              Set your rules while you&apos;re calm. When conditions are met,
              INDEXLA triggers only the execution you approved.
            </p>

            <div className="mt-5 lg:mt-5">
              <EarlyAccessCta
                className={`${homeCta} min-w-[14.5rem] px-7 py-3.5 text-[1rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]`}
              >
                Reserve Early Access
              </EarlyAccessCta>
            </div>
          </motion.div>

          <motion.div
            className="lg:self-start lg:origin-top lg:scale-[1.06] xl:scale-[1.1]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroRetailVsSmartMoney />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
