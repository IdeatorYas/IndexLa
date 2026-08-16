import type { ReactNode } from "react";
import { WhitepaperExploreCta } from "@/components/whitepaper/WhitepaperExploreCta";
import {
  ArchitectureGapDiagram,
  BurnBuybackFlowDiagram,
  CreatorMarketplaceFlowDiagram,
  EconomicFlywheelDiagram,
  FeeDiscountTiersDiagram,
  FeeDistributionDiagram,
  GtmGrowthFlywheelDiagram,
  HowIndexlaWorksDiagram,
  InvestorExecutionStackDiagram,
  MarketOpportunityDiagram,
  NonCustodialFlowDiagram,
  RoadmapPhasesDiagram,
  SecurityRiskDiagram,
  SolutionFlowDiagram,
  StrategyEngineDiagram,
  TokenAllocationDiagram,
  VestingTimelineDiagram,
} from "@/components/whitepaper/diagrams/WhitepaperDiagrams";

export type VisualPlacement = "before" | "after" | "end";

export type SectionVisual = {
  id: string;
  placement: VisualPlacement;
  afterHeadingId?: string;
  node: ReactNode;
};

/**
 * Visuals keyed by section slug. Labels/numbers match whitepaper content only.
 * Source: docs/INDEXLA WHITEPAPER FINAL.docx (20 numbered sections + disclaimer).
 */
export function getSectionVisuals(slug: string): SectionVisual[] {
  switch (slug) {
    case "3-the-indexla-solution":
      return [
        {
          id: "solution-flow",
          placement: "before",
          node: <SolutionFlowDiagram />,
        },
        {
          id: "non-custodial",
          placement: "after",
          afterHeadingId: "non-custodial-by-design",
          node: <NonCustodialFlowDiagram />,
        },
      ];
    case "6-why-the-architecture-gap-is-structural":
      return [
        {
          id: "architecture-gap",
          placement: "before",
          node: <ArchitectureGapDiagram />,
        },
      ];
    case "7-market-opportunity":
      return [
        {
          id: "tam-sam-som",
          placement: "before",
          node: <MarketOpportunityDiagram />,
        },
      ];
    case "9-how-indexla-works":
      return [
        {
          id: "how-works",
          placement: "before",
          node: <HowIndexlaWorksDiagram />,
        },
        {
          id: "explore-how-it-works",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/how-it-works"
              label="See How It Works →"
            />
          ),
        },
      ];
    case "9-business-model":
      return [
        {
          id: "fee-dist",
          placement: "after",
          afterHeadingId: "1-execution-fee",
          node: <FeeDistributionDiagram />,
        },
        {
          id: "flywheel",
          placement: "after",
          afterHeadingId: "treasury",
          node: <EconomicFlywheelDiagram />,
        },
      ];
    case "10-investor-overview":
      return [
        {
          id: "investor-stack",
          placement: "before",
          node: <InvestorExecutionStackDiagram />,
        },
        {
          id: "explore-investors",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/investors"
              label="Explore Investor Experience →"
            />
          ),
        },
      ];
    case "11-strategies":
      return [
        {
          id: "strategy-engine",
          placement: "before",
          node: <StrategyEngineDiagram />,
        },
        {
          id: "explore-strategies",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/strategies"
              label="Explore Strategies →"
            />
          ),
        },
      ];
    case "12-creator-economy":
      return [
        {
          id: "creator-flow",
          placement: "before",
          node: <CreatorMarketplaceFlowDiagram />,
        },
        {
          id: "explore-creators",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/creators"
              label="Explore Creator Program →"
            />
          ),
        },
      ];
    case "13-dexla-utility-tokenomics":
      return [
        {
          id: "fee-discounts",
          placement: "after",
          afterHeadingId: "04-save",
          node: <FeeDiscountTiersDiagram />,
        },
        {
          id: "burn",
          placement: "after",
          afterHeadingId: "05-strategy-monetization-burn",
          node: <BurnBuybackFlowDiagram />,
        },
        {
          id: "allocation",
          placement: "after",
          afterHeadingId: "network",
          node: <TokenAllocationDiagram />,
        },
        {
          id: "vesting",
          placement: "after",
          afterHeadingId: "vesting-release-schedule",
          node: <VestingTimelineDiagram />,
        },
        {
          id: "explore-dexla",
          placement: "end",
          node: (
            <WhitepaperExploreCta href="/tokenomics" label="Explore $DEXLA →" />
          ),
        },
      ];
    case "14-security-architecture":
      return [
        {
          id: "security-risk",
          placement: "before",
          node: <SecurityRiskDiagram />,
        },
      ];
    case "16-go-to-market":
      return [
        {
          id: "gtm-flywheel",
          placement: "before",
          node: <GtmGrowthFlywheelDiagram />,
        },
      ];
    case "17-progressive-deployment-roadmap":
      return [
        {
          id: "roadmap",
          placement: "before",
          node: <RoadmapPhasesDiagram />,
        },
      ];
    default:
      return [];
  }
}
