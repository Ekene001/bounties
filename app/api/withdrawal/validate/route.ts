import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";
import { WithdrawalService } from "@/lib/services/withdrawal";

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount } = await request.json();
        const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';

        const validation = await WithdrawalService.validate(user.id, amount, ip);

        return NextResponse.json(validation);
    } catch (error) {
        console.error("Error validating withdrawal:", error);
        return NextResponse.json({ error: "Validation failed" }, { status: 500 });
    }
}
