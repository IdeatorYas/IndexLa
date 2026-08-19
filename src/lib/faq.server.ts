import { readFileSync } from "fs";
import { join } from "path";
import { parseFaqMarkdown, type ParsedFaq } from "@/lib/faq";

export function loadFaq(): ParsedFaq {
  const markdown = readFileSync(
    join(process.cwd(), "content", "faq.md"),
    "utf8"
  );
  return parseFaqMarkdown(markdown);
}
