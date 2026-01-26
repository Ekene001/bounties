import * as React from "react"

export type AsyncStatus = "idle" | "pending" | "success" | "error"

/**
 * Hook to handle async operations with state management.
 * 
 * @param asyncFunction The async function to execute.
 * @param immediate Whether to execute the function immediately.
 * @returns Object containing status, value, error, and execute function.
 */
export function useAsync<T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
) {
    const [status, setStatus] = React.useState<AsyncStatus>("idle")
    const [value, setValue] = React.useState<T | null>(null)
    const [error, setError] = React.useState<E | null>(null)

    // The execute function wraps asyncFunction and handles state updates
    const isMountedRef = React.useRef(true)

    const execute = React.useCallback(() => {
        setStatus("pending")
        setValue(null)
        setError(null)

        return asyncFunction()
            .then((response) => {
                if (isMountedRef.current) {
                    setValue(response)
                    setStatus("success")
                }
            })
            .catch((error) => {
                if (isMountedRef.current) {
                    setError(error)
                    setStatus("error")
                }
            })
    }, [asyncFunction])

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as in an interaction.
    React.useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    // Track mounted state to prevent updates after unmount
    React.useEffect(() => {
        return () => {
            isMountedRef.current = false
        }
    }, [])

    return { execute, status, value, error }
}
