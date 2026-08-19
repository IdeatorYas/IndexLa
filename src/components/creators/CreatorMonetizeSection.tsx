import { FadeIn } from "@/components/ui/FadeIn";
import {
  crH2,
  crSection,
  crSurfaceSoft,
} from "@/components/creators/creatorRhythm";

const ways = [
  {
    n: "01",
    title: "Portfolio Fees",
    detail: "50% of applicable execution fees",
    availability: "Available at Launch",
  },
  {
    n: "02",
    title: "Creator Strategy Marketplace",
    detail: "Keep it private or make it available to other creators",
    availability: "Available after $DEXLA Launch",
  },
  {
    n: "03",
    title: "$DEXLA Tips",
    detail: "Tips count for 10% of Creator Rewards ranking",
    availability: "Available after $DEXLA Launch",
  },
  {
    n: "04",
    title: "Creator Rewards",
    detail: "Compete for monthly rewards",
    availability: "Available at Launch",
  },
] as const;

const revenueRows = [
  { activity: "$500K", fees: "$5,000", share: "$2,500" },
  { activity: "$2.5M", fees: "$25,000", share: "$12,500" },
  { activity: "$10M", fees: "$100,000", share: "$50,000" },
  { activity: "$50M", fees: "$500,000", share: "$250,000" },
  { activity: "$100M", fees: "$1,000,000", share: "$500,000" },
] as const;

const chapter =
  "border-t border-white/[0.08] pt-10 md:pt-12 first:border-t-0 first:pt-0";
const chapterGrid =
  "grid grid-cols-1 gap-6 md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(11rem,15rem)] md:gap-x-10 md:items-start lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(12rem,16rem)] lg:gap-x-12";
const chapterNum =
  "display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-electric/90 md:text-[3.25rem] lg:text-[3.5rem]";
const chapterTitle =
  "display text-[1.2rem] font-semibold leading-snug tracking-[-0.025em] text-ink text-pretty md:text-[1.35rem] lg:text-[1.45rem]";
const chapterBody = "mt-4 space-y-3 text-[1.02rem] leading-[1.7] text-muted md:text-[1.05rem]";
const splitBox =
  "rounded-xl border border-white/[0.12] bg-deep/55 px-3 py-4 text-center sm:px-4 sm:py-5";
const splitBoxLabel =
  "display text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.05rem]";
const weightBox =
  "rounded-2xl border border-electric/25 bg-electric/[0.05] px-4 py-7 text-center shadow-[0_16px_48px_rgba(0,0,0,0.28)] sm:px-6 sm:py-9";
const weightBoxLabel =
  "display text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-electric sm:text-[1.45rem] md:text-[1.55rem]";
const closingWords = ["BUILD", "PUBLISH", "GROW", "EARN"] as const;
const chapterAside =
  "md:pt-1 md:text-right border-t border-white/[0.06] pt-4 md:border-t-0 md:pt-0";
const chapterAsideBoxes =
  "border-t border-white/[0.06] pt-4 md:border-t-0 md:pt-1";
const asideLabel =
  "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim";
const asideValueBlue =
  "mt-2 display text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-electric text-pretty md:text-[1.2rem]";
const statBox =
  "rounded-xl border border-white/[0.12] bg-deep/55 px-3 py-4 text-center sm:px-4 sm:py-5";
const statBoxText =
  "display text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-electric sm:text-[1.05rem]";

export function CreatorMonetizeSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Four Ways To Monetize{" "}
            <span className="gradient-text">Your Edge</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-5xl auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ways.map((way, i) => (
            <FadeIn
              key={way.n}
              className={`${crSurfaceSoft} grid h-full grid-rows-[auto_3rem_auto_1fr] items-start p-5`}
              delay={0.03 * i}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                {way.n}
              </p>
              <p className="mt-2 self-center display text-[1.12rem] tracking-[-0.02em] text-ink">
                {way.title}
              </p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-success">
                {way.availability}
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted self-start">
                {way.detail}
              </p>
            </FadeIn>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-5xl space-y-0 md:mt-20">
          {/* 01 Portfolio Fees */}
          <FadeIn className={chapter} delay={0.04}>
            <div className={chapterGrid}>
              <p className={chapterNum} aria-hidden>
                01
              </p>
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Portfolio Fees
                </p>
                <h3 className={`mt-3 ${chapterTitle}`}>
                  Earn 50% of applicable execution fees generated by your
                  portfolio.
                </h3>
                <div className={chapterBody}>
                  <p>More activity → more recurring creator revenue.</p>
                </div>
              </div>
              <aside className={chapterAsideBoxes}>
                <div className="grid grid-cols-1 gap-3">
                  <div className={statBox}>
                    <p className={statBoxText}>Creator Share</p>
                  </div>
                  <div className={statBox}>
                    <p className={statBoxText}>
                      1% Execution Fee → 50% Creator Share
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.08] bg-deep/35 md:mt-10">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    <th className="px-5 py-3.5 font-semibold sm:px-6">
                      Portfolio Activity
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold sm:px-6">
                      Execution Fees
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold sm:px-6">
                      Creator Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRows.map((row) => (
                    <tr
                      key={row.activity}
                      className="border-b border-white/[0.05] last:border-b-0"
                    >
                      <td className="px-5 py-3.5 text-[0.98rem] font-medium tabular-nums text-muted sm:px-6 sm:text-[1.02rem]">
                        {row.activity}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[0.98rem] tabular-nums text-muted sm:px-6 sm:text-[1.02rem]">
                        {row.fees}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[0.98rem] font-semibold tabular-nums text-muted sm:px-6 sm:text-[1.02rem]">
                        {row.share}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* 02 Creator Strategy Marketplace */}
          <FadeIn className={chapter} delay={0.06}>
            <div className={chapterGrid}>
              <p className={chapterNum} aria-hidden>
                02
              </p>
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Creator Strategy Marketplace
                </p>
                <h3 className={`mt-3 ${chapterTitle}`}>
                  Publish your proprietary strategy and choose whether to keep
                  it private or make it available to other creators.
                </h3>
                <div className={chapterBody}>
                  <div className={statBox}>
                    <p className={statBoxText}>
                      Publish Strategy → Set Access Price → Earn in $DEXLA
                    </p>
                  </div>
                  <p>
                    Other creators pay your set access price in $DEXLA to use
                    your strategy in their own portfolios.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {["50% → Strategy Creator", "50% → Burned"].map((label) => (
                      <div key={label} className={statBox}>
                        <p className={statBoxText}>{label}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    Investors using your strategy through your portfolio pay
                    nothing.
                  </p>
                </div>
              </div>
              <aside className={chapterAside}>
                <p className={asideLabel}>Availability</p>
                <p className={asideValueBlue}>Available after $DEXLA Launch</p>
              </aside>
            </div>
          </FadeIn>

          {/* 03 $DEXLA Tips */}
          <FadeIn className={chapter} delay={0.08}>
            <div className={chapterGrid}>
              <p className={chapterNum} aria-hidden>
                03
              </p>
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  $DEXLA Tips
                </p>
                <h3 className={`mt-3 ${chapterTitle}`}>
                  The community can tip creators using any token.
                </h3>
                <div className={chapterBody}>
                  <p className="font-semibold text-electric">
                    Only $DEXLA tips count toward Creator Ranking and Investor
                    Rewards eligibility.
                  </p>
                  <p>Tips count for 10% of the Creator Rewards ranking.</p>
                </div>
              </div>
              <aside className={chapterAside}>
                <p className={asideLabel}>Ranking Weight</p>
                <p className={asideValueBlue}>
                  Tips count for 10% of the Creator Rewards ranking.
                </p>
              </aside>
            </div>
          </FadeIn>

          {/* 04 Creator Rewards */}
          <FadeIn className={chapter} delay={0.1}>
            <div className={chapterGrid}>
              <p className={chapterNum} aria-hidden>
                04
              </p>
              <div className="min-w-0">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                  Creator Rewards
                </p>
                <h3 className={`mt-3 ${chapterTitle}`}>
                  A portion of platform fees funds the monthly Creator Rewards
                  Pool.
                </h3>
                <div className={chapterBody}>
                  <p>
                    Performance 50% · AUM 25% · Volume 15% · Tips 10%
                  </p>
                  <p>The Top 10 portfolios qualify each month.</p>
                  <p>
                    Rewards purchase the underlying assets of each winning
                    portfolio and split:
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {["50% → Creator", "50% → Eligible Investors"].map(
                      (label) => (
                        <div key={label} className={splitBox}>
                          <p className={splitBoxLabel}>{label}</p>
                        </div>
                      )
                    )}
                  </div>
                  <p>
                    Only investors who have held the portfolio for 7+ days and
                    tipped the creator in $DEXLA are eligible.
                  </p>
                  <p>Investor rewards are weighted:</p>
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {["80% → Amount Invested", "20% → Amount Tipped"].map(
                      (label) => (
                        <div key={label} className={weightBox}>
                          <p className={weightBoxLabel}>{label}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <aside className={chapterAsideBoxes}>
                <div className="grid grid-cols-2 gap-3">
                  {["50% → Creators", "50% → Investors"].map((label) => (
                    <div key={label} className={statBox}>
                      <p className={statBoxText}>{label}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mx-auto mt-12 max-w-5xl md:mt-16" delay={0.12}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {closingWords.map((word) => (
              <div
                key={word}
                className="flex min-h-[5.5rem] items-center justify-center rounded-2xl border border-electric/30 bg-electric/[0.06] px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.12),0_14px_36px_rgba(0,0,0,0.18)] sm:min-h-[6.5rem]"
              >
                <p className="display text-[1.35rem] font-semibold tracking-[-0.04em] text-ink sm:text-[1.55rem] md:text-[1.7rem]">
                  {word}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
