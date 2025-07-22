import React, { useReducer, useState } from 'react';

import styles from './styles.module.css';
import { CounterState } from './types/CounterWithPayload';
import { counterReducer } from './reducers/CounterWithPayload';

const initialState: CounterState = {
  count: 0,
  history: []
};

export default function CounterWithPayload() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddAmount = () => {
    const amount = parseInt(inputValue);
    if (!isNaN(amount)) {
      dispatch({ type: 'ADD_AMOUNT', payload: amount });
      setInputValue('');
    }
  };

  const handleMultiplyBy = () => {
    const multiplier = parseInt(inputValue);
    if (!isNaN(multiplier)) {
      dispatch({ type: 'MULTIPLY_BY', payload: multiplier });
      setInputValue('');
    }
  };

  const handleSetValue = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      dispatch({ type: 'SET_VALUE', payload: value });
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.counterDisplayCentered}>Counter with Payload Actions</h2>

      <div className={`${styles.counterDisplay} ${styles.counterDisplayCentered}`}>
        {state.count}
      </div>

      {/* Basic Controls */}
      <div className={styles.buttonGroup}>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className={`${styles.buttonSmall} ${styles.buttonDecrement}`}
        >
          -1
        </button>

        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className={`${styles.buttonSmall} ${styles.buttonIncrement}`}
        >
          +1
        </button>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className={`${styles.buttonSmall} ${styles.buttonReset}`}
        >
          Reset
        </button>
      </div>

      {/* Payload Controls */}
      <div className={styles.payloadControls}>
        <h4 className={styles.payloadControlsTitle}>Actions with Payload:</h4>

        <div className={styles.payloadControlsGroup}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className={styles.payloadInput}
          />

          <button
            onClick={handleAddAmount}
            className={`${styles.buttonTiny} ${styles.buttonInfo}`}
          >
            Add Amount
          </button>

          <button
            onClick={handleMultiplyBy}
            className={`${styles.buttonTiny} ${styles.buttonOrange}`}
          >
            Multiply By
          </button>

          <button
            onClick={handleSetValue}
            className={`${styles.buttonTiny} ${styles.buttonPurple}`}
          >
            Set Value
          </button>
        </div>
      </div>

      {/* History */}
      <div className={styles.historyContainer}>
        <h4 className={styles.historyTitle}>History (Last 10 values):</h4>
        <div className={styles.historyList}>
          {state.history.slice(-10).map((value, index) => (
            <span key={index} className={styles.historyItem}>
              {value}
            </span>
          ))}
          {state.history.length === 0 && (
            <span className={styles.historyEmpty}>
              No history yet
            </span>
          )}
        </div>
      </div>

      <div className={styles.explanationSection}>
        <h4>Payload Actions Explained:</h4>
        <ul className={styles.explanationList}>
          <li><strong>ADD_AMOUNT:</strong> Adds the specified amount to current count</li>
          <li><strong>MULTIPLY_BY:</strong> Multiplies current count by the specified value</li>
          <li><strong>SET_VALUE:</strong> Sets count to the specified value</li>
          <li><strong>History:</strong> Tracks previous values for debugging</li>
        </ul>

        <h4>Benefits of Payload Actions:</h4>
        <ul className={styles.explanationList}>
          <li>Pass dynamic values to state updates</li>
          <li>More flexible than hardcoded actions</li>
          <li>Better for user input handling</li>
          <li>Maintains predictable state updates</li>
        </ul>
      </div>
    </div>
  );
} 