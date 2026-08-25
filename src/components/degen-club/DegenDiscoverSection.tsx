"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { LandingBasketDonut } from "@/components/degen-club/LandingBasketDonut";
import { DegenLandingChainLogo } from "@/components/degen-club/DegenLandingChainLogo";
import {
  MemeCoinLogo,
  SupportedChainLogos,
} from "@/components/degen-club/DegenShared";
import {
  basketChainIds,
  DEGEN_LANDING_INDEXES,
  DEGEN_LANDING_PORTFOLIOS,
  getChainMeta,
  type DegenChainId,
  type DegenLandingBasket,
} from "@/components/degen-club/degenLandingBaskets";
import {
  dcDisclaimer,
  dcSection,
} from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";
import type { ReactNode } from "react";

const dcCardHeading =
  "text-[1.05rem] font-bold uppercase tracking-[0.12em] text-electric sm:text-[1.15rem]";

function CategoryHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center rounded-2xl border border-electric/35 bg-gradient-to-b from-electric/[0.12] to-electric/[0.04] px-6 py-4 shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)] sm:px-10 sm:py-5">
      <p className="display text-center text-[clamp(1.75rem,4.2vw,2.55rem)] font-semibold tracking-[-0.03em] text-electric">
        {children}
      </p>
    </div>
  );
}

function ChainLogoMark({
  chainId,
  size = 28,
}: {
  chainId: DegenChainId;
  size?: number;
}) {
  const chain = getChainMeta(chainId);
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-void/80 p-1"
      style={{ width: size + 8, height: size + 8 }}
      title={chain.label}
    >
      <DegenLandingChainLogo chain={chainId} size={size} />
    </span>
  );
}

function BasketTitleBox({ basket }: { basket: DegenLandingBasket }) {
  const chains = basketChainIds(basket);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-deep/70 px-3.5 py-3 sm:gap-3.5 sm:px-4 sm:py-3.5">
      <div className="flex shrink-0 items-center gap-1.5">
        {chains.map((id) => (
          <ChainLogoMark key={id} chainId={id} size={26} />
        ))}
      </div>
      <h3 className="display min-w-0 flex-1 text-[1.2rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.35rem]">
        {basket.title}
      </h3>
    </div>
  );
}

function BasketCard({ basket }: { basket: DegenLandingBasket }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-void/45 p-4 sm:p-5">
      <BasketTitleBox basket={basket} />

      <p className="mt-3 text-[0.88rem] leading-relaxed text-muted sm:text-[0.94rem]">
        {basket.description}
      </p>

      <div className="mt-5 flex flex-1 flex-col items-center gap-5">
        <LandingBasketDonut
          segments={basket.assets.map((a) => ({
            ticker: a.ticker,
            percent: a.percent,
          }))}
          size={168}
        />

        <ul className="grid w-full min-w-0 grid-cols-2 gap-1.5 content-start">
          {basket.assets.map((asset) => (
            <li
              key={`${basket.title}-${asset.ticker}-${asset.chain ?? "x"}`}
              className="flex min-w-0 items-center gap-1.5 rounded-lg border border-line/70 bg-deep/45 px-1.5 py-1.5"
            >
              <MemeCoinLogo ticker={asset.ticker} size="xs" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.68rem] font-bold uppercase tracking-[0.04em] text-ink">
                  {asset.ticker}
                </p>
                {asset.chain ? (
                  <p className="truncate text-[0.58rem] text-muted-dim">
                    {asset.chain}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 text-[0.72rem] font-bold tabular-nums text-electric">
                {asset.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function DegenDiscoverSection({ section }: { section: DegenSection }) {
  const discoverEnd = section.blocks.findIndex(
    (b) => b.type === "h3" && b.text.startsWith("BUILD"),
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
    <section className={`${dcSection} overflow-x-clip bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto w-full max-w-6xl">
          <FadeIn>
            <h2 className="display text-center text-[clamp(2rem,4.6vw,3.15rem)] font-semibold tracking-[-0.03em] text-ink">
              {section.title}
            </h2>
          </FadeIn>

          <div className="mt-8 grid w-full gap-6 lg:grid-cols-2 lg:items-stretch">
            <FadeIn className="h-full min-w-0">
              <div className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-line bg-void/40 p-6 sm:min-h-[12rem]">
                <p className={dcCardHeading}>{discoverTitle}</p>
                <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">
                  {discoverCopy}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.06} className="h-full min-w-0">
              <div className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-line bg-void/40 p-6 sm:min-h-[12rem]">
                <p className={dcCardHeading}>{buildTitle}</p>
                <p className="mt-3 flex-1 text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem]">
                  {buildCopy}
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mt-7 sm:mt-8">
            <SupportedChainLogos />
          </FadeIn>

          <div className="mt-10 sm:mt-12">
            <FadeIn>
              <CategoryHeading>Memecoin Indexes</CategoryHeading>
            </FadeIn>
            <div className="mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              {DEGEN_LANDING_INDEXES.map((basket, i) => (
                <FadeIn key={basket.title} delay={0.04 * (i % 2)} className="min-w-0">
                  <BasketCard basket={basket} />
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <FadeIn>
              <CategoryHeading>Memecoin Portfolios</CategoryHeading>
            </FadeIn>
            <div className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
              {DEGEN_LANDING_PORTFOLIOS.map((basket, i) => (
                <FadeIn key={basket.title} delay={0.04 * (i % 3)} className="min-w-0">
                  <BasketCard basket={basket} />
                </FadeIn>
              ))}
            </div>
            <p className={`mt-5 text-center ${dcDisclaimer}`}>
              Illustrative baskets. Visual representation only. Logos do not imply
              endorsement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
