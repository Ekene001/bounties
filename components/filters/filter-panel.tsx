"use client";

import { FilterX, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchFilter } from "./search-filter";
import { TagsFilter } from "./tags-filter";
import { SortDropdown } from "./sort-dropdown";
import { FilterState, SortOption, TabType } from "@/lib/types";
import { useState } from "react";

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeTab: TabType;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  activeTab,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      tags: [],
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.search || filters.tags.length > 0 || filters.sort !== "newest";

  // Hide "Highest Reward" sort option for projects tab
  const hiddenSortOptions: SortOption[] =
    activeTab === "projects" ? ["highestReward"] : [];

  const searchPlaceholder =
    activeTab === "projects" ? "Search projects..." : "Search bounties...";

  const content = (
    <div className="space-y-4">
      <SearchFilter
        value={filters.search}
        onChange={(value) => updateFilter("search", value)}
        placeholder={searchPlaceholder}
      />
      <div className="flex flex-wrap gap-3">
        <TagsFilter
          value={filters.tags}
          onChange={(value) => updateFilter("tags", value)}
        />
        <SortDropdown
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
          hiddenOptions={hiddenSortOptions}
        />
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground hover:bg-background-card"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden md:block">{content}</div>

      {/* Mobile Filter Sheet */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full border-border/50 bg-background-card"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {(filters.search ? 1 : 0) + filters.tags.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-background border-border/50"
          >
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">{content}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
