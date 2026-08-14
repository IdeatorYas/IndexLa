import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeH3,
  homeMeasureTight,
  homeSection,
} from "@/components/home/homeRhythm";

const feeHighlights = [
  "0% Management",
  "0% Performance",
  "0% Exit",
  "1% Execution Fees",
] as const;

export function FeesSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>BUSINESS MODEL</h2>
          <p className={`mt-3 ${homeH3}`}>Simple. Multiple Revenue Streams.</p>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {feeHighlights.map((label) => (
              <div
                key={label}
                className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-electric/25 bg-void/50 px-3 py-3 text-center"
              >
                <p className="text-[0.88rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.95rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FadeIn>
            <article className="flex h-full flex-col items-center rounded-3xl border border-line bg-void/45 px-6 py-8 text-center sm:px-8">
              <h3 className={homeH3}>Platform Execution Fees</h3>
              <p className={`mt-4 ${homeMeasureTight} ${homeBody}`}>
                1% execution fee when portfolio trades execute.
              </p>
              <p className={`mt-5 ${homeMeasureTight} ${homeBodyStrong}`}>
                50% → Creator · 50% → INDEXLA
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={0.05}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-line bg-void/45 px-6 py-8 text-center sm:px-8">
              <h3 className={homeH3}>INDEXLA Treasury Portfolio</h3>
              <p className={`mt-4 ${homeMeasureTight} ${homeBody}`}>
                INDEXLA manages one dedicated treasury portfolio. Profits from
                this portfolio provide an additional source of protocol revenue.
              </p>
              <p className={`mt-5 ${homeMeasureTight} ${homeBodyStrong}`}>
                25% of Treasury profits allocated to $DEXLA buyback &amp; burn
              </p>
            </article>
          </FadeIn>
        </div>

        <FadeIn className="mt-7 text-center">
          <p className="mx-auto whitespace-normal text-[1.05rem] font-semibold tracking-[-0.015em] text-ink sm:whitespace-nowrap sm:text-[1.125rem]">
            0% Management · 0% Performance · 0% Exit
          </p>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore
            href="/whitepaper/9-business-model"
            label="Read the Business Model →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
