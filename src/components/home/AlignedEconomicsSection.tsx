import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const FEE_ROWS = [
  { where: "Creators", share: "50%", amount: "$500,000" },
  { where: "INDEXLA", share: "20%", amount: "$200,000" },
  { where: "Treasury", share: "10%", amount: "$100,000" },
  { where: "Monthly Rewards", share: "10%", amount: "$100,000" },
  { where: "$DEXLA Buyback & Burn", share: "10%", amount: "$100,000" },
] as const;

/** Exactly 17 words / 100 letters each — keep wording for visual balance. */
const GROWTH_CARDS = [
  {
    title: "Investors",
    body: "Find smarter strategies to grow capital, automate profit-taking, and qualify for monthly rewards when your creator wins.",
  },
  {
    title: "Creators",
    body: "Launch more portfolios, drive more trades, earn increased execution fees, attract tips, and grow strategy access revenue.",
  },
  {
    title: "INDEXLA",
    body: "Increase trading volume, earn platform fees, fund stronger products, and attract more creators and investors to INDEXLA.",
  },
  {
    title: "$DEXLA",
    body: "Increase activity, fund additional buybacks and burns from platform fees and treasury profits, and reduce token supply.",
  },
  {
    title: "Treasury",
    body: "Build more reserves from trading fees, fund better security and infrastructure, and support buybacks and future growth.",
  },
] as const;

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
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className={homeH2}>
            Growth Rewards the{" "}
            <span className="gradient-text">Entire Ecosystem.</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-3xl ${homeBody}`}>
            Creators can launch more than one portfolio. More portfolios can
            bring more trades and a larger fee pool to share.
          </p>
          <p className="mt-5 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Illustrative creator portfolio example
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-[clamp(1.15rem,2.8vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-ink text-balance">
            $100M in trades → $1M in fees → $500K to creators
          </p>
          <p className={`mx-auto mt-4 max-w-2xl ${homeBody}`}>
            The 1% fee is charged only when a trade executes. No trade, no
            execution fee.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl">
          <div className="overflow-x-auto rounded-2xl border border-electric/30 bg-void/50 shadow-[inset_0_1px_0_rgba(56,189,248,0.12)]">
            <table className="w-full min-w-[20rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-electric/25 bg-electric/[0.08]">
                  <th className="px-4 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted sm:px-5">
                    Where the fees go
                  </th>
                  <th className="px-3 py-3.5 text-right text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted sm:px-4">
                    Share
                  </th>
                  <th className="px-4 py-3.5 text-right text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted sm:px-5">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row) => (
                  <tr
                    key={row.where}
                    className="border-b border-line/80 last:border-b-0"
                  >
                    <td className="px-4 py-3.5 text-[0.95rem] font-semibold text-ink sm:px-5 sm:text-[1rem]">
                      {row.where}
                    </td>
                    <td className="px-3 py-3.5 text-right text-[0.95rem] font-medium text-muted sm:px-4 sm:text-[1rem]">
                      {row.share}
                    </td>
                    <td className="px-4 py-3.5 text-right text-[0.95rem] font-semibold text-electric sm:px-5 sm:text-[1rem]">
                      {row.amount}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-electric/35 bg-electric/[0.06]">
                  <td className="px-4 py-3.5 text-[0.95rem] font-semibold text-ink sm:px-5 sm:text-[1rem]">
                    Total
                  </td>
                  <td className="px-3 py-3.5 text-right text-[0.95rem] font-semibold text-ink sm:px-4 sm:text-[1rem]">
                    100%
                  </td>
                  <td className="px-4 py-3.5 text-right text-[0.95rem] font-semibold text-ink sm:px-5 sm:text-[1rem]">
                    $1,000,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-[0.9rem] leading-relaxed text-muted text-pretty sm:text-[0.95rem]">
            Illustrative creator portfolio volume before $DEXLA holder
            discounts. INDEXLA portfolios have no creator share. Strategy access
            and tips are additional creator income.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-14 max-w-6xl text-center">
          <h3 className={homeH3}>What Growth Means for You</h3>
          <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3.5">
            {GROWTH_CARDS.map((card, i) => (
              <article
                key={card.title}
                className="flex h-full min-h-[14.5rem] flex-col rounded-2xl border border-electric/30 bg-gradient-to-b from-electric/[0.1] to-transparent px-3.5 py-5 text-center sm:min-h-[15.5rem] sm:px-4 sm:py-6"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <h4 className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.12rem]">
                  {card.title}
                </h4>
                <p className="mt-3 flex-1 text-[0.88rem] font-medium leading-snug tracking-[-0.01em] text-muted text-balance sm:text-[0.92rem]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>

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
