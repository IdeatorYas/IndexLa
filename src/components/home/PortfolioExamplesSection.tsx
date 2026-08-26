import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { HOME_DISCOVER_PRODUCTS } from "@/lib/homeMarketplaceProducts";
import {
  homeBody,
  homeCta,
  homeH2,
  homePill,
  homeSection,
} from "@/components/home/homeRhythm";

const themes = ["AI", "DeFi", "Macro", "RWAs", "Tech Stocks", "Memecoins"] as const;

export function PortfolioExamplesSection() {
  return (
    <section id="discover-portfolios" className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            Investment Ideas for{" "}
            <span className="gradient-text">Different Markets.</span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {themes.map((theme) => (
              <span key={theme} className={homePill}>
                {theme}
              </span>
            ))}
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-6xl auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HOME_DISCOVER_PRODUCTS.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.04} className="h-full">
              <PortfolioCard product={product} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <div className={`space-y-4 ${homeBody}`}>
            <p>
              Choose a portfolio and allocate USDC. INDEXLA acquires the
              underlying assets into your controlled wallet and executes only
              the approved rules.
            </p>
            <p className="font-semibold text-ink">
              Investors own the assets. Creators earn when trades execute.
            </p>
          </div>
          <p className="mt-6 text-[0.95rem] font-medium italic leading-snug text-muted text-balance sm:text-[1.02rem]">
            Illustrative portfolios only. Not live performance.
          </p>
          <div className="mt-8 flex justify-center">
            <EarlyAccessCta className={homeCta}>Reserve Early Access</EarlyAccessCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
