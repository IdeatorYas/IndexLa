"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StrategiesFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-deep py-16 md:py-24">
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
          <h2 className="display text-[clamp(2.1rem,5vw,3.5rem)] uppercase tracking-[-0.03em] text-balance">
            Build Your First{" "}
            <span className="gradient-text">Strategy.</span>
          </h2>

          <div className="mt-6 space-y-2 text-[1.08rem] leading-relaxed text-muted">
            <p>Choose your assets.</p>
            <p>Set your allocations.</p>
            <p>Define your conditions.</p>
            <p>Let the system monitor them.</p>
          </div>

          <div className="mt-9 flex justify-center">
            <Button href="/creators" className="min-w-[14rem] !px-8 !py-3.5 text-[1.05rem]">
              Build Your Strategy
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
