import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const GRID_PANELS = [
  {
    title: "Investors",
    lead: "Own real assets, automate strategies, and stay fully in control.",
    support: "0% Management · 0% Performance · 0% Exit · 0.8% Execution",
  },
  {
    title: "Creators",
    lead: "Build portfolios, reach investors, and earn across four revenue streams.",
    support: "Execution Fees · Strategy Access · Creator Rewards · $DEXLA Tips",
  },
  {
    title: "$DEXLA Holders",
    lead: "Hold $DEXLA, reduce execution fees, and save as holdings grow.",
    support: "2,500 = 15% · 5,000 = 25% · 10,000 = 40% Savings",
  },
  {
    title: "$DEXLA Token",
    lead: "Platform usage drives demand, burns and permanent supply reduction.",
    support: "Six Burn Mechanisms · Deflationary Design · Fixed Supply",
  },
] as const;

const INDEXLA_PANEL = {
  title: "INDEXLA",
  lead: "Earn across all three products while growing the protocol treasury.",
  support: "INDEXLA Core · Stable Club · Degen Club · Treasury Growth",
} as const;

const FLYWHEEL_HUB = {
  title: "$DEXLA Utility",
  detail: "Publish · Feature · Access · Tip",
} as const;

const FLYWHEEL_STEPS = [
  { arrow: "↓", label: "More Creators" },
  { arrow: "↓", label: "More Indexes + Portfolios" },
  { arrow: "↓", label: "More Investors + Capital" },
  { arrow: "↓", label: "More Execution Volume" },
  { arrow: "↓", label: "More Fees" },
  { arrow: "↓", label: "INDEXLA Revenue" },
  { arrow: "↓", label: "Creator Earnings" },
  { arrow: "↓", label: "$DEXLA Buybacks + Burns" },
  { arrow: "↓", label: "Stronger Incentives" },
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

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GRID_PANELS.map((panel, i) => (
              <FadeIn key={panel.title} delay={i * 0.03} className="h-full">
                <article className="flex h-full min-h-[13.5rem] flex-col rounded-2xl border border-electric/30 bg-gradient-to-b from-electric/[0.1] to-transparent px-4 py-5 text-center sm:min-h-[14.5rem] sm:px-4 sm:py-6">
                  <h3 className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.15rem]">
                    {panel.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-ink text-balance sm:text-[1rem]">
                    {panel.lead}
                  </p>
                  <p className="mt-3 text-[0.78rem] font-medium leading-snug text-muted text-balance sm:text-[0.84rem]">
                    {panel.support}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12} className="mt-3 flex justify-center">
            <article className="flex w-full max-w-md flex-col items-center rounded-2xl border border-electric/40 bg-gradient-to-b from-electric/[0.14] via-electric/[0.06] to-transparent px-5 py-5 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.16)] sm:max-w-lg sm:px-6 sm:py-6">
              <h3 className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.15rem]">
                {INDEXLA_PANEL.title}
              </h3>
              <p className="mt-2.5 text-[0.92rem] font-semibold leading-snug tracking-[-0.01em] text-ink text-balance sm:text-[0.98rem]">
                {INDEXLA_PANEL.lead}
              </p>
              <p className="mt-2.5 text-[0.76rem] font-medium leading-snug text-muted text-balance sm:text-[0.82rem]">
                {INDEXLA_PANEL.support}
              </p>
            </article>
          </FadeIn>
        </div>

        <FadeIn className="mx-auto mt-14 max-w-5xl text-center">
          <h3 className={homeH3}>INDEXLA Flywheel</h3>

          {/* Mobile / tablet: stacked separate blocks */}
          <div className="mx-auto mt-8 max-w-xl lg:hidden">
            <div className="rounded-2xl border border-electric/40 bg-gradient-to-b from-electric/15 to-void/80 px-5 py-5 shadow-[0_12px_36px_-18px_rgba(56,189,248,0.55)]">
              <p className="display text-[1.1rem] font-semibold text-electric">
                {FLYWHEEL_HUB.title}
              </p>
              <p className="mt-2 whitespace-nowrap text-[0.92rem] font-medium text-ink">
                {FLYWHEEL_HUB.detail}
              </p>
            </div>
            <ol className="mt-4 space-y-2.5">
              {FLYWHEEL_STEPS.map((step) => (
                <li key={step.label} className="flex flex-col items-center gap-2">
                  <span className="text-[1.05rem] font-semibold text-electric" aria-hidden>
                    {step.arrow}
                  </span>
                  <span className="w-full rounded-xl border border-electric/30 bg-void/85 px-4 py-3 text-[0.95rem] font-semibold text-ink shadow-[0_8px_24px_-16px_rgba(56,189,248,0.45)]">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop: circular flow — every step is its own block */}
          <div className="relative mx-auto mt-10 hidden aspect-square max-w-[42rem] lg:block">
            <div
              className="pointer-events-none absolute inset-[8%] rounded-full border border-electric/20 bg-gradient-to-br from-electric/[0.08] via-purple/[0.05] to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-[18%] rounded-full border border-dashed border-electric/25"
              aria-hidden
            />
            <svg
              className="pointer-events-none absolute inset-[14%] text-electric/40"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeDasharray="2.5 3.5"
              />
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 w-[12.5rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-electric/45 bg-void/95 px-3 py-4 text-center shadow-[0_16px_40px_-18px_rgba(56,189,248,0.7)] backdrop-blur-sm xl:w-[13.5rem]">
              <p className="display text-[1rem] font-semibold text-electric">
                {FLYWHEEL_HUB.title}
              </p>
              <p className="mt-2 whitespace-nowrap text-[0.72rem] font-medium text-ink xl:text-[0.78rem]">
                {FLYWHEEL_HUB.detail}
              </p>
            </div>

            {FLYWHEEL_STEPS.map((step, i) => {
              const angle = -90 + i * (360 / FLYWHEEL_STEPS.length);
              const rad = (angle * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);
              return (
                <div
                  key={step.label}
                  className="absolute z-10 w-[8.75rem] -translate-x-1/2 -translate-y-1/2 xl:w-[9.5rem]"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="rounded-xl border border-electric/35 bg-void/92 px-2.5 py-2.5 text-center shadow-[0_10px_28px_-14px_rgba(56,189,248,0.55)] backdrop-blur-sm">
                    <p className="text-[0.72rem] font-semibold leading-none text-electric" aria-hidden>
                      {step.arrow}
                    </p>
                    <p className="mt-1 text-[0.72rem] font-semibold leading-snug text-ink text-balance xl:text-[0.78rem]">
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
