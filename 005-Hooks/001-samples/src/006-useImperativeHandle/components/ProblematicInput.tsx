import React, { useRef, forwardRef, useState } from 'react';
import styles from '../styles.module.css';
import { InputRef } from '../types';


export const ProblematicInput = forwardRef<InputRef, { placeholder?: string }>((props, ref) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

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
            inputRef.current?.focus();
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
                ref={inputRef}
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