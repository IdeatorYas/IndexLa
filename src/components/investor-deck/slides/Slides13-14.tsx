import Image from "next/image";
import { FundraisingStages } from "@/components/investor-deck/DeckVisuals";
import { SlideShell } from "@/components/investor-deck/SlideShell";
import {
  deckAccentLine,
  deckBody,
  deckH1Hero,
  deckH2,
  deckLead,
  deckSubhead,
} from "@/components/investor-deck/deckRhythm";
import { LOGO_DECK } from "@/lib/site";

export function Slide13Fundraising() {
  return (
    <SlideShell n="13">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} text-electric`}>Ship → Prove → Raise → Scale</h2>
        <div className="mt-3">
          <FundraisingStages />
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3">
          <p className={`${deckLead} !text-electric`}>We raise as the product de-risks.</p>
          <div className="deck-surface-accent flex min-h-0 flex-1 flex-col justify-center rounded-2xl px-10 py-8">
            <p className="text-[1.25rem] font-bold uppercase tracking-[0.12em] text-muted-dim">
              Total planned raise before Public
            </p>
            <p className="mt-2 display text-[6rem] font-semibold tracking-[-0.04em] text-electric">
              $2.625M
            </p>
            <p className={`mt-4 ${deckBody} text-muted`}>
              Investor allocations subject to staged unlocks & long-term vesting.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide14BigBet() {
  return (
    <SlideShell n="14" className="deck-hero-bg">
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <div className="deck-hero-glow left-[10%] top-[8%] h-[520px] w-[520px] bg-electric/18" aria-hidden />
        <div className="deck-hero-glow bottom-[5%] right-[5%] h-[460px] w-[460px] bg-purple/22" aria-hidden />
        <Image
          src={LOGO_DECK}
          alt="INDEXLA"
          width={720}
          height={200}
          className="relative h-[170px] w-auto object-contain"
          priority
        />
        <div className={`${deckAccentLine} relative mx-auto mt-7 w-36`} />
        <h2 className={`${deckH1Hero} relative mt-7 max-w-[1550px] !text-[4.6rem] text-ink`}>
          Dominate Decentralized Portfolio Management.
        </h2>
        <p className={`${deckSubhead} relative mt-6 max-w-[1350px] !text-[2.2rem]`}>
          Become the preferred monetization platform for crypto creators and KOLs.
        </p>
        <p className="relative mt-5 max-w-[1050px] text-[1.95rem] font-semibold leading-snug text-ink">
          Own the portfolio. Automate the strategy. Follow the creators you trust.
        </p>
        <p className="relative mt-8 display text-[2.65rem] font-semibold tracking-[-0.03em] text-ink">
          Discover. Build. Automate. Own.
        </p>
        <p className="relative mt-10 display text-[3.4rem] font-bold uppercase tracking-[0.16em] text-electric">
          THANK YOU
        </p>
      </div>
    </SlideShell>
  );
}
