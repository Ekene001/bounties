"use client";

import { useState, useMemo } from "react";
import { BountyList } from "@/components/bounty/bounty-list";
import { useBounties } from "@/hooks/use-bounties";
import { Badge } from "@/components/ui/badge";
import type { BountyType, DifficultyLevel, BountyStatus } from "@/types/bounty";
import { cn } from "@/lib/utils";

interface ProjectBountiesProps {
  projectId: string;
}

const bountyTypes: { value: BountyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "feature", label: "Feature" },
  { value: "bug", label: "Bug" },
  { value: "documentation", label: "Docs" },
  { value: "refactor", label: "Refactor" },
  { value: "other", label: "Other" },
];

const difficulties: { value: DifficultyLevel | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const statuses: { value: BountyStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "claimed", label: "Claimed" },
  { value: "closed", label: "Closed" },
];

export function ProjectBounties({ projectId }: ProjectBountiesProps) {
  const [selectedType, setSelectedType] = useState<BountyType | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<BountyStatus | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all bounties for this project to extract available tags
  const { data: allBountiesData } = useBounties({ projectId });
  const availableTags = useMemo(() => {
    if (!allBountiesData?.data) return [];
    const tagSet = new Set<string>();
    allBountiesData.data.forEach(bounty => {
      bounty.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allBountiesData]);

  const params = {
    projectId,
    ...(selectedType !== "all" && { type: selectedType }),
    ...(selectedDifficulty !== "all" && { difficulty: selectedDifficulty }),
    ...(selectedStatus !== "all" && { status: selectedStatus }),
    ...(selectedTags.length > 0 && { tags: selectedTags }),
  };

  const hasFilters = selectedType !== "all" || selectedDifficulty !== "all" || selectedStatus !== "all" || selectedTags.length > 0;

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-50">Available Bounties</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors self-start sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Type</label>
          <div className="flex flex-wrap gap-2">
            {bountyTypes.map((type) => (
              <Badge
                key={type.value}
                asChild
                variant="outline"
                className={cn(
                  "cursor-pointer transition-all border-gray-700 text-gray-300 hover:border-primary hover:text-primary",
                  selectedType === type.value && "bg-primary text-primary-foreground border-primary"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  aria-pressed={selectedType === type.value}
                >
                  {type.label}
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Difficulty</label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty.value}
                asChild
                variant="outline"
                className={cn(
                  "cursor-pointer transition-all border-gray-700 text-gray-300 hover:border-primary hover:text-primary",
                  selectedDifficulty === difficulty.value && "bg-primary text-primary-foreground border-primary"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty(difficulty.value)}
                  aria-pressed={selectedDifficulty === difficulty.value}
                >
                  {difficulty.label}
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Badge
                key={status.value}
                asChild
                variant="outline"
                className={cn(
                  "cursor-pointer transition-all border-gray-700 text-gray-300 hover:border-primary hover:text-primary",
                  selectedStatus === status.value && "bg-primary text-primary-foreground border-primary"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedStatus(status.value)}
                  aria-pressed={selectedStatus === status.value}
                >
                  {status.label}
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        {availableTags.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  asChild
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-all border-gray-700 text-gray-300 hover:border-primary hover:text-primary",
                    selectedTags.includes(tag) && "bg-primary text-primary-foreground border-primary"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                  >
                    {tag}
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bounties List */}
      <BountyList params={params} hasFilters={hasFilters} onClearFilters={clearFilters} />
    </div>
  );
}
