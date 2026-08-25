import { readFileSync } from "fs";
import { join } from "path";
import { parseStableClubMarkdown, type ParsedStableClub } from "@/lib/stable-club";

export function loadStableClub(): ParsedStableClub {
  const markdown = readFileSync(
    join(process.cwd(), "content", "stable-club.md"),
    "utf8"
  );
  return parseStableClubMarkdown(markdown);
}
