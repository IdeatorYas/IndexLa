"use client";

/** Illustrative Crypto Fear & Greed gauge — Extreme Fear at score 10 (low end) */
export function FearGreedIndexVisual() {
  const value = 10;
  const cx = 160;
  const cy = 152;
  const arcR = 108;
  const needleR = 78;

  // Upper semicircle: 180° = left (0/fear), 0° = right (100/greed)
  const deg = 180 - (value / 100) * 180; // value 10 → 162°
  const rad = (deg * Math.PI) / 180;
  const tipX = cx + Math.cos(rad) * needleR;
  const tipY = cy - Math.sin(rad) * needleR;
  const markX = cx + Math.cos(rad) * arcR;
  const markY = cy - Math.sin(rad) * arcR;

  return (
    <div className="w-full overflow-hidden rounded-[1.15rem] border border-line bg-void/70 p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          Crypto Fear &amp; Greed Index
        </p>
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative
        </p>
      </div>

      <p className="mt-2.5 text-center display text-[1.2rem] tracking-[-0.02em] sm:text-[1.3rem]">
        <span className="tabular-nums text-danger">10</span>
        <span className="mx-1.5 text-muted-dim">—</span>
        <span className="text-danger">Extreme Fear</span>
      </p>

      <div className="mx-auto mt-0 w-full max-w-[14.5rem]">
        <svg viewBox="0 0 320 175" className="block h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="fgTrack10" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="20%" stopColor="#f97316" />
              <stop offset="45%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Track */}
          <path
            d="M52 152 A108 108 0 0 1 268 152"
            fill="none"
            stroke="url(#fgTrack10)"
            strokeWidth="14"
            strokeLinecap="butt"
          />

          {/* Tick marks at 0 / 25 / 50 / 75 / 100 */}
          {[0, 25, 50, 75, 100].map((v) => {
            const a = ((180 - (v / 100) * 180) * Math.PI) / 180;
            const x1 = cx + Math.cos(a) * 100;
            const y1 = cy - Math.sin(a) * 100;
            const x2 = cx + Math.cos(a) * 116;
            const y2 = cy - Math.sin(a) * 116;
            return (
              <line
                key={v}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(244,241,255,0.35)"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Value marker on the arc at exactly 10 */}
          <circle cx={markX} cy={markY} r="6" fill="#f87171" stroke="#0a0614" strokeWidth="2" />

          {/* Needle from hub to value 10 */}
          <line
            x1={cx}
            y1={cy}
            x2={tipX}
            y2={tipY}
            stroke="#f4f1ff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="6" fill="#0a0614" stroke="#38bdf8" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="2" fill="#38bdf8" />
        </svg>
      </div>

      {/* Linear bar — marker at exactly 10% from left */}
      <div className="mt-0.5 px-0.5">
        <div className="relative h-3">
          <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="flex h-full w-full">
              <div className="w-[25%] bg-[#ef4444]" />
              <div className="w-[25%] bg-[#f97316]" />
              <div className="w-[25%] bg-[#eab308]" />
              <div className="w-[25%] bg-[#22c55e]" />
            </div>
          </div>
          <div
            className="absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-void bg-danger"
            style={{ left: "10%" }}
            title="10"
            aria-hidden
          />
        </div>
        <div className="mt-1 flex justify-between text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-muted-dim">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
        <div className="mt-0.5 grid grid-cols-3 text-[0.6rem] font-semibold uppercase tracking-[0.08em]">
          <span className="text-left text-danger">Fear</span>
          <span className="text-center text-muted">Neutral</span>
          <span className="text-right text-success">Greed</span>
        </div>
      </div>
    </div>
  );
}
