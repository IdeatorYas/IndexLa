import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeMeasureTight,
  homeSection,
  homeSolution,
} from "@/components/home/homeRhythm";

const feeHighlights = [
  "0% Management",
  "0% Performance",
  "0% Exit",
  "1% Execution Fees",
] as const;

const businessBoxes = [
  {
    title: "Platform Execution Fees",
    body: "1% execution fee on portfolio trades.",
    highlight: "50% → Creator · 50% → INDEXLA",
  },
  {
    title: "INDEXLA Treasury Portfolio",
    body: "Profits from INDEXLA's treasury portfolio provide additional protocol revenue.",
    highlight: "25% → $DEXLA Buyback & Burn",
  },
] as const;

export function FeesSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            BUSINESS <span className="gradient-text">MODEL</span>
          </h2>
          <p className="mt-3 display text-[clamp(1.25rem,2.4vw,1.65rem)] tracking-[-0.025em] text-electric text-balance text-pretty">
            Simple. Multiple Revenue Streams.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {feeHighlights.map((label) => (
              <div
                key={label}
                className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-electric/25 bg-void/50 px-3 py-3 text-center"
              >
                <p className="text-[0.88rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.95rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2">
          {businessBoxes.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05} className="h-full">
              <article className="flex h-full min-h-[20rem] flex-col items-center rounded-2xl border border-electric/30 bg-electric/[0.06] px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.12)] sm:px-8">
                <h3 className="display text-[clamp(1.25rem,2.4vw,1.65rem)] tracking-[-0.025em] text-electric text-balance text-pretty">
                  {item.title}
                </h3>
                <p className={`mt-4 flex-1 ${homeMeasureTight} ${homeBody}`}>
                  {item.body}
                </p>
                <p className={`mt-auto pt-5 ${homeMeasureTight} ${homeSolution}`}>
                  {item.highlight}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore
            href="/whitepaper/10-business-model"
            label="Read the Business Model →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
