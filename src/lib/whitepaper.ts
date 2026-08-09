export type TocItem = {
  id: string;
  title: string;
  depth: 1 | 2 | 3 | 4;
  children: TocItem[];
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainTextFromHeading(raw: string): string {
  return raw.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

export function extractWhitepaperTitle(markdown: string): string {
  const firstLine = markdown
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);
  return firstLine?.trim() || "INDEXLA WHITEPAPER";
}

export function buildWhitepaperToc(markdown: string): TocItem[] {
  const roots: TocItem[] = [];
  const stack: TocItem[] = [];
  const usedIds = new Map<string, number>();

  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const match = /^(#{1,4})\s+(.+)$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 1 | 2 | 3 | 4;
    const title = plainTextFromHeading(match[2]);
    let id = slugifyHeading(title);
    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

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

/** Flat list of heading ids in document order for scroll spy */
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
