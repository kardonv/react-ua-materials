import { useCallback, useEffect, useState } from 'react';
import { UseLocalStorageOptions } from '../types';

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    const {
        serialize = JSON.stringify,
        deserialize = JSON.parse,
        onError = console.error
    } = options;

    // Get initial value from localStorage or use provided initial value
    const getStoredValue = useCallback((): T => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? deserialize(item) : initialValue;
        } catch (error) {
            onError(error as Error);
            return initialValue;
        }
    }, [key, initialValue, deserialize, onError]);

    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to localStorage
            window.localStorage.setItem(key, serialize(valueToStore));
        } catch (error) {
            onError(error as Error);
        }
    }, [key, storedValue, serialize, onError]);

    // Function to remove the item from localStorage
    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            window.localStorage.removeItem(key);
        } catch (error) {
            onError(error as Error);
        }
    }, [key, initialValue, onError]);

    // Listen for changes to localStorage from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(deserialize(e.newValue));
                } catch (error) {
                    onError(error as Error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, deserialize, onError]);

    return [storedValue, setValue, removeValue];
}
