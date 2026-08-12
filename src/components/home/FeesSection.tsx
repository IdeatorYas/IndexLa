import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeLede,
  homeSection,
} from "@/components/home/homeRhythm";

export function FeesSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>Simple Economics</h2>
          <p className={homeLede}>Pay for execution, not management.</p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="rounded-3xl glass px-6 py-8 text-center sm:px-10">
            <p className="display text-[clamp(1.15rem,3.2vw,1.65rem)] leading-snug tracking-[-0.02em] text-ink text-balance">
              0% management · 0% performance · 0% exit · 1% execution
            </p>
            <p className={`mx-auto mt-4 max-w-sm ${homeBody}`}>
              No subscription required.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 max-w-3xl">
          <p className={homeBody}>
            Creator portfolios share 50% of applicable execution fees with the
            creator.
          </p>
          <p className={`mt-5 ${homeBody}`}>
            4 $DEXLA utilities + 4 burn mechanisms
          </p>
          <HomeReadMore href="/tokenomics" className="mt-3" />
        </FadeIn>
      </div>
    </section>
  );
}

