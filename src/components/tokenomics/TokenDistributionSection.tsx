import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkStat,
} from "@/components/tokenomics/tokenomicsRhythm";

const allocations = [
  { label: "Pre-Seed", short: "Pre-Seed", pct: 2.5, tokens: "2.5M", color: "#7c3aed" },
  { label: "Seed", short: "Seed", pct: 7.5, tokens: "7.5M", color: "#8b5cf6" },
  { label: "Private", short: "Private", pct: 12.5, tokens: "12.5M", color: "#a78bfa" },
  { label: "Public", short: "Public", pct: 20, tokens: "20M", color: "#38bdf8" },
  { label: "Community & Airdrops", short: "Community", pct: 15, tokens: "15M", color: "#fb923c" },
  { label: "Team", short: "Team", pct: 15, tokens: "15M", color: "#fbbf24" },
  { label: "Treasury (36-month lock)", short: "Treasury", pct: 10, tokens: "10M", color: "#34d399" },
  { label: "DEX Liquidity", short: "DEX", pct: 10, tokens: "10M", color: "#22d3ee" },
  { label: "CEX Listings", short: "CEX", pct: 5, tokens: "5M", color: "#f87171" },
  { label: "Advisors", short: "Advisors", pct: 2.5, tokens: "2.5M", color: "#e879f9" },
] as const;

const CX = 248;
const CY = 250;
const OUTER = 148;
const INNER = 90;

function ringPoint(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * radius, y: CY + Math.sin(rad) * radius };
}

function ringPath(start: number, end: number) {
  const large = end - start > 180 ? 1 : 0;
  const outerStart = ringPoint(start, OUTER);
  const outerEnd = ringPoint(end, OUTER);
  const innerEnd = ringPoint(end, INNER);
  const innerStart = ringPoint(start, INNER);
  return `M ${outerStart.x} ${outerStart.y} A ${OUTER} ${OUTER} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${INNER} ${INNER} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z`;
}

function donutSlices() {
  let deg = -90;
  const placed = allocations.map((row) => {
    const start = deg;
    const sweep = row.pct * 3.6;
    const end = start + sweep;
    const mid = start + sweep / 2;
    deg = end;
    return {
      ...row,
      start,
      end,
      anchor: ringPoint(mid, OUTER),
      side: Math.cos((mid * Math.PI) / 180) >= 0 ? ("right" as const) : ("left" as const),
    };
  });

  const spread = (side: "left" | "right") => {
    const group = placed
      .filter((row) => row.side === side)
      .sort((a, b) => a.anchor.y - b.anchor.y);
    const gap = 40;
    const ys = group.map((row) => row.anchor.y);
    for (let i = 1; i < ys.length; i += 1) {
      if (ys[i] - ys[i - 1] < gap) ys[i] = ys[i - 1] + gap;
    }
    const bottom = CY + OUTER + 52;
    const overflow = ys[ys.length - 1] - bottom;
    if (overflow > 0) {
      for (let i = 0; i < ys.length; i += 1) ys[i] -= overflow;
    }
    if (ys[0] < CY - OUTER - 52) {
      const shift = CY - OUTER - 52 - ys[0];
      for (let i = 0; i < ys.length; i += 1) ys[i] += shift;
    }
    for (let i = 1; i < ys.length; i += 1) {
      if (ys[i] - ys[i - 1] < gap) ys[i] = ys[i - 1] + gap;
    }
    return group.map((row, index) => ({ ...row, labelY: ys[index] }));
  };

  return [...spread("right"), ...spread("left")];
}

const slices = donutSlices();

export function TokenDistributionSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Token{" "}
            <span className="gradient-text">Distribution</span>
          </h2>
          <p className={`mt-5 ${tkStat} gradient-text`}>100,000,000</p>
          <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-muted">
            $DEXLA maximum supply
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto w-full max-w-[34rem]">
              <svg
                viewBox="0 16 500 500"
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label="DEXLA allocation: Pre-Seed 2.5%, Seed 7.5%, Private 12.5%, Public 20%, Community 15%, Team 15%, Treasury 10%, DEX 10%, CEX 5%, Advisors 2.5%"
              >
                {slices.map((row) => (
                  <path key={row.label} d={ringPath(row.start, row.end)} fill={row.color} />
                ))}
                <circle cx={CX} cy={CY} r={INNER - 8} fill="var(--color-void)" />
                <text
                  x={CX}
                  y={CY - 2}
                  textAnchor="middle"
                  fill="var(--color-ink)"
                  style={{ fontSize: 22, fontWeight: 650 }}
                >
                  100M
                </text>
                <text
                  x={CX}
                  y={CY + 16}
                  textAnchor="middle"
                  fill="var(--color-muted)"
                  style={{ fontSize: 11, fontWeight: 600 }}
                >
                  $DEXLA
                </text>
                {slices.map((row) => {
                  const right = row.side === "right";
                  const x = right ? CX + OUTER + 18 : CX - OUTER - 18;
                  return (
                    <g key={`${row.label}-label`}>
                      <line
                        x1={row.anchor.x}
                        y1={row.anchor.y}
                        x2={x}
                        y2={row.labelY}
                        stroke="var(--color-muted)"
                        strokeOpacity="0.45"
                        strokeWidth="1"
                      />
                      <text
                        x={right ? x + 6 : x - 6}
                        y={row.labelY}
                        textAnchor={right ? "start" : "end"}
                        fill="var(--color-ink)"
                        style={{ fontSize: 13, fontWeight: 650 }}
                      >
                        <tspan x={right ? x + 6 : x - 6} dy="-0.35em">
                          {row.short}
                        </tspan>
                        <tspan
                          x={right ? x + 6 : x - 6}
                          dy="1.15em"
                          fill="var(--color-electric)"
                          style={{ fontSize: 13, fontWeight: 650 }}
                        >
                          {row.pct}%
                        </tspan>
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-void/45">
              <div className="hidden grid-cols-[1fr_5.5rem_7.5rem] gap-3 border-b border-white/[0.08] bg-deep/60 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim sm:grid sm:px-6">
                <span>Allocation</span>
                <span className="text-right">Share</span>
                <span className="text-right">$DEXLA</span>
              </div>
              <ul>
                {allocations.map((row) => (
                  <li
                    key={row.label}
                    className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 border-b border-white/[0.05] px-5 py-3.5 last:border-0 sm:grid-cols-[auto_1fr_5.5rem_7.5rem] sm:px-6 sm:py-3.5"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ background: row.color }}
                      aria-hidden
                    />
                    <span className="text-[0.95rem] font-medium text-ink">
                      {row.label}
                    </span>
                    <div className="col-span-2 flex items-baseline justify-between gap-4 pl-5 sm:col-span-1 sm:contents sm:pl-0">
                      <span className="display text-[1.12rem] tabular-nums text-electric sm:w-auto sm:text-right">
                        {row.pct}%
                      </span>
                      <span className="display text-[1.05rem] tabular-nums text-ink sm:text-right">
                        {row.tokens}{" "}
                        <span className="text-[0.72rem] font-medium text-muted-dim">
                          $DEXLA
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-white/[0.1] bg-deep/50 px-5 py-3.5 sm:px-6">
                <span className="text-[0.95rem] font-semibold text-ink">
                  Total
                </span>
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="display text-[1.12rem] text-ink">100%</span>
                  <span className="display text-[1.12rem] text-ink">
                    100M{" "}
                    <span className="text-[0.72rem] font-medium text-muted-dim">
                      $DEXLA
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className={`${tkBody} text-balance`}>
            There is no additional minting, inflation, or supply expansion beyond
            this cap.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
