"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invEyebrow,
  invGreenBox,
  invGreenText,
  invH2,
  invH3,
  invLede,
  invSection,
} from "@/components/investors/investorRhythm";

const buildSteps = [
  {
    n: "01",
    title: "BUILD",
    body: "Choose your assets and allocate your capital.",
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set your DCA percentage, frequency, conditions, and thresholds.",
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve the rules and let INDEXLA monitor conditions and coordinate execution.",
  },
];

type Phase = {
  id: string;
  stage: string;
  meta: string;
  action: string;
  detail: string;
  ruleTitle: string;
  rules: { label: string; value: string }[];
  status: "Active" | "Hold" | "Active · Profit";
  statusTone: "success" | "muted" | "electric";
};

const phases: Phase[] = [
  {
    id: "extreme-fear",
    stage: "EXTREME FEAR",
    meta: "Fear & Greed Index falls below 20.",
    action: "DCA IN",
    detail:
      "Your strategy begins accumulating. For example, you could configure INDEXLA to deploy 10% of your allocated capital per DCA action while extreme fear conditions remain.",
    ruleTitle: "Buy Fear — DCA In",
    rules: [
      { label: "Condition", value: "Fear & Greed < 20" },
      { label: "Action", value: "DCA Buy" },
      { label: "Allocation", value: "10%" },
      { label: "Frequency", value: "Weekly" },
    ],
    status: "Active",
    statusTone: "success",
  },
  {
    id: "neutral",
    stage: "NEUTRAL",
    meta: "Sentiment recovers into the 45–55 range.",
    action: "HOLD",
    detail: "Your strategy pauses. No buying. No selling.",
    ruleTitle: "Neutral — Hold",
    rules: [
      { label: "Condition", value: "Fear & Greed 45–55" },
      { label: "Action", value: "Hold" },
      { label: "Allocation", value: "—" },
      { label: "Frequency", value: "—" },
    ],
    status: "Hold",
    statusTone: "muted",
  },
  {
    id: "greed",
    stage: "GREED",
    meta: "Sentiment rises above 70.",
    action: "DCA OUT",
    detail:
      "The strategy begins taking profits. INDEXLA gradually reduces exposure through DCA out according to your defined percentages.",
    ruleTitle: "Sell Greed — DCA Out",
    rules: [
      { label: "Condition", value: "Fear & Greed > 70" },
      { label: "Action", value: "DCA Sell" },
      { label: "Allocation", value: "10%" },
      { label: "Frequency", value: "Weekly" },
    ],
    status: "Active",
    statusTone: "success",
  },
  {
    id: "extreme-greed",
    stage: "EXTREME GREED",
    meta: "Sentiment reaches extreme greed.",
    action: "TAKE MORE PROFIT",
    detail:
      "Your strategy increases the pace of profit taking according to your predefined rules.",
    ruleTitle: "Extreme Greed — Take More Profit",
    rules: [
      { label: "Condition", value: "Extreme Greed" },
      { label: "Action", value: "Increase DCA Out" },
      { label: "Allocation", value: "Larger %" },
      { label: "Frequency", value: "Weekly" },
    ],
    status: "Active · Profit",
    statusTone: "electric",
  },
];

export function StrategyWorksSection() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(phases[0].id);
  const active = phases.find((p) => p.id === activeId) ?? phases[0];

  const statusClass =
    active.statusTone === "success"
      ? "border-success/40 bg-success/10 text-success"
      : active.statusTone === "electric"
        ? "border-electric/40 bg-electric/10 text-electric"
        : "border-line bg-void/55 text-muted";

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            See How A{" "}
            <span className="gradient-text">Strategy Works.</span>
          </h2>
          <p className={`mt-4 ${invEyebrow}`}>Build → Define → Automate</p>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {buildSteps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.04}>
              <article className="h-full rounded-[1.2rem] border border-line bg-void/45 p-6 text-center">
                <p className="display text-[1.4rem] gradient-text">{step.n}</p>
                <h3 className="mt-1 display text-[1.2rem] tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className={`mt-3 ${invBody}`}>{step.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 max-w-3xl">
          <p className={invLede}>
            Example: When Fear & Greed drops below 20, your approved rule can
            trigger the defined portfolio allocation.
          </p>
          <p className={`mt-4 ${invBody}`}>
            Built for long-term investors, not day traders.
          </p>
          <p className={`mt-4 ${invBody}`}>
            Instead of reacting to short-term price movements, define your
            response to the broader market cycle in advance.
          </p>
        </FadeIn>

        {/* Unified product demo */}
        <FadeIn className="mt-12" delay={0.04}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-void/50">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  INDEXLA Strategy Demo
                </p>
                <p className="mt-1 text-[0.78rem] font-medium text-muted">
                  Interactive product preview — example only, not live trading.
                </p>
              </div>
              <p className="rounded-full border border-line bg-deep/60 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                Preview
              </p>
            </div>

            <div className="border-b border-line bg-deep/45 px-5 py-4 sm:px-7">
              <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Illustrative flow
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {[
                  "Fear & Greed: 20",
                  "Rule Triggered",
                  "Approved Portfolio Allocation Executes",
                ].map((step, i, steps) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-[0.82rem] font-semibold leading-snug text-ink sm:text-[0.88rem]">
                      {step}
                    </span>
                    {i < steps.length - 1 ? (
                      <span className="text-electric/60" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Example market condition
              </p>
            </div>

            <div className="grid lg:grid-cols-2 lg:items-stretch">
              <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                <p className={invEyebrow}>Strategy progression</p>
                <p className="mt-1 text-[0.85rem] text-muted">
                  Select a market phase to preview the matching rule.
                </p>
                <ol className="mt-5 flex flex-col gap-2.5">
                  {phases.map((step) => {
                    const isActive = step.id === activeId;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(step.id)}
                          aria-pressed={isActive}
                          className={`w-full rounded-xl border px-4 py-3.5 text-center transition-all ${
                            isActive
                              ? "border-electric/45 bg-electric/10 shadow-[inset_0_1px_0_rgba(56,189,248,0.14)]"
                              : "border-line bg-deep/40 hover:border-electric/25 hover:bg-deep/55"
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:justify-between sm:gap-3 sm:text-left">
                            <div className="min-w-0 text-center sm:text-left">
                              <p className="display text-[1rem] tracking-[-0.02em] text-ink sm:text-[1.05rem]">
                                {step.stage}
                              </p>
                              <p className="mt-1 text-[0.85rem] leading-snug text-muted text-pretty">
                                {step.meta}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-lg border px-2.5 py-1 text-[0.72rem] font-semibold ${
                                isActive
                                  ? "border-electric/40 bg-electric/15 text-electric"
                                  : "border-line bg-void/50 text-muted"
                              }`}
                            >
                              {step.action}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center">
                  <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Then The Cycle Repeats
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-5 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className={invEyebrow}>INDEXLA Rule Builder</p>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                    Example preview
                  </p>
                </div>
                <motion.div
                  key={active.id}
                  className="mt-5 flex flex-1 flex-col"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                    {active.ruleTitle}
                  </p>
                  <p className={`mt-3 ${invBody}`}>{active.detail}</p>

                  <div className="mt-5 flex flex-1 flex-col justify-center gap-2.5">
                    {active.rules.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-line bg-deep/55 px-4 py-3.5"
                      >
                        <span className="text-[0.85rem] text-muted">
                          {row.label}
                        </span>
                        <span className="text-right text-[0.95rem] font-semibold text-ink">
                          {row.value}
                        </span>
                      </div>
                    ))}
                    <div
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${statusClass}`}
                    >
                      <span className="text-[0.85rem] text-muted">Status</span>
                      <span className="flex items-center gap-2 text-[0.95rem] font-semibold">
                        {active.statusTone !== "muted" && (
                          <span className="relative flex h-2 w-2">
                            {!reduce && (
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-45" />
                            )}
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                          </span>
                        )}
                        {active.status}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-[0.9rem] font-semibold text-electric">
                    {active.stage.split(" ")[0] === "EXTREME"
                      ? active.action === "DCA IN"
                        ? "Fear → DCA IN"
                        : "Extreme Greed → TAKE MORE PROFIT"
                      : active.action === "HOLD"
                        ? "Neutral → HOLD"
                        : "Greed → DCA OUT"}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-12 max-w-3xl space-y-5">
          <p className={`${invH3} uppercase`}>Then the cycle repeats.</p>
          <p className={invBody}>
            When fear returns, accumulation begins again.
          </p>
          <div className={invGreenBox}>
            <p className={invGreenText}>
              You don&apos;t need to predict the top or bottom.
            </p>
          </div>
          <p className={invBody}>
            You define how your portfolio should respond to the cycle.
          </p>
          <p className={invBodyStrong}>
            INDEXLA monitors the conditions and coordinates execution according
            to the rules and permissions you approved.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
