import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Counter from './components/Counter';
import styles from './styles.module.css';

// Main Component
export default function ReduxExample() {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Counter />
      </div>
    </Provider>
  );
}
