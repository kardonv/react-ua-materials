import { CounterState, CounterAction } from '../../types';
import { INCREMENT, DECREMENT, RESET, SET_COUNT } from '../actions/counterActions';

const initialState: CounterState = { count: 0 };

export const counterReducer = (state: CounterState = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: 0 };
    case SET_COUNT:
      return { ...state, count: action.payload || 0 };
    default:
      return state;
  }
}; 