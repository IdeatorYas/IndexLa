import { DiagramFrame, FlowSteps } from "@/components/whitepaper/diagrams/DiagramFrame";

export function ProtocolArchitectureDiagram() {
  const layers = [
    { label: "Assets", detail: "Crypto · Tokenized stocks · Commodities · RWAs · Hybrid" },
    { label: "Portfolio layer", detail: "Allocations · Ownership of underlying assets · Non-custodial control" },
    { label: "Strategy engine", detail: "Fear & Greed · RSI · Momentum · Take profit · Rebalancing · DCA" },
    { label: "Execution", detail: "Permissions · Monitoring · Cross-chain routing · Transaction execution" },
    { label: "Distribution", detail: "Creator marketplace · Discovery · Fee participation" },
  ];

  return (
    <DiagramFrame title="Protocol architecture">
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="grid gap-2 rounded-lg border border-line bg-deep/70 px-3.5 py-3 sm:grid-cols-[9.5rem_1fr] sm:items-center sm:gap-4"
            style={{ opacity: 1 - i * 0.02 }}
          >
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-electric">
              {layer.label}
            </p>
            <p className="text-[0.92rem] leading-snug text-muted">{layer.detail}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function SolutionFlowDiagram() {
  return (
    <DiagramFrame title="INDEXLA portfolio flow">
      <FlowSteps
        steps={[
          "Assets",
          "Portfolio",
          "Strategy",
          "Permissions",
          "Monitoring",
          "Execution",
        ]}
      />
    </DiagramFrame>
  );
}

export function CrossChainExecutionDiagram() {
  return (
    <DiagramFrame title="Cross-chain execution abstraction">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <div className="rounded-lg border border-line bg-deep/80 px-3 py-4 text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Investor intent
          </p>
          <p className="mt-2 text-[0.9rem] font-semibold text-ink">
            Assets · Allocations · Rules
          </p>
        </div>
        <p className="hidden text-center text-electric md:block" aria-hidden>
          →
        </p>
        <div className="rounded-lg border border-electric/35 bg-electric/10 px-3 py-4 text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-electric">
            INDEXLA execution layer
          </p>
          <p className="mt-2 text-[0.9rem] font-semibold text-ink">
            Bridges · Routing · Swaps · Approvals · Gas
          </p>
        </div>
        <p className="hidden text-center text-electric md:block" aria-hidden>
          →
        </p>
        <div className="rounded-lg border border-line bg-deep/80 px-3 py-4 text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Supported networks
          </p>
          <p className="mt-2 text-[0.9rem] font-semibold text-ink">
            Cross-chain portfolio positions
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

export function NonCustodialFlowDiagram() {
  return (
    <DiagramFrame title="Non-custodial execution flow">
      <FlowSteps
        steps={[
          "Authorize permissions",
          "Monitor markets",
          "Strategy triggered",
          "Prepare transaction",
          "Execution occurs",
        ]}
      />
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Permissions can be limited by the investor and revoked unilaterally.
      </p>
    </DiagramFrame>
  );
}

export function InvestorExecutionStackDiagram() {
  return (
    <DiagramFrame title="User → Portfolio → Strategy → AI monitoring → Execution">
      <FlowSteps
        steps={[
          "User",
          "Portfolio",
          "Strategy",
          "AI Monitoring",
          "Execution",
        ]}
      />
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        The investor defines the strategy. AI monitors the conditions. INDEXLA
        executes.
      </p>
    </DiagramFrame>
  );
}

export function CreatorMarketplaceFlowDiagram() {
  return (
    <DiagramFrame title="Creator growth flywheel">
      <FlowSteps
        steps={["Creator", "Portfolio", "Investor", "AUM", "Execution", "Creator Revenue"]}
      />
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Creators receive 50% of applicable execution fees from their portfolios.
      </p>
    </DiagramFrame>
  );
}

export function FeeDistributionDiagram() {
  const rows = [
    {
      type: "INDEXLA Portfolio",
      parts: [
        { label: "Platform", pct: 30, color: "#38bdf8" },
        { label: "Treasury", pct: 30, color: "#7c3aed" },
        { label: "Rewards", pct: 30, color: "#22d3ee" },
        { label: "Buyback & Burn", pct: 10, color: "#f472b6" },
      ],
    },
    {
      type: "Creator Portfolio",
      parts: [
        { label: "Creator", pct: 50, color: "#a78bfa" },
        { label: "Platform", pct: 20, color: "#38bdf8" },
        { label: "Treasury", pct: 10, color: "#7c3aed" },
        { label: "Rewards", pct: 10, color: "#22d3ee" },
        { label: "Buyback & Burn", pct: 10, color: "#f472b6" },
      ],
    },
  ];

  return (
    <DiagramFrame title="Execution fee distribution">
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.type}>
            <p className="mb-2 text-[0.8rem] font-semibold text-ink">{row.type}</p>
            <div className="flex h-3 overflow-hidden rounded-full border border-line">
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
                  className="flex items-center gap-1.5 text-[0.75rem] text-muted"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: part.color }}
                  />
                  {part.label} {part.pct}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function EconomicFlywheelDiagram() {
  const steps = [
    "Creators build portfolios",
    "Investors allocate capital",
    "Execution fees generated",
    "Creators earn revenue",
    "Rewards incentivize participation",
    "Treasury funds growth",
    "$DEXLA buyback & burn",
    "Ecosystem compounds",
  ];

  return (
    <DiagramFrame title="Economic flywheel">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step}
            className="rounded-lg border border-line bg-deep/70 px-3 py-3 text-center"
          >
            <p className="text-[0.65rem] font-semibold text-electric">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.84rem] font-semibold text-ink">{step}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const ALLOCATIONS = [
  { label: "Pre Seed", pct: 1.5, tokens: "1.5M", color: "#7c3aed" },
  { label: "Seed", pct: 6, tokens: "6M", color: "#a78bfa" },
  { label: "Private", pct: 10, tokens: "10M", color: "#38bdf8" },
  { label: "Public", pct: 20, tokens: "20M", color: "#22d3ee" },
  { label: "DEX Liquidity", pct: 10, tokens: "10M", color: "#34d399" },
  { label: "Treasury", pct: 20, tokens: "20M", color: "#3b82f6" },
  { label: "Team", pct: 15, tokens: "15M", color: "#f59e0b" },
  { label: "Community", pct: 10, tokens: "10M", color: "#f472b6" },
  { label: "Advisors", pct: 2.5, tokens: "2.5M", color: "#c4b5fd" },
  { label: "CEX / Market Making", pct: 5, tokens: "5M", color: "#94a3b8" },
] as const;

export function TokenAllocationDiagram() {
  const radius = 68;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <DiagramFrame title="Token allocation 100,000,000 $DEXLA">
      <div className="grid items-center gap-6 lg:grid-cols-[14rem_1fr]">
        <svg viewBox="0 0 180 180" className="mx-auto h-auto w-full max-w-[14rem]">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(167,139,250,0.12)"
            strokeWidth="24"
          />
          {ALLOCATIONS.map((item) => {
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
            fill="#a89bc4"
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
            fill="#f4f1ff"
            fontSize="16"
            fontWeight="700"
          >
            100M
          </text>
        </svg>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {ALLOCATIONS.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-md border border-line/80 px-2.5 py-2 text-[0.8rem]"
            >
              <span className="flex items-center gap-2 text-muted">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
              <span className="tabular-nums font-semibold text-ink">
                {item.pct}% · {item.tokens}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DiagramFrame>
  );
}

export function VestingTimelineDiagram() {
  const rows = [
    { label: "Pre Seed / Seed / Private", detail: "10% TGE · 3-month cliff · 18-month linear" },
    { label: "Public", detail: "15% TGE · remaining linear over 6 months" },
    { label: "DEX Liquidity", detail: "100% available at TGE" },
    { label: "Treasury", detail: "24-month lock" },
    { label: "Team", detail: "12-month cliff · then 24-month linear" },
    { label: "Community", detail: "Progressive release" },
    { label: "Advisors", detail: "6-month cliff · then 12-month linear" },
    { label: "CEX / Market Making", detail: "Progressive release by listing needs" },
  ];

  return (
    <DiagramFrame title="Vesting & release schedule">
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid gap-1 rounded-lg border border-line bg-deep/60 px-3 py-2.5 sm:grid-cols-[13rem_1fr] sm:items-center sm:gap-4"
          >
            <p className="text-[0.82rem] font-semibold text-ink">{row.label}</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-electric/80 to-purple-bright/70" />
              </div>
              <p className="shrink-0 text-[0.78rem] text-muted">{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.85rem] text-muted">
        Initial circulating supply:{" "}
        <span className="font-semibold text-ink">14.75M $DEXLA (14.75%)</span>
      </p>
    </DiagramFrame>
  );
}

export function BurnBuybackFlowDiagram() {
  return (
    <DiagramFrame title="Five $DEXLA burn mechanisms">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Publishing burn",
            body: "1,000 $DEXLA → 100% burned per public portfolio",
          },
          {
            title: "Featured burn",
            body: "2,500 $DEXLA → 100% burned per Featured placement",
          },
          {
            title: "Execution fee burn",
            body: "10% of execution-fee revenue → buyback & burn",
          },
          {
            title: "Treasury burn",
            body: "25% of realized Treasury profits → buyback & burn",
          },
          {
            title: "Strategy monetization burn",
            body: "50% of strategy-access payment permanently burned",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-line bg-deep/70 px-3.5 py-4"
          >
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-electric">
              {item.title}
            </p>
            <p className="mt-2 text-[0.9rem] leading-snug text-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-electric/25 bg-electric/5 px-3.5 py-3 text-center text-[0.88rem] text-ink">
        Creator growth → protocol revenue → Treasury profits → permanent $DEXLA
        supply reduction
      </div>
    </DiagramFrame>
  );
}

export function RoadmapPhasesDiagram() {
  const phases = [
    { quarter: "Q3 2026", name: "Foundation" },
    { quarter: "Q4 2026", name: "Architecture & MVP" },
    { quarter: "Q1 2027", name: "Testing & Full Platform Launch" },
    { quarter: "Q2 2027", name: "Partnerships, Token & Scale" },
    { quarter: "Q3 2027", name: "Mobile & Global Expansion" },
  ];

  return (
    <DiagramFrame title="Progressive deployment roadmap">
      <ol className="space-y-2">
        {phases.map((phase, i) => (
          <li
            key={phase.quarter}
            className={`grid gap-1 rounded-lg border px-3.5 py-3 sm:grid-cols-[4.5rem_1fr] sm:items-center sm:gap-4 ${
              i === 0
                ? "border-electric/40 bg-electric/10"
                : "border-line bg-deep/60"
            }`}
          >
            <span className="text-[0.78rem] font-semibold tabular-nums text-electric">
              {phase.quarter}
            </span>
            <p className="text-[0.92rem] font-semibold text-ink">{phase.name}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-[0.82rem] text-muted">
        Foundation → MVP → Full Product → Scale → Mobile
      </p>
    </DiagramFrame>
  );
}

export function StrategyEngineDiagram() {
  const strategies = [
    { name: "DCA", rule: "Accumulates on defined schedules and parameters" },
    {
      name: "Buy Fear",
      rule: "Accumulate when Fear & Greed conditions are met",
    },
    {
      name: "Sell Greed",
      rule: "Reduce exposure when Greed conditions are met",
    },
    {
      name: "Take Profit",
      rule: "Reduces exposure when profit conditions are reached",
    },
    {
      name: "Stop Loss",
      rule: "Restricts downside according to configured conditions",
    },
    {
      name: "RSI",
      rule: "Executes on configured overbought and oversold conditions",
    },
    {
      name: "Momentum",
      rule: "Adjusts exposure using configured momentum signals",
    },
    {
      name: "Rebalancing",
      rule: "Maintains target allocations as portfolio weights change",
    },
  ];

  return (
    <DiagramFrame title="Strategy automation">
      <div className="grid gap-2 sm:grid-cols-2">
        {strategies.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-line bg-deep/70 px-3.5 py-3"
          >
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-electric">
              {item.name}
            </p>
            <p className="mt-2 text-[0.88rem] leading-snug text-muted">
              {item.rule}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Users define the rules. INDEXLA coordinates authorized execution.
      </p>
    </DiagramFrame>
  );
}

export function SecurityRiskDiagram() {
  const risks = [
    "Smart contract risk",
    "Permission risk",
    "Market data risk",
    "Cross-chain & bridge risk",
    "Liquidity & execution risk",
    "Asset & issuer risk",
    "Regulatory risk",
    "Operational risk",
  ];

  return (
    <DiagramFrame title="Security architecture risk surface">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {risks.map((risk) => (
          <div
            key={risk}
            className="rounded-lg border border-line bg-deep/70 px-3 py-3 text-center"
          >
            <p className="text-[0.84rem] font-semibold text-ink">{risk}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Progressive security: scoped permissions, circuit breakers, audits, and
        bug bounty as the protocol approaches production.
      </p>
    </DiagramFrame>
  );
}

export function GtmGrowthFlywheelDiagram() {
  return (
    <DiagramFrame title="Go-to-market channels">
      <div className="grid gap-2 sm:grid-cols-3">
        {[
          {
            title: "Creator Distribution",
            detail: "50–100 credible creators and KOLs",
          },
          {
            title: "Direct User Acquisition",
            detail: "Brand, performance marketing, SEO, education",
          },
          {
            title: "Strategic Partnerships",
            detail: "Wallets, chains, DeFi, infrastructure partners",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="rounded-lg border border-line bg-deep/70 px-3 py-3.5 text-center"
          >
            <p className="text-[0.65rem] font-semibold text-electric">
              Strategy {i + 1}
            </p>
            <p className="mt-1 text-[0.88rem] font-semibold text-ink">
              {item.title}
            </p>
            <p className="mt-2 text-[0.8rem] leading-snug text-muted">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function FeeDiscountTiersDiagram() {
  const tiers = [
    { hold: "2,500 $DEXLA", discount: "10%" },
    { hold: "5,000 $DEXLA", discount: "25%" },
    { hold: "10,000 $DEXLA", discount: "40%" },
  ];

  return (
    <DiagramFrame title="Investor fee-discount tiers">
      <div className="grid gap-3 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.hold}
            className="rounded-lg border border-electric/30 bg-electric/10 px-3.5 py-4 text-center"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
              Hold
            </p>
            <p className="mt-1 text-[0.95rem] font-semibold text-ink">
              {tier.hold}
            </p>
            <p className="mt-3 text-[1.35rem] font-semibold tabular-nums text-electric">
              {tier.discount}
            </p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
              Execution-fee discount
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function CreatorAlignmentDiagram() {
  return (
    <DiagramFrame title="Creator-aligned marketplace relationship">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-2">
        {["Platform", "Creator", "Investor"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="rounded-lg border border-electric/35 bg-electric/10 px-5 py-3 text-center">
              <p className="text-[0.92rem] font-semibold text-ink">{label}</p>
            </div>
            {i < 2 ? (
              <span className="hidden text-electric sm:inline" aria-hidden>
                ↔
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Creators receive 50% of execution-fee revenue: long-term participants,
        not acquisition channels.
      </p>
    </DiagramFrame>
  );
}

export function MultiAssetEcosystemDiagram() {
  const assets = [
    "Crypto assets",
    "Stablecoins",
    "Tokenized securities",
    "Tokenized commodities",
    "Eligible RWAs",
    "Hybrid portfolios",
  ];

  return (
    <DiagramFrame title="Multi-asset portfolio universe">
      <div className="flex flex-wrap justify-center gap-2">
        {assets.map((asset) => (
          <span
            key={asset}
            className="rounded-lg border border-line bg-deep/70 px-3.5 py-2.5 text-[0.88rem] font-semibold text-ink"
          >
            {asset}
          </span>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        INDEXLA does not issue, wrap, or custody the underlying tokenized
        assets.
      </p>
    </DiagramFrame>
  );
}

export function HowIndexlaWorksDiagram() {
  return (
    <DiagramFrame title="How INDEXLA works">
      <FlowSteps
        steps={[
          "Build",
          "Configure",
          "Authorize",
          "Monitor",
          "Execute",
          "Manage",
        ]}
      />
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        INDEXLA separates portfolio management from asset custody.
      </p>
    </DiagramFrame>
  );
}

export function LiquidityRiskControlsDiagram() {
  return (
    <DiagramFrame title="Execution liquidity & risk controls">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-electric/30 bg-electric/10 px-3.5 py-4 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
            Minimum liquidity
          </p>
          <p className="mt-2 text-[1.35rem] font-semibold tabular-nums text-electric">
            $100K
          </p>
          <p className="mt-2 text-[0.8rem] text-muted">
            Initial eligibility threshold for automated execution
          </p>
        </div>
        <div className="rounded-lg border border-electric/30 bg-electric/10 px-3.5 py-4 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
            Maximum slippage
          </p>
          <p className="mt-2 text-[1.35rem] font-semibold tabular-nums text-electric">
            5%
          </p>
          <p className="mt-2 text-[0.8rem] text-muted">
            Trades above 5% are not executed
          </p>
        </div>
        <div className="rounded-lg border border-line bg-deep/70 px-3.5 py-4 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
            Routing policy
          </p>
          <p className="mt-2 text-[0.95rem] font-semibold text-ink">
            Primary → Alternative → Reject
          </p>
          <p className="mt-2 text-[0.8rem] text-muted">
            Pause. Do not force execution.
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

export function MarketOpportunityDiagram() {
  const layers = [
    {
      label: "TAM",
      title: "Global Investable Assets",
      detail: "Hundreds of trillions across equities, fixed income, commodities, real estate, alternatives, and crypto",
      tone: "border-electric/40 bg-electric/10",
    },
    {
      label: "SAM",
      title: "Programmable On-Chain Assets",
      detail: "Crypto, stablecoins, tokenized securities, commodities, real estate, RWAs, and hybrid portfolios",
      tone: "border-purple-bright/35 bg-purple-bright/10",
    },
    {
      label: "SOM",
      title: "Initial Market",
      detail: "Crypto-native investors, financial creators, and early multi-asset portfolio users",
      tone: "border-line bg-deep/70",
    },
  ];

  return (
    <DiagramFrame title="Market opportunity TAM / SAM / SOM">
      <div className="space-y-3">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className={`rounded-xl border px-4 py-4 sm:px-5 ${layer.tone}`}
            style={{ marginInline: `${i * 0.75}rem` }}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
                {layer.label}
              </span>
              <p className="text-[1rem] font-semibold text-ink">{layer.title}</p>
            </div>
            <p className="mt-2 text-[0.88rem] leading-snug text-muted">
              {layer.detail}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function ArchitectureGapDiagram() {
  const pillars = [
    {
      num: "01",
      title: "Individual Asset Ownership",
      body: "Users retain ownership of underlying assets instead of depositing into pooled vaults.",
    },
    {
      num: "02",
      title: "Scoped Non-Custodial Permissions",
      body: "Authorize specific execution actions without transferring custody of user assets.",
    },
    {
      num: "03",
      title: "Execution-Level Creator Economics",
      body: "Route creator economics directly from applicable portfolio execution activity.",
    },
  ];

  return (
    <DiagramFrame title="Why the architecture gap is structural">
      <div className="grid gap-3 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="rounded-lg border border-line bg-deep/70 px-3.5 py-4"
          >
            <p className="text-[0.72rem] font-semibold tabular-nums tracking-[0.12em] text-electric">
              {pillar.num}
            </p>
            <p className="mt-2 text-[0.95rem] font-semibold text-ink">
              {pillar.title}
            </p>
            <p className="mt-2 text-[0.85rem] leading-snug text-muted">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.85rem] text-muted">
        Not a feature checklist: a different custody, permission, and fee-routing model.
      </p>
    </DiagramFrame>
  );
}
