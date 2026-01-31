import type { BountyListParams } from '@/lib/api';

/**
 * Query Key Factory for Bounties
 * 
 * Hierarchical structure enables granular cache invalidation:
 * - bountyKeys.all → invalidates everything
 * - bountyKeys.lists() → invalidates all lists, keeps details
 * - bountyKeys.list(filters) → invalidates specific filtered list
 * - bountyKeys.details() → invalidates all details, keeps lists
 * - bountyKeys.detail(id) → invalidates specific bounty
 */
export const bountyKeys = {
    all: ['bounties'] as const,
    lists: () => [...bountyKeys.all, 'list'] as const,
    list: (filters?: BountyListParams) => [...bountyKeys.lists(), filters] as const,
    infinite: (filters?: Omit<BountyListParams, 'page'>) => [...bountyKeys.lists(), 'infinite', filters] as const,
    details: () => [...bountyKeys.all, 'detail'] as const,
    detail: (id: string) => [...bountyKeys.details(), id] as const,
};

// Type helpers for query keys
export type BountyQueryKey =
    | ReturnType<typeof bountyKeys.list>
    | ReturnType<typeof bountyKeys.infinite>
    | ReturnType<typeof bountyKeys.detail>;

/**
 * Query Key Factory for Authentication
 * 
 * Hierarchical structure for auth/user cache management:
 * - authKeys.all → invalidates everything auth-related
 * - authKeys.session() → invalidates session data
 */
export const authKeys = {
    all: ['auth'] as const,
    session: () => [...authKeys.all, 'session'] as const,
};

export const complianceKeys = {
    all: ['compliance'] as const,
    status: () => [...complianceKeys.all, 'status'] as const,
};

export const termsKeys = {
    all: ['terms'] as const,
    current: () => [...termsKeys.all, 'current'] as const,
};

export const withdrawalKeys = {
    all: ['withdrawal'] as const,
    history: () => [...withdrawalKeys.all, 'history'] as const,
};
