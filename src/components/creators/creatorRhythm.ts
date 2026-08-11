/**
 * Creators page presentation tokens — refined INDEXLA system.
 */
export {
  homeH2 as crH2,
  homeH3 as crH3,
  homeEyebrow as crEyebrow,
  homeBody as crBody,
  homeBodyDim as crBodyDim,
  homeBodyStrong as crBodyStrong,
  homeLede as crLede,
  homeLabel as crLabel,
  homePill as crPill,
  homeChip as crChip,
  homeGreenBox as crGreenBox,
  homeGreenBoxText as crGreenText,
} from "@/components/home/homeRhythm";

/** Slightly more generous section rhythm for Creators */
export const crSection =
  "relative border-t border-line/80 py-11 md:py-14 lg:py-16";

export const crH1 =
  "display text-[clamp(2.2rem,5.4vw,3.9rem)] font-semibold tracking-[-0.038em] text-balance text-pretty uppercase leading-[1.05]";

/** Shared product surface */
export const crSurface =
  "overflow-hidden rounded-2xl border border-white/[0.08] bg-deep/55 shadow-[0_20px_60px_rgba(0,0,0,0.28)]";

export const crSurfaceSoft =
  "rounded-2xl border border-white/[0.07] bg-void/40";

export const crCta =
  "min-w-[16rem] px-9 py-3.5 text-[1.05rem] shadow-[0_18px_50px_rgba(59,130,246,0.42)] ring-1 ring-white/10";
