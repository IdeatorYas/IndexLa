import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

const GROUPS = [
  {
    title: "Accumulate During Fear",
    body: "Use Buy Fear, DCA In or RSI Oversold conditions to accumulate gradually.",
  },
  {
    title: "Lock In Gains",
    body: "Use Sell Greed, DCA Out, RSI Overbought or Take Profit rules to reduce exposure systematically.",
  },
  {
    title: "Protect Your Downside",
    body: "Use Stop Loss rules when predefined downside thresholds are reached.",
  },
  {
    title: "Maintain Your Allocations",
    body: "Use Rebalancing rules when portfolio weights move outside your approved range.",
  },
  {
    title: "Respond to Market Strength",
    body: "Use Momentum rules when predefined trend conditions change.",
  },
  {
    title: "Build Advanced Strategies",
    body: "Combine conditions, thresholds and actions into one approved strategy.",
  },
] as const;

export function InvestorThesisSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Automation Built Around{" "}
            <span className="gradient-text">Your Thesis.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Choose rule-based strategies or combine conditions around your
            investment plan.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto grid max-w-5xl auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <article
                key={group.title}
                className={`${invPremiumSurface} flex h-full min-h-[11.5rem] flex-col px-5 py-6 text-center sm:px-6 sm:py-7`}
              >
                <h3 className="display text-[1.15rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.22rem]">
                  {group.title}
                </h3>
                <p className={`mt-3 flex-1 ${invBody}`}>{group.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-12 max-w-3xl text-center" delay={0.08}>
          <p className="display text-[clamp(1.35rem,3vw,1.85rem)] font-semibold tracking-[-0.03em] text-ink text-balance">
            Your Thesis Becomes a{" "}
            <span className="gradient-text">Programmable Strategy.</span>
          </p>
          <div className="mt-7 flex justify-center">
            <Link href="/strategies" className={`${homeCta} inline-flex`}>
              Explore All Strategies
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
