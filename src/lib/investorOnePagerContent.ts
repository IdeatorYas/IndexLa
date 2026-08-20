import { readFileSync } from "fs";
import { join } from "path";

export type OnePagerSection = {
  id: string;
  title: string;
  body: string;
};

export type OnePagerContent = {
  coverTitle: string;
  coverLines: string[];
  sections: OnePagerSection[];
  closingLine: string;
  closingBrand: string;
};

function stripComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Loads content/investor-one-pager.md — single source of truth for the PDF.
 */
export function loadInvestorOnePagerContent(): OnePagerContent {
  const path = join(process.cwd(), "content", "investor-one-pager.md");
  const raw = stripComments(readFileSync(path, "utf8"));

  const closingMatch = raw.match(
    /^#\s+(WHERE ON-CHAIN[\s\S]*?)\n+##\s+(INDEXLA)\s*$/m,
  );
  const withoutClosing = closingMatch
    ? raw.slice(0, closingMatch.index).trim()
    : raw;

  const parts = withoutClosing.split(/\n(?=##\s+)/);
  const coverBlock = parts[0] ?? "";
  const coverLines = coverBlock
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const coverTitle =
    coverLines.find((l) => l.startsWith("# "))?.replace(/^#\s+/, "") ?? "INDEXLA";

  const coverBody = coverLines
    .filter((l) => !l.startsWith("# "))
    .map((l) => l.replace(/^###\s+/, "").replace(/^---$/, "").trim())
    .filter((l) => l && l !== "---");

  const sections: OnePagerSection[] = [];
  for (const part of parts.slice(1)) {
    const lines = part.split(/\r?\n/);
    const titleLine = lines[0] ?? "";
    const title = titleLine.replace(/^##\s+/, "").trim();
    const body = lines
      .slice(1)
      .join("\n")
      .replace(/^---+\s*$/gm, "")
      .trim();
    if (!title) continue;
    sections.push({ id: slugify(title), title, body });
  }

  return {
    coverTitle,
    coverLines: coverBody,
    sections,
    closingLine: closingMatch
      ? closingMatch[1].trim()
      : "WHERE ON-CHAIN ASSETS, CREATORS, AUTOMATION & CAPITAL CONVERGE.",
    closingBrand: closingMatch ? closingMatch[2].trim() : "INDEXLA",
  };
}

/** Split body into paragraphs / bullet-ish lines preserving exact wording. */
export function splitBodyLines(body: string): string[] {
  return body
    .split(/\r?\n/)
    .map((l) => l.replace(/\u00a0/g, " ").trimEnd())
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

export function sectionByTitle(
  content: OnePagerContent,
  title: string,
): OnePagerSection | undefined {
  return content.sections.find(
    (s) => s.title.toLowerCase() === title.toLowerCase(),
  );
}
