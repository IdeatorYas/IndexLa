export type FaqItem = {
  q: string;
  a: string[];
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Split answer body into paragraphs on blank lines. */
function paragraphsFromBody(body: string): string[] {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join(" ")
        .trim()
    )
    .filter(Boolean);
}

/**
 * Parse content/faq.md into FAQ sections.
 * Supports `##` / `#` section titles and `###` questions.
 */
export function parseFaqMarkdown(markdown: string): FaqSection[] {
  const withoutTitle = markdown.replace(/^#\s+INDEXLA FAQ\s*\n+/i, "");
  const sectionChunks = withoutTitle
    .split(/\n(?=#{1,2}\s+(?!#))/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const sections: FaqSection[] = [];

  for (const chunk of sectionChunks) {
    const headingMatch = chunk.match(/^#{1,2}\s+(.+?)\s*\n/);
    if (!headingMatch) continue;

    const title = headingMatch[1].trim();
    const rest = chunk.slice(headingMatch[0].length).replace(/^---\s*/m, "").trim();
    const itemChunks = rest
      .split(/\n(?=###\s+)/)
      .map((part) => part.trim())
      .filter(Boolean);

    const items: FaqItem[] = [];
    for (const itemChunk of itemChunks) {
      const qMatch = itemChunk.match(/^###\s+(.+?)\s*\n([\s\S]*)$/);
      if (!qMatch) continue;
      const q = qMatch[1].trim();
      const a = paragraphsFromBody(qMatch[2].replace(/\n---\s*$/m, ""));
      if (q && a.length) items.push({ q, a });
    }

    if (items.length) {
      sections.push({ id: slugify(title), title, items });
    }
  }

  return sections;
}
