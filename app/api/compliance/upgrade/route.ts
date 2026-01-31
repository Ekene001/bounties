import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";
import { VerificationService } from "@/lib/services/verification";

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { targetTier } = await request.json();

        const verificationRequest = await VerificationService.createVerificationRequest(
            user.id,
            targetTier
        );

        return NextResponse.json(verificationRequest);
    } catch (error: any) {
        console.error("Error creating verification request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create verification request" },
            { status: 400 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const status = await VerificationService.getVerificationStatus(user.id);
        return NextResponse.json(status);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch verification status" }, { status: 500 });
    }
}
