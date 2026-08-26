/** Exact competitor comparison from content/whitepaper.md section 16 */
const HEADERS = [
  "Feature",
  "INDEXLA",
  "Velvet",
  "SoSoValue",
  "Reserve",
  "Autopilot",
] as const;

const ROWS: string[][] = [
  [
    "Direct Underlying Ownership",
    "✓",
    "Vault Token",
    "SSI Token",
    "DTF Token",
    "Brokerage",
  ],
  ["Cross-Chain", "✓", "✓", "✓", "Multi-Chain Deployments", "—"],
  [
    "Cross-Asset",
    "✓ Crypto + Stocks + Commodities + RWAs",
    "Crypto + DeFi",
    "Crypto",
    "Crypto + Yield Assets",
    "Stocks + ETFs",
  ],
  ["Personal Automation", "✓", "✓", "—", "—", "✓"],
  [
    "AI-Assisted Strategy Logic",
    "✓",
    "✓",
    "AI Research",
    "—",
    "—",
  ],
  [
    "Creator Marketplace",
    "✓",
    "Fund/Vault",
    "—",
    "—",
    "Portfolio Marketplace",
  ],
  ["Wallet-First Access", "✓", "✓*", "Account-Based", "✓", "—"],
  [
    "MEV-Aware Execution",
    "✓ CoW",
    "Partial",
    "Not Disclosed",
    "✓ Batch Auctions",
    "—",
  ],
  ["Non-Custodial", "✓", "✓", "✓", "✓", "—"],
];

function cellTone(value: string, isIndexla: boolean): string {
  if (isIndexla) return "bg-electric/10 font-semibold text-ink";
  if (value === "✓" || value.startsWith("✓")) return "text-ink";
  if (value === "—" || value.includes("Not Disclosed")) return "text-muted-dim";
  return "text-muted";
}

export function CompetitorComparisonTable() {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
        Competitive Comparison
      </figcaption>

      <div className="space-y-3 md:hidden">
        {ROWS.map((row) => (
          <div
            key={row[0]}
            className="overflow-hidden rounded-xl border border-line bg-deep shadow-sm"
          >
            <div className="border-b border-line bg-panel px-3.5 py-2.5">
              <p className="text-[0.84rem] font-semibold text-ink">{row[0]}</p>
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
                      className={`text-[0.86rem] leading-snug ${
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

      <div className="wp-table-wrap hidden overflow-x-auto rounded-xl md:block">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead>
            <tr className="wp-table-head border-b border-line">
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
                  rowIndex % 2 === 1 ? "wp-table-row-alt" : ""
                }`}
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={`${row[0]}-${colIndex}`}
                    className={`px-3.5 py-3.5 align-middle text-[0.86rem] leading-snug sm:px-4 ${
                      colIndex === 0
                        ? "sticky left-0 z-[1] min-w-[11rem] border-r border-line bg-deep font-semibold text-ink"
                        : cellTone(cell, colIndex === 1)
                    } ${colIndex === 1 ? "min-w-[7rem]" : "min-w-[7.5rem]"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[0.82rem] italic leading-relaxed text-muted-dim">
        *Comparison reflects publicly available product positioning and may
        change as platforms evolve.
      </p>
    </figure>
  );
}
