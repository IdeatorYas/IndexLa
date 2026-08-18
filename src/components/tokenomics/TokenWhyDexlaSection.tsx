import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkBodyStrong,
  tkH2,
  tkSection,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

const points = [
  "Creators use it to publish portfolios.",
  "Creators use it to feature portfolios and increase visibility.",
  "Creators use it to monetize their strategies.",
  "Creators use it to access strategies from other creators.",
  "Investors use it to reduce execution costs.",
  "Investors use it to support creators.",
] as const;

const platformActivityStatement =
  "Platform activity creates direct burns and buyback demand.";

const flowSteps = [
  { label: "Creators", accent: "text-success" },
  { label: "$DEXLA", accent: "gradient-text" },
  { label: "Investors", accent: "text-electric" },
  { label: "Platform", accent: "text-ink" },
  { label: "Burns", accent: "text-danger" },
] as const;

export function TokenWhyDexlaSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Why <span className="gradient-text">$DEXLA</span> Exists
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl ${tkBodyStrong}`}>
            The token is embedded directly into INDEXLA&apos;s platform economy.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className={`mx-auto max-w-4xl ${tkSurface} px-5 py-6 sm:px-8 sm:py-8`}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                  <span
                    className={`rounded-lg border border-white/[0.1] bg-void/50 px-3.5 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] sm:text-[0.88rem] ${
                      step.label === "$DEXLA" ? "gradient-text" : step.accent
                    }`}
                  >
                    {step.label}
                  </span>
                  {i < flowSteps.length - 1 ? (
                    <span className="text-muted-dim" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {points.map((line) => (
                <p
                  key={line}
                  className={`border border-white/[0.07] bg-void/40 px-4 py-3.5 ${tkBody}`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-2xl border border-electric/35 bg-electric/[0.08] px-6 py-8 text-center shadow-[0_0_48px_-12px_rgba(56,189,248,0.28)] sm:px-8 sm:py-10">
              <p className="text-[1.12rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.32rem] md:text-[1.42rem]">
                {platformActivityStatement}
              </p>
            </div>

            <p className="mt-8 text-center text-[1.08rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.15rem]">
              That is the INDEXLA token economy.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
