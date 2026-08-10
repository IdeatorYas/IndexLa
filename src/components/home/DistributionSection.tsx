import { FadeIn } from "@/components/ui/FadeIn";

const layers = [
  { title: "Tokenization", body: "creates the assets." },
  { title: "Blockchains", body: "provide settlement." },
  { title: "Liquidity providers", body: "enable execution." },
] as const;

const investorFlow = ["Discover", "Allocate", "Manage", "Automate"] as const;

const distributionFlow = [
  "Tokenized Assets",
  "Creators",
  "Portfolios",
  "Investors",
  "Execution",
] as const;

export function DistributionSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] tracking-[-0.03em] text-ink text-balance">
            The Missing Layer: Distribution
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="grid gap-3 sm:grid-cols-3">
            {layers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-2xl border border-line bg-void/40 px-5 py-5"
              >
                <p className="text-sm font-semibold text-ink">{layer.title}</p>
                <p className="mt-1 text-sm text-muted">{layer.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="rounded-3xl glass p-7 sm:p-10">
            <p className="text-[1.15rem] font-semibold text-ink">
              INDEXLA provides the portfolio distribution layer.
            </p>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
              As more assets move on chain, investors need one layer to:
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {investorFlow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-xl border border-line bg-void/50 px-3 py-2 text-sm font-semibold text-ink">
                    {item}
                  </span>
                  {i < investorFlow.length - 1 ? (
                    <span className="text-electric/70" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {distributionFlow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-xl border border-electric/25 bg-electric/10 px-3 py-2 text-sm font-semibold text-ink">
                    {item}
                  </span>
                  {i < distributionFlow.length - 1 ? (
                    <span className="text-electric/70" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>Creators bring investment theses.</p>
              <p>Investors allocate to portfolios.</p>
              <p className="font-semibold text-ink">
                INDEXLA connects assets, portfolios, strategies, and investors.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
