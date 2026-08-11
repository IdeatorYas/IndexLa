"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
} from "@/components/tokenomics/tokenomicsRhythm";

type Node = { label: string; detail: string; tone?: "tge" | "cliff" | "linear" | "full" | "lock" | "soft" };

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

        <div className="mt-10 space-y-0 border-y border-white/[0.08]">
          {schedules.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.02}>
              <article
                className={`border-b border-white/[0.07] py-6 last:border-b-0 sm:py-7 ${
                  item.featured ? "bg-electric/[0.04]" : ""
                }`}
              >
                <div className="grid gap-4 lg:grid-cols-[minmax(12rem,0.9fr)_minmax(0,1.4fr)] lg:items-center lg:gap-8">
                  <h3 className="display text-[1.1rem] tracking-[-0.02em] text-ink sm:text-[1.2rem]">
                    {item.title}
                  </h3>

                  <div className="min-w-0">
                    <ol className="flex flex-wrap items-start gap-y-3">
                      {item.nodes.map((node, idx) => (
                        <li
                          key={`${item.title}-${node.label}`}
                          className="flex min-w-0 items-start"
                        >
                          <div className="min-w-[4.5rem] text-center sm:min-w-[5.25rem]">
                            <div
                              className={`mx-auto h-2.5 w-2.5 rounded-full border ${toneDot[node.tone ?? "soft"]}`}
                              aria-hidden
                            />
                            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                              {node.label}
                            </p>
                            <p className="mt-0.5 display text-[0.98rem] tabular-nums text-ink">
                              {node.detail}
                            </p>
                          </div>
                          {idx < item.nodes.length - 1 && (
                            <div
                              className="mx-1 mt-1.5 h-px w-5 shrink-0 bg-white/20 sm:mx-2 sm:w-8"
                              aria-hidden
                            />
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
