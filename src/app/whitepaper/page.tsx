import { redirect } from "next/navigation";
import { loadDocsEdition } from "@/lib/whitepaper.server";

export default function WhitepaperIndexPage() {
  const { sections } = loadDocsEdition("whitepaper");
  redirect(`/whitepaper/${sections[0]?.slug ?? "1-executive-summary"}`);
}
