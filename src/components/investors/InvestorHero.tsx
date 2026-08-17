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

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <div className="mb-4 lg:mb-5">
          <Link
            href="/"
            className="inline-flex items-center text-[0.9rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </Link>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${invH1} text-[clamp(2rem,5.2vw,3.65rem)] leading-[1.06]`}>
              <span className="block">You Know What You Should Do</span>
              <span className="mt-[0.14em] block gradient-text">
                You Just Don&apos;t
              </span>
            </h1>

            <div className="mt-5 space-y-1.5 lg:mt-6">
              <p className={invBody}>Buy when fear is high.</p>
              <p className={invBody}>Take profits at euphoria.</p>
              <p className={invBody}>Rebalance when allocations drift.</p>
            </div>

            <p className={`mt-4 ${invBody}`}>
              Then the market moves, and you hesitate, chase, panic, and miss
              it.
            </p>

            <div className="mt-5 lg:mt-6">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  Stop letting emotions manage your portfolio.
                </p>
              </div>
            </div>

            <p className={`mt-4 max-w-xl ${invBody} text-pretty`}>
              Your assets stay in your wallet. The protocol cannot withdraw your
              funds.
            </p>

            <div className="mt-6 lg:mt-7">
              <EarlyAccessCta className="min-w-[14.5rem] px-7 py-3.5 text-[1rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]">
                Build Your Automated Portfolio
              </EarlyAccessCta>
            </div>
          </motion.div>

          <motion.div
            className="lg:self-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroRetailVsSmartMoney />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
