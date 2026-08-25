/**
 * Verified memecoin logos for DEGEN CLUB landing visuals only — not endorsement.
 * Prefer local assets, then CoinGecko URLs verified via markets/search API
 * (aligned with IndexLa-App degen-asset-registry coingeckoIds).
 * Unverified tickers resolve to null → clean ticker fallback (never a wrong logo).
 */

export const DEGEN_MEME_LOGOS = {
  DOGE: "/images/assets/demo/crypto/doge.svg",
  SHIB: "/images/assets/demo/crypto/coingecko/shib.png",
  PEPE: "/images/assets/demo/crypto/coingecko/pepe.jpg",
  PENGU: "/images/assets/demo/crypto/coingecko/pengu.png",
  SPX6900: "/images/assets/demo/crypto/spx6900.png",
  SPX: "/images/assets/demo/crypto/spx6900.png",
  BONK: "/images/assets/demo/crypto/coingecko/bonk.jpg",
  FLOKI: "/images/assets/demo/crypto/coingecko/floki.png",
  FARTCOIN: "/images/assets/demo/crypto/coingecko/fartcoin.jpg",
  WIF: "/images/assets/demo/crypto/coingecko/wif.jpg",
  CASHCAT: "/images/assets/demo/crypto/cashcat.png",
} as const;

export type DegenMemeTicker = keyof typeof DEGEN_MEME_LOGOS;

/** CoinGecko CDN URLs verified against live markets/search (Aug 2026). */
const VERIFIED_REMOTE_LOGOS: Record<string, string> = {
  POPCAT:
    "https://coin-images.coingecko.com/coins/images/33760/small/image.jpg",
  USELESS:
    "https://coin-images.coingecko.com/coins/images/55684/small/coingeckoupdate.png",
  TROLL:
    "https://coin-images.coingecko.com/coins/images/55282/small/Untitled_design.png",
  PNUT:
    "https://coin-images.coingecko.com/coins/images/51301/small/Peanut_the_Squirrel.png",
  MOODENG:
    "https://coin-images.coingecko.com/coins/images/50264/small/MOODENG.jpg",
  GIGA:
    "https://coin-images.coingecko.com/coins/images/34755/small/IMG_0015.png",
  SHIB:
    "https://coin-images.coingecko.com/coins/images/11939/small/shiba.png",
  PEPE:
    "https://coin-images.coingecko.com/coins/images/29850/small/pepe-token.jpeg",
  SPX:
    "https://coin-images.coingecko.com/coins/images/31401/small/centeredcoin_%281%29.png",
  SPX6900:
    "https://coin-images.coingecko.com/coins/images/31401/small/centeredcoin_%281%29.png",
  FLOKI:
    "https://coin-images.coingecko.com/coins/images/16746/small/PNG_image.png",
  MOG:
    "https://coin-images.coingecko.com/coins/images/31059/small/MOG_LOGO_200x200.png",
  TURBO:
    "https://coin-images.coingecko.com/coins/images/30117/small/TurboMark-QL_200.png",
  NPC:
    "https://coin-images.coingecko.com/coins/images/31193/small/NPC_200x200.png",
  NEIRO:
    "https://coin-images.coingecko.com/coins/images/39488/small/neiro.jpg",
  MEME:
    "https://coin-images.coingecko.com/coins/images/32528/small/memecoin_%282%29.png",
  WOJAK:
    "https://coin-images.coingecko.com/coins/images/29856/small/wojak.png",
  TOSHI:
    "https://coin-images.coingecko.com/coins/images/31126/small/Toshi_Logo_-_Circular.png",
  BRETT:
    "https://coin-images.coingecko.com/coins/images/35529/small/1000050750.png",
  DEGEN:
    "https://coin-images.coingecko.com/coins/images/34515/small/android-chrome-512x512.png",
  DRB:
    "https://coin-images.coingecko.com/coins/images/54784/small/1000143570.jpg",
  BALD:
    "https://coin-images.coingecko.com/coins/images/31119/small/cdjxKSjo_400x400.jpg",
  PONKE:
    "https://coin-images.coingecko.com/coins/images/33929/small/ponke-logo.png",
  KEYCAT:
    "https://coin-images.coingecko.com/coins/images/36608/small/IMG_9500.jpeg",
  DOGINME:
    "https://coin-images.coingecko.com/coins/images/35123/small/doginme-logo1-transparent200.png",
  BENJI:
    "https://coin-images.coingecko.com/coins/images/36416/small/photo_2025-12-04_22.13.35.png",
  MIGGLES:
    "https://coin-images.coingecko.com/coins/images/39251/small/New_LOGO.png",
  BABYDOGE:
    "https://coin-images.coingecko.com/coins/images/16125/small/babydoge.jpg",
  BROCCOLI:
    "https://coin-images.coingecko.com/coins/images/54400/small/broccoli.jpg",
  BANANAS31:
    "https://coin-images.coingecko.com/coins/images/51615/small/Banana_for_Scale_Logo.png",
  TUT:
    "https://coin-images.coingecko.com/coins/images/54299/small/image_2025-02-08_18-56-13.png",
  CHEEMS:
    "https://coin-images.coingecko.com/coins/images/30376/small/Hg4_Lhbg_400x400.jpg",
  M:
    "https://coin-images.coingecko.com/coins/images/53247/small/square-bg-transparent.png",
  FWOG:
    "https://coin-images.coingecko.com/coins/images/39453/small/fwog.png",
  MASK:
    "https://coin-images.coingecko.com/coins/images/66179/small/1000094640.jpg",
  CUPSEY:
    "https://coin-images.coingecko.com/coins/images/51412/small/IMG_8971.jpeg",
  PURPLE:
    "https://coin-images.coingecko.com/coins/images/53543/small/purple-bitcoin-logo.jpg",
  PENGU:
    "https://coin-images.coingecko.com/coins/images/52622/small/PUDGY_PENGUINS_PENGU_PFP.png",
  WIF:
    "https://coin-images.coingecko.com/coins/images/33566/small/dogwifhat.jpg",
  BONK:
    "https://coin-images.coingecko.com/coins/images/28600/small/bonk.jpg",
  FARTCOIN:
    "https://coin-images.coingecko.com/coins/images/50891/small/fart.jpg",
  "币安人生":
    "https://coin-images.coingecko.com/coins/images/69848/small/%E5%B8%81%E5%AE%89%E4%BA%BA%E7%94%9F.png",
  "哈基米":
    "https://coin-images.coingecko.com/coins/images/69928/small/zcslpjiz4jgzaot9e2f7ltpvgge9.",
  // No verified CoinGecko match at audit time → omit (ticker fallback):
  // BITTY, KITTY, TST
};

export function resolveMemeLogoSrc(ticker: string): string | null {
  const key = ticker.toUpperCase();
  const local =
    DEGEN_MEME_LOGOS[key as DegenMemeTicker] ??
    (key === "SPX" ? DEGEN_MEME_LOGOS.SPX6900 : undefined);
  if (local) return local;
  return VERIFIED_REMOTE_LOGOS[ticker] ?? VERIFIED_REMOTE_LOGOS[key] ?? null;
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
