"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { AssetLogo } from "@/components/ui/AssetLogo";
import {
  invGreenBox,
  invGreenText,
  invH2,
  invLabel,
  invSection,
} from "@/components/investors/investorRhythm";

const steps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets, allocations, and portfolio.",
    preview: (
      <div className="space-y-2">
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
        <div className="space-y-1.5">
          {[
            { label: "Crypto", pct: 55 },
            { label: "Equities", pct: 45 },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-0.5 flex justify-between text-[0.65rem] text-muted">
                <span>{row.label}</span>
                <span>{row.pct}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set the conditions that determine when your portfolio should act.",
    preview: (
      <div className="space-y-2">
        {[
          { trigger: "Fear < 20", action: "DCA IN" },
          { trigger: "Greed > 70", action: "DCA OUT" },
        ].map((rule) => (
          <div
            key={rule.trigger}
            className="flex items-center justify-between rounded-lg border border-line bg-void/50 px-3 py-2 text-[0.72rem] font-semibold"
          >
            <span className="text-muted">{rule.trigger}</span>
            <span className="text-electric">{rule.action}</span>
          </div>
        ))}
        <p className="text-[0.65rem] text-muted-dim">Sentiment thresholds · DCA %</p>
      </div>
    ),
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your strategy and let INDEXLA monitor the conditions and coordinate execution according to your rules.",
    preview: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg border border-success/35 bg-success/10 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[0.72rem] font-semibold text-success">
            Strategy Active
          </span>
        </div>
        <p className="text-[0.65rem] text-muted">
          Monitoring conditions · Awaiting triggers
        </p>
      </div>
    ),
  },
];

export function BuildDefineAutomateSection() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className={`${invSection} scroll-mt-24 bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={invH2}>
            Build. Define.{" "}
            <span className="gradient-text">Automate.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 flex flex-col items-center gap-0">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.06} className="w-full max-w-xl">
              <div className="relative w-full">
                <article className="rounded-[1.35rem] border border-line bg-deep/50 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="display shrink-0 text-[1.75rem] gradient-text">
                      {step.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={invLabel}>{step.title}</p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                        {step.body}
                      </p>
                      <div className="mt-4 rounded-xl border border-line/80 bg-void/50 p-4">
                        {step.preview}
                      </div>
                    </div>
                  </div>
                </article>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-3">
                    <motion.div
                      className="flex flex-col items-center gap-1"
                      animate={reduce ? undefined : { y: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <span className="h-6 w-px bg-gradient-to-b from-electric/60 to-transparent" />
                      <span className="text-electric/70" aria-hidden>
                        ↓
                      </span>
                    </motion.div>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 space-y-5">
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Build your portfolio and automate your strategy in under 5 minutes.
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
