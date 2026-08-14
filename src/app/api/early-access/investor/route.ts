import { NextResponse } from "next/server";
import { createInvestorSignup } from "@/lib/early-access";

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

  const email =
    body && typeof body === "object" && "email" in body
      ? (body as { email: unknown }).email
      : undefined;

  const result = await createInvestorSignup(email);

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
