import { readFileSync } from "fs";
import { join } from "path";
import { parseFaqMarkdown, type FaqSection } from "@/lib/faq";

export function loadFaqSections(): FaqSection[] {
  const markdown = readFileSync(
    join(process.cwd(), "content", "faq.md"),
    "utf8"
  );
  return parseFaqMarkdown(markdown);
}
