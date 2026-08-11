"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkStat,
  tkSurface,
  tkSurfaceSoft,
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
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Four Burn{" "}
            <span className="gradient-text">Mechanisms</span>
          </h2>
          <p className={`mt-5 ${tkBody} text-balance`}>
            $DEXLA is designed so that real INDEXLA activity can translate into
            permanent supply reduction.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {burns.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.04}>
              <article className={`flex h-full flex-col ${tkSurface}`}>
                <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
                  <div className="flex items-baseline gap-3">
                    <span className="display text-[1.05rem] text-electric">
                      {item.n}
                    </span>
                    <h3 className="display text-[1.25rem] tracking-[-0.02em] text-ink uppercase sm:text-[1.35rem]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className={tkBody}>{item.body}</p>
                  {"note" in item && item.note && (
                    <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                  )}
                  {"example" in item && item.example && (
                    <p className={`mt-3 ${tkSurfaceSoft} px-3.5 py-3 text-[0.95rem] font-medium text-ink`}>
                      Example: {item.example}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <motion.div
                      className="rounded-xl border border-danger/30 bg-danger/[0.08] px-4 py-4 text-center"
                      initial={reduce ? false : { opacity: 0.7 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <p className={`${tkStat} text-danger`}>{item.amount}</p>
                      <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
                        {item.label}
                      </p>
                      <div className="my-2.5 flex items-center justify-center gap-2 text-[0.8rem] font-semibold text-danger/80">
                        <span>$DEXLA</span>
                        <span aria-hidden>→</span>
                        <span className="rounded-full border border-danger/35 bg-danger/10 px-2.5 py-0.5">
                          Permanently removed
                        </span>
                      </div>
                    </motion.div>
                    {"outcome" in item && item.outcome && (
                      <p className="mt-3 text-center text-[0.92rem] font-semibold text-ink">
                        {item.outcome}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
