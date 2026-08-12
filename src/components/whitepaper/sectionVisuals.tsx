import type { ReactNode } from "react";
import { CompetitorComparisonTable } from "@/components/whitepaper/CompetitorComparisonTable";
import {
  BurnBuybackFlowDiagram,
  CreatorMarketplaceFlowDiagram,
  CrossChainExecutionDiagram,
  EconomicFlywheelDiagram,
  FeeDiscountTiersDiagram,
  FeeDistributionDiagram,
  GtmGrowthFlywheelDiagram,
  HowIndexlaWorksDiagram,
  InvestorExecutionStackDiagram,
  LiquidityRiskControlsDiagram,
  MultiAssetEcosystemDiagram,
  RoadmapPhasesDiagram,
  SecurityRiskDiagram,
  SolutionFlowDiagram,
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
      ];
    case "5-competitive-landscape":
      return [
        {
          id: "competitor-table",
          placement: "after",
          node: <CompetitorComparisonTable />,
        },
      ];
    case "7-how-indexla-works":
      return [
        {
          id: "how-works",
          placement: "before",
          node: <HowIndexlaWorksDiagram />,
        },
      ];
    case "8-execution-liquidity-risk-controls":
      return [
        {
          id: "liquidity-risk",
          placement: "before",
          node: <LiquidityRiskControlsDiagram />,
        },
      ];
    case "9-cross-chain-architecture":
      return [
        {
          id: "cross-chain",
          placement: "before",
          node: <CrossChainExecutionDiagram />,
        },
      ];
    case "10-multi-asset-tokenized-assets":
      return [
        {
          id: "multi-asset",
          placement: "before",
          node: <MultiAssetEcosystemDiagram />,
        },
      ];
    case "11-ai-automation":
      return [
        {
          id: "ai-stack",
          placement: "before",
          node: <InvestorExecutionStackDiagram />,
        },
      ];
    case "12-creator-economy":
      return [
        {
          id: "creator-flow",
          placement: "before",
          node: <CreatorMarketplaceFlowDiagram />,
        },
      ];
    case "13-business-model":
      return [
        {
          id: "fee-dist",
          placement: "after",
          afterHeadingId: "execution-fee-distribution",
          node: <FeeDistributionDiagram />,
        },
        {
          id: "flywheel",
          placement: "after",
          afterHeadingId: "economic-flywheel",
          node: <EconomicFlywheelDiagram />,
        },
      ];
    case "14-dexla-utility-tokenomics":
      return [
        {
          id: "fee-discounts",
          placement: "after",
          afterHeadingId: "fee-discounts",
          node: <FeeDiscountTiersDiagram />,
        },
        {
          id: "burn",
          placement: "after",
          afterHeadingId: "burn-mechanisms",
          node: <BurnBuybackFlowDiagram />,
        },
        {
          id: "allocation",
          placement: "after",
          afterHeadingId: "token-distribution",
          node: <TokenAllocationDiagram />,
        },
        {
          id: "vesting",
          placement: "after",
          afterHeadingId: "vesting-release-schedule",
          node: <VestingTimelineDiagram />,
        },
      ];
    case "15-security-architecture":
      return [
        {
          id: "security-risk",
          placement: "before",
          node: <SecurityRiskDiagram />,
        },
      ];
    case "17-go-to-market":
      return [
        {
          id: "gtm-flywheel",
          placement: "before",
          node: <GtmGrowthFlywheelDiagram />,
        },
      ];
    case "20-progressive-deployment-roadmap":
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
