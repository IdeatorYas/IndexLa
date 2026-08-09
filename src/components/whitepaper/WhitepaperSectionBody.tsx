"use client";

import { WhitepaperMarkdown } from "@/components/whitepaper/WhitepaperMarkdown";
import {
  getSectionVisuals,
  type SectionVisual,
} from "@/components/whitepaper/sectionVisuals";
import { slugifyHeading } from "@/lib/whitepaper";

type Block = {
  id: string | null;
  markdown: string;
};

function plainHeading(raw: string): string {
  return raw.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function splitIntoHeadingBlocks(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  let current: string[] = [];
  let currentId: string | null = null;
  const usedIds = new Map<string, number>();

  const push = () => {
    const text = current.join("\n").trim();
    if (!text) return;
    blocks.push({ id: currentId, markdown: text });
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

export function WhitepaperSectionBody({
  slug,
  markdown,
}: {
  slug: string;
  markdown: string;
}) {
  const visuals = getSectionVisuals(slug);
  const before = visuals.filter((v) => v.placement === "before" && !v.afterHeadingId);
  const blocks = splitIntoHeadingBlocks(markdown);

  // Visuals with afterHeadingId that match; also support after null = after prologue if any
  const prologueVisuals = visualsAfter(visuals, null);

  return (
    <div>
      {before.map((v) => (
        <div key={v.id}>{v.node}</div>
      ))}

      {blocks.length === 0 ? (
        <WhitepaperMarkdown markdown={markdown} />
      ) : (
        blocks.map((block, index) => (
          <div key={`${block.id ?? "block"}-${index}`}>
            <WhitepaperMarkdown
              markdown={block.markdown}
              resetTop={index === 0}
            />
            {visualsAfter(visuals, block.id).map((v) => (
              <div key={v.id}>{v.node}</div>
            ))}
            {index === 0 && block.id === null
              ? prologueVisuals.map((v) => <div key={v.id}>{v.node}</div>)
              : null}
          </div>
        ))
      )}
    </div>
  );
}
