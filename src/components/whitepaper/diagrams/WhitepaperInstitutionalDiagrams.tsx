import { DiagramFrame, FlowSteps } from "./DiagramFrame";

/* ── shared light-theme tokens ── */
const C = {
  accent: "#2563eb",
  accentSoft: "#eff6ff",
  ink: "#0f172a",
  muted: "#475569",
  dim: "#64748b",
  border: "#dbe4f0",
  borderAccent: "#bfdbfe",
} as const;

const card =
  "rounded-xl border border-[#dbe4f0] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]";
const cardAccent =
  "rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3.5";
const label =
  "text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#64748b]";
const titleSm = "text-[0.88rem] font-semibold leading-snug text-[#0f172a]";
const bodySm = "text-[0.8rem] leading-relaxed text-[#475569]";
const arrow = "text-[#2563eb]/70 shrink-0";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`${arrow} ${className}`} aria-hidden>
      →
    </span>
  );
}

/* ── 1. Three Product Ecosystem ── */
export function ThreeProductEcosystemDiagram() {
  const products = [
    {
      name: "INDEXLA Core",
      tagline: "Built for Long-Term Exposure",
      detail:
        "Diversified portfolios across eligible crypto assets, tokenized stocks, commodities and RWAs.",
    },
    {
      name: "Stable Club",
      tagline: "Built for Stablecoin Liquidity",
      detail:
        "Supply supported stablecoins to decentralized exchanges. No lending. No borrowing. No extra INDEXLA vault.",
    },
    {
      name: "Degen Club",
      tagline: "Built for High-Risk Memecoin Exposure",
      detail:
        "Build or discover memecoin baskets across supported assets and networks. Multiple coins create multiple opportunities.",
    },
  ];

  return (
    <DiagramFrame title="Three products for different investor behaviors">
      <div className="grid gap-3 sm:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className={cardAccent}>
            <p className={label}>{p.name}</p>
            <p className={`mt-1.5 ${titleSm}`}>{p.tagline}</p>
            <p className={`mt-2 ${bodySm}`}>{p.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.82rem] font-medium text-[#475569]">
        Users choose their capital, assets, risk, rules and permissions. INDEXLA
        monitors approved conditions and coordinates execution within defined
        limits.
      </p>
    </DiagramFrame>
  );
}

/* ── 2. Portfolio Architecture ── */
export function PortfolioArchitectureDiagram() {
  return (
    <DiagramFrame title="Portfolio architecture">
      <FlowSteps
        steps={[
          "Assets",
          "Portfolios",
          "Strategies",
          "Permissions",
          "Monitoring",
          "Execution",
          "Distribution",
        ]}
      />
    </DiagramFrame>
  );
}

/* ── 3. Build → Define → Execute Flow ── */
export function BuildDefineExecuteFlowDiagram() {
  return (
    <DiagramFrame title="How INDEXLA works">
      <FlowSteps
        steps={["Build", "Define", "Authorize", "Monitor", "Execute"]}
      />
      <p className="mt-4 text-center text-[0.82rem] font-semibold text-[#0f172a]">
        You define the strategy. You control the permissions. INDEXLA
        coordinates execution.
      </p>
    </DiagramFrame>
  );
}

/* ── 4. Permission Lifecycle ── */
export function PermissionLifecycleDiagram() {
  const steps = [
    "Authorization",
    "Permission Checks",
    "Data Validation",
    "Risk Checks",
    "Route Validation",
    "Simulation",
    "Execution",
    "Monitoring",
  ];

  return (
    <DiagramFrame title="Execution lifecycle">
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            <div className={`flex min-h-[3rem] flex-1 items-center ${cardAccent} py-2.5`}>
              <span className="w-full text-center text-[0.78rem] font-semibold text-[#0f172a]">
                <span className="mr-1 text-[#2563eb]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-[0.8rem] text-[#475569]">
        If data is stale, conditions are invalid, permissions are missing or
        approved limits are exceeded, execution fails closed.
      </p>
    </DiagramFrame>
  );
}

/* ── 5. Three Product Business Model ── */
export function ThreeProductBusinessDiagram() {
  const engines = [
    {
      product: "INDEXLA Core",
      subtitle: "Long-Term AUM",
      role: "Builds durable AUM and recurring execution through DCA, rebalancing and other approved portfolio actions.",
    },
    {
      product: "Stable Club",
      subtitle: "Scalable Liquidity",
      role: "Scales stablecoin liquidity and position-management volume while users earn DEX trading fees.",
    },
    {
      product: "Degen Club",
      subtitle: "Higher-Frequency Execution",
      role: "Drives higher-frequency execution and fee generation through high-risk memecoin portfolio activity.",
    },
  ];

  return (
    <DiagramFrame title="Three product engines">
      <div className="grid gap-3 sm:grid-cols-3">
        {engines.map((e) => (
          <div key={e.product} className={card}>
            <p className={label}>{e.product}</p>
            <p className={`mt-1 ${titleSm}`}>{e.subtitle}</p>
            <p className={`mt-2 ${bodySm}`}>{e.role}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-center text-[0.88rem] font-semibold text-[#0f172a]">
        Core builds AUM. Stable Club scales liquidity. Degen Club drives volume.
      </p>
    </DiagramFrame>
  );
}

/* ── 6. Execution Fee Distribution ── */
export function ExecutionFeeDistributionDiagram() {
  const rows = [
    {
      type: "INDEXLA Portfolio",
      parts: [
        { label: "Platform", pct: 50, color: "#2563eb" },
        { label: "Treasury", pct: 20, color: "#3b82f6" },
        { label: "Rewards", pct: 20, color: "#6366f1" },
        { label: "Buyback & Burn", pct: 10, color: "#0ea5e9" },
      ],
    },
    {
      type: "Creator Portfolio",
      parts: [
        { label: "Creator", pct: 50, color: "#2563eb" },
        { label: "Platform", pct: 20, color: "#3b82f6" },
        { label: "Treasury", pct: 10, color: "#6366f1" },
        { label: "Rewards", pct: 10, color: "#818cf8" },
        { label: "Buyback & Burn", pct: 10, color: "#0ea5e9" },
      ],
    },
  ];

  return (
    <DiagramFrame title="Execution-fee distribution">
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.type}>
            <p className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0f172a]">
              {row.type}
            </p>
            <div className="flex h-3.5 overflow-hidden rounded-full border border-[#dbe4f0]">
              {row.parts.map((part) => (
                <div
                  key={part.label}
                  style={{ width: `${part.pct}%`, background: part.color }}
                  title={`${part.label} ${part.pct}%`}
                />
              ))}
            </div>
            <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
              {row.parts.map((part) => (
                <li
                  key={part.label}
                  className="flex items-center gap-1.5 text-[0.75rem] text-[#475569]"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: part.color }}
                  />
                  {part.pct}% {part.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.78rem] text-[#64748b]">
        Each row totals 100% of the applicable 1% execution fee.
      </p>
    </DiagramFrame>
  );
}

/* ── 7. INDEXLA Flywheel ── */
export function IndexlaFlywheelDiagram() {
  const steps = [
    "$DEXLA Utility",
    "More Creators",
    "More Indexes + Portfolios",
    "More Investors + Capital",
    "More Execution Volume",
    "More Fees",
    "INDEXLA Revenue",
    "Creator Earnings",
    "$DEXLA Buybacks + Burns",
    "Stronger Incentives",
  ];

  return (
    <DiagramFrame title="The INDEXLA flywheel">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-1.5">
            <span
              className={`inline-block rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-2 text-center text-[0.72rem] font-semibold leading-snug text-[#0f172a] sm:text-[0.78rem]`}
            >
              {step}
            </span>
            {i < steps.length - 1 ? <Arrow /> : null}
          </span>
        ))}
      </div>
    </DiagramFrame>
  );
}

/* ── 8. $DEXLA Utility Flow ── */
export function DexlaUtilityFlowDiagram() {
  const utilities = [
    { name: "Publish", detail: "1,000 $DEXLA to publish a public portfolio." },
    {
      name: "Feature",
      detail: "2,500 $DEXLA for seven days of featured Marketplace placement.",
    },
    {
      name: "Monetize and Access",
      detail:
        "500 $DEXLA to list a creator strategy. Other creators pay the creator's selected access price in $DEXLA.",
    },
  ];

  const saveTiers = [
    { held: "2,500", discount: "10%" },
    { held: "5,000", discount: "20%" },
    { held: "10,000", discount: "30%" },
  ];

  return (
    <DiagramFrame title="$DEXLA utility">
      <div className="grid gap-3 sm:grid-cols-3">
        {utilities.map((u) => (
          <div key={u.name} className={cardAccent}>
            <p className={label}>{u.name}</p>
            <p className={`mt-1.5 ${bodySm}`}>{u.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className={card}>
          <p className={label}>Save</p>
          <p className={`mt-1.5 ${bodySm}`}>
            Hold $DEXLA to receive execution-fee discounts:
          </p>
          <table className="mt-2 w-full text-[0.78rem]">
            <thead>
              <tr className="border-b border-[#dbe4f0] text-left text-[#64748b]">
                <th className="pb-1.5 font-semibold">$DEXLA Held</th>
                <th className="pb-1.5 font-semibold">Execution-Fee Discount</th>
              </tr>
            </thead>
            <tbody>
              {saveTiers.map((t) => (
                <tr
                  key={t.held}
                  className="border-b border-[#dbe4f0]/60 text-[#0f172a] last:border-0"
                >
                  <td className="py-1.5 tabular-nums">{t.held}</td>
                  <td className="py-1.5 font-semibold tabular-nums">
                    {t.discount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={cardAccent}>
          <p className={label}>Tip</p>
          <p className={`mt-1.5 ${bodySm}`}>
            Tip creators directly in $DEXLA. Tips support creators, contribute
            to leaderboard ranking and form part of investor reward eligibility.
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

/* ── 9. Token Allocation Donut ── */
const TOKEN_ALLOCATIONS = [
  { label: "Pre-Seed", pct: 2.5, tokens: "2,500,000", color: "#1d4ed8" },
  { label: "Seed", pct: 6, tokens: "6,000,000", color: "#2563eb" },
  { label: "Private", pct: 14, tokens: "14,000,000", color: "#3b82f6" },
  { label: "Public", pct: 20, tokens: "20,000,000", color: "#60a5fa" },
  {
    label: "Community and Airdrops",
    pct: 15,
    tokens: "15,000,000",
    color: "#6366f1",
  },
  { label: "Team", pct: 15, tokens: "15,000,000", color: "#818cf8" },
  { label: "Treasury", pct: 10, tokens: "10,000,000", color: "#0ea5e9" },
  { label: "DEX Liquidity", pct: 10, tokens: "10,000,000", color: "#06b6d4" },
  {
    label: "CEX and Market Making",
    pct: 5,
    tokens: "5,000,000",
    color: "#64748b",
  },
  { label: "Advisors", pct: 2.5, tokens: "2,500,000", color: "#94a3b8" },
] as const;

export function TokenAllocationDonutDiagram() {
  const radius = 68;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <DiagramFrame title="Token allocation — 100,000,000 $DEXLA">
      <div className="grid items-center gap-6 lg:grid-cols-[14rem_1fr]">
        <svg
          viewBox="0 0 180 180"
          className="mx-auto h-auto w-full max-w-[14rem]"
          role="img"
          aria-label="Token allocation donut chart totaling 100 million $DEXLA"
        >
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="24"
          />
          {TOKEN_ALLOCATIONS.map((item) => {
            const len = (item.pct / 100) * circ;
            const el = (
              <circle
                key={item.label}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="24"
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 90 90)"
              />
            );
            offset += len;
            return el;
          })}
          <text
            x="90"
            y="86"
            textAnchor="middle"
            fill={C.dim}
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.1em"
          >
            TOTAL
          </text>
          <text
            x="90"
            y="104"
            textAnchor="middle"
            fill={C.ink}
            fontSize="16"
            fontWeight="700"
          >
            100M
          </text>
        </svg>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {TOKEN_ALLOCATIONS.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-lg border border-[#dbe4f0] bg-white px-2.5 py-2 text-[0.78rem]"
            >
              <span className="flex items-center gap-2 text-[#475569]">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
              <span className="shrink-0 tabular-nums font-semibold text-[#0f172a]">
                {item.pct}% · {item.tokens}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DiagramFrame>
  );
}

/* ── 10. Vesting Timeline ── */
const VESTING_ROWS = [
  {
    allocation: "Pre-Seed",
    tge: "10%",
    release: "3-month cliff, then 18-month linear release",
  },
  {
    allocation: "Seed",
    tge: "10%",
    release: "3-month cliff, then 18-month linear release",
  },
  {
    allocation: "Private",
    tge: "10%",
    release: "3-month cliff, then 18-month linear release",
  },
  {
    allocation: "Public",
    tge: "15%",
    release: "Remaining allocation over 6 months",
  },
  {
    allocation: "DEX Liquidity",
    tge: "100%",
    release: "Available at TGE",
  },
  { allocation: "Treasury", tge: "0%", release: "36-month lock" },
  {
    allocation: "Team",
    tge: "0%",
    release: "12-month cliff, then 24-month linear release",
  },
  {
    allocation: "Community and Airdrops",
    tge: "0%",
    release: "Progressive release",
  },
  {
    allocation: "Advisors",
    tge: "0%",
    release: "6-month cliff, then 12-month linear release",
  },
  {
    allocation: "CEX and Market Making",
    tge: "0%",
    release: "Progressive release",
  },
] as const;

export function VestingTimelineDiagram() {
  return (
    <DiagramFrame title="Vesting and release">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-[0.78rem]">
          <thead>
            <tr className="border-b border-[#dbe4f0] bg-[#eef4fc] text-left text-[#64748b]">
              <th className="px-3 py-2.5 font-semibold uppercase tracking-[0.08em]">
                Allocation
              </th>
              <th className="px-3 py-2.5 font-semibold uppercase tracking-[0.08em]">
                TGE
              </th>
              <th className="px-3 py-2.5 font-semibold uppercase tracking-[0.08em]">
                Vesting or Release
              </th>
            </tr>
          </thead>
          <tbody>
            {VESTING_ROWS.map((row, i) => (
              <tr
                key={row.allocation}
                className={`border-b border-[#dbe4f0]/70 text-[#0f172a] last:border-0 ${
                  i % 2 === 1 ? "bg-[#f8fafc]" : ""
                }`}
              >
                <td className="px-3 py-2 font-semibold">{row.allocation}</td>
                <td className="px-3 py-2 tabular-nums">{row.tge}</td>
                <td className="px-3 py-2 text-[#475569]">{row.release}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-center text-[0.82rem] font-semibold text-[#0f172a]">
        Estimated initial circulation: 15,250,000 $DEXLA (15.25% of maximum
        supply)
      </p>
    </DiagramFrame>
  );
}

/* ── 11. Six Burn Mechanisms ── */
const BURN_MECHANISMS = [
  {
    mechanism: "Publishing Burn",
    burn: "1,000 $DEXLA, 100% burned",
  },
  {
    mechanism: "Featuring Burn",
    burn: "2,500 $DEXLA, 100% burned",
  },
  {
    mechanism: "Strategy Listing Burn",
    burn: "500 $DEXLA, 100% burned",
  },
  {
    mechanism: "Strategy Access Burn",
    burn: "50% of access payment burned",
  },
  {
    mechanism: "Execution-Fee Buyback and Burn",
    burn: "10% of applicable execution fees allocated to buyback and burn",
  },
  {
    mechanism: "Treasury-Profit Buyback and Burn",
    burn: "25% of realized Treasury profits allocated to buyback and burn",
  },
] as const;

export function SixBurnMechanismsDiagram() {
  return (
    <DiagramFrame title="Six burn mechanisms">
      <div className="grid gap-2 sm:grid-cols-2">
        {BURN_MECHANISMS.map((m, i) => (
          <div key={m.mechanism} className={card}>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eff6ff] text-[0.68rem] font-bold text-[#2563eb]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className={titleSm}>{m.mechanism}</p>
                <p className={`mt-1 ${bodySm}`}>{m.burn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

/* ── 12. Creator Revenue Streams ── */
export function CreatorRevenueStreamsDiagram() {
  const streams = [
    {
      n: "01",
      title: "Portfolio Execution Fees",
      detail:
        "Creators receive 50% of applicable execution fees generated by their portfolios.",
    },
    {
      n: "02",
      title: "Strategy Access",
      detail:
        "Creators can earn from access payments for proprietary strategies and receive 10% of applicable execution fees when their strategy is used in another creator's portfolio.",
    },
    {
      n: "03",
      title: "Monthly Creator Rewards",
      detail:
        "The monthly Top 10 portfolios qualify based on the Creator Leaderboard. Each winning portfolio's reward: 50% to the creator, 50% to eligible investors.",
    },
    {
      n: "04",
      title: "$DEXLA Tips",
      detail:
        "Investors can tip creators directly in $DEXLA. Tips contribute to leaderboard ranking and investor reward eligibility.",
    },
  ];

  const weights = [
    { factor: "Performance", weight: "50%", purpose: "Portfolio performance" },
    {
      factor: "AUM",
      weight: "25%",
      purpose: "Capital invested in the portfolio",
    },
    {
      factor: "Volume",
      weight: "15%",
      purpose: "Genuine portfolio execution activity",
    },
    {
      factor: "$DEXLA Tips",
      weight: "10%",
      purpose: "Community support from portfolio holders",
    },
  ];

  return (
    <DiagramFrame title="Creator economy — four ways to earn">
      <div className="grid gap-2 sm:grid-cols-2">
        {streams.map((s) => (
          <div key={s.title} className={cardAccent}>
            <p className="text-[0.65rem] font-bold text-[#2563eb]">{s.n}</p>
            <p className={`mt-0.5 ${titleSm}`}>{s.title}</p>
            <p className={`mt-1.5 ${bodySm}`}>{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
          Creator leaderboard — monthly ranking weights
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {weights.map((w) => (
            <div key={w.factor} className={card}>
              <p className="text-[0.82rem] font-semibold text-[#0f172a]">
                {w.factor}{" "}
                <span className="text-[#2563eb]">{w.weight}</span>
              </p>
              <p className={`mt-1 ${bodySm}`}>{w.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}

/* ── 13. Network & Asset Coverage ── */
export function NetworkAssetCoverageDiagram() {
  const networks = [
    "Ethereum",
    "Base",
    "Arbitrum",
    "BNB Chain",
    "Solana",
    "Sui",
    "Robinhood Chain",
    "Sei",
    "Bittensor / Tao",
  ];

  const categories = [
    {
      name: "Crypto",
      detail: "Eligible crypto assets across supported networks.",
    },
    {
      name: "Tokenized Stocks",
      detail: "Tokenized securities where legally and technically supported.",
    },
    {
      name: "Commodities",
      detail: "Tokenized commodities and macro exposure.",
    },
    {
      name: "RWAs",
      detail: "Real-world assets and hybrid portfolios.",
    },
  ];

  return (
    <DiagramFrame title="Supported asset and network direction">
      <div>
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
          Planned network coverage
        </p>
        <div className="flex flex-wrap gap-2">
          {networks.map((n) => (
            <span
              key={n}
              className="rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1.5 text-[0.78rem] font-semibold text-[#0f172a]"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#64748b]">
          Asset categories
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-[#dbe4f0] bg-gradient-to-b from-[#eff6ff] to-white px-4 py-5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[#2563eb]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <p className={titleSm}>{c.name}</p>
              <p className={`mt-1.5 ${bodySm}`}>{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </DiagramFrame>
  );
}

/* ── 14. Roadmap Timeline ── */
export function RoadmapTimelineDiagram() {
  const phases = [
    {
      period: "Q3 2026",
      title: "Foundation",
      detail:
        "Research, product validation, competitive analysis, team development and protocol architecture.",
    },
    {
      period: "Q4 2026",
      title: "MVP and Private Beta",
      detail:
        "Launch the Base Sepolia Alpha with portfolio creation, investment flows, scoped permissions and initial DCA automation. Begin creator and user testing.",
    },
    {
      period: "Q1 2027",
      title: "Public Launch",
      detail:
        "Expand functionality, incorporate testing feedback, complete required security work and prepare broader platform availability.",
    },
    {
      period: "Q2 2027",
      title: "Expansion",
      detail:
        "Expand eligible assets, networks, strategies and partnerships. Activate $DEXLA utilities only when product, security, liquidity and legal requirements are satisfied.",
    },
    {
      period: "Q3 2027+",
      title: "Mobile and Global Expansion",
      detail:
        "Expand mobile access, supported regions, networks, assets, creators and ecosystem partnerships.",
    },
  ];

  return (
    <DiagramFrame title="Progressive deployment and roadmap">
      <ol className="relative space-y-0 border-l-2 border-[#bfdbfe] pl-6 sm:pl-8">
        {phases.map((phase, i) => (
          <li key={phase.period} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[calc(0.75rem+1px)] top-1.5 flex h-3 w-3 rounded-full border-2 border-[#2563eb] bg-white sm:-left-[calc(0.875rem+1px)]"
              aria-hidden
            />
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#2563eb]">
              {phase.period}
            </p>
            <p className={`mt-0.5 ${titleSm}`}>{phase.title}</p>
            <p className={`mt-1 ${bodySm}`}>{phase.detail}</p>
            {i < phases.length - 1 ? (
              <span className="sr-only">Next phase</span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-center text-[0.75rem] text-[#64748b]">
        Roadmap dates are targets, not commitments.
      </p>
    </DiagramFrame>
  );
}

/* ── 15. Risk Framework ── */
export function RiskFrameworkDiagram() {
  const risks = [
    {
      title: "Smart-Contract Risk",
      detail:
        "Smart contracts and on-chain programs can contain vulnerabilities despite testing, reviews and audits.",
    },
    {
      title: "Cross-Chain Risk",
      detail:
        "Bridges, routers, relayers and networks can fail, become congested or suffer security incidents.",
    },
    {
      title: "Liquidity and Execution Risk",
      detail:
        "Insufficient liquidity, slippage, MEV, failed transactions and network conditions can materially affect execution.",
    },
    {
      title: "Stablecoin and Liquidity-Position Risk",
      detail:
        "Stablecoins can depeg. Liquidity positions may face impermanent loss, range risk, smart-contract risk and reduced fee generation.",
    },
    {
      title: "Memecoin Risk",
      detail:
        "Memecoins are highly volatile, speculative and vulnerable to manipulation, concentration, liquidity loss and total capital loss.",
    },
    {
      title: "Tokenized-Asset Risk",
      detail:
        "Tokenized stocks, commodities, real estate and other RWAs may face fragmented liquidity, limited trading windows, issuer restrictions, redemption constraints and settlement risk.",
    },
    {
      title: "Market Risk",
      detail: "Asset prices can move rapidly and cause significant losses.",
    },
    {
      title: "Oracle and Data Risk",
      detail:
        "Incorrect, stale, manipulated or unavailable data can affect monitoring and execution.",
    },
    {
      title: "Asset and Issuer Risk",
      detail:
        "Tokenized assets depend on issuers, custodians, legal structures, liquidity providers and supporting infrastructure.",
    },
    {
      title: "Regulatory Risk",
      detail:
        "Digital-asset, tokenization and financial-services regulation continues to evolve and may restrict products, assets or jurisdictions.",
    },
    {
      title: "Operational and Third-Party Risk",
      detail:
        "Infrastructure providers, liquidity venues, data providers, wallets, networks and routing systems can fail.",
    },
    {
      title: "Token Risk",
      detail:
        "$DEXLA may have limited utility, liquidity or market value. Burns do not guarantee demand or appreciation.",
    },
  ];

  return (
    <DiagramFrame title="Risk factors">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {risks.map((r) => (
          <div key={r.title} className={card}>
            <p className={`${titleSm} text-[0.82rem]`}>{r.title}</p>
            <p className={`mt-1.5 ${bodySm}`}>{r.detail}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

/* ── 16. Regulatory Framework ── */
export function RegulatoryFrameworkDiagram() {
  const pillars = [
    "Custodian",
    "Broker-dealer",
    "Securities issuer",
    "Traditional investment manager",
    "Investment adviser",
  ];

  return (
    <DiagramFrame title="Regulatory approach">
      <p className="mb-4 text-center text-[0.84rem] leading-relaxed text-[#475569]">
        INDEXLA&apos;s initial model is decentralized, non-custodial software
        and portfolio infrastructure. INDEXLA does not initially operate as a:
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar}
            className="flex items-center gap-3 rounded-xl border border-[#dbe4f0] bg-white px-4 py-4"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#2563eb]"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </span>
            <p className="text-[0.86rem] font-semibold text-[#0f172a]">
              {pillar}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.78rem] text-[#64748b]">
        Where regulated assets or tokenized securities are supported, access may
        depend on issuer requirements, jurisdiction, eligibility, KYC/AML,
        licensing and applicable law.
      </p>
    </DiagramFrame>
  );
}
