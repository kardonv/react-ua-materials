import React, { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up the timeout
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timeout if value changes (also on delay change or unmount)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Advanced useDebounce with callback support
export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
    deps: React.DependencyList = []
): T {
    const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

    return React.useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay, ...deps]) as T;
}