"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultHybridConfig, defaultsForStrategy } from "./strategies";
import {
  allocationTotal,
  emptyDraft,
  type DraftPortfolio,
  type HybridConfig,
  type SelectedAsset,
  type SimulatorPortfolio,
  type StrategyId,
  type WizardStep,
} from "./types";

const PUBLISHED_STORAGE_KEY = "indexla-hiw-published-v1";
const DRAFT_STORAGE_KEY = "indexla-hiw-draft-v1";

function readPublished(): SimulatorPortfolio[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(PUBLISHED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SimulatorPortfolio[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePublished(list: SimulatorPortfolio[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore quota */
  }
}

function clearDraftSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

type SimulatorContextValue = {
  step: WizardStep;
  setStep: (s: WizardStep) => void;
  draft: DraftPortfolio;
  updateDraft: (patch: Partial<DraftPortfolio>) => void;
  setAssets: (assets: SelectedAsset[]) => void;
  setStrategy: (id: StrategyId) => void;
  setHybrid: (patch: Partial<HybridConfig>) => void;
  published: SimulatorPortfolio[];
  justCreatedId: string | null;
  clearJustCreated: () => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  publish: () => string | null;
  loadForEdit: (id: string) => void;
  pausePortfolio: (id: string) => void;
  resumePortfolio: (id: string) => void;
  rebalancePortfolio: (id: string) => void;
  removePortfolio: (id: string) => void;
  resetDraft: () => void;
  applyTemplate: (build: () => DraftPortfolio) => void;
  canProceed: (from: WizardStep) => boolean;
  goNext: () => void;
  goBack: () => void;
  rebalanceFlashId: string | null;
};

const SimulatorContext = createContext<SimulatorContextValue | null>(null);

const STEP_ORDER: WizardStep[] = [
  "create",
  "assets",
  "strategy",
  "review",
  "success",
];

function newId(): string {
  return `pf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function validateHybrid(hybrid: HybridConfig): boolean {
  if (!hybrid.buyCondition || !hybrid.sellCondition) return false;
  if (!hybrid.sellExecution) return false;
  if (hybrid.sellExecution === "dca-out") {
    if (!(hybrid.dcaOutPct > 0 && hybrid.dcaOutPct <= 100)) return false;
    if (!hybrid.dcaFrequency) return false;
  }
  if (hybrid.sellCondition === "sell-greed") {
    return typeof hybrid.greedThreshold === "number";
  }
  if (hybrid.sellCondition === "sell-rsi-overbought") {
    return (
      typeof hybrid.rsiSellThreshold === "number" && !!hybrid.rsiTimeframe
    );
  }
  if (hybrid.sellCondition === "sell-momentum-bearish") {
    return !!hybrid.momentumTimeframe;
  }
  return true;
}

function validateConfigure(draft: DraftPortfolio): boolean {
  const id = draft.strategyId;
  if (!id) return false;
  const c = draft.strategyConfig;
  switch (id) {
    case "buy-now": {
      if (c.enableTakeProfit && !(typeof c.takeProfitPct === "number" && c.takeProfitPct > 0)) {
        return false;
      }
      if (c.enableStopLoss && !(typeof c.stopLossPct === "number" && c.stopLossPct > 0)) {
        return false;
      }
      return true;
    }
    case "fear-greed":
      return (
        typeof c.fearThreshold === "number" &&
        typeof c.greedThreshold === "number" &&
        !!c.dcaFrequency &&
        typeof c.dcaInPct === "number" &&
        c.dcaInPct > 0 &&
        c.dcaInPct <= 100 &&
        typeof c.dcaOutPct === "number" &&
        c.dcaOutPct > 0 &&
        c.dcaOutPct <= 100
      );
    case "rsi":
      return (
        !!c.rsiTimeframe &&
        typeof c.rsiBuyThreshold === "number" &&
        typeof c.rsiSellThreshold === "number" &&
        typeof c.dcaInPct === "number" &&
        c.dcaInPct > 0 &&
        c.dcaInPct <= 100 &&
        typeof c.dcaOutPct === "number" &&
        c.dcaOutPct > 0 &&
        c.dcaOutPct <= 100
      );
    case "momentum": {
      const mode = c.momentumMode ?? "trend-dca";
      if (!c.momentumTimeframe) return false;
      if (mode === "buy-now-dca-out") {
        return (
          typeof c.dcaOutPct === "number" &&
          c.dcaOutPct > 0 &&
          c.dcaOutPct <= 100
        );
      }
      return (
        typeof c.dcaInPct === "number" &&
        c.dcaInPct > 0 &&
        c.dcaInPct <= 100 &&
        typeof c.dcaOutPct === "number" &&
        c.dcaOutPct > 0 &&
        c.dcaOutPct <= 100
      );
    }
    case "rebalancing":
      return !!c.rebalanceFrequency;
    case "hybrid":
      return validateHybrid(draft.hybrid);
    default:
      return false;
  }
}

export function canProceedFrom(draft: DraftPortfolio, from: WizardStep): boolean {
  switch (from) {
    case "create":
      return (
        draft.name.trim().length > 0 &&
        draft.description.trim().length > 0 &&
        draft.portfolioType !== ""
      );
    case "assets":
      return draft.assets.length >= 1 && allocationTotal(draft.assets) === 100;
    case "strategy":
      return draft.strategyId !== null && validateConfigure(draft);
    case "review":
      return (
        canProceedFrom(draft, "create") &&
        canProceedFrom(draft, "assets") &&
        canProceedFrom(draft, "strategy") &&
        draft.amountUsd > 0
      );
    case "success":
      return true;
    default:
      return true;
  }
}

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<WizardStep>("create");
  const [draft, setDraft] = useState<DraftPortfolio>(emptyDraft);
  const [published, setPublished] = useState<SimulatorPortfolio[]>([]);
  const [justCreatedId, setJustCreatedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rebalanceFlashId, setRebalanceFlashId] = useState<string | null>(null);

  useEffect(() => {
    setPublished(readPublished());
    // Always start the builder empty — never restore a prior draft/template.
    clearDraftSession();
    setDraft(emptyDraft());
    setStep("create");
  }, []);

  // Draft is intentionally not persisted. Fresh land = blank builder.
  // Published marketplace portfolios remain in sessionStorage separately.
  const updateDraft = useCallback((patch: Partial<DraftPortfolio>) => {
    setDraft((d) => ({ ...d, ...patch }));
  }, []);

  const setAssets = useCallback((assets: SelectedAsset[]) => {
    setDraft((d) => ({ ...d, assets }));
  }, []);

  const setStrategy = useCallback((id: StrategyId) => {
    setDraft((d) => ({
      ...d,
      strategyId: id,
      strategyConfig: { ...d.strategyConfig, ...defaultsForStrategy(id) },
      hybrid: id === "hybrid" ? d.hybrid : defaultHybridConfig(),
    }));
  }, []);

  const setHybrid = useCallback((patch: Partial<HybridConfig>) => {
    setDraft((d) => ({ ...d, hybrid: { ...d.hybrid, ...patch } }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(emptyDraft());
    setStep("create");
    clearDraftSession();
  }, []);

  const applyTemplate = useCallback((build: () => DraftPortfolio) => {
    setDraft(build());
    setStep("create");
  }, []);

  const publish = useCallback((): string | null => {
    if (!canProceedFrom(draft, "review") || !draft.strategyId || !draft.portfolioType) {
      return null;
    }
    const id = draft.editingId ?? newId();
    const portfolio: SimulatorPortfolio = {
      id,
      name: draft.name.trim(),
      description: draft.description.trim(),
      portfolioType: draft.portfolioType,
      assets: draft.assets,
      strategyId: draft.strategyId,
      strategyConfig: draft.strategyConfig,
      hybrid: draft.hybrid,
      authorized: true,
      amountUsd: draft.amountUsd,
      status: "active",
      createdAt: Date.now(),
    };

    setPublished((list) => {
      const idx = list.findIndex((p) => p.id === id);
      const next =
        idx >= 0
          ? list.map((p, i) => (i === idx ? portfolio : p))
          : [portfolio, ...list];
      writePublished(next);
      return next;
    });
    setJustCreatedId(id);
    setStep("success");
    setDraft(emptyDraft());
    clearDraftSession();
    return id;
  }, [draft]);

  const loadForEdit = useCallback(
    (id: string) => {
      const p = published.find((x) => x.id === id && x.status !== "removed");
      if (!p) return;
      setDraft({
        name: p.name,
        description: p.description,
        portfolioType: p.portfolioType,
        assets: p.assets,
        strategyId: p.strategyId,
        strategyConfig: p.strategyConfig,
        hybrid: p.hybrid,
        authorized: p.authorized,
        transactionLimitUsd: 5000,
        amountUsd: p.amountUsd,
        editingId: p.id,
      });
      setStep("create");
      setSelectedId(null);
    },
    [published],
  );

  const pausePortfolio = useCallback((id: string) => {
    setPublished((list) => {
      const next = list.map((p) =>
        p.id === id ? { ...p, status: "paused" as const } : p,
      );
      writePublished(next);
      return next;
    });
  }, []);

  const resumePortfolio = useCallback((id: string) => {
    setPublished((list) => {
      const next = list.map((p) =>
        p.id === id ? { ...p, status: "active" as const } : p,
      );
      writePublished(next);
      return next;
    });
  }, []);

  const rebalancePortfolio = useCallback((id: string) => {
    setRebalanceFlashId(id);
    window.setTimeout(() => setRebalanceFlashId(null), 2500);
  }, []);

  const removePortfolio = useCallback((id: string) => {
    setPublished((list) => {
      const next = list.map((p) =>
        p.id === id ? { ...p, status: "removed" as const } : p,
      );
      writePublished(next);
      return next;
    });
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const clearJustCreated = useCallback(() => setJustCreatedId(null), []);

  const canProceed = useCallback(
    (from: WizardStep) => canProceedFrom(draft, from),
    [draft],
  );

  const goNext = useCallback(() => {
    const i = STEP_ORDER.indexOf(step);
    if (i < 0 || i >= STEP_ORDER.length - 1) return;
    if (step !== "success" && !canProceedFrom(draft, step)) {
      return;
    }
    setStep(STEP_ORDER[i + 1]);
  }, [draft, step]);

  const goBack = useCallback(() => {
    if (step === "success") return;
    const i = STEP_ORDER.indexOf(step);
    if (i <= 0) return;
    setStep(STEP_ORDER[i - 1]);
  }, [step]);

  const value = useMemo(
    () => ({
      step,
      setStep,
      draft,
      updateDraft,
      setAssets,
      setStrategy,
      setHybrid,
      published,
      justCreatedId,
      clearJustCreated,
      selectedId,
      setSelectedId,
      publish,
      loadForEdit,
      pausePortfolio,
      resumePortfolio,
      rebalancePortfolio,
      removePortfolio,
      resetDraft,
      applyTemplate,
      canProceed,
      goNext,
      goBack,
      rebalanceFlashId,
    }),
    [
      step,
      draft,
      updateDraft,
      setAssets,
      setStrategy,
      setHybrid,
      published,
      justCreatedId,
      clearJustCreated,
      selectedId,
      publish,
      loadForEdit,
      pausePortfolio,
      resumePortfolio,
      rebalancePortfolio,
      removePortfolio,
      resetDraft,
      applyTemplate,
      canProceed,
      goNext,
      goBack,
      rebalanceFlashId,
    ],
  );

  return (
    <SimulatorContext.Provider value={value}>{children}</SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const ctx = useContext(SimulatorContext);
  if (!ctx) throw new Error("useSimulator must be used within SimulatorProvider");
  return ctx;
}
