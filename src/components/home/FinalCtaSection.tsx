"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  homeBody,
  homeEyebrow,
  homeGreenChip,
  homeGreenChipText,
  homeGreenRow,
  homeH2,
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
          <p className={homeEyebrow}>Early Access</p>
          <h2 className={`mt-4 ${homeH2}`}>
            Build the next generation of programmable portfolios.
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl ${homeBody}`}>
            Join early access for founders, creators, and crypto native
            investors.
          </p>
          <p className={`mx-auto mt-5 max-w-2xl ${homeBody}`}>
            Join the waitlist. Early access includes MVP access and creator
            tooling.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Reserve Early Access
            </Button>
          </div>
          <p className="mt-10 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            INDEXLA
          </p>
          <div className={`mt-4 ${homeGreenRow}`}>
            {[
              "Invest in Everything",
              "Own Everything",
              "Control Everything",
            ].map((item) => (
              <div key={item} className={homeGreenChip}>
                <p className={homeGreenChipText}>{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.8rem] tracking-[0.02em] text-muted-dim">
            INDEXLA is currently in MVP development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
