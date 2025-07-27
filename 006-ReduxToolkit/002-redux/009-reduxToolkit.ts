import { store } from './app/store';

import { cakeActions } from './features/cake/cakeSlice';
import { iceCreamActions } from './features/iceCream/iceCreamSlice';

console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

store.dispatch(cakeActions.buyCake());
store.dispatch(cakeActions.buyCake()); 
store.dispatch(cakeActions.restoreCake(2));

store.dispatch(iceCreamActions.buyIceCream());
store.dispatch(iceCreamActions.buyIceCream());
store.dispatch(iceCreamActions.restoreIceCream(2));


unsubscribe();
