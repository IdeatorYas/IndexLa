import fs from "fs";
import path from "path";

export function getWhitepaperMarkdown(): string {
  const filePath = path.join(process.cwd(), "content", "whitepaper.md");
  return fs.readFileSync(filePath, "utf8");
}
