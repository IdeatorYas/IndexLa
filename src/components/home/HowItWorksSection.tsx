"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const STEPS = [
  {
    id: "connect",
    n: "01",
    title: "Connect Wallet",
    summary: "Connect your wallet. Your assets remain under your control.",
  },
  {
    id: "build",
    n: "02",
    title: "Build Portfolio",
    summary: "Select assets and set allocations across supported markets.",
  },
  {
    id: "strategy",
    n: "03",
    title: "Choose Strategy",
    summary: "Configure programmable rules against your portfolio.",
  },
  {
    id: "activate",
    n: "04",
    title: "Fund & Activate",
    summary: "Confirm the portfolio and authorize execution permissions.",
  },
  {
    id: "execute",
    n: "05",
    title: "Automated Execution",
    summary: "When conditions are met, INDEXLA coordinates execution.",
  },
] as const;

const ASSET_CATEGORIES = [
  { label: "Crypto", items: ["BTC", "ETH", "SOL"] },
  { label: "Tokenized Stocks", items: ["NVDA", "GOOGL"] },
  { label: "Commodities", items: ["Gold"] },
  { label: "RWAs", items: ["T-Bill"] },
] as const;

const STRATEGIES = [
  "DCA",
  "Rebalancing",
  "Take Profit",
  "Stop Loss",
  "Fear & Greed",
  "RSI",
  "Momentum",
] as const;

const EXECUTION_FLOW = [
  "Condition detected",
  "Permission verified",
  "Route selected",
  "Transaction executed",
  "Portfolio reconciled",
] as const;

function DemoChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-void/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-panel/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <p className="ml-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          {title}
        </p>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function ConnectDemo() {
  return (
    <DemoChrome title="Wallet connection">
      <div className="mx-auto max-w-sm space-y-4">
        <div className="rounded-xl border border-electric/30 bg-electric/10 px-4 py-5 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Non-custodial
          </p>
          <p className="display mt-2 text-[1.35rem] text-ink">Connect Wallet</p>
          <p className="mt-2 text-sm text-muted">
            Assets remain in your wallet. INDEXLA never takes custody.
          </p>
        </div>
        <div className="space-y-2">
          {["Browser Wallet", "Hardware Wallet", "Smart Account"].map(
            (label) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-line bg-deep/70 px-4 py-3"
              >
                <span className="text-sm font-semibold text-ink">{label}</span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                  Connect
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </DemoChrome>
  );
}

function BuildDemo() {
  return (
    <DemoChrome title="Portfolio builder">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {ASSET_CATEGORIES.map((category) => (
            <div
              key={category.label}
              className="rounded-xl border border-line bg-deep/60 px-3.5 py-3"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
                {category.label}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {category.items.map((asset) => (
                  <span
                    key={asset}
                    className="rounded-lg border border-electric/25 bg-electric/10 px-2.5 py-1 text-xs font-semibold text-ink"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-deep/70 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Target allocation
          </p>
          <ul className="mt-4 space-y-3">
            {[
              { name: "BTC", pct: 30 },
              { name: "ETH", pct: 20 },
              { name: "NVDA", pct: 20 },
              { name: "Gold", pct: 15 },
              { name: "SOL", pct: 15 },
            ].map((row) => (
              <li key={row.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-ink">{row.name}</span>
                  <span className="tabular-nums text-muted">{row.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-panel">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoChrome>
  );
}

function StrategyDemo() {
  return (
    <DemoChrome title="Strategy configuration">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Select strategy
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {STRATEGIES.map((strategy, i) => (
              <span
                key={strategy}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                  i === 0 || i === 4
                    ? "border-electric/40 bg-electric/15 text-ink"
                    : "border-line bg-deep/60 text-muted"
                }`}
              >
                {strategy}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-deep/70 p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Active rules
          </p>
          <ul className="mt-3 space-y-2.5 text-sm text-muted">
            <li className="rounded-lg border border-line bg-void/50 px-3 py-2.5">
              <span className="font-semibold text-ink">Fear & Greed</span>
              <span className="mt-1 block">Extreme Fear → DCA In</span>
            </li>
            <li className="rounded-lg border border-line bg-void/50 px-3 py-2.5">
              <span className="font-semibold text-ink">DCA</span>
              <span className="mt-1 block">Weekly accumulation · 5% size</span>
            </li>
            <li className="rounded-lg border border-line bg-void/50 px-3 py-2.5">
              <span className="font-semibold text-ink">Take Profit</span>
              <span className="mt-1 block">Target +25% → Reduce 30%</span>
            </li>
          </ul>
        </div>
      </div>
    </DemoChrome>
  );
}

function ActivateDemo() {
  return (
    <DemoChrome title="Fund & Activate">
      <div className="mx-auto max-w-md space-y-4">
        <div className="rounded-xl border border-line bg-deep/70 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                Portfolio
              </p>
              <p className="mt-1 font-semibold text-ink">Hybrid Multi-Asset</p>
            </div>
            <p className="text-sm tabular-nums text-muted">Ready</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-line bg-void/40 px-3 py-2.5">
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
                Strategies
              </p>
              <p className="mt-1 font-semibold text-ink">3 configured</p>
            </div>
            <div className="rounded-lg border border-line bg-void/40 px-3 py-2.5">
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
                Custody
              </p>
              <p className="mt-1 font-semibold text-ink">Your wallet</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-electric/30 bg-electric/10 px-4 py-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Permission scope
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Authorize portfolio-specific execution. Assets stay in your wallet —
            permissions define what can run.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-gradient-to-r from-purple/30 to-blue/30 px-4 py-4 text-center">
          <p className="display text-[1.2rem] text-ink">Fund & Activate</p>
          <p className="mt-1 text-xs text-muted">
            Not a deposit into INDEXLA custody
          </p>
        </div>
      </div>
    </DemoChrome>
  );
}

function ExecuteDemo() {
  return (
    <DemoChrome title="Automated execution">
      <ol className="space-y-0">
        {EXECUTION_FLOW.map((step, i) => (
          <li key={step}>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-deep/70 px-3.5 py-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  i < 4
                    ? "bg-electric/20 text-electric"
                    : "bg-gradient-to-r from-purple to-blue text-white"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 flex-1 text-sm font-semibold text-ink">
                {step}
              </p>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                {i < 4 ? "Done" : "Live"}
              </span>
            </div>
            {i < EXECUTION_FLOW.length - 1 ? (
              <div className="flex justify-center py-1.5 text-electric/70" aria-hidden>
                ↓
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </DemoChrome>
  );
}

function StepDemo({ stepIndex }: { stepIndex: number }) {
  switch (stepIndex) {
    case 0:
      return <ConnectDemo />;
    case 1:
      return <BuildDemo />;
    case 2:
      return <StrategyDemo />;
    case 3:
      return <ActivateDemo />;
    default:
      return <ExecuteDemo />;
  }
}

export function HowItWorksSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative border-t border-line bg-deep py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.08),transparent_45%),radial-gradient(ellipse_at_20%_80%,rgba(124,58,237,0.08),transparent_40%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
            How it works
          </p>
          <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            Investing In Three Steps.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[17.5rem_minmax(0,1fr)]">
          <FadeIn>
            <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
              {STEPS.map((step, i) => {
                const selected = i === active;
                return (
                  <li key={step.id} className="min-w-[11.5rem] shrink-0 lg:min-w-0">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-all ${
                        selected
                          ? "border-electric/40 bg-white/[0.06] shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                          : "border-line bg-transparent hover:border-white/20 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                        {step.n}
                      </span>
                      <span className="mt-1 block display text-[1.05rem] leading-snug">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block text-[0.82rem] leading-snug text-muted">
                        {step.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[active].id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepDemo stepIndex={active} />
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-sm text-muted">
                  <span className="font-semibold text-ink">
                    {STEPS[active].n}
                  </span>{" "}
                  {STEPS[active].title}
                </p>
                <div className="flex gap-1.5">
                  {STEPS.map((step, i) => (
                    <button
                      key={step.id}
                      type="button"
                      aria-label={`Show step ${step.n}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 w-6 rounded-full transition-colors ${
                        i === active ? "bg-electric" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "DISCOVER",
                body: "Find a portfolio that matches your thesis. See its assets, allocations, strategy, performance, and activity.",
              },
              {
                n: "02",
                title: "ALLOCATE",
                body: "Choose how much capital to deploy. Your assets remain under your control.",
              },
              {
                n: "03",
                title: "AUTOMATE",
                body: "Approve your strategy and let INDEXLA execute when your defined conditions are met.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-line bg-void/40 px-5 py-5"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  {item.n}
                </p>
                <h3 className="display mt-2 text-[1.25rem]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <p className="display mt-8 text-[clamp(1.25rem,2.5vw,1.75rem)]">
            Discover. Allocate. Automate.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
