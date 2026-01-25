import * as React from "react"

/**
 * Hook to manage a boolean toggle state.
 * 
 * @param initialValue The initial boolean value.
 * @returns A tuple containing the boolean value and a toggle function.
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void] {
    const [value, setValue] = React.useState(initialValue)

    const toggle = React.useCallback(() => {
        setValue((v) => !v)
    }, [])

    return [value, toggle]
}
