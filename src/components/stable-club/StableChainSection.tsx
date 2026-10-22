import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/stable-club/StableShared";
import { scBody, scH2, scSection } from "@/components/stable-club/stableRhythm";

const YIELD_CLUB = "https://app.indexla.tech/app/yield-club";

const CHAINS = [
  {
    name: "Solana",
    detail: "Top Solana LPs",
    status: "Demo",
    href: YIELD_CLUB,
    logo: "/images/networks/solana.svg",
  },
  {
    name: "Robinhood",
    detail: "Top Robinhood LPs",
    status: "Demo",
    href: YIELD_CLUB,
    logo: "/images/networks/robinhood.svg",
  },
  {
    name: "Base",
    detail: "Top Base LPs",
    status: "Live Beta",
    href: `${YIELD_CLUB}#stable-club-live`,
    logo: "/images/networks/base.svg",
  },
  {
    name: "BNB Chain",
    detail: "Top BNB LPs",
    status: "Demo",
    href: YIELD_CLUB,
    logo: "/images/networks/bnb.svg",
  },
  {
    name: "Ethereum",
    detail: "Top Ethereum LPs",
    status: "Demo",
    href: YIELD_CLUB,
    logo: "/images/networks/ethereum.svg",
  },
] as const;

export function StableChainSection() {
  return (
    <section className={scSection}>
      <div className="section-pad container-max">
        <FadeIn>
          <h2 className={`text-center ${scH2}`}>Choose Your Chain</h2>
          <p className={`mx-auto mt-4 max-w-3xl text-center ${scBody}`}>
            Open the same chain catalog in the app. Base is in live beta. Other
            chain baskets are demos.
          </p>

          <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {CHAINS.map((chain) => (
              <a
                key={chain.name}
                href={chain.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-card-elevated flex h-full flex-col p-5 transition-colors hover:border-[var(--sc-line-strong)]"
              >
                <AssetLogo src={chain.logo} alt={chain.name} size={40} />
                <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-[var(--sc-navy)]">
                  {chain.name}
                </h3>
                <p className="mt-1 text-[0.88rem] font-medium text-[var(--sc-muted)]">
                  {chain.detail}
                </p>
                <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue)]">
                  {chain.status}
                </p>
                <p className="mt-auto pt-5 text-[0.92rem] font-semibold text-[var(--sc-navy)]">
                  View in app
                  <span className="sr-only"> (opens in a new tab)</span>
                </p>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
