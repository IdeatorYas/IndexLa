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
  "border border-white/[0.07] bg-void/40 text-center";

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

/** Shared architecture grid — six equal cards */
export const tkArchGrid =
  "mt-9 grid auto-rows-fr gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4";

export const tkArchCard =
  "group relative flex h-full flex-col overflow-hidden border bg-panel/35 px-5 py-5 text-center backdrop-blur-[2px] transition-[border-color,box-shadow,background-color] duration-300 sm:px-6 sm:py-6";

export const tkArchCardUtility =
  `${tkArchCard} border-success/30 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.1)] hover:border-success/50 hover:bg-success/[0.05]`;

export const tkArchCardBurn =
  `${tkArchCard} border-danger/35 bg-gradient-to-b from-danger/[0.06] to-transparent shadow-[inset_0_1px_0_0_rgba(248,113,113,0.12)] hover:border-danger/55 hover:from-danger/[0.09]`;

export const tkArchNum =
  "display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none tabular-nums tracking-[-0.04em]";

export const tkArchTitle =
  "display text-[clamp(1.05rem,1.8vw,1.22rem)] tracking-[-0.02em] text-ink uppercase text-balance";

export const tkArchMetric =
  "mt-auto flex min-h-[4.75rem] flex-col items-center justify-center border px-4 py-3.5 text-center sm:min-h-[5.25rem] sm:py-4";

export const tkArchMetricUtility =
  `${tkArchMetric} border-success/25 bg-success/[0.06]`;

export const tkArchMetricBurn =
  `${tkArchMetric} border-danger/35 bg-danger/[0.09]`;

export const tkArchBody =
  "mt-4 flex flex-1 flex-col items-center justify-start gap-2.5 text-center";

/** Hero protocol stat panels */
export const tkHeroStatPanel =
  "relative overflow-hidden border bg-panel/60 px-5 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:px-6 sm:py-6";

export const tkHeroStatPanelUtility =
  `${tkHeroStatPanel} border-success/25 shadow-[0_0_40px_-12px_rgba(52,211,153,0.2)]`;

export const tkHeroStatPanelBurn =
  `${tkHeroStatPanel} border-danger/25 shadow-[0_0_40px_-12px_rgba(248,113,113,0.2)]`;
