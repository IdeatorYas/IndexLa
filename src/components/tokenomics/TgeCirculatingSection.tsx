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
  { label: "DEX Liquidity", pct: "10%", tokens: "10M", width: "65.57%", color: "#22d3ee" },
  { label: "Pre-seed", pct: "0.25%", tokens: "250K", width: "1.64%", color: "#7c3aed" },
  { label: "Seed", pct: "0.6%", tokens: "600K", width: "3.93%", color: "#8b5cf6" },
  { label: "Private", pct: "1.4%", tokens: "1.4M", width: "9.18%", color: "#a78bfa" },
  { label: "Public", pct: "3%", tokens: "3M", width: "19.67%", color: "#38bdf8" },
] as const;

export function TgeCirculatingSection() {
  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            Initial Circulating{" "}
            <span className="gradient-text">Supply</span>
          </h2>
          <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
            TGE Float
          </p>
          <p className={`mt-3 ${tkStat} gradient-text`}>15.25%</p>
          <p className="mt-2 display text-[clamp(1.2rem,2.5vw,1.55rem)] tracking-[-0.02em] text-ink">
            15.25M $DEXLA
          </p>
        </FadeIn>

        <FadeIn className="mt-9">
          <div className={`mx-auto max-w-3xl ${tkSurface} p-5 sm:p-7`}>
            <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              Initial circulating supply
            </p>

            <div className="mt-5 flex h-3 overflow-hidden rounded-full border border-white/[0.08]">
              {slices.map((row) => (
                <div
                  key={row.label}
                  className="h-full"
                  style={{ width: row.width, background: row.color }}
                />
              ))}
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {slices.map((row) => (
                <li
                  key={row.label}
                  className={`${tkSurfaceSoft} flex items-center justify-between gap-3 px-3.5 py-3 sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-0.25rem)]`}
                >
                  <span className="text-[0.9rem] font-medium text-ink">
                    {row.label}
                  </span>
                  <span className="display text-right text-[1.05rem] tabular-nums leading-snug text-electric sm:text-[1.1rem]">
                    {row.pct} / {row.tokens}
                  </span>
                </li>
              ))}
            </ul>

            <p className={`mt-5 text-center ${tkBody}`}>
              15.25% of total supply at TGE.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
