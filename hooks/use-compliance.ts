import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post } from '@/lib/api/client';
import { UserCompliance, RemainingLimits, KYCTier, VerificationRequest } from '@/types/compliance';
import { UserTermsStatus } from '@/types/terms';

interface ComplianceStatus {
    compliance: UserCompliance;
    remaining: RemainingLimits;
    termsStatus: UserTermsStatus;
    nextTier: KYCTier | null;
}

export function useComplianceStatus() {
    return useQuery({
        queryKey: ['compliance', 'status'],
        queryFn: () => get<ComplianceStatus>('/api/compliance/status'),
    });
}

export function useAcceptTerms() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (termsVersionId: string) =>
            post('/api/compliance/terms', { termsVersionId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['compliance'] });
        },
    });
}

export function useUpgradeTier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (targetTier: KYCTier) =>
            post<VerificationRequest>('/api/compliance/upgrade', { targetTier }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['compliance'] });
        },
    });
}
