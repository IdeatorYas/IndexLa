"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorFinalOwnership() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} overflow-hidden bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`${invH2} uppercase`}>
            Your Capital. Your Conviction.{" "}
            <span className="gradient-text">Your Rules.</span>
          </h2>
          <p className={`mt-6 ${invBody}`}>
            Build your strategy around your own thesis, define how your
            portfolio should respond, and automate execution without giving up
            control of your assets.
          </p>
          <div className="mt-10">
            <Button
              href="/creators"
              className="min-w-[15rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
            >
              Build Your Portfolio & Automate Your Strategy in 5 Minutes
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
