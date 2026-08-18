import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeChip,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const flow = [
  "Assets",
  "Creators",
  "Portfolios",
  "Investors",
  "Execution",
] as const;

export function DistributionSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            The Missing Layer:{" "}
            <span className="gradient-text">Distribution</span>
          </h2>
          <div
            className={`mx-auto mt-6 max-w-xl space-y-2.5 ${homeBody} font-medium text-ink`}
          >
            <p>Tokenization brings assets on-chain</p>
            <p>Creators turn ideas into strategies</p>
            <p>Investors discover and access them</p>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-9 max-w-4xl">
          <div className="rounded-3xl border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-5 py-9 text-center sm:px-10 sm:py-11">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {flow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className={homeChip}>{item}</span>
                  {i < flow.length - 1 ? (
                    <span className="text-electric/80" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-electric/35 bg-electric/[0.08] px-4 py-3.5 text-center sm:px-6 sm:py-4">
              <p className="text-[0.98rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.05rem]">
                Your Keys · Your Assets · Your Permissions
              </p>
              <div className="mx-auto mt-1.5 max-w-lg space-y-0.5 text-[0.88rem] leading-snug text-ink/80 sm:text-[0.95rem]">
                <p>The protocol cannot withdraw your funds.</p>
                <p>You can revoke access at any time.</p>
              </div>
            </div>

            <HomeReadMore
              href="/how-it-works"
              label="Learn How INDEXLA Works →"
              className="mt-8"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
