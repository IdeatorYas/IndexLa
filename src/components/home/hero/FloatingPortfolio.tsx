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
  /** When false, hides the centered Portfolio / 100% allocated badge */
  showBadge?: boolean;
  /** Reveal mode: allocation-sized circular bubbles (homepage Hero has no bubbles) */
  variant?: FloatingBubbleVariant;
};

type SimBubble = {
  id: string;
  asset: FloatingPortfolioAsset;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
};

/** Center CTA panel — bubbles must stay out of this zone */
function ctaSafeZone(compact: boolean) {
  return compact
    ? { x0: 12, x1: 88, y0: 54, y1: 98 }
    : { x0: 26, x1: 74, y0: 52, y1: 97 };
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
    const x = left
      ? Math.min(30, Math.max(14, 12 + base.x * 0.4))
      : Math.max(70, Math.min(86, 70 + (base.x - 50) * 0.34));
    let y = Math.max(14, Math.min(48, 12 + (base.y / 100) * 42));

    // Alternate upper bands so seeds don't stack
    if (i % 3 === 1) y = Math.min(50, y + 6);
    if (i % 3 === 2) y = Math.max(12, y - 4);

    const sizeRem = allocationSizeRem(asset.allocation, compact, "reveal");
    const diameterPx = sizeRem * rootFs;
    const r = (diameterPx / 2 / Math.min(width, height)) * 100;

    const speed = 0.028 + (i % 4) * 0.006;
    const angle = (i / assets.length) * Math.PI * 2 + 0.4;
    return {
      id: asset.id,
      asset,
      x,
      y,
      vx: Math.cos(angle) * speed * (left ? 1 : -1),
      vy: Math.sin(angle * 1.3) * speed * 0.9,
      r: Math.max(4.2, r),
      depth: base.depth,
    };
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

    const assets = HERO_PORTFOLIO_ASSETS;
    const init = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 40 || height < 40) return;
      simRef.current = seedRevealPositions(assets, compact, width, height);
      const next: Record<string, { x: number; y: number; depth: number }> = {};
      for (const b of simRef.current) {
        next[b.id] = { x: b.x, y: b.y, depth: b.depth };
      }
      setRevealPositions(next);
    };

    init();

    if (reduce) return undefined;

    let raf = 0;
    let last = performance.now();
    let wanderT = 0;

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      wanderT += 0.008 * dt;

      const { width, height } = el.getBoundingClientRect();
      if (width < 40 || height < 40) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const rootFs =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const bubbles = simRef.current;
      const zone = ctaSafeZone(compact);
      const pad = 1.35;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const sizeRem = allocationSizeRem(b.asset.allocation, compact, "reveal");
        const diameterPx = sizeRem * rootFs;
        b.r = Math.max(
          4.2,
          (diameterPx / 2 / Math.min(width, height)) * 100,
        );

        // Slow wander — premium, not frantic
        const phase = wanderT + i * 1.7;
        b.vx += Math.cos(phase) * 0.0045 * dt;
        b.vy += Math.sin(phase * 0.85 + 1.1) * 0.004 * dt;

        // Soft speed cap
        const sp = Math.hypot(b.vx, b.vy);
        const maxSp = 0.055;
        if (sp > maxSp) {
          b.vx = (b.vx / sp) * maxSp;
          b.vy = (b.vy / sp) * maxSp;
        }

        b.x += b.vx * dt * 18;
        b.y += b.vy * dt * 18;

        // Walls
        const minX = b.r + 1;
        const maxX = 100 - b.r - 1;
        const minY = b.r + 1;
        const maxY = Math.min(52, 100 - b.r - 1); // keep upper/mid field; CTA below
        if (b.x < minX) {
          b.x = minX;
          b.vx = Math.abs(b.vx) * 0.85;
        } else if (b.x > maxX) {
          b.x = maxX;
          b.vx = -Math.abs(b.vx) * 0.85;
        }
        if (b.y < minY) {
          b.y = minY;
          b.vy = Math.abs(b.vy) * 0.85;
        } else if (b.y > maxY) {
          b.y = maxY;
          b.vy = -Math.abs(b.vy) * 0.85;
        }

        // CTA safe-zone repulsion (expanded by bubble radius)
        const zx0 = zone.x0 - b.r * 0.15;
        const zx1 = zone.x1 + b.r * 0.15;
        const zy0 = zone.y0 - b.r * 0.35;
        const zy1 = zone.y1;
        if (b.x > zx0 && b.x < zx1 && b.y > zy0 && b.y < zy1) {
          const cx = (zx0 + zx1) / 2;
          const cy = zy0;
          const dx = b.x - cx;
          const dy = b.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const push = 0.55 * dt;
          b.x += (dx / dist) * push * 8;
          b.y += (dy / dist) * push * 10 - 0.35 * dt;
          b.vx += (dx / dist) * 0.02 * dt;
          b.vy -= 0.03 * dt;
        }
      }

      // Pairwise soft collision — never cover content
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i];
          const b = bubbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = (a.r + b.r) * pad;
          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            const share = overlap * 0.5;
            a.x -= nx * share;
            a.y -= ny * share;
            b.x += nx * share;
            b.y += ny * share;
            const bounce = 0.018 * dt;
            a.vx -= nx * bounce;
            a.vy -= ny * bounce;
            b.vx += nx * bounce;
            b.vy += ny * bounce;
          }
        }
      }

      // Light damping
      for (const b of bubbles) {
        b.vx *= 0.992;
        b.vy *= 0.992;
      }

      const next: Record<string, { x: number; y: number; depth: number }> = {};
      for (const b of bubbles) {
        next[b.id] = { x: b.x, y: b.y, depth: b.depth };
      }
      setRevealPositions(next);
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
              x: base.x < 50 ? 18 : 82,
              y: 28,
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
