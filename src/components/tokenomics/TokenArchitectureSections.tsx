"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkArchCardBurn,
  tkArchCardUtility,
  tkArchGrid,
  tkArchMetricBurn,
  tkArchMetricUtility,
  tkArchNum,
  tkArchTitle,
  tkBody,
  tkBurnGlow,
  tkH2,
  tkSection,
  tkStat,
  tkUtilityGlow,
} from "@/components/tokenomics/tokenomicsRhythm";

function MetricShell({
  tone,
  children,
}: {
  tone: "utility" | "burn";
  children: ReactNode;
}) {
  const shell =
    tone === "utility" ? tkArchMetricUtility : tkArchMetricBurn;
  return <div className={shell}>{children}</div>;
}

/** Shared amount → result block used by Publish / Feature and all burns */
function MetricBlock({
  tone,
  amount,
  label,
  result,
}: {
  tone: "utility" | "burn";
  amount: string;
  label: string;
  result: string;
}) {
  const accent = tone === "utility" ? "text-success" : "text-danger";
  const arrow = tone === "utility" ? "text-success/55" : "text-danger/55";

  return (
    <MetricShell tone={tone}>
      <p className={`${tkStat} ${accent}`}>{amount}</p>
      <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
      <div className={`my-2.5 ${arrow}`} aria-hidden>
        →
      </div>
      <p className="display text-[1.05rem] leading-snug tracking-[-0.02em] text-ink text-balance sm:text-[1.1rem]">
        {result}
      </p>
    </MetricShell>
  );
}

const utilities = [
  {
    n: "01",
    title: "Publish",
    body: "Creators use $DEXLA to publish public portfolios and indexes on the INDEXLA Marketplace.",
    note: "Private portfolios remain free for building and testing before going public.",
    amount: "1,000",
    label: "$DEXLA",
    result: "Public Portfolio",
  },
  {
    n: "02",
    title: "Feature",
    body: "Creators can use 2,500 $DEXLA to feature a portfolio at the top of the INDEXLA Marketplace for 7 days.",
    note: "As AUM and execution volume grow, creators can promote again to reach more investors and increase earnings.",
    amount: "2,500",
    label: "$DEXLA",
    result: "7 Days Featured",
  },
  {
    n: "03",
    title: "Save",
    body: "Holding $DEXLA gives investors lower execution fees.",
    note: "Discounts remain active while the required balance is maintained.",
    tiers: [
      { hold: "2,500", discount: "10% discount" },
      { hold: "5,000", discount: "25% discount" },
      { hold: "10,000", discount: "40% discount" },
    ],
  },
  {
    n: "04",
    title: "Tip Creators",
    body: "Investors and followers can tip creators directly in $DEXLA.",
    note: "Creators earn from the value they bring through research, portfolio construction, market views, and community contribution.",
    flow: ["Discover", "Follow", "Invest", "Tip"] as const,
  },
] as const;

const burns = [
  {
    n: "01",
    title: "Publishing Burn",
    body: "Every public portfolio or index permanently burns 1,000 $DEXLA.",
    amount: "1,000",
    label: "$DEXLA burned",
    result: "More portfolios → More $DEXLA burned",
  },
  {
    n: "02",
    title: "Featured Burn",
    body: "Every Featured promotion permanently burns 2,500 $DEXLA.",
    note: "Creators can promote again as their audience, AUM, and volume grow.",
    amount: "2,500",
    label: "$DEXLA burned",
    result: "More promotion → More $DEXLA burned",
  },
  {
    n: "03",
    title: "Execution Fee Buyback & Burn",
    body: "10% of INDEXLA's execution fee revenue is used to buy and permanently burn $DEXLA.",
    amount: "10%",
    label: "Of execution fees",
    result: "More execution volume → More $DEXLA burned",
  },
  {
    n: "04",
    title: "Treasury Buyback & Burn",
    body: "25% of realized Treasury profits are used to buy and permanently burn $DEXLA.",
    note: "Treasury assets are protocol-owned capital and stable reserves. Realized profits come only from gains on Treasury-managed positions, not investor funds.",
    amount: "25%",
    label: "Of realized Treasury profits",
    result: "More Treasury gains → More $DEXLA burned",
  },
] as const;

function ArchCardHeader({
  n,
  title,
  tone,
}: {
  n: string;
  title: string;
  tone: "utility" | "burn";
}) {
  const accent = tone === "utility" ? "text-success" : "text-danger";
  return (
    <div className="flex items-baseline gap-3">
      <span className={`${tkArchNum} ${accent}`}>{n}</span>
      <h3 className={tkArchTitle}>{title}</h3>
    </div>
  );
}

export function TokenUtilitySection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{ background: tkUtilityGlow }}
        aria-hidden
      />

      <div className="section-pad container-max relative mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-success">
            Value layer
          </p>
          <h2 className={`mt-3 ${tkH2} uppercase`}>
            Four Core <span className="text-success">Utilities</span>
          </h2>
        </FadeIn>

        <div className={tkArchGrid}>
          {utilities.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03} className="h-full">
              <motion.article
                className={tkArchCardUtility}
                initial={reduce ? false : { opacity: 0.75 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ArchCardHeader n={item.n} title={item.title} tone="utility" />

                <div className="mt-4 flex flex-1 flex-col">
                  <p className={tkBody}>{item.body}</p>
                  {"note" in item && item.note && (
                    <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                  )}
                </div>

                {"amount" in item && item.amount && (
                  <MetricBlock
                    tone="utility"
                    amount={item.amount}
                    label={item.label}
                    result={item.result}
                  />
                )}

                {"tiers" in item && item.tiers && (
                  <MetricShell tone="utility">
                    <div className="space-y-2.5 text-left">
                      {item.tiers.map((tier) => (
                        <div
                          key={tier.hold}
                          className="flex items-center justify-between gap-3 border-b border-success/15 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-[0.9rem] font-medium tabular-nums text-ink">
                            {tier.hold}
                            <span className="mx-1.5 text-success/55">→</span>
                          </span>
                          <span className="display text-[1.05rem] text-success sm:text-[1.15rem]">
                            {tier.discount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </MetricShell>
                )}

                {"flow" in item && item.flow && (
                  <MetricShell tone="utility">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                      {item.flow.map((step, idx) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="border-b border-success/45 pb-0.5 text-[0.9rem] font-semibold text-ink">
                            {step}
                          </span>
                          {idx < item.flow.length - 1 && (
                            <span className="text-success/50" aria-hidden>
                              →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </MetricShell>
                )}
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TokenBurnMechanismSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{ background: tkBurnGlow }}
        aria-hidden
      />

      <div className="section-pad container-max relative mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-danger">
            Supply reduction layer
          </p>
          <h2 className={`mt-3 ${tkH2} uppercase`}>
            Four Burn <span className="text-danger">Mechanisms</span>
          </h2>
          <p className={`mt-5 ${tkBody} text-balance`}>
            $DEXLA converts real INDEXLA activity into permanent supply
            reduction.
          </p>
        </FadeIn>

        <div className={tkArchGrid}>
          {burns.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03} className="h-full">
              <motion.article
                className={tkArchCardBurn}
                initial={reduce ? false : { opacity: 0.75 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ArchCardHeader n={item.n} title={item.title} tone="burn" />

                <div className="mt-4 flex flex-1 flex-col">
                  <p className={tkBody}>{item.body}</p>
                  {"note" in item && item.note && (
                    <p className={`mt-3 ${tkBody}`}>{item.note}</p>
                  )}
                </div>

                <MetricBlock
                  tone="burn"
                  amount={item.amount}
                  label={item.label}
                  result={item.result}
                />
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
