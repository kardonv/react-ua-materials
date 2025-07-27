import { BUY_CAKE, CakeState, CakeAction } from './cakeTypes';

const initialState: CakeState = {
  numOfCakes: 10,
};

const cakeReducer = (
  state: CakeState = initialState,
  action: CakeAction
): CakeState => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

export default cakeReducer;