"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeBodyStrong,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";
import {
  AUTOMATE_STRATEGIES,
  DEMO_COMMODITIES,
  DEMO_CRYPTO,
  DEMO_STOCKS,
  DEMO_TARGET_ALLOCATION,
  type DemoAsset,
} from "@/lib/howItWorksDemoAssets";

const STEP_MS = 9000;

const STEPS = [
  {
    id: "connect",
    n: "01",
    title: "Connect",
    summary: "Connect your wallet.",
  },
  {
    id: "allocate",
    n: "02",
    title: "Allocate",
    summary: "Choose assets and target allocations.",
  },
  {
    id: "automate",
    n: "03",
    title: "Automate",
    summary: "Set your rules and approve permissions.",
  },
  {
    id: "activate",
    n: "04",
    title: "Fund & Activate",
    summary: "Fund your portfolio and activate your strategy.",
  },
] as const;

type BasketId = "crypto" | "stocks" | "commodities" | "realestate";

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
          Product Preview
        </p>
      </div>
      <div className="p-4 sm:p-5 md:p-6">{children}</div>
    </div>
  );
}

function DemoLogo({
  asset,
  size = 22,
}: {
  asset: Pick<DemoAsset, "ticker" | "name" | "src">;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-panel text-[0.55rem] font-bold tracking-tight text-ink"
        style={{ width: size, height: size }}
        title={asset.name}
      >
        {asset.ticker.slice(0, 2)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={asset.name}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-contain bg-white/5"
      draggable={false}
      title={asset.name}
      onError={() => setFailed(true)}
    />
  );
}

function AssetChip({ asset, selected }: { asset: DemoAsset; selected?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[0.72rem] font-semibold tracking-[-0.01em] ${
        selected
          ? "border-electric/40 bg-electric/15 text-ink"
          : "border-line bg-void/50 text-ink/90"
      }`}
    >
      <DemoLogo asset={asset} size={16} />
      {asset.ticker}
    </span>
  );
}

function ConnectDemo() {
  return (
    <DemoChrome title="01 — Connect">
      <div className="mx-auto grid max-w-lg gap-4">
        <p className="text-center text-[0.95rem] leading-relaxed text-muted text-balance">
          Connect your wallet.
        </p>
        <div className="space-y-2.5">
          {["Browser Wallet", "Hardware Wallet", "Smart Account"].map(
            (label, i) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  i === 0
                    ? "border-electric/40 bg-electric/10"
                    : "border-line bg-deep/70 hover:border-white/20"
                }`}
              >
                <span className="text-sm font-semibold text-ink">{label}</span>
                <span
                  className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${
                    i === 0 ? "bg-electric/20 text-electric" : "text-muted-dim"
                  }`}
                >
                  {i === 0 ? "Connected" : "Connect"}
                </span>
              </button>
            ),
          )}
        </div>
      </div>
    </DemoChrome>
  );
}

function AllocateDemo() {
  const [basket, setBasket] = useState<BasketId>("crypto");
  const selectedTickers = new Set(
    DEMO_TARGET_ALLOCATION.map((row) => row.ticker),
  );

  const baskets: { id: BasketId; label: string }[] = [
    { id: "crypto", label: "Crypto" },
    { id: "stocks", label: "Tokenized Stocks" },
    { id: "commodities", label: "Tokenized Commodities" },
    { id: "realestate", label: "Tokenized Real Estate" },
  ];

  return (
    <DemoChrome title="02 — Allocate">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {baskets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setBasket(item.id)}
              className={`rounded-full border px-3.5 py-2 text-[0.8rem] font-semibold transition-colors ${
                basket === item.id
                  ? "border-electric/45 bg-electric/15 text-ink"
                  : "border-line bg-deep/60 text-muted hover:border-white/20 hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="min-h-[9.5rem] rounded-2xl border border-line bg-deep/55 p-3.5 sm:p-4">
          {basket === "crypto" ? (
            <div className="flex flex-wrap gap-1.5">
              {DEMO_CRYPTO.map((asset) => (
                <AssetChip
                  key={asset.ticker}
                  asset={asset}
                  selected={selectedTickers.has(asset.ticker)}
                />
              ))}
            </div>
          ) : null}

          {basket === "stocks" ? (
            <div className="flex flex-wrap gap-1.5">
              {DEMO_STOCKS.map((asset) => (
                <AssetChip
                  key={asset.ticker}
                  asset={asset}
                  selected={selectedTickers.has(asset.ticker)}
                />
              ))}
            </div>
          ) : null}

          {basket === "commodities" ? (
            <div className="flex flex-wrap items-center gap-2">
              {DEMO_COMMODITIES.map((asset, i) => (
                <div key={asset.ticker} className="flex items-center gap-2">
                  <AssetChip
                    asset={asset}
                    selected={selectedTickers.has(asset.ticker)}
                  />
                  {i < DEMO_COMMODITIES.length - 1 ? (
                    <span className="text-muted-dim" aria-hidden>
                      ·
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {basket === "realestate" ? (
            <div className="flex min-h-[7rem] items-center justify-center">
              <p className="rounded-full border border-line bg-void/50 px-5 py-2.5 text-[0.95rem] font-semibold text-muted">
                Coming Soon
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-electric/25 bg-electric/[0.05] p-4 sm:p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Example target allocation
          </p>
          <p className="mt-2 text-[0.85rem] text-muted text-balance">
            BTC · ETH · SOL · NVDA · AMZN · MSFT · GOLD · SILVER
          </p>
          <ul className="mt-4 space-y-3">
            {DEMO_TARGET_ALLOCATION.map((row) => (
              <li key={row.ticker}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 font-semibold text-ink">
                    <DemoLogo asset={row} size={18} />
                    {row.ticker}
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

        <p className="text-center text-[0.78rem] leading-snug text-muted-dim text-balance">
          Product visualization — example assets shown for demonstration.
        </p>
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
  return (
    <DemoChrome title="03 — Automate">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AUTOMATE_STRATEGIES.map((item, i) => {
          const selected = i === activeStrategy;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveStrategy(i)}
              className={`flex h-full flex-col rounded-2xl border px-4 py-4 text-left transition-colors ${
                selected
                  ? "border-electric/45 bg-electric/[0.12] shadow-[inset_0_1px_0_rgba(56,189,248,0.16)]"
                  : "border-line bg-deep/55 hover:border-white/20"
              } ${item.id === "rebalance" ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <p className="text-[0.98rem] font-semibold tracking-[-0.015em] text-ink">
                {item.title}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {item.lines.map((line) => (
                  <li
                    key={line}
                    className="text-[0.88rem] leading-snug text-muted text-pretty"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </DemoChrome>
  );
}

function ActivateDemo() {
  return (
    <DemoChrome title="04 — Fund & Activate">
      <div className="mx-auto grid max-w-xl gap-4">
        <p className="text-center text-[1.05rem] font-semibold tracking-[-0.015em] text-ink text-balance">
          Fund your portfolio and activate your strategy.
        </p>

        <div className="grid grid-cols-2 gap-2.5 text-sm">
          <div className="rounded-xl border border-line bg-deep/70 px-3 py-3.5 text-center sm:px-4">
            <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
              Custody
            </p>
            <p className="mt-1.5 font-semibold text-ink">Your wallet</p>
          </div>
          <div className="rounded-xl border border-line bg-deep/70 px-3 py-3.5 text-center sm:px-4">
            <p className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-dim">
              Permissions
            </p>
            <p className="mt-1.5 font-semibold text-ink">Authorize execution</p>
          </div>
        </div>

        <div className="rounded-2xl border border-electric/35 bg-electric/[0.08] px-5 py-4 text-center">
          <p className={`${homeBodyStrong} text-[1rem] sm:text-[1.05rem]`}>
            Your assets remain in your wallet. Execution follows only the
            permissions you approve.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-gradient-to-r from-purple/30 to-blue/25 px-5 py-4 text-center">
          <p className="display text-[1.25rem] text-ink">Fund &amp; Activate</p>
        </div>
      </div>
    </DemoChrome>
  );
}

export function HowItWorksSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [activeStrategy, setActiveStrategy] = useState(0);
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
          <div className="indexla-orbit mx-auto mb-8 inline-block">
            <h2 className={homeH2}>How It Works</h2>
          </div>
          <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[0.82rem]">
            Connect → Allocate → Automate → Fund &amp; Activate
          </p>
          <p
            className={`mt-6 font-semibold text-ink ${homeMeasure} ${homeBodyStrong}`}
          >
            Your assets never leave your wallet. INDEXLA only receives the
            limited permissions you approve.
          </p>
        </FadeIn>

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
                    className={`group relative flex h-full min-h-[7.75rem] w-full flex-col items-center justify-start rounded-2xl border px-3.5 pb-4 pt-3.5 text-center transition-all xl:px-4 ${
                      selected
                        ? "border-electric/45 bg-white/[0.07] shadow-[0_0_28px_rgba(56,189,248,0.12)]"
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
