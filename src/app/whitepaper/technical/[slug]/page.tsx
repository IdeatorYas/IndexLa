import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhitepaperSectionBody } from "@/components/whitepaper/WhitepaperSectionBody";
import { WhitepaperShell } from "@/components/whitepaper/WhitepaperShell";
import { prepareBodyMarkdown } from "@/lib/whitepaper";
import { loadDocsEdition } from "@/lib/whitepaper.server";

export const metadata: Metadata = {
  title: "Technical Paper | INDEXLA",
  description:
    "INDEXLA technical paper: non-custodial multi-asset cross-chain portfolio infrastructure architecture.",
};

export function generateStaticParams() {
  const { sections } = loadDocsEdition("technical-paper");
  return sections.map((section) => ({ slug: section.slug }));
}

export default async function TechnicalPaperSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technical = loadDocsEdition("technical-paper");
  const whitepaper = loadDocsEdition("whitepaper");
  const section = technical.sections.find((item) => item.slug === slug);
  if (!section) notFound();

  return (
    <WhitepaperShell
      edition="technical-paper"
      docTitle={technical.docTitle}
      sections={technical.sections}
      activeSlug={slug}
      switcherHrefs={{
        whitepaper: `/whitepaper/${whitepaper.sections[0]?.slug ?? "1-executive-summary"}`,
        technical: `/whitepaper/technical/${technical.sections[0]?.slug ?? slug}`,
      }}
    >
      <WhitepaperSectionBody
        slug={section.slug}
        markdown={prepareBodyMarkdown("technical-paper", section)}
      />
    </WhitepaperShell>
  );
}
