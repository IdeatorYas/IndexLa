"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { homeBody, homeCta } from "@/components/home/homeRhythm";

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
          className="mx-auto flex w-full max-w-[48rem] flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display mx-auto w-full max-w-[min(100%,44rem)] px-1 text-[clamp(2.35rem,6vw,4rem)] font-semibold tracking-[-0.04em] leading-[1.08] text-balance">
            <span className="text-ink">Decentralized Portfolio Management</span>
            <span className="text-electric">
              {" "}
              &amp; Distribution Layer
            </span>
          </h1>

          <div className={`mx-auto mt-5 max-w-[34rem] ${homeBody}`}>
            <p className="font-semibold text-ink text-balance">
              Automated Portfolios and Indexes. Direct Ownership.
            </p>
          </div>

          <div className="mx-auto mt-5 flex w-full max-w-[36rem] flex-col items-center gap-3">
            <p className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-electric text-balance sm:text-[1.15rem]">
              0% Management · 0% Performance · 0% Exit
            </p>
            <div className="inline-flex max-w-full items-center justify-center rounded-xl border border-electric/50 bg-electric/[0.14] px-5 py-3 shadow-[inset_0_1px_0_rgba(56,189,248,0.22),0_0_28px_rgba(56,189,248,0.12)] sm:px-7 sm:py-3.5">
              <p className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.15rem]">
                1% Flat Execution Fee
              </p>
            </div>
          </div>

          <div className="mt-7 flex w-full flex-col items-center justify-center">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[18.5rem] sm:w-auto sm:max-w-none`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>

          <ul className="mt-7 flex w-full max-w-[44rem] flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {TRUST.map((item) => (
              <li key={item}>
                <div className="inline-flex items-center justify-center rounded-xl border border-electric/50 bg-electric/[0.14] px-5 py-3 shadow-[inset_0_1px_0_rgba(56,189,248,0.22),0_0_28px_rgba(56,189,248,0.12)] sm:px-7 sm:py-3.5">
                  <p className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink whitespace-nowrap sm:text-[1.15rem]">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
