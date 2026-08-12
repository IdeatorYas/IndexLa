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

        <FadeIn className="mt-10">
          <div className="rounded-2xl border border-electric/35 bg-electric/[0.08] px-5 py-4 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.12)]">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-electric text-balance sm:text-[0.9rem]">
              Simulated data — INDEXLA is not yet live
            </p>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.slice(0, 3).map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.05}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-7">
          <p className="flex max-w-full flex-col items-start gap-2 rounded-xl border border-success/45 bg-success/[0.14] px-5 py-4 sm:flex-row sm:items-center sm:gap-3">
            <span className="rounded-md border border-success/45 bg-success/20 px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-success">
              Illustrative
            </span>
            <span className={`${homeBody} font-medium text-ink`}>
              portfolios shown for demonstration purposes.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
