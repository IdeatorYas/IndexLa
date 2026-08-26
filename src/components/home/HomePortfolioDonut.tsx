"use client";

import { useId, useState } from "react";
import { ASSETS, ASSET_BRAND_COLORS, type AssetKey } from "@/lib/site";

export type HomeDonutSegment = {
  key: AssetKey;
  pct: number;
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
  size: number,
) {
  const chord = 2 * logoR * Math.sin(Math.max(sweep, 0.05) / 2);
  const byChord = chord * 0.78;
  const byRing = ringThickness * 0.82;
  const byCount =
    count <= 5
      ? size * 0.18
      : count <= 8
        ? size * 0.14
        : size * 0.12;
  return Math.max(16, Math.min(byCount, byChord, byRing));
}

function SegmentEmbeddedLogo({
  src,
  ticker,
  x,
  y,
  size,
  maskId,
}: {
  src: string;
  ticker: string;
  x: number;
  y: number;
  size: number;
  maskId: string;
}) {
  const [broken, setBroken] = useState(false);
  const imgSize = size * 1.55;
  const usable = !broken ? src : null;
  const initial =
    ticker.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?";

  if (usable) {
    return (
      <g mask={`url(#${maskId})`}>
        <image
          href={usable}
          x={x - imgSize / 2}
          y={y - imgSize / 2}
          width={imgSize}
          height={imgSize}
          preserveAspectRatio="xMidYMid slice"
          onError={() => setBroken(true)}
        />
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y + 1}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#ffffff"
      style={{
        fontSize: Math.max(9, size * 0.42),
        fontWeight: 900,
        letterSpacing: "0.02em",
      }}
    >
      {initial}
    </text>
  );
}

/**
 * Homepage discover donut: brand-colored segments with logos embedded in the ring.
 */
export function HomePortfolioDonut({
  segments,
  size = 220,
}: {
  segments: HomeDonutSegment[];
  size?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const positive = segments.filter((s) => s.pct > 0);
  const chartTotal = positive.reduce((sum, s) => sum + s.pct, 0) || 100;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.48;
  const ringThickness = outerR - innerR;
  const logoR = (innerR + outerR) / 2;
  const count = Math.max(positive.length, 1);

  let cursor = -Math.PI / 2;
  const drawn = positive.map((seg, index) => {
    const sweep = (seg.pct / chartTotal) * Math.PI * 2;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    const midAngle = startAngle + sweep / 2;
    const logoPos = polarToCartesian(cx, cy, logoR, midAngle);
    const iconSize = logoSizeForSegment(
      sweep,
      logoR,
      ringThickness,
      count,
      size,
    );
    const meta = ASSETS[seg.key];
    return {
      seg,
      index,
      logoPos,
      iconSize: Math.floor(iconSize),
      color: ASSET_BRAND_COLORS[seg.key],
      path: describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle),
      clipId: `hp-seg-${uid}-${index}`,
      fadeId: `hp-fade-${uid}-${index}`,
      logoSrc: meta.src,
      ticker: meta.ticker,
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
        className="block h-full w-full drop-shadow-[0_10px_28px_-12px_rgba(56,189,248,0.45)]"
      >
        <defs>
          {drawn.map((segment) => (
            <clipPath key={segment.clipId} id={segment.clipId}>
              <path d={segment.path} />
            </clipPath>
          ))}
          {drawn.map((segment) => (
            <radialGradient
              key={segment.fadeId}
              id={segment.fadeId}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="62%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          ))}
          {drawn.map((segment) => (
            <mask
              key={`mask-${segment.fadeId}`}
              id={`mask-${segment.fadeId}`}
              maskUnits="userSpaceOnUse"
            >
              <circle
                cx={segment.logoPos.x}
                cy={segment.logoPos.y}
                r={segment.iconSize * 0.72}
                fill={`url(#${segment.fadeId})`}
              />
            </mask>
          ))}
          <radialGradient id={`hpCenterGlow-${uid}`} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {drawn.map((segment) => (
          <path
            key={`fill-${segment.seg.key}-${segment.index}`}
            d={segment.path}
            fill={segment.color}
            stroke="rgba(7,11,24,0.55)"
            strokeWidth="1.25"
          />
        ))}

        {drawn.map((segment) => (
          <g
            key={`logo-${segment.seg.key}-${segment.index}`}
            clipPath={`url(#${segment.clipId})`}
          >
            <SegmentEmbeddedLogo
              ticker={segment.ticker}
              src={segment.logoSrc}
              x={segment.logoPos.x}
              y={segment.logoPos.y}
              size={segment.iconSize}
              maskId={`mask-${segment.fadeId}`}
            />
          </g>
        ))}

        <circle cx={cx} cy={cy} r={innerR - 1} fill="#10172a" />
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 1}
          fill={`url(#hpCenterGlow-${uid})`}
          opacity="0.7"
        />
        <text
          x={cx}
          y={cy - size * 0.035}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f8fafc"
          style={{
            fontSize: Math.max(12, size * 0.075),
            fontWeight: 800,
          }}
        >
          {segments.length} Assets
        </text>
        <text
          x={cx}
          y={cy + size * 0.055}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#22d3ee"
          style={{
            fontSize: Math.max(11, size * 0.048),
            fontWeight: 700,
          }}
        >
          100%
        </text>
      </svg>
    </div>
  );
}
