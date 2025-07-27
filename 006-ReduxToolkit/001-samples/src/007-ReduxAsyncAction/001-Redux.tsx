import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserContainer } from './components/UserContainer';
import styles from './styles.module.css';


export default function ReduxShopExample(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Redux Cake Shop Hooks Example</h1>
        <p className={styles.description}>
          A simple demonstration of Redux state management with a cake shop.
        </p>

        <Provider store={store}>
          <UserContainer />
        </Provider>
      </div>
    </div>
  );
} 