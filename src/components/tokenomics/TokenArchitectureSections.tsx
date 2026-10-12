"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBurnGlow,
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

function TokenArchCard({
  item,
  tone,
  delay,
}: {
  item: ArchCard;
  tone: Tone;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const accent = tone === "utility" ? "text-success" : "text-danger";
  const shell =
    tone === "utility"
      ? "border-success/35 bg-panel/35 shadow-[0_16px_48px_rgba(0,0,0,0.22)] hover:border-success/55"
      : "border-danger/35 bg-panel/35 shadow-[0_16px_48px_rgba(0,0,0,0.22)] hover:border-danger/55";
  const headerBox =
    tone === "utility"
      ? "border-success/30 bg-success/[0.08]"
      : "border-danger/30 bg-danger/[0.08]";
  const metricBox =
    tone === "utility"
      ? "border-success/35 bg-success/[0.1]"
      : "border-danger/35 bg-danger/[0.1]";

  return (
    <FadeIn delay={delay} className="h-full">
      <motion.article
        className={`flex h-full flex-col gap-2 rounded-2xl border p-2 transition-[border-color,background-color] duration-300 sm:gap-2.5 sm:p-2.5 ${shell}`}
        initial={reduce ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          className={`flex min-h-[6.75rem] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border px-3 py-3.5 text-center sm:min-h-[7.5rem] xl:min-h-[10.25rem] ${headerBox}`}
        >
          <span
            className={`display text-[1.85rem] font-semibold leading-none tabular-nums tracking-[-0.05em] xl:text-[2.05rem] ${accent}`}
          >
            {item.n}
          </span>
          <h3 className="display text-[0.98rem] font-semibold uppercase leading-tight tracking-[-0.02em] text-ink text-balance sm:text-[1.05rem] xl:text-[1rem]">
            {item.title}
          </h3>
        </div>

        <div className="flex min-h-[7.5rem] flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-void/45 px-3 py-4 text-center">
          {item.lines.map((line, lineIndex) => (
            <p
              key={`${item.n}-${lineIndex}`}
              className="text-balance text-pretty text-[0.98rem] leading-snug text-muted sm:text-[1.02rem]"
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className={`mt-auto flex min-h-[4.75rem] shrink-0 items-center justify-center rounded-xl border px-3 py-3 text-center xl:min-h-[6.75rem] ${metricBox}`}
        >
          <p
            className={`${accent} text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-balance text-pretty sm:text-[1rem] xl:text-[1.02rem]`}
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
    title: "Strategy Access",
    lines: [
      "Creators use $DEXLA to list strategies other creators can purchase.",
      "Authors earn 100% of access payments plus 10% of applicable execution fees.",
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
    title: "Execution Fee Buyback & Burn",
    lines: [
      "INDEXLA directs 10% of execution fee revenue toward $DEXLA buybacks.",
      "Purchased tokens are permanently removed from the circulating supply.",
    ],
    metric: "Execution Fees → 10% Buyback & Burn",
  },
  {
    n: "05",
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
            <TokenArchCard
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

        <div className={tkUtilityGrid}>
          {burns.map((item, i) => (
            <TokenArchCard
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
