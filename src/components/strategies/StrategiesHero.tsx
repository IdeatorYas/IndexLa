"use client";

import { motion, useReducedMotion } from "framer-motion";

const features = [
  "Non-custodial",
  "On-chain execution",
  "Cross-chain execution",
  "Multi-asset",
] as const;

const heroFlow = [
  { label: "Define Rules", tone: "text-ink" },
  { label: "Monitor Conditions", tone: "text-electric" },
  { label: "Coordinate Execution", tone: "text-ink" },
  { label: "On-Chain", tone: "text-electric" },
] as const;

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-12 md:pb-14 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
          <motion.div
            className="flex flex-col"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display text-[clamp(2.05rem,4.6vw,3.35rem)] uppercase tracking-[-0.03em] text-balance">
              Stop Reacting To Markets.{" "}
              <span className="gradient-text">Start Following Rules.</span>
            </h1>

            <div className="mt-5 space-y-2 text-[1.02rem] leading-relaxed text-muted sm:text-[1.06rem]">
              <p>Markets move 24/7.</p>
              <p>
                Fear. Greed. Momentum. Oversold conditions. Profit targets.
                Allocation drift.
              </p>
              <p>You don&apos;t need to predict every move.</p>
              <p>
                You need a predefined response when the conditions you care about
                appear.
              </p>
            </div>

            <div className="mt-5 flex flex-1 flex-col rounded-2xl border border-electric/40 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent px-5 py-5 sm:px-6">
              <p className="display text-[clamp(1.02rem,1.8vw,1.2rem)] leading-snug text-ink text-balance">
                Your assets remain in your wallet. Strategy execution happens
                on-chain across supported networks.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex h-12 items-center justify-center rounded-xl border border-electric/30 bg-void/60 px-2.5 text-center"
                  >
                    <span className="text-[0.8rem] font-semibold leading-none tracking-[-0.01em] text-electric">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex min-h-0"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-line-strong glass p-5 sm:p-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Strategy runtime
                </p>
                <p className="display mt-2 text-[1.25rem] tracking-[-0.02em] sm:text-[1.35rem]">
                  Rules → Conditions → Execution
                </p>
              </div>

              <div className="my-5 flex flex-1 flex-col justify-center space-y-2.5">
                {heroFlow.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-electric/35 bg-void text-[0.7rem] font-semibold tracking-[0.08em] text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 rounded-xl border border-line bg-void/55 px-4 py-2.5">
                      <p
                        className={`display text-[1.02rem] sm:text-[1.05rem] ${step.tone}`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-success/25 bg-success/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Wallet
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">You hold</p>
                </div>
                <div className="rounded-xl border border-electric/25 bg-electric/10 px-3 py-3 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Execution
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">On-chain</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
