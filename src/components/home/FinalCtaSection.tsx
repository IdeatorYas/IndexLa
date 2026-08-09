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
          <h2 className="display text-[clamp(2.1rem,4.8vw,3.5rem)] text-balance">
            Your Portfolio Should Work As Hard As You Do.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[1.1rem] leading-relaxed text-muted">
            <p>Markets are always moving.</p>
            <p>
              Your portfolio shouldn&apos;t depend on you being online when they
              do.
            </p>
            <p>
              INDEXLA gives you one place to own assets, deploy strategies, and
              automate execution across supported markets and chains.
            </p>
            <p>Choose what you believe.</p>
            <p>Define how you want to act.</p>
            <p>Let your portfolio execute.</p>
          </div>
          <p className="display mx-auto mt-10 max-w-2xl text-[clamp(1.3rem,3vw,1.9rem)] text-ink">
            Own the assets. Own the strategy. Control the execution.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators">Build Your First Portfolio</Button>
            <Button href="/strategies" variant="secondary">
              Explore Marketplace
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
