import type { Metadata } from "next";
import { FaqHero } from "@/components/faq/FaqHero";
import { FaqSections } from "@/components/faq/FaqSections";
import { loadFaqSections } from "@/lib/faq.server";

export const metadata: Metadata = {
  title: "FAQ | INDEXLA",
  description:
    "Frequently asked questions about INDEXLA: getting started, safety and risk, strategies and automation, fees and $DEXLA, and creators.",
};

export default function FaqPage() {
  const sections = loadFaqSections();

  return (
    <main>
      <FaqHero sections={sections} />
      <FaqSections sections={sections} />
    </main>
  );
}
