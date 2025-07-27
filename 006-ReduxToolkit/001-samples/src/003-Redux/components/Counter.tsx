import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CounterState } from '../types';
import { increment, decrement, reset, setCount } from '../store/actions/counterActions';
import styles from '../styles.module.css';

const Counter: React.FC = () => {
  const count = useSelector((state: CounterState) => state.count);
  const dispatch = useDispatch();

  return (
    <div className={styles.counterContainer}>
      <h2 className={styles.counterTitle}>Redux Counter Example</h2>
      <div className={styles.counterDisplay}>
        {count}
      </div>
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => dispatch(decrement())}
          className={styles.button}
        >
          Decrement
        </button>
        <button 
          onClick={() => dispatch(reset())}
          className={styles.button}
        >
          Reset
        </button>
        <button 
          onClick={() => dispatch(increment())}
          className={styles.button}
        >
          Increment
        </button>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={count}
          onChange={(e) => dispatch(setCount(parseInt(e.target.value) || 0))}
          className={styles.input}
        />
        <p className={styles.inputLabel}>
          Type a number to set the count directly
        </p>
      </div>
    </div>
  );
};

export default Counter; 