import type { Metadata } from "next";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { HowItWorksPageCta } from "@/components/how-it-works/HowItWorksPageCta";
import { HowItWorksPageHero } from "@/components/how-it-works/HowItWorksPageHero";

export const metadata: Metadata = {
  title: "How It Works — INDEXLA",
  description:
    "See how INDEXLA works: create your portfolio, choose your strategy, confirm permissions, and let INDEXLA coordinate execution while you keep custody.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <HowItWorksPageHero />
      <HowItWorksSection showHeading={false} />
      <HowItWorksPageCta />
    </main>
  );
}
