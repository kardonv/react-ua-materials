import { CounterAction, CounterState } from "../types/CounterWithPayload";

export function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
                history: [...state.history, state.count]
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
                history: [...state.history, state.count]
            };
        case 'ADD_AMOUNT':
            return {
                ...state,
                count: state.count + action.payload,
                history: [...state.history, state.count]
            };
        case 'MULTIPLY_BY':
            return {
                ...state,
                count: state.count * action.payload,
                history: [...state.history, state.count]
            };
        case 'SET_VALUE':
            return {
                ...state,
                count: action.payload,
                history: [...state.history, state.count]
            };
        case 'RESET':
            return {
                ...state,
                count: 0,
                history: []
            };
        default:
            return state;
    }
}