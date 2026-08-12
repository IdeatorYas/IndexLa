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
  "display text-[clamp(2.2rem,5.5vw,3.85rem)] font-semibold tracking-[-0.04em] text-balance text-pretty uppercase leading-[1.02]";

export const tkSurface =
  "overflow-hidden border border-white/[0.08] bg-deep/55";

export const tkSurfaceSoft =
  "border border-white/[0.07] bg-void/40";

export const tkStat =
  "display text-[clamp(1.55rem,3.5vw,2.35rem)] leading-none tracking-[-0.03em] tabular-nums";

/** Premium utility (green) — value / usage */
export const tkUtilityAccent = "text-success";
export const tkUtilityBorder = "border-success/30";
export const tkUtilityPanel =
  "border border-success/30 bg-success/[0.07]";
export const tkUtilityGlow =
  "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(52,211,153,0.1), transparent 65%)";

/** Premium burn (red) — supply reduction */
export const tkBurnAccent = "text-danger";
export const tkBurnBorder = "border-danger/30";
export const tkBurnPanel =
  "border border-danger/30 bg-danger/[0.07]";
export const tkBurnGlow =
  "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(248,113,113,0.1), transparent 65%)";

/** Shared 4×4 architecture — identical shells for utility & burn */
export const tkArchGrid =
  "mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4";

export const tkArchCard =
  "group relative flex h-full flex-col overflow-hidden border bg-panel/40 px-5 py-5 backdrop-blur-[2px] transition-[border-color,box-shadow,background-color] duration-300 sm:px-6 sm:py-6";

export const tkArchCardUtility =
  `${tkArchCard} border-success/35 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.12)] hover:border-success/55 hover:bg-success/[0.06] hover:shadow-[inset_0_1px_0_0_rgba(52,211,153,0.2),0_0_0_1px_rgba(52,211,153,0.08)]`;

export const tkArchCardBurn =
  `${tkArchCard} border-danger/40 bg-gradient-to-b from-danger/[0.07] to-panel/40 shadow-[inset_0_1px_0_0_rgba(248,113,113,0.14)] hover:border-danger/60 hover:from-danger/[0.1] hover:shadow-[inset_0_1px_0_0_rgba(248,113,113,0.22),0_0_0_1px_rgba(248,113,113,0.1)]`;

export const tkArchNum =
  "display text-[0.95rem] tabular-nums tracking-[0.08em]";

export const tkArchTitle =
  "display text-[clamp(1.15rem,2vw,1.35rem)] tracking-[-0.02em] text-ink uppercase text-balance";

/** Fixed metric footing so all 8 cards share the same visual weight */
export const tkArchMetric =
  "mt-auto flex min-h-[10.25rem] flex-col items-center justify-center border px-4 py-4 text-center";

export const tkArchMetricUtility =
  `${tkArchMetric} border-success/30 bg-success/[0.07]`;

export const tkArchMetricBurn =
  `${tkArchMetric} border-danger/40 bg-danger/[0.1] shadow-[inset_0_0_24px_-8px_rgba(248,113,113,0.25)]`;

/** Body block height so copy area stays consistent across cards */
export const tkArchBody =
  "mt-4 flex min-h-[7.5rem] flex-1 flex-col sm:min-h-[8.25rem]";
