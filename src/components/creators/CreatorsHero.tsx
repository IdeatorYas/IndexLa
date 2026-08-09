"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CreatorPortfolioDashboard } from "@/components/creators/CreatorPortfolioDashboard";

export function CreatorsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-16 md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display text-[clamp(2.1rem,5vw,3.6rem)] uppercase tracking-[-0.03em] text-balance">
              Turn Your Alpha Into{" "}
              <span className="gradient-text">An Investable Product.</span>
            </h1>

            <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
              <p>
                You already share market calls on X, YouTube, Telegram, Discord,
                and everywhere your audience follows you.
              </p>
              <p>You already tell people what you believe will outperform.</p>
            </div>

            <p className="mt-6 display text-[clamp(1.15rem,2.3vw,1.45rem)] text-ink">
              Turn that conviction into a portfolio investors can actually
              allocate to.
            </p>

            <p className="mt-4 text-[1.02rem] font-semibold leading-relaxed text-ink/90">
              Choose the assets. Set the allocations. Define the strategy.
              Publish it.
            </p>

            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              Keep doing what you already do: create, educate, and share your
              thesis.
            </p>

            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
              As your portfolio attracts capital and trading activity, you earn
              from the activity you generate.
            </p>

            <p className="mt-6 display text-[clamp(1.15rem,2.2vw,1.4rem)] gradient-text">
              Set it up once. Keep building. Keep earning.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#build-flow" className="min-w-[12.5rem]">
                Become a Creator
              </Button>
              <p className="text-sm text-muted-dim">
                Build and publish your first portfolio in under 5 minutes.
              </p>
            </div>
          </motion.div>

          <CreatorPortfolioDashboard />
        </div>
      </div>
    </section>
  );
}
