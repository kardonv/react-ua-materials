import React, { useReducer } from 'react';

import styles from './styles.module.css';
import { FormState } from './types/FormReducer';
import { formReducer, initialState } from './reducers/FormReducer';


export default function FormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleFieldChange = (fieldName: keyof FormState['fields'], value: string) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { field: fieldName, value } });
  };

  const handleFieldBlur = (fieldName: keyof FormState['fields']) => {
    dispatch({ type: 'VALIDATE_FIELD', payload: fieldName });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields first
    dispatch({ type: 'VALIDATE_ALL_FIELDS' });

    // Check if there are any errors
    const hasErrors = Object.values(state.fields).some(field => field.error);
    if (hasErrors) {
      return;
    }

    // Simulate form submission
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error occurred');
      }

      dispatch({ type: 'SET_SUBMITTED', payload: true });
    } catch (error) {
      dispatch({
        type: 'SET_SUBMIT_ERROR',
        payload: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const renderField = (
    fieldName: keyof FormState['fields'],
    label: string,
    type: string = 'text',
    placeholder?: string
  ) => {
    const field = state.fields[fieldName];
    const showError = field.touched && field.error;

    return (
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          {label}
        </label>
        <input
          type={type}
          value={field.value}
          onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          onBlur={() => handleFieldBlur(fieldName)}
          placeholder={placeholder}
          className={`${styles.formInput} ${showError ? styles.formInputError : ''}`}
        />
        {showError && (
          <div className={styles.formError}>
            {field.error}
          </div>
        )}
      </div>
    );
  };

  const renderCheckbox = (fieldName: keyof FormState['fields'], label: string) => {
    const field = state.fields[fieldName];
    const showError = field.touched && field.error;

    return (
      <div className={styles.formField}>
        <label className={styles.formCheckboxLabel}>
          <input
            type="checkbox"
            checked={field.value === 'true'}
            onChange={(e) => handleFieldChange(fieldName, e.target.checked.toString())}
            onBlur={() => handleFieldBlur(fieldName)}
            className={styles.formCheckbox}
          />
          <span className={styles.formCheckboxText}>{label}</span>
        </label>
        {showError && (
          <div className={styles.formError}>
            {field.error}
          </div>
        )}
      </div>
    );
  };

  if (state.isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <h2 className={styles.successTitle}>✅ Form Submitted Successfully!</h2>
        <p className={styles.successMessage}>
          Thank you for your submission. We'll get back to you soon!
        </p>
        <button
          onClick={handleReset}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Submit Another Form
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.containerForm}`}>
      <h2 className={styles.counterDisplayCentered}>Form Management with useReducer</h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {renderField('firstName', 'First Name', 'text', 'Enter your first name')}
        {renderField('lastName', 'Last Name', 'text', 'Enter your last name')}
        {renderField('email', 'Email Address', 'email', 'Enter your email address')}
        {renderField('password', 'Password', 'password', 'Enter your password')}
        {renderField('confirmPassword', 'Confirm Password', 'password', 'Confirm your password')}
        {renderField('age', 'Age', 'number', 'Enter your age')}
        {renderCheckbox('agreeToTerms', 'I agree to the terms and conditions')}

        {state.submitError && (
          <div className={styles.formSubmitError}>
            {state.submitError}
          </div>
        )}

        <div className={`${styles.buttonGroup} ${styles.buttonGroupForm}`}>
          <button
            type="submit"
            disabled={state.isSubmitting}
            className={`${styles.button} ${state.isSubmitting ? styles.buttonDisabled : styles.buttonPrimary}`}
          >
            {state.isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Reset Form
          </button>
        </div>
      </form>

      <div className={styles.explanationSection}>
        <h4>useReducer Benefits for Form Management:</h4>
        <ul className={styles.explanationList}>
          <li><strong>Complex State:</strong> Manages multiple form fields with validation</li>
          <li><strong>Validation Logic:</strong> Centralized validation in reducer</li>
          <li><strong>Error Handling:</strong> Consistent error state management</li>
          <li><strong>Form Submission:</strong> Handles loading and success states</li>
          <li><strong>Predictable Updates:</strong> All form changes go through actions</li>
        </ul>
      </div>
    </div>
  );
} 