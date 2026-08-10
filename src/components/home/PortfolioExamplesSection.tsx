import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { PORTFOLIOS } from "@/lib/site";
import {
  homeBody,
  homeH2,
  homePill,
  homeSection,
} from "@/components/home/homeRhythm";

const themes = [
  "DeFi",
  "AI",
  "Crypto Cycles",
  "Macro",
  "RWAs",
  "Hybrid Assets",
] as const;

export function PortfolioExamplesSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>Discover Portfolios</h2>
          <p className={`mt-5 ${homeBody}`}>
            Explore portfolios created around different investment theses.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {themes.map((theme) => (
              <span key={theme} className={homePill}>
                {theme}
              </span>
            ))}
          </div>
          <div className={`mt-6 space-y-3 ${homeBody}`}>
            <p>
              Creators can publish their strategies as investable portfolios.
            </p>
            <p>
              Investors choose which portfolios match their objectives and risk
              preferences.
            </p>
            <p className="font-medium text-ink">
              All portfolio activity remains non custodial.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.slice(0, 3).map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.05}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <p className="text-sm leading-relaxed text-muted-dim">
            Illustrative portfolios shown for demonstration purposes.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
