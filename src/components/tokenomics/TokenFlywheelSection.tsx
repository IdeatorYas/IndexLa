"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkH2,
  tkSection,
} from "@/components/tokenomics/tokenomicsRhythm";

const nodes = [
  {
    id: "creators",
    title: "Creators",
    detail: "Publish / Feature",
    sub: "$DEXLA Usage",
    x: 50,
    y: 14,
    tone: "utility" as const,
  },
  {
    id: "investors",
    title: "Investors",
    detail: "Hold / Tip",
    sub: "$DEXLA Usage",
    x: 86,
    y: 50,
    tone: "utility" as const,
  },
  {
    id: "activity",
    title: "INDEXLA Activity",
    detail: "Execution / Treasury",
    sub: "Buybacks",
    x: 50,
    y: 86,
    tone: "neutral" as const,
  },
  {
    id: "burns",
    title: "$DEXLA",
    detail: "Permanent Burns",
    sub: "Supply ↓",
    x: 14,
    y: 50,
    tone: "burn" as const,
  },
] as const;

export function TokenFlywheelSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA{" "}
            <span className="gradient-text">Flywheel</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="relative mx-auto max-w-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-b from-deep/80 to-void/90 px-3 py-8 sm:px-6 sm:py-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse 45% 45% at 50% 50%, rgba(56,189,248,0.1), transparent 65%)",
              }}
              aria-hidden
            />

            {/* Desktop / tablet circular diagram */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] md:block">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="rgba(167,139,250,0.18)"
                  strokeWidth="0.6"
                  strokeDasharray="2.2 1.8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="rgba(56,189,248,0.45)"
                  strokeWidth="0.55"
                  strokeDasharray="12 160"
                  strokeLinecap="round"
                  initial={reduce ? false : { rotate: 0 }}
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 18, repeat: Infinity, ease: "linear" }
                  }
                  style={{ transformOrigin: "50px 50px" }}
                />
                {/* Directional arcs (clockwise) */}
                <path
                  d="M 58 18 A 28 28 0 0 1 82 42"
                  fill="none"
                  stroke="rgba(56,189,248,0.35)"
                  strokeWidth="0.5"
                  markerEnd="url(#fw-arrow)"
                />
                <path
                  d="M 82 58 A 28 28 0 0 1 58 82"
                  fill="none"
                  stroke="rgba(56,189,248,0.35)"
                  strokeWidth="0.5"
                  markerEnd="url(#fw-arrow)"
                />
                <path
                  d="M 42 82 A 28 28 0 0 1 18 58"
                  fill="none"
                  stroke="rgba(248,113,113,0.4)"
                  strokeWidth="0.5"
                  markerEnd="url(#fw-arrow-burn)"
                />
                <path
                  d="M 18 42 A 28 28 0 0 1 42 18"
                  fill="none"
                  stroke="rgba(56,189,248,0.35)"
                  strokeWidth="0.5"
                  markerEnd="url(#fw-arrow)"
                />
                <defs>
                  <marker
                    id="fw-arrow"
                    markerWidth="4"
                    markerHeight="4"
                    refX="3"
                    refY="2"
                    orient="auto"
                  >
                    <path d="M0,0 L4,2 L0,4 Z" fill="rgba(56,189,248,0.7)" />
                  </marker>
                  <marker
                    id="fw-arrow-burn"
                    markerWidth="4"
                    markerHeight="4"
                    refX="3"
                    refY="2"
                    orient="auto"
                  >
                    <path d="M0,0 L4,2 L0,4 Z" fill="rgba(248,113,113,0.75)" />
                  </marker>
                </defs>
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 w-[7.5rem] -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  $DEXLA
                </p>
                <p className="mt-1 display text-[1.05rem] tracking-[-0.02em] text-ink">
                  Flywheel
                </p>
              </div>

              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute z-10 w-[9.5rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`border px-3 py-3 text-center ${
                      node.tone === "burn"
                        ? "border-danger/40 bg-danger/[0.1]"
                        : node.tone === "utility"
                          ? "border-success/35 bg-success/[0.07]"
                          : "border-white/[0.12] bg-void/90"
                    }`}
                  >
                    <p className="display text-[0.95rem] tracking-[-0.02em] text-ink">
                      {node.title}
                    </p>
                    <p className="mt-1.5 text-[0.78rem] font-medium text-muted">
                      {node.detail}
                    </p>
                    <p
                      className={`mt-1 text-[0.78rem] font-semibold ${
                        node.tone === "burn"
                          ? "text-danger"
                          : node.tone === "utility"
                            ? "text-success"
                            : "text-electric"
                      }`}
                    >
                      {node.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile vertical loop */}
            <div className="relative space-y-0 md:hidden">
              {nodes.map((node, i) => (
                <div key={node.id}>
                  <div
                    className={`mx-auto max-w-xs border px-4 py-4 text-center ${
                      node.tone === "burn"
                        ? "border-danger/40 bg-danger/[0.1]"
                        : node.tone === "utility"
                          ? "border-success/35 bg-success/[0.07]"
                          : "border-white/[0.12] bg-void/70"
                    }`}
                  >
                    <p className="display text-[1.05rem] text-ink">{node.title}</p>
                    <p className="mt-1.5 text-[0.88rem] text-muted">{node.detail}</p>
                    <p
                      className={`mt-1 text-[0.88rem] font-semibold ${
                        node.tone === "burn"
                          ? "text-danger"
                          : node.tone === "utility"
                            ? "text-success"
                            : "text-electric"
                      }`}
                    >
                      {node.sub}
                    </p>
                  </div>
                  <div
                    className={`flex justify-center py-2 text-sm ${
                      i === nodes.length - 1 ? "text-danger/55" : "text-muted-dim"
                    }`}
                    aria-hidden
                  >
                    {i === nodes.length - 1 ? "↻ loop" : "↓"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mt-6 text-center">
          <p className="text-[0.95rem] font-semibold text-ink text-balance sm:text-[1.02rem]">
            Creators → Investors → Activity → Buybacks →{" "}
            <span className="text-danger">Permanent burns</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
