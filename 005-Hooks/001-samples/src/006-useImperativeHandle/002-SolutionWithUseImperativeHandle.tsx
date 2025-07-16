import React, { useRef, forwardRef, useState, useImperativeHandle } from 'react';

import styles from './styles.module.css';

// Solution: With useImperativeHandle, we control exactly what methods are exposed
// This provides better encapsulation and security

interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  // Only expose a public validation method, not internal ones
  validate: () => { isValid: boolean; message: string };
}

const SecureInput = forwardRef<InputRef, { placeholder?: string }>((props, ref) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Internal validation method - NOT exposed to parent
  const validateInput = () => {
    const isValidInput = value.length >= 3;
    setIsValid(isValidInput);
    setErrorMessage(isValidInput ? '' : 'Input must be at least 3 characters');
    return isValidInput;
  };

  // Internal method to clear validation - NOT exposed to parent
  const clearValidation = () => {
    setIsValid(true);
    setErrorMessage('');
  };

  // Internal method to set state - NOT exposed to parent
  const setInternalState = (newValue: string) => {
    setValue(newValue);
  };

  // SOLUTION: useImperativeHandle controls what's exposed
  useImperativeHandle(ref, () => ({
    // Only expose the methods we want the parent to access
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
    // Expose a controlled validation method that doesn't give access to internal state
    validate: () => {
      const isValidInput = validateInput(); // Call internal method
      return {
        isValid: isValidInput,
        message: errorMessage
      };
    }
    // Internal methods (validateInput, clearValidation, setInternalState) are NOT exposed
  }), [value, errorMessage]); // Dependencies for the imperative handle

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

const SolutionExample: React.FC = () => {
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

  const handleValidate = () => {
    const result = inputRef.current?.validate();
    addToLog(`Validation result: ${result?.isValid}, Message: "${result?.message}"`);
  };

  // These methods are no longer accessible - TypeScript will show errors
  // const handleInternalValidation = () => {
  //   inputRef.current?.validateInput(); // ❌ TypeScript error: Property 'validateInput' does not exist
  // };

  // const handleClearValidation = () => {
  //   inputRef.current?.clearValidation(); // ❌ TypeScript error: Property 'clearValidation' does not exist
  // };

  // const handleSetInternalState = () => {
  //   inputRef.current?.setInternalState('Hacked by parent!'); // ❌ TypeScript error: Property 'setInternalState' does not exist
  // };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Solution: With useImperativeHandle</h2>
      <p className={styles.description}>
        This example shows how useImperativeHandle solves the problem by controlling
        exactly what methods are exposed to the parent component.
      </p>

      <div className={styles.section}>
        <SecureInput ref={inputRef} placeholder="Type something..." />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Public Methods (Only these are accessible):</h3>
        <button onClick={handleFocus} className={styles.button}>
          Focus
        </button>
        <button onClick={handleBlur} className={styles.button}>
          Blur
        </button>
        <button onClick={handleSelect} className={styles.button}>
          Select
        </button>
        <button onClick={handleValidate} className={styles.button}>
          Validate
        </button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Internal Methods (No longer accessible):</h3>
        <div className={styles.successContainer}>
          <p className={styles.successMessage}>
            ✅ Internal methods are now properly encapsulated and cannot be accessed by the parent component.
          </p>
          <p className={styles.successNote}>
            Try uncommenting the code in the component to see TypeScript errors.
          </p>
        </div>
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

      <div className={styles.benefitsContainer}>
        <h4 className={styles.benefitsTitle}>Benefits of useImperativeHandle:</h4>
        <ul className={styles.benefitsList}>
          <li>✅ Controlled API - only expose what you want</li>
          <li>✅ Better encapsulation - internal methods stay private</li>
          <li>✅ Type safety - TypeScript prevents accessing non-existent methods</li>
          <li>✅ Security - prevents unauthorized access to internal state</li>
          <li>✅ Clean interface - parent only sees what it needs</li>
          <li>✅ Dependency control - can specify when to recreate the handle</li>
        </ul>
      </div>

      <div className={styles.keyPointsContainer}>
        <h4 className={styles.keyPointsTitle}>Key Points:</h4>
        <ul className={styles.keyPointsList}>
          <li><strong>useImperativeHandle(ref, createHandle, dependencies)</strong></li>
          <li>First parameter: the ref from forwardRef</li>
          <li>Second parameter: function that returns the object to expose</li>
          <li>Third parameter: dependencies array (optional but recommended)</li>
          <li>Only the returned object's properties are accessible via ref</li>
        </ul>
      </div>
    </div>
  );
};

export default SolutionExample; 