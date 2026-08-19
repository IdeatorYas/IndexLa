import { readFileSync } from "fs";
import { join } from "path";
import { parseDegenClubMarkdown, type ParsedDegenClub } from "@/lib/degen-club";

export function loadDegenClub(): ParsedDegenClub {
  const markdown = readFileSync(
    join(process.cwd(), "content", "degen-club.md"),
    "utf8"
  );
  return parseDegenClubMarkdown(markdown);
}
