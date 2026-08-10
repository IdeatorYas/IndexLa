"use client";

/** Exact competitor comparison rows from content/whitepaper.md */
const HEADERS = ["Capability", "INDEXLA", "Enzyme", "dHEDGE", "Velvet"] as const;

const ROWS: string[][] = [
  ["Non-custodial architecture", "✓", "✓", "✓", "✓"],
  ["Multi-asset portfolios", "✓", "✓", "✓", "✓"],
  ["Cross-chain execution", "✓", "Limited", "Limited", "✓"],
  ["Rule-based automation", "✓", "✓", "✓", "✓"],
  ["AI-assisted monitoring", "✓", "Limited", "Limited", "✓"],
  ["Creator portfolio model", "✓", "Limited", "✓", "✓"],
  ["Creator execution-fee share", "50%", "—", "—", "Different model"],
  ["Public portfolio distribution", "✓", "✓", "✓", "✓"],
  ["Management fee", "0%", "Model dependent", "Model dependent", "Model dependent"],
  ["Performance fee", "0%", "Model dependent", "Manager dependent", "Model dependent"],
  ["Exit fee", "0%", "Model dependent", "Model dependent", "Model dependent"],
];

function cellTone(value: string, isIndexla: boolean): string {
  if (isIndexla) return "bg-electric/10 font-semibold text-ink";
  if (value === "✓" || value === "0%" || value === "50%") return "text-ink";
  if (value === "—" || value.startsWith("Limited") || value.startsWith("Model") || value.startsWith("Manager") || value.startsWith("Different"))
    return "text-muted-dim";
  return "text-muted";
}

export function CompetitorComparisonTable() {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
        Competitive landscape
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
                        isIndexla
                          ? "font-semibold text-ink"
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

      {/* Desktop / tablet: full comparison table */}
      <div className="hidden overflow-x-auto rounded-xl border border-line bg-void/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:block">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel/60">
              {HEADERS.map((header, i) => (
                <th
                  key={header}
                  className={`px-3.5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] sm:px-4 ${
                    i === 1 ? "bg-electric/15 text-electric" : "text-muted-dim"
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
    </figure>
  );
}
