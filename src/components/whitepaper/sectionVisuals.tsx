import type { ReactNode } from "react";
import { WhitepaperExploreCta } from "@/components/whitepaper/WhitepaperExploreCta";
import {
  ArchitectureGapDiagram,
  DexlaUtilityBurnLoopDiagram,
  EconomicFlywheelDiagram,
  FeeDistributionDiagram,
  GtmGrowthFlywheelDiagram,
  HowIndexlaWorksDiagram,
  IndexlaArchitectureDiagram,
  MarketOpportunityDiagram,
  NonCustodialFlowDiagram,
  RoadmapPhasesDiagram,
  SecurityRiskDiagram,
  SolutionFlowDiagram,
  StrategyEngineDiagram,
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
    case "7-why-the-architecture-gap-is-structural":
      return [
        {
          id: "architecture-gap",
          placement: "before",
          node: <ArchitectureGapDiagram />,
        },
        {
          id: "explore-technical-paper-architecture",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/whitepaper/technical"
              label="Read Full Technical Paper →"
            />
          ),
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
              label="Test the Static Demo →"
            />
          ),
        },
      ];
    case "10-business-model":
      return [
        {
          id: "fee-dist",
          placement: "after",
          afterHeadingId: "fee-distribution",
          node: <FeeDistributionDiagram />,
        },
        {
          id: "flywheel",
          placement: "after",
          afterHeadingId: "treasury",
          node: <EconomicFlywheelDiagram />,
        },
      ];
    case "11-investor-experience":
      return [
        {
          id: "explore-investors",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/investors"
              label="Explore INDEXLA for Investors →"
            />
          ),
        },
      ];
    case "12-strategies":
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
              label="Explore INDEXLA Strategies →"
            />
          ),
        },
      ];
    case "13-creator-economy":
      return [
        {
          id: "explore-creators",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/creators"
              label="Explore INDEXLA for Creators →"
            />
          ),
        },
      ];
    case "14-dexla-utility-tokenomics":
      return [
        {
          id: "dexla-utility-burn-loop",
          placement: "after",
          afterHeadingId: "the-dexla-economic-engine",
          node: <DexlaUtilityBurnLoopDiagram />,
        },
        {
          id: "explore-tokenomics",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/tokenomics"
              label="Visit Tokenomics Page →"
            />
          ),
        },
      ];
    case "15-security-privacy-mev-protection":
      return [
        {
          id: "indexla-architecture",
          placement: "before",
          node: <IndexlaArchitectureDiagram />,
        },
        {
          id: "security-risk",
          placement: "before",
          node: <SecurityRiskDiagram />,
        },
        {
          id: "explore-technical-paper",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/whitepaper/technical"
              label="Explore the Technical Paper →"
            />
          ),
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
    case "18-progressive-deployment-roadmap":
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
