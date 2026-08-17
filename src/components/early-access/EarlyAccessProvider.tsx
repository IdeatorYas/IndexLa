"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const EarlyAccessModal = dynamic(
  () =>
    import("@/components/early-access/EarlyAccessModal").then(
      (mod) => mod.EarlyAccessModal,
    ),
  { ssr: false },
);

export type EarlyAccessMode = "general" | "creator";

type EarlyAccessContextValue = {
  openEarlyAccess: (mode?: EarlyAccessMode) => void;
  openCreatorEarlyAccess: () => void;
  closeEarlyAccess: () => void;
};

type EarlyAccessSession = {
  open: boolean;
  mode: EarlyAccessMode;
  /** Increments on every open so the modal fully resets. */
  sessionId: number;
};

const EarlyAccessContext = createContext<EarlyAccessContextValue | null>(null);

export function EarlyAccessProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<EarlyAccessSession>({
    open: false,
    mode: "general",
    sessionId: 0,
  });

  const openEarlyAccess = useCallback((nextMode: EarlyAccessMode = "general") => {
    // Atomic update: mode + open must change together so creator CTAs never
    // briefly render with a stale general/role-selection session.
    setSession((prev) => ({
      open: true,
      mode: nextMode,
      sessionId: prev.sessionId + 1,
    }));
  }, []);

  const openCreatorEarlyAccess = useCallback(() => {
    openEarlyAccess("creator");
  }, [openEarlyAccess]);

  const closeEarlyAccess = useCallback(() => {
    setSession((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({ openEarlyAccess, openCreatorEarlyAccess, closeEarlyAccess }),
    [openEarlyAccess, openCreatorEarlyAccess, closeEarlyAccess],
  );

  return (
    <EarlyAccessContext.Provider value={value}>
      {children}
      {session.open ? (
        <EarlyAccessModal
          key={session.sessionId}
          open
          mode={session.mode}
          onClose={closeEarlyAccess}
        />
      ) : null}
    </EarlyAccessContext.Provider>
  );
}

export function useEarlyAccess() {
  const ctx = useContext(EarlyAccessContext);
  if (!ctx) {
    throw new Error("useEarlyAccess must be used within EarlyAccessProvider");
  }
  return ctx;
}
