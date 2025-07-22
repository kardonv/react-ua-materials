import { CounterAction, CounterState } from "../types/CounterSimple";


export function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            };
        case 'RESET':
            return {
                ...state,
                count: 0
            };
        default:
            return state;
    }
}