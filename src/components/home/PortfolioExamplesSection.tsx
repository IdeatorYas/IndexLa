import { PortfolioCard } from "@/components/home/PortfolioCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { PORTFOLIOS } from "@/lib/site";

export function PortfolioExamplesSection() {
  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-electric">
            Investable products
          </p>
          <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.3rem)] text-balance">
            Portfolio Examples
          </h2>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">
            Premium hybrid indexes, hybrid portfolios, stocks portfolios, and
            crypto portfolios — built as real investment products with strategy,
            allocation, and activity. Demo metrics shown for illustration.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.05}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
