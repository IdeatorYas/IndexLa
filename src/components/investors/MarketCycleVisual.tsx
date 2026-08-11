"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo } from "react";

export type CyclePhase = {
  id: string;
  label: string;
  sublabel?: string;
  action?: string;
  emotion?: string;
};

type MarketCycleVisualProps = {
  phases: CyclePhase[];
  variant?: "hero" | "strategy" | "climax";
  className?: string;
  activePhaseId?: string;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function MarketCycleVisual({
  phases,
  variant = "hero",
  className = "",
  activePhaseId,
}: MarketCycleVisualProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const size = variant === "hero" ? 320 : 380;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = variant === "hero" ? 118 : 132;
  const labelR = variant === "hero" ? 148 : 168;

  const nodes = useMemo(
    () =>
      phases.map((phase, i) => {
        const deg = (360 / phases.length) * i;
        const pos = polar(cx, cy, labelR, deg);
        const ringPos = polar(cx, cy, ringR, deg);
        return { ...phase, deg, pos, ringPos };
      }),
    [phases, cx, cy, labelR, ringR],
  );

  const pathD = useMemo(() => {
    const pts = nodes.map((n) => n.ringPos);
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x} ${pts[i].y}`;
    }
    d += " Z";
    return d;
  }, [nodes]);

  return (
    <div className={`relative mx-auto w-full max-w-[min(100%,${size}px)] ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-auto w-full"
        role="img"
        aria-label="Market cycle visualization"
      >
        <defs>
          <linearGradient id={`${uid}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="rgb(56,189,248)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="rgb(52,211,153)" stopOpacity="0.65" />
          </linearGradient>
          <filter id={`${uid}-glow`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR + 18}
          fill="none"
          stroke={`url(#${uid}-ring)`}
          strokeWidth="1"
          opacity="0.15"
        />

        {/* Cycle path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${uid}-ring)`}
          strokeWidth={variant === "climax" ? 2.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 8"
          initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Center label */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: variant === "hero" ? 11 : 10, fontWeight: 600, letterSpacing: "0.12em" }}
        >
          MARKET
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          className="fill-electric"
          style={{ fontSize: variant === "hero" ? 11 : 10, fontWeight: 600, letterSpacing: "0.12em" }}
        >
          CYCLE
        </text>

        {/* Phase nodes */}
        {nodes.map((node, i) => {
          const isActive = activePhaseId === node.id;
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.ringPos.x}
                cy={node.ringPos.y}
                r={isActive ? 7 : 5}
                fill={isActive ? "rgb(56,189,248)" : "rgb(139,92,246)"}
                filter={`url(#${uid}-glow)`}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              />
              <text
                x={node.pos.x}
                y={node.pos.y - (node.action || node.emotion ? 6 : 0)}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: variant === "hero" ? 9.5 : 8.5, fontWeight: 600 }}
              >
                {node.label}
              </text>
              {node.emotion && (
                <text
                  x={node.pos.x}
                  y={node.pos.y + 10}
                  textAnchor="middle"
                  className="fill-muted"
                  style={{ fontSize: 8, fontWeight: 500 }}
                >
                  {node.emotion}
                </text>
              )}
              {node.action && (
                <text
                  x={node.pos.x}
                  y={node.pos.y + 11}
                  textAnchor="middle"
                  fill="rgb(52,211,153)"
                  style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.06em" }}
                >
                  {node.action}
                </text>
              )}
            </g>
          );
        })}

        {/* Direction arrows between nodes */}
        {!reduce &&
          nodes.map((node, i) => {
            const midDeg = node.deg + 360 / phases.length / 2;
            const arrow = polar(cx, cy, ringR + 8, midDeg);
            return (
              <motion.circle
                key={`arrow-${node.id}`}
                cx={arrow.x}
                cy={arrow.y}
                r={2}
                fill="rgb(56,189,248)"
                opacity={0.5}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            );
          })}
      </svg>
    </div>
  );
}

export const HERO_CYCLE_PHASES: CyclePhase[] = [
  { id: "fear", label: "Fear", emotion: "Panic" },
  { id: "recovery", label: "Recovery", emotion: "Hope" },
  { id: "greed", label: "Greed", emotion: "FOMO" },
  { id: "euphoria", label: "Euphoria", emotion: "Excitement" },
];

export const STRATEGY_CYCLE_PHASES: CyclePhase[] = [
  { id: "extreme-fear", label: "Extreme Fear", action: "DCA IN" },
  { id: "recovery", label: "Recovery" },
  { id: "neutral", label: "Neutral", action: "HOLD" },
  { id: "greed", label: "Greed", action: "DCA OUT" },
  { id: "extreme-greed", label: "Extreme Greed", action: "Take Profit" },
  { id: "reversal", label: "Reversal" },
];

export const CLIMAX_CYCLE_PHASES: CyclePhase[] = [
  { id: "extreme-fear", label: "Extreme Fear", action: "Accumulate" },
  { id: "recovery", label: "Recovery", action: "Hold" },
  { id: "neutral", label: "Neutral", action: "Hold" },
  { id: "greed", label: "Greed", action: "Take Profit" },
  { id: "extreme-greed", label: "Extreme Greed", action: "More Profit" },
  { id: "reversal", label: "Reversal", action: "Repeat" },
];
