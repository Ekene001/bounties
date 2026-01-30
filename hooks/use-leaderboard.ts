import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { leaderboardApi } from '@/lib/api/leaderboard';
import { LeaderboardFilters } from '@/types/leaderboard';

export const LEADERBOARD_KEYS = {
    all: ['leaderboard'] as const,
    lists: () => [...LEADERBOARD_KEYS.all, 'list'] as const,
    list: (filters: LeaderboardFilters) => [...LEADERBOARD_KEYS.lists(), filters] as const,
    user: (userId: string) => [...LEADERBOARD_KEYS.all, 'user', userId] as const,
    top: (count: number) => [...LEADERBOARD_KEYS.all, 'top', count] as const,
};

export const useLeaderboard = (filters: LeaderboardFilters, limit: number = 20) => {
    return useInfiniteQuery({
        queryKey: LEADERBOARD_KEYS.list(filters),
        queryFn: ({ pageParam = 1 }) =>
            leaderboardApi.fetchLeaderboard(filters, { page: pageParam, limit }),
        getNextPageParam: (lastPage, allPages) => {
            // Optimization: Use simple math instead of iterating all entries
            if (allPages.length * limit < lastPage.totalCount) {
                return allPages.length + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useUserRank = (userId?: string) => {
    return useQuery({
        queryKey: LEADERBOARD_KEYS.user(userId || ''),
        queryFn: () => leaderboardApi.fetchUserRank(userId),
        enabled: !!userId,
    });
};

export const useTopContributors = (count: number = 5) => {
    return useQuery({
        queryKey: LEADERBOARD_KEYS.top(count),
        queryFn: () => leaderboardApi.fetchTopContributors(count),
        staleTime: 1000 * 60 * 15, // 15 minutes
    });
};

export const usePrefetchLeaderboardPage = () => {
    const queryClient = useQueryClient();

    return (filters: LeaderboardFilters, page: number, limit: number) => {
        queryClient.prefetchInfiniteQuery({
            queryKey: LEADERBOARD_KEYS.list(filters),
            queryFn: ({ pageParam }) => leaderboardApi.fetchLeaderboard(filters, { page: pageParam as number, limit }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                const loadedCount = allPages.flatMap(p => p.entries).length;
                if (loadedCount < lastPage.totalCount) {
                    return allPages.length + 1;
                }
                return undefined;
            },
            pages: page // Prefetch up to this many pages if needed
        });
    };
};
