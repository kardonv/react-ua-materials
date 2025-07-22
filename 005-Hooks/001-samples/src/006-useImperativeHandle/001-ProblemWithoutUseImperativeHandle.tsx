import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

import { ProblematicInput } from './components';
import { InputRef } from './types';

const ProblemExample: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
    console.log('Focus called', inputRef.current);
    addToLog('Focus called');
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    addToLog('Blur called');
  };

  const handleSelect = () => {
    inputRef.current?.select();
    addToLog('Select called');
  };

  // PROBLEM: We can access internal methods that shouldn't be public
  const handleInternalValidation = () => {
    const isValid = inputRef.current?.validateInput();
    addToLog(`Internal validation called: ${isValid}`);
  };

  const handleClearValidation = () => {
    inputRef.current?.clearValidation();
    addToLog('Internal clear validation called');
  };

  const handleSetInternalState = () => {
    inputRef.current?.setInternalState('Hacked by parent!');
    addToLog('Internal state set by parent');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Problem: Without useImperativeHandle</h2>
      <p className={styles.description}>
        This example shows the problem of exposing ALL methods to the parent component.
        The parent can access internal methods that should remain private.
      </p>

      <div className={styles.section}>
        <ProblematicInput ref={inputRef} placeholder="Type something..." />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Public Methods (Should be accessible):</h3>
        <button onClick={handleFocus} className={styles.button}>
          Focus
        </button>
        <button onClick={handleBlur} className={styles.button}>
          Blur
        </button>
        <button onClick={handleSelect} className={styles.button}>
          Select
        </button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Internal Methods (Should NOT be accessible):</h3>
        <button
          onClick={handleInternalValidation}
          className={styles.internalButton}
        >
          Access Internal Validation
        </button>
        <button
          onClick={handleClearValidation}
          className={styles.internalButton}
        >
          Access Clear Validation
        </button>
        <button
          onClick={handleSetInternalState}
          className={styles.internalButton}
        >
          Access Set Internal State
        </button>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Action Log:</h3>
        <div className={styles.logContainer}>
          {log.map((entry, index) => (
            <div key={index} className={styles.logEntry}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.problemsContainer}>
        <h4 className={styles.problemsTitle}>Problems Identified:</h4>
        <ul className={styles.problemsList}>
          <li>Parent component can access internal validation logic</li>
          <li>Parent can manipulate internal state directly</li>
          <li>No control over what methods are exposed</li>
          <li>Potential security and encapsulation issues</li>
          <li>Breaking the principle of least privilege</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemExample; 