import { NextResponse } from "next/server";
import { createCreatorSignup } from "@/lib/early-access";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 },
    );
  }

  const payload =
    body && typeof body === "object"
      ? (body as {
          email?: unknown;
          socialPlatform?: unknown;
          socialHandle?: unknown;
        })
      : {};

  const result = await createCreatorSignup({
    email: payload.email,
    socialPlatform: payload.socialPlatform,
    socialHandle: payload.socialHandle,
  });

  if (!result.ok) {
    const status =
      result.error === "duplicate_email"
        ? 409
        : result.error === "server_error"
          ? 500
          : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result, { status: 201 });
}
