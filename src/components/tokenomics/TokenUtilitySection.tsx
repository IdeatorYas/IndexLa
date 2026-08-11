"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkArchCardUtility,
  tkArchGrid,
  tkArchMetricUtility,
  tkArchNum,
  tkArchTitle,
  tkBody,
  tkH2,
  tkSection,
  tkStat,
  tkUtilityGlow,
} from "@/components/tokenomics/tokenomicsRhythm";

type Metric =
  | {
      kind: "stat";
      amount: string;
      label: string;
      result?: string;
    }
  | {
      kind: "tiers";
      tiers: { hold: string; discount: string }[];
      label: string;
    }
  | {
      kind: "flow";
      steps: string[];
      label: string;
    };

const utilities: {
  n: string;
  title: string;
  body: string;
  note?: string;
  metric: Metric;
}[] = [
  {
    n: "01",
    title: "Publish",
    body: "Creators use $DEXLA to publish public portfolios and indexes on the INDEXLA Marketplace.",
    note: "Private portfolios remain free, allowing creators to build and test before going public.",
    metric: {
      kind: "stat",
      amount: "$DEXLA",
      label: "Access",
      result: "Public Portfolio",
    },
  },
  {
    n: "02",
    title: "Feature",
    body: "Creators can burn 2,500 $DEXLA to feature a published portfolio for 7 days.",
    note: "Featured portfolios receive premium marketplace placement, a Featured designation, and increased discovery. Featured placement rotates to keep marketplace discovery competitive.",
    metric: {
      kind: "stat",
      amount: "2,500",
      label: "$DEXLA",
      result: "7 Days Featured",
    },
  },
  {
    n: "03",
    title: "Save",
    body: "Holding $DEXLA gives investors lower execution fees.",
    note: "Discounts remain active while the required balance is maintained.",
    metric: {
      kind: "tiers",
      label: "Fee discount",
      tiers: [
        { hold: "2,500 $DEXLA", discount: "10%" },
        { hold: "5,000 $DEXLA", discount: "25%" },
        { hold: "10,000 $DEXLA", discount: "40%" },
      ],
    },
  },
  {
    n: "04",
    title: "Tip Creators",
    body: "Investors and followers can tip creators directly in $DEXLA.",
    note: "Creators can earn from the value they bring to the ecosystem through research, portfolio construction, market views, and community contribution.",
    metric: {
      kind: "flow",
      label: "Creator path",
      steps: ["Discover", "Follow", "Invest", "Tip"],
    },
  },
];

export function TokenUtilitySection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: tkUtilityGlow }}
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-success">
            Value layer
          </p>
          <h2 className={`mt-3 ${tkH2} uppercase`}>
            Four Core{" "}
            <span className="text-success">Utilities</span>
          </h2>
        </FadeIn>

        <div className={tkArchGrid}>
          {utilities.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.03} className="h-full">
              <motion.article
                className={tkArchCardUtility}
                initial={reduce ? false : { opacity: 0.7 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`${tkArchNum} text-success`}>{item.n}</span>
                  <h3 className={tkArchTitle}>{item.title}</h3>
                </div>

                <p className={`mt-4 ${tkBody}`}>{item.body}</p>
                {item.note && <p className={`mt-3 ${tkBody}`}>{item.note}</p>}

                <div className={tkArchMetricUtility}>
                  {item.metric.kind === "stat" && (
                    <>
                      <p className={`${tkStat} text-success`}>
                        {item.metric.amount}
                      </p>
                      <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                        {item.metric.label}
                      </p>
                      {item.metric.result && (
                        <>
                          <div className="my-2.5 text-success/55" aria-hidden>
                            →
                          </div>
                          <p className="display text-[1.1rem] tracking-[-0.02em] text-ink text-balance">
                            {item.metric.result}
                          </p>
                        </>
                      )}
                    </>
                  )}

                  {item.metric.kind === "tiers" && (
                    <>
                      <div className="space-y-2 text-left">
                        {item.metric.tiers.map((tier) => (
                          <div
                            key={tier.hold}
                            className="flex items-center justify-between gap-3 border-b border-success/15 pb-2 last:border-0 last:pb-0"
                          >
                            <span className="text-[0.85rem] font-medium text-ink">
                              {tier.hold}
                            </span>
                            <span className="display text-[1.2rem] text-success">
                              {tier.discount}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                        {item.metric.label}
                      </p>
                    </>
                  )}

                  {item.metric.kind === "flow" && (() => {
                    const flow = item.metric;
                    return (
                      <>
                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                          {flow.steps.map((step, idx) => (
                            <div key={step} className="flex items-center gap-2">
                              <span className="border-b border-success/45 pb-0.5 text-[0.9rem] font-semibold text-ink">
                                {step}
                              </span>
                              {idx < flow.steps.length - 1 && (
                                <span className="text-success/50" aria-hidden>
                                  →
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {flow.label}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
