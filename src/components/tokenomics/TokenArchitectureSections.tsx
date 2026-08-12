"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkArchBody,
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

type Tone = "utility" | "burn";

type ArchCard = {
  n: string;
  title: string;
  body: string;
  note?: string;
  metric:
    | { kind: "arrow"; amount: string; label: string; result: string }
    | { kind: "tiers"; rows: { hold: string; discount: string }[]; result: string }
    | { kind: "flow"; steps: readonly string[] };
};

function MetricShell({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  const shell = tone === "utility" ? tkArchMetricUtility : tkArchMetricBurn;
  return <div className={shell}>{children}</div>;
}

function ArrowMetric({
  tone,
  amount,
  label,
  result,
}: {
  tone: Tone;
  amount: string;
  label: string;
  result: string;
}) {
  const accent = tone === "utility" ? "text-success" : "text-danger";
  const arrow = tone === "utility" ? "text-success/50" : "text-danger/50";

  return (
    <MetricShell tone={tone}>
      <p className={`${tkStat} ${accent}`}>{amount}</p>
      <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </p>
      <div className={`my-2 ${arrow}`} aria-hidden>
        →
      </div>
      <p className="display text-[1rem] leading-snug tracking-[-0.02em] text-ink text-balance sm:text-[1.05rem]">
        {result}
      </p>
    </MetricShell>
  );
}

function ArchCardHeader({
  n,
  title,
  tone,
}: {
  n: string;
  title: string;
  tone: Tone;
}) {
  const accent = tone === "utility" ? "text-success" : "text-danger";
  return (
    <div className="flex items-baseline gap-3">
      <span className={`${tkArchNum} ${accent}`}>{n}</span>
      <h3 className={tkArchTitle}>{title}</h3>
    </div>
  );
}

function ArchitectureCard({
  item,
  tone,
  delay,
}: {
  item: ArchCard;
  tone: Tone;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const shell = tone === "utility" ? tkArchCardUtility : tkArchCardBurn;
  const tierRule =
    tone === "utility" ? "border-success/15" : "border-danger/15";
  const tierAccent = tone === "utility" ? "text-success" : "text-danger";
  const flowRule =
    tone === "utility" ? "border-success/45" : "border-danger/45";
  const flowArrow =
    tone === "utility" ? "text-success/50" : "text-danger/50";

  return (
    <FadeIn delay={delay} className="h-full">
      <motion.article
        className={shell}
        initial={reduce ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <ArchCardHeader n={item.n} title={item.title} tone={tone} />

        <div className={tkArchBody}>
          <p className={tkBody}>{item.body}</p>
          {item.note ? <p className={`mt-2.5 ${tkBody}`}>{item.note}</p> : null}
        </div>

        {item.metric.kind === "arrow" && (
          <ArrowMetric
            tone={tone}
            amount={item.metric.amount}
            label={item.metric.label}
            result={item.metric.result}
          />
        )}

        {item.metric.kind === "tiers" && (
          <MetricShell tone={tone}>
            <div className="w-full space-y-2 text-left">
              {item.metric.rows.map((row) => (
                <div
                  key={row.hold}
                  className={`flex items-center justify-between gap-3 border-b ${tierRule} pb-1.5 last:border-0 last:pb-0`}
                >
                  <span className="text-[0.88rem] font-medium tabular-nums text-ink">
                    {row.hold}
                    <span className={`mx-1.5 ${tierAccent}/50`}>→</span>
                  </span>
                  <span className={`display text-[1rem] ${tierAccent}`}>
                    {row.discount}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 display text-[0.95rem] leading-snug tracking-[-0.02em] text-ink text-balance">
              {item.metric.result}
            </p>
          </MetricShell>
        )}

        {item.metric.kind === "flow" && (
          <MetricShell tone={tone}>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
              {item.metric.steps.map((step, idx, steps) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className={`border-b ${flowRule} pb-0.5 text-[0.88rem] font-semibold text-ink`}
                  >
                    {step}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className={flowArrow} aria-hidden>
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
  );
}

/** Latest Cursor docs — utility copy */
const utilities: ArchCard[] = [
  {
    n: "01",
    title: "Publish",
    body: "Creators use $DEXLA to publish public portfolios and indexes on the INDEXLA Marketplace.",
    note: "Private portfolios remain free for building and testing before going public.",
    metric: {
      kind: "arrow",
      amount: "1,000",
      label: "$DEXLA",
      result: "Public Portfolio",
    },
  },
  {
    n: "02",
    title: "Feature",
    body: "Creators use $DEXLA to feature a published portfolio at the top of the INDEXLA Marketplace for 7 days.",
    note: "This is a Marketing Option.",
    metric: {
      kind: "arrow",
      amount: "2,500",
      label: "$DEXLA",
      result: "7 Days Featured",
    },
  },
  {
    n: "03",
    title: "Save",
    body: "Investors holding $DEXLA receive lower execution fees while maintaining the required balance.",
    metric: {
      kind: "tiers",
      rows: [
        { hold: "2,500", discount: "10% discount" },
        { hold: "5,000", discount: "25% discount" },
        { hold: "10,000", discount: "40% discount" },
      ],
      result: "Hold $DEXLA → Save on execution",
    },
  },
  {
    n: "04",
    title: "Tip Creators",
    body: "Investors and followers can tip creators directly in $DEXLA for research, portfolio construction, market views, and community contribution.",
    metric: {
      kind: "flow",
      steps: ["Discover", "Follow", "Invest", "Tip"] as const,
    },
  },
];

/** Latest Cursor docs — burn copy */
const burns: ArchCard[] = [
  {
    n: "01",
    title: "Publishing Burn",
    body: "Every public portfolio or index permanently burns 1,000 $DEXLA from the token supply.",
    metric: {
      kind: "arrow",
      amount: "1,000",
      label: "$DEXLA burned",
      result: "More portfolios → More $DEXLA burned",
    },
  },
  {
    n: "02",
    title: "Featured Burn",
    body: "Every Featured promotion permanently burns 2,500 $DEXLA from the token supply.",
    note: "Creators can promote again as their audience, AUM, and volume grow.",
    metric: {
      kind: "arrow",
      amount: "2,500",
      label: "$DEXLA burned",
      result: "More promotion → More $DEXLA burned",
    },
  },
  {
    n: "03",
    title: "Execution Fee Buyback & Burn",
    body: "10% of INDEXLA's execution fee revenue is used to buy and permanently burn $DEXLA.",
    metric: {
      kind: "arrow",
      amount: "10%",
      label: "Of execution fees",
      result: "More execution volume → More $DEXLA burned",
    },
  },
  {
    n: "04",
    title: "Treasury Buyback & Burn",
    body: "25% of realized Treasury profits are used to buy and permanently burn $DEXLA.",
    note: "Treasury gains are generated from protocol-owned capital, not investor funds.",
    metric: {
      kind: "arrow",
      amount: "25%",
      label: "Of realized Treasury profits",
      result: "More Treasury gains → More $DEXLA burned",
    },
  },
];

export function TokenUtilitySection() {
  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
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
            <ArchitectureCard
              key={item.n}
              item={item}
              tone="utility"
              delay={i * 0.03}
            />
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-success">
            Also included
          </p>
          <p className={`mt-2 ${tkBody} text-balance`}>
            Governance &amp; ecosystem participation
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export function TokenBurnMechanismSection() {
  return (
    <section className={`${tkSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
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
        </FadeIn>

        <div className={tkArchGrid}>
          {burns.map((item, i) => (
            <ArchitectureCard
              key={item.n}
              item={item}
              tone="burn"
              delay={i * 0.03}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
