export type FaqBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type FaqItem = {
  q: string;
  a: FaqBlock[];
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

export type ParsedFaq = {
  sections: FaqSection[];
  disclaimer: FaqBlock[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*/g, "").trim();
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function parseMarkdownTable(lines: string[]): FaqBlock | null {
  if (lines.length < 2) return null;

  const headers = parseTableRow(lines[0]);
  const dataStart = lines[1].includes("---") ? 2 : 1;
  const rows = lines.slice(dataStart).map(parseTableRow).filter((row) => row.length);

  if (!headers.length || !rows.length) return null;

  return { type: "table", headers, rows };
}

function parseAnswerBlocks(body: string): FaqBlock[] {
  const trimmed = body.replace(/\n---\s*$/m, "").trim();
  const lines = trimmed.split("\n");
  const blocks: FaqBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const table = parseMarkdownTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (!current) break;
      if (current.startsWith("|") || /^\d+\.\s/.test(current)) break;
      paraLines.push(current.replace(/\s{2,}$/, ""));
      i++;
    }

    if (paraLines.length === 1) {
      blocks.push({ type: "paragraph", text: paraLines[0] });
    } else {
      for (const text of paraLines) {
        blocks.push({ type: "paragraph", text });
      }
    }
  }

  return blocks;
}

function extractDisclaimer(markdown: string): {
  content: string;
  disclaimer: FaqBlock[];
} {
  const disclaimerMatch = markdown.match(
    /\n##\s+\*?\*?Important Disclaimer\*?\*?\s*\n([\s\S]*)$/i
  );

  if (!disclaimerMatch) {
    return { content: markdown, disclaimer: [] };
  }

  const disclaimerBody = disclaimerMatch[1].replace(/\n---\s*$/m, "").trim();
  return {
    content: markdown.slice(0, disclaimerMatch.index).trim(),
    disclaimer: parseAnswerBlocks(disclaimerBody),
  };
}

/**
 * Parse content/faq.md into FAQ sections and disclaimer.
 * Supports `#` / `##` section titles and `###` questions.
 */
export function parseFaqMarkdown(markdown: string): ParsedFaq {
  const { content, disclaimer } = extractDisclaimer(markdown);
  const withoutTitle = content.replace(/^#\s+\*?\*?INDEXLA FAQ\*?\*?\s*\n+/i, "");
  const sectionChunks = withoutTitle
    .split(/\n(?=#{1,2}\s+(?!#))/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const sections: FaqSection[] = [];

  for (const chunk of sectionChunks) {
    const headingMatch = chunk.match(/^#{1,2}\s+(.+?)\s*\n/);
    if (!headingMatch) continue;

    const title = stripMarkdownBold(headingMatch[1]);
    const rest = chunk.slice(headingMatch[0].length).replace(/^---\s*/m, "").trim();
    const itemChunks = rest
      .split(/\n(?=###\s+)/)
      .map((part) => part.trim())
      .filter(Boolean);

    const items: FaqItem[] = [];
    for (const itemChunk of itemChunks) {
      const qMatch = itemChunk.match(/^###\s+(.+?)\s*\n([\s\S]*)$/);
      if (!qMatch) continue;
      const q = stripMarkdownBold(qMatch[1]);
      const a = parseAnswerBlocks(qMatch[2]);
      if (q && a.length) items.push({ q, a });
    }

    if (items.length) {
      sections.push({ id: slugify(title), title, items });
    }
  }

  return { sections, disclaimer };
}
