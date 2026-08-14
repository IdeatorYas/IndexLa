import { creators, getDb, investors } from "@/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLATFORMS = new Set(["x", "linkedin"] as const);

export type SocialPlatform = "x" | "linkedin";

export type EarlyAccessErrorCode =
  | "invalid_email"
  | "missing_fields"
  | "invalid_platform"
  | "duplicate_email"
  | "server_error";

export function normalizeEmail(email: unknown): string {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return email.length > 3 && email.length <= 254 && EMAIL_RE.test(email);
}

export function normalizeSocialHandle(handle: unknown): string {
  if (typeof handle !== "string") return "";
  return handle.trim().replace(/^@+/, "");
}

export function isSocialPlatform(value: unknown): value is SocialPlatform {
  return typeof value === "string" && PLATFORMS.has(value as SocialPlatform);
}

export function isUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidates: unknown[] = [error];
  if ("cause" in error) candidates.push(error.cause);

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object") continue;
    const code =
      "code" in candidate && typeof candidate.code === "string"
        ? candidate.code
        : "";
    const message =
      "message" in candidate && typeof candidate.message === "string"
        ? candidate.message
        : "";
    if (
      code === "23505" ||
      /duplicate key|unique constraint/i.test(message)
    ) {
      return true;
    }
  }

  return false;
}

export async function createInvestorSignup(
  emailRaw: unknown,
): Promise<{ ok: true } | { ok: false; error: EarlyAccessErrorCode }> {
  const email = normalizeEmail(emailRaw);
  if (!email) return { ok: false, error: "missing_fields" };
  if (!isValidEmail(email)) return { ok: false, error: "invalid_email" };

  try {
    const db = getDb();
    await db.insert(investors).values({ email });
    return { ok: true };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, error: "duplicate_email" };
    }
    return { ok: false, error: "server_error" };
  }
}

export async function createCreatorSignup(input: {
  email: unknown;
  socialPlatform: unknown;
  socialHandle: unknown;
}): Promise<{ ok: true } | { ok: false; error: EarlyAccessErrorCode }> {
  const email = normalizeEmail(input.email);
  const socialHandle = normalizeSocialHandle(input.socialHandle);
  const socialPlatform = input.socialPlatform;

  if (!email || !socialHandle || socialPlatform == null) {
    return { ok: false, error: "missing_fields" };
  }
  if (!isValidEmail(email)) return { ok: false, error: "invalid_email" };
  if (!isSocialPlatform(socialPlatform)) {
    return { ok: false, error: "invalid_platform" };
  }
  if (socialHandle.length < 1 || socialHandle.length > 100) {
    return { ok: false, error: "missing_fields" };
  }

  try {
    const db = getDb();
    await db.insert(creators).values({
      email,
      socialPlatform,
      socialHandle,
      socialVerified: false,
    });
    return { ok: true };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, error: "duplicate_email" };
    }
    return { ok: false, error: "server_error" };
  }
}
