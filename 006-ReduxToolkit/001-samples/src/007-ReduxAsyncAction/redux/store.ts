import { applyMiddleware, createStore, Store } from 'redux';
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';

const store: Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;