"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const steps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets, allocations, and portfolio.",
    visual: (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {(["btc", "eth", "sol", "nvidia"] as const).map((key) => (
            <span
              key={key}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel/80"
            >
              <AssetLogo asset={key} size={16} />
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 text-[0.72rem] font-semibold">
          <span className="rounded-md border border-line px-2 py-1 text-muted">
            Assets
          </span>
          <span className="text-electric/60" aria-hidden>
            →
          </span>
          <span className="rounded-md border border-line px-2 py-1 text-muted">
            Allocations
          </span>
          <span className="text-electric/60" aria-hidden>
            →
          </span>
          <span className="rounded-md border border-electric/35 bg-electric/10 px-2 py-1 text-electric">
            Portfolio
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set the conditions that determine when your portfolio should act.",
    visual: (
      <div className="space-y-2">
        {[
          { t: "Fear < 20", a: "DCA IN" },
          { t: "Greed > 70", a: "DCA OUT" },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center justify-between rounded-lg border border-line bg-void/50 px-3 py-2 text-[0.78rem] font-semibold"
          >
            <span className="text-muted">{r.t}</span>
            <span className="text-electric">{r.a}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your strategy and let INDEXLA monitor the conditions and coordinate execution according to your rules.",
    visual: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg border border-success/35 bg-success/10 px-3 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[0.82rem] font-semibold text-success">
            Strategy Active ✓
          </span>
        </div>
        <p className="text-[0.78rem] text-muted">
          Monitoring conditions · Coordinating execution
        </p>
      </div>
    ),
  },
];

export function BuildDefineAutomateSection() {
  return (
    <section id="how-it-works" className={`${invSection} scroll-mt-24 bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            Build. Define.{" "}
            <span className="gradient-text">Automate.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-deep/50 p-5 sm:p-6">
                <p className="display text-[1.5rem] gradient-text">{step.n}</p>
                <h3 className="mt-1 display text-[1.25rem] tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className={`mt-3 flex-1 ${invBody}`}>{step.body}</p>
                <div className="mt-5 rounded-xl border border-line/80 bg-void/50 p-4">
                  {step.visual}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 space-y-5">
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Build your portfolio and automate your strategy in 5 minutes.
            </p>
          </div>
          <Button href="/creators" className="w-fit min-w-[13.5rem]">
            Build Your First Portfolio
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
