"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkSurface,
  tkSurfaceSoft,
} from "@/components/tokenomics/tokenomicsRhythm";

type Mark = { label: string; detail: string };

type Schedule = {
  title: string;
  body: string;
  marks: Mark[];
  featured?: boolean;
  /** Visual timeline segments (relative weights) */
  timeline?: { label: string; flex: number; tone: "tge" | "cliff" | "linear" | "lock" | "soft" }[];
};

const schedules: Schedule[] = [
  {
    title: "Pre-Seed, Seed & Private Sale",
    body: "10% unlocked at TGE, followed by a 3-month cliff and 18-month linear vesting.",
    marks: [
      { label: "TGE", detail: "10%" },
      { label: "Cliff", detail: "3 mo" },
      { label: "Linear", detail: "18 mo" },
    ],
    timeline: [
      { label: "TGE 10%", flex: 2, tone: "tge" },
      { label: "Cliff 3mo", flex: 3, tone: "cliff" },
      { label: "Linear 18mo", flex: 8, tone: "linear" },
    ],
  },
  {
    title: "Public Sale",
    body: "15% unlocked at TGE, with the remaining allocation vested linearly over 6 months.",
    marks: [
      { label: "TGE", detail: "15%" },
      { label: "Linear", detail: "6 mo" },
    ],
    timeline: [
      { label: "TGE 15%", flex: 3, tone: "tge" },
      { label: "Linear 6mo", flex: 7, tone: "linear" },
    ],
  },
  {
    title: "Team",
    body: "12-month cliff followed by 24-month linear vesting. Full unlock at month 36.",
    marks: [
      { label: "Cliff", detail: "12 mo" },
      { label: "Linear", detail: "24 mo" },
      { label: "Full", detail: "Mo 36" },
    ],
    timeline: [
      { label: "Cliff 12mo", flex: 4, tone: "cliff" },
      { label: "Linear 24mo", flex: 8, tone: "linear" },
    ],
  },
  {
    title: "Advisors",
    body: "6-month cliff followed by 12-month linear vesting.",
    marks: [
      { label: "Cliff", detail: "6 mo" },
      { label: "Linear", detail: "12 mo" },
    ],
    timeline: [
      { label: "Cliff 6mo", flex: 4, tone: "cliff" },
      { label: "Linear 12mo", flex: 8, tone: "linear" },
    ],
  },
  {
    title: "Treasury",
    body: "36-month lock. After the lock period, Treasury tokens may be used for ecosystem development, community distributions, or permanently burned according to the protocol framework.",
    marks: [{ label: "Lock", detail: "36 mo" }],
    featured: true,
    timeline: [{ label: "36-month lock", flex: 1, tone: "lock" }],
  },
  {
    title: "Community Airdrops",
    body: "Released progressively according to the ecosystem framework to support creator incentives, ecosystem growth, and community participation.",
    marks: [{ label: "Release", detail: "Progressive" }],
    timeline: [{ label: "Progressive release", flex: 1, tone: "soft" }],
  },
  {
    title: "DEX Liquidity",
    body: "Allocated at TGE to establish and maintain healthy market liquidity.",
    marks: [{ label: "TGE", detail: "Allocated" }],
    timeline: [{ label: "Allocated at TGE", flex: 1, tone: "tge" }],
  },
  {
    title: "CEX Listings & Market Making",
    body: "Reserved for exchange liquidity provisioning and market maker partnerships.",
    marks: [{ label: "Reserve", detail: "CEX / MM" }],
    timeline: [{ label: "Reserved", flex: 1, tone: "soft" }],
  },
];

const toneClass: Record<NonNullable<Schedule["timeline"]>[number]["tone"], string> = {
  tge: "bg-electric/70",
  cliff: "bg-muted-dim/70",
  linear: "bg-purple-bright/55",
  lock: "bg-electric/40",
  soft: "bg-white/15",
};

export function VestingScheduleSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>Vesting</h2>
          <p className="mt-3 display text-[clamp(1.15rem,2.4vw,1.45rem)] tracking-[-0.02em] text-ink text-balance">
            Built For Long-Term Alignment
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {schedules.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.02}>
              <article
                className={`flex h-full flex-col ${
                  item.featured
                    ? "rounded-2xl border border-electric/35 bg-electric/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                    : tkSurface
                } p-5 sm:p-6`}
              >
                <h3 className="display text-[1.15rem] tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className={`mt-3 flex-1 ${tkBody}`}>{item.body}</p>

                {item.timeline && (
                  <div className="mt-5">
                    <div className="flex h-2.5 overflow-hidden rounded-full border border-white/[0.08]">
                      {item.timeline.map((seg) => (
                        <div
                          key={`${item.title}-${seg.label}`}
                          className={toneClass[seg.tone]}
                          style={{ flex: seg.flex }}
                          title={seg.label}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {item.timeline.map((seg) => (
                        <p
                          key={`${item.title}-legend-${seg.label}`}
                          className="text-[0.72rem] font-medium text-muted"
                        >
                          {seg.label}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.marks.map((mark) => (
                    <div
                      key={`${item.title}-${mark.label}`}
                      className={`${tkSurfaceSoft} px-3 py-2`}
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                        {mark.label}
                      </p>
                      <p className="mt-0.5 text-[0.9rem] font-semibold text-ink">
                        {mark.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <p className={`${tkBody} text-balance`}>
            All applicable unlocks are designed to be transparent and verifiable
            through smart contracts.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
