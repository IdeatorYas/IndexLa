"use client";

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
  lines: readonly [string, string, string];
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
            className={`text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-balance sm:text-[1.05rem] ${metricAccent}`}
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
      "Publishing requires a fixed $DEXLA amount to access the Marketplace.",
    ],
    metric: "1,000 $DEXLA → Public Portfolio",
  },
  {
    n: "02",
    title: "Feature",
    lines: [
      "Creators use $DEXLA to increase portfolio visibility on the Marketplace.",
      "Featured placement puts strategies in front of more potential investors.",
      "Greater visibility can drive followers, AUM, and creator earnings.",
    ],
    metric: "2,500 $DEXLA → 7 Days Featured",
  },
  {
    n: "03",
    title: "Monetize",
    lines: [
      "Creators can make their strategies available to other creators.",
      "They set their own price for others to access and use them.",
      "This creates another direct revenue opportunity for strategy creators.",
    ],
    metric: "Creator Sets Price → Other Creators Pay",
  },
  {
    n: "04",
    title: "Save",
    lines: [
      "Investors holding $DEXLA receive lower execution fees on platform activity.",
      "Higher balances unlock greater discounts while maintaining the required balance.",
      "Larger holdings can directly reduce automated portfolio execution costs.",
    ],
    metric: "2,500 → 10% · 5,000 → 25% · 10,000 → 40%",
  },
  {
    n: "05",
    title: "Tip",
    lines: [
      "Investors can tip creators directly in $DEXLA for valuable strategies.",
      "Tips reward creators without introducing management or performance fees.",
      "$DEXLA tips also strengthen creator engagement and Marketplace participation.",
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
      "Supply reduction scales directly with creator and Marketplace growth.",
    ],
    metric: "Published Portfolio → 100% Burned",
  },
  {
    n: "02",
    title: "Featured Burn",
    lines: [
      "Creators use 2,500 $DEXLA to secure Featured placement for seven days.",
      "The entire amount is permanently removed from the token supply.",
      "Creator promotion therefore creates direct and measurable supply reduction.",
    ],
    metric: "Featured Portfolio → 100% Burned",
  },
  {
    n: "03",
    title: "Execution Fee Burn",
    lines: [
      "INDEXLA directs 10% of execution fee revenue toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the circulating supply.",
      "The mechanism scales naturally with platform execution and user activity.",
    ],
    metric: "Execution Fees → 10% Buyback & Burn",
  },
  {
    n: "04",
    title: "Treasury Burn",
    lines: [
      "INDEXLA directs 25% of realized Treasury profits toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the circulating supply.",
      "The mechanism connects Treasury profitability with long-term supply reduction.",
    ],
    metric: "Treasury Profits → 25% Buyback & Burn",
  },
  {
    n: "05",
    title: "Strategy Monetization Burn",
    lines: [
      "Creators set a price for others to use and copy their strategies.",
      "Other creators pay the required $DEXLA to access the strategy.",
      "Half of each payment is distributed to the creator and burned.",
    ],
    metric: "Strategy Access → 50% Creator · 50% Burned",
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
            Five Burn <span className="text-danger">Mechanisms</span>
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
