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

const ILLUSTRATIVE_LABEL =
  "Illustrative only — not live portfolios or investment performance.";

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
          <div className="mx-auto max-w-3xl rounded-2xl border border-electric/40 bg-electric/[0.09] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.12)] sm:px-6">
            <p className="text-[0.92rem] font-semibold leading-snug tracking-[-0.01em] text-electric text-balance sm:text-[1.02rem]">
              {ILLUSTRATIVE_LABEL}
            </p>
          </div>
        </FadeIn>

        <div className="mt-6 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.slice(0, 3).map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.05}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-7">
          <p className="mx-auto max-w-3xl text-center text-[0.95rem] font-medium leading-snug text-muted text-balance sm:text-[1.02rem]">
            {ILLUSTRATIVE_LABEL}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
