"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function InvestorFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-65" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="display text-[clamp(2rem,4.8vw,3.4rem)] uppercase tracking-[-0.03em] text-balance">
            Don&apos;t Chase The Market.{" "}
            <span className="gradient-text">Define Your Response.</span>
          </h2>

          <div className="mt-6 space-y-2 text-[1.08rem] leading-relaxed text-muted">
            <p>Stop watching the market.</p>
            <p>Stop reacting to every move.</p>
            <p>Define how you want your portfolio to respond.</p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
