"use client";

import {
  FormEvent,
  useEffect,
  useId,
  useState,
} from "react";
import type { EarlyAccessMode } from "@/components/early-access/EarlyAccessProvider";
import { XLogo } from "@/components/creators/SocialBrandLogos";

type Role = "investor" | "creator";
type SocialPlatform = "x" | "linkedin";
type Step = "role" | "form" | "success";

type EarlyAccessModalProps = {
  open: boolean;
  mode: EarlyAccessMode;
  onClose: () => void;
};

type ApiError =
  | "invalid_email"
  | "missing_fields"
  | "invalid_platform"
  | "invalid_social"
  | "duplicate_email"
  | "server_error";

const ERROR_MESSAGES: Record<ApiError, string> = {
  invalid_email: "Please enter a valid email address.",
  missing_fields: "Please complete all required fields.",
  invalid_platform: "Please choose X or LinkedIn.",
  invalid_social: "Please enter a valid LinkedIn profile URL.",
  duplicate_email: "This email is already registered for early access.",
  server_error: "Something went wrong. Please try again.",
};

function LinkedInLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-1 focus:ring-electric/25";

const labelClass =
  "text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim";

const primaryBtnClass =
  "inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue px-6 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60";

export function EarlyAccessModal({ open, mode, onClose }: EarlyAccessModalProps) {
  const titleId = useId();
  const [step, setStep] = useState<Step>(mode === "creator" ? "form" : "role");
  const [role, setRole] = useState<Role | null>(mode === "creator" ? "creator" : null);
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<SocialPlatform | null>(null);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    setStep(mode === "creator" ? "form" : "role");
    setRole(mode === "creator" ? "creator" : null);
    setEmail("");
    setPlatform(null);
    setHandle("");
    setError(null);
    setSubmitting(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, mode, onClose]);

  if (!open) return null;

  function chooseRole(next: Role) {
    setRole(next);
    setStep("form");
    setError(null);
  }

  function goBackToRole() {
    if (mode === "creator") return;
    setStep("role");
    setRole(null);
    setError(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!role) {
      setError(ERROR_MESSAGES.missing_fields);
      return;
    }

    setSubmitting(true);

    try {
      const endpoint =
        role === "investor"
          ? "/api/early-access/investor"
          : "/api/early-access/creator";

      const body =
        role === "investor"
          ? { email }
          : {
              email,
              socialPlatform: platform,
              socialHandle: handle,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: ApiError }
        | null;

      if (!response.ok || !data?.ok) {
        const code = data?.error ?? "server_error";
        setError(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.server_error);
        return;
      }

      setStep("success");
    } catch {
      setError(ERROR_MESSAGES.server_error);
    } finally {
      setSubmitting(false);
    }
  }

  const heading =
    step === "success"
      ? "Thank you"
      : step === "role"
        ? "Are you an Investor or Creator?"
        : role === "creator" || mode === "creator"
          ? "Join as a Creator"
          : "Join as an Investor";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close early access dialog"
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] flex max-h-[min(92svh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.5rem] border border-electric/30 bg-gradient-to-b from-panel via-deep to-void shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-[1.5rem]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Early Access
            </p>
            <h2
              id={titleId}
              className="display mt-1 text-[1.25rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.4rem]"
            >
              {heading}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-3 py-1.5 text-[0.85rem] font-semibold text-muted transition-colors hover:border-electric/40 hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {step === "success" ? (
            <div className="space-y-6 text-center">
              <div className="mx-auto max-w-sm space-y-3">
                <p className="text-[1.15rem] font-semibold tracking-[-0.015em] text-ink text-balance">
                  Thank you for your interest in INDEXLA.
                </p>
                <p className="text-[1rem] leading-relaxed text-muted text-balance">
                  You’ll be among the first to know when our testnet goes live.
                </p>
              </div>
              <button type="button" className={primaryBtnClass} onClick={onClose}>
                Done
              </button>
            </div>
          ) : null}

          {step === "role" ? (
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => chooseRole("investor")}
                className="rounded-2xl border border-line bg-white/[0.03] px-5 py-5 text-left transition-colors hover:border-electric/45 hover:bg-electric/[0.06]"
              >
                <p className="text-[1.05rem] font-semibold text-ink">Investor</p>
                <p className="mt-1 text-[0.92rem] text-muted">
                  Build and automate your portfolio.
                </p>
              </button>
              <button
                type="button"
                onClick={() => chooseRole("creator")}
                className="rounded-2xl border border-line bg-white/[0.03] px-5 py-5 text-left transition-colors hover:border-electric/45 hover:bg-electric/[0.06]"
              >
                <p className="text-[1.05rem] font-semibold text-ink">Creator</p>
                <p className="mt-1 text-[0.92rem] text-muted">
                  Build portfolios and strategies. Earn from your alpha.
                </p>
              </button>
            </div>
          ) : null}

          {step === "form" && role ? (
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              {mode === "general" ? (
                <button
                  type="button"
                  onClick={goBackToRole}
                  className="text-[0.88rem] font-semibold text-electric transition-colors hover:text-ink"
                >
                  ← Back
                </button>
              ) : null}

              <div>
                <label htmlFor="ea-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="ea-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>

              {role === "creator" ? (
                <>
                  <div>
                    <p className={labelClass}>Social platform</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPlatform("x");
                          setHandle("");
                          setError(null);
                        }}
                        aria-pressed={platform === "x"}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[0.95rem] font-semibold transition-colors ${
                          platform === "x"
                            ? "border-electric/50 bg-electric/[0.1] text-ink"
                            : "border-line bg-void/60 text-muted hover:border-electric/35 hover:text-ink"
                        }`}
                      >
                        <XLogo className="h-4 w-4" />
                        X
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPlatform("linkedin");
                          setHandle("");
                          setError(null);
                        }}
                        aria-pressed={platform === "linkedin"}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[0.95rem] font-semibold transition-colors ${
                          platform === "linkedin"
                            ? "border-electric/50 bg-electric/[0.1] text-ink"
                            : "border-line bg-void/60 text-muted hover:border-electric/35 hover:text-ink"
                        }`}
                      >
                        <LinkedInLogo className="h-4 w-4" />
                        LinkedIn
                      </button>
                    </div>
                  </div>

                  {platform ? (
                    <div>
                      <label htmlFor="ea-handle" className={labelClass}>
                        {platform === "linkedin"
                          ? "LinkedIn Profile URL"
                          : "X Handle"}
                      </label>
                      <input
                        id="ea-handle"
                        name="socialHandle"
                        type={platform === "linkedin" ? "url" : "text"}
                        autoComplete={
                          platform === "linkedin" ? "url" : "username"
                        }
                        required
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder={
                          platform === "linkedin"
                            ? "https://linkedin.com/in/username"
                            : "@username"
                        }
                        className={fieldClass}
                      />
                    </div>
                  ) : null}
                </>
              ) : null}

              {error ? (
                <p
                  role="alert"
                  className="rounded-xl border border-danger/35 bg-danger/[0.08] px-4 py-3 text-[0.92rem] text-danger"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className={primaryBtnClass}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
