import * as React from "react"

/**
 * Hook to throttle a value.
 * 
 * @param value The value to throttle.
 * @param limit The throttle limit in milliseconds.
 * @returns The throttled value.
 * 
 * @example
 * const throttledValue = useThrottle(value, 1000);
 */
export function useThrottle<T>(value: T, limit: number): T {
    const [throttledValue, setThrottledValue] = React.useState<T>(value)
    const lastRan = React.useRef<number>(Date.now())

    React.useEffect(() => {
        const handler = setTimeout(
            () => {
                if (Date.now() - lastRan.current >= limit) {
                    setThrottledValue(value)
                    lastRan.current = Date.now()
                }
            },
            limit - (Date.now() - lastRan.current)
        )

        return () => {
            clearTimeout(handler)
        }
    }, [value, limit])

    return throttledValue
}
