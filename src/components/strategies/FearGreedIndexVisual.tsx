"use client";

/** Illustrative Crypto Fear & Greed gauge locked to Extreme Fear at 10 */
export function FearGreedIndexVisual() {
  const value = 10;
  const cx = 160;
  const cy = 150;
  const needleR = 78;
  // Upper semicircle in SVG: θ from 180° (left / fear) → 0° (right / greed)
  const thetaDeg = 180 - (value / 100) * 180;
  const theta = (thetaDeg * Math.PI) / 180;
  const nx = cx + Math.cos(theta) * needleR;
  const ny = cy - Math.sin(theta) * needleR;

  return (
    <div className="w-full overflow-hidden rounded-[1.2rem] border border-line bg-void/65 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          Crypto Fear &amp; Greed Index
        </p>
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative
        </p>
      </div>

      <p className="mt-3 text-center display text-[1.25rem] tracking-[-0.02em] sm:text-[1.35rem]">
        <span className="tabular-nums text-danger">10</span>
        <span className="mx-1.5 text-muted-dim">—</span>
        <span className="text-danger">Extreme Fear</span>
      </p>

      <div className="mx-auto mt-1 w-full max-w-[15.5rem]">
        <svg
          viewBox="0 0 320 168"
          className="block h-auto w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="fgArcLow10" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="22%" stopColor="#f97316" />
              <stop offset="48%" stopColor="#eab308" />
              <stop offset="72%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <path
            d="M40 150 A120 120 0 0 1 280 150"
            fill="none"
            stroke="url(#fgArcLow10)"
            strokeWidth="16"
            strokeLinecap="butt"
          />

          {[0, 25, 50, 75, 100].map((v) => {
            const a = ((180 - (v / 100) * 180) * Math.PI) / 180;
            const x1 = cx + Math.cos(a) * 111;
            const y1 = cy - Math.sin(a) * 111;
            const x2 = cx + Math.cos(a) * 129;
            const y2 = cy - Math.sin(a) * 129;
            return (
              <line
                key={v}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(244,241,255,0.3)"
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
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx={cx}
            cy={cy}
            r="6.5"
            fill="#0a0614"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="2.25" fill="#38bdf8" />
        </svg>
      </div>

      <div className="mt-1">
        <div className="relative h-2.5">
          <div className="absolute inset-x-0 top-1/2 flex h-2 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="w-[25%] bg-[#ef4444]" />
            <div className="w-[25%] bg-[#f97316]" />
            <div className="w-[25%] bg-[#eab308]" />
            <div className="w-[25%] bg-[#22c55e]" />
          </div>
          <div
            className="absolute top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-void bg-danger"
            style={{ left: `${value}%` }}
            aria-hidden
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-muted-dim">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
        <div className="mt-1 grid grid-cols-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.08em]">
          <span className="text-left text-danger">Fear</span>
          <span className="text-muted">Neutral</span>
          <span className="text-right text-success">Greed</span>
        </div>
      </div>
    </div>
  );
}
