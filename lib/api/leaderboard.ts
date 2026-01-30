import { get } from './client';
import {
    LeaderboardResponse,
    LeaderboardFilters,
    LeaderboardPagination,
    LeaderboardContributor
} from '@/types/leaderboard';

const LEADERBOARD_ENDPOINT = '/api/leaderboard';

export const leaderboardApi = {
    fetchLeaderboard: async (
        filters: LeaderboardFilters,
        pagination: LeaderboardPagination
    ): Promise<LeaderboardResponse> => {
        const params: Record<string, unknown> = {
            page: pagination.page,
            limit: pagination.limit,
        };

        if (filters.tier) params.tier = filters.tier;
        if (filters.tags?.length) params.tags = filters.tags.join(',');

        return get<LeaderboardResponse>(LEADERBOARD_ENDPOINT, { params });
    },

    fetchUserRank: async (userId?: string): Promise<{ rank: number, contributor: LeaderboardContributor } | null> => {
        if (!userId) return null;
        return get<{ rank: number, contributor: LeaderboardContributor }>(`${LEADERBOARD_ENDPOINT}/user/${userId}`);
    },

    fetchTopContributors: async (count: number = 5): Promise<LeaderboardContributor[]> => {
        return get<LeaderboardContributor[]>(`${LEADERBOARD_ENDPOINT}/top`, { params: { count } });
    }
};
