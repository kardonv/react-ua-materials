import React, { useState } from 'react';
import styles from './styles.module.css';

import { useLocalStorage } from './hooks/useLocalStorage';

// Custom Hook: useLocalStorage
// Manages state that persists in localStorage with automatic serialization/deserialization

const UseLocalStorageExample: React.FC = () => {
  const [user, setUser] = useLocalStorage('user', {
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const [counter, setCounter] = useLocalStorage('counter', 0);
  const [notes, setNotes] = useLocalStorage('notes', ['']);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const [log, setLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleUserChange = (field: string, value: string | boolean) => {
    if (field === 'theme') {
      setUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          theme: value as string
        }
      }));
    } else if (field === 'notifications') {
      setUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: value as boolean
        }
      }));
    } else {
      setUser(prev => ({ ...prev, [field]: value }));
    }
    addToLog(`User ${field} updated`);
  };

  const handleCounterIncrement = () => {
    setCounter(prev => prev + 1);
    addToLog('Counter incremented');
  };

  const handleCounterDecrement = () => {
    setCounter(prev => prev - 1);
    addToLog('Counter decremented');
  };

  const handleAddNote = () => {
    setNotes(prev => [...prev, '']);
    addToLog('Note added');
  };

  const handleNoteChange = (index: number, value: string) => {
    setNotes(prev => prev.map((note, i) => i === index ? value : note));
    addToLog(`Note ${index + 1} updated`);
  };

  const handleRemoveNote = (index: number) => {
    setNotes(prev => prev.filter((_, i) => i !== index));
    addToLog(`Note ${index + 1} removed`);
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    addToLog('Theme toggled');
  };

  const handleClearAll = () => {
    // Clear all localStorage items
    window.localStorage.clear();
    addToLog('All localStorage cleared');
    // Force re-render by updating state
    setUser({ name: '', email: '', preferences: { theme: 'light', notifications: true } });
    setCounter(0);
    setNotes(['']);
    setTheme('light');
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.containerDark : styles.containerLight}`}>
      <h2 className={styles.title}>useLocalStorage Custom Hook Example</h2>
      <p className={styles.description}>
        This example demonstrates a custom hook that manages state with localStorage persistence.
        Data persists across page refreshes and browser sessions.
      </p>

      <div className={styles.gridContainer}>
        
        {/* User Profile Section */}
        <div className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight}`}>
          <h3 className={styles.cardTitle}>User Profile (Persistent)</h3>
          
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleUserChange('name', e.target.value)}
              className={`${styles.fieldInput} ${theme === 'dark' ? styles.fieldInputDark : styles.fieldInputLight}`}
            />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleUserChange('email', e.target.value)}
              className={`${styles.fieldInput} ${theme === 'dark' ? styles.fieldInputDark : styles.fieldInputLight}`}
            />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>
              Theme:
            </label>
            <select
              value={user.preferences.theme}
              onChange={(e) => handleUserChange('theme', e.target.value)}
              className={`${styles.fieldSelect} ${theme === 'dark' ? styles.fieldSelectDark : styles.fieldSelectLight}`}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={user.preferences.notifications}
                onChange={(e) => handleUserChange('notifications', e.target.checked)}
              />
              <span>Enable Notifications</span>
            </label>
          </div>
        </div>

        {/* Counter Section */}
        <div className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight}`}>
          <h3 className={styles.cardTitle}>Counter (Persistent)</h3>
          <div className={styles.counterDisplay}>
            <div className={styles.counterValue}>
              {counter}
            </div>
            <div className={styles.counterButtons}>
              <button 
                onClick={handleCounterDecrement}
                className={styles.counterButton}
              >
                -
              </button>
              <button 
                onClick={handleCounterIncrement}
                className={styles.counterButton}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight}`}>
          <h3 className={styles.cardTitle}>Notes (Persistent)</h3>
          <div className={styles.notesContainer}>
            {notes.map((note, index) => (
              <div key={index} className={styles.noteItem}>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  placeholder={`Note ${index + 1}`}
                  className={`${styles.noteInput} ${theme === 'dark' ? styles.noteInputDark : styles.noteInputLight}`}
                />
                <button 
                  onClick={() => handleRemoveNote(index)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={handleAddNote}
            className={styles.addButton}
          >
            Add Note
          </button>
        </div>

        {/* Theme Toggle */}
        <div className={`${styles.card} ${theme === 'dark' ? styles.cardDark : styles.cardLight}`}>
          <h3 className={styles.cardTitle}>Global Theme</h3>
          <button 
            onClick={handleThemeToggle}
            className={styles.themeButton}
          >
            Toggle Theme (Current: {theme})
          </button>
          
          <button 
            onClick={handleClearAll}
            className={styles.clearButton}
          >
            Clear All localStorage
          </button>
        </div>
      </div>

      {/* Action Log */}
      <div className={styles.logContainer}>
        <h3 className={styles.logTitle}>Action Log:</h3>
        <div className={`${styles.logDisplay} ${theme === 'dark' ? styles.logDisplayDark : styles.logDisplayLight}`}>
          {log.map((entry, index) => (
            <div key={index} className={styles.logEntry}>
              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.featuresContainer}>
        <h4 className={styles.featuresTitle}>useLocalStorage Hook Features:</h4>
        <ul className={styles.featuresList}>
          <li>✅ Automatic serialization/deserialization with JSON</li>
          <li>✅ Error handling for localStorage failures</li>
          <li>✅ Cross-tab synchronization</li>
          <li>✅ Type-safe with TypeScript</li>
          <li>✅ Same API as useState (value or function)</li>
          <li>✅ Custom serialization options</li>
          <li>✅ Remove function to clear specific key</li>
          <li>✅ Persists across page refreshes and browser sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default UseLocalStorageExample; 