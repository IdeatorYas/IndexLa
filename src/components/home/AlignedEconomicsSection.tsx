import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const PANELS = [
  {
    title: "Investors",
    lines: [
      "Own the assets. Automate the strategy. Keep 100% of any gains.",
      "0% Management · 0% Performance · 0% Exit · 1% on Execution",
    ],
  },
  {
    title: "Creators",
    lines: ["Earn from fees, strategy access, rewards and $DEXLA tips."],
  },
  {
    title: "$DEXLA Holders",
    lines: [
      "Unlock access, fee discounts and scarcity through six usage-linked burn mechanisms.",
    ],
  },
  {
    title: "INDEXLA",
    lines: [
      "Earns from execution across INDEXLA Core, Stable Club and Degen Club—plus treasury growth.",
    ],
  },
] as const;

const FLYWHEEL = [
  "Creators",
  "Portfolios",
  "Investors",
  "Execution",
  "Revenue + Rewards + $DEXLA Burns",
] as const;

export function AlignedEconomicsSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            Growth Rewards the{" "}
            <span className="gradient-text">Entire Ecosystem.</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2">
          {PANELS.map((panel, i) => (
            <FadeIn key={panel.title} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-2xl border border-electric/25 bg-electric/[0.06] px-5 py-6 text-center sm:px-6 sm:py-7">
                <h3 className="display text-[1.2rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.35rem]">
                  {panel.title}
                </h3>
                <div className={`mt-3 flex-1 space-y-2.5 ${homeBody}`}>
                  {panel.lines.map((line) => (
                    <p
                      key={line}
                      className={
                        line.startsWith("0%")
                          ? "font-semibold text-ink text-balance"
                          : "text-balance"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-12 max-w-4xl text-center">
          <h3 className={homeH3}>The Flywheel</h3>
          <div className="relative mx-auto mt-8 max-w-[34rem]">
            <div
              className="pointer-events-none absolute inset-[12%] rounded-full border border-electric/25 bg-gradient-to-br from-electric/[0.08] via-purple/[0.06] to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-[22%] rounded-full border border-dashed border-electric/20"
              aria-hidden
            />
            <ol className="relative grid grid-cols-1 gap-3 sm:hidden">
              {FLYWHEEL.map((node, i) => (
                <li key={node} className="flex flex-col items-center gap-2">
                  <span className="w-full rounded-2xl border border-electric/35 bg-void/85 px-4 py-3.5 text-[0.95rem] font-semibold text-ink shadow-[0_10px_30px_-18px_rgba(56,189,248,0.55)]">
                    {node}
                  </span>
                  {i < FLYWHEEL.length - 1 ? (
                    <span className="text-electric" aria-hidden>
                      ↓
                    </span>
                  ) : (
                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cyan">
                      Continuous loop
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div className="relative hidden aspect-square sm:block">
              {FLYWHEEL.map((node, i) => {
                const angle = -90 + i * (360 / FLYWHEEL.length);
                const rad = (angle * Math.PI) / 180;
                const radius = 38;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);
                return (
                  <div
                    key={node}
                    className="absolute z-10 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 lg:w-[10.5rem]"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="rounded-2xl border border-electric/40 bg-void/90 px-3 py-3 text-center shadow-[0_12px_36px_-16px_rgba(56,189,248,0.65)] backdrop-blur-sm">
                      <p className="text-[0.88rem] font-semibold leading-snug text-ink text-balance lg:text-[0.95rem]">
                        {node}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="absolute left-1/2 top-1/2 z-0 flex h-[7.5rem] w-[7.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-electric/35 bg-gradient-to-br from-electric/20 to-purple/15 text-center shadow-[0_0_40px_-10px_rgba(56,189,248,0.55)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-electric">
                  INDEXLA
                </p>
                <p className="mt-1 text-[0.72rem] font-semibold text-ink/80">
                  Ecosystem Loop
                </p>
              </div>
              <svg
                className="pointer-events-none absolute inset-[18%] text-electric/50"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="3 4"
                />
                <path
                  d="M88 50 A38 38 0 0 1 50 88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  markerEnd="url(#fly-arrow)"
                />
                <defs>
                  <marker
                    id="fly-arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <HomeReadMore
              href="/whitepaper/10-business-model"
              label="Business Model →"
            />
            <HomeReadMore href="/tokenomics" label="Tokenomics →" external={false} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
