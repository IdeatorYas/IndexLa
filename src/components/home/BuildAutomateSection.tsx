import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeMeasure,
  homeMeasureTight,
  homeSection,
} from "@/components/home/homeRhythm";

/** Short explanations from existing approved strategy copy (How It Works / Strategy Engine). */
const strategies = [
  {
    title: "DCA",
    body: "Automatically invest according to a defined schedule.",
  },
  {
    title: "Rebalancing",
    body: "Restore target allocations when portfolio weights drift.",
  },
  {
    title: "Buy Fear",
    body: "Accumulate when defined fear conditions are reached.",
  },
  {
    title: "Sell Greed",
    body: "Reduce exposure when defined greed conditions are reached.",
  },
  {
    title: "Momentum",
    body: "Adjust exposure as defined market trends change.",
  },
  {
    title: "Take Profit / Stop Loss",
    body: "Automatically reduce a position when your predefined target is reached. Reduce exposure when a predefined downside condition is triggered.",
  },
] as const;

export function BuildAutomateSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>BUILD &amp; AUTOMATE</h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Build and automate portfolios with strategies designed for different
            market conditions.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-4xl">
          <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
            {strategies.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-deep/55 px-4 py-5 text-center sm:px-5 sm:py-6"
              >
                <p className="text-[1.02rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.08rem]">
                  {item.title}
                </p>
                <p className={`mt-2.5 ${homeMeasureTight} ${homeBody} text-[1rem] sm:text-[1.05rem]`}>
                  {item.body}
                </p>
              </article>
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
