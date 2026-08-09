import type { Metadata } from "next";
import { WhitepaperShell } from "@/components/whitepaper/WhitepaperShell";
import { getWhitepaperMarkdown } from "@/lib/whitepaper.server";
import {
  buildWhitepaperToc,
  extractWhitepaperTitle,
  stripDocumentTitle,
} from "@/lib/whitepaper";

export const metadata: Metadata = {
  title: "Whitepaper — INDEXLA",
  description:
    "INDEXLA whitepaper: non-custodial multi-asset portfolio infrastructure, strategy automation, creator marketplace, and $DEXLA token economics.",
};

/** Mark standalone bold paragraphs as blockquotes for callout rendering */
function markKeyStatements(markdown: string): string {
  return markdown.replace(/^(\*\*[^*\n]+\*\*)\s*$/gm, "> $1");
}

export default function WhitepaperPage() {
  const raw = getWhitepaperMarkdown();
  const title = extractWhitepaperTitle(raw);
  const body = stripDocumentTitle(raw, title);
  const toc = buildWhitepaperToc(body);
  const markdown = markKeyStatements(body);

  return <WhitepaperShell title={title} markdown={markdown} toc={toc} />;
}
