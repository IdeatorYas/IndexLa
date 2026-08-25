"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  renderBold,
  StableCta,
  StablecoinBadge,
} from "@/components/stable-club/StableShared";
import { scBody, scBodyStrong, scEyebrow, scH1 } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

function HeroFlowVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="sc-card-elevated relative overflow-hidden p-5 sm:p-6 lg:p-7">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(37,99,235,0.06), transparent 70%)",
        }}
        aria-hidden
      />
      <p className="relative text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--sc-muted)]">
        Direct liquidity flow
      </p>

      <svg
        viewBox="0 0 420 280"
        className="relative mx-auto mt-4 w-full max-w-[26rem]"
        aria-hidden
      >
        {/* Wallet */}
        <rect x="24" y="100" width="88" height="72" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="68" y="132" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">
          User
        </text>
        <text x="68" y="150" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">
          Wallet
        </text>
        <circle cx="52" cy="118" r="6" fill="#2563eb" opacity="0.85" />
        <circle cx="68" cy="118" r="6" fill="#0d9488" opacity="0.85" />

        {/* Arrow 1 */}
        <line
          x1="112"
          y1="136"
          x2="148"
          y2="136"
          stroke="#2563eb"
          strokeWidth="2"
          className={reduce ? undefined : "sc-flow-line"}
        />
        <polygon points="148,131 158,136 148,141" fill="#2563eb" />

        {/* Limited Permission */}
        <rect x="158" y="108" width="104" height="56" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="210" y="132" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="600">
          Limited
        </text>
        <text x="210" y="148" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="600">
          Permission
        </text>

        {/* Arrow 2 */}
        <line
          x1="262"
          y1="136"
          x2="298"
          y2="136"
          stroke="#0d9488"
          strokeWidth="2"
          className={reduce ? undefined : "sc-flow-line"}
        />
        <polygon points="298,131 308,136 298,141" fill="#0d9488" />

        {/* Liquidity Pool */}
        <rect x="308" y="88" width="88" height="96" rx="14" fill="#fff" stroke="#0d9488" strokeWidth="1.5" />
        <text x="352" y="118" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">
          Liquidity
        </text>
        <text x="352" y="134" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">
          Pool
        </text>
        <circle cx="332" cy="158" r="10" fill="#2563eb" opacity="0.9" />
        <text x="332" y="162" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
          $
        </text>
        <circle cx="352" cy="168" r="10" fill="#059669" opacity="0.9" />
        <text x="352" y="172" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
          ₮
        </text>
        <circle cx="372" cy="158" r="10" fill="#2563eb" opacity="0.7" />
        <text x="372" y="162" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
          $
        </text>

        {/* Flow tokens */}
        {!reduce ? (
          <>
            <motion.circle
              cx="130"
              cy="136"
              r="5"
              fill="#2563eb"
              animate={{ cx: [130, 210, 290, 340], opacity: [0, 1, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="130"
              cy="128"
              r="4"
              fill="#059669"
              animate={{ cx: [130, 210, 290, 360], opacity: [0, 1, 1, 0.6] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear", delay: 0.8 }}
            />
          </>
        ) : null}

        <text x="210" y="210" textAnchor="middle" fill="#64748b" fontSize="10">
          USDC / USDT → established pools
        </text>
      </svg>

      <div className="relative mt-4 flex items-center justify-center gap-4">
        <StablecoinBadge symbol="USDC" color="#2563eb" size="sm" />
        <StablecoinBadge symbol="USDT" color="#059669" size="sm" />
        <span className="text-[0.82rem] font-medium text-[var(--sc-muted)]">
          Direct pool deposit
        </span>
      </div>
    </div>
  );
}

function heroBlocks(blocks: StableBlock[]) {
  const h2 = blocks.find((b) => b.type === "h2");
  const cta = blocks.find((b) => b.type === "cta");
  const highlight = blocks.find(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b.type === "p" &&
      b.text.includes("No lending") &&
      b.text.includes("No borrowing")
  );
  const body = blocks.filter(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b.type === "p" &&
      b !== highlight &&
      !b.text.startsWith("**No lending")
  );

  return { h2, cta, highlight, body };
}

export function StableHeroSection({ section }: { section: StableSection }) {
  const reduce = useReducedMotion();
  const { h2, cta, highlight, body } = heroBlocks(section.blocks);

  return (
    <section className="relative isolate overflow-hidden sc-hero-glow">
      <div className="section-pad container-max relative z-10 grid items-center gap-10 pb-12 pt-[5.5rem] lg:min-h-[92svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-14 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={scEyebrow}>{section.title}</p>
          {h2 ? <h1 className={`mt-3 ${scH1}`}>{h2.text}</h1> : null}

          <div className="mt-5 space-y-3.5">
            {body.map((block, i) =>
              block.type === "p" ? (
                <p key={i} className={scBody}>
                  {renderBold(block.text)}
                </p>
              ) : null
            )}
          </div>

          {highlight ? (
            <div className="sc-highlight-band mt-6">
              <p className={`text-center sm:text-left ${scBodyStrong}`}>
                {renderBold(highlight.text)}
              </p>
            </div>
          ) : null}

          {cta?.type === "cta" ? (
            <div className="mt-8">
              <StableCta label={cta.text} />
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroFlowVisual />
        </motion.div>
      </div>
    </section>
  );
}
