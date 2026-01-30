"use client";

import { useUserRank } from "@/hooks/use-leaderboard";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavRankBadgeProps {
    userId?: string;
    className?: string;
}

export function NavRankBadge({ userId, className }: NavRankBadgeProps) {
    const { data, isLoading } = useUserRank(userId);

    if (!userId) return null;

    if (isLoading) {
        return <Skeleton className="h-6 w-16 rounded-full" />;
    }

    if (!data || !data.rank) return null;

    return (
        <Link href="/leaderboard">
            <Badge
                variant="secondary"
                className={cn(
                    "gap-1.5 pl-1.5 pr-2.5 py-0.5 hover:bg-secondary/80 transition-colors cursor-pointer",
                    className
                )}
            >
                <div className="bg-yellow-500/10 text-yellow-500 rounded-full p-0.5">
                    <Trophy className="h-3 w-3" />
                </div>
                <span className="font-mono font-medium">#{data.rank}</span>
            </Badge>
        </Link>
    );
}
