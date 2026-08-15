"use client";

import type { SelectedAsset } from "./types";

const COLORS = [
  "#38bdf8",
  "#7c3aed",
  "#34d399",
  "#f59e0b",
  "#f472b6",
  "#60a5fa",
  "#a78bfa",
  "#2dd4bf",
];

type AllocationChartProps = {
  assets: SelectedAsset[];
  size?: number;
  className?: string;
};

export function AllocationChart({
  assets,
  size = 112,
  className = "",
}: AllocationChartProps) {
  const total = assets.reduce((s, a) => s + a.pct, 0);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  if (assets.length === 0 || total <= 0) {
    return (
      <div
        className={`relative mx-auto flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          0%
        </p>
      </div>
    );
  }

  let offset = 0;
  const segments = assets.map((a, i) => {
    const share = (a.pct / Math.max(total, 1)) * circumference;
    const seg = {
      key: a.key,
      color: COLORS[i % COLORS.length],
      dash: `${share} ${circumference - share}`,
      offset,
      pct: a.pct,
      ticker: a.ticker,
    };
    offset -= share;
    return seg;
  });

  return (
    <div className={`relative mx-auto ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        {segments.map((s) => (
          <circle
            key={s.key}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth="10"
            strokeDasharray={s.dash}
            strokeDashoffset={s.offset}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p
          className={`display text-[1.05rem] font-semibold ${
            Math.round(total) === 100 ? "text-success" : "text-ink"
          }`}
        >
          {Math.round(total * 100) / 100}%
        </p>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          Allocated
        </p>
      </div>
    </div>
  );
}

export function allocationColor(index: number): string {
  return COLORS[index % COLORS.length];
}
