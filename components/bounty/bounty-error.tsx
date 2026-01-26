'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BountyErrorProps {
    message?: string;
    onRetry?: () => void;
}

export function BountyError({ message = 'Failed to load bounties', onRetry }: BountyErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-800 rounded-2xl bg-background-card/30">
            <div className="size-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                <AlertCircle className="size-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-200">Something went wrong</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="border-gray-700 hover:bg-gray-800 gap-2">
                    <RefreshCw className="size-4" />
                    Try again
                </Button>
            )}
        </div>
    );
}
