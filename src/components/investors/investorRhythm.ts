/**
 * Investors page presentation tokens — mirror homepage design system exactly.
 * Re-export home rhythm so Investors stays in sync with the source of truth.
 */
export {
  homeSection as invSection,
  homeH2 as invH2,
  homeH3 as invH3,
  homeEyebrow as invEyebrow,
  homeBody as invBody,
  homeBodyDim as invBodyDim,
  homeBodyStrong as invBodyStrong,
  homeLede as invLede,
  homeLabel as invLabel,
  homePill as invPill,
  homeChip as invChip,
  homeGreenBox as invGreenBox,
  homeGreenBoxText as invGreenText,
  homeGreenRow as invGreenRow,
  homeGreenChip as invGreenChip,
  homeGreenChipText as invGreenChipText,
} from "@/components/home/homeRhythm";

export const invCard =
  "rounded-[1.25rem] border border-line bg-void/40 p-5 text-center sm:p-6";

/** Premium investment-grade surface — subtle depth, no neon */
export const invPremiumSurface =
  "rounded-2xl border border-white/[0.09] bg-void/55 shadow-[0_18px_48px_rgba(0,0,0,0.22)]";

/** Accent-highlighted premium box for key statements */
export const invPremiumAccent =
  "rounded-2xl border border-electric/30 bg-electric/[0.08] shadow-[inset_0_1px_0_rgba(59,130,246,0.12),0_14px_36px_rgba(0,0,0,0.18)]";

/** Investors H1 — match homepage hero scale */
export const invH1 =
  "display text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold tracking-[-0.035em] text-balance text-pretty";
