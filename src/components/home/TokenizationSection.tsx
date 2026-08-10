import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { label: "Distributed Asset Value", value: "$38.14B" },
  { label: "Represented Asset Value", value: "$373.37B" },
  { label: "Total Asset Holders", value: "1.72M" },
] as const;

export function TokenizationSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(124,58,237,0.1),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] tracking-[-0.03em] text-ink text-balance">
            The Financial System Is Being Tokenized
          </h2>
          <p className="mt-5 text-[1.15rem] font-semibold leading-snug text-ink sm:text-[1.25rem]">
            Everything is moving on chain.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-line bg-deep/60 px-6 py-7 text-center"
              >
                <p className="display text-[clamp(1.85rem,4vw,2.6rem)] leading-none gradient-text">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-semibold tracking-[0.04em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 max-w-3xl space-y-5 text-[1.05rem] leading-[1.7] text-muted sm:text-[1.1rem]">
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
