"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const steps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets and allocations.",
    preview: (
      <div className="flex flex-wrap gap-1.5">
        {(["btc", "sp500", "gold", "sol", "nvidia"] as const).map((key) => (
          <span
            key={key}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel/80"
          >
            <AssetLogo asset={key} size={15} />
          </span>
        ))}
      </div>
    ),
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set the conditions and rules behind your thesis.",
    preview: (
      <div className="space-y-1.5 text-[0.75rem] font-semibold">
        <div className="flex justify-between rounded-lg border border-line bg-void/50 px-2.5 py-1.5">
          <span className="text-muted">Fear &lt; 20</span>
          <span className="text-electric">DCA IN</span>
        </div>
        <div className="flex justify-between rounded-lg border border-line bg-void/50 px-2.5 py-1.5">
          <span className="text-muted">Greed &gt; 70</span>
          <span className="text-electric">DCA OUT</span>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    title: "PUBLISH",
    body: "Make your strategy available through the INDEXLA marketplace.",
    preview: (
      <div className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-center text-[0.78rem] font-semibold text-electric">
        Live on marketplace
      </div>
    ),
  },
  {
    n: "04",
    title: "AUTOMATE",
    body: "INDEXLA monitors your conditions and coordinates authorized execution.",
    preview: (
      <div className="flex items-center gap-2 rounded-lg border border-success/35 bg-success/10 px-3 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="text-[0.78rem] font-semibold text-success">
          Strategy Active
        </span>
      </div>
    ),
  },
];

export function CreatorThesisFlowSection() {
  return (
    <section
      id="become-creator"
      className={`${crSection} scroll-mt-24 bg-void`}
    >
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${crH2} uppercase`}>
            Your Thesis. Your Portfolio.{" "}
            <span className="gradient-text">Your Economics.</span>
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-[1.2rem] border border-line bg-deep/50 p-5">
                <p className="display text-[1.4rem] gradient-text">{step.n}</p>
                <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className={`mt-3 flex-1 ${crBody}`}>{step.body}</p>
                <div className="mt-4 rounded-xl border border-line/80 bg-void/50 p-3">
                  {step.preview}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <p className={crBodyStrong}>
            You bring the audience and conviction. INDEXLA provides the
            infrastructure.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
