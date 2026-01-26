import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { bountiesApi, type Bounty, type BountyListParams, type PaginatedResponse } from '@/lib/api';
import { bountyKeys } from './query-keys';

const DEFAULT_LIMIT = 20;

/**
 * Query options factory for bounty list
 */
export function bountyListQueryOptions(params?: BountyListParams) {
    return queryOptions<PaginatedResponse<Bounty>>({
        queryKey: bountyKeys.list(params),
        queryFn: () => bountiesApi.list(params),
    });
}

/**
 * Query options factory for single bounty
 */
export function bountyDetailQueryOptions(id: string) {
    return queryOptions<Bounty>({
        queryKey: bountyKeys.detail(id),
        queryFn: () => bountiesApi.getById(id),
        enabled: !!id,
    });
}

/**
 * Infinite query options for bounty pagination
 */
export function bountyInfiniteQueryOptions(params?: Omit<BountyListParams, 'page'>) {
    return infiniteQueryOptions<PaginatedResponse<Bounty>>({
        queryKey: bountyKeys.infinite(params),
        queryFn: ({ pageParam }) =>
            bountiesApi.list({ ...params, page: pageParam as number, limit: params?.limit ?? DEFAULT_LIMIT }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
    });
}

/**
 * Helper to flatten infinite query pages
 */
export function flattenBountyPages(pages: PaginatedResponse<Bounty>[] | undefined): Bounty[] {
    return pages?.flatMap((page) => page.data) ?? [];
}
