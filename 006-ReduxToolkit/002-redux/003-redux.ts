import { combineReducers, createStore } from 'redux';

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// Action Creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action',
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action',
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

        default: return state;
    }
}

const iceCreamReducer = (state = initIceCreamState, action: any) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1,
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
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();