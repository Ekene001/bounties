"use client";

import { useContributorReputation, useLinkWallet } from "@/hooks/use-reputation";
import { ReputationCard } from "@/components/reputation/reputation-card";
import { CompletionHistory } from "@/components/reputation/completion-history";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const params = useParams();
    const userId = params.userId as string;
    const { data: reputation, isLoading, error } = useContributorReputation(userId);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <Skeleton className="h-10 w-32 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Skeleton className="h-[400px] md:col-span-1" />
                    <Skeleton className="h-[400px] md:col-span-2" />
                </div>
            </div>
        );
    }

    if (error || !reputation) {
        return (
            <div className="container mx-auto py-16 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    We couldn't find a reputation profile for this user.
                </p>
                <Button asChild variant="outline">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        );
    }

    // Mock history data using the reputation stats (Since we don't have a real history endpoint yet)
    // In a real app, we would fetch this from a separate endpoint or include it in the reputation data
    const mockHistory = Array(reputation.stats.totalCompleted).fill(null).map((_, i) => ({
        id: `bounty-${i}`,
        bountyId: `b-${i}`,
        bountyTitle: `Implemented feature #${100 + i}`,
        projectName: "Drips Protocol",
        projectLogoUrl: null,
        difficulty: ["BEGINNER", "INTERMEDIATE", "ADVANCED"][i % 3] as any,
        rewardAmount: 500,
        rewardCurrency: "USDC",
        claimedAt: "2023-01-01T00:00:00Z",
        completedAt: new Date(Date.now() - i * 86400000 * 5).toISOString(),
        completionTimeHours: 48,
        maintainerRating: 5,
        maintainerFeedback: "Great work!",
        pointsEarned: 150
    }));

    return (
        <div className="container max-w-6xl mx-auto py-8 px-4">
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground">
                <Link href="/">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Reputation Card */}
                <div className="lg:col-span-4 space-y-6">
                    <ReputationCard reputation={reputation} />

                    {/* Additional Sidebar Info could go here */}
                </div>

                {/* Main Content: Activity & History */}
                <div className="lg:col-span-8">
                    <Tabs defaultValue="history" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                            <TabsTrigger
                                value="history"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                            >
                                Bounty History
                            </TabsTrigger>
                            <TabsTrigger
                                value="analytics"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                            >
                                Analytics
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="history" className="mt-6">
                            <h2 className="text-xl font-bold mb-4">Activity History</h2>
                            <CompletionHistory
                                records={mockHistory}
                                description={`Showing the last ${mockHistory.length} completed bounties.`}
                            />
                        </TabsContent>

                        <TabsContent value="analytics" className="mt-6">
                            <div className="p-8 border rounded-lg text-center text-muted-foreground bg-secondary/5">
                                Detailed analytics coming soon.
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
