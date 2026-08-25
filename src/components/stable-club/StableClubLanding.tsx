import { StableDisclaimerSection } from "@/components/stable-club/StableDisclaimerSection";
import { StableFaqSection } from "@/components/stable-club/StableFaqSection";
import { StableHeroSection } from "@/components/stable-club/StableHeroSection";
import { StableHowItWorksSection } from "@/components/stable-club/StableHowItWorksSection";
import { StableNoVaultSection } from "@/components/stable-club/StableNoVaultSection";
import { StablePermissionsSection } from "@/components/stable-club/StablePermissionsSection";
import { StablePoolSelectionSection } from "@/components/stable-club/StablePoolSelectionSection";
import { StablePureLiquiditySection } from "@/components/stable-club/StablePureLiquiditySection";
import { StableRiskStrategiesSection } from "@/components/stable-club/StableRiskStrategiesSection";
import "@/components/stable-club/stable-club.css";
import { loadStableClub } from "@/lib/stable-club.server";
import type { StableBlock } from "@/lib/stable-club";

export function StableClubLanding() {
  const { sections, disclaimer } = loadStableClub();

  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

  const revokeBlock = byId["limited-permissions-full-transparency"]?.blocks.find(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b.type === "p" && b.text.includes("Revoke permissions")
  );

  return (
    <div className="stable-club-page overflow-x-hidden">
      {byId["stable-club"] ? (
        <StableHeroSection section={byId["stable-club"]} />
      ) : null}
      {byId["no-extra-vault-one-less-place-to-get-hacked"] ? (
        <StableNoVaultSection
          section={byId["no-extra-vault-one-less-place-to-get-hacked"]}
        />
      ) : null}
      {byId["choose-your-risk-level"] ? (
        <StableRiskStrategiesSection section={byId["choose-your-risk-level"]} />
      ) : null}
      {byId["smarter-pool-selection"] ? (
        <StablePoolSelectionSection section={byId["smarter-pool-selection"]} />
      ) : null}
      {byId["limited-permissions-full-transparency"] ? (
        <StablePermissionsSection
          section={byId["limited-permissions-full-transparency"]}
        />
      ) : null}
      {byId["how-it-works"] ? (
        <StableHowItWorksSection
          section={byId["how-it-works"]}
          revokeLine={revokeBlock?.text}
        />
      ) : null}
      {byId["pure-liquidity-nothing-else"] ? (
        <StablePureLiquiditySection section={byId["pure-liquidity-nothing-else"]} />
      ) : null}
      {byId["faq"] ? <StableFaqSection section={byId["faq"]} /> : null}
      <StableDisclaimerSection disclaimer={disclaimer} />
    </div>
  );
}
