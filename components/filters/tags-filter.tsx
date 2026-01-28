"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AVAILABLE_TAGS } from "@/lib/types";
import { useState } from "react";

interface TagsFilterProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagsFilter({ value, onChange }: TagsFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-border/50 bg-background-card hover:bg-background-card/80 hover:border-primary/50 transition-colors text-gray-100"
        >
          Tags
          {value.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-primary/20 text-primary hover:bg-primary/30"
            >
              {value.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-4 bg-background-card border-border/50"
        align="start"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter by tags</h4>
            {value.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-auto p-0 text-xs text-gray-400 hover:text-white"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_TAGS.map((tag, index) => {
              const sanitizedId = `tag-${index}-${tag.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={sanitizedId}
                    checked={value.includes(tag)}
                    onCheckedChange={() => {
                      toggleTag(tag);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={sanitizedId}
                    className="text-sm cursor-pointer select-none hover:text-primary transition-colors text-gray-200"
                  >
                    {tag}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
