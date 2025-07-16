import React, { useState, useCallback, useMemo } from 'react';

import { fibonacci } from '../utils';

import styles from './styles.module.css';

// Child component that receives computed values as props
interface ChildProps {
  computedValue: number;
  formattedValue: string;
  isEven: boolean;
  onUpdate: () => void;
  count: number;
}

const ComputedValueChild = React.memo<ChildProps>(({ 
  computedValue, 
  formattedValue, 
  isEven, 
  onUpdate, 
  count 
}) => {
  console.log('ComputedValueChild rendering');
  
  return (
    <div className={`${styles.computedValueChild} ${isEven ? styles.computedValueChildEven : styles.computedValueChildOdd}`}>
      <h3>Child Component with Computed Props</h3>
      <div className={styles.computedValueContent}>
        <p><strong>Count:</strong> {count}</p>
        <p><strong>Computed Value:</strong> {computedValue}</p>
        <p><strong>Formatted Value:</strong> {formattedValue}</p>
        <p><strong>Is Even:</strong> {isEven ? 'Yes' : 'No'}</p>
      </div>
      <button 
        onClick={onUpdate}
        className={styles.computedValueButton}
      >
        Update Parent
      </button>
      <small className={styles.smallText}>
        This component only re-renders when computed values actually change
      </small>
    </div>
  );
});

// Another child that receives a callback that returns a value
interface CallbackChildProps {
  getComputedData: () => { value: number; label: string };
  trigger: number;
}

const CallbackChild = React.memo<CallbackChildProps>(({ getComputedData, trigger }) => {
  console.log('CallbackChild rendering');
  
  // Call the memoized function to get data
  const data = getComputedData();
  
  return (
    <div className={styles.callbackChild}>
      <h3>Child with Callback Function</h3>
      <p><strong>Value:</strong> {data.value}</p>
      <p><strong>Label:</strong> {data.label}</p>
      <p><strong>Trigger:</strong> {trigger}</p>
      <small className={styles.smallText}>
        This component re-renders when trigger changes, but callback function is stable
      </small>
    </div>
  );
});


export default function UseCallbackAsProps() {
  const [count, setCount] = useState<number>(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [renderCount, setRenderCount] = useState<number>(0);
  const [trigger, setTrigger] = useState<number>(0);
  
  console.log('Parent component rendering');

  const getComputedValue = useCallback(() => {
    return fibonacci(count);
  }, [count]);

  const getFormattedValue = useCallback(() => {
    const value = fibonacci(count);
    return `Fibonacci(${count}) = ${value}`;
  }, [count]);

  const getIsEven = useCallback(() => {
    const value = fibonacci(count);
    return value % 2 === 0;
  }, [count]);

  const getComputedData = useCallback(() => {
    const value = fibonacci(count);
    return {
      value: value,
      label: `Computed from ${count}`
    };
  }, [count]);

  const handleUpdate = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const forceRender = useCallback(() => {
    setRenderCount(c => c + 1);
  }, []);

  const updateTrigger = useCallback(() => {
    setTrigger(t => t + 1);
  }, []);

  return (
    <div className={`${styles.parentContainer} ${theme === 'dark' ? styles.parentContainerDark : styles.parentContainerLight}`}>
      <h2>useCallback as Props Example</h2>
      
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

        <button
          onClick={updateTrigger}
          className={`${styles.button} ${styles.updateTriggerButton}`}
        >
          Update Trigger
        </button>
      </div>

      <div className={styles.infoGroup}>
        <p>Parent Render Count: {renderCount}</p>
        <p>Current Count: {count}</p>
        <p>Current Theme: {theme}</p>
        <p>Trigger: {trigger}</p>
      </div>

      {/* Child component with computed values as props */}
      <ComputedValueChild
        computedValue={getComputedValue()}
        formattedValue={getFormattedValue()}
        isEven={getIsEven()}
        onUpdate={handleUpdate}
        count={count}
      />

      {/* Child component with callback function as prop */}
      <CallbackChild
        getComputedData={getComputedData}
        trigger={trigger}
      />

      <div className={`${styles.explanationSection} ${theme === 'dark' ? styles.explanationSectionDark : styles.explanationSectionLight}`}>
        <h4>🎯 useCallback as Props:</h4>
        <ul className={styles.explanationList}>
          <li><strong>getComputedValue</strong> - Returns memoized Fibonacci result</li>
          <li><strong>getFormattedValue</strong> - Returns memoized formatted string</li>
          <li><strong>getIsEven</strong> - Returns memoized boolean check</li>
          <li><strong>getComputedData</strong> - Returns memoized object</li>
          <li><strong>handleUpdate</strong> - Memoized event handler</li>
        </ul>
        
        <h4>🔍 Test it:</h4>
        <ul className={styles.explanationList}>
          <li>Click "Toggle Theme" - Children do NOT re-render ✅</li>
          <li>Click "Force Parent Re-render" - Children do NOT re-render ✅</li>
          <li>Click "Update Parent" - Children re-render (count changed) ✅</li>
          <li>Click "Update Trigger" - Only CallbackChild re-renders ✅</li>
        </ul>

        <h4>💡 Key Benefits:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Computed values are memoized</strong> - expensive calculations only run when dependencies change</li>
          <li><strong>Stable function references</strong> - child components don't re-render unnecessarily</li>
          <li><strong>Performance optimization</strong> - prevents expensive recalculations</li>
          <li><strong>Clean separation</strong> - computation logic stays in parent, display logic in children</li>
        </ul>

        <h4>🎨 Visual Indicators:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Green border</strong> - Even Fibonacci numbers</li>
          <li><strong>Yellow border</strong> - Odd Fibonacci numbers</li>
          <li><strong>Blue border</strong> - Callback function child</li>
        </ul>
      </div>
    </div>
  );
} 