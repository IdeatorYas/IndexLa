"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBurnGlow,
  tkBurnPanel,
  tkH2,
  tkSection,
  tkStat,
} from "@/components/tokenomics/tokenomicsRhythm";

const burns = [
  {
    n: "01",
    title: "Publishing Burn",
    body: "Every public portfolio or index published on the Marketplace permanently burns 1,000 $DEXLA.",
    outcome: "More public portfolios → More $DEXLA removed",
    amount: "1,000",
    label: "$DEXLA burned",
  },
  {
    n: "02",
    title: "Featured Burn",
    body: "Every Featured promotion permanently burns 2,500 $DEXLA.",
    note: "Creators can return to the marketplace and use promotion again as their audience and portfolio grow.",
    outcome: "More promotion → More $DEXLA removed",
    amount: "2,500",
    label: "$DEXLA burned",
  },
  {
    n: "03",
    title: "Execution Fee Buyback & Burn",
    body: "10% of execution fee revenue is allocated to buying $DEXLA from the market and permanently burning it.",
    note: "INDEXLA charges a 1% execution fee with: 0% management fees · 0% performance fees · 0% exit fees",
    example: "$1M execution volume → $10,000 allocated to buyback & burn",
    amount: "10%",
    label: "Of execution fees",
  },
  {
    n: "04",
    title: "Treasury Buyback & Burn",
    body: "25% of realized Treasury profits are allocated to purchasing and permanently burning $DEXLA.",
    note: "Treasury assets are protocol-owned capital and stable reserves. Realized profits refer only to gains actually realized from Treasury-managed positions, not investor funds.",
    amount: "25%",
    label: "Of realized Treasury profits",
  },
] as const;

export function TokenBurnMechanismSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: tkBurnGlow }}
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-danger">
            Supply reduction layer
          </p>
          <h2 className={`mt-3 ${tkH2} uppercase`}>
            Four Burn{" "}
            <span className="text-danger">Mechanisms</span>
          </h2>
          <p className={`mt-5 ${tkBody} text-balance`}>
            $DEXLA is designed so that real INDEXLA activity can translate into
            permanent supply reduction.
          </p>
        </FadeIn>

        <div className="mt-10 space-y-0 border-y border-danger/25">
          {burns.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03}>
              <article className="grid gap-5 border-b border-danger/15 py-8 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] lg:items-center lg:gap-8 lg:py-9">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="display text-[1.05rem] tabular-nums text-danger">
                      {item.n}
                    </span>
                    <h3 className="display text-[clamp(1.25rem,2.4vw,1.55rem)] tracking-[-0.02em] text-ink uppercase text-balance">
                      {item.title}
                    </h3>
                  </div>
                  <p className={`mt-4 ${tkBody}`}>{item.body}</p>
                  {"note" in item && item.note && (
                    <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                  )}
                  {"example" in item && item.example && (
                    <p className="mt-4 border-l-2 border-danger/40 pl-3.5 text-[0.98rem] font-medium text-ink">
                      Example: {item.example}
                    </p>
                  )}
                  {"outcome" in item && item.outcome && (
                    <p className="mt-4 text-[0.95rem] font-semibold text-ink">
                      {item.outcome}
                    </p>
                  )}
                </div>

                <motion.div
                  className={`${tkBurnPanel} px-4 py-5 text-center`}
                  initial={reduce ? false : { opacity: 0.65 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <p className={`${tkStat} text-danger`}>{item.amount}</p>
                  <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[0.78rem] font-semibold text-danger/85">
                    <span>$DEXLA</span>
                    <span aria-hidden>→</span>
                    <span className="border border-danger/35 px-2 py-0.5">
                      Removed
                    </span>
                  </div>
                </motion.div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
