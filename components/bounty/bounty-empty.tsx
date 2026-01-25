'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BountyEmptyProps {
    hasFilters?: boolean;
    onClearFilters?: () => void;
}

export function BountyEmpty({ hasFilters = false, onClearFilters }: BountyEmptyProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-800 rounded-2xl bg-background-card/30">
            <div className="size-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                <Search className="size-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-200">No bounties found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
                {hasFilters
                    ? "We couldn't find any bounties matching your current filters. Try adjusting your search terms or filters."
                    : 'There are no bounties available at the moment. Check back later!'}
            </p>
            {hasFilters && onClearFilters && (
                <Button onClick={onClearFilters} variant="outline" className="border-gray-700 hover:bg-gray-800">
                    Clear all filters
                </Button>
            )}
        </div>
    );
}
