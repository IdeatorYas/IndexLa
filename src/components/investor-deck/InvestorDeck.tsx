import "@/components/investor-deck/deck.css";
import {
  Slide01Cover,
  Slide02BigShift,
  Slide03MissingLayer,
  Slide04Product,
} from "@/components/investor-deck/slides/Slides01-04";
import {
  Slide05CreatorEconomy,
  Slide06BusinessModel,
  Slide07DegenClub,
  Slide08Dexla,
} from "@/components/investor-deck/slides/Slides05-08";
import {
  Slide09Market,
  Slide10WhyWins,
  Slide11Competitive,
  Slide12GTM,
} from "@/components/investor-deck/slides/Slides09-12";
import {
  Slide13Fundraising,
  Slide14BigBet,
} from "@/components/investor-deck/slides/Slides13-14";

export function InvestorDeck() {
  return (
    <div className="deck-body deck-viewport">
      <div className="deck-canvas">
        <Slide01Cover />
        <Slide02BigShift />
        <Slide03MissingLayer />
        <Slide04Product />
        <Slide05CreatorEconomy />
        <Slide06BusinessModel />
        <Slide07DegenClub />
        <Slide08Dexla />
        <Slide09Market />
        <Slide10WhyWins />
        <Slide11Competitive />
        <Slide12GTM />
        <Slide13Fundraising />
        <Slide14BigBet />
      </div>
    </div>
  );
}
