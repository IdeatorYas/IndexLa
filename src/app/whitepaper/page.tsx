import type { Metadata } from "next";
import { Suspense } from "react";
import { WhitepaperShell } from "@/components/whitepaper/WhitepaperShell";
import { getWhitepaperMarkdown } from "@/lib/whitepaper.server";
import {
  extractWhitepaperTitle,
  markKeyStatements,
  splitWhitepaperSections,
  stripDocumentTitle,
} from "@/lib/whitepaper";

export const metadata: Metadata = {
  title: "Whitepaper — INDEXLA",
  description:
    "INDEXLA whitepaper: non-custodial multi-asset portfolio infrastructure, strategy automation, creator marketplace, and $DEXLA token economics.",
};

export default function WhitepaperPage() {
  const raw = getWhitepaperMarkdown();
  const docTitle = extractWhitepaperTitle(raw);
  const body = stripDocumentTitle(raw, docTitle);
  const sections = splitWhitepaperSections(body).map((section) => ({
    ...section,
    markdown: markKeyStatements(section.markdown),
  }));

  return (
    <Suspense
      fallback={
        <main className="section-pad mx-auto max-w-[84rem] pt-28 text-muted">
          Loading whitepaper…
        </main>
      }
    >
      <WhitepaperShell docTitle={docTitle} sections={sections} />
    </Suspense>
  );
}
