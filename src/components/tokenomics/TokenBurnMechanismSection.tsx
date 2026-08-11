"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkArchCardBurn,
  tkArchGrid,
  tkArchMetricBurn,
  tkArchNum,
  tkArchTitle,
  tkBody,
  tkBurnGlow,
  tkH2,
  tkSection,
  tkStat,
} from "@/components/tokenomics/tokenomicsRhythm";

const burns = [
  {
    n: "01",
    title: "Publishing Burn",
    body: "Every public portfolio or index published on the Marketplace permanently burns 1,000 $DEXLA.",
    note: "More public portfolios → More $DEXLA removed",
    amount: "1,000",
    label: "$DEXLA burned",
    result: "Permanently removed",
  },
  {
    n: "02",
    title: "Featured Burn",
    body: "Every Featured promotion permanently burns 2,500 $DEXLA.",
    note: "Creators can return to the marketplace and use promotion again as their audience and portfolio grow. More promotion → More $DEXLA removed",
    amount: "2,500",
    label: "$DEXLA burned",
    result: "Permanently removed",
  },
  {
    n: "03",
    title: "Execution Fee Buyback & Burn",
    body: "10% of execution fee revenue is allocated to buying $DEXLA from the market and permanently burning it.",
    note: "INDEXLA charges a 1% execution fee with: 0% management fees · 0% performance fees · 0% exit fees. Example: $1M execution volume → $10,000 allocated to buyback & burn",
    amount: "10%",
    label: "Of execution fees",
    result: "Buyback & burn",
  },
  {
    n: "04",
    title: "Treasury Buyback & Burn",
    body: "25% of realized Treasury profits are allocated to purchasing and permanently burning $DEXLA.",
    note: "Treasury assets are protocol-owned capital and stable reserves. Realized profits refer only to gains actually realized from Treasury-managed positions, not investor funds.",
    amount: "25%",
    label: "Of realized Treasury profits",
    result: "Buyback & burn",
  },
] as const;

export function TokenBurnMechanismSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-void`}>
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

        <div className={tkArchGrid}>
          {burns.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03} className="h-full">
              <motion.article
                className={tkArchCardBurn}
                initial={reduce ? false : { opacity: 0.7 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`${tkArchNum} text-danger`}>{item.n}</span>
                  <h3 className={tkArchTitle}>{item.title}</h3>
                </div>

                <p className={`mt-4 ${tkBody}`}>{item.body}</p>
                {item.note && <p className={`mt-3 ${tkBody}`}>{item.note}</p>}

                <div className={tkArchMetricBurn}>
                  <p className={`${tkStat} text-danger`}>{item.amount}</p>
                  <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </p>
                  <div className="my-2.5 text-danger/55" aria-hidden>
                    →
                  </div>
                  <p className="display text-[1.1rem] tracking-[-0.02em] text-ink text-balance">
                    {item.result}
                  </p>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
