"use client";

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
  "Rewards Pool",
  "Buyback & Burn",
] as const;

const rows = [
  {
    type: "Protocol Created Portfolio",
    values: ["—", "20%", "30%", "40%", "10%"],
  },
  {
    type: "Creator Portfolio",
    values: ["50%", "20%", "10%", "10%", "10%"],
  },
] as const;

export function FeeFlowSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Execution Fee{" "}
            <span className="gradient-text">Distribution</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${tkBody} text-balance`}>
            The 1% execution fee is distributed according to the type of
            portfolio generating the activity.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className={`mx-auto max-w-5xl ${tkSurface}`}>
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/[0.08] px-5 py-5 sm:gap-3 sm:px-7">
              {["Eligible Activity", "1% Execution Fee", "Distribution"].map(
                (step, i, steps) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <span className="rounded-lg border border-electric/30 bg-electric/[0.08] px-3.5 py-2 text-[0.85rem] font-semibold text-ink sm:text-[0.92rem]">
                      {step}
                    </span>
                    {i < steps.length - 1 ? (
                      <span className="text-electric/50" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </div>
                ),
              )}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[40rem] text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-void/40 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
                    <th className="px-5 py-3.5 font-semibold sm:px-6">
                      Portfolio Type
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="px-3 py-3.5 text-center font-semibold"
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
                      <td className="px-5 py-5 text-[0.95rem] font-semibold text-ink sm:px-6">
                        {row.type}
                      </td>
                      {row.values.map((value, i) => (
                        <td key={`${row.type}-${columns[i]}`} className="px-3 py-5 text-center">
                          <span
                            className={`display text-[1.15rem] tabular-nums ${
                              value === "—"
                                ? "text-muted-dim"
                                : value === "50%"
                                  ? "gradient-text"
                                  : "text-ink"
                            }`}
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

            {/* Mobile stacked cards */}
            <div className="divide-y divide-white/[0.07] md:hidden">
              {rows.map((row) => (
                <div key={row.type} className="px-5 py-5">
                  <p className="text-[0.95rem] font-semibold text-ink">
                    {row.type}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {columns.map((col, i) => (
                      <li
                        key={`${row.type}-m-${col}`}
                        className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-2.5 last:border-0 last:pb-0"
                      >
                        <span className="text-[0.82rem] text-muted">{col}</span>
                        <span
                          className={`display text-[1.1rem] tabular-nums ${
                            row.values[i] === "—"
                              ? "text-muted-dim"
                              : row.values[i] === "50%"
                                ? "gradient-text"
                                : "text-ink"
                          }`}
                        >
                          {row.values[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
