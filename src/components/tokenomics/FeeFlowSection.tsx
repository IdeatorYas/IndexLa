import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

const columns = [
  "Creator",
  "Platform",
  "Treasury",
  "Rewards",
  "Buyback & Burn",
] as const;

const rows = [
  {
    type: "INDEXLA Portfolio",
    values: ["—", "50%", "20%", "20%", "10%"],
    accent: "electric" as const,
  },
  {
    type: "Creator Portfolio",
    values: ["50%", "20%", "10%", "10%", "10%"],
    accent: "success" as const,
  },
] as const;

function pctClass(value: string, isCreatorCol: boolean) {
  if (value === "—") return "text-muted-dim";
  if (isCreatorCol && value === "50%") return "gradient-text";
  return "text-ink";
}

export function FeeFlowSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Platform Fee{" "}
            <span className="gradient-text">Distribution</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${tkBody} text-balance`}>
            All INDEXLA execution activity contributes 10% of execution fees to
            the $DEXLA Buyback &amp; Burn mechanism, regardless of portfolio
            ownership.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className={`mx-auto max-w-5xl ${tkSurface}`}>
            {/* Desktop dashboard */}
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-void/40 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    <th className="px-6 py-4 font-semibold">Portfolio</th>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="px-3 py-4 text-center font-semibold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.type}
                      className="border-b border-white/[0.06] last:border-0"
                    >
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex rounded-lg border px-3 py-1.5 text-[0.82rem] font-semibold uppercase tracking-[0.08em] ${
                            row.accent === "electric"
                              ? "border-electric/30 bg-electric/[0.08] text-electric"
                              : "border-success/30 bg-success/[0.08] text-success"
                          }`}
                        >
                          {row.type}
                        </span>
                      </td>
                      {row.values.map((value, i) => (
                        <td
                          key={`${row.type}-${columns[i]}`}
                          className="px-3 py-6 text-center"
                        >
                          <span
                            className={`display text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tabular-nums ${pctClass(value, i === 0)}`}
                          >
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-4 p-4 md:hidden">
              {rows.map((row) => (
                <article
                  key={row.type}
                  className="overflow-hidden border border-white/[0.08] bg-void/35"
                >
                  <div
                    className={`border-b border-white/[0.08] px-4 py-3 ${
                      row.accent === "electric"
                        ? "bg-electric/[0.06]"
                        : "bg-success/[0.06]"
                    }`}
                  >
                    <p
                      className={`text-[0.78rem] font-semibold uppercase tracking-[0.1em] ${
                        row.accent === "electric"
                          ? "text-electric"
                          : "text-success"
                      }`}
                    >
                      {row.type}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-px bg-white/[0.06]">
                    {columns.map((col, i) => (
                      <li
                        key={`${row.type}-m-${col}`}
                        className="flex flex-col items-center justify-center bg-panel/40 px-3 py-4 text-center"
                      >
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                          {col}
                        </span>
                        <span
                          className={`mt-1.5 display text-[1.35rem] font-semibold tabular-nums ${pctClass(row.values[i], i === 0)}`}
                        >
                          {row.values[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
