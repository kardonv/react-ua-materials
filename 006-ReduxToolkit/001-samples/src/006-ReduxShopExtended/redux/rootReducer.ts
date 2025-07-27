import { combineReducers } from 'redux';

import iceCreamReducer from './iceCream/iceCreamReducer';
import cakeReducer from './cake/cakeReducer';

const rootReducer = combineReducers({
    iceCream: iceCreamReducer,
    cake: cakeReducer,
});

export default rootReducer;