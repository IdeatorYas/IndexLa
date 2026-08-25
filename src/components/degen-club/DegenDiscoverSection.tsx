"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  MemeCoinLogo,
  SupportedChainLogos,
} from "@/components/degen-club/DegenShared";
import {
  DEGEN_LANDING_INDEXES,
  DEGEN_LANDING_PORTFOLIOS,
  type DegenLandingBasket,
} from "@/components/degen-club/degenLandingBaskets";
import { dcDisclaimer, dcLabel, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

function BasketCard({ basket }: { basket: DegenLandingBasket }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-void/45 p-4 sm:p-5">
      <h3 className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
        {basket.title}
      </h3>
      <p className="mt-2 min-h-[4.5rem] text-[0.92rem] leading-relaxed text-muted sm:min-h-[4.75rem] sm:text-[0.98rem]">
        {basket.description}
      </p>
      <ul className="mt-4 grid flex-1 grid-cols-2 content-start gap-1.5 sm:grid-cols-5 sm:gap-2">
        {basket.assets.map((asset) => (
          <li
            key={`${basket.title}-${asset.ticker}-${asset.chain ?? "x"}`}
            className="flex min-w-0 flex-col items-center gap-1 rounded-lg border border-line/80 bg-deep/50 px-1 py-1.5"
          >
            <MemeCoinLogo ticker={asset.ticker} size="xs" />
            <span className="w-full truncate text-center text-[0.62rem] font-bold uppercase tracking-[0.04em] text-ink sm:text-[0.66rem]">
              {asset.ticker}
            </span>
            {asset.chain ? (
              <span className="w-full truncate text-center text-[0.55rem] text-muted-dim">
                {asset.chain}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function DegenDiscoverSection({ section }: { section: DegenSection }) {
  const discoverEnd = section.blocks.findIndex(
    (b) => b.type === "h3" && b.text.startsWith("BUILD")
  );
  const discoverBlocks =
    discoverEnd === -1 ? section.blocks : section.blocks.slice(0, discoverEnd);
  const buildBlocks =
    discoverEnd === -1 ? [] : section.blocks.slice(discoverEnd);

  const discoverTitle =
    discoverBlocks.find((b) => b.type === "h3")?.type === "h3"
      ? (discoverBlocks.find((b) => b.type === "h3") as { text: string }).text
      : "DISCOVER MEMECOIN INDEXES";
  const discoverCopy = discoverBlocks
    .filter((b) => b.type === "p")
    .map((b) => (b as { text: string }).text)
    .join(" ");

  const buildTitle =
    buildBlocks.find((b) => b.type === "h3")?.type === "h3"
      ? (buildBlocks.find((b) => b.type === "h3") as { text: string }).text
      : "BUILD YOUR OWN";
  const buildCopy = buildBlocks
    .filter((b) => b.type === "p")
    .map((b) => (b as { text: string }).text)
    .join(" ");

  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="display text-center text-[clamp(2rem,4.6vw,3.15rem)] font-semibold tracking-[-0.03em] text-ink">
              {section.title}
            </h2>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <FadeIn className="h-full">
              <div className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-line bg-void/40 p-6 sm:min-h-[12rem]">
                <p className={dcLabel}>{discoverTitle}</p>
                <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">
                  {discoverCopy}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.06} className="h-full">
              <div className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-line bg-void/40 p-6 sm:min-h-[12rem]">
                <p className={dcLabel}>{buildTitle}</p>
                <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">
                  {buildCopy}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-7 sm:mt-8">
            <SupportedChainLogos />
          </FadeIn>

          <FadeIn className="mt-10 sm:mt-12">
            <p className={`${dcLabel} text-center text-electric`}>Memecoin Indexes</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {DEGEN_LANDING_INDEXES.map((basket) => (
                <BasketCard key={basket.title} basket={basket} />
              ))}
            </div>
          </FadeIn>

          <FadeIn className="mt-10 sm:mt-12">
            <p className={`${dcLabel} text-center text-electric`}>
              Memecoin Portfolios
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {DEGEN_LANDING_PORTFOLIOS.map((basket) => (
                <BasketCard key={basket.title} basket={basket} />
              ))}
            </div>
            <p className={`mt-4 text-center ${dcDisclaimer}`}>
              Illustrative baskets. Visual representation only. Logos do not imply
              endorsement.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
