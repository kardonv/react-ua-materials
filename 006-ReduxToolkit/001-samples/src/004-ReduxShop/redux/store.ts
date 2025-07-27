import { createStore, Store } from 'redux';
import cakeReducer from './cake/cakeReducer';

/**
 * Redux Store Configuration
 * 
 * Creates and configures the Redux store for the cake shop application.
 * The store uses the cake reducer to manage the application state.
 */
const store: Store = createStore(cakeReducer);

export default store;