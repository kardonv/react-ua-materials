import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

// Custom Hook: useDebounce
// Debounces a value to optimize performance and reduce unnecessary operations

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Advanced useDebounce with callback support
function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  return React.useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...deps]) as T;
}

// Example Component demonstrating useDebounce
const UseDebounceExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 300);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const debouncedWindowSize = useDebounce(windowSize, 100);

  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Simulate API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setApiCallCount(prev => prev + 1);
      addToLog(`API call for: "${debouncedSearchTerm}"`);
    }
  }, [debouncedSearchTerm]);

  // Log input changes
  useEffect(() => {
    if (inputValue !== debouncedInputValue) {
      addToLog(`Input changed: "${inputValue}" → "${debouncedInputValue}"`);
    }
  }, [inputValue, debouncedInputValue]);

  // Log window size changes
  useEffect(() => {
    if (windowSize.width !== debouncedWindowSize.width || windowSize.height !== debouncedWindowSize.height) {
      addToLog(`Window size changed: ${windowSize.width}×${windowSize.height} → ${debouncedWindowSize.width}×${debouncedWindowSize.height}`);
    }
  }, [windowSize, debouncedWindowSize]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Example with debounced callback
  const debouncedSave = useDebounceCallback((data: string) => {
    addToLog(`Saving data: "${data}"`);
  }, 1000);

  const handleSave = () => {
    addToLog(`Save button clicked (will save in 1 second if not cancelled)`);
    debouncedSave('Important data to save');
  };

  return (
    <div className={styles.debounceContainer}>
      <h2 className={styles.debounceTitle}>useDebounce Custom Hook Example</h2>
      <p className={styles.debounceDescription}>
        This example demonstrates how debouncing can optimize performance by reducing
        the frequency of expensive operations like API calls and DOM updates.
      </p>

      <div className={styles.debounceGrid}>
        
        {/* Search Example */}
        <div className={styles.debounceCard}>
          <h3 className={styles.debounceCardTitle}>Search with API Call Debouncing</h3>
          <p className={styles.debounceCardDescription}>
            Debounce delay: 500ms - API calls are only made after user stops typing
          </p>
          
          <div className={styles.debounceFieldContainer}>
            <label className={styles.debounceFieldLabel}>
              Search Term:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className={styles.debounceFieldInput}
            />
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxCurrent}`}>
            <strong>Current Value:</strong> "{searchTerm}"
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxDebounced}`}>
            <strong>Debounced Value:</strong> "{debouncedSearchTerm}"
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxWarning}`}>
            <strong>API Calls Made:</strong> {apiCallCount}
          </div>
        </div>

        {/* Input Validation Example */}
        <div className={styles.debounceCard}>
          <h3 className={styles.debounceCardTitle}>Input Validation Debouncing</h3>
          <p className={styles.debounceCardDescription}>
            Debounce delay: 300ms - Validation only runs after user stops typing
          </p>
          
          <div className={styles.debounceFieldContainer}>
            <label className={styles.debounceFieldLabel}>
              Email Input:
            </label>
            <input
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter email..."
              className={styles.debounceFieldInput}
            />
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxCurrent}`}>
            <strong>Current Input:</strong> "{inputValue}"
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxDebounced}`}>
            <strong>Debounced Input:</strong> "{debouncedInputValue}"
          </div>

          {debouncedInputValue && (
            <div className={`${styles.statusBox} ${debouncedInputValue.includes('@') ? styles.statusBoxSuccess : styles.statusBoxError}`}>
              <strong>Validation:</strong> {debouncedInputValue.includes('@') ? 'Valid email format' : 'Invalid email format'}
            </div>
          )}
        </div>

        {/* Window Resize Example */}
        <div className={styles.debounceCard}>
          <h3 className={styles.debounceCardTitle}>Window Resize Debouncing</h3>
          <p className={styles.debounceCardDescription}>
            Debounce delay: 100ms - Layout calculations only run after resize stops
          </p>
          
          <div className={`${styles.statusBox} ${styles.statusBoxCurrent}`}>
            <strong>Current Size:</strong> {windowSize.width} × {windowSize.height}
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxDebounced}`}>
            <strong>Debounced Size:</strong> {debouncedWindowSize.width} × {debouncedWindowSize.height}
          </div>

          <div className={`${styles.statusBox} ${styles.statusBoxWarning}`}>
            <strong>Status:</strong> {windowSize.width === debouncedWindowSize.width && windowSize.height === debouncedWindowSize.height ? 'Stable' : 'Resizing...'}
          </div>

          <div style={{ fontSize: '12px', color: '#666' }}>
            Try resizing your browser window to see the difference
          </div>
        </div>

        {/* Debounced Callback Example */}
        <div className={styles.debounceCard}>
          <h3 className={styles.debounceCardTitle}>Debounced Callback</h3>
          <p className={styles.debounceCardDescription}>
            Debounce delay: 1000ms - Save operation only executes after 1 second of inactivity
          </p>
          
          <button 
            onClick={handleSave}
            className={styles.saveButton}
          >
            Save Data (Debounced)
          </button>

          <div className={styles.infoBox}>
            <strong>How it works:</strong>
            <ul className={styles.infoList}>
              <li>Click the button multiple times quickly</li>
              <li>Only the last click will trigger the save after 1 second</li>
              <li>Intermediate clicks are cancelled</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className={styles.comparisonContainer}>
        <h3 className={styles.comparisonTitle}>Performance Comparison</h3>
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <h4 className={`${styles.comparisonCardTitle} ${styles.comparisonCardTitleBad}`}>Without Debouncing</h4>
            <ul className={styles.comparisonList}>
              <li>API call on every keystroke</li>
              <li>High server load</li>
              <li>Poor performance</li>
              <li>Unnecessary network requests</li>
            </ul>
          </div>
          
          <div className={styles.comparisonCard}>
            <h4 className={`${styles.comparisonCardTitle} ${styles.comparisonCardTitleGood}`}>With Debouncing</h4>
            <ul className={styles.comparisonList}>
              <li>API call only after user stops typing</li>
              <li>Reduced server load</li>
              <li>Better performance</li>
              <li>Optimized network requests</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Log */}
      <div className={styles.debounceLogContainer}>
        <h3 className={styles.debounceLogTitle}>Action Log:</h3>
        <div className={styles.debounceLogDisplay}>
          {log.map((entry, index) => (
            <div key={index} className={styles.debounceLogEntry}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.debounceFeaturesContainer}>
        <h4 className={styles.debounceFeaturesTitle}>useDebounce Hook Features:</h4>
        <ul className={styles.debounceFeaturesList}>
          <li>✅ Reduces frequency of expensive operations</li>
          <li>✅ Improves performance for search inputs</li>
          <li>✅ Prevents excessive API calls</li>
          <li>✅ Optimizes window resize handlers</li>
          <li>✅ Type-safe with TypeScript</li>
          <li>✅ Configurable delay timing</li>
          <li>✅ Automatic cleanup of timeouts</li>
          <li>✅ Works with any value type</li>
        </ul>
      </div>

      <div className={styles.debounceUsageContainer}>
        <h4 className={styles.debounceUsageTitle}>Usage Examples:</h4>
        <pre className={styles.debounceCodeBlock}>
{`// Basic debouncing
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// Debounced callback
const debouncedSave = useDebounceCallback((data) => {
  saveToDatabase(data);
}, 1000);

// Window resize debouncing
const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
const debouncedWindowSize = useDebounce(windowSize, 100);

// Form validation debouncing
const [inputValue, setInputValue] = useState('');
const debouncedInputValue = useDebounce(inputValue, 300);`}
        </pre>
      </div>

      <div className={styles.useCasesContainer}>
        <h4 className={styles.useCasesTitle}>Common Use Cases:</h4>
        <ul className={styles.useCasesList}>
          <li>🔍 <strong>Search inputs</strong> - Prevent API calls on every keystroke</li>
          <li>📝 <strong>Form validation</strong> - Validate only after user stops typing</li>
          <li>🖼️ <strong>Image lazy loading</strong> - Load images only when scrolling stops</li>
          <li>📱 <strong>Window resize</strong> - Update layout only after resize ends</li>
          <li>💾 <strong>Auto-save</strong> - Save data only after user stops editing</li>
          <li>🎯 <strong>Scroll events</strong> - Handle scroll only when it stops</li>
        </ul>
      </div>
    </div>
  );
};

export default UseDebounceExample; 