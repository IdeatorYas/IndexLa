"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeCta,
  homeEyebrow,
  homeSection,
} from "@/components/home/homeRhythm";

const EARN_WAYS = [
  {
    title: "Execution Fees",
    body: "Earn 50% of fees when investors execute.",
    shell:
      "border-electric/50 bg-gradient-to-b from-electric/20 to-electric/[0.06]",
    text: "text-electric",
    glow: "shadow-[0_10px_28px_-16px_rgba(56,189,248,0.7)]",
  },
  {
    title: "Strategy Access",
    body: "Earn when other creators use your strategy.",
    shell: "border-cyan/50 bg-gradient-to-b from-cyan/20 to-cyan/[0.06]",
    text: "text-cyan",
    glow: "shadow-[0_10px_28px_-16px_rgba(34,211,238,0.65)]",
  },
  {
    title: "Monthly Rewards",
    body: "Earn from the creator leaderboard rewards.",
    shell:
      "border-purple-bright/50 bg-gradient-to-b from-purple/25 to-purple/[0.08]",
    text: "text-purple-bright",
    glow: "shadow-[0_10px_28px_-16px_rgba(167,139,250,0.65)]",
  },
  {
    title: "$DEXLA Tips",
    body: "Receive $DEXLA tips from your audience.",
    shell: "border-blue/50 bg-gradient-to-b from-blue/25 to-blue/[0.08]",
    text: "text-blue",
    glow: "shadow-[0_10px_28px_-16px_rgba(59,130,246,0.65)]",
  },
] as const;

export function CreatorRevenueSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <p className={homeEyebrow}>
            Crypto &amp; Finance Creators · KOLs · Influencers · YouTubers
          </p>
          <h2 className="display mt-4 text-[clamp(2rem,5.2vw,3.35rem)] font-semibold tracking-[-0.035em] leading-[1.08]">
            <span className="block text-ink">Your Thesis.</span>
            <span className="mt-2 block text-ink sm:mt-2.5">Your Product.</span>
            <span className="mt-2 block gradient-text sm:mt-2.5">
              Your Revenue.
            </span>
          </h2>
          <div className={`mx-auto mt-6 max-w-3xl space-y-3 ${homeBody}`}>
            <p>
              Turn your market view into a portfolio your audience can allocate
              to.
            </p>
            <p>
              You publish the strategy. They own the assets. You earn when it
              runs.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <div className="mx-auto mb-5 flex max-w-5xl justify-center">
            <div className="rounded-2xl border border-electric/40 bg-electric/[0.1] px-6 py-3.5 shadow-[inset_0_1px_0_rgba(56,189,248,0.18)] sm:px-8">
              <h3 className="display text-[clamp(1.25rem,2.6vw,1.55rem)] font-semibold tracking-[-0.025em] text-ink">
                Four Ways to Earn
              </h3>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
            {EARN_WAYS.map((way) => (
              <div
                key={way.title}
                className={`flex h-full min-h-[8.5rem] flex-col items-center justify-center rounded-xl border px-3.5 py-5 sm:min-h-[9.25rem] ${way.shell} ${way.glow}`}
              >
                <p
                  className={`display text-[0.98rem] font-semibold tracking-[-0.02em] sm:text-[1.05rem] ${way.text}`}
                >
                  {way.title}
                </p>
                <p className="mt-2.5 text-[0.9rem] font-medium leading-snug text-muted text-balance sm:text-[0.95rem]">
                  {way.body}
                </p>
              </div>
            ))}
          </div>

          <p className={`mx-auto mt-10 max-w-2xl font-semibold text-ink ${homeBody}`}>
            Build a portfolio worth following.
          </p>

          <div className="mt-7 flex justify-center">
            <Link
              href="/creators"
              className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue font-semibold text-white transition-all duration-300 hover:brightness-110 ${homeCta}`}
            >
              Visit Creator Page →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
