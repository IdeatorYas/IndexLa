import { FadeIn } from "@/components/ui/FadeIn";

export function DistributionSection() {
  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32">
      <div className="section-pad container-max">
        <div className="grid gap-14 lg:grid-cols-2">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.2vw,3.15rem)] text-balance">
              The World Is Tokenizing Assets.
            </h2>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
              <p>
                Stocks. Bonds. Funds. Commodities. Real estate. Private markets.
              </p>
              <p>
                More financial assets are moving onto programmable blockchain
                infrastructure.
              </p>
              <p>But tokenizing an asset is only half the problem.</p>
              <p>
                Investors still need a way to discover assets, combine them into
                portfolios, allocate capital, and manage exposure across markets.
              </p>
              <p className="font-medium text-ink/90">
                Tokenization creates the assets.
              </p>
              <p className="font-medium text-ink/90">
                INDEXLA creates the portfolio and distribution layer around them.
              </p>
              <p>
                Asset issuers create the products. Creators build strategies
                around them. Investors discover, combine, allocate, and automate
                exposure.
              </p>
              <p>
                More assets on-chain means a larger universe for programmable
                portfolios.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-3xl glass p-7 sm:p-9">
              <h3 className="display text-[clamp(1.6rem,3vw,2.2rem)] text-balance">
                The Distribution Layer For On-Chain Assets.
              </h3>
              <div className="mt-5 space-y-3 text-[1.02rem] leading-relaxed text-muted">
                <p>
                  The tokenization race is creating a growing universe of
                  investable assets.
                </p>
                <p>The next bottleneck is distribution.</p>
                <ul className="space-y-2 pt-2">
                  {[
                    "How do investors discover them?",
                    "How do they combine them?",
                    "How do they allocate across them?",
                    "How do they automate their strategy?",
                  ].map((q) => (
                    <li key={q} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2">INDEXLA is building that layer.</p>
                <p>
                  Asset issuers create the assets. Creators build strategies
                  around them. Investors allocate capital. INDEXLA connects them
                  through portfolios and execution.
                </p>
              </div>
              <p className="display mt-8 text-[1.25rem] text-ink">
                One marketplace connecting assets, strategies, creators, and
                capital.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
