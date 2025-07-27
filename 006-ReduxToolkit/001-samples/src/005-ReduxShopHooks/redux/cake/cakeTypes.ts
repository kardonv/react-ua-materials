export const BUY_CAKE = 'BUY_CAKE';

export interface CakeState {
  numOfCakes: number;
}

export interface CakeAction {
  type: string;
  payload?: any;
}