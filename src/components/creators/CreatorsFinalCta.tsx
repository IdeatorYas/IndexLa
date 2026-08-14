"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  crBody,
  crCta,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`${crSection} relative scroll-mt-24 overflow-hidden bg-void`}
    >
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-35"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <motion.div
          className={`mx-auto max-w-3xl ${crSurface} px-6 py-12 text-center sm:px-10 sm:py-14`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            Early Access
          </p>
          <h2 className={`mt-3 ${crH2} uppercase`}>
            Reserve Your Place For{" "}
            <span className="gradient-text">Creator MVP Access</span>
          </h2>

          <p className={`mx-auto mt-6 max-w-xl ${crBody} text-balance`}>
            For creators interested in early access to publish portfolios,
            grow community participation, and preview the INDEXLA creator
            experience.
          </p>

          <div className="mt-9 flex justify-center">
            <EarlyAccessCta mode="creator" className={crCta}>
              Join as a Creator
            </EarlyAccessCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
