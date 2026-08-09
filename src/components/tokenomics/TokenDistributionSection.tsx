"use client";

import { FadeIn } from "@/components/ui/FadeIn";

export const allocations = [
  { label: "Pre-Seed Round", pct: 1.5, color: "#7c3aed" },
  { label: "Seed Round", pct: 6, color: "#a78bfa" },
  { label: "Private Sale", pct: 10, color: "#38bdf8" },
  { label: "Public Sale", pct: 20, color: "#22d3ee" },
  { label: "DEX Liquidity", pct: 10, color: "#34d399" },
  { label: "Treasury", pct: 20, color: "#3b82f6" },
  { label: "Team", pct: 15, color: "#f59e0b" },
  { label: "Community Airdrops", pct: 10, color: "#f472b6" },
  { label: "CEX Listings", pct: 5, color: "#94a3b8" },
  { label: "Advisors", pct: 2.5, color: "#c4b5fd" },
] as const;

const TOTAL = 100_000_000;
const RADIUS = 72;
const CIRC = 2 * Math.PI * RADIUS;

function DonutChart() {
  let offset = 0;
  return (
    <svg viewBox="0 0 200 200" className="mx-auto aspect-square h-auto w-full max-w-[18rem]">
      <circle
        cx="100"
        cy="100"
        r={RADIUS}
        fill="none"
        stroke="rgba(167,139,250,0.12)"
        strokeWidth="28"
      />
      {allocations.map((item) => {
        const len = (item.pct / 100) * CIRC;
        const el = (
          <circle
            key={item.label}
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={item.color}
            strokeWidth="28"
            strokeDasharray={`${len} ${CIRC - len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 100 100)"
          />
        );
        offset += len;
        return el;
      })}
      <text
        x="100"
        y="94"
        textAnchor="middle"
        fill="#a89bc4"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.12em"
      >
        TOTAL SUPPLY
      </text>
      <text
        x="100"
        y="116"
        textAnchor="middle"
        fill="#f4f1ff"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-display), system-ui, sans-serif"
      >
        100M
      </text>
    </svg>
  );
}

export function TokenDistributionSection() {
  return (
    <section className="relative border-t border-line bg-deep py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(1.9rem,4.2vw,3rem)] uppercase tracking-[-0.02em]">
            Token Distribution
          </h2>
          <p className="mt-4 display text-[clamp(1.2rem,2.4vw,1.55rem)] text-ink">
            Total Supply:{" "}
            <span className="gradient-text tabular-nums">100,000,000 $DEXLA</span>
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <FadeIn className="h-full">
            <div className="flex h-full min-h-full flex-col items-center justify-center rounded-[1.35rem] border border-line glass-soft p-6 sm:p-8">
              <DonutChart />
              <p className="mt-5 text-center text-[0.85rem] text-muted-dim">
                100,000,000 $DEXLA
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.04} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-void/40">
              <div className="grid grid-cols-[minmax(0,1fr)_5.5rem_7rem] gap-2 border-b border-line px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid-cols-[minmax(0,1fr)_6rem_8rem] sm:px-5">
                <span>Allocation</span>
                <span className="text-right">Percentage</span>
                <span className="text-right">Tokens</span>
              </div>
              <ul className="flex-1">
                {allocations.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[minmax(0,1fr)_5.5rem_7rem] items-center gap-2 border-b border-line/70 px-4 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_6rem_8rem] sm:px-5"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: row.color }}
                        aria-hidden
                      />
                      <span className="truncate text-[0.92rem] font-medium text-ink">
                        {row.label}
                      </span>
                    </span>
                    <span className="text-right text-[0.92rem] font-semibold tabular-nums text-ink">
                      {row.pct}%
                    </span>
                    <span className="text-right text-[0.88rem] font-semibold tabular-nums text-muted">
                      {(TOTAL * (row.pct / 100)).toLocaleString("en-US")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-[minmax(0,1fr)_5.5rem_7rem] gap-2 border-t border-line bg-deep/70 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_6rem_8rem] sm:px-5">
                <span className="text-[0.92rem] font-semibold text-ink">Total</span>
                <span className="text-right text-[0.92rem] font-semibold tabular-nums text-electric">
                  100%
                </span>
                <span className="text-right text-[0.88rem] font-semibold tabular-nums text-electric">
                  100,000,000
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-6 max-w-3xl">
          <p className="text-[1.02rem] leading-relaxed text-muted">
            The allocation supports fundraising, liquidity, ecosystem growth,
            team alignment, and long-term protocol development.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
