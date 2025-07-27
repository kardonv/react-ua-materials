import { store } from './app/store';

import { fetchUsers } from './features/user/userSlice';

console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

store.dispatch(fetchUsers());

// unsubscribe();
