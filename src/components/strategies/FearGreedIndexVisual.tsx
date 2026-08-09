"use client";

/** Crypto Fear & Greed Index–style semicircle gauge (illustrative) */
export function FearGreedIndexVisual() {
  // Needle at Extreme Fear (~18) to reinforce Buy Fear narrative — illustrative only
  const value = 18;
  const angle = -90 + (value / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 160;
  const cy = 150;
  const needleLen = 88;
  const nx = cx + Math.cos(rad) * needleLen;
  const ny = cy + Math.sin(rad) * needleLen;

  return (
    <div className="rounded-[1.35rem] border border-line bg-void/55 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          Crypto Fear &amp; Greed Index
        </p>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative
        </p>
      </div>

      <div className="relative mx-auto mt-2 w-full max-w-[20rem]">
        <svg viewBox="0 0 320 190" className="h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="fgArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Gauge track */}
          <path
            d="M40 150 A120 120 0 0 1 280 150"
            fill="none"
            stroke="url(#fgArc)"
            strokeWidth="22"
            strokeLinecap="butt"
          />
          <path
            d="M40 150 A120 120 0 0 1 280 150"
            fill="none"
            stroke="rgba(10,6,20,0.35)"
            strokeWidth="22"
            strokeDasharray="2 10"
          />

          {/* Zone ticks */}
          {[0, 25, 50, 75, 100].map((v) => {
            const a = ((-90 + (v / 100) * 180) * Math.PI) / 180;
            const x1 = cx + Math.cos(a) * 108;
            const y1 = cy + Math.sin(a) * 108;
            const x2 = cx + Math.cos(a) * 132;
            const y2 = cy + Math.sin(a) * 132;
            return (
              <line
                key={v}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(244,241,255,0.35)"
                strokeWidth="2"
              />
            );
          })}

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke="#f4f1ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="8" fill="#0a0614" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="3" fill="#38bdf8" />

          {/* Value */}
          <text
            x={cx}
            y={cy - 28}
            textAnchor="middle"
            fill="#f4f1ff"
            fontSize="28"
            fontWeight="700"
            fontFamily="var(--font-display), system-ui, sans-serif"
          >
            {value}
          </text>
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fill="#f87171"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.08em"
          >
            EXTREME FEAR
          </text>
        </svg>

        <div className="mt-1 grid grid-cols-3 gap-1 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em]">
          <span className="text-danger">Fear</span>
          <span className="text-muted">Neutral</span>
          <span className="text-success">Greed</span>
        </div>
        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
          <div className="w-[25%] bg-[#ef4444]" />
          <div className="w-[25%] bg-[#f97316]" />
          <div className="w-[25%] bg-[#eab308]" />
          <div className="w-[25%] bg-[#22c55e]" />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-muted-dim">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
