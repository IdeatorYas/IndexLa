import type { ReactNode } from "react";
import { CompetitorComparisonTable } from "@/components/whitepaper/CompetitorComparisonTable";
import {
  ArchitectureGapDiagram,
  BurnBuybackFlowDiagram,
  CreatorMarketplaceFlowDiagram,
  EconomicFlywheelDiagram,
  FeeDiscountTiersDiagram,
  FeeDistributionDiagram,
  GtmGrowthFlywheelDiagram,
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

export type VisualPlacement = "before" | "after";

export type SectionVisual = {
  id: string;
  placement: VisualPlacement;
  afterHeadingId?: string;
  node: ReactNode;
};

/**
 * Visuals keyed by section slug. Labels/numbers match whitepaper content only.
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
    case "4-investor-overview":
      return [
        {
          id: "investor-stack",
          placement: "before",
          node: <InvestorExecutionStackDiagram />,
        },
      ];
    case "5-creator-economy":
      return [
        {
          id: "creator-flow",
          placement: "before",
          node: <CreatorMarketplaceFlowDiagram />,
        },
      ];
    case "6-strategies":
      return [
        {
          id: "strategy-engine",
          placement: "before",
          node: <StrategyEngineDiagram />,
        },
      ];
    case "8-market-opportunity":
      return [
        {
          id: "tam-sam-som",
          placement: "before",
          node: <MarketOpportunityDiagram />,
        },
      ];
    case "9-why-indexla-differs":
      return [
        {
          id: "competitor-table",
          placement: "after",
          afterHeadingId: "why-existing-models-are-different",
          node: <CompetitorComparisonTable />,
        },
      ];
    case "10-why-the-architecture-gap-is-structural":
      return [
        {
          id: "architecture-gap",
          placement: "before",
          node: <ArchitectureGapDiagram />,
        },
      ];
    case "11-business-model":
      return [
        {
          id: "fee-dist",
          placement: "after",
          afterHeadingId: "creator-portfolios",
          node: <FeeDistributionDiagram />,
        },
        {
          id: "flywheel",
          placement: "after",
          afterHeadingId: "treasury",
          node: <EconomicFlywheelDiagram />,
        },
      ];
    case "12-dexla-utility-tokenomics":
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
      ];
    case "13-go-to-market":
      return [
        {
          id: "gtm-flywheel",
          placement: "before",
          node: <GtmGrowthFlywheelDiagram />,
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
    case "16-progressive-deployment-roadmap":
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
