import { FadeIn } from "@/components/ui/FadeIn";

const problems = [
  {
    n: "01",
    title: "Fragmented Investing",
    problem:
      "Assets and execution are scattered across chains, wallets, bridges, and platforms.",
    solution: "One portfolio layer connecting supported assets and networks.",
  },
  {
    n: "02",
    title: "Single Token Products",
    problem:
      "A single token can represent a basket while hiding the underlying assets and allocations.",
    solution:
      "Buy the underlying assets, hold the basket in your wallet, and see what you own.",
  },
  {
    n: "03",
    title: "Manual Strategy Execution",
    problem:
      "Investors still manually execute strategies when market conditions change.",
    solution: "Define the rules once and automate authorized execution.",
  },
  {
    n: "04",
    title: "Creators Lack Portfolio Infrastructure",
    problem:
      "Creators can influence investors but lack infrastructure to turn investment theses into persistent portfolios.",
    solution:
      "Publish investable portfolios and earn 50% of applicable execution fees.",
  },
] as const;

const shifts = [
  { from: "Fragmented assets", to: "Unified portfolio" },
  { from: "Opaque basket", to: "Transparent underlying assets" },
  { from: "Manual strategies", to: "Programmable execution" },
  { from: "Creator influence", to: "Investable portfolios" },
] as const;

export function ProblemSolutionSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_80%_40%,rgba(56,189,248,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
            The Problem vs Solution
          </p>
          <h2 className="display mt-4 text-[clamp(1.85rem,4.2vw,3rem)] tracking-[-0.03em] text-ink text-balance">
            Modern investing is fragmented, opaque, and increasingly difficult to
            manage across assets and chains.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {problems.map((item, i) => (
            <FadeIn key={item.n} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-void/35 p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    {item.n}
                  </span>
                  <h3 className="display text-[1.35rem] tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-muted">
                  {item.problem}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-[0.98rem] leading-relaxed text-ink">
                  <span className="font-semibold text-electric">INDEXLA: </span>
                  {item.solution}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16">
          <div className="rounded-3xl glass p-7 sm:p-10">
            <h3 className="display text-[clamp(1.5rem,3vw,2.15rem)] tracking-[-0.03em] text-ink text-balance">
              One Layer. One Portfolio. Full Asset Ownership.
            </h3>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {shifts.map((shift) => (
                <div
                  key={shift.from}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-void/45 px-4 py-3.5"
                >
                  <span className="min-w-0 flex-1 text-sm text-muted">
                    {shift.from}
                  </span>
                  <span className="shrink-0 text-electric" aria-hidden>
                    →
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-ink">
                    {shift.to}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-[1.05rem] leading-relaxed text-muted">
              INDEXLA lets you buy the assets, hold the full basket, and control
              your portfolio directly.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[0.78rem]">
            Multi Asset · Multi Chain · Non Custodial · Programmable · Creator
            Native
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
