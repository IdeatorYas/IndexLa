import Image from "next/image";
import { ASSETS, LOGO_DECK, type AssetKey } from "@/lib/site";

/** Real memecoin logos (CoinGecko mirrors + project assets). */
export const DECK_MEME_LOGOS = {
  PEPE: "/images/assets/demo/crypto/coingecko/pepe.jpg",
  DOGE: "/images/assets/demo/crypto/coingecko/doge.png",
  SHIB: "/images/assets/demo/crypto/coingecko/shib.png",
  BONK: "/images/assets/demo/crypto/coingecko/bonk.jpg",
  FLOKI: "/images/assets/demo/crypto/coingecko/floki.png",
  WIF: "/images/assets/demo/crypto/coingecko/wif.jpg",
  PENGU: "/images/assets/demo/crypto/coingecko/pengu.png",
  FARTCOIN: "/images/assets/demo/crypto/coingecko/fartcoin.jpg",
  SPX6900: "/images/assets/demo/crypto/spx6900.png",
  CASHCAT: "/images/assets/demo/crypto/cashcat.png",
} as const;

export type DeckMemeTicker = keyof typeof DECK_MEME_LOGOS;

export const DECK_TEN_SHOTS: DeckMemeTicker[] = [
  "PEPE",
  "DOGE",
  "SHIB",
  "WIF",
  "BONK",
  "FLOKI",
  "FARTCOIN",
  "PENGU",
  "SPX6900",
  "CASHCAT",
];

export const DECK_NETWORKS = [
  { name: "Ethereum", src: "/images/networks/ethereum.svg" },
  { name: "Solana", src: "/images/networks/solana.svg" },
  { name: "BNB Chain", src: "/images/networks/bnb.svg" },
  { name: "Arbitrum", src: "/images/networks/arbitrum.svg" },
  { name: "Base", src: "/images/networks/base.svg" },
  { name: "Sui", src: "/images/networks/sui.svg" },
  { name: "Robinhood", src: "/images/networks/robinhood.svg" },
] as const;

type FlowProps = {
  steps: readonly string[];
  vertical?: boolean;
  accent?: boolean;
  large?: boolean;
};

export function MegaFlow({
  steps,
  vertical = false,
  accent = false,
  large = false,
}: FlowProps) {
  const pad = large ? "px-6 py-5" : "px-5 py-3.5";
  const type = large
    ? "text-[1.55rem] font-bold uppercase tracking-[0.03em] text-ink"
    : "text-[1.4rem] font-bold uppercase tracking-[0.03em] text-ink";

  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex w-full flex-col items-center gap-2">
            <span
              className={`w-full max-w-[380px] text-center ${pad} ${accent ? "deck-flow-accent" : "deck-flow-node"}`}
            >
              <span className={type}>{step}</span>
            </span>
            {i < steps.length - 1 ? (
              <span className="text-[2.25rem] text-electric/70" aria-hidden>
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-3">
          <span className={`${pad} ${accent ? "deck-flow-accent" : "deck-flow-node"}`}>
            <span className={type}>{step}</span>
          </span>
          {i < steps.length - 1 ? (
            <span className="text-[2.25rem] text-electric/75" aria-hidden>
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function AssetLogo({
  src,
  alt,
  size = 56,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border border-white/20 bg-void/90 shadow-[0_0_24px_rgba(56,189,248,0.12)]"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}

/** Slide 02 — assets cascading into on-chain */
export function TokenizationCascade() {
  const assets = [
    "Stocks",
    "Treasuries",
    "Commodities",
    "Real Estate",
    "Private Credit",
    "Crypto",
  ] as const;

  return (
    <div className="relative flex h-full flex-col justify-center">
      <div className="space-y-3">
        {assets.map((asset, i) => (
          <div
            key={asset}
            className="deck-surface-accent flex items-center gap-5 rounded-2xl px-7 py-4"
            style={{
              marginLeft: `${i * 28}px`,
              marginRight: `${(assets.length - 1 - i) * 12}px`,
            }}
          >
            <span className="display text-[1.75rem] font-bold tabular-nums text-electric">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="display text-[2.35rem] font-semibold tracking-[-0.03em] text-ink">
              {asset}
            </span>
            <span className="ml-auto text-[2.5rem] text-electric" aria-hidden>
              →
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <div className="deck-flow-accent rounded-2xl px-14 py-7 text-center shadow-[0_0_60px_rgba(56,189,248,0.25)]">
          <p className="display text-[3.5rem] font-bold uppercase tracking-[0.1em] text-electric">
            ON-CHAIN
          </p>
        </div>
      </div>
    </div>
  );
}

/** Slide 03 — networks connect into INDEXLA */
export function ChainNetworkHub() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="grid w-full grid-cols-4 gap-4">
        {DECK_NETWORKS.slice(0, 4).map((c) => (
          <div
            key={c.name}
            className="deck-surface flex flex-col items-center gap-3 rounded-2xl px-4 py-5"
          >
            <AssetLogo src={c.src} alt={c.name} size={72} />
            <span className="text-center text-[1.25rem] font-bold text-ink">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="my-4 flex w-full items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electric/50 to-electric/80" />
        <span className="text-[2rem] text-electric" aria-hidden>
          ↓
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-electric/50 to-electric/80" />
      </div>

      <div className="deck-flow-accent relative z-10 flex items-center gap-5 rounded-2xl px-10 py-6 shadow-[0_0_80px_rgba(56,189,248,0.3)]">
        <Image
          src={LOGO_DECK}
          alt="INDEXLA"
          width={280}
          height={80}
          className="h-16 w-auto object-contain"
          priority
        />
        <div>
          <p className="display text-[2rem] font-semibold text-ink">One Portfolio Layer</p>
        </div>
      </div>

      <div className="my-4 flex w-full items-center gap-3 px-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electric/50 to-electric/80" />
        <span className="text-[2rem] text-electric" aria-hidden>
          ↑
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-electric/50 to-electric/80" />
      </div>

      <div className="grid w-full grid-cols-3 gap-4">
        {DECK_NETWORKS.slice(4).map((c) => (
          <div
            key={c.name}
            className="deck-surface flex flex-col items-center gap-3 rounded-2xl px-4 py-5"
          >
            <AssetLogo src={c.src} alt={c.name} size={72} />
            <span className="text-center text-[1.25rem] font-bold text-ink">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Slide 04 — connected Discover/Build/Automate/Own */
export function ProductPillarFlow({
  pillars,
}: {
  pillars: readonly { title: string; body: string }[];
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {pillars.map((p, i) => (
        <div key={p.title} className="flex items-stretch gap-4">
          <div className="deck-surface-accent flex min-h-[140px] flex-1 items-start gap-6 rounded-2xl px-7 py-5">
            <span className="display text-[2.5rem] font-bold tabular-nums text-electric">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="display text-[2.35rem] font-semibold tracking-[-0.03em] text-electric">
                {p.title}
              </p>
              <p className="mt-2 text-[1.65rem] leading-snug text-ink">{p.body}</p>
            </div>
          </div>
          {i < pillars.length - 1 ? null : null}
        </div>
      ))}
    </div>
  );
}

export function ProductPortfolioShell() {
  const keys: AssetKey[] = ["btc", "eth", "sol", "nvidia", "apple", "gold", "ondo", "sp500"];

  return (
    <div className="deck-surface flex h-full flex-col rounded-2xl p-7">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Portfolio Layer
          </p>
          <p className="mt-1 display text-[2.1rem] font-semibold text-ink">Cross-Asset Basket</p>
        </div>
        <p className="text-[1.3rem] font-semibold text-electric">Non-Custodial</p>
      </div>
      <div className="mt-6 grid flex-1 grid-cols-4 content-center gap-4">
        {keys.map((key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-void/50 px-3 py-5"
          >
            <AssetLogo src={ASSETS[key].src} alt={ASSETS[key].ticker} size={56} />
            <span className="text-[1.2rem] font-semibold text-ink">{ASSETS[key].ticker}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {["Discover", "Build", "Automate", "Own"].map((step) => (
          <div key={step} className="deck-flow-node px-3 py-3.5 text-center">
            <span className="text-[1.25rem] font-bold uppercase text-ink">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Slide 07 — dominant 1 Shot vs 10 Shots */
export function OneShotVsTenShots() {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] gap-6">
      <div className="deck-surface relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,0.18),transparent_55%)]"
          aria-hidden
        />
        <p className="text-[1.35rem] font-bold uppercase tracking-[0.18em] text-muted-dim">
          1 Shot
        </p>
        <p className="mt-3 display text-[2.6rem] font-semibold text-ink">One Coin. One Shot.</p>
        <div className="relative mt-10 flex h-56 w-56 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-danger/45" />
          <div className="absolute inset-8 rounded-full border border-danger/30" />
          <div className="absolute inset-16 rounded-full border border-danger/18" />
          <AssetLogo src={DECK_MEME_LOGOS.PEPE} alt="PEPE" size={112} />
        </div>
        <p className="mt-6 text-[1.75rem] font-semibold text-ink">PEPE</p>
        <p className="mt-2 text-center text-[1.45rem] text-muted">Single-asset speculation</p>
      </div>

      <div className="deck-surface-accent relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-8 shadow-[0_0_80px_rgba(56,189,248,0.2)]">
        <p className="text-[1.35rem] font-bold uppercase tracking-[0.18em] text-electric">
          10 Shots
        </p>
        <p className="mt-3 display text-[2.6rem] font-semibold text-ink">
          Portfolio. Multiple Shots.
        </p>
        <div className="mt-8 grid w-full max-w-[720px] grid-cols-5 gap-4">
          {DECK_TEN_SHOTS.map((ticker) => (
            <div
              key={ticker}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-void/40 px-2 py-4"
            >
              <AssetLogo src={DECK_MEME_LOGOS[ticker]} alt={ticker} size={72} />
              <span className="text-[1.05rem] font-bold text-ink">{ticker}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-[1.55rem] font-semibold text-electric">
          Rules-based automated basket
        </p>
      </div>
    </div>
  );
}

export function FeeEquation() {
  return (
    <div className="deck-surface-accent flex items-center justify-center gap-5 rounded-2xl px-8 py-7">
      <span className="display text-[3.1rem] font-semibold tracking-[-0.04em] text-ink">
        Execution Volume
      </span>
      <span className="display text-[3.1rem] font-semibold text-electric">×</span>
      <span className="display text-[3.1rem] font-semibold tracking-[-0.04em] text-electric">
        1%
      </span>
      <span className="display text-[3.1rem] font-semibold text-electric">=</span>
      <span className="display text-[3.1rem] font-semibold tracking-[-0.04em] text-ink">
        Gross Fees
      </span>
    </div>
  );
}

const INDEXLA_SPLIT = [
  { label: "Platform", pct: 50 },
  { label: "Treasury", pct: 20 },
  { label: "Rewards", pct: 20 },
  { label: "Buyback & Burn", pct: 10 },
] as const;

const CREATOR_SPLIT = [
  { label: "Creator", pct: 50 },
  { label: "Platform", pct: 20 },
  { label: "Treasury", pct: 10 },
  { label: "Rewards", pct: 10 },
  { label: "Buyback & Burn", pct: 10 },
] as const;

const SPLIT_COLORS = ["#38bdf8", "#7c3aed", "#a78bfa", "#22d3ee", "#fbbf24"];

function SplitBar({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; pct: number }[];
}) {
  return (
    <div className="deck-surface rounded-xl p-5">
      <p className="text-[1.2rem] font-bold uppercase tracking-[0.1em] text-electric">{title}</p>
      <div className="mt-4 flex h-6 overflow-hidden rounded-full border border-white/10">
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{ width: `${item.pct}%`, background: SPLIT_COLORS[i % SPLIT_COLORS.length] }}
            title={`${item.label} ${item.pct}%`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-[1.25rem] text-muted">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: SPLIT_COLORS[i % SPLIT_COLORS.length] }}
              />
              {item.label}
            </span>
            <span className="text-[1.25rem] font-semibold tabular-nums text-ink">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeeSplitBars() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <SplitBar title="INDEXLA Portfolios" items={INDEXLA_SPLIT} />
      <SplitBar title="Creator Portfolios" items={CREATOR_SPLIT} />
    </div>
  );
}

export function PathToScaleTable() {
  const rows = [
    { stage: "Seed", aum: "$5–7M", volume: "$25–35M", fees: "$250–350K" },
    { stage: "Private", aum: "$20–30M", volume: "$100–150M", fees: "$1–1.5M" },
    { stage: "Public / TGE", aum: "$40–50M", volume: "$200–250M", fees: "$2–2.5M" },
  ] as const;

  return (
    <div className="deck-surface overflow-hidden rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-void/60">
            {["Stage", "Target AUM", "Execution Volume", "Gross Fees"].map((h) => (
              <th
                key={h}
                className="px-5 py-3.5 text-left text-[1.15rem] font-semibold uppercase tracking-[0.1em] text-muted-dim"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.stage} className="border-b border-white/8 last:border-0">
              <td className="px-5 py-4 text-[1.65rem] font-bold text-electric">{row.stage}</td>
              <td className="px-5 py-4 text-[1.65rem] font-semibold tabular-nums text-ink">
                {row.aum}
              </td>
              <td className="px-5 py-4 text-[1.65rem] font-semibold tabular-nums text-ink">
                {row.volume}
              </td>
              <td className="px-5 py-4 text-[1.65rem] font-semibold tabular-nums text-ink">
                {row.fees}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DexlaFlywheel() {
  const nodes = [
    "Platform Activity",
    "Burns & Buybacks",
    "Reduced Supply",
    "Value Accrual",
  ] as const;

  return (
    <div className="deck-surface-accent flex h-full flex-col items-center justify-center rounded-2xl p-8">
      <p className="text-[1.25rem] font-bold uppercase tracking-[0.14em] text-electric">
        The Flywheel
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, i) => (
          <span key={node} className="flex items-center gap-3">
            <span className="deck-flow-accent px-5 py-4">
              <span className="text-[1.4rem] font-bold uppercase tracking-[0.03em] text-ink">
                {node}
              </span>
            </span>
            {i < nodes.length - 1 ? (
              <span className="text-[2rem] text-electric/80" aria-hidden>
                →
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <div className="mt-10 grid w-full grid-cols-2 gap-3">
        {[
          ["Portfolio Publishing", "100% Burn"],
          ["Featured Placement", "100% Burn"],
          ["Strategy Listing", "100% Burn"],
          ["Strategy Access", "50% Burn"],
          ["Platform Fees", "10% Buyback & Burn"],
          ["Treasury Profits", "25% Buyback & Burn"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-void/40 px-4 py-3.5"
          >
            <span className="text-[1.25rem] text-muted">{label}</span>
            <span className="text-[1.3rem] font-bold text-electric">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GtmSystem() {
  const channels = [
    { n: "01", title: "TOP CREATORS", body: "Crypto KOLs + finance influencers → Quality AUM" },
    {
      n: "02",
      title: "DEGEN CHANNELS",
      body: "Meme communities + high-velocity groups → Degen Club volume",
    },
    {
      n: "03",
      title: "DISTRIBUTION PARTNERSHIPS",
      body: "Wallets + DAOs + RWA protocols → Organic distribution",
    },
    { n: "04", title: "OWN ACQUISITION", body: "Brand + SEO + PPC → Scalable acquisition" },
    {
      n: "05",
      title: "INCENTIVES",
      body: "AUM / Volume-based rewards for early-user onboarding → Retention",
    },
  ] as const;

  const outcomes = [
    ["Creators", "Quality AUM"],
    ["Degen", "High Volume"],
    ["Partnerships", "Distribution"],
    ["Own Acquisition", "Scalable Growth"],
  ] as const;

  return (
    <div className="grid h-full grid-cols-[1.25fr_0.75fr] gap-5">
      <div className="grid grid-cols-1 gap-2.5">
        {channels.map((ch) => (
          <div
            key={ch.n}
            className="deck-surface flex min-h-[108px] items-center gap-5 rounded-xl px-6 py-4"
          >
            <span className="display text-[2.1rem] font-bold text-electric">{ch.n}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[1.55rem] font-bold uppercase tracking-[0.08em] text-electric">
                {ch.title}
              </p>
              <p className="mt-1.5 text-[1.55rem] leading-snug text-ink">{ch.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="deck-surface-accent flex flex-col justify-center gap-3.5 rounded-2xl p-6">
        <p className="text-[1.2rem] font-bold uppercase tracking-[0.14em] text-muted-dim">
          Funnels
        </p>
        {outcomes.map(([from, to]) => (
          <div key={from} className="flex items-center gap-3">
            <span className="deck-flow-node flex-1 px-4 py-4 text-center text-[1.4rem] font-bold text-ink">
              {from}
            </span>
            <span className="text-[1.75rem] text-electric" aria-hidden>
              →
            </span>
            <span className="deck-flow-accent flex-1 px-4 py-4 text-center text-[1.4rem] font-bold text-ink">
              {to}
            </span>
          </div>
        ))}
        <p className="mt-1 text-center text-[1.55rem] font-semibold text-electric">
          → AUM + Volume + Retention
        </p>
      </div>
    </div>
  );
}

export function FundraisingStages() {
  const stages = [
    {
      phase: "SHIP",
      title: "PRE-SEED",
      meta: "2.5% · $5M FDV · $125K",
      body: "Working multi-chain non-custodial portfolio engine + founding creators on testnet.",
    },
    {
      phase: "PROVE",
      title: "SEED",
      meta: "6% · $9M FDV · $540K",
      body: "Full product + AI automation + early creators & users.",
    },
    {
      phase: "RAISE",
      title: "PRIVATE",
      meta: "14% · $14M FDV · $1.96M",
      body: "Live product + real traction + early revenue + creator marketplace.",
    },
    {
      phase: "SCALE",
      title: "PUBLIC / TGE",
      meta: "20% · $16–20M FDV · TBA",
      body: "Scaled platform + Strategy Marketplace + Mobile + Expansion.",
    },
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {stages.map((stage, i) => (
        <div key={stage.title} className="relative">
          <div className="deck-surface-accent flex h-full flex-col rounded-xl px-4 py-5">
            <p className="text-[1.25rem] font-bold uppercase tracking-[0.14em] text-electric">
              {stage.phase}
            </p>
            <p className="mt-2 display text-[2.35rem] font-semibold leading-none text-ink">
              {stage.title}
            </p>
            <p className="mt-3 text-[1.55rem] font-bold tabular-nums leading-snug text-electric">
              {stage.meta}
            </p>
            <p className="mt-3 text-[1.4rem] leading-snug text-muted">{stage.body}</p>
          </div>
          {i < stages.length - 1 ? (
            <span
              className="absolute -right-2.5 top-1/2 z-10 -translate-y-1/2 text-[1.5rem] text-electric/70"
              aria-hidden
            >
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const COMPETITIVE_ROWS = [
  ["Direct Underlying Ownership", "✓", "Vault Token", "SSI Token", "DTF Token", "Brokerage"],
  ["Cross-Chain", "✓", "✓", "✓", "Multi-chain", "—"],
  ["Cross-Asset", "✓", "Crypto + DeFi", "Crypto", "Crypto + Yield", "Stocks + ETFs"],
  ["Personal Automation", "✓", "✓", "—", "—", "✓"],
  ["AI-Assisted Strategy Logic", "✓", "✓", "AI Research", "—", "—"],
  ["Creator Marketplace", "✓", "Fund/Vault", "—", "—", "Portfolio Marketplace"],
  ["Wallet-First Access", "✓", "✓*", "Account-based", "✓", "—"],
  ["MEV-Protected Execution", "✓ CoW", "Partial", "Not disclosed", "✓ Batch Auctions", "—"],
  ["Non-Custodial", "✓", "✓", "✓", "✓", "—"],
] as const;

export function CompetitiveTable() {
  const headers = ["Feature", "INDEXLA", "Velvet", "SoSoValue", "Reserve", "Autopilot"] as const;

  return (
    <div className="deck-surface overflow-hidden rounded-xl">
      <table className="deck-table w-full">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={h} className={i === 1 ? "col-indexla" : undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPETITIVE_ROWS.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`} className={i === 1 ? "col-indexla" : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
