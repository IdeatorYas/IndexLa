"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroCreatorPortfolioCard } from "@/components/creators/HeroCreatorPortfolioCard";

const flowSteps = ["Choose", "Allocate", "Define", "Publish"] as const;

export function CreatorsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <motion.div
            className="flex flex-col justify-center"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display text-[clamp(2.15rem,5vw,3.65rem)] uppercase tracking-[-0.03em] text-balance">
              Your Alpha. Turned Into{" "}
              <span className="gradient-text">An Investable Product.</span>
            </h1>

            <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
              <p>You already have the audience. You already have the thesis.</p>
              <p>
                Turn what you post into a portfolio investors can actually
                allocate to.
              </p>
            </div>

            <div className="mt-4 space-y-2 text-[1.02rem] leading-relaxed text-muted">
              <p>Keep posting. Keep educating. Keep pushing your thesis.</p>
              <p>
                Your portfolio becomes the destination for the people who want
                to put capital behind it.
              </p>
            </div>

            <p className="mt-6 display text-[clamp(1.15rem,2.2vw,1.4rem)] gradient-text">
              Set it up once. Keep building. Keep earning.
            </p>

            <div className="mt-8 rounded-[1.25rem] border border-electric/25 bg-gradient-to-br from-electric/10 via-purple/5 to-transparent p-5 sm:p-6">
              <p className="display text-[clamp(1.2rem,2.6vw,1.65rem)] tracking-[-0.025em] text-balance text-ink">
                Choose the assets. Set the allocations. Define the strategy.
                Publish.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {flowSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-line bg-void/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                      {step}
                    </span>
                    {i < flowSteps.length - 1 && (
                      <span className="text-electric/50" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <Button href="#build-flow" className="min-w-[12.5rem]">
                Become a Creator
              </Button>
              <p className="mt-4 text-sm text-muted-dim">
                Connect MetaMask, Phantom, Backpack, or any supported wallet.
              </p>
              <p className="mt-2 text-sm font-medium text-muted">
                Build and publish your first portfolio in under 5 minutes.
              </p>
            </div>
          </motion.div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl">
              <HeroCreatorPortfolioCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
