"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchFilter({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFilterProps) {
  const [localValue, setLocalValue] = useState(value);
  const isFirstRender = useRef(true);

  // Sync localValue when parent value changes (e.g. when filters are cleared)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search input
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 bg-background-card border-border/50 focus:border-primary/50 transition-colors text-gray-100"
      />
    </div>
  );
}
