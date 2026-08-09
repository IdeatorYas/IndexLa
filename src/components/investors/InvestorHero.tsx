"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function InvestorHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-16 md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display text-[clamp(2.1rem,5.2vw,3.75rem)] uppercase tracking-[-0.03em] text-balance">
            You Know What You Should Do.{" "}
            <span className="gradient-text">You Just Don&apos;t Do It.</span>
          </h1>

          <div className="mx-auto mt-7 max-w-xl space-y-2 text-[1.08rem] leading-relaxed text-muted sm:text-[1.15rem]">
            <p>Buy when fear is high.</p>
            <p>Take profits when markets get euphoric.</p>
            <p>Rebalance when your portfolio drifts.</p>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Then the market moves. You hesitate, FOMO, panic, or simply miss the
            moment.
          </p>

          <div className="mt-8 space-y-3">
            <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] text-ink">
              Stop letting emotions manage your portfolio.
            </p>
            <p className="display text-[clamp(1.2rem,2.4vw,1.55rem)] gradient-text">
              Define your rules once. Let INDEXLA execute them 24/7.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Build Your First Portfolio
            </Button>
            <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
              Explore Marketplace
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-dim">
            Connect MetaMask, Phantom, Backpack, or other leading wallets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
