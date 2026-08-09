import { redirect } from "next/navigation";
import { loadDocsEdition } from "@/lib/whitepaper.server";

export default function TechnicalPaperIndexPage() {
  const { sections } = loadDocsEdition("technical-paper");
  redirect(
    `/whitepaper/technical/${sections[0]?.slug ?? "1-architecture-overview"}`,
  );
}
