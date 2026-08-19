import type { Metadata } from "next";
import { FaqExperience } from "@/components/faq/FaqExperience";
import { FaqHero } from "@/components/faq/FaqHero";
import { loadFaq } from "@/lib/faq.server";

export const metadata: Metadata = {
  title: "FAQ | INDEXLA",
  description:
    "Frequently asked questions about INDEXLA: fees, $DEXLA, creators, security, cross-chain execution, tokenomics, and risks.",
};

export default function FaqPage() {
  const { sections, disclaimer } = loadFaq();

  return (
    <main>
      <FaqHero />
      <FaqExperience sections={sections} disclaimer={disclaimer} />
    </main>
  );
}
