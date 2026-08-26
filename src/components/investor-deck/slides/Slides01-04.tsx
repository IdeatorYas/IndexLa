import {
  ChainNetworkHub,
  MegaFlow,
  ProductPillarFlow,
  ProductPortfolioShell,
  TokenizationCascade,
} from "@/components/investor-deck/DeckVisuals";
import { SlideShell } from "@/components/investor-deck/SlideShell";
import {
  deckAccentLine,
  deckBody,
  deckBodyStrong,
  deckH1Hero,
  deckH2,
  deckLead,
  deckSubhead,
} from "@/components/investor-deck/deckRhythm";
import { LOGO_DECK } from "@/lib/site";
import Image from "next/image";

const PRODUCT_PILLARS = [
  {
    title: "DISCOVER",
    body: "Find portfolios, indexes and strategies.",
  },
  {
    title: "BUILD",
    body: "Create diversified cross-asset portfolios.",
  },
  {
    title: "AUTOMATE",
    body: "Set rules for rebalancing, taking profit and rotating , Buy Fear / Sell Greed, RSI, momentum & trend following.",
  },
  {
    title: "OWN",
    body: "Own the underlying assets directly, no index tokens, no wrappers, no custody.",
  },
] as const;

export function Slide01Cover() {
  return (
    <SlideShell n="01" className="deck-hero-bg">
      <div className="relative flex h-full flex-col justify-center">
        <div className="deck-hero-glow left-[12%] top-[5%] h-[560px] w-[560px] bg-electric/18" aria-hidden />
        <div className="deck-hero-glow bottom-[0%] right-[0%] h-[500px] w-[500px] bg-purple/22" aria-hidden />
        <Image
          src={LOGO_DECK}
          alt="INDEXLA"
          width={920}
          height={280}
          className="relative h-[230px] w-auto max-w-[920px] object-contain"
          priority
        />
        <div className={`${deckAccentLine} relative mt-10 w-40`} />
        <h1 className={`${deckH1Hero} relative mt-8 max-w-[1700px] text-ink`}>
          Decentralized Portfolio Management
        </h1>
        <p className={`${deckSubhead} relative mt-6 max-w-[1600px]`}>
          The Distribution Layer for On-Chain Capital Markets
        </p>
        <p className="relative mt-8 display text-[2.85rem] font-semibold tracking-[-0.03em] text-ink">
          Discover. Build. Automate. Own.
        </p>
        <div className="relative mt-10 flex flex-wrap gap-3">
          {[
            "Cross-Chain",
            "Cross-Asset",
            "Non-Custodial",
            "AI-Assisted",
            "Privacy-Protected",
          ].map((tag) => (
            <span
              key={tag}
              className="deck-flow-node px-5 py-3 text-[1.35rem] font-semibold uppercase tracking-[0.06em] text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide02BigShift() {
  return (
    <SlideShell n="02">
      <div className="flex h-full flex-col">
        <h2 className={deckH2}>Everyone Is Tokenizing Assets.</h2>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="flex flex-col justify-center gap-8">
            <p className={`${deckLead} !text-[2.35rem] !text-electric`}>
              Assets are moving on-chain.
            </p>
            <p className={`${deckBody} !text-[1.85rem] text-ink`}>
              Tokenization solves availability not distribution, portfolio management or
              execution.
            </p>
            <div className="deck-surface-accent rounded-2xl px-7 py-6">
              <p className={`${deckLead} !text-electric`}>
                INDEXLA turns tokenized assets into investable, distributable products.
              </p>
            </div>
          </div>
          <TokenizationCascade />
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide03MissingLayer() {
  return (
    <SlideShell n="03">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} !text-[3.6rem]`}>
          On-Chain Assets Need an Investment Layer.
        </h2>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="flex flex-col justify-center gap-5">
            <p className={`${deckLead} text-ink`}>
              More assets. More chains. More wallets. More opportunities.
            </p>
            <p className={`${deckBody} text-muted`}>
              But discovery, portfolio construction and execution remain fragmented.
            </p>
            <p className={`${deckBodyStrong} text-ink`}>
              INDEXLA connects everything into one layer:
            </p>
            <MegaFlow steps={["Discover", "Build", "Automate", "Own"]} accent large />
            <p className={`${deckLead} !text-electric`}>
              One portfolio layer for the expanding on-chain economy.
            </p>
          </div>
          <ChainNetworkHub />
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide04Product() {
  return (
    <SlideShell n="04">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} !text-[3.35rem]`}>
          The Investment & Distribution Layer for On-Chain Assets
        </h2>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-7">
          <ProductPillarFlow pillars={PRODUCT_PILLARS} />
          <div className="flex min-h-0 flex-col gap-4">
            <div className="min-h-0 flex-1">
              <ProductPortfolioShell />
            </div>
            <p className="text-center display text-[2rem] font-semibold text-electric">
              One portfolio. Full control. True ownership.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
