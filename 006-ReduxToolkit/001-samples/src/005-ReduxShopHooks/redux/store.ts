import { createStore, Store } from 'redux';
import cakeReducer from './cake/cakeReducer';


const store: Store = createStore(cakeReducer);

export default store;