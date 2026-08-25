/** Illustrative basket fixtures for the public DEGEN CLUB landing page. */

export type DegenLandingAsset = {
  name: string;
  ticker: string;
  percent: number;
  chain?: string;
};

export type DegenChainId =
  | "ethereum"
  | "solana"
  | "base"
  | "bnb"
  | "sui"
  | "robinhood";

export type DegenLandingBasket = {
  title: string;
  description: string;
  /** Primary chain for indexes; omit for multi-chain portfolios. */
  chainId?: DegenChainId;
  assets: DegenLandingAsset[];
};

export const DEGEN_SUPPORTED_CHAINS = [
  { id: "ethereum", label: "Ethereum", logo: "/images/networks/ethereum.svg" },
  { id: "solana", label: "Solana", logo: "/images/networks/solana.svg" },
  { id: "base", label: "Base", logo: "/images/networks/base.svg" },
  { id: "sui", label: "Sui", logo: "/images/networks/sui.svg" },
  { id: "bnb", label: "BNB Chain", logo: "/images/networks/bnb.svg" },
  {
    id: "robinhood",
    label: "Robinhood Chain",
    logo: "/images/networks/robinhood.svg",
  },
] as const;

export function getChainMeta(id: DegenChainId) {
  return DEGEN_SUPPORTED_CHAINS.find((c) => c.id === id)!;
}

const CHAIN_LABEL_TO_ID: Record<string, DegenChainId> = {
  Solana: "solana",
  Ethereum: "ethereum",
  Base: "base",
  "BNB Chain": "bnb",
  "Ethereum/BNB Chain": "bnb",
};

/** Unique chain logos for a basket (indexes: primary; portfolios: from assets). */
export function basketChainIds(basket: DegenLandingBasket): DegenChainId[] {
  if (basket.chainId) return [basket.chainId];
  const ids: DegenChainId[] = [];
  for (const asset of basket.assets) {
    if (!asset.chain) continue;
    if (asset.chain === "Ethereum/BNB Chain") {
      if (!ids.includes("ethereum")) ids.push("ethereum");
      if (!ids.includes("bnb")) ids.push("bnb");
      continue;
    }
    const id = CHAIN_LABEL_TO_ID[asset.chain];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export const DEGEN_LANDING_INDEXES: DegenLandingBasket[] = [
  {
    title: "Solana Memecoin Index",
    description:
      "Top Solana memecoins by market cap. Pure degen exposure to the highest-volume and most established meme tokens on the fastest chain.",
    chainId: "solana",
    assets: [
      { name: "Pudgy Penguins", ticker: "PENGU", percent: 18 },
      { name: "dogwifhat", ticker: "WIF", percent: 16 },
      { name: "Bonk", ticker: "BONK", percent: 14 },
      { name: "Fartcoin", ticker: "FARTCOIN", percent: 12 },
      { name: "Popcat", ticker: "POPCAT", percent: 10 },
      { name: "Useless", ticker: "USELESS", percent: 8 },
      { name: "Troll", ticker: "TROLL", percent: 7 },
      { name: "Peanut the Squirrel", ticker: "PNUT", percent: 6 },
      { name: "Moo Deng", ticker: "MOODENG", percent: 5 },
      { name: "Gigachad", ticker: "GIGA", percent: 4 },
    ],
  },
  {
    title: "Ethereum Memecoin Index",
    description:
      "Blue-chip Ethereum memecoins ranked by market cap. The original meme layer—dogs, frogs, and cultural icons with the deepest liquidity.",
    chainId: "ethereum",
    assets: [
      { name: "Shiba Inu", ticker: "SHIB", percent: 20 },
      { name: "Pepe", ticker: "PEPE", percent: 18 },
      { name: "SPX6900", ticker: "SPX", percent: 14 },
      { name: "FLOKI", ticker: "FLOKI", percent: 12 },
      { name: "Mog Coin", ticker: "MOG", percent: 9 },
      { name: "Turbo", ticker: "TURBO", percent: 8 },
      { name: "Non-Playable Coin", ticker: "NPC", percent: 6 },
      { name: "Neiro", ticker: "NEIRO", percent: 5 },
      { name: "Memecoin", ticker: "MEME", percent: 4 },
      { name: "Wojak", ticker: "WOJAK", percent: 4 },
    ],
  },
  {
    title: "BNB Chain Memecoin Index",
    description:
      "The strongest BNB community memecoins. Cultural and narrative-driven tokens with real mindshare, lasting communities, and the highest staying power on the chain.",
    chainId: "bnb",
    assets: [
      { name: "BinanceLife", ticker: "币安人生", percent: 16 },
      { name: "FLOKI", ticker: "FLOKI", percent: 15 },
      { name: "Banana For Scale", ticker: "BANANAS31", percent: 12 },
      { name: "Baby Doge Coin", ticker: "BABYDOGE", percent: 11 },
      { name: "CZ’s Dog / Broccoli", ticker: "BROCCOLI", percent: 10 },
      { name: "Tutorial", ticker: "TUT", percent: 9 },
      { name: "Hajimi", ticker: "哈基米", percent: 8 },
      { name: "Cheems", ticker: "CHEEMS", percent: 7 },
      { name: "MemeCore", ticker: "M", percent: 7 },
      { name: "Test", ticker: "TST", percent: 5 },
    ],
  },
  {
    title: "Base Memecoin Index",
    description:
      "The strongest Base community memecoins. True cultural flagships of Coinbase L2—frogs, degens, cats, and the most battle-tested holder communities on the chain.",
    chainId: "base",
    assets: [
      { name: "Toshi", ticker: "TOSHI", percent: 18 },
      { name: "Brett", ticker: "BRETT", percent: 16 },
      { name: "Degen", ticker: "DEGEN", percent: 14 },
      { name: "DebtReliefBot", ticker: "DRB", percent: 10 },
      { name: "Bald", ticker: "BALD", percent: 9 },
      { name: "PONKE", ticker: "PONKE", percent: 8 },
      { name: "Keyboard Cat", ticker: "KEYCAT", percent: 7 },
      { name: "doginme", ticker: "DOGINME", percent: 7 },
      { name: "Basenji", ticker: "BENJI", percent: 6 },
      { name: "Mr. Miggles", ticker: "MIGGLES", percent: 5 },
    ],
  },
];

export const DEGEN_LANDING_PORTFOLIOS: DegenLandingBasket[] = [
  {
    title: "Blue Chip Memecoin Portfolio",
    description:
      "The strongest blue-chip memecoins across chains. Highest liquidity, brand power, and lasting communities.",
    assets: [
      { name: "Pudgy Penguins", ticker: "PENGU", chain: "Solana", percent: 14 },
      { name: "dogwifhat", ticker: "WIF", chain: "Solana", percent: 12 },
      { name: "Bonk", ticker: "BONK", chain: "Solana", percent: 11 },
      { name: "Shiba Inu", ticker: "SHIB", chain: "Ethereum", percent: 13 },
      { name: "Pepe", ticker: "PEPE", chain: "Ethereum", percent: 12 },
      { name: "SPX6900", ticker: "SPX", chain: "Ethereum", percent: 10 },
      {
        name: "BinanceLife",
        ticker: "币安人生",
        chain: "BNB Chain",
        percent: 8,
      },
      {
        name: "FLOKI",
        ticker: "FLOKI",
        chain: "Ethereum/BNB Chain",
        percent: 9,
      },
      { name: "Toshi", ticker: "TOSHI", chain: "Base", percent: 6 },
      { name: "Brett", ticker: "BRETT", chain: "Base", percent: 5 },
    ],
  },
  {
    title: "Explosive Memecoin Portfolio",
    description:
      "High-upside mid-tier memecoins with real volume and community momentum. Built for bigger swings.",
    assets: [
      { name: "Popcat", ticker: "POPCAT", chain: "Solana", percent: 14 },
      { name: "Useless", ticker: "USELESS", chain: "Solana", percent: 11 },
      { name: "Troll", ticker: "TROLL", chain: "Solana", percent: 10 },
      { name: "Mog Coin", ticker: "MOG", chain: "Ethereum", percent: 13 },
      { name: "Turbo", ticker: "TURBO", chain: "Ethereum", percent: 12 },
      {
        name: "Non-Playable Coin",
        ticker: "NPC",
        chain: "Ethereum",
        percent: 10,
      },
      {
        name: "Baby Doge Coin",
        ticker: "BABYDOGE",
        chain: "BNB Chain",
        percent: 9,
      },
      {
        name: "CZ’s Dog / Broccoli",
        ticker: "BROCCOLI",
        chain: "BNB Chain",
        percent: 8,
      },
      { name: "Degen", ticker: "DEGEN", chain: "Base", percent: 7 },
      { name: "Bald", ticker: "BALD", chain: "Base", percent: 6 },
    ],
  },
  {
    title: "Moonshot Memecoin Portfolio",
    description:
      "Pure degen moonshots. Small-cap, high-risk, high-reward plays with active communities.",
    assets: [
      { name: "Wojak", ticker: "WOJAK", chain: "Ethereum", percent: 16 },
      { name: "Bitty", ticker: "BITTY", chain: "Solana", percent: 14 },
      { name: "Kitty", ticker: "KITTY", chain: "Solana", percent: 13 },
      { name: "Fwog", ticker: "FWOG", chain: "Solana", percent: 13 },
      { name: "Catwifmask", ticker: "MASK", chain: "Solana", percent: 12 },
      { name: "Cupsey", ticker: "CUPSEY", chain: "Solana", percent: 12 },
      {
        name: "Purple Bitcoin",
        ticker: "PURPLE",
        chain: "Solana",
        percent: 11,
      },
      { name: "Bald", ticker: "BALD", chain: "Base", percent: 9 },
    ],
  },
];
