import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";
import { WithdrawalService } from "@/lib/services/withdrawal";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, currency, destinationId } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";

    const withdrawal = await WithdrawalService.submit(
      user.id,
      amount,
      currency,
      destinationId,
      ip,
    );

    return NextResponse.json(withdrawal);
  } catch (error) {
    console.error("Error submitting withdrawal:", error);

    let message = "Withdrawal failed";
    let status = 400;

    if (error instanceof Error) {
      message = error.message;
      const err = error as Error & { status?: number; statusCode?: number };
      status =
        err.status ||
        err.statusCode ||
        (error.name === "ValidationError" || error.name === "BadRequestError"
          ? 400
          : 500);
    } else {
      message = String(error);
      status = 500;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
