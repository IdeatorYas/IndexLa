"use client";

import { FadeIn } from "@/components/ui/FadeIn";

type VestingCard = {
  title: string;
  summary: string;
  highlights: { label: string; value: string }[];
};

const vesting: VestingCard[] = [
  {
    title: "Pre-Seed, Seed & Private Sale",
    summary:
      "10% unlocked at TGE, followed by a 3-month cliff and 18-month linear vesting.",
    highlights: [
      { label: "TGE unlock", value: "10%" },
      { label: "Cliff", value: "3 months" },
      { label: "Vesting", value: "18 months linear" },
    ],
  },
  {
    title: "Public Sale",
    summary:
      "15% unlocked at TGE, with the remaining allocation vested linearly over 6 months.",
    highlights: [
      { label: "TGE unlock", value: "15%" },
      { label: "Remaining", value: "Linear" },
      { label: "Vesting", value: "6 months" },
    ],
  },
  {
    title: "Team",
    summary: "12-month cliff, followed by 24-month linear vesting.",
    highlights: [
      { label: "Cliff", value: "12 months" },
      { label: "Vesting", value: "24 months linear" },
    ],
  },
  {
    title: "Advisors",
    summary: "6-month cliff, followed by 12-month linear vesting.",
    highlights: [
      { label: "Cliff", value: "6 months" },
      { label: "Vesting", value: "12 months linear" },
    ],
  },
  {
    title: "Treasury & Community Airdrops",
    summary:
      "Released progressively according to the protocol's treasury and ecosystem framework to support creator incentives, ecosystem growth, strategic initiatives, and long-term development.",
    highlights: [{ label: "Release", value: "Progressive" }],
  },
  {
    title: "DEX Liquidity",
    summary: "Allocated at TGE to support healthy market liquidity.",
    highlights: [{ label: "Allocation", value: "At TGE" }],
  },
];

export function VestingScheduleSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Vesting Schedule
          </h2>
          <p className="mt-4 display text-[clamp(1.15rem,2.2vw,1.4rem)] text-ink">
            Built for Long-Term Alignment
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {vesting.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 0.04} className="h-full">
              <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-void/45 p-5">
                <h3 className="display text-[1.15rem] tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <div
                  className={`mt-4 grid gap-2 ${
                    item.highlights.length === 1
                      ? "grid-cols-1"
                      : item.highlights.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                  }`}
                >
                  {item.highlights.map((point) => (
                    <div
                      key={point.label}
                      className="rounded-lg border border-line bg-deep/70 px-2 py-2.5 text-center"
                    >
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        {point.label}
                      </p>
                      <p className="mt-1.5 text-[0.8rem] font-semibold leading-snug text-electric">
                        {point.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-muted">
                  {item.summary}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-6">
          <p className="text-[0.95rem] leading-relaxed text-muted-dim">
            All unlocks are designed to be transparent and verifiable through
            smart contracts where applicable.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
