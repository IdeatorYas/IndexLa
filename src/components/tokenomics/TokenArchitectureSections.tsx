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

/** Exact FOUR CORE UTILITIES copy from content/tokenomics.md */
const utilities: ArchCard[] = [
  {
    n: "01",
    title: "Publish",
    lines: [
      "Portfolios are private by default and free to build, test, and refine.",
      "Creators pay $DEXLA to publish and make portfolios visible to the community.",
      "Public portfolios can attract investors and earn creator fees.",
    ],
    metric: "1,000 $DEXLA → Public Portfolio",
  },
  {
    n: "02",
    title: "Feature",
    lines: [
      "More portfolios compete for investor attention as the Marketplace grows.",
      "Creators use $DEXLA to secure Featured placement for 7 days.",
      "Greater visibility can attract investors, followers, AUM, and creator fees.",
    ],
    metric: "2,500 $DEXLA → 7 Days Featured",
  },
  {
    n: "03",
    title: "Save",
    lines: [
      "Investors holding $DEXLA receive lower execution fees on platform activity.",
      "Higher balances unlock greater discounts while maintaining the required balance.",
      "Larger holdings directly reduce the cost of automated portfolio activity.",
    ],
    metric: "2,500 → 10% · 5,000 → 25% · 10,000 → 40%",
  },
  {
    n: "04",
    title: "Tip",
    lines: [
      "Investors tip creators in $DEXLA to appreciate valuable research and insights.",
      "INDEXLA charges no performance fees, making tips an additional creator reward.",
      "Other tokens are supported, but $DEXLA tips help creators rank higher.",
    ],
    metric: "Discover → Follow → Invest → Tip",
  },
];

/** Exact FOUR BURN MECHANISMS copy from content/tokenomics.md */
const burns: ArchCard[] = [
  {
    n: "01",
    title: "Publishing Burn",
    lines: [
      "$DEXLA is the only accepted token for publishing portfolios and indexes to earn on the Marketplace.",
      "Each public launch requires 1,000 $DEXLA, permanently removed from the token supply.",
      "This creates a direct supply-reduction mechanism tied to Marketplace growth.",
    ],
    metric: "Published Portfolio → 100% Burned",
  },
  {
    n: "02",
    title: "Featured Burn",
    lines: [
      "Featured placement creates a paid marketing channel for creators competing for attention.",
      "Creators use 2,500 $DEXLA to secure top Marketplace placement for 7 days.",
      "The mechanism converts creator promotion activity directly into permanent supply reduction.",
    ],
    metric: "Featured Portfolio → 100% Burned",
  },
  {
    n: "03",
    title: "Execution Fee Burn",
    lines: [
      "INDEXLA directs 10% of execution fee revenue toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the token supply.",
      "The mechanism scales with platform usage and execution activity.",
    ],
    metric: "Execution Fees → 10% Burned",
  },
  {
    n: "04",
    title: "Treasury Burn",
    lines: [
      "INDEXLA directs 25% of realized Treasury profits toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the token supply.",
      "The mechanism links Treasury profitability with long-term token supply reduction.",
    ],
    metric: "Treasury Profits → 25% Burned",
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
