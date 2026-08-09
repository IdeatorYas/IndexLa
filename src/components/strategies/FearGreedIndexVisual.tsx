"use client";

/** Crypto Fear & Greed Index gauge — illustrative Extreme Fear at 10 */
export function FearGreedIndexVisual() {
  const value = 10;
  // Semicircle: 0° at left (fear), 180° at right (greed) mapped from -90 to +90 in SVG
  const angle = -90 + (value / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 160;
  const cy = 148;
  const needleLen = 82;
  const nx = cx + Math.cos(rad) * needleLen;
  const ny = cy + Math.sin(rad) * needleLen;

  return (
    <div className="rounded-[1.25rem] border border-line bg-void/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          Crypto Fear &amp; Greed Index
        </p>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative
        </p>
      </div>

      <p className="display mt-3 text-center text-[1.35rem] tracking-[-0.02em] text-ink sm:text-[1.45rem]">
        <span className="tabular-nums text-danger">10</span>
        <span className="mx-2 text-muted-dim">—</span>
        <span className="text-danger">Extreme Fear</span>
      </p>

      <div className="relative mx-auto mt-1 w-full max-w-[17.5rem]">
        <svg viewBox="0 0 320 168" className="h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="fgArc10" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="20%" stopColor="#f97316" />
              <stop offset="45%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <path
            d="M44 148 A116 116 0 0 1 276 148"
            fill="none"
            stroke="url(#fgArc10)"
            strokeWidth="18"
            strokeLinecap="butt"
          />

          {[0, 25, 50, 75, 100].map((v) => {
            const a = ((-90 + (v / 100) * 180) * Math.PI) / 180;
            const x1 = cx + Math.cos(a) * 106;
            const y1 = cy + Math.sin(a) * 106;
            const x2 = cx + Math.cos(a) * 126;
            const y2 = cy + Math.sin(a) * 126;
            return (
              <line
                key={v}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(244,241,255,0.28)"
                strokeWidth="1.5"
              />
            );
          })}

          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke="#f4f1ff"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <circle
            cx={cx}
            cy={cy}
            r="7"
            fill="#0a0614"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Linear scale with marker locked to value 10 */}
      <div className="relative mt-1 px-0.5">
        <div className="flex h-2 overflow-hidden rounded-full">
          <div className="w-[25%] bg-[#ef4444]" />
          <div className="w-[25%] bg-[#f97316]" />
          <div className="w-[25%] bg-[#eab308]" />
          <div className="w-[25%] bg-[#22c55e]" />
        </div>
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-void bg-danger shadow-[0_0_0_2px_rgba(248,113,113,0.35)]"
          style={{ left: "10%" }}
          aria-hidden
        />
        <div className="mt-2 flex justify-between text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-muted-dim">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
        <div className="mt-1 grid grid-cols-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
          <span className="text-danger">Fear</span>
          <span className="text-muted">Neutral</span>
          <span className="text-success">Greed</span>
        </div>
      </div>
    </div>
  );
}
