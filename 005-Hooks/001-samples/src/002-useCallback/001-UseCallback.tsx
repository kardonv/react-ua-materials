import React, { useState } from 'react';

import styles from './styles.module.css';

interface ChildProps {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
}

const ExpensiveChild = React.memo<ChildProps>(({ onIncrement, onDecrement, count }) => {
  console.log('ExpensiveChild rendering - WITHOUT useCallback');
  
  return (
    <div className={`${styles.childContainer} ${styles.expensiveChildProblem}`}>
      <h3>Expensive Child Component</h3>
      <p>Current count: {count}</p>
      <div className={styles.childButtonContainer}>
        <button 
          onClick={onIncrement}
          className={styles.childIncrementButton}
        >
          Increment
        </button>
        <button 
          onClick={onDecrement}
          className={styles.childDecrementButton}
        >
          Decrement
        </button>
      </div>
      <small className={styles.smallText}>
        This component re-renders on every parent render because callback functions are recreated
      </small>
    </div>
  );
});

// Parent component WITHOUT useCallback
export default function WithoutUseCallback() {
  const [count, setCount] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [renderCount, setRenderCount] = useState<number>(0);
  
  console.log('Parent component rendering - WITHOUT useCallback');

  // PROBLEM: These functions are recreated on every render
  const handleIncrement = () => {
    setCount(c => c + 1);
  };

  const handleDecrement = () => {
    setCount(c => c - 1);
  };

  const forceRender = () => {
    setRenderCount(c => c + 1);
  };

  return (
    <div className={`${styles.parentContainer} ${theme === 'dark' ? styles.parentContainerDark : styles.parentContainerLight}`}>
      <h2>Without useCallback - The Problem</h2>
      
      <div className={styles.buttonGroup}>
        <button
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          className={`${styles.button} ${theme === 'dark' ? styles.themeButtonDark : styles.themeButtonLight}`}
        >
          Toggle Theme
        </button>
        
        <button
          onClick={forceRender}
          className={`${styles.button} ${styles.forceRenderButton}`}
        >
          Force Parent Re-render
        </button>
      </div>

      <div className={styles.infoGroup}>
        <p>Parent Render Count: {renderCount}</p>
        <p>Current Count: {count}</p>
        <p>Current Theme: {theme}</p>
      </div>

      {/* Child component that re-renders unnecessarily */}
      <ExpensiveChild
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        count={count}
      />

      <div className={`${styles.explanationSection} ${theme === 'dark' ? styles.explanationSectionDark : styles.explanationSectionLight}`}>
        <h4>❌ The Problem:</h4>
        <ul className={styles.explanationList}>
          <li><strong>handleIncrement</strong> and <strong>handleDecrement</strong> are recreated on every render</li>
          <li><strong>ExpensiveChild</strong> receives new function references every time</li>
          <li><strong>React.memo</strong> doesn't help because props are always "different"</li>
          <li>Child component re-renders even when its actual data hasn't changed</li>
          <li>Check console - you'll see "ExpensiveChild rendering" on every parent render</li>
        </ul>
        
        <h4>🔍 Test it:</h4>
        <ul className={styles.explanationList}>
          <li>Click "Toggle Theme" - Child re-renders (unnecessary)</li>
          <li>Click "Force Parent Re-render" - Child re-renders (unnecessary)</li>
          <li>Click "Increment/Decrement" - Child re-renders (necessary)</li>
        </ul>
      </div>
    </div>
  );
} 