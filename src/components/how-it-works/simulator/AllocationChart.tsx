import type { SelectedAsset } from "./types";
import { allocationTotal } from "./types";

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

/** Pie segments use absolute % of 100 so remaining capacity is visible. */
export function AllocationChart({
  assets,
  size = 112,
  className = "",
}: AllocationChartProps) {
  const total = allocationTotal(assets);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const complete = total === 100;
  const over = total > 100;

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
    const pct = Math.max(0, a.pct);
    const share = (Math.min(pct, 100) / 100) * circumference;
    const seg = {
      key: a.key,
      color: COLORS[i % COLORS.length],
      dash: `${share} ${circumference - share}`,
      offset,
    };
    offset -= share;
    return seg;
  });

  const remaining = Math.max(0, 100 - total);
  const remainingShare = (remaining / 100) * circumference;

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
        {remaining > 0 && !over ? (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="10"
            strokeDasharray={`${remainingShare} ${circumference - remainingShare}`}
            strokeDashoffset={-((total / 100) * circumference)}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        ) : null}
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
          className={`display text-[1.05rem] font-semibold transition-colors duration-300 ${
            complete
              ? "text-success"
              : over
                ? "text-amber-200"
                : "text-ink"
          }`}
        >
          {complete ? "100%" : `${total}%`}
        </p>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          {complete ? "Complete" : over ? "Over" : "Allocated"}
        </p>
      </div>
    </div>
  );
}

export function AllocationBars({
  assets,
  className = "",
}: {
  assets: SelectedAsset[];
  className?: string;
}) {
  const total = allocationTotal(assets);
  const remaining = Math.max(0, Math.round((100 - total) * 100) / 100);
  const complete = total === 100;
  const over = total > 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        {assets.map((a, i) => (
          <div
            key={a.key}
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, a.pct))}%`,
              background: COLORS[i % COLORS.length],
            }}
            title={`${a.ticker} ${a.pct}%`}
          />
        ))}
        {remaining > 0 && !over ? (
          <div
            className="h-full bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08)_2px,transparent_2px,transparent_5px)] transition-all duration-500"
            style={{ width: `${remaining}%` }}
            title={`${remaining}% remaining`}
          />
        ) : null}
      </div>

      <div className="space-y-1.5">
        {assets.map((a, i) => (
          <div
            key={a.key}
            className="flex items-center justify-between gap-2 text-[0.82rem] transition-all duration-300"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="truncate font-semibold text-ink">{a.ticker}</span>
            </span>
            <span className="shrink-0 font-semibold text-muted">{a.pct}%</span>
          </div>
        ))}
      </div>

      <div
        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-[0.82rem] transition-colors duration-300 ${
          complete
            ? "border-success/35 bg-success/10"
            : over
              ? "border-amber-200/35 bg-amber-200/10"
              : "border-white/[0.08] bg-void/40"
        }`}
      >
        <span className="font-semibold uppercase tracking-[0.1em] text-muted">
          Total
        </span>
        <span
          className={`font-semibold ${
            complete
              ? "text-success"
              : over
                ? "text-amber-200"
                : "text-ink"
          }`}
        >
          {complete
            ? "100% · Complete"
            : over
              ? "Over allocated"
              : `${total}% · ${remaining}% remaining`}
        </span>
      </div>
    </div>
  );
}

export function allocationColor(index: number): string {
  return COLORS[index % COLORS.length];
}
