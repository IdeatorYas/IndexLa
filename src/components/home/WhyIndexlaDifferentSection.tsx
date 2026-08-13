import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeH3,
  homeMeasure,
  homeMeasureTight,
  homeSection,
} from "@/components/home/homeRhythm";

const items = [
  {
    title: "Multi-Asset + Multi-Chain Complexity",
    problem:
      "Crypto and tokenized assets are fragmented across chains and platforms. Moving, managing, and coordinating them manually is complex.",
    solution:
      "INDEXLA brings supported assets and networks into one programmable portfolio.",
  },
  {
    title: "Manual Investing + Missed Opportunities",
    problem:
      "Managing allocations manually requires constant monitoring and execution, making it easy to miss market moves.",
    solution:
      "Set rule-based strategies once and automate authorized execution.",
  },
  {
    title: "Index Products Use Wrappers Instead of Direct Ownership",
    problem:
      "Many index products package exposure into a single token or wrapper rather than giving users direct ownership of the underlying assets.",
    solution:
      "INDEXLA lets users hold the underlying assets directly in their wallet. Not a wrapper. Not a vault.",
  },
  {
    title: "Creators Lack a Distribution + Monetization Layer",
    problem:
      "KOLs and creators can share investment ideas through posts, groups, and subscriptions, but have limited ways to turn their investment theses into investable products.",
    solution:
      "INDEXLA lets creators publish portfolios, reach investors, and earn 50% of applicable execution fees.",
  },
] as const;

export function WhyIndexlaDifferentSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Why INDEXLA Is Different
          </h2>
        </FadeIn>

        <div className="mx-auto mt-9 grid max-w-5xl auto-rows-fr gap-3 sm:gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-deep/55 px-5 py-6 text-center sm:px-6 sm:py-7">
                <h3 className={`${homeH3} text-[clamp(1.1rem,2vw,1.35rem)]`}>
                  {item.title}
                </h3>
                <p className={`mt-4 flex-1 ${homeMeasureTight} ${homeBody}`}>
                  {item.problem}
                </p>
                <p
                  className={`mt-5 w-full border-t border-line pt-4 ${homeMeasureTight} ${homeBodyStrong}`}
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
      </div>
    </section>
  );
}
