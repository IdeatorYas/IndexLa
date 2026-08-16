import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
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

const ILLUSTRATIVE_LABEL =
  "Illustrative only: not live portfolios or investment performance.";

export function PortfolioExamplesSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>
            <span className="block">Discover Investment Ideas</span>
            <span className="mt-1.5 block sm:mt-2">Choose What Fits You</span>
          </h2>
          <p className={`mt-5 ${homeMeasure} ${homeBody}`}>
            Explore portfolios built around different strategies, markets and
            investment theses.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {themes.map((theme) => (
              <span key={theme} className={homePill}>
                {theme}
              </span>
            ))}
          </div>
          <p className={`mt-5 ${homeMeasure} ${homeBody}`}>
            Creators publish portfolios. Investors discover strategies that fit
            their objectives and risk preferences.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <p className="mx-auto max-w-2xl text-center text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-electric/95 text-balance sm:text-[1.02rem]">
            {ILLUSTRATIVE_LABEL}
          </p>
        </FadeIn>

        <div className="mx-auto mt-5 grid max-w-6xl auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.slice(0, 3).map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.04}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-5">
          <p className="mx-auto max-w-2xl text-center text-[0.88rem] font-medium leading-snug text-muted text-balance sm:text-[0.95rem]">
            {ILLUSTRATIVE_LABEL}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
