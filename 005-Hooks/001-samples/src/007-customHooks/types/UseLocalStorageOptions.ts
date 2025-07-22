export interface UseLocalStorageOptions<T> {
    defaultValue?: T;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    onError?: (error: Error) => void;
}