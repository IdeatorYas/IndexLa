import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeEyebrow,
  homeH2,
  homeMeasure,
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
        <FadeIn className="text-center">
          <h2 className={homeH2}>Why Now</h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Crypto adoption is growing while traditional assets are moving
            on-chain.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <p className={`mb-4 text-center ${homeEyebrow}`}>Market Backdrop</p>
          <div className="mx-auto grid max-w-3xl auto-rows-fr gap-3 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-void/45 px-5 py-8 text-center sm:px-6"
              >
                <p className="display text-[clamp(1.75rem,3.5vw,2.4rem)] leading-none gradient-text">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.95rem] font-semibold tracking-[0.02em] text-muted text-balance">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-electric/90 sm:text-[0.9rem]">
            Source:{" "}
            <a
              href="https://www.rwa.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-electric/35 underline-offset-4 transition-colors hover:text-electric hover:decoration-electric/70"
            >
              RWA.xyz
            </a>
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className={`space-y-6 text-center ${homeMeasure} ${homeBody}`}>
            <p>
              For the first time, crypto + tokenized assets can be combined into
              hybrid portfolios.
            </p>
            <p>
              But assets remain fragmented across chains, making cross-chain
              investing difficult for users.
            </p>
            <p>
              Tokenization creates the assets. Cross-chain infrastructure
              connects them. INDEXLA makes them investable together through one
              programmable portfolio.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
