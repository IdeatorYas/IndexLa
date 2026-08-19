"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  ChainPills,
  DegenCopy,
  DegenSectionTitle,
  EXAMPLE_ALLOCATIONS,
  MemeCoinLogo,
  MEME_COINS,
} from "@/components/degen-club/DegenShared";
import { dcDisclaimer, dcLabel, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

const INDEX_CARDS = [
  { name: "Solana Degens", creator: "@alpha", chain: "Solana" },
  { name: "Base Meme Mix", creator: "@builder", chain: "Base" },
  { name: "Multi-Chain Beta", creator: "@flow", chain: "Multi-Chain" },
  { name: "ETH Culture Basket", creator: "@vault", chain: "Ethereum" },
] as const;

export function DegenDiscoverSection({ section }: { section: DegenSection }) {
  const discoverEnd = section.blocks.findIndex(
    (b) => b.type === "h3" && b.text.startsWith("BUILD")
  );
  const discoverBlocks =
    discoverEnd === -1 ? section.blocks : section.blocks.slice(0, discoverEnd);
  const buildBlocks =
    discoverEnd === -1 ? [] : section.blocks.slice(discoverEnd);

  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <DegenSectionTitle title={section.title} />
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-2xl border border-line bg-void/40 p-6">
                <DegenCopy blocks={discoverBlocks} />
                <div className="mt-4">
                  <ChainPills compact />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.06}>
              <div className="rounded-2xl border border-line bg-void/40 p-6">
                <DegenCopy blocks={buildBlocks} />
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {INDEX_CARDS.map((card, i) => (
                <article
                  key={card.name}
                  className="flex flex-col rounded-2xl border border-line bg-deep/60 p-4 transition-colors hover:border-electric/30"
                >
                  <p className={dcLabel}>{card.chain}</p>
                  <h3 className="display mt-2 text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                    {card.name}
                  </h3>
                  <p className="mt-1 text-[0.92rem] text-muted sm:text-[1rem]">{card.creator}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {MEME_COINS.slice(i, i + 4).map((c) => (
                      <MemeCoinLogo key={c.ticker} ticker={c.ticker} size="xs" />
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <AllocationBar items={EXAMPLE_ALLOCATIONS.slice(0, 4)} />
                    <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-electric sm:text-[0.82rem]">
                      Rules active
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className={`mt-4 text-center ${dcDisclaimer}`}>
              Illustrative index cards. Visual representation only.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
