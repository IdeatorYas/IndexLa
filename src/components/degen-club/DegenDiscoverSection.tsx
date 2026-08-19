"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  ChainPills,
  DegenCopy,
  EXAMPLE_ALLOCATIONS,
  MEME_COINS,
} from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
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
            <h2 className={`${dcH2} text-center text-ink`}>{section.title}</h2>
          </FadeIn>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
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

          <FadeIn className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {INDEX_CARDS.map((card, i) => (
                <article
                  key={card.name}
                  className="flex flex-col rounded-2xl border border-line bg-deep/60 p-4 transition-colors hover:border-electric/30"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    {card.chain}
                  </p>
                  <h3 className="display mt-2 text-[1.05rem] tracking-[-0.02em] text-ink">
                    {card.name}
                  </h3>
                  <p className="mt-1 text-[0.8rem] text-muted">{card.creator}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {MEME_COINS.slice(i, i + 4).map((c) => (
                      <span
                        key={c.ticker}
                        className="rounded-md border px-1.5 py-0.5 text-[0.62rem] font-bold"
                        style={{ borderColor: `${c.color}44`, color: c.color }}
                      >
                        {c.ticker}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <AllocationBar items={EXAMPLE_ALLOCATIONS.slice(0, 4)} />
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.82rem] text-muted-dim">
              Illustrative index cards. Visual representation only.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
