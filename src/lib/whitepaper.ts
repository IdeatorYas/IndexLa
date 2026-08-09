export type TocItem = {
  id: string;
  title: string;
  depth: 1 | 2 | 3 | 4;
  children: TocItem[];
};

export type WhitepaperSection = {
  slug: string;
  index: number;
  number: number;
  /** Exact major-section headline from the whitepaper (no number prefix) */
  headline: string;
  /** Sidebar/nav label: "N. Headline" */
  title: string;
  markdown: string;
  subsections: TocItem[];
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[.]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainTextFromHeading(raw: string): string {
  return raw.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

function nextUniqueId(usedIds: Map<string, number>, title: string): string {
  let id = slugifyHeading(title);
  const count = usedIds.get(id) ?? 0;
  usedIds.set(id, count + 1);
  if (count > 0) id = `${id}-${count + 1}`;
  return id;
}

export function extractWhitepaperTitle(markdown: string): string {
  const firstLine = markdown
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);
  return firstLine?.trim() || "INDEXLA WHITEPAPER";
}

export function stripDocumentTitle(markdown: string, title: string): string {
  const lines = markdown.split(/\r?\n/);
  const idx = lines.findIndex(
    (line) => line.trim() === title || line.trim().endsWith(title),
  );
  if (idx === -1) return markdown.trim();
  return lines
    .slice(idx + 1)
    .join("\n")
    .trim();
}

/** Top-level numbered chapters: `## 1. ...` or `# 2. ...` */
function isMajorSectionHeading(line: string): RegExpMatchArray | null {
  return /^(#{1,2})\s+(\d+)\.\s+(.+)$/.exec(line);
}

export function buildHeadingTree(markdown: string): TocItem[] {
  const roots: TocItem[] = [];
  const stack: TocItem[] = [];
  const usedIds = new Map<string, number>();

  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(#{1,4})\s+(.+)$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 1 | 2 | 3 | 4;
    const title = plainTextFromHeading(match[2]);
    const id = nextUniqueId(usedIds, title);
    const item: TocItem = { id, title, depth, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      roots.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }
    stack.push(item);
  }

  return roots;
}

export function flattenToc(items: TocItem[]): TocItem[] {
  const out: TocItem[] = [];
  const walk = (nodes: TocItem[]) => {
    for (const node of nodes) {
      out.push(node);
      if (node.children.length) walk(node.children);
    }
  };
  walk(items);
  return out;
}

export function splitWhitepaperSections(bodyMarkdown: string): WhitepaperSection[] {
  const lines = bodyMarkdown.split(/\r?\n/);
  const starts: { lineIndex: number; number: number; title: string }[] = [];

  lines.forEach((line, lineIndex) => {
    const match = isMajorSectionHeading(line);
    if (!match) return;
    starts.push({
      lineIndex,
      number: Number(match[2]),
      title: plainTextFromHeading(match[3]),
    });
  });

  return starts.map((start, index) => {
    const end = starts[index + 1]?.lineIndex ?? lines.length;
    const chunkLines = lines.slice(start.lineIndex, end);
    // Keep major heading in markdown for hierarchy; shell also shows title.
    const markdown = chunkLines.join("\n").replace(/^---\s*$/gm, "").trim();
    const subsections = buildHeadingTree(markdown);

    return {
      slug: slugifyHeading(`${start.number}-${start.title}`),
      index,
      number: start.number,
      headline: start.title,
      title: `${start.number}. ${start.title}`,
      markdown,
      subsections,
    };
  });
}

/** Remove the competitor markdown table; rendered by CompetitorComparisonTable instead */
export function stripCompetitorMarkdownTable(markdown: string): string {
  return markdown
    .replace(
      /\n\| Capability[\s\S]*?\| Yes — brokerage assets \|\n+/,
      "\n\n",
    )
    .replace(
      /\*Competitive features reflect publicly available product positioning and may evolve over time\.\*\n*/,
      "",
    );
}

export function markKeyStatements(markdown: string): string {
  return markdown.replace(/^(\*\*[^*\n]+\*\*)\s*$/gm, "> $1");
}

export function formatProgress(index: number, total: number): string {
  const current = String(index + 1).padStart(2, "0");
  const end = String(total).padStart(2, "0");
  return `${current} / ${end}`;
}
