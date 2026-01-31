import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post } from '@/lib/api/client';
import { WithdrawalValidationResult, WithdrawalRequest } from '@/types/withdrawal';

export function useValidateWithdrawal() {
    return useMutation({
        mutationFn: (amount: number) =>
            post<WithdrawalValidationResult>('/api/withdrawal/validate', { amount }),
    });
}

export function useSubmitWithdrawal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { amount: number; currency: string; destinationId: string }) =>
            post<WithdrawalRequest>('/api/withdrawal/submit', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['compliance'] });
        },
    });
}
