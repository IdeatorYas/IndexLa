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
  if (isIndexla) return "bg-[#eff6ff] font-semibold text-[#0f172a]";
  if (value === "✓" || value.startsWith("✓")) return "text-[#0f172a]";
  if (value === "—" || value.includes("Not Disclosed")) return "text-[#94a3b8]";
  return "text-[#475569]";
}

export function CompetitorComparisonTable() {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
        Competitive Comparison
      </figcaption>

      <div className="space-y-3 md:hidden">
        {ROWS.map((row) => (
          <div
            key={row[0]}
            className="overflow-hidden rounded-xl border border-[#dbe4f0] bg-white shadow-sm"
          >
            <div className="border-b border-[#dbe4f0] bg-[#f8fafc] px-3.5 py-2.5">
              <p className="text-[0.84rem] font-semibold text-[#0f172a]">
                {row[0]}
              </p>
            </div>
            <dl className="divide-y divide-[#e2e8f0]">
              {HEADERS.slice(1).map((header, i) => {
                const value = row[i + 1];
                const isIndexla = i === 0;
                return (
                  <div
                    key={header}
                    className={`grid grid-cols-[6.5rem_1fr] gap-3 px-3.5 py-2.5 ${
                      isIndexla ? "bg-[#eff6ff]" : ""
                    }`}
                  >
                    <dt
                      className={`text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${
                        isIndexla ? "text-[#2563eb]" : "text-[#64748b]"
                      }`}
                    >
                      {header}
                    </dt>
                    <dd
                      className={`text-[0.86rem] leading-snug ${
                        isIndexla
                          ? "font-semibold text-[#0f172a]"
                          : cellTone(value, false)
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
            <tr className="wp-table-head border-b border-[#dbe4f0]">
              {HEADERS.map((header, i) => (
                <th
                  key={header}
                  className={`px-3.5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] sm:px-4 ${
                    i === 1
                      ? "bg-[#dbeafe] text-[#2563eb]"
                      : "text-[#64748b]"
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
                className={`border-b border-[#e2e8f0] last:border-b-0 ${
                  rowIndex % 2 === 1 ? "wp-table-row-alt" : ""
                }`}
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={`${row[0]}-${colIndex}`}
                    className={`px-3.5 py-3.5 align-middle text-[0.86rem] leading-snug sm:px-4 ${
                      colIndex === 0
                        ? "sticky left-0 z-[1] min-w-[11rem] border-r border-[#e2e8f0] bg-white font-semibold text-[#0f172a]"
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

      <p className="mt-3 text-[0.82rem] italic leading-relaxed text-[#64748b]">
        *Comparison reflects publicly available product positioning and may
        change as platforms evolve.
      </p>
    </figure>
  );
}
