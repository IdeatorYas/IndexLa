import type { FaqBlock, FaqItem, FaqSection } from "@/lib/faq";

export function blockToPlainText(block: FaqBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "table":
      return [...block.headers, ...block.rows.flat()].join(" ");
  }
}

export function itemToSearchText(item: FaqItem): string {
  return [item.q, ...item.a.map(blockToPlainText)].join(" ");
}

function normalizeForSearch(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesQuery(text: string, query: string): boolean {
  const q = query.trim();
  if (!q) return true;

  const normalizedText = normalizeForSearch(text);
  const normalizedQuery = normalizeForSearch(q);
  if (!normalizedQuery) return true;

  return normalizedText.includes(normalizedQuery);
}

/** Display label for category tabs (strip leading section number). */
export function sectionTabLabel(title: string): string {
  return title.replace(/^\d+\.\s*/, "");
}

export function filterFaqSections(
  sections: FaqSection[],
  activeSectionId: string | null,
  query: string
): FaqSection[] {
  const scoped = activeSectionId
    ? sections.filter((section) => section.id === activeSectionId)
    : sections;

  const trimmedQuery = query.trim();
  if (!trimmedQuery) return scoped;

  return scoped
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        matchesQuery(`${section.title} ${itemToSearchText(item)}`, trimmedQuery)
      ),
    }))
    .filter((section) => section.items.length > 0);
}

export function countFaqItems(sections: FaqSection[]): number {
  return sections.reduce((total, section) => total + section.items.length, 0);
}

export function faqItemKey(sectionId: string, item: FaqItem): string {
  return `${sectionId}::${item.q}`;
}
