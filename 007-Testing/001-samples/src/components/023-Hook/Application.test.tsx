import { renderHook, act } from '@testing-library/react';
import { useCounter } from './hooks/useCounter';

describe('useCounter Hook', () => {
    test('should initialize with default value of 0', () => {
        const { result } = renderHook(useCounter);
        // const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);
    });

    test('should initialize with custom initial value', () => {
        // const { result } = renderHook(() => useCounter(5));
        const { result } = renderHook(useCounter, {
            initialProps: 5
        });

        expect(result.current.count).toBe(5);
    });

    test('should increment counter', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(1);

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(2);
    });

    test('should decrement counter', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(-1);

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(-2);
    });

    test('should increment and decrement multiple times', () => {
        const { result } = renderHook(() => useCounter());

        // Increment 3 times
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.increment();
        });

        expect(result.current.count).toBe(3);

        // Decrement 2 times
        act(() => {
            result.current.decrement();
            result.current.decrement();
        });

        expect(result.current.count).toBe(1);
    });

    test('should work with negative initial values', () => {
        const { result } = renderHook(() => useCounter(-5));

        expect(result.current.count).toBe(-5);

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(-4);
    });
});
