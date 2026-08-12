import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeLede,
  homeSection,
} from "@/components/home/homeRhythm";

const stats = [
  { label: "Distributed Asset Value", value: "$38.14B" },
  { label: "Represented Asset Value", value: "$373.37B" },
  { label: "Total Asset Holders", value: "1.72M" },
] as const;

export function TokenizationSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(124,58,237,0.08),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(56,189,248,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>The Financial System Is Being Tokenized</h2>
          <p className={homeLede}>Everything is moving on chain.</p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-void/45 px-5 py-7 text-center sm:px-6"
              >
                <p className="display text-[clamp(1.75rem,3.5vw,2.4rem)] leading-none gradient-text">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.95rem] font-semibold tracking-[0.02em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Source: RWA.xyz
          </p>
        </FadeIn>

        <FadeIn className={`mt-8 max-w-3xl space-y-5 ${homeBody}`}>
          <p>
            Treasuries, bonds, equities, commodities, funds, credit, and other
            RWAs are moving onto programmable blockchains.
          </p>
          <p>
            BlackRock and major financial institutions are building tokenized
            asset infrastructure, while Saudi Arabia and the UAE are advancing
            real world asset tokenization.
          </p>
          <p className="font-semibold text-ink">The supply is growing fast.</p>
          <p className="font-semibold text-ink">
            The next infrastructure opportunity is distribution.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
