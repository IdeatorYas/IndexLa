import { FadeIn } from "@/components/ui/FadeIn";
import { homeBody, homeSection } from "@/components/home/homeRhythm";

const NETWORKS = [
  { id: "ethereum", label: "Ethereum", src: "/images/networks/ethereum.svg" },
  { id: "base", label: "Base", src: "/images/networks/base.svg" },
  { id: "arbitrum", label: "Arbitrum", src: "/images/networks/arbitrum.svg" },
  { id: "bnb", label: "BNB Chain", src: "/images/networks/bnb.svg" },
  { id: "solana", label: "Solana", src: "/images/networks/solana.svg" },
  { id: "sui", label: "Sui", src: "/images/networks/sui.svg" },
  { id: "robinhood", label: "Robinhood", src: "/images/networks/robinhood.svg" },
] as const;

export function MissingLayerSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.08),transparent_65%)]"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <FadeIn className="text-center">
          <h2 className="display mx-auto max-w-4xl text-[clamp(1.85rem,4.8vw,3.15rem)] font-semibold tracking-[-0.035em] leading-[1.12]">
            <span className="block text-ink">
              Financial Assets Are Moving On-Chain.
            </span>
            <span className="mt-2 block gradient-text sm:mt-3">
              Investing Remains Fragmented.
            </span>
          </h2>
          <div className={`mx-auto mt-6 max-w-2xl space-y-4 ${homeBody}`}>
            <p>
              Crypto,Tokenized stocks, gold, commodities and real-world assets
              sit across different chains, wallets and platforms.
            </p>
            <p className="font-semibold text-ink">
              INDEXLA connects them through automated, non-custodial portfolios.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-nowrap lg:gap-1.5 xl:gap-2">
            {NETWORKS.map((network) => (
              <span
                key={network.id}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-electric/20 bg-electric/10 py-1.5 pl-1.5 pr-2.5 sm:gap-2 sm:pr-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-panel/90">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={network.src}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                    draggable={false}
                  />
                </span>
                <span className="whitespace-nowrap text-[0.82rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.9rem]">
                  {network.label}
                </span>
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
