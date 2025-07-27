import { bindActionCreators, createStore } from 'redux';

const BUY_CAKE = 'BUY_CAKE';
const RESTORE_CAKE = 'RESTORE_CAKE';

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


// Reducer - (previousState, action) => newState

const initCakeState = {
    numOfCakes: 10,
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


// Store

const store = createStore(cakeReducer);
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(restoreCake(3));

const actions = bindActionCreators({ buyCake, restoreCake }, store.dispatch);
actions.buyCake();
actions.buyCake();
actions.restoreCake(3);

unsubscribe();