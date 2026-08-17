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

const toneAccent: Record<NonNullable<Node["tone"]>, string> = {
  tge: "text-electric",
  cliff: "text-muted",
  linear: "text-purple-bright",
  full: "text-success",
  lock: "text-electric",
  soft: "text-muted",
};

export function VestingScheduleSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max mx-auto max-w-5xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>Vesting</h2>
          <p className="mt-3 display text-[clamp(1.1rem,2.2vw,1.35rem)] tracking-[-0.02em] text-ink text-balance">
            Built For Long-Term Alignment
          </p>
        </FadeIn>

        <div className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.08]">
          {schedules.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.015}>
              <article
                className={`py-5 sm:py-6 ${
                  item.featured ? "bg-electric/[0.03]" : ""
                }`}
              >
                <div className="grid gap-4 px-1 sm:px-2 lg:grid-cols-[minmax(11rem,0.9fr)_minmax(0,1.5fr)] lg:items-center lg:gap-10">
                  <h3
                    className={`display text-[1.05rem] tracking-[-0.02em] sm:text-[1.15rem] ${
                      item.featured ? "text-electric" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <div className="min-w-0">
                    <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
                      {item.nodes.map((node, idx) => (
                        <li
                          key={`${item.title}-${node.label}`}
                          className="flex items-center gap-1.5"
                        >
                          <div className="px-1 py-0.5 text-left sm:px-1.5">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                              {node.label}
                            </p>
                            <p
                              className={`display mt-0.5 text-[1.05rem] tabular-nums sm:text-[1.12rem] ${toneAccent[node.tone ?? "soft"]}`}
                            >
                              {node.detail}
                            </p>
                          </div>
                          {idx < item.nodes.length - 1 && (
                            <span
                              className="px-0.5 text-muted-dim/50"
                              aria-hidden
                            >
                              →
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                    {item.note && (
                      <p className="mt-2.5 max-w-xl text-[0.88rem] leading-relaxed text-muted text-pretty">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-7 text-center">
          <p className={`${tkBody} text-balance`}>
            All applicable unlocks are designed to be transparent and verifiable
            through smart contracts.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
