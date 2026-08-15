import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeH3,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const capabilities = [
  {
    lead: "Build ",
    emphasis: "multi-asset, multi-chain portfolios.",
  },
  {
    lead: "Automate strategies like ",
    emphasis: "Buy Fear · Sell Greed.",
  },
  {
    lead: "Investors ",
    emphasis: "build, customize, and automate while keeping full custody.",
  },
  {
    lead: "Creators ",
    emphasis: "monetize through four revenue streams.",
  },
] as const;

const fragments = [
  {
    title: "Fragmented Markets",
    problem: "Assets are spread across chains, wallets and platforms.",
    solution: "One portfolio across supported assets and networks.",
  },
  {
    title: "Opaque Products",
    problem: "Many index products package exposure into a wrapper.",
    solution: "Own the underlying assets directly.",
  },
  {
    title: "Manual Investing",
    problem:
      "Managing allocations requires constant monitoring and execution.",
    solution: "Define rules and automate authorized execution.",
  },
] as const;

export function WhyIndexlaDifferentSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>Why INDEXLA</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.15rem] font-semibold leading-snug text-electric text-pretty text-balance sm:text-[1.25rem]">
            No platform today brings this combination together.
          </p>
        </FadeIn>

        <div className="mx-auto mt-9 grid max-w-5xl gap-3 sm:grid-cols-2">
          {capabilities.map((item, i) => (
            <FadeIn key={item.emphasis} delay={0.03 * i}>
              <article className="h-full rounded-2xl border border-electric/25 bg-electric/[0.06] px-5 py-5 text-center sm:px-6 sm:py-6">
                <p className={homeBody}>
                  {item.lead}
                  <span className="font-semibold">{item.emphasis}</span>
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center" delay={0.12}>
          <div className="rounded-2xl border border-electric/35 bg-electric/[0.08] px-5 py-4 sm:px-6 sm:py-5">
            <p className={`${homeBodyStrong} text-balance`}>
              INDEXLA turns investment strategies into programmable products.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-14 max-w-3xl text-center" delay={0.04}>
          <h3 className={`${homeH3} text-[clamp(1.35rem,3vw,1.85rem)]`}>
            Investing Is Fragmented. INDEXLA Connects It.
          </h3>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-3">
          {fragments.map((item, i) => (
            <FadeIn key={item.title} delay={0.04 * i}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-deep/55 px-5 py-6 text-center sm:px-5 sm:py-7">
                <h4 className="display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h4>
                <p className={`mt-3 flex-1 ${homeBody}`}>{item.problem}</p>
                <p
                  className={`mt-5 border-t border-line pt-4 ${homeBodyStrong}`}
                >
                  <span className="text-electric" aria-hidden>
                    →{" "}
                  </span>
                  {item.solution}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-14 max-w-3xl" delay={0.06}>
          <div className="rounded-2xl border border-line bg-deep/55 px-6 py-8 text-center sm:px-8 sm:py-10">
            <h3 className={`${homeH3} text-[clamp(1.35rem,3vw,1.85rem)]`}>
              Creators Have No Distribution Layer
            </h3>
            <p className={`mx-auto mt-5 max-w-2xl ${homeBody}`}>
              Creators can share investment ideas through posts, groups, and
              subscriptions, but have limited ways to turn their investment
              theses into investable products.
            </p>
            <p className={`mx-auto mt-6 max-w-2xl ${homeBodyStrong}`}>
              <span className="text-electric" aria-hidden>
                →{" "}
              </span>
              INDEXLA lets creators publish portfolios, automate strategies,
              reach investors, and earn through four creator revenue streams.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
