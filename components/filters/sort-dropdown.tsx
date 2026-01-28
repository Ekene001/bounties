"use client";

import { ArrowUpDown } from "lucide-react";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, SORT_OPTIONS } from "@/lib/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  hiddenOptions?: SortOption[];
}

export function SortDropdown({
  value,
  onChange,
  hiddenOptions = [],
}: SortDropdownProps) {
  const visibleOptions = SORT_OPTIONS.filter(
    (option) => !hiddenOptions.includes(option.value),
  );

  // Fallback: if current value is hidden, reset to first visible option
  useEffect(() => {
    if (hiddenOptions.includes(value) && visibleOptions.length > 0) {
      onChange(visibleOptions[0].value);
    }
  }, [value, hiddenOptions, visibleOptions, onChange]);

  return (
    <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
      <SelectTrigger className="w-[180px] border-border/50 bg-background-card hover:border-primary/50 transition-colors text-gray-100">
        <ArrowUpDown className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-background-card border-border/50">
        {visibleOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer text-gray-200"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
