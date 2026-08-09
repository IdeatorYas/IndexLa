"use client";

import { FadeIn } from "@/components/ui/FadeIn";

type VestingCard = {
  title: string;
  summary: string[];
  highlights: { label: string; value: string }[];
  featured?: boolean;
};

const vesting: VestingCard[] = [
  {
    title: "Pre-Seed, Seed & Private Sale",
    summary: [
      "10% unlocked at TGE, followed by a 3-month cliff and 18-month linear vesting.",
    ],
    highlights: [
      { label: "TGE unlock", value: "10%" },
      { label: "Cliff", value: "3 months" },
      { label: "Vesting", value: "18 months linear" },
    ],
  },
  {
    title: "Public Sale",
    summary: [
      "15% unlocked at TGE, with the remaining allocation vested linearly over 6 months.",
    ],
    highlights: [
      { label: "TGE unlock", value: "15%" },
      { label: "Vesting", value: "6 months linear" },
    ],
  },
  {
    title: "Team",
    summary: [
      "12-month cliff followed by 24-month linear vesting.",
      "Full unlock at month 36.",
    ],
    highlights: [
      { label: "Cliff", value: "12 months" },
      { label: "Vesting", value: "24 months linear" },
      { label: "Full unlock", value: "Month 36" },
    ],
  },
  {
    title: "Advisors",
    summary: ["6-month cliff followed by 12-month linear vesting."],
    highlights: [
      { label: "Cliff", value: "6 months" },
      { label: "Vesting", value: "12 months linear" },
    ],
  },
  {
    title: "Treasury",
    summary: [
      "36-month lock. Afterward, a portion may be burned or used for additional airdrops, while the remainder is locked again.",
    ],
    highlights: [{ label: "Lock", value: "36 months" }],
    featured: true,
  },
  {
    title: "Community Airdrops",
    summary: [
      "Released progressively according to the ecosystem framework to support creator incentives, ecosystem growth, and community participation.",
    ],
    highlights: [{ label: "Release", value: "Progressive" }],
  },
  {
    title: "DEX Liquidity",
    summary: ["Allocated at TGE to support healthy market liquidity."],
    highlights: [{ label: "Allocation", value: "At TGE" }],
  },
];

export function VestingScheduleSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Vesting Schedule
          </h2>
          <p className="mt-4 display text-[clamp(1.15rem,2.2vw,1.4rem)] text-ink">
            Built For Long-Term Alignment
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {vesting.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 0.03} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[1.25rem] border p-5 ${
                  item.featured
                    ? "border-electric/45 bg-gradient-to-br from-electric/15 to-void/40"
                    : "border-line bg-deep/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="display text-[1.12rem] tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  {item.featured ? (
                    <span className="shrink-0 rounded-full border border-electric/40 bg-electric/15 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-electric">
                      36-mo lock
                    </span>
                  ) : null}
                </div>

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
                      className="rounded-lg border border-line bg-void/55 px-2 py-2.5 text-center"
                    >
                      <p className="text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        {point.label}
                      </p>
                      <p
                        className={`mt-1.5 text-[0.8rem] font-semibold leading-snug ${
                          item.featured ? "text-electric" : "text-electric"
                        }`}
                      >
                        {point.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-[0.92rem] leading-relaxed text-muted">
                  {item.summary.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
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
