"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FloatingAssetBubble,
  type FloatingBubbleVariant,
} from "./FloatingAssetBubble";
import {
  allocationSizeRem,
  HERO_PORTFOLIO_ASSETS,
  type FloatingPortfolioAsset,
} from "./portfolioAssets";

type FloatingPortfolioProps = {
  className?: string;
  showBadge?: boolean;
  variant?: FloatingBubbleVariant;
};

type SimBubble = {
  id: string;
  asset: FloatingPortfolioAsset;
  x: number; // px
  y: number; // px
  vx: number;
  vy: number;
  r: number; // px radius
  depth: number;
  /** Permanent corridor — never flip sides after collision */
  side: "left" | "right";
};

function ctaRect(w: number, h: number, compact: boolean) {
  // Keep clear of Build Your Portfolio + Click to enter (center card)
  return compact
    ? {
        x0: w * 0.08,
        x1: w * 0.92,
        y0: h * 0.38,
        y1: h,
      }
    : {
        x0: w * 0.24,
        x1: w * 0.76,
        y0: h * 0.5,
        y1: h,
      };
}

/**
 * Keepout for logo + headline + CTA column.
 * Bubbles stay in side bands only — never cover brand, type, or CTA.
 */
function contentColumnAt(
  w: number,
  h: number,
  y: number,
  compact: boolean,
): { x0: number; x1: number } {
  if (!compact) {
    return { x0: w * 0.36, x1: w * 0.64 };
  }
  const t = y / Math.max(1, h);
  // Full content stack keepout (logo high → compact headline → CTA)
  if (t < 0.4) {
    return { x0: w * 0.3, x1: w * 0.7 };
  }
  return { x0: w * 0.28, x1: w * 0.72 };
}

function constrainBubble(
  b: SimBubble,
  width: number,
  height: number,
  compact: boolean,
  zone: { x0: number; x1: number; y0: number },
  fieldBottom: number,
) {
  const col = contentColumnAt(width, height, b.y, compact);
  const leftSide = b.side === "left";
  // Prefer clipping at the screen edge over covering logo/headline
  const edgeSlack = compact ? b.r * 0.42 : 4;

  if (leftSide) {
    // Right edge of bubble must stay left of content keepout
    const maxCenter = col.x0 - b.r - 6;
    const minCenter = -edgeSlack + 4;
    if (b.x > maxCenter) {
      b.x = maxCenter;
      b.vx = -Math.abs(b.vx) - 0.2;
    }
    if (b.x < minCenter) {
      b.x = minCenter;
      b.vx = Math.abs(b.vx) * 0.85;
    }
  } else {
    const minCenter = col.x1 + b.r + 6;
    const maxCenter = width + edgeSlack - 4;
    if (b.x < minCenter) {
      b.x = minCenter;
      b.vx = Math.abs(b.vx) + 0.2;
    }
    if (b.x > maxCenter) {
      b.x = maxCenter;
      b.vx = -Math.abs(b.vx) * 0.85;
    }
  }

  const minY = Math.max(6, b.r * 0.55);
  const maxY = fieldBottom - b.r * 0.55;
  if (b.y < minY) {
    b.y = minY;
    b.vy = Math.abs(b.vy) * 0.9;
  } else if (b.y > maxY) {
    b.y = maxY;
    b.vy = -Math.abs(b.vy) * 0.9;
  }

  // CTA floor — never cover Build Your Portfolio / Click to enter
  if (b.y + b.r > zone.y0 - 6 && b.x + b.r > zone.x0 && b.x - b.r < zone.x1) {
    b.y = zone.y0 - b.r - 12;
    b.vy = -Math.abs(b.vy) - 0.35;
  }

  // Re-apply horizontal keepout after CTA vertical push (y may have changed)
  const col2 = contentColumnAt(width, height, b.y, compact);
  if (leftSide) {
    b.x = Math.min(b.x, col2.x0 - b.r - 6);
    b.x = Math.max(b.x, -edgeSlack + 4);
  } else {
    b.x = Math.max(b.x, col2.x1 + b.r + 6);
    b.x = Math.min(b.x, width + edgeSlack - 4);
  }
}

function seedRevealPositions(
  assets: FloatingPortfolioAsset[],
  compact: boolean,
  width: number,
  height: number,
): SimBubble[] {
  const rootFs =
    typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16;

  return assets.map((asset, i) => {
    const base = compact
      ? (asset.mobile ?? {
          x: asset.desktop.x,
          y: Math.min(90, 10 + asset.desktop.y * 0.78),
          depth: asset.desktop.depth,
        })
      : asset.desktop;

    const left = base.x < 50;
    const side: "left" | "right" = left ? "left" : "right";
    const sizeRem = allocationSizeRem(asset.allocation, compact, "reveal");
    const r = (sizeRem * rootFs) / 2;
    const zone = ctaRect(width, height, compact);
    const fieldBottom = compact ? height * 0.94 : height * 0.88;

    const sideIndex = Math.floor(i / 2);
    const sideCount = Math.ceil(assets.length / 2);
    const ySlot = (sideIndex + 0.5) / sideCount;
    // Spread along the side; lower slots sit in outer corners beside CTA
    const y = Math.min(
      fieldBottom - r,
      Math.max(r + 12, height * (0.08 + ySlot * 0.78)),
    );
    const col = contentColumnAt(width, height, y, compact);
    let x = left
      ? Math.min(col.x0 - r - 8, width * 0.1)
      : Math.max(col.x1 + r + 8, width * 0.9);
    const edgeSlack = compact ? r * 0.42 : 4;
    x = left
      ? Math.min(x, col.x0 - r - 6)
      : Math.max(x, col.x1 + r + 6);
    x = Math.min(width + edgeSlack - 4, Math.max(-edgeSlack + 4, x));

    const speed = compact ? 0.32 : 0.48;
    const angle = (i / assets.length) * Math.PI * 2 + 0.55;
    const bubble: SimBubble = {
      id: asset.id,
      asset,
      x,
      y,
      vx: Math.cos(angle) * speed * (left ? 1 : -0.85),
      vy: Math.sin(angle * 1.25) * speed * 0.9,
      r,
      depth: base.depth,
      side,
    };
    constrainBubble(bubble, width, height, compact, zone, fieldBottom);
    return bubble;
  });
}

export function FloatingPortfolio({
  className = "",
  showBadge = true,
  variant = "default",
}: FloatingPortfolioProps) {
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isReveal = variant === "reveal";
  const stageRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<SimBubble[]>([]);
  const sizeRef = useRef({ w: 1, h: 1 });
  const [revealPositions, setRevealPositions] = useState<
    Record<string, { x: number; y: number; depth: number }>
  >({});

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isReveal || !mounted) return undefined;

    const el = stageRef.current;
    if (!el) return undefined;

    const publish = () => {
      const { w, h } = sizeRef.current;
      const next: Record<string, { x: number; y: number; depth: number }> = {};
      for (const b of simRef.current) {
        next[b.id] = {
          x: (b.x / w) * 100,
          y: (b.y / h) * 100,
          depth: b.depth,
        };
      }
      setRevealPositions(next);
    };

    const init = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 40 || height < 40) return;
      sizeRef.current = { w: width, h: height };
      const rootFs =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      simRef.current = seedRevealPositions(
        HERO_PORTFOLIO_ASSETS,
        compact,
        width,
        height,
      );
      // Resolve initial overlaps — prefer vertical separation on same side
      const bubbles = simRef.current;
      const zone = ctaRect(width, height, compact);
      const fieldBottom = compact ? height * 0.94 : height * 0.88;
      for (let pass = 0; pass < 6; pass++) {
        for (let i = 0; i < bubbles.length; i++) {
          for (let j = i + 1; j < bubbles.length; j++) {
            const a = bubbles[i];
            const b = bubbles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const minDist = a.r + b.r + (compact ? 14 : 12);
            if (dist < minDist) {
              const push = (minDist - dist) / 2;
              let nx = dx / dist;
              let ny = dy / dist;
              if (a.side === b.side) {
                // Same corridor: separate mostly vertically
                ny = ny === 0 ? (a.y <= b.y ? -1 : 1) : Math.sign(ny) || 1;
                nx *= 0.25;
                const nlen = Math.hypot(nx, ny) || 1;
                nx /= nlen;
                ny /= nlen;
              }
              a.x -= nx * push;
              a.y -= ny * push;
              b.x += nx * push;
              b.y += ny * push;
            }
          }
        }
        for (const b of bubbles) {
          b.r =
            (allocationSizeRem(b.asset.allocation, compact, "reveal") *
              rootFs) /
            2;
          constrainBubble(b, width, height, compact, zone, fieldBottom);
        }
      }
      publish();
    };

    init();
    if (reduce) return undefined;

    let raf = 0;
    let last = performance.now();
    let wanderT = 0;

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      wanderT += 0.01 * dt;

      const { width, height } = el.getBoundingClientRect();
      if (width < 40 || height < 40) {
        raf = requestAnimationFrame(tick);
        return;
      }
      sizeRef.current = { w: width, h: height };

      const rootFs =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const bubbles = simRef.current;
      const zone = ctaRect(width, height, compact);
      const fieldBottom = compact ? height * 0.94 : height * 0.88;
      const pad = compact ? 14 : 16;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.r =
          (allocationSizeRem(b.asset.allocation, compact, "reveal") * rootFs) /
          2;

        const phase = wanderT + i * 1.55;
        b.vx += Math.cos(phase) * 0.05 * dt;
        b.vy += Math.sin(phase * 0.9 + 0.8) * 0.055 * dt;

        const sp = Math.hypot(b.vx, b.vy);
        const maxSp = compact ? 0.8 : 1.25;
        if (sp > maxSp) {
          b.vx = (b.vx / sp) * maxSp;
          b.vy = (b.vy / sp) * maxSp;
        }

        b.x += b.vx * dt * 1.1;
        b.y += b.vy * dt * 1.1;
        constrainBubble(b, width, height, compact, zone, fieldBottom);
      }

      // Soft collisions then re-clamp corridors so bubbles never cover content
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < bubbles.length; i++) {
          for (let j = i + 1; j < bubbles.length; j++) {
            const a = bubbles[i];
            const b = bubbles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.001;
            const minDist = a.r + b.r + pad;
            if (dist < minDist) {
              const overlap = minDist - dist;
              let nx = dx / dist;
              let ny = dy / dist;
              if (a.side === b.side) {
                ny = ny === 0 ? (a.y <= b.y ? -1 : 1) : Math.sign(ny) || 1;
                nx *= 0.22;
                const nlen = Math.hypot(nx, ny) || 1;
                nx /= nlen;
                ny /= nlen;
              }
              const share = overlap * 0.55;
              a.x -= nx * share;
              a.y -= ny * share;
              b.x += nx * share;
              b.y += ny * share;
              const bounce = 0.14 * dt;
              a.vx -= nx * bounce;
              a.vy -= ny * bounce;
              b.vx += nx * bounce;
              b.vy += ny * bounce;
            }
          }
        }
        for (const b of bubbles) {
          constrainBubble(b, width, height, compact, zone, fieldBottom);
        }
      }

      for (const b of bubbles) {
        b.vx *= 0.99;
        b.vy *= 0.99;
      }

      publish();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isReveal, mounted, compact, reduce]);

  if (!mounted) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      />
    );
  }

  const assets =
    isReveal || !compact
      ? HERO_PORTFOLIO_ASSETS
      : HERO_PORTFOLIO_ASSETS.filter((a) => a.mobile);

  return (
    <div
      ref={stageRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-label="Illustrative portfolio allocation visualization"
    >
      <div
        className="absolute inset-[8%] rounded-[2rem] border border-white/[0.02]"
        aria-hidden
      />
      <div
        className="absolute inset-[16%] rounded-[1.75rem] border border-electric/[0.04]"
        aria-hidden
      />

      {showBadge ? (
        <motion.div
          className="absolute left-1/2 top-[calc(5rem+0.75rem)] z-[5] -translate-x-1/2 lg:top-[calc(5rem+1.25rem)]"
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="rounded-full border border-line bg-void/75 px-3 py-1.5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-3.5">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Portfolio
            </p>
            <p className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
              100% allocated
            </p>
          </div>
        </motion.div>
      ) : null}

      {assets.map((asset) => {
        const base = compact
          ? (asset.mobile ?? {
              x: asset.desktop.x,
              y: Math.min(90, 10 + asset.desktop.y * 0.78),
              depth: asset.desktop.depth,
            })
          : asset.desktop;

        const position = isReveal
          ? (revealPositions[asset.id] ?? {
              x: base.x < 50 ? 20 : 80,
              y: 22,
              depth: base.depth,
            })
          : base;

        return (
          <FloatingAssetBubble
            key={asset.id}
            asset={asset}
            compact={compact}
            position={position}
            variant={variant}
            physicsDriven={isReveal}
          />
        );
      })}
    </div>
  );
}
