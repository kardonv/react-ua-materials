import { useState, useCallback } from 'react';

export function useCounter(initialValue: number = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []);

    const decrement = useCallback(() => {
        setCount(prevCount => prevCount - 1);
    }, []);

    return {
        count,
        increment,
        decrement
    };
} 