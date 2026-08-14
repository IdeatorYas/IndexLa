import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
  homeChip,
  homeEyebrow,
  homeH2,
  homeMeasure,
  homePill,
  homeSection,
} from "@/components/home/homeRhythm";

const supportedAssets = [
  "Crypto",
  "Tokenized Stocks",
  "Tokenized Commodities",
  "Tokenized Real Estate",
] as const;

const supportedNetworks = [
  "Ethereum",
  "Base",
  "Arbitrum",
  "BNB Chain",
  "Solana",
  "Sui",
  "Robinhood",
] as const;

export function WhatIsIndexlaSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.08),transparent_65%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <FadeIn className="text-center">
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-electric/70 to-transparent" />

          <p className={homeEyebrow}>What is INDEXLA?</p>
          <h2 className={`mx-auto mt-3 ${homeMeasure} ${homeH2}`}>
            Decentralized Portfolio Management
          </h2>

          <div className={`mx-auto mt-7 max-w-2xl space-y-4 ${homeBody}`}>
            <p className={homeBodyStrong}>
              INDEXLA is a non-custodial portfolio layer for crypto and tokenized
              assets.
            </p>
            <p className="text-balance">
              Build your own portfolio, follow creator strategies, or automate
              rules — while always holding the underlying assets in your wallet.
            </p>
          </div>

          <div className="mx-auto mt-9 max-w-3xl">
            <p className={homeEyebrow}>Supported Assets</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {supportedAssets.map((asset) => (
                <span key={asset} className={homePill}>
                  {asset}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <p className={homeEyebrow}>Supported Networks</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {supportedNetworks.map((network) => (
                <span key={network} className={homeChip}>
                  {network}
                </span>
              ))}
            </div>
          </div>

          <p
            className={`mx-auto mt-9 max-w-2xl text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.125rem]`}
          >
            Your keys. Your assets. INDEXLA can never touch your funds.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <HomeReadMore href="/investors" label="Investor Guide →" />
            <HomeReadMore href="/creators" label="Creator Guide →" />
            <HomeReadMore href="/strategies" label="Strategies →" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
