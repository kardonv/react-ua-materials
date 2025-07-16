import React, { useState, useDebugValue, useEffect, useMemo } from 'react';

import styles from './styles.module.css';

// Custom hook with useDebugValue
function useUserStatus(userId: number) {
  const [status, setStatus] = useState<'online' | 'offline' | 'away'>('offline');
  const [lastSeen, setLastSeen] = useState<Date>(new Date());

  // useDebugValue provides custom label in React DevTools
  useDebugValue(
    status === 'online' 
      ? '🟢 Online' 
      : status === 'away' 
        ? '🟡 Away' 
        : '🔴 Offline'
  );

  useEffect(() => {
    // Simulate user status changes
    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.4) {
        setStatus('online');
        setLastSeen(new Date());
      } else if (random < 0.7) {
        setStatus('away');
        setLastSeen(new Date());
      } else {
        setStatus('offline');
        setLastSeen(new Date());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { status, lastSeen };
}

// Custom hook with conditional useDebugValue
function useExpensiveCalculation(value: number) {
  const result = useMemo(() => {
    // Simulate expensive calculation
    let sum = 0;
    for (let i = 0; i < value * 1000; i++) {
      sum += Math.random();
    }
    return sum;
  }, [value]);

  // Only show debug value in development
  useDebugValue(
    result,
    (result) => `Expensive calculation result: ${result.toFixed(2)}`
  );

  return result;
}

// Custom hook with complex debug value
function useFormValidation(formData: { email: string; password: string }) {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
  }, [formData]);

  // Complex debug value showing validation status
  useDebugValue(
    { formData, errors },
    ({ formData, errors }) => {
      const hasErrors = Object.keys(errors).length > 0;
      const isComplete = formData.email && formData.password;
      
      if (!isComplete) return '📝 Incomplete form';
      if (hasErrors) return '❌ Form has errors';
      return '✅ Form is valid';
    }
  );

  return { errors, isValid: Object.keys(errors).length === 0 };
}

// Custom hook with lazy debug value
function useAsyncData(url: string) {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API call
    const timeout = setTimeout(() => {
      if (Math.random() > 0.2) {
        setData({ message: `Data from ${url}` });
        setLoading(false);
      } else {
        setError('Failed to fetch data');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [url]);

  // Lazy debug value - only computed when DevTools are open
  useDebugValue(
    { data, loading, error },
    ({ data, loading, error }) => {
      if (loading) return '⏳ Loading...';
      if (error) return `❌ Error: ${error}`;
      if (data) return '✅ Data loaded';
      return '📭 No data';
    }
  );

  return { data, loading, error };
}

export default function UseDebugValueExample() {
  const [userId, setUserId] = useState(1);
  const [calculationValue, setCalculationValue] = useState(5);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [apiUrl, setApiUrl] = useState('/api/users');

  // Use our custom hooks
  const userStatus = useUserStatus(userId);
  const expensiveResult = useExpensiveCalculation(calculationValue);
  const formValidation = useFormValidation(formData);
  const asyncData = useAsyncData(apiUrl);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        useDebugValue Hook Example
      </h2>

      <div className={styles.mainGrid}>
        {/* User Status Section */}
        <div className={styles.sectionCard}>
          <h3>👤 User Status Hook</h3>
          <p className={styles.sectionDescription}>
            Check React DevTools to see the custom debug value for this hook.
          </p>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupInline}>
              <label className={styles.labelInline}>
                User ID:
                <input
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value))}
                  className={`${styles.input} ${styles.inputSmall}`}
                />
              </label>
            </div>
          </div>

          <div className={styles.statusDisplay}>
            <p><strong>Status:</strong> {userStatus.status}</p>
            <p><strong>Last Seen:</strong> {userStatus.lastSeen.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Expensive Calculation Section */}
        <div className={styles.sectionCard}>
          <h3>🧮 Expensive Calculation Hook</h3>
          <p className={styles.sectionDescription}>
            This hook performs an expensive calculation and shows the result in DevTools.
          </p>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupInline}>
              <label className={styles.labelInline}>
                Calculation Value:
                <input
                  type="number"
                  value={calculationValue}
                  onChange={(e) => setCalculationValue(Number(e.target.value))}
                  min="1"
                  max="10"
                  className={`${styles.input} ${styles.inputSmall}`}
                />
              </label>
            </div>
          </div>

          <div className={styles.statusDisplay}>
            <p><strong>Result:</strong> {expensiveResult.toFixed(2)}</p>
          </div>
        </div>

        {/* Form Validation Section */}
        <div className={styles.sectionCard}>
          <h3>📝 Form Validation Hook</h3>
          <p className={styles.sectionDescription}>
            This hook validates form data and shows validation status in DevTools.
          </p>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupStacked}>
              <div className={styles.formField}>
                <label className={styles.label}>
                  Email:
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`${styles.input} ${styles.inputFull}`}
                  />
                </label>
                {formValidation.errors.email && (
                  <span className={styles.errorMessage}>
                    {formValidation.errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formField}>
                <label className={styles.label}>
                  Password:
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={`${styles.input} ${styles.inputFull}`}
                  />
                </label>
                {formValidation.errors.password && (
                  <span className={styles.errorMessage}>
                    {formValidation.errors.password}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={formValidation.isValid ? styles.formStatusValid : styles.formStatusInvalid}>
            <p className={formValidation.isValid ? styles.formStatusTextValid : styles.formStatusTextInvalid}>
              <strong>Form Status:</strong> {formValidation.isValid ? 'Valid' : 'Invalid'}
            </p>
          </div>
        </div>

        {/* Async Data Section */}
        <div className={styles.sectionCard}>
          <h3>🌐 Async Data Hook</h3>
          <p className={styles.sectionDescription}>
            This hook fetches data and shows loading/error states in DevTools.
          </p>
          
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupInline}>
              <label className={styles.labelInline}>
                API URL:
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className={`${styles.input} ${styles.inputMedium}`}
                />
              </label>
            </div>
          </div>

          <div className={styles.asyncDataDisplay}>
            {asyncData.loading && <p className={styles.loadingText}>⏳ Loading...</p>}
            {asyncData.error && <p className={styles.errorText}>❌ {asyncData.error}</p>}
            {asyncData.data && (
              <p className={styles.successText}>✅ {asyncData.data.message}</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className={styles.instructionsSection}>
          <h3>🔍 How to See Debug Values</h3>
          <ol className={styles.instructionsList}>
            <li>Open your browser's Developer Tools</li>
            <li>Go to the React DevTools tab</li>
            <li>Select the <code className={styles.code}>UseDebugValueExample</code> component</li>
            <li>Look at the custom hooks in the right panel</li>
            <li>You'll see custom labels instead of generic hook names</li>
          </ol>

          <div className={styles.benefitsBox}>
            <h4 className={styles.benefitsTitle}>useDebugValue Benefits:</h4>
            <ul className={styles.benefitsList}>
              <li><strong>Custom Labels:</strong> Replace generic hook names with meaningful descriptions</li>
              <li><strong>State Visibility:</strong> See the current state of custom hooks at a glance</li>
              <li><strong>Debugging:</strong> Easier to understand what each hook is doing</li>
              <li><strong>Performance:</strong> Lazy evaluation - only computed when DevTools are open</li>
              <li><strong>Development Only:</strong> Automatically stripped in production builds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 