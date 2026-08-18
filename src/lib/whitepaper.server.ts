import fs from "fs";
import path from "path";
import type { DocsEdition, WhitepaperSection } from "@/lib/whitepaper";
import {
  extractWhitepaperTitle,
  markKeyStatements,
  normalizeTechnicalPaperBody,
  splitWhitepaperSections,
  stripDocumentTitle,
} from "@/lib/whitepaper";

export function getWhitepaperMarkdown(): string {
  const filePath = path.join(process.cwd(), "content", "whitepaper.md");
  return fs.readFileSync(filePath, "utf8");
}

export function getTechnicalPaperMarkdown(): string {
  const filePath = path.join(process.cwd(), "content", "technical-paper.md");
  return fs.readFileSync(filePath, "utf8");
}

export function getDocsMarkdown(edition: DocsEdition): string {
  return edition === "technical-paper"
    ? getTechnicalPaperMarkdown()
    : getWhitepaperMarkdown();
}

export function loadDocsEdition(edition: DocsEdition): {
  docTitle: string;
  sections: WhitepaperSection[];
} {
  const raw = getDocsMarkdown(edition);
  const docTitle = extractWhitepaperTitle(raw);
  let body = stripDocumentTitle(raw, docTitle);

  if (edition === "technical-paper") {
    body = normalizeTechnicalPaperBody(body);
  }

  const sections = splitWhitepaperSections(body).map((section) => ({
    ...section,
    markdown:
      section.slug === "11-investor-experience"
        ? section.markdown
        : markKeyStatements(section.markdown),
  }));

  return { docTitle, sections };
}
