"use client";

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

const flow = [
  {
    stage: "EXTREME FEAR",
    meta: "Fear & Greed < 20",
    action: "DCA IN",
    detail: "10% of allocated capital",
  },
  {
    stage: "NEUTRAL",
    meta: "45–55",
    action: "HOLD",
    detail: "No buying. No selling.",
  },
  {
    stage: "GREED",
    meta: "> 70",
    action: "DCA OUT",
    detail: "Reduce exposure gradually",
  },
  {
    stage: "EXTREME GREED",
    meta: "Euphoria zone",
    action: "Increase profit taking",
    detail: "Larger DCA out percentages",
  },
];

export function StrategyWorksSection() {
  const reduce = useReducedMotion();

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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Vertical strategy progression */}
          <FadeIn delay={0.04}>
            <div className="rounded-[1.35rem] border border-line bg-deep/60 p-5 sm:p-6">
              <p className={invEyebrow}>Strategy progression</p>
              <ol className="mt-5 space-y-0">
                {flow.map((step, i) => (
                  <li key={step.stage}>
                    <motion.div
                      className="rounded-xl border border-line bg-void/45 p-4"
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="display text-[1.05rem] tracking-[-0.02em] text-ink">
                            {step.stage}
                          </p>
                          <p className="mt-1 text-[0.85rem] text-muted">
                            {step.meta}
                          </p>
                        </div>
                        <span className="rounded-lg border border-electric/35 bg-electric/10 px-2.5 py-1 text-[0.78rem] font-semibold text-electric">
                          {step.action}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.9rem] text-muted">{step.detail}</p>
                    </motion.div>
                    {i < flow.length - 1 && (
                      <div className="flex justify-center py-2 text-electric/60" aria-hidden>
                        ↓
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-success">
                  Cycle Repeats
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Rule builder product UI */}
          <FadeIn delay={0.08}>
            <div className="rounded-[1.35rem] border border-electric/30 bg-gradient-to-b from-electric/[0.08] to-void/40 p-5 sm:p-6">
              <p className={invEyebrow}>INDEXLA Rule Builder</p>
              <p className="mt-2 display text-[1.2rem] tracking-[-0.02em] text-ink">
                Buy Fear — DCA In
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Condition", value: "Fear & Greed < 20" },
                  { label: "Action", value: "DCA Buy" },
                  { label: "Allocation", value: "10%" },
                  { label: "Frequency", value: "Weekly" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-void/55 px-4 py-3"
                  >
                    <span className="text-[0.85rem] text-muted">{row.label}</span>
                    <span className="text-right text-[0.95rem] font-semibold text-ink">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-xl border border-success/40 bg-success/10 px-4 py-3">
                  <span className="text-[0.85rem] text-muted">Status</span>
                  <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-success">
                    <span className="relative flex h-2 w-2">
                      {!reduce && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    Active
                  </span>
                </div>
              </div>

              <p className={`mt-5 ${invBody}`}>
                Fear → Accumulate · Neutral → Hold · Greed → Take Profit ·
                Extreme Greed → Take More Profit
              </p>
            </div>
          </FadeIn>
        </div>

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
