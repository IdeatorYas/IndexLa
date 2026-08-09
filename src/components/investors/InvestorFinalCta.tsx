"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function InvestorFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="display text-[clamp(2.1rem,5vw,3.5rem)] uppercase tracking-[-0.03em] text-balance">
            Turn Your Thesis Into{" "}
            <span className="gradient-text">A Portfolio.</span>
          </h2>

          <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
            Build your strategy. Put it to work.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Build Your First Portfolio
            </Button>
            <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
              Explore Marketplace
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
