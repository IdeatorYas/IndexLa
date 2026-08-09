"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const scoring = [
  {
    weight: "50%",
    title: "PORTFOLIO PERFORMANCE",
    body: "How your portfolio performs.",
  },
  {
    weight: "30%",
    title: "AUM",
    body: "How much investor capital your portfolio attracts.",
  },
  {
    weight: "20%",
    title: "TRADING VOLUME",
    body: "How much activity your portfolio generates.",
  },
];

/** Anonymous illustrative rows — not real creators */
const ranks = [
  { rank: 1, label: "Portfolio A", score: "98.2", aum: "$12.8M", perf: "+24.1%" },
  { rank: 2, label: "Portfolio B", score: "94.6", aum: "$8.6M", perf: "+18.4%" },
  { rank: 3, label: "Portfolio C", score: "91.3", aum: "$6.1M", perf: "+15.2%" },
  { rank: 4, label: "Portfolio D", score: "88.7", aum: "$4.2M", perf: "+12.8%" },
  { rank: 5, label: "Portfolio E", score: "85.1", aum: "$3.4M", perf: "+11.2%" },
];

export function CreatorLeaderboardSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-25" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] uppercase tracking-[-0.02em] text-balance">
            Climb The Leaderboard.{" "}
            <span className="gradient-text">Earn More.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            INDEXLA gives creators a public ranking based on the metrics that
            matter.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
            How your rank is calculated
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {scoring.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.25rem] border border-line bg-void/40 p-5"
              >
                <p className="display text-[2.4rem] leading-none gradient-text">
                  {item.weight}
                </p>
                <h3 className="mt-3 text-[0.8rem] font-semibold tracking-[0.08em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                    style={{ width: item.weight }}
                  />
                </div>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.5rem] glass">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Leaderboard · illustrative concept
                </p>
                <p className="display mt-1 text-[1.25rem]">Monthly rankings</p>
              </div>
              <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1.5 text-[0.7rem] font-semibold text-electric">
                Top 25 share monthly prize pool
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[0.68rem] uppercase tracking-[0.12em] text-muted-dim">
                    <th className="px-5 py-3 font-semibold sm:px-6">Rank</th>
                    <th className="px-5 py-3 font-semibold">Portfolio</th>
                    <th className="px-5 py-3 font-semibold">Score</th>
                    <th className="px-5 py-3 font-semibold">Demo AUM</th>
                    <th className="px-5 py-3 font-semibold">Demo Perf.</th>
                  </tr>
                </thead>
                <tbody>
                  {ranks.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-line/60 last:border-b-0"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                            row.rank === 1
                              ? "bg-electric/20 text-electric"
                              : "bg-void/60 text-muted"
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-muted">{row.score}</td>
                      <td className="px-5 py-4 text-muted">{row.aum}</td>
                      <td className="px-5 py-4 font-semibold text-success">
                        {row.perf}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="border-t border-line px-5 py-3 text-xs text-muted-dim sm:px-6">
              Illustrative ranking concept — not live creator standings.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 max-w-3xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
          <p className="display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
            Top 25 creators share the monthly prize pool.
          </p>
          <p>
            Leaderboard rewards are separate from your{" "}
            <span className="font-semibold text-ink">
              50% share of the 1% execution fee
            </span>
            .
          </p>
          <p>
            You can earn from portfolio activity while competing for additional
            monthly rewards.
          </p>
        </FadeIn>

        <FadeIn className="mt-8 space-y-2">
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] text-ink">
            Build your portfolio.
          </p>
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] text-ink">
            Grow your AUM.
          </p>
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] text-ink">
            Perform.
          </p>
          <p className="display text-[clamp(1.1rem,2.2vw,1.35rem)] gradient-text">
            Climb the leaderboard.
          </p>
          <p className="pt-3 text-[1.02rem] font-semibold text-ink/90">
            Start early. Build your track record. Earn your position.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
