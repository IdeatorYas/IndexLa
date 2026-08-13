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
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-55" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl rounded-[1.5rem] border border-electric/30 bg-gradient-to-b from-electric/[0.08] via-void/30 to-purple/[0.06] px-6 py-12 text-center sm:px-10 sm:py-14"
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
              href="/investors#early-access"
              className="min-w-[16.5rem] px-10 py-4 text-[1.08rem] shadow-[0_20px_56px_rgba(59,130,246,0.48)] ring-2 ring-electric/30"
            >
              Build Your Automated Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
