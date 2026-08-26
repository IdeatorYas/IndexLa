import type { ReactNode } from "react";
import Image from "next/image";
import {
  DECK_HEADLINES,
  type DeckSlideN,
  deckHeadlineLabel,
} from "@/components/investor-deck/deckHeadlines";
import { deckPad, deckSlide, deckSlideNum } from "@/components/investor-deck/deckRhythm";
import { LOGO_DECK } from "@/lib/site";

type SlideShellProps = {
  n: DeckSlideN;
  children: ReactNode;
  className?: string;
};

/** Shared chrome for all 14 slides — official headline is always rendered. */
export function SlideShell({ n, children, className = "" }: SlideShellProps) {
  const headline = deckHeadlineLabel(n);
  // Keep title in map so TypeScript fails if a slide number is missing.
  void DECK_HEADLINES[n];

  return (
    <section className={`${deckSlide} ${className}`} data-slide={n} data-headline={headline}>
      <div className={`deck-slide-inner flex h-full flex-col ${deckPad}`}>
        <header className="deck-slide-headline mb-3 flex shrink-0 items-center justify-between border-b border-white/10 pb-3">
          <p className={deckSlideNum}>{headline}</p>
          <Image
            src={LOGO_DECK}
            alt="INDEXLA"
            width={180}
            height={52}
            className="h-11 w-auto object-contain"
            priority={n === "01"}
          />
        </header>
        <div className="min-h-0 flex-1">{children}</div>
        <footer className="mt-3 flex shrink-0 items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[1rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            INDEXLA — Investor Deck
          </span>
          <span className="text-[1rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            {n} / 14
          </span>
        </footer>
      </div>
    </section>
  );
}
