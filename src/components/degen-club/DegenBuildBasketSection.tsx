"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  DegenAccentHeadline,
  DegenCopy,
} from "@/components/degen-club/DegenShared";
import type { DegenSection } from "@/lib/degen-club";

function BuildBasketCopy({ blocks }: { blocks: DegenSection["blocks"] }) {
  const chainLine = "Solana · Ethereum · Base · BNB · Multi-Chain";
  const filtered = blocks.filter(
    (b) => !(b.type === "p" && b.text.replace(/\*\*/g, "").trim() === chainLine),
  );

  return (
    <DegenCopy
      blocks={filtered}
      className="mx-auto max-w-2xl space-y-3 text-center sm:space-y-3.5"
    />
  );
}

export function DegenBuildBasketSection({ section }: { section: DegenSection }) {
  const copyBlocks = section.blocks.filter((b) => b.type !== "cta");
  const cta = section.blocks.find((b) => b.type === "cta");

  return (
    <section className="relative flex min-h-0 items-center border-t border-line/80 bg-deep py-12 md:py-16 lg:py-20">
      <div className="section-pad container-max w-full">
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <DegenAccentHeadline text={section.title} as="h2" align="center" />
          <div className="mt-6 w-full sm:mt-7">
            <BuildBasketCopy blocks={copyBlocks} />
          </div>
          {cta?.type === "cta" ? (
            <div className="mt-7 flex justify-center sm:mt-8">
              <DegenCopy blocks={[cta]} />
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
