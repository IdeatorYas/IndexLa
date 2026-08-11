"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { tkSection } from "@/components/tokenomics/tokenomicsRhythm";

const bridges = [
  {
    utility: "Publish",
    activity: "Public portfolios",
    result: "1,000 $DEXLA",
    resultLabel: "Burn",
  },
  {
    utility: "Feature",
    activity: "Featured promotion",
    result: "2,500 $DEXLA",
    resultLabel: "Burn",
  },
  {
    utility: "Execution",
    activity: "Fee revenue",
    result: "10%",
    resultLabel: "Buyback & Burn",
  },
  {
    utility: "Treasury",
    activity: "Realized profits",
    result: "25%",
    resultLabel: "Buyback & Burn",
  },
] as const;

export function UtilityBurnBridgeSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(248,113,113,0.06) 50%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-electric">
            Economic link
          </p>
          <p className="mt-3 display text-[clamp(1.2rem,2.6vw,1.55rem)] tracking-[-0.02em] text-ink text-balance">
            Utility → Activity → Buyback / Burn
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden border border-white/[0.1] bg-void/45">
            <div className="hidden grid-cols-[1fr_auto_1fr_auto_1.15fr] gap-2 border-b border-white/[0.08] px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid">
              <span>Utility</span>
              <span />
              <span>Activity</span>
              <span />
              <span>Supply impact</span>
            </div>

            <ul>
              {bridges.map((row, i) => (
                <li
                  key={row.utility}
                  className="border-b border-white/[0.07] last:border-0"
                >
                  <motion.div
                    className="grid gap-2 px-4 py-4 sm:grid-cols-[1fr_auto_1fr_auto_1.15fr] sm:items-center sm:gap-3 sm:px-5 sm:py-3.5"
                    initial={reduce ? false : { opacity: 0.55 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <p className="display text-[1.05rem] tracking-[-0.02em] text-ink uppercase">
                      {row.utility}
                    </p>
                    <span className="hidden text-electric/50 sm:inline" aria-hidden>
                      →
                    </span>
                    <p className="text-[0.95rem] font-medium text-muted">
                      <span className="sm:hidden text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        Activity ·{" "}
                      </span>
                      {row.activity}
                    </p>
                    <span className="hidden text-danger/55 sm:inline" aria-hidden>
                      →
                    </span>
                    <div className="border border-danger/30 bg-danger/[0.08] px-3 py-2 text-left sm:text-right">
                      <p className="display text-[1.15rem] tabular-nums text-danger">
                        {row.result}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-danger/80">
                        {row.resultLabel}
                      </p>
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
