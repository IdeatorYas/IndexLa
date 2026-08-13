import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import { PORTFOLIOS } from "@/lib/site";
import {
  homeBody,
  homeH2,
  homeMeasure,
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
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Discover Investment Ideas. Choose What Fits You.
          </h2>
          <p className={`mt-5 ${homeMeasure} ${homeBody}`}>
            Explore portfolios built around different strategies, markets and
            investment theses.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {themes.map((theme) => (
              <span key={theme} className={homePill}>
                {theme}
              </span>
            ))}
          </div>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Creators publish portfolios. Investors discover strategies that fit
            their objectives and risk preferences.
          </p>
          <HomeReadMore
            href="/creators"
            label="Explore Portfolios →"
            className="mt-5"
          />
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
          <p className="mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-xl border border-success/45 bg-success/[0.14] px-5 py-4 text-center sm:flex-row sm:justify-center sm:gap-3">
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
