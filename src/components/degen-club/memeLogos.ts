/** Illustrative memecoin logos for DEGEN CLUB visuals only — not endorsement. */
export const DEGEN_MEME_LOGOS = {
  DOGE: "/images/assets/demo/crypto/doge.svg",
  SHIB: "/images/assets/demo/crypto/shib.png",
  PEPE: "/images/assets/demo/crypto/pepe.png",
  PENGU: "/images/assets/demo/crypto/pengu.png",
  SPX6900: "/images/assets/demo/crypto/spx6900.png",
  BONK: "/images/assets/demo/crypto/bonk.png",
  FLOKI: "/images/assets/demo/crypto/floki.png",
  FARTCOIN: "/images/assets/demo/crypto/fartcoin.png",
  WIF: "/images/assets/demo/crypto/wif.png",
  CASHCAT: "/images/assets/demo/crypto/cashcat.png",
} as const;

export type DegenMemeTicker = keyof typeof DEGEN_MEME_LOGOS;

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

export const MEME_COIN_COLORS: Record<DegenMemeTicker, string> = {
  DOGE: "#C2A633",
  SHIB: "#FFA409",
  PEPE: "#3D9970",
  PENGU: "#6EC1FF",
  SPX6900: "#FF4D4D",
  BONK: "#F7931A",
  FLOKI: "#FB923C",
  FARTCOIN: "#84CC16",
  WIF: "#E8B849",
  CASHCAT: "#F472B6",
};
