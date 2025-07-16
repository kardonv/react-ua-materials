import React, { useRef, forwardRef, useState } from 'react';
import styles from './styles.module.css';

// Problem: Without useImperativeHandle, we expose ALL methods and properties
// This can lead to exposing internal implementation details and potential security issues

interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  // Problem: We also expose internal methods that shouldn't be public
  validateInput: () => boolean;
  clearValidation: () => void;
  setInternalState: (value: string) => void;
}

const ProblematicInput = forwardRef<InputRef, { placeholder?: string }>((props, ref) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Internal validation method that shouldn't be exposed
  const validateInput = () => {
    const isValidInput = value.length >= 3;
    setIsValid(isValidInput);
    setErrorMessage(isValidInput ? '' : 'Input must be at least 3 characters');
    return isValidInput;
  };

  // Internal method to clear validation
  const clearValidation = () => {
    setIsValid(true);
    setErrorMessage('');
  };

  // Internal method to set state
  const setInternalState = (newValue: string) => {
    setValue(newValue);
  };

  // Expose ALL methods to the ref (PROBLEM!)
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      const input = document.querySelector('input') as HTMLInputElement;
      input?.focus();
    },
    blur: () => {
      const input = document.querySelector('input') as HTMLInputElement;
      input?.blur();
    },
    select: () => {
      const input = document.querySelector('input') as HTMLInputElement;
      input?.select();
    },
    // PROBLEM: Exposing internal methods that shouldn't be public
    validateInput,
    clearValidation,
    setInternalState
  }));

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        className={isValid ? styles.input : styles.inputError}
      />
      {!isValid && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
});

const ProblemExample: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
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