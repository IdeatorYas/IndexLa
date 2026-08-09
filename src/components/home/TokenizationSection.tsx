import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Tokenization / Distribution Layer — exact approved copy from content/home.md
 * Placement: immediately after One Portfolio. Every Market.
 */
export function TokenizationSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(124,58,237,0.1),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.8vw,3.5rem)] tracking-[-0.035em] text-ink text-balance">
              The Assets Are Being Tokenized.{" "}
              <span className="gradient-text">
                The Distribution Layer Is Next.
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-8 space-y-5 text-[1.08rem] leading-[1.7] text-muted sm:text-[1.125rem]">
              <p>
                Tokenization is bringing stocks, commodities, real-world assets,
                and other financial instruments on-chain.
              </p>
              <p>But creating the asset is only the beginning.</p>
              <p className="text-[1.15rem] font-semibold leading-[1.55] tracking-[-0.015em] text-ink sm:text-[1.2rem]">
                INDEXLA is building the distribution layer that turns tokenized
                assets into investable portfolios.
              </p>
              <p>
                Discover them. Allocate across them. Combine them with crypto and
                other markets. Define your rules. Automate execution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p className="display mt-10 text-[clamp(1.25rem,2.6vw,1.75rem)] tracking-[-0.03em] text-ink">
              One portfolio. Multiple asset classes. On-chain execution.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
