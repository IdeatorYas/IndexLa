"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tkBody, tkH1 } from "@/components/tokenomics/tokenomicsRhythm";

const utilities = ["Publish", "Feature", "Save", "Tip Creators"] as const;
const burns = [
  "Publishing Burn",
  "Featured Burn",
  "Execution Fee Buyback",
  "Treasury Buyback",
] as const;

export function TokenomicsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-10 md:pb-12 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto mb-7 h-px w-12 bg-gradient-to-r from-transparent via-electric/80 to-transparent" />

          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-electric">
            $DEXLA
          </p>

          <h1 className={`mt-4 ${tkH1}`}>
            The Economic Engine{" "}
            <span className="gradient-text">Of INDEXLA</span>
          </h1>

          <div className={`mx-auto mt-7 max-w-xl space-y-3 ${tkBody}`}>
            <p>Most tokens are built around speculation.</p>
            <p className="font-semibold text-ink">
              $DEXLA is built around INDEXLA usage.
            </p>
            <p className="text-balance">
              The token connects creators, investors, and platform activity
              through four practical utilities and four permanent
              supply-reduction mechanisms.
            </p>
          </div>
        </motion.div>

        {/* 4 × 4 — defining visual signature */}
        <motion.div
          className="mx-auto mt-12 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden border border-white/[0.1] bg-void/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 45% 70% at 18% 40%, rgba(52,211,153,0.12), transparent 55%), radial-gradient(ellipse 45% 70% at 82% 40%, rgba(248,113,113,0.12), transparent 55%)",
              }}
              aria-hidden
            />

            <div className="relative border-b border-white/[0.08] px-5 py-3.5 text-center sm:px-8">
              <p className="display text-[0.95rem] tracking-[-0.01em] text-ink sm:text-[1.05rem]">
                <span className="text-success">4 Core Utilities</span>
                <span className="mx-2 text-muted-dim">·</span>
                <span className="text-danger">4 Burn Mechanisms</span>
              </p>
            </div>

            <div className="relative grid md:grid-cols-2">
              <div className="border-b border-success/20 p-6 sm:p-8 md:border-b-0 md:border-r md:border-success/20">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-success">
                  Value created
                </p>
                <p className="mt-3 display text-[clamp(2.6rem,7vw,4rem)] leading-none tracking-[-0.04em] text-success">
                  4
                </p>
                <h2 className="mt-2 display text-[clamp(1.15rem,2.4vw,1.45rem)] tracking-[-0.02em] text-ink uppercase text-balance">
                  Core Utilities
                </h2>
                <ul className="mt-6 space-y-0">
                  {utilities.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-success/15 py-2.5 last:border-0"
                    >
                      <span className="display text-[0.95rem] tabular-nums text-success">
                        0{i + 1}
                      </span>
                      <span className="text-[1.02rem] font-semibold text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-danger/20 p-6 sm:p-8 md:border-t-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-danger">
                  Supply reduced
                </p>
                <p className="mt-3 display text-[clamp(2.6rem,7vw,4rem)] leading-none tracking-[-0.04em] text-danger">
                  4
                </p>
                <h2 className="mt-2 display text-[clamp(1.15rem,2.4vw,1.45rem)] tracking-[-0.02em] text-ink uppercase text-balance">
                  Burn Mechanisms
                </h2>
                <ul className="mt-6 space-y-0">
                  {burns.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-danger/15 py-2.5 last:border-0"
                    >
                      <span className="display text-[0.95rem] tabular-nums text-danger">
                        0{i + 1}
                      </span>
                      <span className="text-[1.02rem] font-semibold text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative border-t border-white/[0.08] px-6 py-4 text-center sm:px-8">
              <p className="text-[0.95rem] text-muted text-balance">
                More creators. More portfolios. More activity. More reasons to
                use $DEXLA.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
