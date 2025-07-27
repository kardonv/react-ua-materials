import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import * as reduxLogger from 'redux-logger';

const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const RESTORE_CAKE = 'RESTORE_CAKE';

const BUY_ICECREAM = 'BUY_ICECREAM';
const RESTORE_ICECREAM = 'RESTORE_ICECREAM';

// Action Creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action',
    }
}

function restoreCake(quantity: number) {
    return {
        type: RESTORE_CAKE,
        payload: quantity,
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action',
    }
}

function restoreIceCream(quantity: number) {
    return {
        type: RESTORE_ICECREAM,
        payload: quantity,
    }
}

// Reducer - (previousState, action) => newState

const initCakeState = {
    numOfCakes: 10,
};

const initIceCreamState = {
    numOfIceCreams: 20,
};

const cakeReducer = (state = initCakeState, action: any) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1,
        }

        case RESTORE_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes + action.payload,
        }

        default: return state;
    }
}

const iceCreamReducer = (state = initIceCreamState, action: any) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1,
        }

        case RESTORE_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams + action.payload,
        }

        default: return state;
    }
}

// Store

const store = createStore(combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
}));

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyIceCream());
// store.dispatch(buyIceCream());
const cakeActions = bindActionCreators({ buyCake, restoreCake }, store.dispatch);
const iceCreamActions = bindActionCreators({ buyIceCream, restoreIceCream }, store.dispatch);

cakeActions.buyCake();
cakeActions.buyCake();
cakeActions.restoreCake(3);


iceCreamActions.buyIceCream();
iceCreamActions.buyIceCream();
iceCreamActions.restoreIceCream(3);

unsubscribe();