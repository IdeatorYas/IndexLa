"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";
import type { AssetKey } from "@/lib/site";

const STEP_MS = 7000;

const STEPS = [
  {
    id: "connect",
    n: "01",
    title: "Connect",
    summary: "Connect your wallet.",
    detail: "",
  },
  {
    id: "allocate",
    n: "02",
    title: "Allocate",
    summary: "Choose assets and target allocations.",
    detail: "BTC · ETH · Tokenized Stocks · Gold · RWAs · and more",
  },
  {
    id: "automate",
    n: "03",
    title: "Automate",
    summary: "Set your rules and approve permissions.",
    detail: "",
  },
  {
    id: "activate",
    n: "04",
    title: "Fund & Activate",
    summary: "Fund your portfolio and activate your strategy.",
    detail: "",
  },
] as const;

const STRATEGIES = [
  {
    name: "DCA",
    body: "Automatically invest according to a defined schedule.",
  },
  {
    name: "Rebalancing",
    body: "Restore target allocations when portfolio weights drift.",
  },
  {
    name: "Take Profit",
    body: "Automatically reduce a position when your predefined target is reached.",
  },
  {
    name: "Stop Loss",
    body: "Reduce exposure when a predefined downside condition is triggered.",
  },
  {
    name: "Fear & Greed",
    body: "Execute predefined actions based on market sentiment conditions.",
  },
  {
    name: "RSI",
    body: "Trigger portfolio actions when predefined RSI conditions are reached.",
  },
  {
    name: "Momentum",
    body: "Follow defined market trends by increasing exposure when momentum strengthens and reducing exposure when momentum weakens.",
  },
] as const;

const INVEST_CHIPS: { label: string; assets: AssetKey[] }[] = [
  { label: "BTC", assets: ["btc"] },
  { label: "ETH", assets: ["eth"] },
  { label: "Tokenized Stocks", assets: ["apple", "nvidia"] },
  { label: "Gold", assets: ["gold"] },
  { label: "RWAs", assets: ["ondo"] },
  { label: "and more", assets: [] },
];

const ALLOCATION_ASSETS: { label: string; pct: number; assets: AssetKey[] }[] =
  [
    { label: "BTC", pct: 30, assets: ["btc"] },
    { label: "ETH", pct: 20, assets: ["eth"] },
    { label: "Tokenized Stocks", pct: 25, assets: ["apple", "nvidia"] },
    { label: "Gold", pct: 15, assets: ["gold"] },
    { label: "RWAs", pct: 10, assets: ["ondo"] },
  ];

function DemoChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-line bg-void/90 shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <p className="ml-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            {title}
          </p>
        </div>
        <p className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric/80 sm:block">
          INDEXLA Demo
        </p>
      </div>
      <div className="p-4 sm:p-6 md:p-7">{children}</div>
    </div>
  );
}

function ConnectDemo() {
  return (
    <DemoChrome title="Connect">
      <div className="mx-auto grid max-w-xl gap-5">
        <div className="rounded-2xl border border-electric/30 bg-gradient-to-br from-electric/15 to-purple/10 px-5 py-6 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
            01 — Connect
          </p>
          <p className="display mt-3 text-[1.5rem] text-ink sm:text-[1.7rem]">
            Connect your wallet
          </p>
          <p className={`mt-2 ${homeBody}`}>Connect your wallet.</p>
        </div>
        <div className="space-y-2.5">
          {["Browser Wallet", "Hardware Wallet", "Smart Account"].map(
            (label, i) => (
              <div
                key={label}
                className={`flex items-center justify-between rounded-xl border px-4 py-3.5 ${
                  i === 0
                    ? "border-electric/35 bg-electric/10"
                    : "border-line bg-deep/70"
                }`}
              >
                <span className="text-sm font-semibold text-ink">{label}</span>
                <span
                  className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${
                    i === 0
                      ? "bg-electric/20 text-electric"
                      : "text-muted-dim"
                  }`}
                >
                  {i === 0 ? "Selected" : "Connect"}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </DemoChrome>
  );
}

function AllocateDemo() {
  return (
    <DemoChrome title="Allocate">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-line bg-deep/60 p-4 sm:p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
            02 — Allocate
          </p>
          <p className={`mt-2 ${homeBody}`}>
            Choose assets and target allocations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {INVEST_CHIPS.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-electric/25 bg-electric/10 px-2.5 py-1.5 text-xs font-semibold text-ink"
              >
                {item.assets.length > 0 ? (
                  <span className="inline-flex items-center gap-0.5">
                    {item.assets.map((key) => (
                      <AssetLogo key={key} asset={key} size={14} />
                    ))}
                  </span>
                ) : null}
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-deep/70 p-4 sm:p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Target allocation
          </p>
          <ul className="mt-4 space-y-3.5">
            {ALLOCATION_ASSETS.map((row) => (
              <li key={row.label}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 font-semibold text-ink">
                    <span className="inline-flex items-center gap-0.5">
                      {row.assets.map((key) => (
                        <AssetLogo key={key} asset={key} size={16} />
                      ))}
                    </span>
                    {row.label}
                  </span>
                  <span className="tabular-nums text-muted">{row.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-panel">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

function AutomateDemo({
  activeStrategy,
  setActiveStrategy,
}: {
  activeStrategy: number;
  setActiveStrategy: (index: number) => void;
}) {
  const strategy = STRATEGIES[activeStrategy];

  return (
    <DemoChrome title="Automate">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
            03 — Automate
          </p>
          <p className={`mt-2 ${homeBody}`}>
            Set your rules and approve permissions.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STRATEGIES.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveStrategy(i)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  i === activeStrategy
                    ? "border-electric/40 bg-electric/15 text-ink"
                    : "border-line bg-deep/60 text-muted hover:border-white/20 hover:text-ink"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-deep/70 p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
            {strategy.name}
          </p>
          <p className={`mt-3 ${homeBodyStrong}`}>{strategy.body}</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Condition", "Rule", "Action"].map((label, i) => (
              <div
                key={label}
                className="rounded-xl border border-line bg-void/50 px-3 py-3 text-center"
              >
                <div
                  className="mx-auto mb-2 h-1 w-10 rounded-full"
                  style={{
                    background:
                      i === 2
                        ? "linear-gradient(90deg,#7c3aed,#38bdf8)"
                        : "rgba(255,255,255,0.18)",
                  }}
                />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function ActivateDemo() {
  return (
    <DemoChrome title="Fund & Activate">
      <div className="mx-auto grid max-w-lg gap-4">
        <div className="rounded-2xl border border-line bg-deep/70 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                04 — Fund & Activate
              </p>
              <p className="mt-2 font-semibold text-ink">
                Fund your portfolio and activate your strategy.
              </p>
            </div>
            <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
              Ready
            </span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 text-sm">
            <div className="rounded-xl border border-line bg-void/40 px-3 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
                Custody
              </p>
              <p className="mt-1 font-semibold text-ink">Your wallet</p>
            </div>
            <div className="rounded-xl border border-line bg-void/40 px-3 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
                Permissions
              </p>
              <p className="mt-1 font-semibold text-ink">Authorize execution</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-electric/30 bg-electric/10 px-5 py-4">
          <p className={homeBodyStrong}>
            Your assets remain in your wallet. Execution follows only the
            permissions you approve.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-gradient-to-r from-purple/35 to-blue/30 px-5 py-5 text-center">
          <p className="display text-[1.35rem] text-ink">Fund & Activate</p>
        </div>
      </div>
    </DemoChrome>
  );
}

export function HowItWorksSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [activeStrategy, setActiveStrategy] = useState(5);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setPaused(true);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
      setProgressKey((k) => k + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const step = STEPS[active];

  return (
    <section id="how-it-works" className={`relative ${homeSection} bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.08),transparent_45%),radial-gradient(ellipse_at_20%_80%,rgba(124,58,237,0.08),transparent_40%)]"
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>How It Works</h2>
          <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Connect → Allocate → Automate → Fund &amp; Activate
          </p>
          <p
            className={`mt-6 font-semibold text-ink ${homeMeasure} ${homeBodyStrong}`}
          >
            Your assets never leave your wallet. INDEXLA only receives the
            limited permissions you approve.
          </p>
        </FadeIn>

        {/* Desktop flow rail */}
        <FadeIn className="mt-10 hidden lg:block">
          <ol className="grid grid-cols-4 gap-3 xl:gap-4">
            {STEPS.map((item, i) => {
              const selected = i === active;
              const done = i < active;
              return (
                <li key={item.id} className="min-h-full">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-pressed={selected}
                    className={`group relative flex h-full min-h-[8.75rem] w-full flex-col items-center justify-start rounded-2xl border px-4 pb-5 pt-4 text-center transition-all ${
                      selected
                        ? "border-electric/45 bg-white/[0.07] shadow-[0_0_36px_rgba(56,189,248,0.14)]"
                        : done
                          ? "border-electric/20 bg-electric/[0.04]"
                          : "border-line bg-void/30 hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                      {item.n}
                    </span>
                    <span className="mt-1.5 block display text-[1.15rem] leading-snug text-ink">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-[12rem] text-[0.88rem] leading-snug text-muted text-pretty text-balance">
                      {item.summary}
                    </span>
                    {selected && !reduce && !paused ? (
                      <span className="absolute inset-x-3 bottom-2 h-0.5 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          key={progressKey}
                          className="block h-full origin-left rounded-full bg-electric"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: STEP_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </FadeIn>

        <div className="mt-8 lg:mt-10">
          {/* Mobile step navigation — desktop uses the 01–04 flow rail above */}
          <FadeIn className="lg:hidden">
            <ol className="flex gap-2 overflow-x-auto pb-1">
              {STEPS.map((item, i) => {
                const selected = i === active;
                return (
                  <li key={item.id} className="min-w-[11.5rem] shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-pressed={selected}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-center transition-all ${
                        selected
                          ? "border-electric/40 bg-white/[0.06]"
                          : "border-line bg-transparent"
                      }`}
                    >
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
                        {item.n}
                      </span>
                      <span className="mt-1 block display text-[1.05rem]">
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-6 lg:mt-0">
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active === 0 ? <ConnectDemo /> : null}
                  {active === 1 ? <AllocateDemo /> : null}
                  {active === 2 ? (
                    <AutomateDemo
                      activeStrategy={activeStrategy}
                      setActiveStrategy={setActiveStrategy}
                    />
                  ) : null}
                  {active === 3 ? <ActivateDemo /> : null}
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className={`${homeBody} lg:hidden`}>
                  <span className="font-semibold text-ink">
                    {step.n} — {step.title}:
                  </span>{" "}
                  {step.summary}
                </p>
                <div className="ml-auto flex gap-1.5">
                  {STEPS.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show step ${item.n}`}
                      onClick={() => goTo(i)}
                      className={`h-1.5 w-7 rounded-full transition-colors ${
                        i === active ? "bg-electric" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10 text-center">
          <p className={`${homeMeasure} ${homeBodyStrong}`}>
            Your assets remain in your wallet. Execution follows only the
            permissions you approve.
          </p>
          <HomeReadMore
            href="/whitepaper/technical"
            label="Read the Technical Architecture →"
            className="mt-5"
          />
        </FadeIn>
      </div>
    </section>
  );
}
