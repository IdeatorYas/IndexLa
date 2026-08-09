"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const scoring = [
  { weight: "50%", title: "PERFORMANCE", body: "How your portfolio performs." },
  {
    weight: "30%",
    title: "AUM",
    body: "How much investor capital your portfolio attracts.",
  },
  {
    weight: "20%",
    title: "VOLUME",
    body: "How much trading activity your portfolio generates.",
  },
];

/** Illustrative demo rows — not real creators */
const ranks = [
  {
    rank: 1,
    initials: "NX",
    name: "nova.desk",
    portfolio: "AI Power Mix",
    type: "Hybrid",
    aum: "$12.8M",
    volume: "$41.2M",
    score: "98.2",
    hue: "from-purple to-electric",
  },
  {
    rank: 2,
    initials: "VX",
    name: "vector.alpha",
    portfolio: "Macro Hybrid",
    type: "Hybrid",
    aum: "$8.6M",
    volume: "$28.4M",
    score: "94.6",
    hue: "from-blue to-cyan",
  },
  {
    rank: 3,
    initials: "OR",
    name: "orbit.signal",
    portfolio: "Stocks Power",
    type: "Stocks",
    aum: "$6.1M",
    volume: "$19.7M",
    score: "91.3",
    hue: "from-electric to-blue",
  },
  {
    rank: 4,
    initials: "PR",
    name: "prism.flow",
    portfolio: "RWA Basket",
    type: "RWA",
    aum: "$4.2M",
    volume: "$14.1M",
    score: "88.7",
    hue: "from-purple-bright to-purple",
  },
  {
    rank: 5,
    initials: "QL",
    name: "quill.edge",
    portfolio: "Momentum Desk",
    type: "Crypto",
    aum: "$3.4M",
    volume: "$11.8M",
    score: "85.1",
    hue: "from-cyan to-electric",
  },
];

export function CreatorLeaderboardSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-20" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
            Leaderboard · Illustrative Concept
          </p>
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
            Climb The Leaderboard.{" "}
            <span className="gradient-text">Earn More.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            INDEXLA ranks creators using three things:
          </p>
        </FadeIn>

        <FadeIn className="mt-6">
          <div className="grid gap-3 md:grid-cols-3">
            {scoring.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.2rem] border border-line bg-void/40 p-5"
              >
                <p className="display text-[2.3rem] leading-none gradient-text">
                  {item.weight}
                </p>
                <h3 className="mt-3 text-[0.78rem] font-semibold tracking-[0.1em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-ink">
            Performance · AUM · Volume → Score → Ranking
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.35rem] glass">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
              <p className="display text-[1.2rem]">Monthly rankings</p>
              <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[0.68rem] font-semibold text-electric">
                Top 25 · monthly prize pool
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[48rem] table-fixed text-sm">
                <colgroup>
                  <col className="w-[8%]" />
                  <col className="w-[22%]" />
                  <col className="w-[20%]" />
                  <col className="w-[12%]" />
                  <col className="w-[12%]" />
                  <col className="w-[13%]" />
                  <col className="w-[13%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-line text-[0.62rem] uppercase tracking-[0.1em] text-muted-dim">
                    <th className="px-4 py-3 text-left font-semibold sm:px-5">Rank</th>
                    <th className="px-4 py-3 text-left font-semibold">Creator</th>
                    <th className="px-4 py-3 text-left font-semibold">Portfolio</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-right font-semibold">AUM</th>
                    <th className="px-4 py-3 text-right font-semibold">Volume</th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {ranks.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-line/50 last:border-b-0"
                    >
                      <td className="px-4 py-3.5 sm:px-5">
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            row.rank === 1
                              ? "bg-electric/20 text-electric"
                              : "bg-void/70 text-muted"
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${row.hue} text-[0.7rem] font-bold text-white`}
                            aria-hidden
                          >
                            {row.initials}
                          </span>
                          <span className="font-semibold text-ink">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-muted">{row.portfolio}</td>
                      <td className="px-4 py-3.5 text-muted">{row.type}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-muted">
                        {row.aum}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-muted">
                        {row.volume}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums font-semibold text-electric sm:px-5">
                        {row.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="border-t border-line px-4 py-3 text-xs text-muted-dim sm:px-5">
              Illustrative ranking concept — not live creators or performance.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 max-w-3xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
          <p className="display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
            Top 25 creators share the monthly prize pool funded by protocol
            revenue.
          </p>
          <p>
            Leaderboard rewards are separate from your{" "}
            <span className="font-semibold text-ink">
              50% share of execution fees
            </span>
            .
          </p>
          <p className="pt-2 font-semibold text-ink/90">
            Start early. Build your track record. Earn your position.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
