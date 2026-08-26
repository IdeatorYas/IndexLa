"use client";

import { useId, useState } from "react";

export type HomeDonutSegment = {
  ticker: string;
  percent: number;
  color: string;
  src: string;
};

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleRad: number,
) {
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeDonutSegment(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
) {
  const startOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const startInner = polarToCartesian(cx, cy, innerR, endAngle);
  const endInner = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

function logoSizeForSegment(
  sweep: number,
  logoR: number,
  ringThickness: number,
  count: number,
) {
  const chord = 2 * logoR * Math.sin(Math.max(sweep, 0.05) / 2);
  const byChord = chord * 0.72;
  const byRing = ringThickness * 0.78;
  const byCount =
    count <= 5 ? 30 : count <= 8 ? 26 : count <= 10 ? 23 : 20;
  return Math.max(14, Math.min(byCount, byChord, byRing));
}

function SegmentLogo({
  ticker,
  src,
  x,
  y,
  size,
  clipId,
}: {
  ticker: string;
  src: string;
  x: number;
  y: number;
  size: number;
  clipId: string;
}) {
  const [broken, setBroken] = useState(false);
  const discR = size * 0.58;
  const imgSize = size * 1.05;
  const initial =
    ticker.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?";

  if (!broken && src) {
    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={discR}
          fill="#ffffff"
          opacity="0.94"
        />
        <defs>
          <clipPath id={clipId}>
            <circle cx={x} cy={y} r={discR * 0.92} />
          </clipPath>
        </defs>
        <image
          href={src}
          x={x - imgSize / 2}
          y={y - imgSize / 2}
          width={imgSize}
          height={imgSize}
          preserveAspectRatio="xMidYMid meet"
          clipPath={`url(#${clipId})`}
          onError={() => setBroken(true)}
        />
      </g>
    );
  }

  return (
    <g>
      <circle cx={x} cy={y} r={discR} fill="#ffffff" opacity="0.94" />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#0f172a"
        style={{
          fontSize: Math.max(7, size * 0.34),
          fontWeight: 800,
          letterSpacing: "0.02em",
        }}
      >
        {initial}
      </text>
    </g>
  );
}

/**
 * Homepage discover donut — brand-colored segments with sharp,
 * centered logos on light discs for clear visibility.
 */
export function HomePortfolioDonut({
  segments,
  size = 220,
}: {
  segments: HomeDonutSegment[];
  size?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const positive = segments.filter((s) => s.percent > 0);
  const chartTotal = positive.reduce((sum, s) => sum + s.percent, 0) || 100;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 3;
  const innerR = outerR * 0.52;
  const ringThickness = outerR - innerR;
  const logoR = (innerR + outerR) / 2;
  const count = Math.max(positive.length, 1);
  const glowId = `hpDonutGlow-${uid}`;

  let cursor = -Math.PI / 2;
  const drawn = positive.map((seg, index) => {
    const sweep = (seg.percent / chartTotal) * Math.PI * 2;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    const midAngle = startAngle + sweep / 2;
    const logoPos = polarToCartesian(cx, cy, logoR, midAngle);
    const iconSize = logoSizeForSegment(sweep, logoR, ringThickness, count);
    return {
      seg,
      index,
      logoPos,
      iconSize: Math.floor(iconSize),
      path: describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle),
      clipId: `hp-seg-${uid}-${index}`,
      logoClipId: `hp-logo-${uid}-${index}`,
    };
  });

  return (
    <div
      className="mx-auto shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Allocation chart with ${segments.length} assets totaling 100%`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block h-full w-full drop-shadow-[0_10px_28px_-18px_rgba(0,0,0,0.45)]"
      >
        <defs>
          {drawn.map((segment) => (
            <clipPath key={segment.clipId} id={segment.clipId}>
              <path d={segment.path} />
            </clipPath>
          ))}
          <radialGradient id={glowId} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {drawn.map((segment) => (
          <path
            key={`fill-${segment.seg.ticker}-${segment.index}`}
            d={segment.path}
            fill={segment.seg.color}
            stroke="#10172a"
            strokeWidth="1.5"
          />
        ))}

        {drawn.map((segment) => (
          <g
            key={`logo-${segment.seg.ticker}-${segment.index}`}
            clipPath={`url(#${segment.clipId})`}
          >
            <SegmentLogo
              ticker={segment.seg.ticker}
              src={segment.seg.src}
              x={segment.logoPos.x}
              y={segment.logoPos.y}
              size={segment.iconSize}
              clipId={segment.logoClipId}
            />
          </g>
        ))}

        <circle cx={cx} cy={cy} r={innerR - 1.5} fill="#10172a" />
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 1.5}
          fill={`url(#${glowId})`}
          opacity="0.55"
        />
        <text
          x={cx}
          y={cy - (size >= 200 ? 6 : 4)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f8fafc"
          style={{
            fontSize: Math.max(11, size * 0.045),
            fontWeight: 700,
          }}
        >
          {segments.length} Assets
        </text>
        <text
          x={cx}
          y={cy + (size >= 200 ? 12 : 10)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#94a3b8"
          style={{
            fontSize: Math.max(9, size * 0.028),
            fontWeight: 600,
          }}
        >
          100%
        </text>
      </svg>
    </div>
  );
}
