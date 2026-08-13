import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const strategies = [
  "DCA",
  "Rebalancing",
  "Buy Fear",
  "Sell Greed",
  "Momentum",
  "Take Profit / Stop Loss",
] as const;

export function BuildAutomateSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>BUILD AND AUTOMATE</h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Build and automate portfolios with strategies designed for different
            market conditions.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {strategies.map((item) => (
              <div
                key={item}
                className="flex min-h-[3.75rem] items-center justify-center rounded-xl border border-line bg-deep/55 px-3 py-3 text-center"
              >
                <p className="text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.02rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore href="/strategies" label="Explore Strategies →" />
        </FadeIn>
      </div>
    </section>
  );
}
