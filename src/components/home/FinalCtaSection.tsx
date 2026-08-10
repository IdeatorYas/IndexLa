"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function NextGenerationSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] tracking-[-0.03em] text-balance">
            Built for the Next Generation of Investing
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-muted sm:text-[1.08rem]">
            <p>
              Gen Z is growing up in a digital, instant economy. Investing should
              work the same way.
            </p>
            <p>
              They do not want to juggle multiple brokers, exchanges, wallets,
              approvals, and fragmented platforms just to build one portfolio.
            </p>
            <p className="font-medium text-ink">
              INDEXLA brings assets, strategies, and execution into one portfolio
              layer.
            </p>
            <p>
              Build your portfolio. Define your rules. Keep control. Let the
              infrastructure handle the execution.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className="relative overflow-hidden border-t border-line bg-void py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Early Access
          </p>
          <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.3rem)] tracking-[-0.03em] text-balance">
            Build the next generation of programmable portfolios.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            Join early access for founders, creators, and crypto native
            investors.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Join Early Access
            </Button>
          </div>
          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.18em] text-muted-dim">
            INDEXLA
          </p>
          <p className="mt-3 text-[1.05rem] text-ink">
            Invest in Everything. Own Everything. Control Everything.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
