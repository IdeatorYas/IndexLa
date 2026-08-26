import type { ReactNode } from "react";
import { CompetitorComparisonTable } from "@/components/whitepaper/CompetitorComparisonTable";
import { WhitepaperExploreCta } from "@/components/whitepaper/WhitepaperExploreCta";
import {
  BuildDefineExecuteFlowDiagram,
  CreatorRevenueStreamsDiagram,
  DexlaUtilityFlowDiagram,
  ExecutionFeeDistributionDiagram,
  IndexlaFlywheelDiagram,
  NetworkAssetCoverageDiagram,
  PermissionLifecycleDiagram,
  PortfolioArchitectureDiagram,
  RegulatoryFrameworkDiagram,
  RiskFrameworkDiagram,
  RoadmapTimelineDiagram,
  SixBurnMechanismsDiagram,
  ThreeProductBusinessDiagram,
  ThreeProductEcosystemDiagram,
  TokenAllocationDonutDiagram,
  VestingTimelineDiagram,
} from "@/components/whitepaper/diagrams/WhitepaperInstitutionalDiagrams";

export type VisualPlacement = "before" | "after" | "end";

export type SectionVisual = {
  id: string;
  placement: VisualPlacement;
  afterHeadingId?: string;
  node: ReactNode;
};

/** Visuals keyed by section slug. Labels and numbers match whitepaper content only. */
export function getSectionVisuals(slug: string): SectionVisual[] {
  switch (slug) {
    case "4-the-indexla-solution":
      return [
        {
          id: "portfolio-architecture",
          placement: "before",
          node: <PortfolioArchitectureDiagram />,
        },
      ];
    case "5-three-products-for-different-investor-behaviors":
      return [
        {
          id: "three-product-ecosystem",
          placement: "before",
          node: <ThreeProductEcosystemDiagram />,
        },
      ];
    case "6-how-indexla-works":
      return [
        {
          id: "build-define-execute",
          placement: "before",
          node: <BuildDefineExecuteFlowDiagram />,
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
    case "7-strategy-automation":
      return [
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
    case "8-investor-experience":
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
    case "9-creator-economy":
      return [
        {
          id: "creator-revenue",
          placement: "after",
          afterHeadingId: "92-creator-leaderboard",
          node: <CreatorRevenueStreamsDiagram />,
        },
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
    case "10-business-model":
      return [
        {
          id: "three-product-engines",
          placement: "after",
          afterHeadingId: "101-three-product-engines",
          node: <ThreeProductBusinessDiagram />,
        },
        {
          id: "execution-fee-dist",
          placement: "after",
          afterHeadingId: "103-execution-fee-distribution",
          node: <ExecutionFeeDistributionDiagram />,
        },
      ];
    case "11-the-indexla-flywheel":
      return [
        {
          id: "flywheel",
          placement: "before",
          node: <IndexlaFlywheelDiagram />,
        },
      ];
    case "12-dexla-utility-and-tokenomics":
      return [
        {
          id: "dexla-utility",
          placement: "after",
          afterHeadingId: "122-five-core-utilities",
          node: <DexlaUtilityFlowDiagram />,
        },
        {
          id: "six-burns",
          placement: "after",
          afterHeadingId: "123-six-burn-mechanisms",
          node: <SixBurnMechanismsDiagram />,
        },
        {
          id: "token-allocation",
          placement: "after",
          afterHeadingId: "125-supply",
          node: <TokenAllocationDonutDiagram />,
        },
        {
          id: "vesting",
          placement: "after",
          afterHeadingId: "126-vesting-and-release",
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
    case "13-architecture-and-execution":
      return [
        {
          id: "permission-lifecycle",
          placement: "after",
          afterHeadingId: "133-execution-lifecycle",
          node: <PermissionLifecycleDiagram />,
        },
        {
          id: "explore-technical-paper",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/whitepaper/technical"
              label="Read Full Technical Paper →"
            />
          ),
        },
      ];
    case "14-security-privacy-and-mev-protection":
      return [
        {
          id: "explore-technical-paper-security",
          placement: "end",
          node: (
            <WhitepaperExploreCta
              href="/whitepaper/technical"
              label="Explore the Technical Paper →"
            />
          ),
        },
      ];
    case "15-supported-asset-and-network-direction":
      return [
        {
          id: "network-asset-coverage",
          placement: "before",
          node: <NetworkAssetCoverageDiagram />,
        },
      ];
    case "16-competition":
      return [
        {
          id: "competitor-table",
          placement: "after",
          afterHeadingId: "competitive-comparison",
          node: <CompetitorComparisonTable />,
        },
      ];
    case "18-regulatory-approach":
      return [
        {
          id: "regulatory-framework",
          placement: "before",
          node: <RegulatoryFrameworkDiagram />,
        },
      ];
    case "20-progressive-deployment-and-roadmap":
      return [
        {
          id: "roadmap",
          placement: "before",
          node: <RoadmapTimelineDiagram />,
        },
      ];
    case "21-risk-factors":
      return [
        {
          id: "risk-framework",
          placement: "before",
          node: <RiskFrameworkDiagram />,
        },
      ];
    default:
      return [];
  }
}
