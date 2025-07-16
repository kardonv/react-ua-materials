import React, { useState, useMemo } from 'react';

import { fibonacci } from '../utils';
import styles from './styles.module.css';

interface ChildProps {
    expensiveValue: number;
    theme: string;
    onUpdate: () => void;
}

const ExpensiveChild = React.memo<ChildProps>(({ expensiveValue, theme, onUpdate }) => {
    console.log('ExpensiveChild rendering');

    return (
        <div className={`${styles.expensiveChild} ${theme === 'dark' ? styles.expensiveChildDark : styles.expensiveChildLight}`}>
            <h3>Expensive Child Component</h3>
            <p>Expensive calculation result: {expensiveValue}</p>
            <p>Current theme: {theme}</p>
            <button onClick={onUpdate} className={styles.expensiveChildButton}>
                Update Parent
            </button>
        </div>
    );
});

const SimpleChild = React.memo<{ count: number }>(({ count }) => {
    console.log('SimpleChild rendering');

    return (
        <div className={styles.simpleChild}>
            <p>Simple Child - Count: {count}</p>
        </div>
    );
});

export default function UseMemoWithChild() {
    const [number, setNumber] = useState<number>(5);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [counter, setCounter] = useState<number>(0);

    console.log('Parent component rendering');
    
    const expensiveValue = useMemo(() => {
        return fibonacci(number);
    }, [number]);

    const themeConfig = useMemo(() => {
        return {
            theme: theme,
            backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
            color: theme === 'dark' ? '#fff' : '#333'
        };
    }, [theme]);

    const handleUpdate = useMemo(() => {
        return () => {
            setCounter(c => c + 1);
        };
    }, []);

    return (
        <div className={`${styles.parentContainer} ${theme === 'dark' ? styles.parentContainerDark : styles.parentContainerLight}`}>
            <h2>useMemo with Child Components Example</h2>

            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                    Number for Fibonacci:
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                        min="1"
                        max="15"
                        className={styles.numberInput}
                    />
                </label>
            </div>

            <div className={styles.buttonGroup}>
                <button
                    onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                    className={`${styles.themeButton} ${theme === 'dark' ? styles.themeButtonDark : styles.themeButtonLight}`}
                >
                    Toggle Theme
                </button>

                <button
                    onClick={() => setCounter(c => c + 1)}
                    className={styles.counterButton}
                >
                    Increment Counter
                </button>
            </div>

            <div className={styles.infoGroup}>
                <p>Parent Counter: {counter}</p>
                <p>Current Number: {number}</p>
                <p>Current Theme: {theme}</p>
            </div>

            {/* Child components */}
            <ExpensiveChild
                expensiveValue={expensiveValue}
                theme={themeConfig.theme}
                onUpdate={handleUpdate}
            />

            <SimpleChild count={counter} />

            <div className={`${styles.explanationSection} ${theme === 'dark' ? styles.explanationSectionDark : styles.explanationSectionLight}`}>
                <h4>How this works:</h4>
                <ul className={styles.explanationList}>
                    <li><strong>ExpensiveChild</strong> only re-renders when <code>expensiveValue</code> or <code>theme</code> changes</li>
                    <li><strong>SimpleChild</strong> only re-renders when <code>count</code> changes</li>
                    <li>Toggle theme - ExpensiveChild re-renders (theme changed), SimpleChild doesn't</li>
                    <li>Increment counter - SimpleChild re-renders, ExpensiveChild doesn't</li>
                    <li>Change number - ExpensiveChild re-renders (new calculation), SimpleChild doesn't</li>
                    <li>Check console to see which components actually render</li>
                </ul>
            </div>
        </div>
    );
}