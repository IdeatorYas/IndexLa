"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { homeBody, homeCta, homeEyebrow } from "@/components/home/homeRhythm";

const TRUST = [
  "Non-Custodial",
  "Revocable Permissions",
  "Private",
  "NO KYC",
] as const;

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

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-8 pt-[5rem] sm:pb-10 lg:pb-8 lg:pt-20">
        <motion.div
          className="mx-auto flex w-full max-w-[46rem] flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={homeEyebrow}>
            Decentralized Portfolio Management &amp; Distribution
          </p>

          <h1 className="display mx-auto mt-4 w-full max-w-[min(100%,42rem)] px-1 text-[clamp(2.1rem,5.6vw,3.75rem)] font-semibold tracking-[-0.04em] leading-[1.08]">
            <span className="block text-ink">One Portfolio</span>
            <span className="mt-1.5 block text-electric sm:mt-2">Every Asset</span>
            <span className="mt-1.5 block text-electric sm:mt-2">Every Chain</span>
          </h1>

          <div className={`mx-auto mt-5 max-w-[34rem] space-y-2 ${homeBody}`}>
            <p className="font-semibold text-ink text-balance">
              Automated Portfolios and Indexes. Direct Ownership.
            </p>
            <p className="text-balance">
              Creators build. INDEXLA automates. Investors own.
            </p>
          </div>

          <p className="mx-auto mt-5 max-w-[36rem] text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-electric text-balance sm:text-[1.15rem]">
            0% Management · 0% Performance · 0% Exit · 1% Flat Fee
          </p>

          <div className="mt-7 flex w-full flex-col items-center justify-center">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[18.5rem] sm:w-auto sm:max-w-none`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>

          <ul className="mt-7 grid w-full max-w-[42rem] grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {TRUST.map((item) => (
              <li
                key={item}
                className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-electric/35 bg-electric/[0.08] px-2.5 py-3.5 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14)] sm:min-h-[4.75rem] sm:px-3"
              >
                <span className="text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.08em] text-ink text-balance sm:text-[0.88rem] sm:tracking-[0.1em]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
