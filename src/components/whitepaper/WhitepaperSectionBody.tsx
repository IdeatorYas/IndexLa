"use client";

import type { ReactNode } from "react";
import { WhitepaperMarkdown } from "@/components/whitepaper/WhitepaperMarkdown";
import {
  getSectionVisuals,
  type SectionVisual,
} from "@/components/whitepaper/sectionVisuals";
import { slugifyHeading } from "@/lib/whitepaper";

type Block = {
  id: string | null;
  markdown: string;
  level: number | null;
};

/** Sections where ### or ## topics become scannable concept cards */
const CARDIFY_SECTIONS: Record<string, number> = {
  "2-the-problem": 3,
  "3-the-indexla-solution": 3,
  "4-why-now": 3,
  "6-why-the-architecture-gap-is-structural": 3,
  "7-market-opportunity": 3,
  "9-how-indexla-works": 3,
  "12-strategies": 3,
  "18-risk-factors": 3,
};

/** Sections where bullet lists become accent concept tiles */
const ACCENT_LIST_SECTIONS = new Set([
  "2-the-problem",
  "5-why-indexla-differs",
  "9-business-model",
  "11-investor-experience",
  "13-creator-economy",
  "14-dexla-utility-tokenomics",
]);

function plainHeading(raw: string): string {
  return raw.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function splitIntoHeadingBlocks(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  let current: string[] = [];
  let currentId: string | null = null;
  let currentLevel: number | null = null;
  const usedIds = new Map<string, number>();

  const push = () => {
    const text = current.join("\n").trim();
    if (!text) return;
    blocks.push({ id: currentId, markdown: text, level: currentLevel });
  };

  for (const line of lines) {
    const match = /^(#{1,4})\s+(.+)$/.exec(line);
    if (match) {
      push();
      const title = plainHeading(match[2]);
      let id = slugifyHeading(title);
      const count = usedIds.get(id) ?? 0;
      usedIds.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;
      currentId = id;
      currentLevel = match[1].length;
      current = [line];
    } else {
      current.push(line);
    }
  }
  push();
  return blocks;
}

function visualsAfter(
  visuals: SectionVisual[],
  headingId: string | null,
): SectionVisual[] {
  return visuals.filter(
    (v) =>
      v.placement === "after" &&
      (v.afterHeadingId ?? null) === headingId,
  );
}

function ConceptCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-line bg-deep/45 px-4 py-4 sm:px-5 sm:py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-electric via-purple-bright/80 to-transparent"
        aria-hidden
      />
      <p className="mb-2 text-[0.65rem] font-semibold tabular-nums tracking-[0.14em] text-electric">
        {String(index + 1).padStart(2, "0")}
      </p>
      {children}
    </div>
  );
}

export function WhitepaperSectionBody({
  slug,
  markdown,
}: {
  slug: string;
  markdown: string;
}) {
  const visuals = getSectionVisuals(slug);
  const before = visuals.filter(
    (v) => v.placement === "before" && !v.afterHeadingId,
  );
  const end = visuals.filter((v) => v.placement === "end");
  const blocks = splitIntoHeadingBlocks(markdown);
  const prologueVisuals = visualsAfter(visuals, null);
  const cardifyLevel = CARDIFY_SECTIONS[slug] ?? null;
  const accentLists = ACCENT_LIST_SECTIONS.has(slug);

  let cardIndexCounter = 0;

  return (
    <div>
      {before.map((v) => (
        <div key={v.id}>{v.node}</div>
      ))}

      {blocks.length === 0 ? (
        <WhitepaperMarkdown markdown={markdown} accentLists={accentLists} />
      ) : (
        blocks.map((block, index) => {
          const asCard =
            cardifyLevel != null && block.level === cardifyLevel;
          const cardIndex = asCard ? cardIndexCounter++ : 0;
          const content = (
            <WhitepaperMarkdown
              markdown={block.markdown}
              resetTop={index === 0 || asCard}
              card={asCard}
              accentLists={accentLists && !asCard}
            />
          );

          return (
            <div key={`${block.id ?? "block"}-${index}`}>
              {asCard ? (
                <ConceptCard index={cardIndex}>{content}</ConceptCard>
              ) : (
                content
              )}
              {visualsAfter(visuals, block.id).map((v) => (
                <div key={v.id}>{v.node}</div>
              ))}
              {index === 0 && block.id === null
                ? prologueVisuals.map((v) => <div key={v.id}>{v.node}</div>)
                : null}
            </div>
          );
        })
      )}

      {end.map((v) => (
        <div key={v.id}>{v.node}</div>
      ))}
    </div>
  );
}
