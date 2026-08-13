import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeChip,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const flow = [
  "Assets",
  "Creators",
  "Portfolios",
  "Investors",
  "Execution",
] as const;

export function DistributionSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>The Missing Layer: Distribution</h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Tokenization is creating the assets. Creators are creating the ideas.
            Investors need a way to discover and access them.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="rounded-3xl glass px-5 py-8 text-center sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {flow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className={homeChip}>{item}</span>
                  {i < flow.length - 1 ? (
                    <span className="text-electric/70" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <HomeReadMore
              href="#how-it-works"
              label="Learn How INDEXLA Works →"
              external={false}
              className="mt-8"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
