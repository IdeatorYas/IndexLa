import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { PORTFOLIOS } from "@/lib/site";

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
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] tracking-[-0.03em] text-balance">
            Discover Portfolios
          </h2>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">
            Explore portfolios created around different investment theses.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {themes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-line bg-void/50 px-3.5 py-1.5 text-sm font-semibold text-ink"
              >
                {theme}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-[1.02rem] leading-relaxed text-muted">
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

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
