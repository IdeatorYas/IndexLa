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

          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.7] text-muted sm:mt-6 sm:text-[1.15rem]">
            The non custodial portfolio distribution layer for crypto and
            tokenized assets.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-[1.7] text-muted-dim sm:text-[1.05rem]">
            Own the underlying assets across chains. Define the rules once.
            Automate execution. Keep the keys.
          </p>

          <div
            className="mx-auto mt-7 max-w-lg rounded-2xl border border-electric/20 bg-white/[0.035] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:px-6 sm:py-5"
            aria-label="Fee structure highlights"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: "0%", label: "management" },
                { value: "0%", label: "performance" },
                { value: "0%", label: "exit" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="display text-[1.35rem] leading-none text-ink sm:text-[1.55rem]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted sm:text-[0.72rem]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-dim sm:text-[1.02rem]">
            Only 1% execution fee when trades occur
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
            Multi Asset · Cross Chain · Non Custodial · Automated · Creator
            Marketplace
          </p>
        </motion.div>
      </div>
    </section>
  );
}
