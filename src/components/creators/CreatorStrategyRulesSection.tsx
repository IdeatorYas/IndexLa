import { FadeIn } from "@/components/ui/FadeIn";
import { EarlyAccessCta } from "@/components/early-access/EarlyAccessCta";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  crBody,
  crBodyStrong,
  crCta,
  crH2,
  crH3,
  crSection,
} from "@/components/creators/creatorRhythm";

const strategyBoxes = [
  {
    title: "Use INDEXLA Strategies",
    body: "Predefined strategies such as Buy the Fear, Sell the Greed, Buy RSI Oversold, Sell RSI Overbought, Momentum, and Rebalancing.",
    tags: [
      "Buy the Fear",
      "Sell the Greed",
      "RSI Oversold",
      "RSI Overbought",
      "Momentum",
      "Rebalancing",
    ],
    accent:
      "border-electric/30 bg-electric/[0.06] shadow-[inset_0_1px_0_rgba(56,189,248,0.12)]",
  },
  {
    title: "Bring Your Own Strategy",
    body: "Build with a Technical Indicator, On-Chain Indicator, or Hybrid Strategy.",
    strong:
      "You define the rules. INDEXLA coordinates authorized execution when conditions are met.",
    tags: ["Technical Indicator", "On-Chain Indicator", "Hybrid Strategy"],
    accent:
      "border-purple/30 bg-purple/[0.06] shadow-[inset_0_1px_0_rgba(168,85,247,0.12)]",
  },
  {
    title: "Keep It Private or Monetize It",
    body: "Keep your strategy private for your own portfolios and investors, or make it available to other creators through the Creator Strategy Marketplace.",
    accent:
      "border-success/30 bg-success/[0.06] shadow-[inset_0_1px_0_rgba(52,211,153,0.12)]",
  },
] as const;

const tagClass =
  "rounded-lg border border-white/[0.1] bg-deep/50 px-2.5 py-1.5 text-[0.72rem] font-semibold leading-snug text-muted";

export function CreatorStrategyRulesSection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Your Strategy.{" "}
            <span className="gradient-text">Your Rules</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-5xl auto-rows-fr gap-4 md:grid-cols-3">
          {strategyBoxes.map((box, i) => (
            <FadeIn
              key={box.title}
              className={`flex h-full flex-col rounded-2xl border p-6 text-center sm:p-7 ${box.accent}`}
              delay={0.04 + i * 0.02}
            >
              <h3 className={`${crH3} uppercase`}>{box.title}</h3>
              <p className={`mt-4 flex-1 ${crBody} text-balance`}>{box.body}</p>
              {"strong" in box && box.strong ? (
                <p className={`mt-4 ${crBodyStrong} text-balance`}>
                  {box.strong}
                </p>
              ) : null}
              {"tags" in box && box.tags ? (
                <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-white/[0.08] pt-5">
                  {box.tags.map((tag) => (
                    <span key={tag} className={tagClass}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <div className="flex justify-center">
            <EarlyAccessCta mode="creator" className={crCta}>
              Creator Early Access →
            </EarlyAccessCta>
          </div>
          <div className="mt-5 flex justify-center">
            <HomeReadMore
              href="/strategies"
              label="Explore INDEXLA Strategies →"
              external={false}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
