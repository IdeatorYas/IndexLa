"use client";

import { useState } from "react";

type AssetLogoProps = {
  ticker: string;
  name: string;
  src?: string;
  size?: number;
  className?: string;
};

export function AssetLogo({
  ticker,
  name,
  src,
  size = 28,
  className = "",
}: AssetLogoProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-panel ${className}`}
      style={{ width: size, height: size }}
      title={name}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={Math.round(size * 0.68)}
          height={Math.round(size * 0.68)}
          className="object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="font-semibold uppercase tracking-tight text-ink"
          style={{ fontSize: Math.max(9, size * 0.32) }}
        >
          {ticker.slice(0, 2)}
        </span>
      )}
    </span>
  );
}
