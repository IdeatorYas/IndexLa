import type { ReactNode } from "react";
import { CompetitorComparisonTable } from "@/components/whitepaper/CompetitorComparisonTable";
import {
  BurnBuybackFlowDiagram,
  CreatorMarketplaceFlowDiagram,
  CrossChainExecutionDiagram,
  EconomicFlywheelDiagram,
  FeeDiscountTiersDiagram,
  FeeModelDiagram,
  GtmGrowthFlywheelDiagram,
  InvestorExecutionStackDiagram,
  MultiAssetEcosystemDiagram,
  NonCustodialFlowDiagram,
  RoadmapPhasesDiagram,
  SecurityRiskDiagram,
  SolutionFlowDiagram,
  StrategyEngineDiagram,
  TechnicalLayersDiagram,
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
          placement: "after",
          afterHeadingId: "core-flow",
          node: <SolutionFlowDiagram />,
        },
      ];
    case "4-non-custodial-architecture":
      return [
        {
          id: "nc-flow",
          placement: "before",
          node: <NonCustodialFlowDiagram />,
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
    case "6-multi-asset-cross-chain-infrastructure":
      return [
        {
          id: "multi-asset",
          placement: "after",
          afterHeadingId: "supported-asset-categories",
          node: <MultiAssetEcosystemDiagram />,
        },
        {
          id: "cross-chain",
          placement: "after",
          afterHeadingId: "cross-chain-execution",
          node: <CrossChainExecutionDiagram />,
        },
      ];
    case "7-strategy-engine":
      return [
        {
          id: "strategy-engine",
          placement: "before",
          node: <StrategyEngineDiagram />,
        },
      ];
    case "8-ai-automation":
      return [
        {
          id: "ai-stack",
          placement: "before",
          node: <InvestorExecutionStackDiagram />,
        },
      ];
    case "11-business-model":
      return [
        {
          id: "fee-model",
          placement: "before",
          node: <FeeModelDiagram />,
        },
      ];
    case "12-creator-economy":
      return [
        {
          id: "creator-flow",
          placement: "after",
          afterHeadingId: "creator-workflow",
          node: <CreatorMarketplaceFlowDiagram />,
        },
      ];
    case "13-dexla-utility":
      return [
        {
          id: "fee-discounts",
          placement: "after",
          afterHeadingId: "execution-fee-discounts",
          node: <FeeDiscountTiersDiagram />,
        },
        {
          id: "burn",
          placement: "after",
          afterHeadingId: "buyback-burn",
          node: <BurnBuybackFlowDiagram />,
        },
      ];
    case "16-security-risk-management":
      return [
        {
          id: "security-risk",
          placement: "before",
          node: <SecurityRiskDiagram />,
        },
      ];
    case "17-technical-architecture":
      return [
        {
          id: "tech-layers",
          placement: "before",
          node: <TechnicalLayersDiagram />,
        },
      ];
    case "19-progressive-deployment-roadmap":
      return [
        {
          id: "roadmap",
          placement: "before",
          node: <RoadmapPhasesDiagram />,
        },
      ];
    case "20-go-to-market-strategy":
      return [
        {
          id: "gtm-flywheel",
          placement: "after",
          afterHeadingId: "growth-flywheel",
          node: <GtmGrowthFlywheelDiagram />,
        },
      ];
    case "21-economic-flywheel":
      return [
        {
          id: "eco-flywheel",
          placement: "before",
          node: <EconomicFlywheelDiagram />,
        },
      ];
    default:
      return [];
  }
}
