import { BUY_ICE_CREAM, IceCreamState, IceCreamAction } from './iceCreamTypes';

const initialState: IceCreamState = {
  numOfIceCreams: 10,
};

const iceCreamReducer = (
  state: IceCreamState = initialState,
  action: IceCreamAction
): IceCreamState => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };

    default:
      return state;
  }
};

export default iceCreamReducer;