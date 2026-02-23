import { NextRequest, NextResponse } from "next/server";
import { BountyStore } from "@/lib/store";
import { getCurrentUser } from "@/lib/server-auth";
import type { BountyCompletionRecord } from "@/types/reputation";
import type { Bounty } from "@/types/bounty";

const DIFFICULTY_MAP = {
  beginner: "BEGINNER" as const,
  intermediate: "INTERMEDIATE" as const,
  advanced: "ADVANCED" as const,
};

function bountyToCompletionRecord(bounty: Bounty): BountyCompletionRecord {
  const difficulty = bounty.difficulty
    ? (DIFFICULTY_MAP[bounty.difficulty] ?? "BEGINNER")
    : "BEGINNER";
  const reward = bounty.rewardAmount ?? 0;
  const claimedAt = bounty.claimedAt ?? bounty.createdAt;
  const completedAt = bounty.updatedAt;
  const completionTimeHours = Math.max(
    0,
    Math.round(
      (new Date(completedAt).getTime() - new Date(claimedAt).getTime()) /
        (1000 * 60 * 60),
    ),
  );

  return {
    id: `completion-${bounty.id}`,
    bountyId: bounty.id,
    bountyTitle: bounty.issueTitle,
    projectName: bounty.projectName,
    projectLogoUrl: bounty.projectLogoUrl,
    difficulty,
    rewardAmount: reward,
    rewardCurrency: bounty.rewardCurrency,
    claimedAt,
    completedAt,
    completionTimeHours,
    maintainerRating: null,
    maintainerFeedback: null,
    pointsEarned: 0,
  };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await context.params;
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      Math.max(1, Number(searchParams.get("limit")) || 50),
      100,
    );
    const offset = Math.max(0, Number(searchParams.get("offset")) || 0);

    const bounties = BountyStore.getBounties();
    const completed = bounties.filter(
      (b) => b.status === "closed" && b.claimedBy === userId,
    );

    const totalCount = completed.length;
    const paginated = completed.slice(offset, offset + limit);
    const records: BountyCompletionRecord[] = paginated.map((b) =>
      bountyToCompletionRecord(b),
    );

    return NextResponse.json({
      records,
      totalCount,
      hasMore: offset + records.length < totalCount,
    });
  } catch (error) {
    console.error("Error fetching completion history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
