"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="display text-[clamp(2.1rem,5vw,3.5rem)] uppercase tracking-[-0.03em] text-balance">
            Your Calls Get Forgotten.{" "}
            <span className="gradient-text">Your Portfolio Lives On-Chain.</span>
          </h2>

          <div className="mt-6 space-y-2 text-[1.08rem] leading-relaxed text-muted">
            <p>Build the portfolio behind your conviction.</p>
            <p>Give your audience somewhere to put their capital.</p>
            <p>Keep creating. Keep building. Keep earning.</p>
          </div>

          <div className="mt-9">
            <Button href="#build-flow" className="min-w-[13rem]">
              Become a Creator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
