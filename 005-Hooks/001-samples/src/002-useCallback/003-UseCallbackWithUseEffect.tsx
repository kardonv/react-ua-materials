import React, { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

interface ChildProps {
  onDataChange: (data: string) => void;
  data: string;
}

const DataChild = React.memo<ChildProps>(({ onDataChange, data }) => {
  console.log('DataChild rendering');
  
  return (
    <div className={styles.dataChild}>
      <h3>Data Child Component</h3>
      <p>Current data: {data}</p>
      <button 
        onClick={() => onDataChange(`New data ${Date.now()}`)}
        className={styles.dataChildButton}
      >
        Update Data
      </button>
    </div>
  );
});

export default function UseCallbackWithUseEffect() {
  const [data, setData] = useState<string>('Initial data');
  const [count, setCount] = useState<number>(0);
  const [effectRuns, setEffectRuns] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  console.log('Parent component rendering');

  // PROBLEM: Without useCallback - this causes infinite loops
  // const handleDataChange = (newData: string) => {
  //   setData(newData);
  // };

  const handleDataChange = useCallback((newData: string) => {
    setData(newData);
  }, []);

  useEffect(() => {
    console.log('useEffect running - data changed or callback changed');
    setEffectRuns(c => c + 1);
    
    // Simulate some side effect (API call, etc.)
    const timeoutId = setTimeout(() => {
      console.log('Side effect completed for data:', data);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      console.log('Cleanup: cleared timeout');
    };
  }, [data, handleDataChange]);


  useEffect(() => {
    console.log('Theme effect running');
  }, [theme]);

  return (
    <div className={`${styles.parentContainer} ${theme === 'dark' ? styles.parentContainerDark : styles.parentContainerLight}`}>
      <h2>useCallback with useEffect Example</h2>
      
      <div className={styles.buttonGroup}>
        <button
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          className={`${styles.button} ${theme === 'dark' ? styles.themeButtonDark : styles.themeButtonLight}`}
        >
          Toggle Theme
        </button>
        
        <button
          onClick={() => setCount(c => c + 1)}
          className={`${styles.button} ${styles.incrementButton}`}
        >
          Increment Count
        </button>
      </div>

      <div className={styles.infoGroup}>
        <p>Effect Runs: {effectRuns}</p>
        <p>Count: {count}</p>
        <p>Theme: {theme}</p>
        <p>Data: {data}</p>
      </div>

      {/* Child component */}
      <DataChild
        onDataChange={handleDataChange}
        data={data}
      />

      <div className={`${styles.explanationSection} ${theme === 'dark' ? styles.explanationSectionDark : styles.explanationSectionLight}`}>
        <h4>🎯 useCallback with useEffect:</h4>
        <ul className={styles.explanationList}>
          <li><strong>handleDataChange</strong> is memoized with <code>useCallback</code></li>
          <li><strong>useEffect</strong> depends on <code>handleDataChange</code> but doesn't re-run unnecessarily</li>
          <li>Effect only runs when <code>data</code> actually changes</li>
          <li>Prevents infinite loops that would occur without <code>useCallback</code></li>
        </ul>
        
        <h4>🔍 Test it:</h4>
        <ul className={styles.explanationList}>
          <li>Click "Toggle Theme" - Effect does NOT run ✅</li>
          <li>Click "Increment Count" - Effect does NOT run ✅</li>
          <li>Click "Update Data" - Effect runs (necessary) ✅</li>
          <li>Check console to see effect execution</li>
        </ul>

        <h4>❌ Without useCallback (commented code):</h4>
        <ul className={styles.explanationList}>
          <li>Every render creates a new <code>handleDataChange</code> function</li>
          <li><code>useEffect</code> sees a "new" dependency and runs again</li>
          <li>Effect runs → component re-renders → new function → effect runs again</li>
          <li>This creates an infinite loop!</li>
        </ul>

        <h4>💡 Key Benefits:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Prevents infinite loops</strong> in useEffect</li>
          <li><strong>Optimizes performance</strong> by avoiding unnecessary effect runs</li>
          <li><strong>Stable references</strong> for dependency arrays</li>
          <li><strong>Cleaner code</strong> with predictable behavior</li>
        </ul>
      </div>
    </div>
  );
} 