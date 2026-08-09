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
          <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <h1 className="display text-[clamp(1.85rem,5.2vw,3.85rem)] font-semibold uppercase tracking-[0.04em] text-balance text-ink sm:tracking-[0.06em]">
            Decentralized
            <br className="hidden sm:block" />{" "}
            <span className="gradient-text">Portfolio Management</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.2rem]">
            Build rule-based portfolios across crypto, tokenized stocks &amp;
            commodities
          </p>

          <p className="mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 rounded-full border border-line bg-white/[0.035] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[0.72rem]">
            <span>0% Management Fees</span>
            <span className="text-electric/50">·</span>
            <span>0% Performance Fees</span>
            <span className="text-electric/50">·</span>
            <span>0% Exit Fees</span>
          </p>

          <div className="mt-8 space-y-2">
            <p className="display text-[clamp(1.55rem,3.4vw,2.35rem)] tracking-[-0.03em] text-ink">
              Stop Trading Your Emotions.
            </p>
            <p className="display text-[clamp(1.55rem,3.4vw,2.35rem)] tracking-[-0.03em] gradient-text">
              Trade Your Rules.
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-xl space-y-3.5 text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem] sm:leading-[1.65]">
            <p>Most investors know what they should do.</p>
            <p>
              Buy when fear is high. Take profits when markets get euphoric.
              Rebalance when allocations drift.
            </p>
            <p className="font-medium text-ink/90">
              The hard part is doing it consistently.
            </p>
            <p>
              INDEXLA lets you build or discover portfolios, define the rules
              behind them, and automate execution while your assets remain under
              your control.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className="min-w-[13.5rem]">
              Build Your First Portfolio
            </Button>
            <Button href="/strategies" variant="secondary" className="min-w-[13.5rem]">
              Explore Strategies
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-dim">
            Only a 1% execution fee when trades occur. No hidden recurring
            charges.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
