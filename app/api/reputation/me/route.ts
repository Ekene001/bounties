import { NextResponse } from "next/server";
import { ReputationService } from "@/lib/services/reputation";
import { getCurrentUser } from "@/lib/server-auth";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const reputation = await ReputationService.getReputation(user.id);

        if (!reputation) {
            return NextResponse.json(
                { error: "Reputation profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(reputation);
    } catch (error) {
        console.error("Error fetching my reputation:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
