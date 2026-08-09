import { PortfolioCard } from "@/components/home/PortfolioCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { PORTFOLIOS } from "@/lib/site";

export function PortfolioExamplesSection() {
  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            Discover Portfolios Built Around A Thesis.
          </h2>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">
            Explore strategies created by INDEXLA and independent creators.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PORTFOLIOS.map((portfolio, i) => (
            <FadeIn key={portfolio.id} delay={i * 0.05}>
              <PortfolioCard portfolio={portfolio} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 max-w-2xl space-y-6">
          <p className="text-sm leading-relaxed text-muted-dim">
            Demo portfolios are illustrative and do not represent actual or
            guaranteed performance.
          </p>
          <Button href="/strategies">Explore All Strategies</Button>
        </FadeIn>
      </div>
    </section>
  );
}
