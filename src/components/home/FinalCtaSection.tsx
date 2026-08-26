"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  homeBody,
  homeCta,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`relative overflow-hidden ${homeSection} bg-void`}
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="display mx-auto max-w-[40rem] text-[clamp(2rem,5.4vw,3.4rem)] font-semibold tracking-[-0.035em] leading-[1.08]">
            <span className="block text-ink sm:inline sm:whitespace-nowrap">
              Build It.
            </span>{" "}
            <span className="mt-1 block text-ink sm:mt-0 sm:inline sm:whitespace-nowrap">
              Automate It.
            </span>{" "}
            <span className="mt-1 block gradient-text sm:mt-0 sm:inline sm:whitespace-nowrap">
              Own It.
            </span>
          </h2>
          <div className={`mt-6 space-y-3 ${homeMeasure} ${homeBody}`}>
            <p>
              Diversified portfolios. Stablecoin liquidity. High-risk memecoin
              baskets.
            </p>
            <p className="font-semibold text-ink">One platform. Full control.</p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            <EarlyAccessCta
              className={`${homeCta} w-full max-w-[22rem] sm:w-auto`}
            >
              Reserve Early Access
            </EarlyAccessCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
