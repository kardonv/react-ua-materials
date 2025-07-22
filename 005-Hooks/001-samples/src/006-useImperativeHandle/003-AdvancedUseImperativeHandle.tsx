import React, { useRef, forwardRef, useState, useImperativeHandle, useCallback } from 'react';

import styles from './styles.module.css';
import { AdvancedFormRef, FormData, FormErrors } from './types';





const AdvancedForm = forwardRef<AdvancedFormRef, {
  initialData?: Partial<FormData>;
  onSubmit?: (data: FormData) => Promise<{ success: boolean; message: string }>;
}>((props, ref) => {
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    message: '',
    ...props.initialData
  });

  const [initialData] = useState<FormData>({ ...data });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Internal validation logic
  const validateField = useCallback((fieldName: keyof FormData, value: string): { isValid: boolean; error: string } => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return { isValid: false, error: 'Name is required' };
        if (value.length < 2) return { isValid: false, error: 'Name must be at least 2 characters' };
        return { isValid: true, error: '' };

      case 'email':
        if (!value.trim()) return { isValid: false, error: 'Email is required' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return { isValid: false, error: 'Invalid email format' };
        return { isValid: true, error: '' };

      case 'age':
        if (!value.trim()) return { isValid: false, error: 'Age is required' };
        const age = parseInt(value);
        if (isNaN(age) || age < 0 || age > 120) return { isValid: false, error: 'Age must be between 0 and 120' };
        return { isValid: true, error: '' };

      case 'message':
        if (!value.trim()) return { isValid: false, error: 'Message is required' };
        if (value.length < 10) return { isValid: false, error: 'Message must be at least 10 characters' };
        return { isValid: true, error: '' };

      default:
        return { isValid: true, error: '' };
    }
  }, []);

  const validateAll = useCallback((): { isValid: boolean; errors: string[] } => {
    const fieldErrors: FormErrors = {};
    const errorMessages: string[] = [];

    Object.keys(data).forEach((key) => {
      const fieldName = key as keyof FormData;
      const { isValid, error } = validateField(fieldName, data[fieldName]);

      if (!isValid) {
        fieldErrors[fieldName] = error;
        errorMessages.push(error);
      }
    });

    setErrors(fieldErrors);
    return { isValid: errorMessages.length === 0, errors: errorMessages };
  }, [data, validateField]);

  const handleFieldChange = (fieldName: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [fieldName]: value }));

    // Check if form is dirty
    const newData = { ...data, [fieldName]: value };
    const dirty = JSON.stringify(newData) !== JSON.stringify(initialData);
    setIsDirty(dirty);

    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleSubmit = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    const { isValid } = validateAll();

    if (!isValid) {
      return { success: false, message: 'Please fix validation errors' };
    }

    setIsSubmitting(true);

    try {
      if (props.onSubmit) {
        const result = await props.onSubmit(data);
        if (result.success) {
          setIsDirty(false);
        }
        return result;
      } else {
        // Mock submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsDirty(false);
        return { success: true, message: 'Form submitted successfully!' };
      }
    } catch (error) {
      return { success: false, message: 'Submission failed' };
    } finally {
      setIsSubmitting(false);
    }
  }, [data, validateAll, props]);

  // ADVANCED: useImperativeHandle with complex logic and conditional methods
  useImperativeHandle(ref, () => ({
    // Basic methods
    focus: () => {
      const firstInput = document.querySelector('input') as HTMLInputElement;
      firstInput?.focus();
    },

    blur: () => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement?.blur();
    },

    reset: () => {
      setData(initialData);
      setErrors({});
      setIsDirty(false);
      setIsSubmitting(false);
    },

    // Validation methods
    validate: validateAll,

    validateField: (fieldName: string) => {
      const field = fieldName as keyof FormData;
      return validateField(field, data[field]);
    },

    // Data methods
    getData: () => ({ ...data }),

    setData: (newData: Partial<FormData>) => {
      setData(prev => ({ ...prev, ...newData }));
      // Recalculate dirty state
      const updatedData = { ...data, ...newData };
      const dirty = JSON.stringify(updatedData) !== JSON.stringify(initialData);
      setIsDirty(dirty);
    },

    // State methods
    isDirty: () => isDirty,

    isSubmitting: () => isSubmitting,

    // Advanced methods
    submit: handleSubmit,

    clearErrors: () => {
      setErrors({});
    }
  }), [data, isDirty, isSubmitting, validateAll, validateField, initialData, handleSubmit]);

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Advanced Form</h3>

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>
          Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          className={errors.name ? styles.fieldInputError : styles.fieldInput}
        />
        {errors.name && <div className={styles.fieldError}>{errors.name}</div>}
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>
          Email *
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          className={errors.email ? styles.fieldInputError : styles.fieldInput}
        />
        {errors.email && <div className={styles.fieldError}>{errors.email}</div>}
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>
          Age *
        </label>
        <input
          type="number"
          value={data.age}
          onChange={(e) => handleFieldChange('age', e.target.value)}
          className={errors.age ? styles.fieldInputError : styles.fieldInput}
        />
        {errors.age && <div className={styles.fieldError}>{errors.age}</div>}
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel}>
          Message *
        </label>
        <textarea
          value={data.message}
          onChange={(e) => handleFieldChange('message', e.target.value)}
          rows={3}
          className={errors.message ? styles.fieldTextareaError : styles.fieldTextarea}
        />
        {errors.message && <div className={styles.fieldError}>{errors.message}</div>}
      </div>

      <div className={styles.statusContainer}>
        <div>Status: {isSubmitting ? 'Submitting...' : isDirty ? 'Modified' : 'Clean'}</div>
        <div>Errors: {Object.keys(errors).length}</div>
      </div>
    </div>
  );
});

const AdvancedExample: React.FC = () => {
  const formRef = useRef<AdvancedFormRef>(null);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFocus = () => {
    formRef.current?.focus();
    addToLog('Focus called');
  };

  const handleReset = () => {
    formRef.current?.reset();
    addToLog('Reset called');
    setResult('');
  };

  const handleValidate = () => {
    const validation = formRef.current?.validate();
    addToLog(`Validation: ${validation?.isValid ? 'Valid' : 'Invalid'}`);
    if (validation?.errors.length) {
      addToLog(`Errors: ${validation.errors.join(', ')}`);
    }
  };

  const handleValidateField = (fieldName: string) => {
    const fieldValidation = formRef.current?.validateField(fieldName);
    addToLog(`${fieldName} validation: ${fieldValidation?.isValid ? 'Valid' : 'Invalid'} - ${fieldValidation?.error || 'No error'}`);
  };

  const handleGetData = () => {
    const data = formRef.current?.getData();
    addToLog(`Get data: ${JSON.stringify(data)}`);
  };

  const handleSetData = () => {
    formRef.current?.setData({ name: 'John Doe', email: 'john@example.com' });
    addToLog('Set data called with name and email');
  };

  const handleCheckStatus = () => {
    const dirty = formRef.current?.isDirty();
    const submitting = formRef.current?.isSubmitting();
    addToLog(`Status - Dirty: ${dirty}, Submitting: ${submitting}`);
  };

  const handleSubmit = async () => {
    addToLog('Submit called');
    const result = await formRef.current?.submit();
    setResult(result?.message || '');
    addToLog(`Submit result: ${result?.success ? 'Success' : 'Failed'} - ${result?.message}`);
  };

  const handleClearErrors = () => {
    formRef.current?.clearErrors();
    addToLog('Clear errors called');
  };

  return (
    <div className={styles.advancedContainer}>
      <h2 className={styles.advancedTitle}>Advanced useImperativeHandle Example</h2>
      <p className={styles.advancedDescription}>
        This example demonstrates advanced patterns with useImperativeHandle including
        multiple methods, complex state management, and conditional logic.
      </p>

      <div className={styles.layoutContainer}>
        <div className={styles.formSection}>
          <AdvancedForm
            ref={formRef}
            initialData={{ name: 'Jane', email: 'jane@example.com' }}
          />

          {result && (
            <div className={`${styles.resultContainer} ${result.includes('success') ? styles.resultSuccess : styles.resultError}`}>
              {result}
            </div>
          )}
        </div>

        <div className={styles.controlSection}>
          <h3 className={styles.controlTitle}>Control Panel</h3>

          <div className={styles.controlGroup}>
            <h4 className={styles.controlGroupTitle}>Basic Methods:</h4>
            <button onClick={handleFocus} className={styles.controlButton}>
              Focus
            </button>
            <button onClick={handleReset} className={styles.controlButton}>
              Reset
            </button>
          </div>

          <div className={styles.controlGroup}>
            <h4 className={styles.controlGroupTitle}>Validation Methods:</h4>
            <button onClick={handleValidate} className={styles.controlButton}>
              Validate All
            </button>
            <button onClick={() => handleValidateField('name')} className={styles.controlButton}>
              Validate Name
            </button>
            <button onClick={() => handleValidateField('email')} className={styles.controlButton}>
              Validate Email
            </button>
            <button onClick={handleClearErrors} className={styles.controlButton}>
              Clear Errors
            </button>
          </div>

          <div className={styles.controlGroup}>
            <h4 className={styles.controlGroupTitle}>Data Methods:</h4>
            <button onClick={handleGetData} className={styles.controlButton}>
              Get Data
            </button>
            <button onClick={handleSetData} className={styles.controlButton}>
              Set Data
            </button>
          </div>

          <div className={styles.controlGroup}>
            <h4 className={styles.controlGroupTitle}>State Methods:</h4>
            <button onClick={handleCheckStatus} className={styles.controlButton}>
              Check Status
            </button>
          </div>

          <div className={styles.controlGroup}>
            <h4 className={styles.controlGroupTitle}>Advanced Methods:</h4>
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 className={styles.sectionTitle}>Action Log:</h3>
        <div className={styles.advancedLogContainer}>
          {log.map((entry, index) => (
            <div key={index} className={styles.advancedLogEntry}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.featuresContainer}>
        <h4 className={styles.featuresTitle}>Advanced Features Demonstrated:</h4>
        <ul className={styles.featuresList}>
          <li>✅ Multiple method types (basic, validation, data, state, advanced)</li>
          <li>✅ Complex state management with dirty tracking</li>
          <li>✅ Conditional method behavior based on component state</li>
          <li>✅ Async methods with proper error handling</li>
          <li>✅ Type-safe method signatures</li>
          <li>✅ Dependency management in useImperativeHandle</li>
          <li>✅ Encapsulated internal logic with controlled external API</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedExample; 