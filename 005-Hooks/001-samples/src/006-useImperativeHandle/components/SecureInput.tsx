import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

import styles from '../styles.module.css';

export interface InputRef {
    focus: () => void;
    blur: () => void;
    select: () => void;
    // Only expose a public validation method, not internal ones
    validate: () => { isValid: boolean; message: string };
}

export const SecureInput = forwardRef<InputRef, { placeholder?: string }>((props, ref) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Internal validation method - NOT exposed to parent
    const validateInput = useCallback(() => {
        const isValidInput = value.length >= 3;
        setIsValid(isValidInput);
        setErrorMessage(isValidInput ? '' : 'Input must be at least 3 characters');
        return isValidInput;
    }, [value, setIsValid, setErrorMessage]);

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
    }), [errorMessage, validateInput]); // Dependencies for the imperative handle

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