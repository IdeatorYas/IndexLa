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
    body: "0% management · 0% performance · 0% exit · 1% on execution.",
  },
  {
    title: "Creators",
    body: "Earn from fees, strategy access, rewards and $DEXLA tips.",
  },
  {
    title: "$DEXLA Holders",
    body: "Unlock access, fee discounts and scarcity through six usage-linked burn mechanisms.",
  },
  {
    title: "INDEXLA",
    body: "Earns from execution fees and treasury growth.",
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
                <p className={`mt-3 flex-1 ${homeBody}`}>{panel.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-12 max-w-4xl text-center">
          <h3 className={homeH3}>The Flywheel</h3>
          <div className="mt-6 overflow-hidden rounded-2xl border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-4 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {FLYWHEEL.map((node, i) => (
                <div key={node} className="flex items-center gap-2">
                  <span className="rounded-xl border border-electric/20 bg-electric/10 px-3.5 py-2 text-[0.92rem] font-semibold text-ink sm:text-[1rem]">
                    {node}
                  </span>
                  {i < FLYWHEEL.length - 1 ? (
                    <span className="text-electric/80" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
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
