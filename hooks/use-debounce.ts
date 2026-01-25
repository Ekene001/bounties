import * as React from "react"

/**
 * Hook to debounce a value.
 * 
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 * 
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    React.useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            // Cancel the timeout if value changes (also on delay change or unmount)
            return () => {
                clearTimeout(handler)
            }
        },
        [value, delay] // Only re-call effect if value or delay changes
    )

    return debouncedValue
}
