export type StableBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "cta"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "italic"; text: string };

export type StableFaqItem = {
  q: string;
  a: string;
};

export type StableSection = {
  id: string;
  title: string;
  blocks: StableBlock[];
  faq?: StableFaqItem[];
};

export type ParsedStableClub = {
  sections: StableSection[];
  disclaimer: {
    title: string;
    paragraphs: string[];
  };
};

function stripMdBold(text: string): string {
  return text.replace(/\*\*/g, "").trim();
}

function slugify(title: string): string {
  return stripMdBold(title)
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFaqItems(body: string): StableFaqItem[] {
  const items: StableFaqItem[] = [];
  const lines = body.trim().split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === "---") {
      i++;
      continue;
    }

    if (line.startsWith("**") && line.includes("?**")) {
      const q = stripMdBold(line);
      i++;
      const answerLines: string[] = [];
      while (i < lines.length) {
        const current = lines[i].trim();
        if (!current || current === "---") break;
        if (current.startsWith("**") && current.includes("?**")) break;
        if (current.startsWith("###")) break;
        answerLines.push(current);
        i++;
      }
      items.push({ q, a: answerLines.join("\n").trim() });
      continue;
    }

    i++;
  }

  return items;
}

function parseBlocks(body: string): StableBlock[] {
  const blocks: StableBlock[] = [];
  const lines = body.trim().split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === "---") {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: stripMdBold(line.slice(3)) });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: stripMdBold(line.slice(4)) });
      i++;
      continue;
    }

    if (line.endsWith("→")) {
      blocks.push({ type: "cta", text: line });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const current = lines[i].trim();
        if (!current.startsWith("- ")) break;
        items.push(stripMdBold(current.slice(2)));
        i++;
      }
      if (items.length) blocks.push({ type: "ul", items });
      continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      blocks.push({ type: "italic", text: stripMdBold(line) });
      i++;
      continue;
    }

    if (line.startsWith("**") && line.includes("?**")) {
      break;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (!current || current === "---") break;
      if (
        current.startsWith("## ") ||
        current.startsWith("### ") ||
        current.startsWith("- ") ||
        current.endsWith("→") ||
        (current.startsWith("**") && current.includes("?**"))
      ) {
        break;
      }
      if (current.startsWith("*") && current.endsWith("*") && !current.startsWith("**")) {
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

export function parseStableClubMarkdown(markdown: string): ParsedStableClub {
  const disclaimerMatch = markdown.match(
    /\n###\s+\*\*Risk Disclaimer\*\*\s*\n([\s\S]*)$/i
  );

  const main = disclaimerMatch
    ? markdown.slice(0, disclaimerMatch.index).trim()
    : markdown.trim();

  const disclaimerBody = disclaimerMatch?.[1]?.trim() ?? "";
  const disclaimerParagraphs = disclaimerBody
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = main
    .split(/\n---\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const sections: StableSection[] = [];
  const usedIds = new Map<string, number>();

  for (const chunk of chunks) {
    const h1Match = chunk.match(/^#\s+\*\*(.+?)\*\*\s*\n([\s\S]*)$/);
    const h2Match = chunk.match(/^##\s+\*\*(.+?)\*\*\s*\n([\s\S]*)$/);

    let title: string;
    let body: string;

    if (h1Match) {
      title = stripMdBold(h1Match[1]);
      body = h1Match[2];
    } else if (h2Match) {
      title = stripMdBold(h2Match[1]);
      body = h2Match[2];
    } else {
      continue;
    }

    let id = slugify(title);
    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    const faq =
      slugify(title) === "faq" ? parseFaqItems(body) : undefined;

    sections.push({
      id,
      title,
      blocks: parseBlocks(body),
      faq,
    });
  }

  return {
    sections,
    disclaimer: {
      title: "Risk Disclaimer",
      paragraphs: disclaimerParagraphs,
    },
  };
}

export function blocksOfType(
  blocks: StableBlock[],
  type: StableBlock["type"]
): StableBlock[] {
  return blocks.filter((block) => block.type === type);
}

export function paragraphTexts(blocks: StableBlock[]): string[] {
  return blocks.filter((b) => b.type === "p").map((b) => b.text);
}
