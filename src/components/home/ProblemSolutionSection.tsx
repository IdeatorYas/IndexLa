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

const problems = [
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
  {
    title: "Creators Have No Distribution Layer",
    problem:
      "Creators share investment ideas, but their theses get lost in posts and content.",
    solution:
      "Turn your thesis into a public portfolio your audience can discover and invest in.",
  },
] as const;

export function ProblemSolutionSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_80%_40%,rgba(56,189,248,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Investing Is Fragmented. INDEXLA Connects It.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {problems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-line bg-deep/50 p-6 text-center sm:p-7">
                <h3 className={homeH3}>{item.title}</h3>
                <p className={`mt-4 flex-1 ${homeMeasureTight} ${homeBody}`}>
                  {item.problem}
                </p>
                <p
                  className={`mt-5 border-t border-line pt-4 ${homeMeasureTight} ${homeBodyStrong}`}
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
