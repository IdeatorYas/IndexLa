/** Illustrative memecoin logos for DEGEN CLUB visuals only — not endorsement. */
export const DEGEN_MEME_LOGOS = {
  DOGE: "/images/assets/demo/crypto/doge.svg",
  SHIB: "/images/assets/demo/crypto/shib.png",
  PEPE: "/images/assets/demo/crypto/pepe.png",
  PENGU: "/images/assets/demo/crypto/pengu.png",
  SPX6900: "/images/assets/demo/crypto/spx6900.png",
  SPX: "/images/assets/demo/crypto/spx6900.png",
  BONK: "/images/assets/demo/crypto/bonk.png",
  FLOKI: "/images/assets/demo/crypto/floki.png",
  FARTCOIN: "/images/assets/demo/crypto/fartcoin.png",
  WIF: "/images/assets/demo/crypto/wif.png",
  CASHCAT: "/images/assets/demo/crypto/cashcat.png",
} as const;

export type DegenMemeTicker = keyof typeof DEGEN_MEME_LOGOS;

/** Local + CoinGecko CDN fallbacks for landing donuts (illustrative only). */
const MEME_LOGO_FALLBACKS: Record<string, string> = {
  POPCAT:
    "https://coin-images.coingecko.com/coins/images/33760/small/image.jpg",
  USELESS:
    "https://coin-images.coingecko.com/coins/images/54851/small/useless.jpg",
  TROLL:
    "https://coin-images.coingecko.com/coins/images/54847/small/troll.jpg",
  PNUT:
    "https://coin-images.coingecko.com/coins/images/40685/small/pnut.jpg",
  MOODENG:
    "https://coin-images.coingecko.com/coins/images/50264/small/moodeng.png",
  GIGA:
    "https://coin-images.coingecko.com/coins/images/33033/small/gigachad.png",
  MOG:
    "https://coin-images.coingecko.com/coins/images/31059/small/MOG_LOGO_200x200.png",
  TURBO:
    "https://coin-images.coingecko.com/coins/images/30117/small/turbo.png",
  NPC: "https://coin-images.coingecko.com/coins/images/31193/small/NPC_200x200.png",
  NEIRO:
    "https://coin-images.coingecko.com/coins/images/39488/small/neiro.jpg",
  MEME:
    "https://coin-images.coingecko.com/coins/images/32528/small/memecoin.png",
  WOJAK:
    "https://coin-images.coingecko.com/coins/images/29856/small/wojak.png",
  TOSHI:
    "https://coin-images.coingecko.com/coins/images/31177/small/toshi.png",
  BRETT:
    "https://coin-images.coingecko.com/coins/images/35529/small/1000050750.png",
  DEGEN:
    "https://coin-images.coingecko.com/coins/images/34515/small/android-chrome-512x512.png",
  DRB: "https://coin-images.coingecko.com/coins/images/52838/small/drb.png",
  BALD: "https://coin-images.coingecko.com/coins/images/31278/small/bald.png",
  PONKE:
    "https://coin-images.coingecko.com/coins/images/36572/small/ponke.png",
  KEYCAT:
    "https://coin-images.coingecko.com/coins/images/36608/small/keycat.png",
  DOGINME:
    "https://coin-images.coingecko.com/coins/images/36295/small/doginme.png",
  BENJI:
    "https://coin-images.coingecko.com/coins/images/36101/small/benji.png",
  MIGGLES:
    "https://coin-images.coingecko.com/coins/images/36691/small/miggles.png",
  BABYDOGE:
    "https://coin-images.coingecko.com/coins/images/16125/small/babydoge.jpg",
  BROCCOLI:
    "https://coin-images.coingecko.com/coins/images/53782/small/broccoli.png",
  BANANAS31:
    "https://coin-images.coingecko.com/coins/images/54017/small/bananas31.png",
  TUT: "https://coin-images.coingecko.com/coins/images/53720/small/tut.png",
  CHEEMS:
    "https://coin-images.coingecko.com/coins/images/30366/small/cheems.png",
  M: "https://coin-images.coingecko.com/coins/images/36568/small/memecore.png",
  TST: "https://coin-images.coingecko.com/coins/images/53220/small/tst.png",
  BITTY:
    "https://coin-images.coingecko.com/coins/images/54480/small/bitty.png",
  KITTY:
    "https://coin-images.coingecko.com/coins/images/54481/small/kitty.png",
  FWOG:
    "https://coin-images.coingecko.com/coins/images/51018/small/fwog.png",
  MASK: "https://coin-images.coingecko.com/coins/images/54482/small/mask.png",
  CUPSEY:
    "https://coin-images.coingecko.com/coins/images/54483/small/cupsey.png",
  PURPLE:
    "https://coin-images.coingecko.com/coins/images/54484/small/purple.png",
  "币安人生":
    "https://coin-images.coingecko.com/coins/images/54490/small/binancelife.png",
  "哈基米":
    "https://coin-images.coingecko.com/coins/images/54491/small/hajimi.png",
};

export function resolveMemeLogoSrc(ticker: string): string | null {
  const key = ticker.toUpperCase();
  const local =
    DEGEN_MEME_LOGOS[key as DegenMemeTicker] ??
    (key === "SPX" ? DEGEN_MEME_LOGOS.SPX6900 : undefined);
  if (local) return local;
  return MEME_LOGO_FALLBACKS[ticker] ?? MEME_LOGO_FALLBACKS[key] ?? null;
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
  M: "#EF4444",
  "币安人生": "#F0B90B",
  "哈基米": "#F472B6",
};
