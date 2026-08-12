import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeChip,
  homeH2,
  homePill,
  homeSection,
} from "@/components/home/homeRhythm";

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
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>The Missing Layer: Distribution</h2>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {layers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-2xl border border-line bg-deep/55 px-5 py-5"
              >
                <p className="text-[1.1rem] font-semibold text-ink sm:text-[1.15rem]">
                  {layer.title}
                </p>
                <p className={`mt-1.5 ${homeBody}`}>{layer.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-7">
          <div className="rounded-3xl glass p-7 sm:p-10">
            <p className="text-[1.15rem] font-semibold leading-snug text-ink text-pretty sm:text-[1.25rem]">
              INDEXLA provides the portfolio distribution layer.
            </p>
            <p className={`mt-5 ${homeBody}`}>
              As more assets move on chain, investors need one layer to:
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {investorFlow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className={homePill}>{item}</span>
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
                  <span className={homeChip}>{item}</span>
                  {i < distributionFlow.length - 1 ? (
                    <span className="text-electric/70" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className={`mt-8 space-y-4 ${homeBody}`}>
              <p>Creators bring investment theses.</p>
              <p>Investors allocate to portfolios.</p>
              <p className="font-semibold">
                INDEXLA connects assets, portfolios, strategies, and investors.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
