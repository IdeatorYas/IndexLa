import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhitepaperSectionBody } from "@/components/whitepaper/WhitepaperSectionBody";
import { WhitepaperShell } from "@/components/whitepaper/WhitepaperShell";
import { prepareBodyMarkdown } from "@/lib/whitepaper";
import { loadDocsEdition } from "@/lib/whitepaper.server";

export const metadata: Metadata = {
  title: "Whitepaper | INDEXLA",
  description:
    "INDEXLA whitepaper: non-custodial multi-asset portfolio infrastructure, strategy automation, creator marketplace, and $DEXLA token economics.",
};

export function generateStaticParams() {
  const { sections } = loadDocsEdition("whitepaper");
  return sections.map((section) => ({ slug: section.slug }));
}

export default async function WhitepaperSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const whitepaper = loadDocsEdition("whitepaper");
  const technical = loadDocsEdition("technical-paper");
  const section = whitepaper.sections.find((item) => item.slug === slug);
  if (!section) notFound();

  return (
    <WhitepaperShell
      edition="whitepaper"
      docTitle={whitepaper.docTitle}
      sections={whitepaper.sections}
      activeSlug={slug}
      switcherHrefs={{
        whitepaper: `/whitepaper/${whitepaper.sections[0]?.slug ?? slug}`,
        technical: `/whitepaper/technical/${technical.sections[0]?.slug ?? "1-architecture-overview"}`,
      }}
    >
      <WhitepaperSectionBody
        slug={section.slug}
        markdown={prepareBodyMarkdown("whitepaper", section)}
        lightTheme
      />
    </WhitepaperShell>
  );
}
