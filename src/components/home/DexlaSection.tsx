import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const utilities = [
  { n: "01", title: "Publish", body: "Publish portfolios to the Marketplace." },
  { n: "02", title: "Feature", body: "Increase portfolio visibility." },
  { n: "03", title: "Save", body: "Hold $DEXLA for lower execution fees." },
  { n: "04", title: "Tip", body: "Tip creators and boost leaderboard ranking." },
  { n: "05", title: "Monetize", body: "List proprietary strategies and monetize their use." },
] as const;

const burns = [
  { n: "01", text: "Creator Publishing Fees — 100% Burned" },
  { n: "02", text: "Promotion Fees — 100% Burned" },
  { n: "03", text: "Strategy Listing — 100% Burned" },
  { n: "04", text: "Strategy Access — 50% Burned" },
  { n: "05", text: "Protocol Fees — 10% Burned" },
  { n: "06", text: "Treasury Profits — 25% Burned" },
] as const;

const panel =
  "rounded-2xl border border-white/[0.08] bg-deep/55 px-5 py-6 shadow-[0_16px_48px_rgba(0,0,0,0.22)] sm:px-7 sm:py-7";

const utilityCard =
  "flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-success/30 bg-success/[0.06] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(52,211,153,0.12)]";

const burnCard =
  "flex h-full flex-col items-center justify-center gap-1.5 rounded-xl border border-danger/30 bg-danger/[0.06] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(248,113,113,0.12)]";

export function DexlaSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            <span className="block gradient-text">$DEXLA</span>
            <span className="mt-1 block text-[clamp(1.35rem,3vw,1.85rem)]">
              The Utility & Deflation Engine
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl display text-[clamp(1.15rem,2.4vw,1.55rem)] font-semibold tracking-[-0.025em] text-electric text-balance">
            100,000,000 Fixed Supply
          </p>
          <p className={`mx-auto mt-4 max-w-2xl ${homeBody}`}>
            $DEXLA powers platform utilities, creator mechanics, and
            usage-linked deflation across INDEXLA.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className={panel}>
            <h3 className="display text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold tracking-[-0.025em] text-success text-center">
              5 Token Utilities
            </h3>
            <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {utilities.map((item) => (
                <article key={item.title} className={utilityCard}>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-success/70">
                    {item.n}
                  </span>
                  <p className="display text-[1.08rem] font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </p>
                  <p
                    className={`${homeBody} text-[0.95rem] leading-snug sm:text-[1rem]`}
                  >
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-4">
          <div className={panel}>
            <h3 className="display text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold tracking-[-0.025em] text-danger text-center">
              6 Burn Mechanisms
            </h3>
            <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {burns.map((item) => (
                <article key={item.text} className={burnCard}>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-danger/70">
                    {item.n}
                  </span>
                  <p className="text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.05rem]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-7 text-center">
          <Link
            href="/tokenomics"
            className="inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            Read Tokenomics →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
