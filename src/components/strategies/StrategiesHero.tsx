"use client";

import { motion, useReducedMotion } from "framer-motion";

const heroFlow = [
  { label: "Define Rules", tone: "text-ink" },
  { label: "Monitor Conditions", tone: "text-electric" },
  { label: "Coordinate Execution", tone: "text-ink" },
  { label: "On-Chain", tone: "text-electric" },
] as const;

export function StrategiesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 xl:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display text-[clamp(2.15rem,5vw,3.65rem)] uppercase tracking-[-0.03em] text-balance">
              Stop Reacting To Markets.{" "}
              <span className="gradient-text">Start Following Rules.</span>
            </h1>

            <div className="mt-6 space-y-3 text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
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

            <p className="display mt-8 text-[clamp(1.2rem,2.5vw,1.55rem)] text-ink text-balance">
              Define the rules. INDEXLA monitors the conditions and coordinates
              execution.
            </p>

            <div className="mt-7 rounded-2xl border border-electric/40 bg-gradient-to-br from-electric/12 via-purple/10 to-transparent px-5 py-4 sm:px-6 sm:py-5">
              <p className="display text-[clamp(1.05rem,2vw,1.3rem)] leading-snug text-ink text-balance">
                Your assets remain in your wallet. Strategy execution happens
                on-chain across supported networks.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Non-custodial",
                  "On-chain execution",
                  "Supported networks",
                  "User-owned assets",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-void/50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-electric"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line-strong glass p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Strategy runtime
              </p>
              <p className="display mt-3 text-[1.35rem] tracking-[-0.02em]">
                Rules → Conditions → Execution
              </p>

              <div className="mt-6 space-y-3">
                {heroFlow.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-electric/35 bg-void text-[0.7rem] font-semibold tracking-[0.08em] text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 rounded-xl border border-line bg-void/55 px-4 py-3">
                      <p className={`display text-[1.05rem] ${step.tone}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
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
