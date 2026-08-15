"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import {
  crBody,
  crBodyStrong,
  crCta,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`${crSection} relative scroll-mt-24 overflow-hidden bg-deep`}
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
          <h2 className={`${crH2} uppercase`}>
            Turn Your Edge Into An{" "}
            <span className="gradient-text">Investable Product</span>
          </h2>

          <p className={`mx-auto mt-6 max-w-xl ${crBody} text-balance`}>
            Build your portfolio. Bring your strategy. Monetize your market
            knowledge.
          </p>

          <div className="mt-8 flex justify-center">
            <EarlyAccessCta mode="creator" className={crCta}>
              Creator Early Access
            </EarlyAccessCta>
          </div>

          <div className="mt-6 flex justify-center">
            <div className={crGreenBox}>
              <p className={`${crGreenText} text-balance`}>
                No Publishing Fees At Launch
              </p>
            </div>
          </div>

          <p className={`mx-auto mt-6 max-w-xl ${crBodyStrong} text-balance`}>
            Build Once. Earn From Its Ongoing Use.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
