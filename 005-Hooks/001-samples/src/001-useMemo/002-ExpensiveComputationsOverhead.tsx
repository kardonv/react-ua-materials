import React, { useState } from 'react';

import { factorial, fibonacci } from '../utils';

import styles from './styles.module.css';

export default function ExpensiveComputationsOverhead() {
    console.log('ExpensiveComputations rendering');

    const [number, setNumber] = useState<number>(1);
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    return (
        <div className={`${styles.container} ${darkTheme ? styles.containerDark : styles.containerLight}`}>
            <h2>useMemo Example - Expensive Computations</h2>

            <div className={styles.inputContainer}>
                <label>
                    Enter a number (keep it small for demo purposes):
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                        min="1"
                        max="30"
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    onClick={() => setDarkTheme(!darkTheme)}
                    className={`${styles.button} ${darkTheme ? styles.buttonDark : styles.buttonLight}`}
                >
                    Toggle Theme
                </button>
            </div>

            <div className={styles.resultsGrid}>
                <div className={`${styles.resultCard} ${darkTheme ? styles.resultCardDark : styles.resultCardLight}`}>
                    <h3>Fibonacci Result</h3>
                    <p>fibonacci({number}) = {fibonacci(number)}</p>
                    <small className={styles.resultText}>
                        Check console to see when calculation runs
                    </small>
                </div>

                <div className={`${styles.resultCard} ${darkTheme ? styles.resultCardDark : styles.resultCardLight}`}>
                    <h3>Factorial Result</h3>
                    <p>factorial({number}) = {factorial(number)}</p>
                    <small className={styles.resultText}>
                        Check console to see when calculation runs
                    </small>
                </div>
            </div>

            <div className={`${styles.infoSection} ${darkTheme ? styles.infoSectionDark : styles.infoSectionLight}`}>
                <h4>How useMemo works:</h4>
                <ul className={styles.infoList}>
                    <li>Expensive calculations are memoized and only recalculate when dependencies change</li>
                    <li>Try changing the theme - you'll see the calculations don't run again</li>
                    <li>Only when you change the number will the calculations execute</li>
                    <li>Check the browser console to see when calculations actually run</li>
                </ul>
            </div>
        </div>
    );
}