import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const stats = [
  { label: "Distributed Asset Value", value: "$38B+" },
  { label: "Represented Asset Value", value: "$373B+" },
  { label: "Asset Holders", value: "1.7M+" },
] as const;

export function TokenizationSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(124,58,237,0.08),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(56,189,248,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Why Now?
          </p>
          <h2 className={`mt-3 ${homeH2}`}>
            The Financial System Is Being Tokenized
          </h2>
          <p className={`mx-auto mt-6 max-w-[40rem] ${homeBody}`}>
            Crypto adoption is growing while traditional assets are moving
            on-chain.
          </p>
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
          <p className="mt-5 text-center text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-electric/90 sm:text-[0.9rem]">
            Source: RWA.xyz
          </p>
        </FadeIn>

        <FadeIn className={`mx-auto mt-8 max-w-3xl space-y-5 text-center ${homeBody}`}>
          <p>
            For the first time, crypto + tokenized assets can be combined into
            hybrid portfolios.
          </p>
          <p>
            But assets remain fragmented across chains, making cross-chain
            investing difficult for users.
          </p>
          <p className={homeBodyStrong}>
            Tokenization creates the assets. Cross-chain infrastructure connects
            them. INDEXLA makes them investable together through one programmable
            portfolio.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
