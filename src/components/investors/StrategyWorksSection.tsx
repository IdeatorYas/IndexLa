"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  invBody,
  invBodyStrong,
  invEyebrow,
  invH2,
  invH3,
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
    body: "Decide exactly when and how your portfolio should act.",
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve your rules. AI monitors for your conditions and coordinates execution when they are met.",
  },
] as const;

const aiBoundaries = [
  "AI does NOT decide what to buy or sell.",
  "AI does NOT create or change your strategy.",
  "AI only monitors your conditions and coordinates execution of the rules you approved.",
] as const;

const executionFlow = [
  "AI MONITORS",
  "YOUR RULES DECIDE",
  "SMART CONTRACTS ENFORCE",
  "YOU CONTROL CUSTODY",
] as const;

const exampleFlow = [
  "IF Fear & Greed < 20",
  "AI detects your condition",
  "Your approved rule is validated",
  "Smart contracts enforce your permissions",
  "DCA executes",
] as const;

const progression = [
  {
    stage: "EXTREME FEAR",
    meta: "Fear & Greed < 20",
    action: "DCA IN",
  },
  {
    stage: "NEUTRAL",
    meta: "45–55",
    action: "HOLD",
  },
  {
    stage: "GREED",
    meta: "> 70",
    action: "DCA OUT",
  },
  {
    stage: "EXTREME GREED",
    meta: "",
    action: "TAKE PROFIT",
  },
] as const;

const strategyGroups = [
  {
    key: "accumulate",
    title: "Accumulate",
    items: ["Buy Fear DCA In", "RSI Weekly Oversold DCA In"],
  },
  {
    key: "distribute",
    title: "Distribute & Lock Profits",
    items: ["Sell Greed DCA Out", "RSI Weekly Overbought DCA Out"],
  },
  {
    key: "adapt",
    title: "Adapt",
    items: ["Momentum", "Rebalance"],
  },
] as const;

const params = [
  { label: "Condition", value: "Fear & Greed < 20", emphasize: false },
  { label: "Action", value: "DCA Buy", emphasize: false },
  { label: "Allocation", value: "10%", emphasize: true },
  { label: "Frequency", value: "Weekly", emphasize: false },
] as const;

export function StrategyWorksSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        {/* 1 — Title + AI-Assisted Strategy Automation */}
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            See How Your{" "}
            <span className="gradient-text">Strategy Works</span>
          </h2>
          <p className={`mt-5 ${invH3} uppercase`}>
            AI-Assisted Strategy Automation
          </p>
          <p className={`mt-4 ${invBodyStrong}`}>
            AI monitors the market. You define the decision. INDEXLA executes
            your rules.
          </p>
          <p className={`mt-4 ${invBody}`}>
            INDEXLA&apos;s AI continuously monitors the market conditions you
            choose and checks them against your pre-approved strategy rules.
            When your conditions are met, it coordinates execution within the
            permissions and limits you defined.
          </p>
        </FadeIn>

        <FadeIn className="mt-6" delay={0.03}>
          <div className="grid gap-3 sm:grid-cols-3">
            {aiBoundaries.map((line) => (
              <div
                key={line}
                className="rounded-[1.1rem] border border-line bg-void/45 px-4 py-4 text-center sm:px-5"
              >
                <p className="text-[0.95rem] font-semibold leading-snug text-ink text-pretty">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-6" delay={0.05}>
          <div className="rounded-[1.2rem] border border-electric/30 bg-electric/[0.06] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
              {executionFlow.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-electric/35 bg-deep/50 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-electric sm:text-[0.78rem]">
                    {step}
                  </span>
                  {i < executionFlow.length - 1 ? (
                    <span className="text-electric/55" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <p className={`mt-4 text-center ${invBody}`}>
              If data is stale, conditions are invalid, limits are exceeded, or
              execution is unsafe, the strategy does not execute.
            </p>
          </div>
        </FadeIn>

        {/* 2 — Build → Define → Automate */}
        <FadeIn className="mt-12 max-w-3xl">
          <p className={`${invH3} uppercase`}>Build → Define → Automate</p>
        </FadeIn>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
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

        {/* 3 — Interactive example */}
        <FadeIn className="mt-12 max-w-3xl">
          <p className={`${invH3} uppercase`}>
            Your Decision → AI Monitors → Your Rule Executes
          </p>
        </FadeIn>

        <FadeIn className="mt-6" delay={0.04}>
          <div className="overflow-hidden rounded-[1.35rem] border border-line bg-void/50">
            <div className="grid lg:grid-cols-2 lg:items-stretch">
              <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                <p className={invEyebrow}>Interactive example</p>
                <ol className="mt-5 flex flex-col items-center gap-2">
                  {exampleFlow.map((step, i) => (
                    <li
                      key={step}
                      className="flex w-full max-w-md flex-col items-center"
                    >
                      <div
                        className={`w-full rounded-xl border px-4 py-3.5 text-center text-[0.95rem] font-semibold leading-snug text-pretty ${
                          i === 0 || i === exampleFlow.length - 1
                            ? "border-electric/40 bg-electric/10 text-ink"
                            : "border-line bg-deep/45 text-ink"
                        }`}
                      >
                        {step}
                      </div>
                      {i < exampleFlow.length - 1 ? (
                        <span
                          className="py-1 text-[1.1rem] text-electric/60"
                          aria-hidden
                        >
                          ↓
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col p-5 sm:p-6 lg:p-7">
                <p className={invEyebrow}>Strategy parameters</p>
                <div className="mt-5 flex flex-1 flex-col justify-center gap-2.5">
                  {params.map((row) =>
                    row.emphasize ? (
                      <div
                        key={row.label}
                        className="rounded-xl border border-electric/40 bg-electric/[0.1] px-4 py-5 text-center"
                      >
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-electric">
                          {row.label}
                        </p>
                        <p className="mt-2 display text-[clamp(2rem,5vw,2.75rem)] leading-none tracking-[-0.03em] text-ink">
                          {row.value}
                        </p>
                      </div>
                    ) : (
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
                    ),
                  )}
                </div>
                <p className={`mt-5 ${invBody}`}>
                  You decide the 20 threshold and 10% allocation. AI only
                  monitors for the condition and coordinates your approved rule.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 4 — Strategy Progression */}
        <FadeIn className="mt-12 max-w-3xl">
          <p className={`${invH3} uppercase`}>Strategy Progression</p>
        </FadeIn>
        <FadeIn className="mt-6" delay={0.03}>
          <div className="rounded-[1.25rem] border border-line bg-void/45 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:justify-between md:gap-2">
              {progression.map((phase, i) => (
                <div
                  key={phase.stage}
                  className="flex flex-col items-center gap-2 md:flex-1 md:flex-row"
                >
                  <article className="w-full rounded-xl border border-line bg-deep/50 px-3.5 py-4 text-center">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                      {phase.stage}
                    </p>
                    {phase.meta ? (
                      <p className="mt-2 text-[0.85rem] text-muted">{phase.meta}</p>
                    ) : null}
                    <p className="mt-2 display text-[1.05rem] tracking-[-0.02em] text-ink">
                      {phase.action}
                    </p>
                  </article>
                  {i < progression.length - 1 ? (
                    <span
                      className="shrink-0 text-electric/55 md:px-0.5"
                      aria-hidden
                    >
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <p className={`mt-5 text-center ${invBodyStrong}`}>
              Your rules define the response. AI monitors the cycle.
            </p>
          </div>
        </FadeIn>

        {/* 5 — Combine Strategies */}
        <FadeIn className="mt-12 max-w-3xl">
          <p className={`${invH3} uppercase`}>Combine Strategies</p>
        </FadeIn>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {strategyGroups.map((group, i) => (
            <FadeIn key={group.key} delay={i * 0.04}>
              <article className="h-full rounded-[1.2rem] border border-line bg-void/45 p-5 text-center">
                <h3 className="display text-[1.15rem] tracking-[-0.02em] text-electric uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.95rem] font-semibold leading-snug text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-5" delay={0.08}>
          <div className="rounded-[1.1rem] border border-line bg-void/40 px-5 py-4 text-center">
            <p className="text-[1rem] font-semibold text-ink">
              Buy on Fear → Hold → Sell on Greed
            </p>
            <p className={`mt-3 ${invBodyStrong}`}>
              Your investment thesis becomes a programmable strategy.
            </p>
          </div>
        </FadeIn>

        {/* 6 — Small CTA */}
        <FadeIn className="mt-10">
          <HomeReadMore
            href="/strategies"
            label="Explore Strategies →"
            external={false}
          />
        </FadeIn>
      </div>
    </section>
  );
}
