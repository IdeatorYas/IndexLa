"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeEyebrow,
  homeGreenBox,
  homeGreenBoxText,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

export function NextGenerationSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            Built for the Next Generation of Investing
          </h2>
          <div className={`mx-auto mt-6 max-w-2xl space-y-4 ${homeBody}`}>
            <p>
              Gen Z is growing up in a digital, instant economy. Investing should
              work the same way.
            </p>
            <p>
              They do not want to juggle multiple brokers, exchanges, wallets,
              approvals, and fragmented platforms just to build one portfolio.
            </p>
            <p className="font-medium text-ink">
              INDEXLA brings assets, strategies, and execution into one portfolio
              layer.
            </p>
            <p>
              Build your portfolio. Define your rules. Keep control. Let the
              infrastructure handle the execution.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

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
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Join Early Access
            </Button>
          </div>
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-muted-dim">
            INDEXLA
          </p>
          <div className="mt-4 flex justify-center">
            <div className={homeGreenBox}>
              <p className={homeGreenBoxText}>
                Invest in Everything. Own Everything. Control Everything.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
