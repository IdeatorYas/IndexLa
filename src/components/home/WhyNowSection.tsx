import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const METRICS = [
  { value: "$302B+", label: "Stablecoin Value" },
  { value: "$38B+", label: "Distributed RWA Value" },
  { value: "2.9M+", label: "RWA Holders" },
  { value: "0.39%", label: "U.S. National Average Savings Rate" },
] as const;

export function WhyNowSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            Capital Is Moving <span className="gradient-text">On-Chain.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex min-h-[9.5rem] flex-col items-center justify-center rounded-2xl border border-line bg-deep/55 px-4 py-8 text-center sm:px-5"
              >
                <p className="display text-[clamp(2rem,4.2vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] gradient-text">
                  {metric.value}
                </p>
                <p className="mt-4 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-muted text-balance sm:text-[1.02rem]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <p className={`mx-auto max-w-3xl ${homeBody}`}>
            Demand is growing for direct asset ownership, portfolio automation
            and better ways to put stablecoins to work.
          </p>
          <p className="mt-5 text-[0.9rem] font-semibold tracking-[-0.01em] text-muted-dim sm:text-[0.98rem]">
            Sources:{" "}
            <a
              href="https://app.rwa.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric underline decoration-electric/35 underline-offset-4 transition-colors hover:text-ink hover:decoration-electric/70"
            >
              RWA.xyz
            </a>
            {" · "}
            <a
              href="https://www.fdic.gov/resources/bankers/national-rates/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric underline decoration-electric/35 underline-offset-4 transition-colors hover:text-ink hover:decoration-electric/70"
            >
              FDIC
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
