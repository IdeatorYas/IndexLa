"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function InvestorFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-24 md:py-32">
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
          <h2 className="display text-[clamp(2.1rem,5vw,3.6rem)] uppercase tracking-[-0.03em] text-balance">
            Write The Rules Before{" "}
            <span className="gradient-text">The Market Tests You.</span>
          </h2>

          <div className="mt-7 space-y-2 text-[1.1rem] leading-relaxed text-muted">
            <p>Stop FOMOing into green candles.</p>
            <p>Stop panic-selling red ones.</p>
            <p>Stop waking up wishing you had acted.</p>
          </div>

          <p className="mt-8 display text-[clamp(1.2rem,2.5vw,1.65rem)] text-ink">
            Turn your investment strategy into rules you can actually follow.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13rem]">
              Create Your Portfolio
            </Button>
            <Button href="/strategies" variant="secondary" className="min-w-[13rem]">
              Explore Marketplace
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
