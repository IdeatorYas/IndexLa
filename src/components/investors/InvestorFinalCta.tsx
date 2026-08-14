"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`${invSection} relative scroll-mt-24 overflow-hidden border-t border-line bg-deep py-14 md:py-16`}
    >
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-40"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-xl rounded-[1.5rem] border border-electric/35 bg-gradient-to-b from-electric/[0.1] via-void/50 to-purple/[0.06] px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14),0_20px_60px_rgba(0,0,0,0.28)] sm:px-10 sm:py-12"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            Early Access
          </p>
          <h2 className={`mt-3 ${invH2} uppercase`}>Reserve Early Access</h2>
          <p className={`mx-auto mt-5 max-w-md ${invBody} text-balance`}>
            For investors interested in early access to build and automate
            portfolios on INDEXLA.
          </p>

          <div className="mt-9 flex justify-center">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[22rem]`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
