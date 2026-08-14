"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeCta,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

export function HowItWorksPageCta() {
  const reduce = useReducedMotion();

  return (
    <section className={`relative overflow-hidden ${homeSection} bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Ready To Build Your{" "}
            <span className="gradient-text">Automated Portfolio?</span>
          </h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Reserve early access to define your rules, approve permissions, and
            let INDEXLA coordinate execution when conditions are met.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button
              href="/investors#early-access"
              className={`${homeCta} w-full max-w-[22rem] sm:w-auto`}
            >
              Reserve Early Access
            </Button>
            <HomeReadMore href="/investors" label="Explore the Investor Page →" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
