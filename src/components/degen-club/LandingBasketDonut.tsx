"use client";

import { useId, useState } from "react";
import {
  MEME_COIN_COLORS,
  resolveMemeLogoSrc,
} from "@/components/degen-club/memeLogos";

export type LandingDonutSegment = {
  ticker: string;
  percent: number;
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
        : count <= 10
          ? size * 0.12
          : size * 0.1;
  return Math.max(14, Math.min(byCount, byChord, byRing));
}

function segmentColor(ticker: string, index: number): string {
  return (
    MEME_COIN_COLORS[ticker.toUpperCase()] ??
    MEME_COIN_COLORS[ticker] ??
    [
      "#38bdf8",
      "#a78bfa",
      "#f59e0b",
      "#34d399",
      "#f472b6",
      "#fb7185",
      "#22d3ee",
      "#c084fc",
    ][index % 8]
  );
}

function SegmentEmbeddedLogo({
  ticker,
  src,
  x,
  y,
  size,
  maskId,
}: {
  ticker: string;
  src: string | null;
  x: number;
  y: number;
  size: number;
  maskId: string;
}) {
  const [broken, setBroken] = useState(false);
  const imgSize = size * 1.55;
  const usable = src && !broken ? src : null;
  const initial = ticker.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?";

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
 * Landing-page allocation donut (matches DEGEN CLUB app visual language):
 * brand-colored segments with soft-embedded asset logos.
 */
export function LandingBasketDonut({
  segments,
  size = 168,
}: {
  segments: LandingDonutSegment[];
  size?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const positive = segments.filter((s) => s.percent > 0);
  const chartTotal = positive.reduce((sum, s) => sum + s.percent, 0) || 100;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.5;
  const ringThickness = outerR - innerR;
  const logoR = (innerR + outerR) / 2;
  const count = Math.max(positive.length, 1);

  let cursor = -Math.PI / 2;
  const drawn = positive.map((seg, index) => {
    const sweep = (seg.percent / chartTotal) * Math.PI * 2;
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
    return {
      seg,
      index,
      logoPos,
      iconSize: Math.floor(iconSize),
      color: segmentColor(seg.ticker, index),
      path: describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle),
      clipId: `lb-seg-${uid}-${index}`,
      fadeId: `lb-fade-${uid}-${index}`,
      logoSrc: resolveMemeLogoSrc(seg.ticker),
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
        className="block h-full w-full drop-shadow-[0_8px_24px_-10px_rgba(56,189,248,0.4)]"
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
          <radialGradient id={`lbCenterGlow-${uid}`} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {drawn.map((segment) => (
          <path
            key={`fill-${segment.seg.ticker}-${segment.index}`}
            d={segment.path}
            fill={segment.color}
            stroke="rgba(7,11,24,0.55)"
            strokeWidth="1.25"
          />
        ))}

        {drawn.map((segment) => (
          <g
            key={`logo-${segment.seg.ticker}-${segment.index}`}
            clipPath={`url(#${segment.clipId})`}
          >
            <SegmentEmbeddedLogo
              ticker={segment.seg.ticker}
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
          fill={`url(#lbCenterGlow-${uid})`}
          opacity="0.7"
        />
        <text
          x={cx}
          y={cy - size * 0.035}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f8fafc"
          style={{
            fontSize: Math.max(11, size * 0.075),
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
            fontSize: Math.max(10, size * 0.045),
            fontWeight: 700,
          }}
        >
          100%
        </text>
      </svg>
    </div>
  );
}
