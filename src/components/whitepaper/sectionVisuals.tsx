import type { ReactNode } from "react";
import {
  BurnBuybackFlowDiagram,
  CreatorMarketplaceFlowDiagram,
  CrossChainExecutionDiagram,
  EconomicFlywheelDiagram,
  FeeDistributionDiagram,
  InvestorExecutionStackDiagram,
  NonCustodialFlowDiagram,
  ProtocolArchitectureDiagram,
  RoadmapPhasesDiagram,
  SolutionFlowDiagram,
  TokenAllocationDiagram,
  VestingTimelineDiagram,
} from "@/components/whitepaper/diagrams/WhitepaperDiagrams";

export type VisualPlacement = "before" | "after";

export type SectionVisual = {
  id: string;
  placement: VisualPlacement;
  /** Insert after this heading id within the section markdown; omit for section start/end */
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
          id: "architecture",
          placement: "after",
          afterHeadingId: "one-portfolio-layer-for-assets-strategies-execution-and-distribution",
          node: <ProtocolArchitectureDiagram />,
        },
        {
          id: "solution-flow",
          placement: "after",
          afterHeadingId: "one-portfolio-layer-for-assets-strategies-execution-and-distribution",
          node: <SolutionFlowDiagram />,
        },
        {
          id: "cross-chain",
          placement: "after",
          afterHeadingId: "multi-asset-cross-chain-execution",
          node: <CrossChainExecutionDiagram />,
        },
      ];
    case "4-non-custodial-execution":
      return [
        {
          id: "nc-flow",
          placement: "before",
          node: <NonCustodialFlowDiagram />,
        },
      ];
    case "6-creator-marketplace":
      return [
        {
          id: "creator-flow",
          placement: "after",
          afterHeadingId: "turn-investment-conviction-into-an-investable-portfolio",
          node: <CreatorMarketplaceFlowDiagram />,
        },
      ];
    case "7-investor-experience":
      return [
        {
          id: "investor-stack",
          placement: "after",
          afterHeadingId: "ai-watches-your-rules-decide",
          node: <InvestorExecutionStackDiagram />,
        },
      ];
    case "11-business-model":
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
    case "12-dexla-token-economics":
      return [
        {
          id: "allocation",
          placement: "after",
          afterHeadingId: "token-allocation",
          node: <TokenAllocationDiagram />,
        },
        {
          id: "vesting",
          placement: "after",
          afterHeadingId: "vesting-release-schedule",
          node: <VestingTimelineDiagram />,
        },
        {
          id: "burn",
          placement: "after",
          afterHeadingId: "3-treasury-profit-buyback-burn",
          node: <BurnBuybackFlowDiagram />,
        },
      ];
    case "17-roadmap":
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
