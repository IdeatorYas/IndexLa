import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

export function FeesSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>Simple. Multiple Revenue Streams.</h2>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FadeIn>
            <article className="flex h-full flex-col items-center rounded-3xl border border-line bg-void/45 px-6 py-8 text-center sm:px-8">
              <h3 className={homeH3}>Platform Execution Fees</h3>
              <p className={`mt-4 ${homeBody}`}>
                1% execution fee when portfolio trades execute.
              </p>
              <p className={`mt-5 ${homeBodyStrong}`}>
                0% Management · 0% Performance · 0% Exit
              </p>
              <p className={`mt-5 ${homeBodyStrong}`}>
                50% → Creator · 50% → INDEXLA
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.05}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-line bg-void/45 px-6 py-8 text-center sm:px-8">
              <h3 className={homeH3}>INDEXLA Treasury Portfolio</h3>
              <p className={`mt-4 ${homeBody}`}>
                INDEXLA manages one dedicated treasury portfolio. Profits from
                this portfolio provide an additional source of protocol revenue.
              </p>
              <p className={`mt-5 ${homeBodyStrong}`}>
                Revenue comes from real platform execution + INDEXLA treasury
                growth.
              </p>
            </article>
          </FadeIn>
        </div>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore
            href="/whitepaper/13-business-model"
            label="Read the Business Model →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
