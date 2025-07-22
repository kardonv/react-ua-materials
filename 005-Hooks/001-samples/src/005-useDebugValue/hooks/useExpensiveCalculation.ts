import { useDebugValue, useMemo } from "react";

export function useExpensiveCalculation(value: number) {
    const result = useMemo(() => {
        // Simulate expensive calculation
        let sum = 0;
        for (let i = 0; i < value * 1000; i++) {
            sum += Math.random();
        }

        return sum;
    }, [value]);

    // Only show debug value in development
    useDebugValue(
        result,
        (result) => `Expensive calculation result: ${result.toFixed(2)}`
    );

    return result;
}