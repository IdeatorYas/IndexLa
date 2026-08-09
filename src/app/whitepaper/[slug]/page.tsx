import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhitepaperShell } from "@/components/whitepaper/WhitepaperShell";
import { getWhitepaperMarkdown } from "@/lib/whitepaper.server";
import {
  extractWhitepaperTitle,
  markKeyStatements,
  splitWhitepaperSections,
  stripDocumentTitle,
  type WhitepaperSection,
} from "@/lib/whitepaper";

export const metadata: Metadata = {
  title: "Whitepaper — INDEXLA",
  description:
    "INDEXLA whitepaper: non-custodial multi-asset portfolio infrastructure, strategy automation, creator marketplace, and $DEXLA token economics.",
};

function loadSections(): { docTitle: string; sections: WhitepaperSection[] } {
  const raw = getWhitepaperMarkdown();
  const docTitle = extractWhitepaperTitle(raw);
  const body = stripDocumentTitle(raw, docTitle);
  const sections = splitWhitepaperSections(body).map((section) => ({
    ...section,
    markdown: markKeyStatements(section.markdown),
  }));
  return { docTitle, sections };
}

export function generateStaticParams() {
  const { sections } = loadSections();
  return sections.map((section) => ({ slug: section.slug }));
}

export default async function WhitepaperSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { docTitle, sections } = loadSections();
  const exists = sections.some((section) => section.slug === slug);
  if (!exists) notFound();

  return (
    <WhitepaperShell
      docTitle={docTitle}
      sections={sections}
      activeSlug={slug}
    />
  );
}
