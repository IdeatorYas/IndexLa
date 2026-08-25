"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/stable-club/StableShared";
import { scBody, scH2, scH3, scSection } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

type StrategyCard = {
  title: string;
  risk: string;
  pair: string;
  apy: string;
  description: string;
  accent: "blue" | "teal" | "green";
  assets: { src: string; label: string }[];
};

const ACCENTS = {
  blue: {
    border: "border-[rgba(37,99,235,0.25)]",
    bg: "bg-[var(--sc-blue-soft)]",
    badge: "bg-[var(--sc-blue)]/10 text-[var(--sc-blue)]",
    apy: "text-[var(--sc-blue)]",
  },
  teal: {
    border: "border-[rgba(13,148,136,0.25)]",
    bg: "bg-[var(--sc-teal-soft)]",
    badge: "bg-[var(--sc-teal)]/10 text-[var(--sc-teal)]",
    apy: "text-[var(--sc-teal)]",
  },
  green: {
    border: "border-[rgba(5,150,105,0.25)]",
    bg: "bg-[var(--sc-green-soft)]",
    badge: "bg-[var(--sc-green)]/10 text-[var(--sc-green)]",
    apy: "text-[var(--sc-green)]",
  },
};

function parseStrategies(blocks: StableBlock[]): StrategyCard[] {
  const cards: StrategyCard[] = [];
  let current: Partial<StrategyCard> | null = null;

  for (const block of blocks) {
    if (block.type === "h3") {
      if (current?.title) {
        cards.push(current as StrategyCard);
      }
      const accent =
        block.text === "Stable Pools"
          ? "blue"
          : block.text === "Stable-Weighted Range"
            ? "teal"
            : "green";
      const assets =
        block.text === "Stable Pools"
          ? [
              { src: "/images/assets/demo/crypto/dai.svg", label: "Stable" },
              { src: "/images/assets/demo/crypto/dai.svg", label: "Stable" },
            ]
          : block.text === "Stable-Weighted Range"
            ? [
                { src: "/images/assets/demo/crypto/dai.svg", label: "Stable" },
                { src: "/images/assets/ethereum.svg", label: "ETH" },
              ]
            : [
                { src: "/images/assets/demo/crypto/dai.svg", label: "Stable" },
                { src: "/images/assets/bitcoin.svg", label: "BTC" },
              ];
      current = { title: block.text, accent, assets } as Partial<StrategyCard>;
      continue;
    }

    if (!current || block.type !== "p") continue;

    const lines = block.text
      .split("\n")
      .map((line) => line.replace(/\*\*/g, "").trim())
      .filter(Boolean);

    for (const line of lines) {
      if (line.includes("Risk") && line.includes("·")) {
        const [risk, pair] = line.split("·").map((s) => s.trim());
        current.risk = risk;
        current.pair = pair;
      } else if (line.startsWith("Indicative APY:")) {
        current.apy = line.replace("Indicative APY:", "").trim();
      } else if (!line.includes("Indicative APY") && !line.includes("Risk")) {
        current.description = line;
      }
    }
  }

  if (current?.title) {
    cards.push(current as StrategyCard);
  }

  return cards;
}

function StrategyCardUI({ card }: { card: StrategyCard }) {
  const a = ACCENTS[card.accent];

  return (
    <article
      className={`sc-card-elevated flex h-full flex-col p-6 sm:p-7 ${a.border}`}
    >
      <div className={`inline-flex self-start rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${a.badge}`}>
        {card.risk}
      </div>
      <h3 className={`mt-4 ${scH3}`}>{card.title}</h3>
      <p className="mt-2 text-[0.88rem] font-medium text-[var(--sc-muted)]">
        {card.pair}
      </p>

      <div className="mt-5 flex items-center gap-2">
        {card.assets.map((asset) => (
          <AssetLogo key={asset.label} src={asset.src} alt={asset.label} size={36} />
        ))}
      </div>

      <p className={`mt-5 display text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold leading-none tracking-[-0.03em] ${a.apy}`}>
        {card.apy}
      </p>
      <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--sc-muted-dim)]">
        Indicative APY
      </p>

      <p className={`mt-5 flex-1 ${scBody}`}>{card.description}</p>
    </article>
  );
}

export function StableRiskStrategiesSection({ section }: { section: StableSection }) {
  const disclaimer = section.blocks.find((b) => b.type === "italic");
  const strategies = parseStrategies(section.blocks);

  return (
    <section className={scSection}>
      <div className="section-pad container-max">
        <FadeIn>
          <h2 className={`text-center ${scH2}`}>{section.title}</h2>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3 lg:gap-6">
            {strategies.map((card) => (
              <StrategyCardUI key={card.title} card={card} />
            ))}
          </div>

          {disclaimer ? (
            <p className="mx-auto mt-8 max-w-3xl text-center italic sc-body text-[var(--sc-muted)]">
              {disclaimer.text}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
