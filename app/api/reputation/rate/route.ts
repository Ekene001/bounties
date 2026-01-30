import { NextRequest, NextResponse } from "next/server";
import { ReputationService } from "@/lib/services/reputation";
import { RateContributorInput } from "@/types/reputation";
import { getCurrentUser } from "@/lib/server-auth";

export async function POST(request: NextRequest) {
    try {
        // Auth Check: Ensure user is authenticated
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body: RateContributorInput = await request.json();
        const { contributorId, rating, bountyId } = body;

        // Validation
        if (!contributorId || rating === undefined || rating === null || !bountyId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const numericRating = Number(rating);

        if (!Number.isFinite(numericRating)) {
            return NextResponse.json(
                { error: "Rating must be a valid number" },
                { status: 400 }
            );
        }

        if (numericRating < 1 || numericRating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Call service (mock maintainer ID)
        const success = await ReputationService.rateContributor("maintainer-1", contributorId, numericRating);

        return NextResponse.json({ success });
    } catch (error) {
        console.error("Error rating contributor:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
