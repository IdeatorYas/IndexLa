import { cookies } from "next/headers";
import { BuildAutomateSection } from "@/components/home/BuildAutomateSection";
import { ContactUsSection } from "@/components/home/ContactUsSection";
import { CreatorsSection } from "@/components/home/CreatorsSection";
import { DexlaSection } from "@/components/home/DexlaSection";
import { DistributionSection } from "@/components/home/DistributionSection";
import { FeesSection } from "@/components/home/FeesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { Hero } from "@/components/home/Hero";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeRevealGate } from "@/components/home/reveal/HomeRevealGate";
import { REVEAL_COOKIE } from "@/components/home/reveal/revealAssets";
import { PortfolioExamplesSection } from "@/components/home/PortfolioExamplesSection";
import { SecurityControlSection } from "@/components/home/SecurityControlSection";
import { TokenizationSection } from "@/components/home/TokenizationSection";
import { WhatIsIndexlaSection } from "@/components/home/WhatIsIndexlaSection";
import { WhyIndexlaDifferentSection } from "@/components/home/WhyIndexlaDifferentSection";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ reveal?: string }>;
}) {
  const { reveal } = await searchParams;
  const cookieStore = await cookies();
  const skipReveal =
    cookieStore.get(REVEAL_COOKIE)?.value === "1" && reveal !== "1";

  const page = (
    <main>
      <Hero />
      <WhatIsIndexlaSection />
      <WhyIndexlaDifferentSection />
      <DistributionSection />
      <TokenizationSection />
      <BuildAutomateSection />
      <PortfolioExamplesSection />
      <SecurityControlSection />
      <CreatorsSection />
      <FeesSection />
      <DexlaSection />
      <FinalCtaSection />
      <HomeFaqSection />
      <ContactUsSection />
    </main>
  );

  if (skipReveal) return page;
  return <HomeRevealGate>{page}</HomeRevealGate>;
}
