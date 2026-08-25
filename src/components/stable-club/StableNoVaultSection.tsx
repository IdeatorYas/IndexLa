"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { renderBold } from "@/components/stable-club/StableShared";
import { scH2, scSectionAlt } from "@/components/stable-club/stableRhythm";
import type { StableSection } from "@/lib/stable-club";

function VaultComparisonVisual() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Traditional */}
      <div className="sc-card p-5 sm:p-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--sc-muted)]">
          Traditional
        </p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="w-full max-w-[12rem] rounded-xl border border-[var(--sc-line)] bg-[var(--sc-bg-alt)] px-4 py-3 text-center text-[0.88rem] font-semibold text-[var(--sc-navy)]">
            Wallet
          </div>
          <span className="text-[var(--sc-muted)]" aria-hidden>
            ↓
          </span>
          <div className="relative w-full max-w-[12rem] rounded-xl border-2 border-dashed border-[#dc2626]/40 bg-[#fef2f2] px-4 py-3 text-center">
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-[1.75rem] font-light text-[#dc2626]/35"
              aria-hidden
            >
              ✕
            </span>
            <p className="relative text-[0.88rem] font-semibold text-[#991b1b] line-through decoration-[#dc2626]/60">
              Vault
            </p>
          </div>
          <span className="text-[var(--sc-muted)]" aria-hidden>
            ↓
          </span>
          <div className="w-full max-w-[12rem] rounded-xl border border-[var(--sc-line)] bg-[var(--sc-bg-alt)] px-4 py-3 text-center text-[0.88rem] font-semibold text-[var(--sc-navy-muted)]">
            Protocol
          </div>
        </div>
      </div>

      {/* STABLE CLUB */}
      <div className="sc-card-elevated border-[var(--sc-line-strong)] p-5 sm:p-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--sc-teal)]">
          STABLE CLUB
        </p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="w-full max-w-[12rem] rounded-xl border border-[var(--sc-blue)]/25 bg-[var(--sc-blue-soft)] px-4 py-3 text-center text-[0.88rem] font-semibold text-[var(--sc-navy)]">
            Wallet
          </div>
          <span className="font-semibold text-[var(--sc-teal)]" aria-hidden>
            ↓
          </span>
          <div className="w-full max-w-[12rem] rounded-xl border border-[var(--sc-teal)]/30 bg-[var(--sc-teal-soft)] px-4 py-3 text-center text-[0.88rem] font-semibold text-[var(--sc-navy)]">
            Liquidity Pool
          </div>
        </div>
        <p className="mt-5 rounded-lg bg-[var(--sc-green-soft)] px-3 py-2.5 text-center text-[0.88rem] font-semibold text-[var(--sc-green)]">
          One less place to get hacked
        </p>
      </div>
    </div>
  );
}

export function StableNoVaultSection({ section }: { section: StableSection }) {
  const italic = section.blocks.find((b) => b.type === "italic");
  const copyBlocks = section.blocks.filter(
    (b) => b.type !== "italic" && b.type !== "h2"
  );

  return (
    <section className={scSectionAlt}>
      <div className="section-pad container-max">
        <FadeIn>
          <h2 className={`mx-auto max-w-3xl text-center ${scH2}`}>{section.title}</h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3.5">
            {copyBlocks.map((block, i) =>
              block.type === "p" ? (
                <p key={i} className="sc-body text-center">
                  {renderBold(block.text)}
                </p>
              ) : null
            )}
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <VaultComparisonVisual />
          </div>

          {italic ? (
            <p className="mx-auto mt-6 max-w-2xl text-center italic sc-body text-[var(--sc-muted)]">
              {italic.text}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
