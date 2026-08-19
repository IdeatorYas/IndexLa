"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkArchBody,
  tkArchCardBurn,
  tkArchCardUtility,
  tkArchMetricBurn,
  tkArchMetricLabel,
  tkArchMetricUtility,
  tkArchNum,
  tkArchTitle,
  tkBody,
  tkBurnGlow,
  tkBurnGrid,
  tkH2,
  tkSection,
  tkUtilityGlow,
  tkUtilityGrid,
} from "@/components/tokenomics/tokenomicsRhythm";

type Tone = "utility" | "burn";

type ArchCard = {
  n: string;
  title: string;
  lines: readonly ReactNode[];
  metric: string;
};

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
    <div className="flex flex-col items-center gap-2.5 text-center">
      <span className={`${tkArchNum} ${accent}`}>{n}</span>
      <h3 className={tkArchTitle}>{title}</h3>
    </div>
  );
}

function UtilityCard({
  item,
  delay,
}: {
  item: ArchCard;
  delay: number;
}) {
  const reduce = useReducedMotion();

  return (
    <FadeIn delay={delay} className="h-full">
      <motion.article
        className={`${tkArchCardUtility} h-full`}
        initial={reduce ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 text-center">
          <span className={`${tkArchNum} text-success`}>{item.n}</span>
          <h3 className={tkArchTitle}>{item.title}</h3>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-center">
          {item.lines.map((line, lineIndex) => (
            <p
              key={`${item.n}-${lineIndex}`}
              className={`${tkBody} text-balance text-pretty text-[1.05rem] leading-snug sm:text-[1.1rem]`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className={tkArchMetricUtility}>
          <p
            className={`${tkArchMetricLabel} text-success leading-snug text-balance text-pretty`}
          >
            {item.metric}
          </p>
        </div>
      </motion.article>
    </FadeIn>
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
  const metricShell =
    tone === "utility" ? tkArchMetricUtility : tkArchMetricBurn;
  const metricAccent = tone === "utility" ? "text-success" : "text-danger";

  return (
    <FadeIn delay={delay} className="h-full">
      <motion.article
        className={`${shell} h-full`}
        initial={reduce ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <ArchCardHeader n={item.n} title={item.title} tone={tone} />

        <div className={tkArchBody}>
          {item.lines.map((line, lineIndex) => (
            <p
              key={`${item.n}-${lineIndex}`}
              className={`${tkBody} text-[1.05rem] sm:text-[1.1rem]`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className={metricShell}>
          <p className={`${tkArchMetricLabel} ${metricAccent}`}>
            {item.metric}
          </p>
        </div>
      </motion.article>
    </FadeIn>
  );
}

const utilities: ArchCard[] = [
  {
    n: "01",
    title: "Publish",
    lines: [
      "Creators use $DEXLA to publish portfolios on the Marketplace.",
      "Publish portfolios to attract investors and earn from portfolio activity.",
    ],
    metric: "1,000 $DEXLA → Public Portfolio",
  },
  {
    n: "02",
    title: "Feature",
    lines: [
      "Creators use $DEXLA to promote portfolios on the Marketplace.",
      "Featured portfolios appear at the top of the Marketplace for greater visibility.",
    ],
    metric: "2,500 $DEXLA → 7 Days Featured",
  },
  {
    n: "03",
    title: "Monetize",
    lines: [
      "Creators use $DEXLA to list proprietary strategies on the Marketplace.",
      "Creators use $DEXLA to publish and monetize proprietary strategies. Earn access fees + 10% of applicable execution fees when your strategy is used.",
    ],
    metric: "500 $DEXLA → List Strategy · Set Access Price",
  },
  {
    n: "04",
    title: "Save",
    lines: [
      "Investors use $DEXLA to receive lower execution fees.",
      "Higher balances unlock greater fee discounts.",
    ],
    metric: "2,500 → 10% · 5,000 → 20% · 10,000 → 30%",
  },
  {
    n: "05",
    title: "Tip",
    lines: [
      "Investors use $DEXLA to directly support valuable creators.",
      "Tips contribute to Creator Leaderboard ranking and reward eligibility.",
    ],
    metric: "Discover → Follow → Invest → Tip",
  },
];

const burns: ArchCard[] = [
  {
    n: "01",
    title: "Publishing Burn",
    lines: [
      "Every public portfolio requires 1,000 $DEXLA to enter the Marketplace.",
      "The entire amount is permanently removed from the token supply.",
    ],
    metric: "Published Portfolio → 100% Burned",
  },
  {
    n: "02",
    title: "Featured Burn",
    lines: [
      "Creators use 2,500 $DEXLA to secure Featured placement for seven days.",
      "The entire amount is permanently removed from the token supply.",
    ],
    metric: "Featured Portfolio → 100% Burned",
  },
  {
    n: "03",
    title: "Strategy Listing Burn",
    lines: [
      "Creators pay 500 $DEXLA to list a strategy in the Creator Strategy Marketplace.",
      "The entire listing fee is permanently removed from the token supply.",
    ],
    metric: "Strategy Listing → 500 $DEXLA → 100% Burned",
  },
  {
    n: "04",
    title: "Strategy Access Burn",
    lines: [
      "When another creator purchases access to a listed strategy, the $DEXLA payment is split between the strategy creator and the burn.",
    ],
    metric: "Strategy Access → 50% Creator · 50% Burned",
  },
  {
    n: "05",
    title: "Execution Fee Buyback & Burn",
    lines: [
      "INDEXLA directs 10% of execution fee revenue toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the circulating supply.",
    ],
    metric: "Execution Fees → 10% Buyback & Burn",
  },
  {
    n: "06",
    title: "Treasury Buyback & Burn",
    lines: [
      "INDEXLA directs 25% of realized Treasury profits toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the circulating supply.",
    ],
    metric: "Treasury Profits → 25% Buyback & Burn",
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
          <h2 className={`${tkH2} uppercase`}>
            Five Core <span className="text-success">Utilities</span>
          </h2>
        </FadeIn>

        <div className={tkUtilityGrid}>
          {utilities.map((item, i) => (
            <UtilityCard key={item.n} item={item} delay={i * 0.03} />
          ))}
        </div>
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
          <h2 className={`${tkH2} uppercase`}>
            Six Burn <span className="text-danger">Mechanisms</span>
          </h2>
        </FadeIn>

        <div className={tkBurnGrid}>
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
