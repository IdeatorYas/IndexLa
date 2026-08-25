/**
 * Local-only memecoin logos for DEGEN CLUB landing visuals — not endorsement.
 * Critical + basket assets live under /images/assets/demo/crypto/degen/.
 * Unmapped tickers → null → clean ticker badge (never a wrong remote image).
 */

const DEGEN_DIR = "/images/assets/demo/crypto/degen";

export const DEGEN_MEME_LOGOS = {
  DOGE: `${DEGEN_DIR}/DOGE.svg`,
  SHIB: `${DEGEN_DIR}/SHIB.png`,
  PEPE: `${DEGEN_DIR}/PEPE.png`,
  PENGU: `${DEGEN_DIR}/PENGU.png`,
  SPX6900: `${DEGEN_DIR}/SPX6900.png`,
  SPX: `${DEGEN_DIR}/SPX6900.png`,
  BONK: `${DEGEN_DIR}/BONK.png`,
  FLOKI: `${DEGEN_DIR}/FLOKI.png`,
  FARTCOIN: `${DEGEN_DIR}/FARTCOIN.png`,
  WIF: `${DEGEN_DIR}/WIF.png`,
  CASHCAT: `${DEGEN_DIR}/CASHCAT.png`,
} as const;

export type DegenMemeTicker = keyof typeof DEGEN_MEME_LOGOS;

/** Additional verified local logos (downloaded once; no runtime remote fetch). */
const LOCAL_LOGOS: Record<string, string> = {
  ...DEGEN_MEME_LOGOS,
  POPCAT: `${DEGEN_DIR}/POPCAT.jpg`,
  USELESS: `${DEGEN_DIR}/USELESS.png`,
  TROLL: `${DEGEN_DIR}/TROLL.png`,
  PNUT: `${DEGEN_DIR}/PNUT.png`,
  MOODENG: `${DEGEN_DIR}/MOODENG.jpg`,
  GIGA: `${DEGEN_DIR}/GIGA.png`,
  MOG: `${DEGEN_DIR}/MOG.png`,
  TURBO: `${DEGEN_DIR}/TURBO.png`,
  NPC: `${DEGEN_DIR}/NPC.png`,
  NEIRO: `${DEGEN_DIR}/NEIRO.jpg`,
  MEME: `${DEGEN_DIR}/MEME.png`,
  WOJAK: `${DEGEN_DIR}/WOJAK.png`,
  TOSHI: `${DEGEN_DIR}/TOSHI.png`,
  BRETT: `${DEGEN_DIR}/BRETT.png`,
  DEGEN: `${DEGEN_DIR}/DEGEN.png`,
  DRB: `${DEGEN_DIR}/DRB.jpg`,
  BALD: `${DEGEN_DIR}/BALD.jpg`,
  PONKE: `${DEGEN_DIR}/PONKE.png`,
  KEYCAT: `${DEGEN_DIR}/KEYCAT.jpeg`,
  DOGINME: `${DEGEN_DIR}/DOGINME.png`,
  BENJI: `${DEGEN_DIR}/BENJI.png`,
  MIGGLES: `${DEGEN_DIR}/MIGGLES.png`,
  BABYDOGE: `${DEGEN_DIR}/BABYDOGE.jpg`,
  BROCCOLI: `${DEGEN_DIR}/BROCCOLI.jpg`,
  BANANAS31: `${DEGEN_DIR}/BANANAS31.png`,
  TUT: `${DEGEN_DIR}/TUT.png`,
  CHEEMS: `${DEGEN_DIR}/CHEEMS.jpg`,
  M: `${DEGEN_DIR}/M.png`,
  FWOG: `${DEGEN_DIR}/FWOG.png`,
  MASK: `${DEGEN_DIR}/MASK.jpg`,
  CUPSEY: `${DEGEN_DIR}/CUPSEY.jpeg`,
  PURPLE: `${DEGEN_DIR}/PURPLE.jpg`,
  "币安人生": `${DEGEN_DIR}/BINANCELIFE.png`,
  "哈基米": `${DEGEN_DIR}/HAJIMI.png`,
};

export function resolveMemeLogoSrc(ticker: string): string | null {
  const key = ticker.toUpperCase();
  return (
    LOCAL_LOGOS[ticker] ??
    LOCAL_LOGOS[key] ??
    (key === "SPX" ? LOCAL_LOGOS.SPX6900 : undefined) ??
    null
  );
}

export const HERO_SINGLE_COIN: DegenMemeTicker = "PEPE";

export const HERO_PORTFOLIO_COINS: DegenMemeTicker[] = [
  "DOGE",
  "SHIB",
  "WIF",
  "BONK",
  "FLOKI",
  "FARTCOIN",
  "PENGU",
  "SPX6900",
  "CASHCAT",
];

export const MEME_COIN_COLORS: Record<string, string> = {
  DOGE: "#C2A633",
  SHIB: "#FFA409",
  PEPE: "#3D9970",
  PENGU: "#6EC1FF",
  SPX6900: "#FF4D4D",
  SPX: "#FF4D4D",
  BONK: "#F7931A",
  FLOKI: "#FB923C",
  FARTCOIN: "#84CC16",
  WIF: "#E8B849",
  CASHCAT: "#F472B6",
  POPCAT: "#F97316",
  USELESS: "#94A3B8",
  TROLL: "#A855F7",
  PNUT: "#D97706",
  MOODENG: "#EC4899",
  GIGA: "#6366F1",
  MOG: "#2563EB",
  TURBO: "#22C55E",
  NPC: "#8B5CF6",
  NEIRO: "#EAB308",
  MEME: "#64748B",
  WOJAK: "#78716C",
  TOSHI: "#3B82F6",
  BRETT: "#2563EB",
  DEGEN: "#A855F7",
  DRB: "#14B8A6",
  BALD: "#9CA3AF",
  PONKE: "#F97316",
  KEYCAT: "#FBBF24",
  DOGINME: "#EF4444",
  BENJI: "#10B981",
  MIGGLES: "#F59E0B",
  BABYDOGE: "#F59E0B",
  BROCCOLI: "#16A34A",
  TUT: "#0EA5E9",
  CHEEMS: "#D4A574",
  TST: "#06B6D4",
  BITTY: "#818CF8",
  KITTY: "#FB7185",
  FWOG: "#4ADE80",
  MASK: "#C084FC",
  CUPSEY: "#38BDF8",
  PURPLE: "#9333EA",
  BANANAS31: "#FACC15",
  M: "#7C3AED",
  "币安人生": "#F0B90B",
  "哈基米": "#F472B6",
};
