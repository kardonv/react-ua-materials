import { CounterAction } from '../../types';

// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET_COUNT = 'SET_COUNT';

// Action Creators
export const increment = (): CounterAction => ({ type: INCREMENT });
export const decrement = (): CounterAction => ({ type: DECREMENT });
export const reset = (): CounterAction => ({ type: RESET });
export const setCount = (count: number): CounterAction => ({ type: SET_COUNT, payload: count }); 