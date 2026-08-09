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

export default function WhitepaperPage() {
  const raw = getWhitepaperMarkdown();
  const title = extractWhitepaperTitle(raw);
  const markdown = stripDocumentTitle(raw, title);
  const toc = buildWhitepaperToc(markdown);

  return <WhitepaperShell title={title} markdown={markdown} toc={toc} />;
}
