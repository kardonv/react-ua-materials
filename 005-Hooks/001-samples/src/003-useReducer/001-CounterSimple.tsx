import React, { useReducer } from 'react';

import styles from './styles.module.css';

// Define the state type
interface CounterState {
  count: number;
}

// Define action types
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

// Initial state
const initialState: CounterState = {
  count: 0
};

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
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

export default function CounterSimple() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className={styles.container}>
      <h2>Simple Counter with useReducer</h2>
      
      <div className={styles.counterDisplay}>
        {state.count}
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className={`${styles.button} ${styles.buttonDecrement}`}
        >
          Decrement
        </button>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className={`${styles.button} ${styles.buttonReset}`}
        >
          Reset
        </button>

        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className={`${styles.button} ${styles.buttonIncrement}`}
        >
          Increment
        </button>
      </div>

      <div className={styles.explanationSection}>
        <h4>How useReducer works:</h4>
        <ul className={styles.explanationList}>
          <li><strong>State:</strong> Contains the current count value</li>
          <li><strong>Dispatch:</strong> Sends actions to the reducer</li>
          <li><strong>Reducer:</strong> Pure function that updates state based on action type</li>
          <li><strong>Actions:</strong> Simple objects with a 'type' property</li>
        </ul>
        
        <h4>Benefits:</h4>
        <ul className={styles.explanationList}>
          <li>Centralized state logic</li>
          <li>Predictable state updates</li>
          <li>Easy to test and debug</li>
          <li>Better for complex state management</li>
        </ul>
      </div>
    </div>
  );
} 