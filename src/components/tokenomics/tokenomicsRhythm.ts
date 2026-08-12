/**
 * Tokenomics page presentation tokens — INDEXLA design system.
 * Green = utility / value created · Red = supply reduction / burn
 */
export {
  homeH2 as tkH2,
  homeH3 as tkH3,
  homeEyebrow as tkEyebrow,
  homeBody as tkBody,
  homeBodyStrong as tkBodyStrong,
  homeGreenBox as tkGreenBox,
  homeGreenBoxText as tkGreenText,
  homeLabel as tkLabel,
} from "@/components/home/homeRhythm";

export const tkSection =
  "relative border-t border-white/[0.07] py-12 md:py-14 lg:py-16";

export const tkH1 =
  "display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold tracking-[-0.04em] text-balance text-pretty uppercase leading-[1.02]";

export const tkSurface =
  "overflow-hidden border border-white/[0.08] bg-deep/55";

export const tkSurfaceSoft =
  "border border-white/[0.07] bg-void/40";

export const tkStat =
  "display text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[-0.03em] tabular-nums";

/** Premium utility (green) — value / usage */
export const tkUtilityAccent = "text-success";
export const tkUtilityBorder = "border-success/30";
export const tkUtilityPanel =
  "border border-success/30 bg-success/[0.07]";
export const tkUtilityGlow =
  "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(52,211,153,0.11), transparent 60%)";

/** Premium burn (red) — supply reduction */
export const tkBurnAccent = "text-danger";
export const tkBurnBorder = "border-danger/30";
export const tkBurnPanel =
  "border border-danger/30 bg-danger/[0.07]";
export const tkBurnGlow =
  "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(248,113,113,0.11), transparent 60%)";

/** Shared 4×4 architecture card shell — identical for utility & burn */
export const tkArchGrid =
  "mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4";

export const tkArchCard =
  "flex h-full min-h-[28rem] flex-col border px-5 py-5 transition-[border-color,background-color] duration-300 sm:min-h-[30rem] sm:px-6 sm:py-6";

export const tkArchCardUtility =
  `${tkArchCard} border-success/30 bg-success/[0.05] hover:border-success/50 hover:bg-success/[0.08]`;

export const tkArchCardBurn =
  `${tkArchCard} border-danger/30 bg-danger/[0.05] hover:border-danger/50 hover:bg-danger/[0.08]`;

export const tkArchNum =
  "display text-[1.05rem] tabular-nums";

export const tkArchTitle =
  "display text-[clamp(1.2rem,2.2vw,1.45rem)] tracking-[-0.02em] text-ink uppercase text-balance";

export const tkArchMetric =
  "mt-auto flex min-h-[10.5rem] flex-col items-center justify-center border px-4 py-5 text-center";

export const tkArchMetricUtility =
  `${tkArchMetric} border-success/30 bg-success/[0.08]`;

export const tkArchMetricBurn =
  `${tkArchMetric} border-danger/30 bg-danger/[0.08]`;
