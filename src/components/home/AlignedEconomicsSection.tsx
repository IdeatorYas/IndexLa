import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const PANELS = [
  {
    title: "Investors",
    lead: "Own assets. Automate strategies. Keep 100% of any gains.",
    support: "0% Management · 0% Performance · 0% Exit · 1% Execution",
  },
  {
    title: "Creators",
    lead: "Build portfolios. Reach investors. Earn across four revenue streams.",
    support: "Execution Fees · Strategy Access · Rewards · $DEXLA Tips",
  },
  {
    title: "$DEXLA Holders",
    lead: "Unlock access. Save on fees. Benefit from usage-linked scarcity.",
    support: "Six Burn Mechanisms",
  },
  {
    title: "INDEXLA",
    lead: "Earn across all three products—plus dedicated treasury growth.",
    support: "INDEXLA Core · Stable Club · Degen Club",
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
            <FadeIn key={panel.title} delay={i * 0.04} className="h-full">
              <article className="flex h-full min-h-[11.5rem] flex-col rounded-2xl border border-electric/25 bg-electric/[0.06] px-5 py-6 text-center sm:min-h-[12.5rem] sm:px-6 sm:py-7">
                <h3 className="display text-[1.25rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.4rem]">
                  {panel.title}
                </h3>
                <p className="mt-3 flex-1 text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.12rem]">
                  {panel.lead}
                </p>
                <p className="mt-3 text-[0.92rem] font-medium leading-snug text-muted text-balance sm:whitespace-nowrap sm:text-[0.98rem]">
                  {panel.support}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-12 max-w-4xl text-center">
          <h3 className={homeH3}>The Flywheel</h3>
          <div className="relative mx-auto mt-8 max-w-[36rem]">
            <div
              className="pointer-events-none absolute inset-[10%] rounded-full border border-electric/25 bg-gradient-to-br from-electric/[0.1] via-purple/[0.06] to-transparent"
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
                    className="absolute z-10 w-[10rem] -translate-x-1/2 -translate-y-1/2 lg:w-[11rem]"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="rounded-2xl border border-electric/40 bg-void/90 px-3 py-3.5 text-center shadow-[0_12px_36px_-16px_rgba(56,189,248,0.65)] backdrop-blur-sm">
                      <p className="text-[0.9rem] font-semibold leading-snug text-ink text-balance lg:text-[0.98rem]">
                        {node}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="absolute left-1/2 top-1/2 z-0 flex h-[8rem] w-[8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-electric/35 bg-gradient-to-br from-electric/20 to-purple/15 text-center shadow-[0_0_40px_-10px_rgba(56,189,248,0.55)]">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-electric">
                  INDEXLA
                </p>
                <p className="mt-1 text-[0.72rem] font-semibold text-ink/80">
                  Ecosystem Loop
                </p>
              </div>
              <svg
                className="pointer-events-none absolute inset-[16%] text-electric/55"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="3 4"
                />
                <defs>
                  <marker
                    id="fly-arrow-v2"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M90 50 A40 40 0 0 1 50 90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  markerEnd="url(#fly-arrow-v2)"
                />
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
