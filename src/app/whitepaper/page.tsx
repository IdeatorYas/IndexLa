import { redirect } from "next/navigation";
import { getWhitepaperMarkdown } from "@/lib/whitepaper.server";
import {
  extractWhitepaperTitle,
  splitWhitepaperSections,
  stripDocumentTitle,
} from "@/lib/whitepaper";

export default function WhitepaperIndexPage() {
  const raw = getWhitepaperMarkdown();
  const docTitle = extractWhitepaperTitle(raw);
  const sections = splitWhitepaperSections(stripDocumentTitle(raw, docTitle));
  redirect(`/whitepaper/${sections[0]?.slug ?? "1-executive-summary"}`);
}
