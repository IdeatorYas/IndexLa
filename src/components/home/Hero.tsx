"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FloatingAssetUniverse } from "@/components/home/FloatingAssetUniverse";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-purple/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void via-void/80 to-transparent"
        aria-hidden
      />

      <FloatingAssetUniverse />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-28">
        <motion.div
          className="mx-auto w-full max-w-[48rem] text-center"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold tracking-[-0.035em] text-balance">
            <span className="gradient-text">Decentralized Portfolio Management</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted sm:mt-6 sm:text-[1.15rem]">
            Invest in Everything. Own Everything. Control Everything.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-dim sm:text-[1.02rem]">
            Only a 1% execution fee when trades occur. No hidden recurring
            charges.
          </p>

          <p className="mx-auto mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted-dim sm:text-[1.02rem]">
            0% management fees. 0% performance fees. 0% exit fees.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Create Your Portfolio
            </Button>
            <Button href="#early-access" variant="secondary" className="min-w-[13.5rem]">
              Join Early Access
            </Button>
          </div>

          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[0.78rem]">
            Multi Asset · Multi Chain · Non Custodial · Programmable · Creator
            Native
          </p>
        </motion.div>
      </div>
    </section>
  );
}
