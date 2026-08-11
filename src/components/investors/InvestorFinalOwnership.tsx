"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorFinalOwnership() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} border-t border-line bg-deep py-14 md:py-18`}>
      <div className="section-pad container-max">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={invH2}>
            Your Capital. Your Conviction.{" "}
            <span className="gradient-text">Your Rules.</span>
          </h2>
          <p className={`mt-6 ${invBody}`}>
            Build your strategy around your own thesis, define how your portfolio
            should respond, and automate execution without giving up control of
            your assets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
