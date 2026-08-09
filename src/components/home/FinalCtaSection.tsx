"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.5rem)] uppercase tracking-[-0.02em] text-balance">
            Build Your Portfolio.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[1.1rem] leading-relaxed text-muted">
            <p>Define what you believe.</p>
            <p>Define how you want to act.</p>
            <p>Let INDEXLA execute the rules.</p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators">Build Your First Portfolio</Button>
            <Button href="/strategies" variant="secondary">
              Explore Marketplace
            </Button>
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-electric">
            Launching Early Access
          </p>
        </motion.div>
      </div>
    </section>
  );
}
