import type { ReactNode } from "react";
import { WhitepaperExploreCta } from "@/components/whitepaper/WhitepaperExploreCta";
import {
  ArchitectureGapDiagram,
  BurnBuybackFlowDiagram,
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
    case "11-investor-experience":
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
