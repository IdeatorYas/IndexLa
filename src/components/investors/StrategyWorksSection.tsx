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
    meta: "Fear & Greed < 20",
    action: "DCA IN",
    detail: "10% of allocated capital",
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
    meta: "45–55",
    action: "HOLD",
    detail: "No buying. No selling.",
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
    meta: "> 70",
    action: "DCA OUT",
    detail: "Reduce exposure gradually",
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
    meta: "Euphoria zone",
    action: "Increase profit taking",
    detail: "Larger DCA out percentages",
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
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            See How A{" "}
            <span className="gradient-text">Strategy Works.</span>
          </h2>
          <p className={invLede}>Example: Buy Fear. Sell Greed.</p>
          <p className={`mt-3 ${invBody}`}>
            Built for long-term investors, not day traders.
          </p>
          <p className={`mt-3 ${invBody}`}>
            Instead of reacting to short-term price movements, define your
            response to the broader market cycle in advance.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="rounded-[1.25rem] border border-line bg-deep/50 p-5 sm:p-6">
            <p className={invEyebrow}>You define</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Your capital allocation.",
                "Your DCA percentage.",
                "Your execution frequency.",
                "Your sentiment thresholds.",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-void/50 px-3 py-2.5 text-[0.95rem] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${invBodyStrong}`}>
              INDEXLA follows those rules as market conditions change.
            </p>
          </div>
        </FadeIn>

        {/* Unified product demonstration */}
        <FadeIn className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-deep/70">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5 sm:px-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                INDEXLA Strategy Demo
              </p>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                Progression ↔ Rule Builder
              </p>
            </div>

            <div className="grid lg:grid-cols-2 lg:items-stretch">
              {/* Left: progression */}
              <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <p className={invEyebrow}>Strategy progression</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {phases.map((step) => {
                    const isActive = step.id === activeId;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(step.id)}
                          className={`w-full rounded-xl border px-4 py-3.5 text-left transition-colors ${
                            isActive
                              ? "border-electric/45 bg-electric/10"
                              : "border-line bg-void/40 hover:border-electric/25"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="display text-[1rem] tracking-[-0.02em] text-ink sm:text-[1.05rem]">
                                {step.stage}
                              </p>
                              <p className="mt-1 text-[0.85rem] text-muted">
                                {step.meta}
                              </p>
                              <p className="mt-1.5 text-[0.88rem] text-muted">
                                {step.detail}
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
                <div className="mt-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center">
                  <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-success">
                    Cycle Repeats
                  </p>
                </div>
              </div>

              {/* Right: rule builder synced to selection */}
              <div className="flex flex-col p-5 sm:p-6">
                <p className={invEyebrow}>INDEXLA Rule Builder</p>
                <motion.div
                  key={active.id}
                  className="mt-4 flex flex-1 flex-col"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                    {active.ruleTitle}
                  </p>

                  <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
                    {active.rules.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/55 px-4 py-3"
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

                  <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
                    {active.stage}: {active.meta} → {active.action}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-10 max-w-3xl space-y-4">
          <p className={`${invH3} uppercase`}>Then the cycle repeats.</p>
          <p className={invBody}>
            When the market eventually moves from euphoria back toward fear,
            your strategy is already defined.
          </p>
          <p className={invBody}>
            When fear returns, accumulation begins again.
          </p>
          <div className={invGreenBox}>
            <p className={invGreenText}>
              You don&apos;t need to predict the top or bottom.
            </p>
          </div>
          <p className={invBody}>
            You define how your portfolio should respond to the cycle. INDEXLA
            monitors the conditions and coordinates execution according to the
            rules and permissions you approved.
          </p>
          <p className={invBodyStrong}>
            The strategy stays disciplined even when the market isn&apos;t.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
