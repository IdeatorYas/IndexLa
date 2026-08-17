import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  stBody,
  stH2,
  stSection,
  stSurface,
  stSurfaceSoft,
} from "@/components/strategies/strategyRhythm";

const singles = [
  {
    label: "DCA",
    flow: "Buy on Fear → Sell on Greed",
  },
  {
    label: "TP / SL",
    flow: "Buy Now → Take Profit / Stop Loss",
  },
] as const;

const combined = [
  "Buy Now → Sell on Greed",
  "Buy Now → Sell when RSI is Overbought",
] as const;

export function CombinedStrategySection() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${stH2} uppercase`}>
            Combine{" "}
            <span className="gradient-text">Strategy Rules</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl ${stBody} text-balance`}>
            Strategies can also be combined. Mix entry and exit conditions from
            different rule types into one strategy.
          </p>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
            <div className={`${stSurfaceSoft} p-5 sm:p-6`}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Single Strategies
              </p>
              <ul className="mt-4 space-y-3">
                {singles.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-xl border border-white/[0.08] bg-void/50 px-4 py-3.5"
                  >
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-electric">
                      {item.label}
                    </p>
                    <p className="mt-1.5 display text-[1.02rem] tracking-[-0.02em] text-ink sm:text-[1.08rem]">
                      {item.flow}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${stSurface} border-electric/25 p-5 text-center sm:p-6`}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                Combined Strategy
              </p>
              <ul className="mt-4 space-y-3">
                {combined.map((flow) => (
                  <li
                    key={flow}
                    className="rounded-xl border border-electric/25 bg-electric/[0.07] px-4 py-3.5 text-center"
                  >
                    <p className="display text-[1.02rem] tracking-[-0.02em] text-ink sm:text-[1.08rem]">
                      {flow}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-muted text-pretty">
                Entry and exit conditions can come from different strategy rule
                types.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <p className={`${stBody} text-balance`}>
            Creators can combine strategies into public portfolios and share
            their investment thesis with their community.
          </p>
          <Link
            href="/creators"
            className="mt-3 inline-block text-[0.95rem] font-semibold tracking-[-0.01em] text-electric transition-colors hover:text-ink"
          >
            Explore Creators
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
