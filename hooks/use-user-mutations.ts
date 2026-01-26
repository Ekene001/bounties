import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { authKeys } from '@/lib/query/query-keys';

/**
 * Parameters for updating user profile
 */
export interface UpdateUserParams {
    name?: string;      // User's display name
    image?: string;     // URL to user's profile image
}

/**
 * Update user profile information
 * 
 * @param params - User update parameters (name and/or image)
 * @returns Updated user data from Better Auth
 * @throws Error with descriptive message on failure
 */
export async function updateUser(params: UpdateUserParams) {
    try {
        const response = await authClient.updateUser(params);
        
        if (!response.data) {
            throw new Error('Failed to update user profile');
        }
        
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`User update failed: ${error.message}`);
        }
        throw new Error('An unexpected error occurred while updating user profile');
    }
}

/**
 * Type for the updated user data returned by the mutation
 */
export type UpdateUserData = Awaited<ReturnType<typeof updateUser>>;

/**
 * Mutation hook for updating user profile information
 * 
 * Features:
 * - Invalidates session cache on success
 * - Shows success toast notification
 * - Shows error toast notification with error message
 * - Provides loading states and error handling
 * 
 * @example
 * ```tsx
 * const { mutate, isPending, error } = useUpdateUserMutation();
 * 
 * const handleUpdate = () => {
 *   mutate({
 *     name: "John Doe",
 *     image: "https://example.com/avatar.jpg"
 *   });
 * };
 * ```
 */
export function useUpdateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: (_data: UpdateUserData) => {
            // Invalidate session queries to fetch fresh user data
            queryClient.invalidateQueries({ queryKey: authKeys.session() });
            
            // Show success notification
            toast.success('User updated successfully!');
        },
        onError: (error: Error) => {
            // Show error notification with descriptive message
            toast.error(error.message || 'Failed to update user profile');
        },
    });
}
