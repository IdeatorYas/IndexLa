import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homePill,
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
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>Your Assets. Your Allocation. Your Rules.</h2>
          <p className={`mx-auto mt-6 max-w-[40rem] ${homeBody}`}>
            Build and automate portfolios with strategies designed for different
            market conditions.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {strategies.map((item) => (
              <span key={item} className={homePill}>
                {item}
              </span>
            ))}
          </div>
          <HomeReadMore
            href="/strategies"
            label="Explore Strategies →"
            className="mt-7"
          />
        </FadeIn>
      </div>
    </section>
  );
}
