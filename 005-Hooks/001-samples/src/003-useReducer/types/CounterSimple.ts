export interface CounterState {
    count: number;
}

// Define action types
export type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' };