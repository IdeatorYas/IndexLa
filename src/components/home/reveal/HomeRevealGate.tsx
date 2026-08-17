"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RevealPhone } from "@/components/home/reveal/RevealPhone";
import { RevealScreen1 } from "@/components/home/reveal/RevealScreen1";
import {
  REVEAL_ASSETS,
  hasSeenReveal,
  markRevealSeen,
  shouldForceReveal,
} from "@/components/home/reveal/revealAssets";
import { LOGO_TRANSPARENT } from "@/lib/site";

type Phase =
  | "boot"
  | "intro"
  | "forming"
  | "identity"
  | "welcome"
  | "exiting"
  | "done";

/** Time between each asset fly-in — long enough to see each entry */
const ASSET_STAGGER_MS = 420;
const FORMING_PHONE_IN_MS = 850;
/** Pause after final asset with completed portfolio visible */
const POST_POPULATE_HOLD_MS = 1300;
const IDENTITY_HOLD_MS = 1300;
/** Hold welcome copy long enough to read before exit */
const WELCOME_HOLD_MS = 2000;
const EXIT_MS = 500;

type HomeRevealGateProps = {
  children: ReactNode;
};

export function HomeRevealGate({ children }: HomeRevealGateProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("boot");
  const [visibleCount, setVisibleCount] = useState(0);
  const [enteringIndex, setEnteringIndex] = useState(-1);
  const timers = useRef<number[]>([]);
  const startedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    const force = shouldForceReveal();
    if (!force && hasSeenReveal()) {
      markRevealSeen();
      setPhase("done");
      return;
    }
    setPhase("intro");
  }, []);

  useEffect(() => {
    if (phase === "done") return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const finish = useCallback(() => {
    markRevealSeen();
    setPhase("exiting");
    schedule(() => setPhase("done"), EXIT_MS);
  }, [schedule]);

  const startFormation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    clearTimers();
    setVisibleCount(reduceMotion ? REVEAL_ASSETS.length : 0);
    setEnteringIndex(-1);
    setPhase("forming");

    if (reduceMotion) {
      schedule(() => setPhase("identity"), 900);
      schedule(() => setPhase("welcome"), 900 + 1600);
      schedule(() => finish(), 900 + 1600 + WELCOME_HOLD_MS);
      return;
    }

    schedule(() => {
      REVEAL_ASSETS.forEach((_, i) => {
        schedule(() => {
          setEnteringIndex(i);
          setVisibleCount(i + 1);
        }, i * ASSET_STAGGER_MS);
      });
      const populateDone =
        REVEAL_ASSETS.length * ASSET_STAGGER_MS + POST_POPULATE_HOLD_MS;
      schedule(() => setEnteringIndex(-1), REVEAL_ASSETS.length * ASSET_STAGGER_MS);
      schedule(() => setPhase("identity"), populateDone);
      schedule(() => setPhase("welcome"), populateDone + IDENTITY_HOLD_MS);
      schedule(
        () => finish(),
        populateDone + IDENTITY_HOLD_MS + WELCOME_HOLD_MS,
      );
    }, FORMING_PHONE_IN_MS);
  }, [clearTimers, finish, reduceMotion, schedule]);

  const active = phase !== "done";
  const showScreen1 = phase === "intro" || phase === "forming";
  const showFormation =
    phase === "forming" || phase === "identity" || phase === "welcome";
  const showWelcome = phase === "welcome";

  return (
    <>
      {children}

      <AnimatePresence>
        {active ? (
          <motion.div
            key="indexla-reveal"
            className="fixed inset-0 z-[80] overflow-hidden bg-void"
            initial={false}
            animate={{
              opacity: phase === "exiting" ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: EXIT_MS / 1000, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="INDEXLA portfolio reveal"
          >
            <div
              className="pointer-events-none absolute inset-0 hero-glow"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-purple/18 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void via-void/80 to-transparent"
              aria-hidden
            />

            {phase === "boot" ? (
              <div className="absolute inset-0 z-50 bg-void" aria-hidden />
            ) : null}

            <AnimatePresence>
              {showScreen1 ? (
                <motion.div
                  key="reveal-intro"
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <RevealScreen1
                    onBuild={startFormation}
                    fading={phase === "forming"}
                    reduceMotion={!!reduceMotion}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {showFormation ? (
                <motion.div
                  key="formation"
                  className="absolute inset-0 z-30 flex items-center justify-center overflow-visible px-3 py-[max(0.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-3"
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 20, scale: 0.96 }
                  }
                  animate={{
                    opacity: showWelcome ? 0.16 : 1,
                    y: 0,
                    scale: showWelcome && !reduceMotion ? 0.97 : 1,
                    filter:
                      showWelcome && !reduceMotion ? "blur(5px)" : "blur(0px)",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <RevealPhone
                    assets={REVEAL_ASSETS}
                    visibleCount={visibleCount}
                    enteringIndex={enteringIndex}
                    showIdentity={
                      phase === "identity" || phase === "welcome"
                    }
                    reduceMotion={!!reduceMotion}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {showWelcome ? (
                <motion.div
                  key="welcome"
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 text-center"
                  initial={
                    reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Image
                    src={LOGO_TRANSPARENT}
                    alt="INDEXLA"
                    width={520}
                    height={208}
                    className="mb-7 h-[5.5rem] w-auto object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:mb-9 sm:h-[7.5rem] md:h-[8.75rem]"
                    priority
                  />
                  <p className="display text-[clamp(2rem,6vw,3.4rem)] font-semibold tracking-[-0.04em] text-ink text-balance">
                    Welcome to INDEXLA.
                  </p>
                  <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.45rem,4.6vw,2.2rem)] font-semibold leading-snug tracking-[-0.03em] text-electric text-pretty">
                    The distribution layer for digital assets.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
