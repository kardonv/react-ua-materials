export const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

export interface IceCreamState {
  numOfIceCreams: number;
}

export interface IceCreamAction {
  type: string;
  payload?: any;
}