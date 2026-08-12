"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
} from "@/components/tokenomics/tokenomicsRhythm";

type Node = {
  label: string;
  detail: string;
  tone?: "tge" | "cliff" | "linear" | "full" | "lock" | "soft";
};

type Schedule = {
  title: string;
  nodes: Node[];
  note?: string;
  featured?: boolean;
};

const schedules: Schedule[] = [
  {
    title: "Pre-Seed, Seed & Private Sale",
    nodes: [
      { label: "TGE", detail: "10%", tone: "tge" },
      { label: "Cliff", detail: "3 mo", tone: "cliff" },
      { label: "Linear", detail: "18 mo", tone: "linear" },
      { label: "Fully unlocked", detail: "Month 21", tone: "full" },
    ],
  },
  {
    title: "Public Sale",
    nodes: [
      { label: "TGE", detail: "15%", tone: "tge" },
      { label: "Linear", detail: "6 mo", tone: "linear" },
      { label: "Fully unlocked", detail: "Month 6", tone: "full" },
    ],
  },
  {
    title: "Team",
    nodes: [
      { label: "Cliff", detail: "12 mo", tone: "cliff" },
      { label: "Linear", detail: "24 mo", tone: "linear" },
      { label: "Fully unlocked", detail: "Month 36", tone: "full" },
    ],
  },
  {
    title: "Advisors",
    nodes: [
      { label: "Cliff", detail: "6 mo", tone: "cliff" },
      { label: "Linear", detail: "12 mo", tone: "linear" },
      { label: "Fully unlocked", detail: "Month 18", tone: "full" },
    ],
  },
  {
    title: "Treasury",
    featured: true,
    nodes: [{ label: "Lock", detail: "36 mo", tone: "lock" }],
    note: "After lock: ecosystem development, community distributions, or permanent burns per protocol framework.",
  },
  {
    title: "Community Airdrops",
    nodes: [{ label: "Release", detail: "Progressive", tone: "soft" }],
  },
  {
    title: "DEX Liquidity",
    nodes: [{ label: "TGE", detail: "Allocated", tone: "tge" }],
  },
  {
    title: "CEX Listings & Market Making",
    nodes: [{ label: "Reserve", detail: "CEX / MM", tone: "soft" }],
  },
];

const toneDot: Record<NonNullable<Node["tone"]>, string> = {
  tge: "bg-electric border-electric/60",
  cliff: "bg-muted-dim border-muted-dim/60",
  linear: "bg-purple-bright border-purple-bright/50",
  full: "bg-success border-success/50",
  lock: "bg-electric/70 border-electric/50",
  soft: "bg-white/40 border-white/30",
};

const toneChip: Record<NonNullable<Node["tone"]>, string> = {
  tge: "border-electric/35 bg-electric/[0.08]",
  cliff: "border-white/12 bg-void/50",
  linear: "border-purple-bright/30 bg-purple/[0.08]",
  full: "border-success/35 bg-success/[0.08]",
  lock: "border-electric/40 bg-electric/[0.1]",
  soft: "border-white/12 bg-void/40",
};

export function VestingScheduleSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>Vesting</h2>
          <p className="mt-3 display text-[clamp(1.15rem,2.4vw,1.45rem)] tracking-[-0.02em] text-ink text-balance">
            Built For Long-Term Alignment
          </p>
        </FadeIn>

        <div className="mt-10 space-y-3">
          {schedules.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.02}>
              <article
                className={`border px-5 py-5 sm:px-6 sm:py-6 ${
                  item.featured
                    ? "border-electric/30 bg-electric/[0.05]"
                    : "border-white/[0.08] bg-deep/40"
                }`}
              >
                <div className="grid gap-5 lg:grid-cols-[minmax(12rem,0.85fr)_minmax(0,1.5fr)] lg:items-center lg:gap-8">
                  <h3 className="display text-[1.12rem] tracking-[-0.02em] text-ink sm:text-[1.22rem]">
                    {item.title}
                  </h3>

                  <div className="min-w-0">
                    <ol className="flex flex-wrap items-stretch gap-2 sm:gap-2.5">
                      {item.nodes.map((node, idx) => (
                        <li
                          key={`${item.title}-${node.label}`}
                          className="flex min-w-0 items-center gap-2"
                        >
                          <div
                            className={`min-w-[5.25rem] border px-3 py-2.5 text-center sm:min-w-[5.75rem] ${toneChip[node.tone ?? "soft"]}`}
                          >
                            <div className="flex items-center justify-center gap-1.5">
                              <span
                                className={`h-1.5 w-1.5 rounded-full border ${toneDot[node.tone ?? "soft"]}`}
                                aria-hidden
                              />
                              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                                {node.label}
                              </p>
                            </div>
                            <p className="mt-1 display text-[1rem] tabular-nums text-ink sm:text-[1.05rem]">
                              {node.detail}
                            </p>
                          </div>
                          {idx < item.nodes.length - 1 && (
                            <span
                              className="shrink-0 text-muted-dim/70"
                              aria-hidden
                            >
                              →
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                    {item.note && (
                      <p className="mt-3 text-[0.9rem] leading-relaxed text-muted text-pretty">
                        {item.note}
                      </p>
                    )}
                  </div>
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
