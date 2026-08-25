/** Illustrative basket fixtures for the public DEGEN CLUB landing page. */

export type DegenLandingAsset = {
  name: string;
  ticker: string;
  chain?: string;
};

export type DegenLandingBasket = {
  title: string;
  description: string;
  assets: DegenLandingAsset[];
};

export const DEGEN_LANDING_INDEXES: DegenLandingBasket[] = [
  {
    title: "Solana Memecoin Index",
    description:
      "Top Solana memecoins by market cap. Pure degen exposure to the highest-volume and most established meme tokens on the fastest chain.",
    assets: [
      { name: "Pudgy Penguins", ticker: "PENGU" },
      { name: "dogwifhat", ticker: "WIF" },
      { name: "Bonk", ticker: "BONK" },
      { name: "Fartcoin", ticker: "FARTCOIN" },
      { name: "Popcat", ticker: "POPCAT" },
      { name: "Useless", ticker: "USELESS" },
      { name: "Troll", ticker: "TROLL" },
      { name: "Peanut the Squirrel", ticker: "PNUT" },
      { name: "Moo Deng", ticker: "MOODENG" },
      { name: "Gigachad", ticker: "GIGA" },
    ],
  },
  {
    title: "Ethereum Memecoin Index",
    description:
      "Blue-chip Ethereum memecoins ranked by market cap. The original meme layer—dogs, frogs, and cultural icons with the deepest liquidity.",
    assets: [
      { name: "Shiba Inu", ticker: "SHIB" },
      { name: "Pepe", ticker: "PEPE" },
      { name: "SPX6900", ticker: "SPX" },
      { name: "FLOKI", ticker: "FLOKI" },
      { name: "Mog Coin", ticker: "MOG" },
      { name: "Turbo", ticker: "TURBO" },
      { name: "Non-Playable Coin", ticker: "NPC" },
      { name: "Neiro", ticker: "NEIRO" },
      { name: "Memecoin", ticker: "MEME" },
      { name: "Wojak", ticker: "WOJAK" },
    ],
  },
  {
    title: "BNB Chain Memecoin Index",
    description:
      "The strongest BNB community memecoins. Cultural and narrative-driven tokens with real mindshare, lasting communities, and the highest staying power on the chain.",
    assets: [
      { name: "BinanceLife", ticker: "币安人生" },
      { name: "FLOKI", ticker: "FLOKI" },
      { name: "Banana For Scale", ticker: "BANANAS31" },
      { name: "Baby Doge Coin", ticker: "BABYDOGE" },
      { name: "CZ’s Dog / Broccoli", ticker: "BROCCOLI" },
      { name: "Tutorial", ticker: "TUT" },
      { name: "Hajimi", ticker: "哈基米" },
      { name: "Cheems", ticker: "CHEEMS" },
      { name: "MemeCore", ticker: "M" },
      { name: "Test", ticker: "TST" },
    ],
  },
  {
    title: "Base Memecoin Index",
    description:
      "The strongest Base community memecoins. True cultural flagships of Coinbase L2—frogs, degens, cats, and the most battle-tested holder communities on the chain.",
    assets: [
      { name: "Toshi", ticker: "TOSHI" },
      { name: "Brett", ticker: "BRETT" },
      { name: "Degen", ticker: "DEGEN" },
      { name: "DebtReliefBot", ticker: "DRB" },
      { name: "Bald", ticker: "BALD" },
      { name: "PONKE", ticker: "PONKE" },
      { name: "Keyboard Cat", ticker: "KEYCAT" },
      { name: "doginme", ticker: "DOGINME" },
      { name: "Basenji", ticker: "BENJI" },
      { name: "Mr. Miggles", ticker: "MIGGLES" },
    ],
  },
];

export const DEGEN_LANDING_PORTFOLIOS: DegenLandingBasket[] = [
  {
    title: "Blue Chip Memecoin Portfolio",
    description:
      "The strongest blue-chip memecoins across chains. Highest liquidity, brand power, and lasting communities.",
    assets: [
      { name: "Pudgy Penguins", ticker: "PENGU", chain: "Solana" },
      { name: "dogwifhat", ticker: "WIF", chain: "Solana" },
      { name: "Bonk", ticker: "BONK", chain: "Solana" },
      { name: "Shiba Inu", ticker: "SHIB", chain: "Ethereum" },
      { name: "Pepe", ticker: "PEPE", chain: "Ethereum" },
      { name: "SPX6900", ticker: "SPX", chain: "Ethereum" },
      { name: "BinanceLife", ticker: "币安人生", chain: "BNB Chain" },
      { name: "FLOKI", ticker: "FLOKI", chain: "Ethereum/BNB Chain" },
      { name: "Toshi", ticker: "TOSHI", chain: "Base" },
      { name: "Brett", ticker: "BRETT", chain: "Base" },
    ],
  },
  {
    title: "Explosive Memecoin Portfolio",
    description:
      "High-upside mid-tier memecoins with real volume and community momentum. Built for bigger swings.",
    assets: [
      { name: "Popcat", ticker: "POPCAT", chain: "Solana" },
      { name: "Useless", ticker: "USELESS", chain: "Solana" },
      { name: "Troll", ticker: "TROLL", chain: "Solana" },
      { name: "Mog Coin", ticker: "MOG", chain: "Ethereum" },
      { name: "Turbo", ticker: "TURBO", chain: "Ethereum" },
      { name: "Non-Playable Coin", ticker: "NPC", chain: "Ethereum" },
      { name: "Baby Doge Coin", ticker: "BABYDOGE", chain: "BNB Chain" },
      { name: "CZ’s Dog / Broccoli", ticker: "BROCCOLI", chain: "BNB Chain" },
      { name: "Degen", ticker: "DEGEN", chain: "Base" },
      { name: "Bald", ticker: "BALD", chain: "Base" },
    ],
  },
  {
    title: "Moonshot Memecoin Portfolio",
    description:
      "Pure degen moonshots. Small-cap, high-risk, high-reward plays with active communities.",
    assets: [
      { name: "Wojak", ticker: "WOJAK", chain: "Ethereum" },
      { name: "Bitty", ticker: "BITTY", chain: "Solana" },
      { name: "Kitty", ticker: "KITTY", chain: "Solana" },
      { name: "Fwog", ticker: "FWOG", chain: "Solana" },
      { name: "Catwifmask", ticker: "MASK", chain: "Solana" },
      { name: "Cupsey", ticker: "CUPSEY", chain: "Solana" },
      { name: "Purple Bitcoin", ticker: "PURPLE", chain: "Solana" },
      { name: "Bald", ticker: "BALD", chain: "Base" },
    ],
  },
];

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
