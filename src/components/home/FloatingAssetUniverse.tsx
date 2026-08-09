"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { ASSETS, HERO_ASSETS, type AssetKey } from "@/lib/site";

const depthStyles = {
  0: { opacity: 0.55, blur: false, z: 1 },
  1: { opacity: 0.85, blur: false, z: 2 },
  2: { opacity: 1, blur: false, z: 3 },
} as const;

export function FloatingAssetUniverse() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {/* Orbital rings — institutional depth, not clutter */}
      <div className="absolute left-1/2 top-[46%] h-[min(88vw,48rem)] w-[min(88vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple/15" />
      <div className="absolute left-1/2 top-[46%] h-[min(68vw,36rem)] w-[min(68vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/12" />
      <div className="absolute left-1/2 top-[46%] h-[min(46vw,24rem)] w-[min(46vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-bright/10" />
      <div
        className="absolute left-1/2 top-[46%] h-[min(28vw,14rem)] w-[min(28vw,14rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Desktop constellation */}
      <div className="absolute inset-0 hidden md:block">
        {HERO_ASSETS.map((item) => (
          <div
            key={item.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{
              left: item.x,
              top: item.y,
              zIndex: depthStyles[item.depth].z,
              opacity: depthStyles[item.depth].opacity,
            }}
          >
            <Bubble
              asset={item.key}
              size={item.size}
              delay={item.delay}
              depth={item.depth}
              reduce={reduce}
            />
          </div>
        ))}
      </div>

      {/* Mobile — fewer overlapping, edge orbit */}
      <div className="absolute inset-0 md:hidden">
        {HERO_ASSETS.filter((a) => a.depth >= 1).map((item) => (
          <div
            key={`m-${item.key}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: item.mx ?? item.x,
              top: item.my ?? item.y,
              opacity: 0.9,
            }}
          >
            <Bubble
              asset={item.key}
              size={item.mSize ?? 30}
              delay={item.delay}
              depth={item.depth}
              reduce={reduce}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Bubble({
  asset,
  size,
  delay,
  depth,
  reduce,
}: {
  asset: AssetKey;
  size: number;
  delay: number;
  depth: 0 | 1 | 2;
  reduce: boolean | null;
}) {
  const drift = depth === 2 ? 11 : depth === 1 ? 8 : 5;
  const duration = 7 + delay * 4 + depth;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        animate={reduce ? undefined : { y: [0, -drift, 0] }}
        transition={{
          y: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay * 1.5,
          },
          scale: { type: "spring", stiffness: 280, damping: 20 },
        }}
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 55%, rgba(124,58,237,0.08) 100%)",
          boxShadow:
            depth === 2
              ? "0 18px 40px rgba(0,0,0,0.4), 0 0 28px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.18)"
              : "0 12px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12)",
          border: "1px solid rgba(167, 139, 250, 0.22)",
          backdropFilter: "blur(14px)",
        }}
        title={ASSETS[asset].name}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 28% 22%, rgba(56,189,248,0.32), transparent 52%), radial-gradient(circle at 78% 72%, rgba(124,58,237,0.28), transparent 48%)",
          }}
        />
        <AssetLogo
          asset={asset}
          size={Math.round(size * 0.44)}
          className="relative z-[1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </motion.div>
  );
}
