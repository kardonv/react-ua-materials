import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';

// Child component that receives a callback function
interface ChildProps {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
}

const ExpensiveChild = React.memo<ChildProps>(({ onIncrement, onDecrement, count }) => {
  console.log('ExpensiveChild rendering - WITH useCallback');
  const [childCount, setChildCount] = useState();
  
  return (
    <div className={`${styles.childContainer} ${styles.expensiveChildSolution}`}>
      <h3>Expensive Child Component</h3>
      <p>Parent count: {count}</p>
      <p>Child count: {childCount}</p>
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
        This component only re-renders when count actually changes
      </small>
    </div>
  );
});

// Parent component WITH useCallback
export default function WithUseCallback() {
  const [count, setCount] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [renderCount, setRenderCount] = useState<number>(0);
  
  console.log('Parent component rendering - WITH useCallback');

  // ✅ SOLUTION: These functions are memoized with useCallback
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array - function never changes

  const handleDecrement = useCallback(() => {
    setCount(c => c - 1);
  }, []); // Empty dependency array - function never changes

  // Force parent to re-render
  const forceRender = () => {
    setRenderCount(c => c + 1);
  };

  return (
    <div className={`${styles.parentContainer} ${theme === 'dark' ? styles.parentContainerDark : styles.parentContainerLight}`}>
      <h2>With useCallback - The Solution</h2>
      
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

      {/* Child component that only re-renders when necessary */}
      <ExpensiveChild
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        count={count}
      />

      <div className={`${styles.explanationSection} ${theme === 'dark' ? styles.explanationSectionDark : styles.explanationSectionLight}`}>
        <h4>✅ The Solution:</h4>
        <ul className={styles.explanationList}>
          <li><strong>handleIncrement</strong> and <strong>handleDecrement</strong> are memoized with <code>useCallback</code></li>
          <li><strong>ExpensiveChild</strong> receives the same function references across renders</li>
          <li><strong>React.memo</strong> now works properly because props are stable</li>
          <li>Child component only re-renders when <code>count</code> actually changes</li>
          <li>Check console - you'll only see "ExpensiveChild rendering" when count changes</li>
        </ul>
        
        <h4>🔍 Test it:</h4>
        <ul className={styles.explanationList}>
          <li>Click "Toggle Theme" - Child does NOT re-render ✅</li>
          <li>Click "Force Parent Re-render" - Child does NOT re-render ✅</li>
          <li>Click "Increment/Decrement" - Child re-renders (necessary) ✅</li>
        </ul>

        <h4>💡 Key Points:</h4>
        <ul className={styles.explanationList}>
          <li><code>useCallback</code> returns the same function reference when dependencies don't change</li>
          <li>Empty dependency array <code>[]</code> means the function never changes</li>
          <li>This works perfectly with <code>React.memo</code> for performance optimization</li>
        </ul>
      </div>
    </div>
  );
} 