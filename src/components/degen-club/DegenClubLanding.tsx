import { DegenBagholderSection } from "@/components/degen-club/DegenBagholderSection";
import { DegenBuildBasketSection } from "@/components/degen-club/DegenBuildBasketSection";
import { DegenCreatorsSection } from "@/components/degen-club/DegenCreatorsSection";
import { DegenDisclaimerSection } from "@/components/degen-club/DegenDisclaimerSection";
import { DegenDiscoverSection } from "@/components/degen-club/DegenDiscoverSection";
import { DegenExecutionSection } from "@/components/degen-club/DegenExecutionSection";
import { DegenFinalSection } from "@/components/degen-club/DegenFinalSection";
import { DegenFullExitSection } from "@/components/degen-club/DegenFullExitSection";
import { DegenHeroSection } from "@/components/degen-club/DegenHeroSection";
import { DegenRulesSection } from "@/components/degen-club/DegenRulesSection";
import { DegenSystemSection } from "@/components/degen-club/DegenSystemSection";
import { DegenTenShotsSection } from "@/components/degen-club/DegenTenShotsSection";
import { loadDegenClub } from "@/lib/degen-club.server";

export function DegenClubLanding() {
  const { sections, disclaimer } = loadDegenClub();

  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <>
      {byId["degen-club"] ? <DegenHeroSection section={byId["degen-club"]} /> : null}
      {byId["build-the-basket-own-the-thesis"] ? (
        <DegenBuildBasketSection section={byId["build-the-basket-own-the-thesis"]} />
      ) : null}
      {byId["creators-turn-your-memecoin-thesis-into-a-product"] ? (
        <DegenCreatorsSection
          section={byId["creators-turn-your-memecoin-thesis-into-a-product"]}
        />
      ) : null}
      {byId["discover-or-build"] ? (
        <DegenDiscoverSection section={byId["discover-or-build"]} />
      ) : null}
      {byId["1-shot-vs-10-shots"] ? (
        <DegenTenShotsSection section={byId["1-shot-vs-10-shots"]} />
      ) : null}
      {byId["play-it-like-a-system"] ? (
        <DegenSystemSection section={byId["play-it-like-a-system"]} />
      ) : null}
      {byId["define-your-trading-rules"] ? (
        <DegenRulesSection section={byId["define-your-trading-rules"]} />
      ) : null}
      {byId["don-t-become-a-bagholder"] ? (
        <DegenBagholderSection section={byId["don-t-become-a-bagholder"]} />
      ) : null}
      {byId["automated-private-mev-protected"] ? (
        <DegenExecutionSection section={byId["automated-private-mev-protected"]} />
      ) : null}
      {byId["full-exit-one-click"] ? (
        <DegenFullExitSection section={byId["full-exit-one-click"]} />
      ) : null}
      {byId["degen-club-2"] ? <DegenFinalSection section={byId["degen-club-2"]} /> : null}
      <DegenDisclaimerSection paragraphs={disclaimer} />
    </>
  );
}
