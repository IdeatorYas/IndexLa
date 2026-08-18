import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeH3,
  homeMeasure,
  homeSection,
  homeSolution,
} from "@/components/home/homeRhythm";

const utilities = [
  {
    title: "Publish",
    body: "Publish portfolios to the Marketplace.",
  },
  {
    title: "Feature",
    body: "Increase portfolio visibility.",
  },
  {
    title: "Save",
    body: "Hold $DEXLA for lower execution fees.",
  },
  {
    title: "Tips & Ranking",
    body: "Tip creators and boost leaderboard ranking.",
  },
  {
    title: "Monetize",
    body: "List proprietary strategies and monetize their use.",
    metric: "500 $DEXLA → List Strategy · Set Access Price",
  },
] as const;

const burns = [
  "Creator Publishing Fees — 100% Burned",
  "Promotion Fees — 100% Burned",
  "Strategy Listing — 100% Burned",
  "Strategy Access — 50% Burned",
  "Protocol Fees — 10% Burned",
  "Treasury Profits — 25% Burned",
] as const;

const panel =
  "rounded-2xl border border-white/[0.08] bg-deep/55 px-4 py-7 shadow-[0_16px_48px_rgba(0,0,0,0.22)] sm:px-6 sm:py-8";

const innerCard =
  "flex h-full min-h-[7.25rem] flex-col items-center justify-center rounded-xl px-4 py-5 text-center";

export function DexlaSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            $DEXLA — The Utility &{" "}
            <span className="gradient-text">Deflation Engine</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl display text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold tracking-[-0.025em] text-electric text-balance">
            100,000,000 Fixed Supply
          </p>
          <p className={`mx-auto mt-5 max-w-2xl ${homeBody}`}>
            $DEXLA powers platform utilities, creator mechanics, and
            usage-linked deflation across INDEXLA.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className={panel}>
            <h3 className={`${homeH3} text-center text-success`}>
              5 Core Utilities
            </h3>
            <div className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {utilities.map((item) => (
                <article
                  key={item.title}
                  className={`${innerCard} border border-success/30 bg-success/[0.06] shadow-[inset_0_1px_0_rgba(52,211,153,0.12)] ${
                    item.title === "Monetize"
                      ? "sm:col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <p className="display text-[1.12rem] font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </p>
                  <p
                    className={`mt-2 ${homeBody} text-[1.02rem] leading-snug sm:text-[1.05rem]`}
                  >
                    {item.body}
                  </p>
                  {"metric" in item && item.metric ? (
                    <p
                      className={`mt-3 ${homeSolution} text-[0.98rem] leading-snug sm:text-[1.02rem]`}
                    >
                      {item.metric}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-5">
          <div className={panel}>
            <h3 className={`${homeH3} text-center text-danger`}>
              6 Burn Mechanisms
            </h3>
            <div className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {burns.map((item) => (
                <article
                  key={item}
                  className={`${innerCard} border border-danger/30 bg-danger/[0.06] shadow-[inset_0_1px_0_rgba(248,113,113,0.12)]`}
                >
                  <p className="text-[1.02rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.08rem]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <p className={`${homeSolution} ${homeMeasure}`}>
            Utility → Usage → Buyback & Burn
          </p>
          <Link
            href="/tokenomics"
            className="mt-5 inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            Read Tokenomics →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
