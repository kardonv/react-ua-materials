import { createStore } from 'redux';


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

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20,
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1,
        }

        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1,
        }

        default: return state;
    }
}

// Store

const store = createStore(reducer);

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();