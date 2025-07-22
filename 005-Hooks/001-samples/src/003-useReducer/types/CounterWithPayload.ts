export interface CounterState {
    count: number;
    history: number[];
}

export type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'ADD_AMOUNT'; payload: number }
    | { type: 'MULTIPLY_BY'; payload: number }
    | { type: 'RESET' }
    | { type: 'SET_VALUE'; payload: number };