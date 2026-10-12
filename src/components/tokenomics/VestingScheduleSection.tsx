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
      { label: "Cliff", detail: "6 mo", tone: "cliff" },
      { label: "Linear", detail: "24 mo", tone: "linear" },
      { label: "Fully unlocked", detail: "Month 30", tone: "full" },
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
    nodes: [{ label: "Lock", detail: "36 mo lock", tone: "lock" }],
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

        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.1] bg-void/40">
          <div className="hidden grid-cols-[minmax(12rem,1.3fr)_repeat(4,minmax(0,0.7fr))] gap-3 border-b border-white/[0.08] bg-deep/60 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid sm:px-5">
            <span>Allocation</span>
            <span>TGE</span>
            <span>Cliff</span>
            <span>Linear</span>
            <span>Unlocked</span>
          </div>
          <div>
            {schedules.map((item) => {
              const byLabel = Object.fromEntries(
                item.nodes.map((node) => [node.label, node]),
              );
              const cells = [
                byLabel.TGE,
                byLabel.Cliff ?? byLabel.Lock,
                byLabel.Linear,
                byLabel["Fully unlocked"] ?? byLabel.Release ?? byLabel.Reserve,
              ];
              return (
                <article
                  key={item.title}
                  className={`border-b border-white/[0.06] px-4 py-3 last:border-0 sm:grid sm:grid-cols-[minmax(12rem,1.3fr)_repeat(4,minmax(0,0.7fr))] sm:items-center sm:gap-3 sm:px-5 sm:py-2.5 ${
                    item.featured ? "bg-electric/[0.04]" : ""
                  }`}
                >
                  <h3
                    className={`text-[0.95rem] font-semibold tracking-[-0.015em] sm:text-[0.98rem] ${
                      item.featured ? "text-electric" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:contents">
                    {cells.map((node, index) => (
                      <p
                        key={`${item.title}-${index}`}
                        className="flex items-baseline justify-between gap-2 sm:block"
                      >
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-dim sm:hidden">
                          {["TGE", "Cliff", "Linear", "Unlocked"][index]}
                        </span>
                        <span
                          className={`display text-[0.95rem] tabular-nums ${
                            node
                              ? toneAccent[node.tone ?? "soft"]
                              : "text-muted-dim"
                          }`}
                        >
                          {node?.detail ?? "—"}
                        </span>
                      </p>
                    ))}
                  </div>
                  {item.note ? (
                    <p className="mt-2 text-[0.82rem] leading-snug text-muted text-pretty sm:col-span-5">
                      {item.note}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        <FadeIn className="mt-5 text-center">
          <p className={`${tkBody} text-balance`}>
            All applicable unlocks are designed to be transparent and verifiable
            through smart contracts.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
