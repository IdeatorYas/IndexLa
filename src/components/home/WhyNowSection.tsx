import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const METRICS = [
  { value: "$302B+", label: "Stablecoin Market Value" },
  { value: "$38B+", label: "Tokenized RWA Value" },
  { value: "2.9M+", label: "RWA Holders" },
] as const;

export function WhyNowSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} mx-auto max-w-4xl uppercase tracking-[-0.03em]`}>
            The Investment Economy Is{" "}
            <span className="gradient-text">Moving On-Chain.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex min-h-[10.5rem] flex-col items-center justify-center rounded-2xl border border-electric/30 bg-gradient-to-b from-electric/[0.1] to-deep/70 px-4 py-8 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14)]"
              >
                <p className="display text-[clamp(2.1rem,4.4vw,2.9rem)] font-semibold leading-none tracking-[-0.04em] gradient-text">
                  {metric.value}
                </p>
                <p className="mt-4 text-[0.98rem] font-semibold leading-snug tracking-[-0.01em] text-muted text-balance sm:text-[1.05rem]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <p className={`mx-auto max-w-3xl ${homeBody}`}>
            Capital and assets are moving on-chain—creating demand for direct
            ownership, automated portfolios and better ways to put stablecoins
            to work.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
