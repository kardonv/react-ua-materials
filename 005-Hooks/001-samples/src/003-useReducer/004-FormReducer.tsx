import React, { useReducer, useState } from 'react';

import styles from './styles.module.css';

// Define form field types
interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

// Define the form state type
interface FormState {
  fields: {
    firstName: FormField;
    lastName: FormField;
    email: FormField;
    password: FormField;
    confirmPassword: FormField;
    age: FormField;
    agreeToTerms: FormField;
  };
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string;
}

// Define action types
type FormAction = 
  | { type: 'SET_FIELD_VALUE'; payload: { field: keyof FormState['fields']; value: string } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: keyof FormState['fields']; error: string } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { field: keyof FormState['fields']; touched: boolean } }
  | { type: 'VALIDATE_FIELD'; payload: keyof FormState['fields'] }
  | { type: 'VALIDATE_ALL_FIELDS' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMITTED'; payload: boolean }
  | { type: 'SET_SUBMIT_ERROR'; payload: string }
  | { type: 'RESET_FORM' };

// Initial state
const initialField: FormField = {
  value: '',
  error: '',
  touched: false
};

const initialState: FormState = {
  fields: {
    firstName: initialField,
    lastName: initialField,
    email: initialField,
    password: initialField,
    confirmPassword: initialField,
    age: initialField,
    agreeToTerms: initialField
  },
  isSubmitting: false,
  isSubmitted: false,
  submitError: ''
};

// Validation functions
const validateField = (fieldName: keyof FormState['fields'], value: string, state: FormState): string => {
  switch (fieldName) {
    case 'firstName':
      if (!value.trim()) return 'First name is required';
      if (value.length < 2) return 'First name must be at least 2 characters';
      return '';
    
    case 'lastName':
      if (!value.trim()) return 'Last name is required';
      if (value.length < 2) return 'Last name must be at least 2 characters';
      return '';
    
    case 'email':
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return '';
    
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      return '';
    
    case 'confirmPassword':
      if (!value) return 'Please confirm your password';
      if (value !== state.fields.password.value) return 'Passwords do not match';
      return '';
    
    case 'age':
      if (!value) return 'Age is required';
      const age = parseInt(value);
      if (isNaN(age) || age < 13 || age > 120) return 'Age must be between 13 and 120';
      return '';
    
    case 'agreeToTerms':
      if (value !== 'true') return 'You must agree to the terms and conditions';
      return '';
    
    default:
      return '';
  }
};

// Reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            value: action.payload.value,
            error: '' // Clear error when user starts typing
          }
        }
      };

    case 'SET_FIELD_ERROR':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            error: action.payload.error
          }
        }
      };

    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: {
            ...state.fields[action.payload.field],
            touched: action.payload.touched
          }
        }
      };

    case 'VALIDATE_FIELD':
      const field = state.fields[action.payload];
      const error = validateField(action.payload, field.value, state);
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload]: {
            ...field,
            error,
            touched: true
          }
        }
      };

    case 'VALIDATE_ALL_FIELDS':
      const updatedFields = { ...state.fields };
      let hasErrors = false;
      
      Object.keys(updatedFields).forEach(fieldName => {
        const fieldKey = fieldName as keyof FormState['fields'];
        const error = validateField(fieldKey, updatedFields[fieldKey].value, state);
        updatedFields[fieldKey] = {
          ...updatedFields[fieldKey],
          error,
          touched: true
        };
        if (error) hasErrors = true;
      });

      return {
        ...state,
        fields: updatedFields,
        submitError: hasErrors ? 'Please fix the errors above' : ''
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload
      };

    case 'SET_SUBMITTED':
      return {
        ...state,
        isSubmitted: action.payload
      };

    case 'SET_SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.payload
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

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