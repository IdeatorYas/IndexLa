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
  tkUtilityGlow,
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
    <div className="flex flex-col items-center gap-2 text-center">
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
  const metricShell =
    tone === "utility" ? tkArchMetricUtility : tkArchMetricBurn;
  const metricAccent = tone === "utility" ? "text-success" : "text-danger";

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
          {item.lines.map((line, lineIndex) => (
            <p key={`${item.n}-${lineIndex}`} className={tkBody}>
              {line}
            </p>
          ))}
        </div>

        <div className={metricShell}>
          <p
            className={`text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-balance sm:text-[1rem] ${metricAccent}`}
          >
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
      "Public portfolios become discoverable and can attract investors and followers.",
    ],
    metric: "1,000 $DEXLA → Public Portfolio",
  },
  {
    n: "02",
    title: "Feature",
    lines: [
      "Creators use $DEXLA to increase portfolio visibility on the Marketplace.",
      "Featured placement puts portfolios in front of more potential investors.",
    ],
    metric: "2,500 $DEXLA → 7 Days Featured",
  },
  {
    n: "03",
    title: "Monetize",
    lines: [
      <>
        Creators can make their proprietary strategies available to other
        creators through the{" "}
        <span className="font-semibold text-ink">
          Creator Strategy Marketplace
        </span>
        .
      </>,
      "Pay 500 $DEXLA to list a strategy in the Creator Strategy Marketplace, then set your own access price in $DEXLA.",
      "Other creators pay in $DEXLA to access and use your strategy.",
    ],
    metric: "500 $DEXLA → List Strategy · Creator Sets Price",
  },
  {
    n: "04",
    title: "Access",
    lines: [
      <>
        Creators can discover and access strategies from other creators through
        the{" "}
        <span className="font-semibold text-ink">
          Creator Strategy Marketplace
        </span>
        .
      </>,
      "Pay the creator’s set access price in $DEXLA to use the strategy in your own portfolio.",
      "Investors using a strategy through a portfolio they invest in pay no separate strategy access fee.",
    ],
    metric: "Discover Strategy → Pay $DEXLA → Use Strategy",
  },
  {
    n: "05",
    title: "Save",
    lines: [
      "Investors holding $DEXLA receive lower execution fees on platform activity.",
      "Higher balances unlock greater discounts.",
    ],
    metric: "2,500 → 10% · 5,000 → 20% · 10,000 → 30%",
  },
  {
    n: "06",
    title: "Tip",
    lines: [
      "Investors can tip creators directly in $DEXLA for valuable strategies.",
      "$DEXLA tips also contribute to Creator Rewards ranking.",
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
            Six Core <span className="text-success">Utilities</span>
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
