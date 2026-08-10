import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

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
    <section className="relative border-t border-line bg-void py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] tracking-[-0.03em] text-balance">
            One Portfolio.{" "}
            <span className="gradient-text">Every Market.</span>
          </h2>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">
            Build portfolios across:
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="flex flex-wrap gap-2.5">
            {markets.map((market) => (
              <span
                key={market}
                className="rounded-full border border-line bg-deep/80 px-4 py-2 text-sm font-semibold text-ink"
              >
                {market}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-14 max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Supported Networks
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {networks.map((network) => (
              <span
                key={network}
                className="rounded-xl border border-electric/20 bg-electric/10 px-3.5 py-2 text-sm font-semibold text-ink"
              >
                {network}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            Your portfolio becomes the single layer through which you define
            allocations, strategies, and execution rules.
          </p>
          <div className="mt-8">
            <Button href="/creators">Create Your Portfolio</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
