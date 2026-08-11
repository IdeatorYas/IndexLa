"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  crBody,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className={`${crSection} overflow-hidden bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`${crH2} uppercase`}>
            Your Audience. Your Thesis.{" "}
            <span className="gradient-text">Your Strategy.</span>
          </h2>
          <div className={`mt-6 space-y-2 ${crBody}`}>
            <p>You already have the audience.</p>
            <p>You already have the conviction.</p>
            <p>
              INDEXLA gives your thesis somewhere to live, execute, and grow
              with your community.
            </p>
          </div>
          <div className="mt-10">
            <Button
              href="#become-creator"
              className="min-w-[14rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
            >
              Become a Creator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
