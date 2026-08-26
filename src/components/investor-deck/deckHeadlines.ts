/** Official investor-deck slide headlines — exact wording, do not alter. */
export const DECK_HEADLINES = {
  "01": "COVER",
  "02": "THE BIG SHIFT",
  "03": "THE MISSING LAYER",
  "04": "THE PRODUCT",
  "05": "CREATOR ECONOMY",
  "06": "BUSINESS MODEL & PATH TO SCALE",
  "07": "DEGEN CLUB",
  "08": "$DEXLA TOKEN",
  "09": "MARKET OPPORTUNITY",
  "10": "WHY INDEXLA WINS",
  "11": "COMPETITIVE REALITY",
  "12": "GO-TO-MARKET",
  "13": "ROADMAP & FUNDRAISING",
  "14": "THE BIG BET",
} as const;

export type DeckSlideN = keyof typeof DECK_HEADLINES;

export function deckHeadlineLabel(n: DeckSlideN): string {
  return `${n} — ${DECK_HEADLINES[n]}`;
}
