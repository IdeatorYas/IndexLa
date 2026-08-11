"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkBody,
  tkH2,
  tkSection,
  tkStat,
  tkSurface,
  tkSurfaceSoft,
} from "@/components/tokenomics/tokenomicsRhythm";

const slices = [
  { label: "Public Sale", pct: "3%", width: "20.34%" },
  { label: "DEX Liquidity", pct: "10%", width: "67.8%" },
  { label: "CEX Listings", pct: "0.75%", width: "5.08%" },
  { label: "Other unlocked allocations", pct: "1%", width: "6.78%" },
] as const;

export function TgeCirculatingSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Initial Circulating{" "}
            <span className="gradient-text">Supply</span>
          </h2>
          <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-electric">
            14.75% TGE Float
          </p>
          <p className={`mt-3 ${tkStat} gradient-text`}>14.75M $DEXLA</p>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className={`mx-auto max-w-3xl ${tkSurface} p-5 sm:p-7`}>
            <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Initial circulating supply
            </p>

            <div className="mt-5 flex h-3 overflow-hidden rounded-full border border-white/[0.08]">
              <div className="h-full bg-electric" style={{ width: slices[0].width }} />
              <div className="h-full bg-[#22d3ee]" style={{ width: slices[1].width }} />
              <div className="h-full bg-[#f87171]" style={{ width: slices[2].width }} />
              <div className="h-full bg-[#a78bfa]" style={{ width: slices[3].width }} />
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {slices.map((row) => (
                <li
                  key={row.label}
                  className={`${tkSurfaceSoft} flex items-center justify-between gap-3 px-3.5 py-3`}
                >
                  <span className="text-[0.9rem] font-medium text-ink">
                    {row.label}
                  </span>
                  <span className="display text-[1.1rem] tabular-nums text-electric">
                    {row.pct}
                  </span>
                </li>
              ))}
            </ul>

            <p className={`mt-5 text-center ${tkBody}`}>
              14.75% of total supply at TGE.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
