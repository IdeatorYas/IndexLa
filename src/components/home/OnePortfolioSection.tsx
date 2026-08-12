import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeChip,
  homeCta,
  homeEyebrow,
  homeH2,
  homePill,
  homeSection,
} from "@/components/home/homeRhythm";

const markets = [
  "Crypto",
  "Tokenized Stocks",
  "Commodities",
  "RWAs",
  "Hybrid Portfolios",
] as const;

const networks = [
  "Ethereum",
  "Base",
  "Arbitrum",
  "BNB Chain",
  "Solana",
  "Sui",
  "Robinhood",
  "and more",
] as const;

export function OnePortfolioSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>
            One Portfolio. <span className="gradient-text">Every Market.</span>
          </h2>
          <p className={`mt-5 ${homeBody}`}>Build portfolios across:</p>
        </FadeIn>

        <FadeIn className="mt-7">
          <div className="flex flex-wrap gap-2.5">
            {markets.map((market) => (
              <span key={market} className={homePill}>
                {market}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 max-w-3xl">
          <p className={homeEyebrow}>Supported Networks</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {networks.map((network) => (
              <span key={network} className={homeChip}>
                {network}
              </span>
            ))}
          </div>
          <p className={`mt-7 max-w-2xl ${homeBody}`}>
            Your portfolio becomes the single layer through which you define
            allocations, strategies, and execution rules.
          </p>
          <div className="mt-7">
            <Button href="/creators" className={homeCta}>
              Reserve Early Access
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
