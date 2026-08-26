"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  invBody,
  invH1,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorFinalOwnership() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-void py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h2 className={`${invH1} uppercase leading-[1.08]`}>
            <span className="block">Your Capital.</span>
            <span className="mt-[0.12em] block">Your Conviction.</span>
            <span className="mt-[0.12em] block gradient-text">Your Path.</span>
          </h2>

          <p className={`mx-auto mt-8 max-w-2xl ${invBody}`}>
            Choose how you want to invest. Define how your capital should
            respond. Keep control throughout execution.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="#investment-path"
              className={`${homeCta} inline-flex w-full max-w-[22rem]`}
            >
              Choose Your Investment Path
            </Link>
          </div>

          <p className="mt-6 text-[0.95rem] font-semibold tracking-[-0.01em] text-electric sm:text-[1.02rem]">
            INDEXLA Core · Stable Club · Degen Club
          </p>
        </motion.div>
      </div>
    </section>
  );
}
