"use client";

/** Exact competitor comparison rows from content/whitepaper.md */
const HEADERS = [
  "Capability",
  "INDEXLA",
  "Velvet",
  "Reserve",
  "SoSoValue",
  "Autopilot",
] as const;

const ROWS: string[][] = [
  [
    "Crypto + RWA + TradFi",
    "Yes",
    "No — crypto focused",
    "Limited",
    "Limited",
    "No — TradFi only",
  ],
  [
    "Cross-Chain Execution",
    "Yes",
    "Yes",
    "Limited — basket products",
    "Limited — supported chains",
    "No",
  ],
  [
    "Automated Strategy Execution",
    "Yes",
    "Yes — AI agents",
    "No",
    "Limited — trading bots",
    "Yes — event-triggered",
  ],
  [
    "Rule-Based Strategies",
    "Yes",
    "Limited — AI/agent based",
    "No",
    "Limited — predefined conditions",
    "No",
  ],
  [
    "Creator Portfolio Marketplace",
    "Yes",
    "Yes",
    "No",
    "No",
    "Yes",
  ],
  [
    "Creator Revenue Share",
    "Yes — 50%",
    "Yes — configurable",
    "No",
    "No",
    "No",
  ],
  [
    "Non-Custodial / Self-Custody",
    "Yes",
    "Yes",
    "Yes",
    "Hybrid",
    "No",
  ],
  [
    "Individual Asset Ownership",
    "Yes",
    "Limited — vault shares",
    "No — basket tokens",
    "No — index products",
    "Yes — brokerage assets",
  ],
];

function cellTone(value: string, isIndexla: boolean): string {
  if (isIndexla) return "bg-electric/10 font-semibold text-ink";
  if (value === "Yes" || value.startsWith("Yes")) return "text-ink";
  if (value === "No" || value.startsWith("No")) return "text-muted-dim";
  return "text-muted";
}

export function CompetitorComparisonTable() {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
        Competitive comparison
      </figcaption>

      {/* Mobile: stacked capability cards */}
      <div className="space-y-3 md:hidden">
        {ROWS.map((row) => (
          <div
            key={row[0]}
            className="overflow-hidden rounded-xl border border-line bg-void/50"
          >
            <div className="border-b border-line bg-panel/50 px-3.5 py-2.5">
              <p className="text-[0.82rem] font-semibold text-ink">{row[0]}</p>
            </div>
            <dl className="divide-y divide-line">
              {HEADERS.slice(1).map((header, i) => {
                const value = row[i + 1];
                const isIndexla = i === 0;
                return (
                  <div
                    key={header}
                    className={`grid grid-cols-[6.5rem_1fr] gap-3 px-3.5 py-2.5 ${
                      isIndexla ? "bg-electric/10" : ""
                    }`}
                  >
                    <dt
                      className={`text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${
                        isIndexla ? "text-electric" : "text-muted-dim"
                      }`}
                    >
                      {header}
                    </dt>
                    <dd
                      className={`text-[0.88rem] leading-snug ${
                        isIndexla ? "font-semibold text-ink" : cellTone(value, false)
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop / tablet: full comparison table */}
      <div className="hidden overflow-x-auto rounded-xl border border-line bg-void/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:block">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel/60">
              {HEADERS.map((header, i) => (
                <th
                  key={header}
                  className={`px-3.5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] sm:px-4 ${
                    i === 1
                      ? "bg-electric/15 text-electric"
                      : "text-muted-dim"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, rowIndex) => (
              <tr
                key={row[0]}
                className={`border-b border-line last:border-b-0 ${
                  rowIndex % 2 === 0 ? "bg-transparent" : "bg-deep/35"
                }`}
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={`${row[0]}-${colIndex}`}
                    className={`px-3.5 py-3.5 align-middle text-[0.86rem] leading-snug sm:px-4 ${
                      colIndex === 0
                        ? "sticky left-0 z-[1] min-w-[11rem] border-r border-line bg-void/95 font-semibold text-ink backdrop-blur-sm"
                        : cellTone(cell, colIndex === 1)
                    } ${colIndex === 1 ? "min-w-[8.5rem]" : "min-w-[8rem]"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[0.88rem] text-muted-dim">
        Competitive features reflect publicly available product positioning and
        may evolve over time.
      </p>
    </figure>
  );
}
