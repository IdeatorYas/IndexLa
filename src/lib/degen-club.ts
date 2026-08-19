export type DegenBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "cta"; text: string };

export type DegenSection = {
  id: string;
  title: string;
  blocks: DegenBlock[];
};

export type ParsedDegenClub = {
  sections: DegenSection[];
  disclaimer: string[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseBlocks(body: string): DegenBlock[] {
  const blocks: DegenBlock[] = [];
  const lines = body.trim().split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === "---") {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.endsWith("→")) {
      blocks.push({ type: "cta", text: line });
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (!current || current === "---") break;
      if (
        current.startsWith("## ") ||
        current.startsWith("### ") ||
        current.endsWith("→")
      ) {
        break;
      }
      paraLines.push(current);
      i++;
    }

    if (paraLines.length) {
      blocks.push({ type: "p", text: paraLines.join("\n") });
    }
  }

  return blocks;
}

export function parseDegenClubMarkdown(markdown: string): ParsedDegenClub {
  const disclaimerMatch = markdown.match(
    /\n##\s+Important Risk Disclaimer\s*\n([\s\S]*)$/i
  );

  const main = disclaimerMatch
    ? markdown.slice(0, disclaimerMatch.index).trim()
    : markdown.trim();

  const disclaimer = disclaimerMatch
    ? disclaimerMatch[1]
        .trim()
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const chunks = main
    .split(/\n---\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const sections: DegenSection[] = [];
  const usedIds = new Map<string, number>();

  for (const chunk of chunks) {
    const titleMatch = chunk.match(/^#\s+(.+?)\s*\n([\s\S]*)$/);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    let id = slugify(title);
    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    sections.push({
      id,
      title,
      blocks: parseBlocks(titleMatch[2]),
    });
  }

  return { sections, disclaimer };
}

export function blocksOfType(
  blocks: DegenBlock[],
  type: DegenBlock["type"]
): DegenBlock[] {
  return blocks.filter((block) => block.type === type);
}

export function paragraphTexts(blocks: DegenBlock[]): string[] {
  return blocks.filter((b) => b.type === "p").map((b) => (b as { text: string }).text);
}
